'use client';

const STRIPE_URL = 'https://buy.stripe.com/4gM3cv2Ub3cu9vv7i800000';

interface PriceResultProps {
  serviceName: string;
  city: string;
  district?: string;
  area: number;
  marketType: string;
  minPrice: number;
  medianPrice: number;
  maxPrice: number;
  percentiles?: {
    p10?: number;
    p25?: number;
    p50?: number;
    p75?: number;
    p90?: number;
  };
}

function formatPrice(price: number | undefined | null): string {
  const safePrice = typeof price === 'number' && !isNaN(price) ? price : 0;
  return safePrice.toLocaleString('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function PriceResult({
  serviceName,
  city,
  district,
  area,
  marketType,
  minPrice,
  medianPrice,
  maxPrice,
  percentiles = {
    p10: minPrice,
    p25: minPrice + (medianPrice - minPrice) * 0.25,
    p50: medianPrice,
    p75: minPrice + (medianPrice - minPrice) * 0.75,
    p90: maxPrice,
  },
}: PriceResultProps) {
  const maxValue = Math.max(maxPrice, percentiles.p90 || 0);
  const getPercentageWidth = (value: number) => (value / maxValue) * 100;

  const subtitle = district
    ? `${city}, ${district} · ${area} m² · rynek ${marketType}`
    : `${city} · ${area} m² · rynek ${marketType}`;

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-md-card">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Szacunkowy koszt {serviceName}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MIN</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(minPrice)} <span className="text-base">zł</span>
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MEDIANA</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(medianPrice)} <span className="text-base">zł</span>
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MAX</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(maxPrice)} <span className="text-base">zł</span>
          </p>
        </div>
      </div>

      <div className="mb-8 space-y-3">
        {[{l:'p10',v:percentiles.p10||minPrice,c:'bg-blue-200'},{l:'p25',v:percentiles.p25||minPrice,c:'bg-blue-300'},{l:'p50',v:percentiles.p50||medianPrice,c:'bg-brand-blue'},{l:'p75',v:percentiles.p75||maxPrice,c:'bg-blue-400'},{l:'p90',v:percentiles.p90||maxPrice,c:'bg-blue-500'}].map(p => (
          <div key={p.l} className="space-y-1">
            <div className="flex items-end justify-between">
              <span className="text-xs font-medium text-slate-600">{p.l}</span>
              <span className="text-xs text-slate-500">{formatPrice(p.v)} zł</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className={`h-full ${p.c}`} style={{ width: `${getPercentageWidth(p.v)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 border-t border-slate-200" />

      <div className="mb-6 space-y-2">
        <p className="text-xs text-slate-600">
          Ceny wyliczone algorytmem ilezaremont.pl na podstawie danych od
          wykonawców i wskaźników rynkowych. Aktualizacja modelu: marzec 2026.
        </p>
      </div>

      <a
        href={STRIPE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-orange to-orange-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2"
      >
        <span className="text-base line-through opacity-60">69 zł</span>
        Pobierz pełny raport cenowy — 29 zł
      </a>
    </div>
  );
}
