import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka prywatności i cookies | ilezaremont.pl',
  description: 'Polityka prywatności i plików cookies serwisu ilezaremont.pl - informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
};

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Polityka prywatności i cookies</h1>
        <p className="text-sm text-slate-500 mb-8">Ostatnia aktualizacja: 1 kwietnia 2026 r.</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Administrator danych</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Administratorem danych osobowych jest Adsales sp. z o.o., NIP: 813 381 82 58.
              Kontakt z administratorem: kontakt@piosenka4you.pl.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Zakres zbieranych danych</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Serwis zbiera dane osobowe wyłącznie w zakresie niezbędnym do świadczenia usług.
              W przypadku zakupu raportu PDF zbierane są dane niezbędne do realizacji transakcji
              (adres e-mail). Serwis automatycznie zbiera informacje o urządzeniu i przeglądarce
              użytkownika w celach analitycznych i technicznych.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Cele przetwarzania danych</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dane osobowe przetwarzane są w następujących celach:
              realizacja zamówień na raporty PDF (podstawa prawna: art. 6 ust. 1 lit. b RODO),
              analiza statystyczna ruchu w serwisie (podstawa prawna: art. 6 ust. 1 lit. f RODO),
              obsługa reklamacji i zapytań (podstawa prawna: art. 6 ust. 1 lit. b RODO),
              wypełnianie obowiązków prawnych, w tym podatkowych (podstawa prawna: art. 6 ust. 1 lit. c RODO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Odbiorcy danych</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dane osobowe mogą być przekazywane następującym podmiotom:
              Stripe, Inc. - w celu obsługi płatności elektronicznych,
              Cloudflare, Inc. - w celu zapewnienia bezpieczeństwa i wydajności serwisu.
              Podmioty te przetwarzają dane na podstawie umów powierzenia przetwarzania danych
              i zapewniają odpowiedni poziom ochrony danych osobowych.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Prawa użytkownika</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Zgodnie z RODO, użytkownik ma prawo do: dostępu do swoich danych osobowych,
              sprostowania danych, usunięcia danych (&quot;prawo do bycia zapomnianym&quot;),
              ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec
              przetwarzania, oraz wniesienia skargi do organu nadzorczego (Prezes Urzędu
              Ochrony Danych Osobowych). W celu realizacji swoich praw prosimy o kontakt
              na adres: kontakt@piosenka4you.pl.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Okres przechowywania danych</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dane osobowe przechowywane są przez okres niezbędny do realizacji celów,
              dla których zostały zebrane. Dane związane z transakcjami przechowywane są
              przez okres wymagany przepisami prawa podatkowego (5 lat od końca roku
              podatkowego). Dane analityczne przechowywane są w formie zanonimizowanej.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Pliki cookies</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Serwis wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania
              strony, zapamiętania preferencji użytkownika oraz analizy ruchu w serwisie.
              Rodzaje cookies: niezbędne (wymagane do działania serwisu, w tym cookie_consent),
              analityczne (zbieranie anonimowych statystyk użytkowania),
              funkcjonalne (zapamiętywanie preferencji użytkownika).
              Użytkownik może zarządzać plikami cookies w ustawieniach przeglądarki.
              Wyłączenie cookies może wpłynąć na prawidłowe działanie serwisu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Bezpieczeństwo danych</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Administrator stosuje odpowiednie środki techniczne i organizacyjne
              zapewniające bezpieczeństwo danych osobowych, w tym szyfrowanie transmisji
              danych (SSL/TLS), regularne aktualizacje oprogramowania oraz ograniczony
              dostęp do danych osobowych.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Zmiany polityki prywatności</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Administrator zastrzega sobie prawo do zmiany niniejszej polityki prywatności.
              O wszelkich zmianach użytkownicy będą informowani poprzez publikację
              nowej wersji dokumentu w serwisie.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-6 mt-8">
            <p className="text-xs text-slate-500">
              Adsales sp. z o.o. | NIP: 813 381 82 58 | kontakt@piosenka4you.pl
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
