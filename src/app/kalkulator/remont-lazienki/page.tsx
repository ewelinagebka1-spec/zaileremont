import React from 'react';
import { Metadata } from 'next';
import BathroomCalculator from '@/components/calculators/BathroomCalculator';

export const metadata: Metadata = {
  title: 'Kalkulator kosztów remontu łazienki 2026 | ilezaremont.pl',
  description: 'Sprawdź ile kosztuje remont łazienki w Twoim mieście. Kalkulator ilezaremont.pl pozwala oszacować cenę robocizny, materiałów i wyposażenia do łazienki.',
  keywords: 'remont łazienki, koszt remontu, kalkulator, wycena, warszawa, kraków',
  openGraph: {
    title: 'Kalkulator kosztów remontu łazienki 2026',
    description: 'Sprawdź ile kosztuje remont łazienki w Twoim mieście',
    type: 'website',
  },
};

// FAQ data for structured data
const FAQ = [
  {
    question: 'Ile kosztuje remont łazienki w 2026?',
    answer:
      'Koszt remontu łazienki w 2026 wynosi średnio od 8 000 do 25 000 złotych. Dokładna cena zależy od wielkości łazienki, wybranego standardu materiałów, lokalizacji oraz zakresu prac. Nasz kalkulator uwzględnia wszystkie te czynniki.',
  },
  {
    question: 'Jakie czynniki wpływają na cenę remontu łazienki?',
    answer:
      'Główne czynniki to: powierzchnia łazienki (m²), typ nieruchomości (rynek pierwotny/wtórny), standard materiałów (ekonomiczny/standard/premium), zainstalowane urządzenia (wanna, prysznic, grzejnik), konieczność prac demontażowych, wymiana instalacji hydraulicznych i elektrycznych, oraz lokalizacja w Polsce.',
  },
  {
    question: 'Czy cena zawiera materiały i robociznę?',
    answer:
      'Nasz kalkulator pozwala wybrać zakres wyceny: tylko robocizna, robocizna + materiały budowlane, lub pełny zakres z wyposażeniem. Wybór zależy od Twoich potrzeb - możesz kupić materiały samodzielnie lub zlecić wszystko wykonawcy.',
  },
  {
    question: 'Jak długo trwa remont łazienki?',
    answer:
      'Średni remont łazienki o powierzchni 5-6 m² trwa od 2 do 4 tygodni. Czas zależy od zakresu prac, liczby instalatorów oraz złożoności projektu. Remonty z wymianą instalacji hydraulicznych i elektrycznych zajmują więcej czasu.',
  },
  {
    question: 'Czy cena różni się w zależności od miasta?',
    answer:
      'Tak, ceny remontów znacznie się różnią między miastami. Warszawa i Kraków są droższe (współczynnik 1.15-1.25) niż miasta małe (współczynnik 0.85-0.95). Nasz kalkulator automatycznie uwzględnia zmienność cenową w zależności od wybranego miasta.',
  },
];

export default function BathroomCalculatorPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Ile kosztuje remont łazienki w 2026?
            </h1>
            <p className="mt-4 text-xl text-slate-600">
              Kalkulator ilezaremont.pl - sprawdź cenę w Twoim mieście
            </p>
          </div>

          {/* Intro paragraph for SEO */}
          <div className="mb-12 space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <p className="text-slate-700">
              Remont łazienki to jeden z najpopularniejszych projektów remontowych w polskich domach i mieszkaniach. W 2026 roku średni koszt remontu łazienki wynosi od 8 000 do 25 000 złotych, w zależności od wielu czynników. Głównym determinantem ceny jest wielkość pomieszczenia - łazienka o powierzchni 4-6 m² to standard, lecz spotykamy też mniejsze i większe przestrzenie wymagające indywidualnego podejścia.
            </p>
            <p className="text-slate-700">
              Kalkulator ilezaremont.pl to nowoczesne narzędzie, które pozwala oszacować koszty remontu łazienki z dokładnością do килkoset złotych. Uwzględnia on czynniki takie jak: lokalizacja (współczynnik dla Warszawy to 1.25, a dla małych miast 0.90), typ rynku nieruchomości (pierwotny, wtórny, spółdzielniczy), wybrany standard materiałów (ekonomiczny, standard, premium), konieczne prace demontażowe w przypadku remontu mieszkania na rynku wtórnym, wymianę instalacji hydraulicznych i elektrycznych, rodzaj wyposażenia (wanna, prysznic, umywalka, grzejnik), oraz prace przygotowawcze (wyrównanie ścian i podłogi, hydroizolacja).
            </p>
            <p className="text-slate-700">
              Naszym celem jest dostarczenie przejrzystych wycen opartych na rzeczywistych danych rynkowych od wykonawców z całej Polski. Algorytm ilezaremont.pl wykorzystuje wielowarstwowy model cenowy z uwzględnieniem sezonowości (wiosna i lato są droższe), złożoności prac, oraz aktualnych trendów na rynku usług remontowych. Wycena zawiera rozkład percentylowy (p10, p25, p50, p75, p90), co daje pełny obraz możliwego spektrum cen.
            </p>
          </div>

          {/* Calculator */}
          <div className="mb-16 rounded-lg bg-white p-8 shadow-lg">
            <BathroomCalculator />
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Pytania i odpowiedzi
            </h2>

            <div className="grid gap-6">
              {FAQ.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-slate-200 bg-white p-6 transition-all hover:shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                    {item.question}
                    <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180">
                      <svg
                        className="h-5 w-5 text-slate-600"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Structured Data - FAQ Schema */}
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

      {/* Structured Data - HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Jak obliczyć koszt remontu łazienki',
            description:
              'Krokowy przewodnik do kalkulacji kosztów remontu łazienki za pomocą kalkulatora ilezaremont.pl',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Wybierz lokalizację',
                text: 'Wpisz miasto, w którym znajduje się Twoja łazienka. Wybranie dzielnicy w dużych miastach pozwoli na jeszcze dokładniejszą wycenę.',
              },
              {
                '@type': 'HowToStep',
                name: 'Określ typ nieruchomości',
                text: 'Wskaż czy remont dotyczy rynku pierwotnego (nowe budownictwo), wtórnego (istniejący budynek) czy spółdzielni.',
              },
              {
                '@type': 'HowToStep',
                name: 'Podaj wymiary łazienki',
                text: 'Wpisz powierzchnię w m² i wysokość ścian. Możesz też wybrać jedną z gotowych kategorii wielkości.',
              },
              {
                '@type': 'HowToStep',
                name: 'Wybierz prace do wykonania',
                text: 'Zaznacz wszystkie prace, które będą konieczne: demontaż, wyrównanie ścian/podłogi, wymiana instalacji, wyposażenie.',
              },
              {
                '@type': 'HowToStep',
                name: 'Określ standard materiałów',
                text: 'Wybierz czy interesuje Cię standard ekonomiczny, standard czy premium.',
              },
              {
                '@type': 'HowToStep',
                name: 'Wybierz zakres wyceny',
                text: 'Zdecyduj czy chcesz cenę tylko na robociznę, czy razem z materiałami i wyposażeniem.',
              },
              {
                '@type': 'HowToStep',
                name: 'Otrzymaj wynik',
                text: 'Kalkulator wyświetli szacunkową cenę wraz z rozkładem percentylowym (p10-p90).',
              },
            ],
          }),
        }}
      />

      {/* Structured Data - Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ilezaremont.pl',
            url: 'https://ilezaremont.pl',
            description: 'Kalkulator kosztów remontów - dokładne wyceny dla Twoich projektów',
            sameAs: [
              'https://ilezaremont.pl',
            ],
          }),
        }}
      />
    </>
  );
}
