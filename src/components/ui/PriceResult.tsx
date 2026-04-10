'use client';

interface PriceResultProps {
  // Wzorzec 1: z MapaCen
  serviceName?: string;
  city?: string;
  district?: string;
  area?: number;
  marketType?: string;
  minPrice?: number;
  medianPrice?: number;
  maxPrice?: number;
  percentiles?: {
    p10?: number;
    p25?: number;
    p50?: number;
    p75?: number;
    p90?: number;
  };
  // Wzorzec 2: z kalkulatorów
  title?: string;
  subtitle?: string;
  min?: number;
  median?: number;
  max?: number;
  unit?: string;
}

function formatPrice(price: number | undefined | null): string {
  const safePrice = typeof price === 'number' && !isNaN(price) ? price : 0;
  return safePrice.toLocaleString('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function PriceResult(props: PriceResultProps) {
  // Normalizuj propsy — obsługa obu wzorców
  const minVal = props.minPrice ?? props.min ?? 0;
  const medianVal = props.medianPrice ?? props.median ?? 0;
  const maxVal = props.maxPrice ?? props.max ?? 0;
  const unitText = props.unit || 'zł';

  const headerTitle =
    props.title ||
    (props.serviceName ? `Szacunkowy koszt ${props.serviceName}` : 'Szacunkowy koszt');

  const subtitleText =
    props.subtitle ||
    (props.district
      ? `${props.city || '—'}, ${props.district} · ${props.area ?? '—'} m² · rynek ${props.marketType || '—'}`
      : props.city
        ? `${props.city} · ${props.area ?? '—'} m² · rynek ${props.marketType || '—'}`
        : '');

  const percentiles = props.percentiles || {
    p10: minVal,
    p25: minVal + (medianVal - minVal) * 0.25,
    p50: medianVal,
    p75: minVal + (medianVal - minVal) * 0.75,
    p90: maxVal,
  };

  const maxValue = Math.max(maxVal, percentiles.p90 || 0) || 1;
  const getPercentageWidth = (value: number) => (value / maxValue) * 100;

  const unitSuffix = unitText.includes('zł') ? '' : 'zł';

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-md-card">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">{headerTitle}</h2>
        {subtitleText && <p className="mt-2 text-sm text-slate-600">{subtitleText}</p>}
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MIN</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(minVal)} <span className="text-base">zł{unitSuffix}</span>
          </p>
          {props.unit && <p className="text-xs text-slate-400 mt-1">{props.unit}</p>}
        </div>
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">ŚREDNIA</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(medianVal)} <span className="text-base">zł{unitSuffix}</span>
          </p>
          {props.unit && <p className="text-xs text-slate-400 mt-1">{props.unit}</p>}
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MAX</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(maxVal)} <span className="text-base">zł{unitSuffix}</span>
          </p>
          {props.unit && <p className="text-xs text-slate-400 mt-1">{props.unit}</p>}
        </div>
      </div>

      <div className="mb-8 space-y-3">
        {[
          { l: 'p10', v: percentiles.p10 ?? minVal, c: 'bg-blue-200' },
          { l: 'p25', v: percentiles.p25 ?? minVal, c: 'bg-blue-300' },
          { l: 'p50', v: percentiles.p50 ?? medianVal, c: 'bg-brand-blue' },
          { l: 'p75', v: percentiles.p75 ?? maxVal, c: 'bg-blue-400' },
          { l: 'p90', v: percentiles.p90 ?? maxVal, c: 'bg-blue-500' },
        ].map((p) => (
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
        href="/kup-raport"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-orange to-orange-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2"
      >
        Sprawdź pełny raport
      </a>
    </div>
  );
}
