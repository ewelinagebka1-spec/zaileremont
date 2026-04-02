import React from 'react';
import { Metadata } from 'next';
import PaintingCalculator from '@/components/calculators/PaintingCalculator';

export const metadata: Metadata = {
  title: 'Ile kosztuje malowanie ścian 2026? Kalkulator cen | ilezaremont.pl',
  description:
    'Darmowy kalkulator cen malowania ścian. Przeanalizujemy Twoje wymogi i obliczymy dokładną wycenę w oparciu o lokalizację, stan ścian i typ farby.',
  openGraph: {
    title: 'Ile kosztuje malowanie ścian 2026? Kalkulator cen',
    description:
      'Darmowy kalkulator cen malowania ścian. Wycena w oparciu o lokalizację i parametry.',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: 'Ile kosztuje malowanie 1 m² ścian w 2026 roku?',
    answer:
      'Koszt malowania 1 m² ścian w Polsce waha się między 20-50 PLN za m² (sama usługa bez materiałów). W Warszawie ceny są wyższe, średnio 35-60 PLN/m². Cena zależy od stanu ścian, rodzaju farby i dodatkowych prac przygotowawczych.',
  },
  {
    question: 'Jakie są różnice między farbą akrylową a lateksową?',
    answer:
      'Farba akrylowa jest bardziej ekonomiczna, ma gorszy opór na wilgoć. Farba lateksowa zmywalna jest standardem - bardziej odporna na zabrudzenia, łatwa do czyszczenia. Ceramiczna farba to opcja premium dla łazienek i kuchni - najtrwalsza, najlepiej opiera się wilgoci i parom.',
  },
  {
    question: 'Czy zawsze są potrzebne 2 warstwy farby?',
    answer:
      '2 warstwy farby to standard dla większości przypadków i gwarantuje równomierny kolor. 3 warstwy są rekomendowane dla intensywnych kolorów, ciemnych odcieni lub gdy chcemy uzyskać jeszcze bardziej profesjonalny efekt.',
  },
  {
    question: 'Ile czasu zajmuje malowanie mieszkania?',
    answer:
      'Czas malowania zależy od wielkości mieszkania i stanu ścian. Dla 60 m² ścian bez prac przygotowawczych zajmuje to ok. 2-3 dni. Jeśli wymagane są prace przygotowawcze (szpachlowanie, gruntowanie), czas wydłuża się do 4-5 dni.',
  },
  {
    question: 'Czy warto malować sufity razem ze ścianami?',
    answer:
      'Tak, warto malować sufity razem ze ścianami by uzyskać spójny wygląd i zaoszczędzić na logistyce. Malowanie sufitów wymaga dodatkowych zabezpieczeń i specjalistycznego sprzętu, ale łączy się to z pracami ściennymi skutecznie. To również idealna okazja do upgradacji oświetlenia.',
  },
];

export default function MalowanieSciangPage() {
  const schemaData = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Ile kosztuje malowanie ścian w 2026 roku?
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Profesjonalne malowanie ścian to jedna z najtańszych i najszybszych metod
              transformacji wnętrza. Nasz kalkulator pomoże Ci ustalić dokładną cenę na
              podstawie lokalizacji, stanu ścian, rodzaju farby i dodatkowych usług. Podaj
              kilka danych a my obliczymy dla Ciebie wycenę zgodnie z aktualnymi cenami na
              rynku remontowym w Polsce w 2026 roku.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <PaintingCalculator />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Często zadawane pytania
            </h2>

            <div className="space-y-6">
              {FAQ.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Kiedy warto malować?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Po przeprowadzce do nowego mieszkania</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Gdy chcemy zmienić wygląd wnętrza bez dużych nakładów</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Odświeżenie po kilku latach eksploatacji</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Przygotowanie mieszkania do wynajęcia</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Co wpływa na cenę malowania?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Stan ścian (dobry, ubytki, tapeta, glądzenie)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Rodzaj farby (akrylowa, lateksowa, ceramiczna)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Liczba warstw (2 vs 3)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Lokalizacja i typ nieruchomości</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Dodatkowe usługi (sufity, grzejniki, framugi)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
