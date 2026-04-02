import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas — ilezaremont.pl | Mapa Cen Remontów',
  description:
    'Poznaj ilezaremont.pl — pierwsze w Polsce narzędzie Price Map dla branży remontowej. Transparentne dane o cenach usług remontowych.',
  keywords: [
    'o nas',
    'ilezaremont.pl',
    'mapa cen',
    'remont',
    'ceny',
    'price map',
  ],
  openGraph: {
    title: 'O nas — ilezaremont.pl',
    description:
      'Poznaj ilezaremont.pl — narzędzie Price Map dla branży remontowej',
    type: 'website',
  },
};

export default function ONasPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ilezaremont.pl',
    url: 'https://ilezaremont.pl',
    description: 'Mapa Cen Remontów — transparentne ceny usług remontowych w Polsce',
    logo: 'https://ilezaremont.pl/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'kontakt@ilezaremont.pl',
      contactType: 'Customer Service',
    },
  };

  return (
    <>
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              O ilezaremont.pl
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Transparentne dane o cenach remontów dla każdego Polaka
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-16">
          {/* Mission Section */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Nasza misja
            </h2>

            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
              <p className="text-lg text-slate-900">
                <span className="font-semibold">ilezaremont.pl</span> to pierwsze w Polsce narzędzie typu{' '}
                <span className="font-semibold">Price Map</span> dla branży remontowej.
              </p>

              <p className="mt-4 text-lg text-slate-700">
                Naszą misją jest dostarczenie{' '}
                <span className="font-semibold">transparentnych danych</span> o cenach usług remontowych,
                aby każdy Polak mógł świadomie podejmować decyzje o swoim
                remoncie.
              </p>
            </div>

            <p className="mt-6 text-slate-600">
              Wierzymy, że wiedza o rynkowych cenach remontów to podstawa
              każdej mądrej decyzji. Nie chcemy, aby nasi użytkownicy
              przepłacali za usługi lub byli niedoinformowani. Dlatego
              stworzyliśmy narzędzie, które pokazuje rzeczywiste, dane ceny
              praktykowane w branży remontowej.
            </p>
          </div>

          {/* What We Do Section */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Co robimy
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-3 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <svg
                      className="h-6 w-6 text-brand-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6.447 3.268A1 1 0 0021 19.382V4.618a1 1 0 00-1.553-.894L9 7m0 13V7m6-4h.01M9 20h.01"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Mapa Cen Remontów
                    </h3>
                    <p className="mt-1 text-slate-600">
                      Interaktywne narzędzie cenowe pokazujące średnie ceny remontów
                      w każdym mieście Polski. Porównaj ceny w różnych województwach
                      i poznaj trendy rynkowe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-3 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Kalkulatory wycen
                    </h3>
                    <p className="mt-1 text-slate-600">
                      Szczegółowe formularze dla poszczególnych usług remontowych
                      (łazienka, kuchnia, malowanie, kafelkowanie itp.). Otrzymasz
                      szacunkową wycenę w kilka minut.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-3 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <svg
                      className="h-6 w-6 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Raporty cenowe
                    </h3>
                    <p className="mt-1 text-slate-600">
                      Profesjonalne analizy rynkowe w formacie PDF. Szczegółowe
                      rozkłady kosztów, porównania, wskazówki negocjacyjne i
                      rekomendacje ekspertów.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-3 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Poradniki remontowe
                    </h3>
                    <p className="mt-1 text-slate-600">
                      Ekspercka wiedza o remontach, wskazówki praktyczne, porady
                      dla kupujących i najczęstsze błędy do uniknięcia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Section */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Nasze dane
            </h2>

            <div className="rounded-lg bg-slate-50 p-8 border border-slate-200">
              <p className="mb-4 text-slate-700">
                Wierzymy w siłę danych. Dlatego nasze wyceny opierają się na:
              </p>

              <ul className="mb-6 space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">✓</span>
                  <span className="text-slate-600">
                    Bezpośrednich danych od sieci zweryfikowanych wykonawców
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">✓</span>
                  <span className="text-slate-600">
                    Monitorowaniu cen materiałów budowlanych
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">✓</span>
                  <span className="text-slate-600">
                    Oficjalnych wskaźnikach Głównego Urzędu Statystycznego
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-blue font-bold">✓</span>
                  <span className="text-slate-600">
                    Analityce zaawansowanego modelowania statystycznego
                  </span>
                </li>
              </ul>

              <p className="text-slate-600">
                Model aktualizujemy kwartalnie, aby zapewnić najwyższą dokładność.
              </p>

              <Link
                href="/metodologia"
                className="mt-6 inline-flex items-center gap-2 text-brand-blue hover:text-blue-800 font-semibold"
              >
                Przeczytaj pełny opis metodologii
                <svg
                  className="h-4 w-4"
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
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Skontaktuj się z nami
            </h2>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Email
                </h3>
                <p className="text-slate-600">
                  <a
                    href="mailto:kontakt@ilezaremont.pl"
                    className="text-brand-blue hover:text-blue-800 font-semibold"
                  >
                    kontakt@ilezaremont.pl
                  </a>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Odpowiadamy w ciągu 24 godzin
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Formularz kontaktowy
                </h3>
                <p className="mb-4 text-slate-600">
                  Masz pytanie? Napisz do nas
                </p>
                <button
                  type="button"
                  disabled
                  className="rounded-lg bg-slate-100 px-4 py-2 font-semibold text-slate-500 cursor-not-allowed"
                >
                  Wkrótce dostępne
                </button>
              </div>
            </div>
          </div>

          {/* For Professionals Section */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Dla fachowców
            </h2>

            <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-8 border border-green-200">
              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                Jesteś fachowcem i chcesz dołączyć do naszej sieci wykonawców?
              </h3>

              <p className="mb-4 text-slate-700">
                Szukamy weryfikowanych, profesjonalnych wykonawców remontowych
                z całej Polski. Twoje dane i doświadczenie pomogą budować
                rzetelny obraz cen rynkowych i wspierać innych użytkowników w
                podejmowaniu świadomych decyzji.
              </p>

              <p className="mb-6 text-slate-600">
                Dołączając do sieci ilezaremont.pl:
              </p>

              <ul className="mb-6 space-y-2">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">+</span>
                  <span className="text-slate-600">
                    Zwiększysz widoczność Twojej firmy
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">+</span>
                  <span className="text-slate-600">
                    Będziesz polecany użytkownikom w Twojej okolicy
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">+</span>
                  <span className="text-slate-600">
                    Wniesiesz wkład w transparentny rynek remontów
                  </span>
                </li>
              </ul>

              <button
                type="button"
                disabled
                className="rounded-lg bg-slate-100 px-6 py-3 font-semibold text-slate-500 cursor-not-allowed"
              >
                Dołącz jako wykonawca (wkrótce)
              </button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Zacznij teraz
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/mapa-cen"
                className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-6 hover:border-brand-blue hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <svg
                    className="h-6 w-6 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6.447 3.268A1 1 0 0021 19.382V4.618a1 1 0 00-1.553-.894L9 7m0 13V7m6-4h.01M9 20h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Mapa Cen</h3>
                <p className="text-center text-sm text-slate-600">
                  Sprawdź ceny w Twoim mieście
                </p>
              </Link>

              <Link
                href="/kalkulator"
                className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-6 hover:border-brand-blue hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Kalkulator</h3>
                <p className="text-center text-sm text-slate-600">
                  Oblicz koszt remontu
                </p>
              </Link>

              <Link
                href="/poradnik"
                className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-6 hover:border-brand-blue hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Poradnik</h3>
                <p className="text-center text-sm text-slate-600">
                  Porady i artykuły
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
