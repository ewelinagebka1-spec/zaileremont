'use client';

import React, { useMemo } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CityData, CITIES } from '@/data/cities';
import { calculatePrice, generateCityComparison } from '@/lib/pricing-engine';
import { PricingFormAnswers } from '@/lib/pricing-engine';

interface MapaCenResultProps {
  city: CityData;
  serviceType: string;
}

const SERVICE_NAMES: Record<string, string> = {
  bathroom: 'Remont łazienki',
  painting: 'Malowanie ścian',
  tiles: 'Układanie płytek',
  flooring: 'Wymiana podłóg',
  electrical: 'Instalacja elektryczna',
  plumbing: 'Instalacja hydrauliczna',
  drywall: 'Gładź gipsowa',
};

const SERVICE_ITEMS: Record<string, string[]> = {
  bathroom: [
    'bathroom_demolition_basic',
    'bathroom_surface_prep',
    'bathroom_waterproofing_basic',
    'bathroom_tiles_medium',
    'bathroom_grouting',
    'bathroom_plumbing_basic',
    'bathroom_electrical_basic',
  ],
  painting: [
    'painting_surface_prep_medium',
    'painting_primer_standard',
    'painting_acrylic_2coats',
  ],
  tiles: [
    'tiles_surface_prep',
    'tiles_ceramic_standard',
    'tiles_grouting_sand',
  ],
  flooring: [
    'tiles_surface_prep',
    'tiles_ceramic_standard',
    'tiles_grouting_sand',
  ],
  electrical: [
    'bathroom_electrical_basic',
  ],
  plumbing: [
    'bathroom_plumbing_basic',
  ],
  drywall: [
    'bathroom_drywall',
  ],
};

export default function MapaCenResult({ city, serviceType }: MapaCenResultProps) {
  // Map service types if needed
  const mappedServiceType = ['bathroom', 'painting', 'tiles'].includes(serviceType)
    ? (serviceType as 'bathroom' | 'painting' | 'tiles')
    : ('bathroom' as 'bathroom' | 'painting' | 'tiles');

  const items = SERVICE_ITEMS[serviceType] || SERVICE_ITEMS['bathroom'];

  const result = useMemo(() => {
    const answers: PricingFormAnswers = {
      city: city.id,
      serviceType: mappedServiceType,
      area: 10, // Standard 10m2 for comparison
      selectedItems: items,
      marketType: 'secondary',
      standard: 'standard',
    };

    return calculatePrice(answers);
  }, [city, serviceType, mappedServiceType, items]);

  const warsawCoefficient = 1.25;
  const indexVsWarsaw = (city.coefficient / warsawCoefficient).toFixed(2);

  // City comparison
  const comparison = useMemo(() => {
    const answers: PricingFormAnswers = {
      city: city.id,
      serviceType: mappedServiceType,
      area: 10,
      selectedItems: items,
      marketType: 'secondary',
      standard: 'standard',
    };

    const allCities = CITIES.map(c => c.id);
    const top10Cities = CITIES.sort((a, b) => b.coefficient - a.coefficient)
      .slice(0, 10)
      .map(c => c.id);

    return generateCityComparison(answers, top10Cities);
  }, [city, serviceType, mappedServiceType, items]);

  // Percentile visualization
  const percentiles = [
    { label: 'p10', value: result.p10, color: 'bg-emerald-500' },
    { label: 'p25', value: result.p25, color: 'bg-yellow-400' },
    { label: 'p50', value: result.p50, color: 'bg-orange-500' },
    { label: 'p75', value: result.p75, color: 'bg-orange-600' },
    { label: 'p90', value: result.p90, color: 'bg-red-500' },
  ];

  const maxValue = Math.max(...percentiles.map(p => p.value));

  return (
    <div className="space-y-8">
      {/* Price Summary Card */}
      <Card padding="lg" className="border-2 border-accent-orange bg-gradient-to-br from-white to-orange-50">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Mapa Cen Remontów — {city.name}
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Usługa: {SERVICE_NAMES[serviceType] || serviceType}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold text-emerald-700">MIN</p>
              <p className="mt-2 text-3xl font-bold text-emerald-900">
                {Math.round(result.p10)}
              </p>
              <p className="text-xs text-emerald-700">zł/m²</p>
            </div>

            <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
              <p className="text-xs font-semibold text-orange-700">MEDIANA</p>
              <p className="mt-2 text-3xl font-bold text-orange-900">
                {Math.round(result.p50)}
              </p>
              <p className="text-xs text-orange-700">zł/m²</p>
            </div>

            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <p className="text-xs font-semibold text-red-700">MAX</p>
              <p className="mt-2 text-3xl font-bold text-red-900">
                {Math.round(result.p90)}
              </p>
              <p className="text-xs text-red-700">zł/m²</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-600">Indeks vs. Warszawa</p>
              <p className="text-2xl font-bold text-slate-900">{indexVsWarsaw}</p>
            </div>
            <div className="text-xs text-slate-500">
              Ceny wyliczone algorytmem ilezaremont.pl
            </div>
          </div>
        </div>
      </Card>

      {/* Percentile Distribution */}
      <Card padding="lg">
        <h3 className="mb-6 text-xl font-bold text-slate-900">Rozkład percentylowy</h3>

        <div className="space-y-4">
          {percentiles.map((p) => (
            <div key={p.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{p.label}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {Math.round(p.value)} zł/m²
                </span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-slate-100">
                <div
                  className={`h-full ${p.color} transition-all duration-500`}
                  style={{ width: `${(p.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* City Comparison Table */}
      <Card padding="lg">
        <h3 className="mb-6 text-xl font-bold text-slate-900">
          Porównanie miast
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Miasto
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Min
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Mediana
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Max
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Indeks
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c, idx) => {
                const isCurrentCity = c.city === city.name;
                return (
                  <tr
                    key={idx}
                    className={`border-b border-slate-100 transition-colors ${
                      isCurrentCity
                        ? 'bg-accent-orange/10'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className={`px-4 py-3 ${isCurrentCity ? 'font-bold text-orange-700' : 'text-slate-900'}`}>
                      {c.city}
                      {isCurrentCity && (
                        <span className="ml-2 rounded-full bg-accent-orange px-2 py-0.5 text-xs font-semibold text-white">
                          bieżące
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {Math.round(c.minPrice)} zł/m²
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {Math.round(c.medianPrice)} zł/m²
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {Math.round(c.maxPrice)} zł/m²
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {c.coefficient.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Trend Section */}
      <Card padding="lg" className="bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Trend cenowy</h3>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">+8% r/r</span> (dane GUS: CPI dla usług budowlanych)
          </p>

          {/* Mini chart - last 4 quarters */}
          <div className="flex items-end gap-2">
            {[72, 78, 82, 88].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="h-1 w-8 rounded bg-gradient-to-t from-accent-orange to-orange-400"
                  style={{ height: `${value * 1.2}px` }}
                />
                <span className="text-xs text-slate-600">Q{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* CTA Section */}
      <Card padding="lg" className="border-2 border-transparent bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">Pobierz pełny raport cenowy</h3>
            <p className="mt-2 text-lg font-semibold text-blue-100">29 zł</p>
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>Szczegółowa analiza cen w Twoim mieście</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>Porównanie ze wszystkimi miastami w Polsce</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>Trendy cenowe i prognozy</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>Kalkulatory dla każdej usługi</span>
            </li>
          </ul>

          <Button
            variant="primary"
            size="lg"
            className="w-full bg-white text-blue-600 hover:bg-blue-50"
          >
            Kupuję raport
          </Button>

          <p className="text-center text-sm text-blue-100">
            14 dni na zwrot · Natychmiastowy dostęp · PDF
          </p>
        </div>
      </Card>
    </div>
  );
}
