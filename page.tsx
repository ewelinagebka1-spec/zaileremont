import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kalkulatory kosztów remontu 2026 | ilezaremont.pl',
  description:
    'Darmowe kalkulatory kosztów remontu. Sprawdź cenę malowania ścian, układania płytek, remontu łazienki, mebli na wymiar i okien PCV. Wycena dostosowana do Twojej lokalizacji.',
  openGraph: {
    title: 'Kalkulatory kosztów remontu 2026',
    description: 'Darmowe kalkulatory cen remontu — malowanie, płytki, łazienka, meble, okna PCV.',
  },
};

interface CalculatorCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  shortDescription: string;
}

const CALCULATORS: CalculatorCard[] = [
  {
    title: 'Kalkulator malowania ścian',
    description:
      'Oblicz koszt profesjonalnego malowania ścian w Twojej nieruchomości. Uwzględnia stan ścian, typ farby, liczbę warstw i dodatkowe usługi.',
    href: '/kalkulator/malowanie-scian',
    icon: '🎨',
    shortDescription: 'Malowanie ścian i sufitów',
  },
  {
    title: 'Kalkulator układania płytek',
    description:
      'Wycena układania płytek dla łazienki, kuchni, korytarza i tarasu. Uwzględnia rozmiar płytek, materiał, wzór i przygotowanie podłoża.',
    href: '/kalkulator/ukladanie-plytek',
    icon: '🧱',
    shortDescription: 'Układanie płytek — wszystkie pomieszczenia',
  },
  {
    title: 'Kalkulator remontu łazienki',
    description:
      'Kompleksowa wycena pełnego remontu łazienki: rozbórka, przygotowanie, płytki, instalacje, wyposażenie i wykończenie.',
    href: '/kalkulator/remont-lazienki',
    icon: '🛁',
    shortDescription: 'Kompleksowy remont łazienki',
  },
  {
    title: 'Kalkulator kuchni na wymiar',
    description:
      'Pełna wycena kuchni na wymiar: kształt zabudowy (I, L, U, wyspa), fronty, blat, AGD do zabudowy. Dodaj swój projekt lub wycenę od stolarza.',
    href: '/kalkulator/kuchnia-na-wymiar',
    icon: '🍳',
    shortDescription: 'Kuchnia — fronty, blat, AGD, wyposażenie',
  },
  {
    title: 'Kalkulator okien PCV',
    description:
      'Oblicz cenę okien PCV z montażem. Uwzględnia typ okna, pakiet szybowy, kolor profilu, rolety i lokalizację.',
    href: '/kalkulator/okna-pcv',
    icon: '🪟',
    shortDescription: 'Okna jednoskrzydłowe, dwuskrzydłowe, dachowe',
  },
];

export default function KalkulatoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Kalkulatory kosztów remontu
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Otrzymaj dokładną wycenę prac remontowych w ciągu minut. Nasze kalkulatory
            uwzględniają aktualne ceny na rynku remontowym w Polsce w 2026 roku,
            lokalizację, typ nieruchomości i wszystkie parametry pracy. Bezpłatnie,
            bez rejestracji.
          </p>
        </div>
      </div>

      {/* Calculator Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CALCULATORS.map((calc, index) => (
            <Link key={index} href={calc.href}>
              <div className="h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-300">
                {/* Icon area */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 text-center border-b border-gray-200">
                  <div className="text-5xl">{calc.icon}</div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {calc.title}
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">{calc.description}</p>

                  {/* Badge */}
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {calc.shortDescription}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                      Otwórz kalkulator
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Dlaczego warto używać naszych kalkulatorów?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Ceny z rynku 2026</h3>
                <p className="mt-2 text-gray-600">
                  Nasze kalkulatory są regularnie aktualizowane o aktualne ceny na rynku
                  remontowym w Polsce.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Uwzględniamy lokalizację</h3>
                <p className="mt-2 text-gray-600">
                  Cena różni się między Warszawą a Poznaniem. Nasze kalkulatory to uwzględniają.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Szybko i łatwo</h3>
                <p className="mt-2 text-gray-600">
                  Wycena w kilka minut. Nie trzeba wypełniać długich formularzy ani czekać na odpowiedź e-mailem.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">100% bezpłatnie</h3>
                <p className="mt-2 text-gray-600">
                  Wszystkie kalkulatory są całkowicie bezpłatne. Bez ukrytych opłat i bez wymaganej rejestracji.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Zacznij obliczać teraz
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Wybierz kalkulator, który Cię interesuje, i otrzymaj wycenę w minutę.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {CALCULATORS.map((calc, index) => (
              <Link
                key={index}
                href={calc.href}
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {calc.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
