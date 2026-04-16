import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-2xl font-extrabold tracking-tight leading-tight">
                <span className="text-brand-blue">ile</span><span className="text-accent-orange">za</span><span className="text-brand-green">remont</span><span className="text-slate-500">.pl</span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Mapa Cen Remontów
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Kompleksowa analiza cen remontów i budowy w Polsce.
            </p>
            <div className="text-xs text-slate-500 space-y-0.5">
              <p className="font-semibold text-slate-700">Adsales sp. z o.o.</p>
              <p>NIP: 813 381 82 58</p>
              <p>E-mail: raport@ilezaremont.pl</p>
            </div>
          </div>

          {/* Kalkulatory */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Kalkulatory</h3>
            <ul className="space-y-2">
              <li><Link href="/kalkulator/kuchnia-na-wymiar" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Kuchnia na wymiar</Link></li>
              <li><Link href="/kalkulator/remont-lazienki" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Remont łazienki</Link></li>
              <li><Link href="/kalkulator/malowanie-scian" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Malowanie ścian</Link></li>
              <li><Link href="/kalkulator/ukladanie-plytek" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Układanie płytek</Link></li>
            </ul>
          </div>

          {/* Narzędzia */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Narzędzia</h3>
            <ul className="space-y-2">
              <li><Link href="/mapa-cen" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Mapa Cen</Link></li>
              <li><Link href="/poradnik" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Poradnik</Link></li>
              <li><Link href="/metodologia" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Metodologia</Link></li>
              <li><Link href="/o-nas" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">O nas</Link></li>
            </ul>
          </div>

          {/* Informacje prawne */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Informacje prawne</h3>
            <ul className="space-y-2">
              <li><Link href="/regulamin" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Regulamin serwisu</Link></li>
              <li><Link href="/polityka-prywatnosci" className="text-sm text-slate-600 hover:text-brand-blue transition-smooth">Polityka prywatności</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-8 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-700">
              <span className="font-semibold text-brand-blue">
                Ważna informacja:
              </span>
              {' '}Dane prezentowane w serwisie ilezaremont.pl zostały wyliczone algorytmem
              na podstawie danych historycznych z lat ubiegłych. Wartości mogą
              się różnić od aktualnych cen rynkowych. Rekomendujemy weryfikację
              cen u konkretnych wykonawców i dostawców materiałów.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-600">
            &copy; {currentYear} ilezaremont.pl &middot; Adsales sp. z o.o. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link
              href="/regulamin"
              className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
            >
              Regulamin
            </Link>
            <Link
              href="/polityka-prywatnosci"
              className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/mapa-cen"
              className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
            >
              Mapa cen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
          }
