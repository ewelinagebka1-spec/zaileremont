import React from 'react';
import { Metadata } from 'next';
import TileCalculator from '@/components/calculators/TileCalculator';

export const metadata: Metadata = {
  title: 'Cena układania płytek za m² 2026 | Kalkulator | ilezaremont.pl',
  description:
    'Darmowy kalkulator cen układania płytek. Wycena dostosowana do rodzaju płytek, rozmiaru, materiału i typu pomieszczenia. Sprawdź ile kosztuje profesjonalne układanie.',
  openGraph: {
    title: 'Cena układania płytek za m² 2026 | Kalkulator',
    description: 'Wycena układania płytek dostosowana do Twoich parametrów.',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: 'Ile kosztuje układanie płytek za m² w 2026?',
    answer:
      'Koszt układania płytek waha się między 80-150 PLN za m² (sama usługa). W Warszawie średnio 100-180 PLN/m². Cena zależy od rozmiaru płytek, materiału, złożoności wzoru i przygotowania podłoża. Duże formaty i proste wzory są tańsze, mozaiki i skomplikowane wzory droższe.',
  },
  {
    question: 'Jaka jest różnica między fugą cementową a epoksydową?',
    answer:
      'Fuga cementowa jest standardem, tańsza, łatwa do naprawy. Fuga epoksydowa to opcja premium - znacznie bardziej odporna na wilgoć, zabrudzenia i chemikalia. Idealna dla łazienek, kuchni i tarasów. Trwa dłużej i wygląda bardziej profesjonalnie, ale kosztuje 2-3 razy więcej.',
  },
  {
    question: 'Czy przygotowanie podłoża wpływa na cenę?',
    answer:
      'Tak, znacznie. Skucie starych płytek, wyrównanie nierówności i hydroizolacja (zwłaszcza w łazience) to dodatkowe koszty. Mogą one być równe lub większe niż koszt samego układania. Dobrze przygotowana podstawa gwarantuje trwałość i estetykę na lata.',
  },
  {
    question: 'Jakie płytki są najłatwiejsze do ułożenia?',
    answer:
      'Płytki ceramiczne o rozmiarze 20-30 cm w prostym wzorze. Mniejsze płytki (10-15 cm) są trudniejsze - więcej spoin do szpachlowania. Duże formaty (60x60 lub większe) wymagają doświadczenia i precyzyjnego wyrównania podłoża.',
  },
  {
    question: 'Czy warto założyć listwa wykończeniową?',
    answer:
      'Tak, zdecydowanie. Listwy wykończeniowe i narożniki to nie tylko estetyka - chronią krawędzie płytek przed uszkodzeniami i dostaniem się wody pod powierzchnię. Są niezbędne w łazienkach i na tarasach. Koszt to zaledwie kilka procent ceny całego projektu.',
  },
];

export default function UkladaniePlytek() {
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
              Ile kosztuje układanie płytek w 2026 roku?
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Profesjonalne układanie płytek to inwestycja w trwałość i estetykę Twojej
              łazienki, kuchni, korytarza lub tarasu. Cena zależy od wielu czynników: typu
              płytek, ich rozmiaru, materiału, złożoności wzoru i stanu podłoża. Nasz
              kalkulator pozwoli Ci szybko obliczyć dokładną wycenę na podstawie aktualnych
              cen na rynku remontowym w Polsce w 2026 roku.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <TileCalculator />
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
                Gdzie warto użyć płytek?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Łazienka - niezbędne ze względu na wilgoć</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Kuchnia - blat przyscienny i podłoga</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Korytarz i przedpokój - duża wytrzymałość</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Taras i balkon - odporność na warunki pogodowe</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Co wpływa na cenę układania?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Format płytek (mały/średni/duży/mozaika)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Materiał (ceramika, gres, kamień naturalny)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Wzór ułożenia (prosty, cegiełka, jodełka, diagonal)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Przygotowanie podłoża (wyrównanie, hydroizolacja)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Typ fugi i dodatki (listwy, narożniki, cokoły)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
