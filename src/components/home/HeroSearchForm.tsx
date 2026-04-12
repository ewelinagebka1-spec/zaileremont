'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';
import { CityData } from '@/data/cities';

const SERVICES = [
  { value: 'remont-lazienki', label: 'Remont Åazienki', calcUrl: '/kalkulator/remont-lazienki' },
  { value: 'malowanie-scian', label: 'Malowanie Åcian', calcUrl: '/kalkulator/malowanie-scian' },
  { value: 'ukladanie-plytek', label: 'UkÅadanie pÅytek', calcUrl: '/kalkulator/ukladanie-plytek' },
  { value: 'meble-na-wymiar', label: 'Meble na wymiar', calcUrl: '/kalkulator/meble-na-wymiar' },
  { value: 'okna-pcv', label: 'Okna PCV', calcUrl: '/kalkulator/okna-pcv' },
];

const FURNITURE_TYPES = [
  { value: 'kuchnia', label: 'Meble kuchenne' },
  { value: 'lazienka', label: 'Meble Åazienkowe' },
  { value: 'szafa', label: 'Szafa wnÄkowa / garderoba' },
  { value: 'pokoj', label: 'Meble pokojowe (regaÅy, komody)' },
  { value: 'inne', label: 'Inne meble na wymiar' },
];

const WINDOW_TYPES = [
  { value: '1-skrzydlowe', label: 'JednoskrzydÅowe (np. 60Ã120)' },
  { value: '2-skrzydlowe', label: 'DwuskrzydÅowe (np. 150Ã150)' },
  { value: 'balkonowe', label: 'Balkonowe / tarasowe (np. 200Ã230)' },
  { value: 'fix', label: 'Fix (nieotwierane)' },
  { value: 'dachowe', label: 'Dachowe (Velux / Fakro)' },
];

const STRIPE_URL = 'https://buy.stripe.com/4gM3cv2Ub3cu9vv7i800000';

function formatPrice(value: number): string {
  return Math.round(value).toLocaleString('pl-PL');
}

export default function HeroSearchForm() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [furnitureType, setFurnitureType] = useState('');
  const [furnitureDetails, setFurnitureDetails] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    min: number;
    median: number;
    max: number;
    unit: string;
    cityName: string;
    serviceName: string;
    calcUrl: string;
    index: number;
    details?: string;
    hasFile?: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFurniture = selectedService === 'meble-na-wymiar';
  const isWindows = selectedService === 'okna-pcv';
  const hasSubcategory = isFurniture || isWindows;
  const isFormValid = selectedCity && selectedService && (!hasSubcategory || furnitureType);

  const handleSearch = () => {
    if (!isFormValid || !selectedCity) return;
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const service = SERVICES.find(s => s.value === selectedService);
      if (!service) return;
      const cityCoeff = selectedCity.coefficient || 1.0;
      let baseMin = 0, baseMedian = 0, baseMax = 0, unit = 'zÅ/mÂ²';

      switch (selectedService) {
        case 'remont-lazienki':
          baseMin = 2800; baseMedian = 3800; baseMax = 5200; unit = 'zÅ/mÂ²'; break;
        case 'malowanie-scian':
          baseMin = 18; baseMedian = 25; baseMax = 38; unit = 'zÅ/mÂ²'; break;
        case 'ukladanie-plytek':
          baseMin = 85; baseMedian = 140; baseMax = 220; unit = 'zÅ/mÂ²'; break;
        case 'meble-na-wymiar':
          switch (furnitureType) {
            case 'kuchnia': baseMin = 1200; baseMedian = 2200; baseMax = 3800; unit = 'zÅ/mb'; break;
            case 'lazienka': baseMin = 800; baseMedian = 1600; baseMax = 2800; unit = 'zÅ/mb'; break;
            case 'szafa': baseMin = 900; baseMedian = 1800; baseMax = 3200; unit = 'zÅ/mb'; break;
            case 'pokoj': baseMin = 700; baseMedian = 1400; baseMax = 2600; unit = 'zÅ/mb'; break;
            default: baseMin = 800; baseMedian = 1600; baseMax = 3000; unit = 'zÅ/mb';
          }
          break;
        case 'okna-pcv':
          switch (furnitureType) {
            case '1-skrzydlowe': baseMin = 450; baseMedian = 700; baseMax = 1100; unit = 'zÅ/szt'; break;
            case '2-skrzydlowe': baseMin = 800; baseMedian = 1200; baseMax = 1900; unit = 'zÅ/szt'; break;
            case 'balkonowe': baseMin = 1400; baseMedian = 2200; baseMax = 3500; unit = 'zÅ/szt'; break;
            case 'fix': baseMin = 350; baseMedian = 550; baseMax = 900; unit = 'zÅ/szt'; break;
            case 'dachowe': baseMin = 1200; baseMedian = 1800; baseMax = 2800; unit = 'zÅ/szt'; break;
            default: baseMin = 700; baseMedian = 1100; baseMax = 1800; unit = 'zÅ/szt';
          }
          break;
      }

      const min = Math.round(baseMin * cityCoeff);
      const median = Math.round(baseMedian * cityCoeff);
      const max = Math.round(baseMax * cityCoeff);

      const isWindows = selectedService === 'okna-pcv';
      const subTypes = isWindows ? WINDOW_TYPES : FURNITURE_TYPES;
      const subLabel = subTypes.find(ft => ft.value === furnitureType)?.label;
      const serviceName = (isFurniture || isWindows) && subLabel
        ? `${service.label} â ${subLabel}`
        : service.label;

      setResult({
        min, median, max, unit,
        cityName: selectedCity.name,
        serviceName,
        calcUrl: service.calcUrl,
        index: Math.round(cityCoeff * 100) / 100,
        details: furnitureDetails || undefined,
        hasFile: !!uploadedFile,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setSelectedCity(null);
    setSelectedService('');
    setFurnitureType('');
    setFurnitureDetails('');
    setUploadedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Fields */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <CityAutocomplete
            label="Miasto"
            placeholder="Wpisz nazwÄ miasta..."
            value={selectedCity}
            onChange={(city) => {
              setSelectedCity(city);
              setResult(null);
            }}
          />
        </div>
        <div>
          <SelectField
            label="UsÅuga"
            options={SERVICES}
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setFurnitureType('');
              setFurnitureDetails('');
              setUploadedFile(null);
              setResult(null);
            }}
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            disabled={!isFormValid || isLoading}
            variant="cta"
            size="md"
            className="w-full"
          >
            {isLoading ? 'AnalizujÄ dane...' : 'SprawdÅº cenÄ'}
          </Button>
        </div>
      </div>

      {/* Rozszerzony formularz dla mebli na wymiar i okien PCV */}
      {hasSubcategory && !result && (
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h4 className="font-semibold text-slate-800">Doprecyzuj zamÃ³wienie</h4>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <SelectField
                label={isWindows ? 'Typ okna' : 'Rodzaj mebli'}
                options={isWindows ? WINDOW_TYPES : FURNITURE_TYPES}
                value={furnitureType}
                onChange={(e) => setFurnitureType(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Opisz szczegÃ³Åy (opcjonalnie)
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder={isWindows
                  ? 'np. 5 okien, biaÅe, trzyszybowe, z roletami...'
                  : 'np. kuchnia 3m, biaÅy mat, blat kwarcowy...'}
                value={furnitureDetails}
                onChange={(e) => setFurnitureDetails(e.target.value)}
              />
            </div>
          </div>

          {/* Upload wyceny */}
          <div className="pt-2 border-t border-blue-100">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">
                  {isWindows ? 'Masz wycenÄ od producenta okien?' : 'Masz wycenÄ od stolarza?'}
                </p>
                <p className="text-xs text-slate-500">Dodaj plik (PDF, JPG, PNG) â porÃ³wnamy z cenami rynkowymi</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadedFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {uploadedFile.name.length > 20 ? uploadedFile.name.slice(0, 17) + '...' : uploadedFile.name}
                  </span>
                  <button
                    onClick={() => { setUploadedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >â</button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Dodaj wycenÄ
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center animate-fade-in">
          <div className="inline-flex items-center gap-3">
            <svg className="h-5 w-5 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm font-medium text-blue-700">
              AnalizujÄ dane rynkowe dla {selectedCity?.name}...
            </span>
          </div>
        </div>
      )}

      {/* RESULT â ceny + CTA do raportu */}
      {result && !isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden animate-fade-in">
          {/* Header wyniku */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">{result.serviceName}</h3>
                <p className="text-slate-300 text-sm">{result.cityName} &middot; Indeks vs. Warszawa: {result.index}</p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                marzec 2026
              </span>
            </div>
          </div>

          {/* Info o szczegÃ³Åach i pliku */}
          {(result.details || result.hasFile) && (
            <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-100 flex flex-wrap items-center gap-3">
              {result.details && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                  {result.details}
                </span>
              )}
              {result.hasFile && (
                <span className="text-xs text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Wycena zaÅÄczona â porÃ³wnamy w raporcie
                </span>
              )}
            </div>
          )}

          {/* Ceny: MIN / MEDIANA / MAX */}
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            <div className="p-5 text-center">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Minimum</p>
              <p className="text-xl font-bold text-slate-700">{formatPrice(result.min)}</p>
              <p className="text-xs text-slate-400">{result.unit}</p>
            </div>
            <div className="p-5 text-center bg-blue-50">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Mediana</p>
              <p className="text-2xl font-bold text-blue-700">{formatPrice(result.median)}</p>
              <p className="text-xs text-blue-500">{result.unit}</p>
            </div>
            <div className="p-5 text-center">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Maksimum</p>
              <p className="text-xl font-bold text-slate-700">{formatPrice(result.max)}</p>
              <p className="text-xs text-slate-400">{result.unit}</p>
            </div>
          </div>

          {/* CTA do raportu â glowna sekcja konwersji */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100 p-6">
            {/* Naglowek + przycisk */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-lg">PeÅny raport cenowy â 29 zÅ</h4>
                <p className="text-sm text-slate-500 mt-0.5">10 stron analizy &middot; PDF &middot; dostawa w ciÄgu 1h na e-mail</p>
              </div>
              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); window.open(STRIPE_URL, '_blank', 'noopener,noreferrer'); }}
                className="shrink-0 inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm no-underline text-center cursor-pointer"
              >
                Pobierz raport â 29 zÅ
              </a>
            </div>

            {/* Checkpointy korzysci â 2 kolumny */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">RozkÅad cen z 5 percentylami</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">PorÃ³wnanie cen w 15 miastach</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">Trend cenowy z 12 miesiÄcy</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">Rozbicie: robocizna vs. materiaÅy</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">Checklista negocjacyjna (20 pkt)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">WzÃ³r umowy z wykonawcÄ</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">ProtokÃ³Å odbioru prac</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">Czynniki wpÅywajÄce na cenÄ</span>
              </div>
            </div>

            {/* Podglad przykladu â maly link, nie rozprasza */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400">
                14 dni na zwrot &middot; PÅatnoÅÄ BLIK, karta, przelew
              </p>
            </div>
          </div>

          {/* Footer z linkami */}
          <div className="bg-slate-50 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">
              Ceny wyliczone algorytmem ilezaremont.pl na podstawie danych od wykonawcÃ³w
            </p>
            <div className="flex gap-3">
              <Link href={result.calcUrl} className="text-xs font-medium text-blue-600 hover:text-blue-800">
                SzczegÃ³Åowy kalkulator &rarr;
              </Link>
              <button onClick={handleReset} className="text-xs font-medium text-slate-500 hover:text-slate-700">
                Nowe wyszukiwanie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trust Badges â only when no result */}
      {!result && !isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Dane od wykonawcÃ³w</p>
              <p className="text-xs text-slate-500">Zweryfikowane ceny rynkowe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Aktualizacja kwartalna</p>
              <p className="text-xs text-slate-500">Model z marca 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Model statystyczny</p>
              <p className="text-xs text-slate-500">Algorytm + dane GUS</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
