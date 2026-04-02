import React from 'react';
import { Metadata } from 'next';
import KitchenCalculator from '@/components/calculators/KitchenCalculator';

export const metadata: Metadata = {
  title: 'Kuchnia na wymiar — cennik 2026 | Kalkulator | ilezaremont.pl',
  description:
    'Ile kosztuje kuchnia na wymiar? Kalkulator cen mebli kuchennych z uwzględnieniem kształtu zabudowy, frontów, blatów, wyposażenia i AGD. Wycena dla Twojego miasta.',
  openGraph: {
    title: 'Kuchnia na wymiar — cennik 2026 | Kalkulator',
    description: 'Wycena kuchni na wymiar — fronty, blaty, wyposażenie, AGD. Ceny dla Twojego miasta.',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: 'Ile kosztuje kuchnia na wymiar w 2026 roku?',
    answer:
      'Ceny kuchni na wymiar w 2026 roku zaczynają się od ok. 1 200 zł/mb za wersję ekonomiczną (płyta laminowana, laminatowy blat) do 4 500+ zł/mb za wersję premium (lakierowane fronty, blat z konglomeratu lub spieku kwarcowego, pełne wyposażenie). Kuchnia o długości 3 mb w standardowym wykonaniu to koszt ok. 5 400–7 500 zł. W Warszawie ceny są o 10–15% wyższe od średniej krajowej.',
  },
  {
    question: 'Kuchnia w kształcie L czy U — co jest droższe?',
    answer:
      'Kuchnia w kształcie U jest droższa od L o ok. 5–10% ze względu na dodatkowe narożniki, które wymagają specjalnych rozwiązań (cargo narożne, obrotowe półki). Kuchnia L jest najpopularniejszym wyborem — łączy funkcjonalność z rozsądną ceną. Kuchnia z wyspą jest najdroższa (+15–20%) ze względu na dodatkowe instalacje (woda, prąd, wentylacja).',
  },
  {
    question: 'Jaki blat kuchenny wybrać?',
    answer:
      'Najpopularniejsze opcje to: laminat HPL (najtańszy, od 200 zł/mb), konglomerat kwarcowy np. Silestone (800–1 500 zł/mb, bardzo trwały), granit (1 000–2 000 zł/mb, naturalny kamień), spieki kwarcowe np. Dekton (1 200–2 500 zł/mb, najtrwalszy), drewno lite (600–1 200 zł/mb, wymaga impregnacji). Dla większości kuchni rekomendujemy konglomerat — łączy trwałość z rozsądną ceną.',
  },
  {
    question: 'Fronty kuchenne — laminat, MDF czy drewno?',
    answer:
      'Płyta laminowana to najtańsza opcja (współczynnik 1.0×), ale wygląda mniej ekskluzywnie. MDF lakierowany mat (1.2×) to złoty środek — gładka powierzchnia, łatwy w utrzymaniu. MDF lakierowany połysk (1.35×) wygląda efektownie, ale łatwo widać odciski palców. MDF frezowany (1.4×) daje klasyczny wygląd. Drewno lite (1.75×) to premium — piękne, ale drogie i wymaga pielęgnacji.',
  },
  {
    question: 'Ile czeka się na kuchnię na wymiar?',
    answer:
      'Standardowy czas realizacji to 6–10 tygodni od złożenia zamówienia. Obejmuje: pomiar (1–2 dni), projekt (3–7 dni), produkcja (4–6 tygodni), montaż (2–3 dni). W sezonie (marzec–czerwiec) czas może wydłużyć się do 12 tygodni. Warto zamawiać z wyprzedzeniem, zwłaszcza jeśli planujesz kompleksowy remont.',
  },
  {
    question: 'Czy mogę dodać swój projekt lub wycenę od stolarza?',
    answer:
      'Tak! W naszym kalkulatorze możesz załączyć do 5 plików — wizualizację z salonu meblowego, projekt od projektanta wnętrz, wycenę od stolarza lub zdjęcia inspiracji. Porównamy Twoją wycenę z cenami rynkowymi w raporcie PDF, dzięki czemu będziesz wiedzieć czy oferta jest konkurencyjna.',
  },
];

export default function KuchniaNaWymiarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-blue-700 px-2.5 py-1 rounded-full">
              Kalkulator 2026
            </span>
            <span className="text-xs text-blue-200">Aktualizacja: marzec 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Kuchnia na wymiar — ile kosztuje?
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Szczegółowa wycena kuchni na wymiar: kształt zabudowy, fronty, blat, wyposażenie, AGD do zabudowy.
            Dodaj swój projekt lub wycenę od stolarza — porównamy z cenami rynkowymi.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="container mx-auto max-w-5xl px-4 py-10">
        <KitchenCalculator />
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Najczęściej zadawane pytania
        </h2>
        <div className="space-y-4">
          {FAQ.map((item, index) => (
            <details
              key={index}
              className="group rounded-lg border border-slate-200 bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                {item.question}
                <svg
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
