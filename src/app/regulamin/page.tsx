import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin serwisu | ilezaremont.pl',
  description: 'Regulamin korzystania z serwisu ilezaremont.pl - warunki korzystania z kalkulatorów i mapy cen remontów.',
};

export default function RegulaminPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Regulamin serwisu ilezaremont.pl</h1>
        <p className="text-sm text-slate-500 mb-8">Ostatnia aktualizacja: 1 kwietnia 2026 r.</p>
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Postanowienia ogólne</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Niniejszy regulamin określa zasady korzystania z serwisu internetowego ilezaremont.pl, prowadzonego przez Adsales sp. z o.o., NIP: 813 381 82 58. Serwis dostępny jest pod adresem https://ilezaremont.pl. Korzystanie z serwisu oznacza akceptację niniejszego regulaminu.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Definicje</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Serwis - strona internetowa ilezaremont.pl wraz ze wszystkimi podstronami. Usługodawca - Adsales sp. z o.o., NIP: 813 381 82 58. Użytkownik - każda osoba korzystająca z serwisu. Raport - dokument PDF zawierający szczegółową wycenę kosztów remontu, generowany na podstawie danych wprowadzonych przez użytkownika.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Zakres usług</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Serwis udostępnia bezpłatne kalkulatory kosztów remontów, mapę cen remontów w miastach Polski oraz poradniki. Serwis oferuje również płatne raporty PDF zawierające szczegółowe wyceny. Cena raportu wynosi 29,99 PLN brutto. Płatność realizowana jest za pośrednictwem systemu Stripe.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Charakter informacji</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Wszystkie dane cenowe prezentowane w serwisie mają charakter orientacyjny i zostały wyliczone algorytmicznie na podstawie danych historycznych. Rzeczywiste koszty remontu mogą się różnić w zależności od wielu czynników. Usługodawca nie ponosi odpowiedzialności za decyzje podjęte na podstawie danych prezentowanych w serwisie.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Płatności i zwroty</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Płatność za raport PDF jest jednorazowa i wynosi 29,99 PLN brutto. Po dokonaniu płatności raport jest generowany i udostępniany do pobrania. Ze względu na cyfrowy charakter produktu, prawo do odstąpienia od umowy w terminie 14 dni nie przysługuje zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Prawa autorskie</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Wszelkie treści publikowane w serwisie stanowią własność intelektualną Usługodawcy i są chronione prawem autorskim. Kopiowanie, rozpowszechnianie lub wykorzystywanie treści serwisu bez zgody Usługodawcy jest zabronione.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Odpowiedzialność</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Usługodawca dokłada wszelkich starań, aby dane prezentowane w serwisie były jak najbardziej aktualne i rzetelne. Usługodawca nie gwarantuje jednak dokładności, kompletności ani aktualności prezentowanych informacji.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Reklamacje</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Reklamacje dotyczące działania serwisu należy zgłaszać na adres e-mail: kontakt@piosenka4you.pl. Reklamacje będą rozpatrywane w terminie 14 dni roboczych od dnia ich otrzymania.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Postanowienia końcowe</h2>
            <p className="text-sm text-slate-700 leading-relaxed">Usługodawca zastrzega sobie prawo do zmiany niniejszego regulaminu. W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego.</p>
          </section>
          <section className="border-t border-slate-200 pt-6 mt-8">
            <p className="text-xs text-slate-500">Adsales sp. z o.o. | NIP: 813 381 82 58 | kontakt@piosenka4you.pl</p>
          </section>
        </div>
      </div>
    </main>
  );
}
