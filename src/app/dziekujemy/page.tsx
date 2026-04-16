import { Metadata } from 'next';
import Link from 'next/link';
import PurchaseTracker from '@/components/analytics/PurchaseTracker';

export const metadata: Metadata = {
  title: 'Dziękujemy za zakup — ilezaremont.pl',
  description: 'Dziękujemy za zamówienie raportu cenowego. Wyślemy go na Twój adres e-mail w ciągu 1 godziny.',
  robots: { index: false, follow: false },
};

export default function DziekujemyPage() {
  return (
    <section className="py-16 md:py-24">
      <PurchaseTracker value={29.99} currency="PLN" />
      <div className="container mx-auto max-w-2xl px-4">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Dziękujemy za zakup!
          </h1>
          <p className="text-lg text-slate-600">
            Płatność przebiegła pomyślnie. Twoje zamówienie zostało przyjęte.
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-2xl border border-orange-200 bg-white shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Raport jest w przygotowaniu</h2>
            <p className="text-orange-100 text-sm">Wyślemy go na Twój e-mail w ciągu 1 godziny</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Płatność zaksięgowana</p>
                <p className="text-sm text-slate-500">Potwierdzenie dostaniesz osobnym e-mailem od Stripe</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-orange-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Raport w przygotowaniu</p>
                <p className="text-sm text-slate-500">Nasz system generuje spersonalizowany raport dla Ciebie</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Raport na e-mail w ciągu 1 godziny</p>
                <p className="text-sm text-slate-500">PDF trafi na adres e-mail podany przy płatności</p>
              </div>
            </div>
          </div>
        </div>

        {/* What's inside */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 mb-8">
          <h3 className="font-semibold text-slate-800 mb-3">Co znajdziesz w raporcie:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-slate-700">Rozkład cen z 5 percentylami</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-slate-700">Porównanie cen w 15 miastach</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-slate-700">Trend cenowy z 12 miesięcy</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-slate-700">Rozbicie: robocizna vs. materiały</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-slate-700">Checklista negocjacyjna (20 pkt)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-slate-700">Wzór umowy z wykonawcą</span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-8">
          <p className="text-sm text-blue-900">
            <strong>Wskazówka:</strong> sprawdź skrzynkę za około 30–60 minut. Jeśli wiadomości nie będzie — zajrzyj też do folderu <em>Oferty</em>, <em>Spam</em> lub <em>Inne</em>.
          </p>
        </div>

        {/* Help section */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">
            Masz pytania? Napisz do nas na{' '}
            <a href="mailto:raport@ilezaremont.pl" className="text-blue-600 hover:text-blue-800 font-medium">
              raport@ilezaremont.pl
            </a>
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              &larr; Strona główna
            </Link>
            <Link href="/kalkulator" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Kalkulatory &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
