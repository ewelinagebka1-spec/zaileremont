/**
 * Stripe webhook handler — Cloudflare Pages Function
 *
 * Endpoint: POST https://ilezaremont.pl/api/stripe-webhook
 *
 * Odbiera zdarzenie `checkout.session.completed` od Stripe, weryfikuje
 * podpis HMAC-SHA256 i wysyła e-mail podziękowania przez Resend.
 *
 * Wymagane zmienne środowiskowe (Cloudflare Pages → Settings → Environment variables):
 *   STRIPE_WEBHOOK_SECRET — sekret podpisu webhooka z panelu Stripe
 *   RESEND_API_KEY        — klucz API z resend.com
 *   EMAIL_FROM            — (opcjonalnie) adres nadawcy, domyślnie raport@ilezaremont.pl
 *
 * Konfiguracja w Stripe Dashboard:
 *   Developers → Webhooks → Add endpoint
 *   URL: https://ilezaremont.pl/api/stripe-webhook
 *   Events: checkout.session.completed
 */

interface Env {
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  EMAIL_FROM?: string;
}

// Minimalna definicja typu PagesFunction (Cloudflare Pages),
// żeby nie wymagać instalacji @cloudflare/workers-types.
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

interface StripeCheckoutSession {
  id: string;
  amount_total?: number | null;
  currency?: string | null;
  customer_email?: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
  metadata?: Record<string, string> | null;
}

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: StripeCheckoutSession;
  };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // 1. Sprawdź wymagane zmienne środowiskowe
  if (!env.STRIPE_WEBHOOK_SECRET || !env.RESEND_API_KEY) {
    console.error('Missing required env vars: STRIPE_WEBHOOK_SECRET or RESEND_API_KEY');
    return new Response('Server misconfiguration', { status: 500 });
  }

  // 2. Pobierz podpis Stripe
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  // 3. Pobierz surowe body (do weryfikacji podpisu musi być dokładnie to samo co wysłał Stripe)
  const rawBody = await request.text();

  // 4. Zweryfikuj podpis HMAC
  const verified = await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!verified) {
    console.error('Invalid Stripe signature');
    return new Response('Invalid signature', { status: 400 });
  }

  // 5. Sparsuj event
  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch (err) {
    console.error('Failed to parse webhook body:', err);
    return new Response('Invalid JSON', { status: 400 });
  }

  // 6. Obsłuż tylko checkout.session.completed
  if (event.type !== 'checkout.session.completed') {
    return jsonResponse({ received: true, skipped: event.type });
  }

  const session = event.data.object;
  const email = session.customer_details?.email || session.customer_email || null;
  const name = session.customer_details?.name || '';
  const amountPLN =
    typeof session.amount_total === 'number'
      ? (session.amount_total / 100).toLocaleString('pl-PL', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null;
  const currency = (session.currency || 'pln').toUpperCase();

  if (!email) {
    console.warn('checkout.session.completed without customer email', session.id);
    return jsonResponse({ received: true, warning: 'no email in session' });
  }

  // 7. Wyślij e-mail przez Resend
  try {
    await sendThankYouEmail({
      to: email,
      name,
      amountText: amountPLN ? `${amountPLN} ${currency}` : null,
      resendApiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM || 'raport@ilezaremont.pl',
    });
  } catch (err) {
    console.error('Failed to send thank-you email:', err);
    // Zwróć 500 — Stripe ponowi próbę webhooka
    return new Response('Email send failed', { status: 500 });
  }

  return jsonResponse({ received: true, emailed: email });
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Weryfikacja podpisu webhooka Stripe.
 * Format nagłówka stripe-signature: "t=TIMESTAMP,v1=SIGNATURE[,v1=SIGNATURE...]"
 * Podpisana treść: "TIMESTAMP.BODY"
 * Algorytm: HMAC-SHA256 z wykorzystaniem webhook secret.
 */
async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string
): Promise<boolean> {
  const parts: Record<string, string[]> = {};
  for (const segment of header.split(',')) {
    const idx = segment.indexOf('=');
    if (idx === -1) continue;
    const key = segment.slice(0, idx).trim();
    const value = segment.slice(idx + 1).trim();
    if (!parts[key]) parts[key] = [];
    parts[key].push(value);
  }

  const timestamp = parts['t']?.[0];
  const signatures = parts['v1'] || [];
  if (!timestamp || signatures.length === 0) return false;

  // Tolerancja znacznika czasu: 5 minut (zgodnie z zaleceniami Stripe)
  const timestampNum = Number(timestamp);
  if (!Number.isFinite(timestampNum)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestampNum) > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const expectedHex = bufferToHex(signatureBuffer);

  // Porównanie w czasie stałym
  return signatures.some((sig) => timingSafeEqual(sig, expectedHex));
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Wysyłka e-maila podziękowania przez Resend API.
 */
async function sendThankYouEmail(opts: {
  to: string;
  name?: string;
  amountText: string | null;
  resendApiKey: string;
  from: string;
}): Promise<void> {
  const { to, name, amountText, resendApiKey, from } = opts;

  const greeting = name ? `Cześć ${escapeHtml(name)},` : 'Cześć,';
  const amountLine = amountText
    ? `<p style="margin:0 0 12px;color:#475569;font-size:14px;">Kwota zamówienia: <strong>${escapeHtml(amountText)}</strong></p>`
    : '';

  const subject = 'Dziękujemy za zakup — raport wyślemy w ciągu 1 godziny';

  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:16px;box-shadow:0 2px 12px rgba(15,23,42,0.08);overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#ea580c,#f97316);padding:32px 32px 24px;text-align:center;color:#ffffff;">
              <div style="font-size:14px;letter-spacing:1.5px;text-transform:uppercase;opacity:0.85;margin-bottom:8px;">ilezaremont.pl</div>
              <div style="font-size:24px;font-weight:800;line-height:1.3;">Dziękujemy za zakup raportu!</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                Twoje zamówienie zostało przyjęte. Raport jest właśnie <strong>przygotowywany</strong> i zostanie wysłany na ten adres e-mail w <strong>ciągu 1 godziny</strong>.
              </p>
              ${amountLine}
              <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:16px 20px;margin:20px 0;">
                <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#9a3412;">Co znajdziesz w raporcie</p>
                <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;color:#475569;">
                  <li>Rozkład cen z 5 percentylami</li>
                  <li>Porównanie cen w 15 miastach</li>
                  <li>Trend cenowy z 12 miesięcy + prognoza</li>
                  <li>Rozbicie kosztów: robocizna vs. materiały</li>
                  <li>Checklista negocjacyjna (20 punktów)</li>
                  <li>Wzór umowy z wykonawcą + protokół odbioru</li>
                </ul>
              </div>
              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#475569;">
                Jeśli masz pytania — po prostu odpowiedz na tę wiadomość lub napisz na
                <a href="mailto:raport@ilezaremont.pl" style="color:#ea580c;text-decoration:none;font-weight:600;">raport@ilezaremont.pl</a>.
              </p>
              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#475569;">
                Pozdrawiamy,<br /><strong>Zespół ilezaremont.pl</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">
                ilezaremont.pl · raport@ilezaremont.pl<br />
                Wiadomość wysłana automatycznie po potwierdzeniu płatności.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `${name ? `Cześć ${name},` : 'Cześć,'}`,
    '',
    'Dziękujemy za zakup raportu cenowego na ilezaremont.pl.',
    '',
    'Twoje zamówienie zostało przyjęte. Raport jest właśnie przygotowywany',
    'i zostanie wysłany na ten adres e-mail w ciągu 1 godziny.',
    '',
    amountText ? `Kwota zamówienia: ${amountText}` : '',
    '',
    'Co znajdziesz w raporcie:',
    '- Rozkład cen z 5 percentylami',
    '- Porównanie cen w 15 miastach',
    '- Trend cenowy z 12 miesięcy + prognoza',
    '- Rozbicie kosztów: robocizna vs. materiały',
    '- Checklista negocjacyjna (20 punktów)',
    '- Wzór umowy z wykonawcą + protokół odbioru',
    '',
    'Jeśli masz pytania — odpowiedz na tę wiadomość lub napisz na',
    'raport@ilezaremont.pl',
    '',
    'Pozdrawiamy,',
    'Zespół ilezaremont.pl',
  ]
    .filter((line) => line !== '')
    .join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `ilezaremont.pl <${from}>`,
      to: [to],
      reply_to: 'raport@ilezaremont.pl',
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Resend API error ${response.status}: ${errBody}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
