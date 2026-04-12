'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import CountdownTimer from '@/components/ui/CountdownTimer';

function KupRaportContent() {
  const searchParams = useSearchParams();
  const typ = searchParams.get('typ') || 'remont';
  const miasto = searchParams.get('miasto') || '';
  const ksztalt = searchParams.get('ksztalt') || '';
  const dlugosc = searchParams.get('dlugosc') || '';

  // URL step tracking for pixel integration
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('krok', 'zakup');
    window.history.replaceState({}, "", url.toString());
  }, []);
  const [email, setEmail] = useState('');

  const titleMap: Record<string, string> = {
    kuchnia: 'Kuchnia na wymiar',
    lazienka: 'Remont łazienki',
    malowanie: 'Malowanie ścian',
    plytki: 'Układanie płytek',
    okna: 'Okna PCV',
    remont: 'Raport cenowy',
    szafa: 'Szafa wnękowa',
    pokoj: 'Meble pokojowe',
  };

  const headingMap: Record<string, string> = {
    kuchnia: 'Nie przepłacaj za kuchnię marzeń',
    lazienka: 'Nie przepłacaj za łazienkę marzeń',
    malowanie: 'Nie przepłacaj za malowanie',
    plytki: 'Nie przepłacaj za układanie płytek',
    okna: 'Nie przepłacaj za wymianę okien',
    remont: 'Nie przepłacaj za remont',
    szafa: 'Nie przepłacaj za szafę wnękową',
    pokoj: 'Nie przepłacaj za meble pokojowe',
  };

  const imageMap: Record<string, {src: string, alt: string}[]> = {
    kuchnia: [
      {src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', alt: 'Nowoczesna kuchnia'},
      {src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop', alt: 'Jasna kuchnia z drewnianymi szafkami'},
      {src: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=400&fit=crop', alt: 'Rodzina gotująca w kuchni'},
    ],
    lazienka: [
      {src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop', alt: 'Nowoczesna łazienka'},
      {src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop', alt: 'Elegancka łazienka z prysznicem'},
      {src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', alt: 'Jasna łazienka z wanną'},
    ],
    malowanie: [
      {src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop', alt: 'Malowanie ścian'},
      {src: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop', alt: 'Kolorowe ściany w mieszkaniu'},
      {src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop', alt: 'Profesjonalne malowanie'},
    ],
    plytki: [
      {src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop', alt: 'Piękne płytki ceramiczne'},
      {src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=400&fit=crop', alt: 'Układanie płytek'},
      {src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop', alt: 'Nowoczesna podłoga'},
    ],
    okna: [
      {src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', alt: 'Nowoczesne okna PCV'},
      {src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=400&fit=crop', alt: 'Jasne okna w salonie'},
      {src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop', alt: 'Duże okna z widokiem'},
    ],
    remont: [
      {src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop', alt: 'Remont mieszkania'},
      {src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop', alt: 'Nowoczesne wnętrze po remoncie'},
      {src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop', alt: 'Piękne wykończenie wnętrza'},
    ],
      szafa: [
      { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800', alt: 'Szafa wnękowa' },
      { src: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800', alt: 'Garderoba na wymiar' },
      { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800', alt: 'Szafa przesuwna' },
    ],
    pokoj: [
      { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', alt: 'Meble pokojowe' },
      { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', alt: 'Regały na wymiar' },
      { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', alt: 'Komoda na wymiar' },
    ],
  };

  const images = imageMap[typ] || imageMap.remont;
  const heading = headingMap[typ] || headingMap.remont;

  const title = titleMap[typ] || titleMap['remont'];

  const stripeUrl = `https://buy.stripe.com/4gM3cv2Ub3cu9vv7i800000`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Hero z inspiracją */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
          <div className="grid grid-cols-3 h-52">
            <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
            <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
            <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
            <h1 className="text-3xl font-bold mb-1">{heading}</h1>
            <p className="text-white/80 text-lg">
              {title}{miasto ? ` — ${miasto}` : ''}{ksztalt ? ` (${ksztalt}` : ''}{dlugosc ? `, ${dlugosc} mb)` : ksztalt ? ')' : ''}
            </p>
          </div>
        </div>

        {/* Sekcja korzyści — co zyskujesz */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Co zyskujesz z raportem?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">💰</span>
              <div>
                <p className="font-semibold text-slate-800">Oszczędność 5 000 — 7 000 zł</p>
                <p className="text-sm text-slate-500">Wiesz ile naprawdę kosztuje każdy element. Nie dasz się naciągnąć wykonawcy ani salonowi meblowemu.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">⏱️</span>
              <div>
                <p className="font-semibold text-slate-800">Oszczędność 20+ godzin</p>
                <p className="text-sm text-slate-500">Zamiast jeździć po 5 salonach i zbierać wyceny — dostajesz porównanie w jednym PDF w ciągu 1 godziny.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">🛡️</span>
              <div>
                <p className="font-semibold text-slate-800">Unikasz kosztownych błędów</p>
                <p className="text-sm text-slate-500">Checklista 15 checkpunktów układu kuchni — nie popełnisz błędów, które kosztują tysiące złotych do naprawienia.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl shrink-0">🤝</span>
              <div>
                <p className="font-semibold text-slate-800">Negocjujesz z pozycji siły</p>
                <p className="text-sm text-slate-500">20-punktowa checklista negocjacyjna — wiesz o co pytać, czego wymagać i jak zbić cenę nawet o 15–20%.</p>
              </div>
            </div>
          </div>
        </div>


        {/* Karta produktu z płatnością */}
        <div className="bg-white rounded-xl border-2 border-orange-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-lg">Pełny raport PDF</span>
                <p className="text-orange-100 text-sm mt-0.5">Dostajesz na e-mail w ciągu 1 godziny</p>
              </div>
              <div className="text-right">
                <span className="text-lg line-through text-white/50 decoration-red-300 decoration-2 block">69,99 zł</span>
                <span className="text-4xl font-extrabold">29,99 zł</span>
                <span className="block text-xs text-orange-200 font-medium mt-0.5">-57% taniej!</span>
              </div>
            </div>
            <CountdownTimer className="mt-3" />
          </div>

          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Co zawiera raport:</p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">✓</span>
                Ceny minimalne, średnie i maksymalne dla Twojego miasta
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">✓</span>
                Porównanie cen w 15 miastach Polski
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">✓</span>
                Rozbicie kosztów element po elemencie
              </li>
              {typ === 'kuchnia' && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-bold">✓</span>
                    Ceny u 4 dostawców: IKEA, Agata, Castorama, stolarz
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-bold">✓</span>
                    20-punktowa checklista negocjacyjna (jak zbić cenę)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-bold">✓</span>
                    15 checkpunktów optymalnego układu kuchni (uniknij błędów)
                  </li>
                </>
              )}
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">✓</span>
                Wzór umowy z wykonawcą + protokół odbioru
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 font-bold">✓</span>
                Trend cenowy 12 miesięcy + prognoza
              </li>
            </ul>
          </div>

          <div className="border-t border-orange-100 px-6 py-5 bg-orange-50/30">
            {/* Formularz email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                E-mail (raport wyślemy na ten adres)
              </label>
              <input
                type="email"
                placeholder="twoj@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Button Stripe */}
            <a
              href={stripeUrl}
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-center shadow-lg hover:shadow-xl text-lg"
            >
              Kupuję raport — <span className="line-through text-white/50 decoration-red-300 decoration-2 mr-1">69,99 zł</span> <span className="text-xl font-extrabold">29,99 zł</span>
            </a>

            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
              <span>BLIK</span>
              <span>·</span>
              <span>Karta</span>
              <span>·</span>
              <span>Przelew</span>
              <span>·</span>
              <span>Google Pay</span>
            </div>
          </div>
        </div>

        {/* Bez raportu vs z raportem */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-bold text-red-800 mb-2">Bez raportu:</p>
            <ul className="text-xs text-red-700 space-y-1.5">
              <li>Jedziesz do 5 salonów — tracisz weekendy</li>
              <li>Nie wiesz czy cena jest dobra</li>
              <li>Wykonawca zawyża pozycje o 20–30%</li>
              <li>Błędy w układzie kosztują 3–8 tys. zł</li>
              <li>Nie wiesz o co pytać przy odbiorze</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-bold text-green-800 mb-2">Z raportem za 29,99 zł:</p>
            <ul className="text-xs text-green-700 space-y-1.5">
              <li>Porównanie 4 dostawców w jednym raporcie</li>
              <li>Znasz cenę MIN, ŚR i MAX każdego elementu</li>
              <li>Checklista negocjacyjna — zbijasz cenę</li>
              <li>15 checkpunktów — zero kosztownych błędów</li>
              <li>Wzór umowy + protokół odbioru</li>
            </ul>
          </div>
        </div>

        {/* Social proof */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-amber-900 font-medium mb-2">Czy wiesz, że...</p>
          <p className="text-sm text-amber-800">
            Średni Polak przepłaca za remont kuchni od 3 000 do 8 000 zł, bo nie zna realnych cen rynkowych i nie wie o co pytać wykonawcę.
            Nasz raport kosztuje mniej niż kawa w salonie meblowym — a może zaoszczędzić Ci wielokrotność tej kwoty.
          </p>
        </div>

        {/* Jak to działa */}
        <div className="text-center mb-8">
          <h3 className="font-bold text-slate-800 mb-4">Jak to działa?</h3>
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-600">
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-orange-700">1</span>
              </div>
              <p className="font-medium text-slate-800">Zapłać 29,99 zł</p>
              <p className="mt-0.5">BLIK, karta lub przelew</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-orange-700">2</span>
              </div>
              <p className="font-medium text-slate-800">Sprawdź e-mail</p>
              <p className="mt-0.5">Raport PDF w ciągu 1 godziny</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-orange-700">3</span>
              </div>
              <p className="font-medium text-slate-800">Negocjuj z wiedzą</p>
              <p className="mt-0.5">Oszczędź nawet 7 000 zł</p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>⚡</span>
            <span>Dostawa w ciągu 1h</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔒</span>
            <span>Bezpieczna płatność Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KupRaportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Ładowanie...</div>}>
      <KupRaportContent />
    </Suspense>
  );
        }
