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

function formatPrice(price: number): string {
  return price.toLocaleString('pl-PL', {
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
  // Calculate percentile widths for bar chart
  const maxValue = Math.max(maxPrice, percentiles.p90 || 0);
  const getPercentageWidth = (value: number) => (value / maxValue) * 100;

  const subtitle = district
    ? `${city}, ${district} · ${area} m² · rynek ${marketType}`
    : `${city} · ${area} m² · rynek ${marketType}`;

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-md-card">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Szacunkowy koszt {serviceName}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      </div>

      {/* Price Boxes */}
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

      {/* Percentile Chart */}
      <div className="mb-8 space-y-3">
        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium text-slate-600">p10</span>
            <span className="text-xs text-slate-500">
              {percentiles.p10 ? formatPrice(percentiles.p10) : '—'} zł
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-200"
              style={{
                width: `${getPercentageWidth(percentiles.p10 || minPrice)}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium text-slate-600">p25</span>
            <span className="text-xs text-slate-500">
              {percentiles.p25 ? formatPrice(percentiles.p25) : '—'} zł
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-300"
              style={{
                width: `${getPercentageWidth(percentiles.p25 || minPrice)}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium text-slate-600">p50</span>
            <span className="text-xs text-slate-500">
              {percentiles.p50 ? formatPrice(percentiles.p50) : '—'} zł
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-brand-blue"
              style={{
                width: `${getPercentageWidth(percentiles.p50 || medianPrice)}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium text-slate-600">p75</span>
            <span className="text-xs text-slate-500">
              {percentiles.p75 ? formatPrice(percentiles.p75) : '—'} zł
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-400"
              style={{
                width: `${getPercentageWidth(percentiles.p75 || maxPrice)}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium text-slate-600">p90</span>
            <span className="text-xs text-slate-500">
              {percentiles.p90 ? formatPrice(percentiles.p90) : '—'} zł
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-500"
              style={{
                width: `${getPercentageWidth(percentiles.p90 || maxPrice)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-8 border-t border-slate-200" />

      {/* Footer */}
      <div className="mb-6 space-y-2">
        <p className="text-xs text-slate-600">
          Ceny wyliczone algorytmem ilezaremont.pl na podstawie danych od
          wykonawców i wskaźników rynkowych. Aktualizacja modelu: marzec 2026.
        </p>
      </div>

      {/* CTA Button — clickable link to Stripe */}
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
'use client';

import Button from './Button';
import CountdownTimer from './CountdownTimer';

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
  // Wzorzec 2: z kalkulatorów
  title?: string;
  subtitle?: string;
  min?: number;
  median?: number;
  max?: number;
  unit?: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString('pl-PL', {
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

  const headerTitle = props.title || (props.serviceName ? `Szacunkowy koszt ${props.serviceName}` : 'Szacunkowy koszt');
  const subtitleText = props.subtitle || (props.district
    ? `${props.city}, ${props.district} · ${props.area} m² · rynek ${props.marketType}`
    : props.city
      ? `${props.city} · ${props.area} m² · rynek ${props.marketType}`
      : '');


  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-md-card">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">{headerTitle}</h2>
        {subtitleText && <p className="mt-2 text-sm text-slate-600">{subtitleText}</p>}
      </div>

      {/* Price Boxes */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MIN</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(minVal)} <span className="text-base">{unitText.includes('zł') ? '' : 'zł'}</span>
          </p>
          {props.unit && <p className="text-xs text-slate-400 mt-1">{props.unit}</p>}
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">ŚREDNIA</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(medianVal)} <span className="text-base">{unitText.includes('zł') ? '' : 'zł'}</span>
          </p>
          {props.unit && <p className="text-xs text-slate-400 mt-1">{props.unit}</p>}
        </div>

        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase text-slate-600">MAX</p>
          <p className="mt-2 text-2xl font-bold text-brand-blue">
            {formatPrice(maxVal)} <span className="text-base">{unitText.includes('zł') ? '' : 'zł'}</span>
          </p>
          {props.unit && <p className="text-xs text-slate-400 mt-1">{props.unit}</p>}
        </div>
      </div>

      {/* Pasek cenowy MIN → ŚR → MAX */}
      <div className="mb-8">
        <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 overflow-hidden">
          {/* Marker średniej */}
          <div
            className="absolute top-0 h-full w-1 bg-brand-blue rounded-full"
            style={{ left: `${maxVal > 0 ? (medianVal / maxVal) * 100 : 50}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-slate-500">
          <span>MIN: {formatPrice(minVal)} zł</span>
          <span className="font-semibold text-brand-blue">ŚR: {formatPrice(medianVal)} zł</span>
          <span>MAX: {formatPrice(maxVal)} zł</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-8 border-t border-slate-200" />

      {/* Footer */}
      <div className="mb-6 space-y-2">
        <p className="text-xs text-slate-600">
          Ceny wyliczone algorytmem zaileremont.pl na podstawie danych od
          wykonawców i wskaźników rynkowych. Aktualizacja modelu: marzec 2026.
        </p>
      </div>

      {/* Countdown */}
      <CountdownTimer className="mb-4" />

      {/* CTA Button */}
      <a href="/kup-raport" className="block">
        <Button variant="cta" size="lg" className="w-full">
          Pobierz pełny raport — <span className="line-through text-red-300 decoration-red-500 decoration-2 mr-1 text-lg">69,99 zł</span> <span className="text-xl font-extrabold">29,99 zł</span>
        </Button>
      </a>
    </div>
  );
}
