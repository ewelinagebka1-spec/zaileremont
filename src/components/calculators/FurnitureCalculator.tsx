'use client';

import { useState, useRef } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SelectField from '@/components/ui/SelectField';
import NumberInput from '@/components/ui/NumberInput';
import RadioGroup from '@/components/ui/RadioGroup';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import StepIndicator from '@/components/ui/StepIndicator';
import PriceResult from '@/components/ui/PriceResult';
import { CityData } from '@/data/cities';

const STEPS = [
  'Rodzaj mebli',
  'Wymiary',
  'Materiały',
  'Wyposażenie',
  'Lokalizacja',
  'Wycena',
];

const FURNITURE_TYPES = [
  { value: 'kuchnia', label: 'Meble kuchenne' },
  { value: 'lazienka', label: 'Meble łazienkowe' },
  { value: 'szafa', label: 'Szafa wnękowa / garderoba' },
  { value: 'pokoj', label: 'Meble pokojowe (regały, komody)' },
];

const FRONT_MATERIALS = [
  { value: 'laminated', label: 'Płyta laminowana (standard)' },
  { value: 'mdf-paint', label: 'MDF lakierowany (średnia)' },
  { value: 'mdf-milled', label: 'MDF frezowany (wyższa)' },
  { value: 'wood', label: 'Drewno lite (premium)' },
  { value: 'glass', label: 'Szkło / lustro (premium)' },
];

const COUNTERTOP_OPTIONS = [
  { value: 'laminate', label: 'Laminat (standard)' },
  { value: 'conglomerate', label: 'Konglomerat kwarcowy' },
  { value: 'stone', label: 'Kamień naturalny (granit, marmur)' },
  { value: 'wood', label: 'Drewno lite (dąb, buk)' },
  { value: 'none', label: 'Bez blatu' },
];

const EQUIPMENT_OPTIONS = [
  { id: 'softclose', label: 'Cichy domyk (zawiasy + szuflady)' },
  { id: 'cargo', label: 'Cargo / wysuwane kosze' },
  { id: 'led', label: 'Oświetlenie LED' },
  { id: 'drawers', label: 'Dodatkowe szuflady (ponad standard)' },
  { id: 'mirror', label: 'Lustra wewnętrzne (szafy)' },
  { id: 'organizer', label: 'Organizery i akcesoria' },
];

export default function FurnitureCalculator() {
  const [step, setStep] = useState(0);
  const [furnitureType, setFurnitureType] = useState('');
  const [furnitureDesc, setFurnitureDesc] = useState('');
  const [lengthMb, setLengthMb] = useState(3);
  const [heightCm, setHeightCm] = useState(220);
  const [depthCm, setDepthCm] = useState(60);
  const [frontMaterial, setFrontMaterial] = useState('laminated');
  const [countertop, setCountertop] = useState('laminate');
  const [equipment, setEquipment] = useState<string[]>(['softclose']);
  const [city, setCity] = useState<CityData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const canNext = () => {
    switch (step) {
      case 0: return !!furnitureType;
      case 1: return lengthMb > 0;
      case 2: return !!frontMaterial;
      case 3: return true;
      case 4: return !!city;
      default: return false;
    }
  };

  // Obliczanie ceny
  const calculatePrice = () => {
    let basePricePerMb = 0;

    // Bazowa cena wg typu mebla
    switch (furnitureType) {
      case 'kuchnia': basePricePerMb = 1800; break;
      case 'lazienka': basePricePerMb = 1400; break;
      case 'szafa': basePricePerMb = 1500; break;
      case 'pokoj': basePricePerMb = 1200; break;
    }

    // Modyfikator frontu
    const frontMultiplier: Record<string, number> = {
      'laminated': 1.0,
      'mdf-paint': 1.25,
      'mdf-milled': 1.4,
      'wood': 1.7,
      'glass': 1.6,
    };
    basePricePerMb *= frontMultiplier[frontMaterial] || 1.0;

    // Modyfikator blatu
    const countertopAdd: Record<string, number> = {
      'laminate': 0,
      'conglomerate': 350,
      'stone': 700,
      'wood': 450,
      'none': -200,
    };
    basePricePerMb += countertopAdd[countertop] || 0;

    // Modyfikator wyposażenia
    const equipCost: Record<string, number> = {
      'softclose': 80,
      'cargo': 200,
      'led': 150,
      'drawers': 180,
      'mirror': 120,
      'organizer': 100,
    };
    for (const eq of equipment) {
      basePricePerMb += equipCost[eq] || 0;
    }

    // Modyfikator wysokości (>240 = +10%, >260 = +20%)
    if (heightCm > 260) basePricePerMb *= 1.2;
    else if (heightCm > 240) basePricePerMb *= 1.1;

    // Modyfikator głębokości (>65 = +5%, >80 = +15%)
    if (depthCm > 80) basePricePerMb *= 1.15;
    else if (depthCm > 65) basePricePerMb *= 1.05;

    // Współczynnik miasta
    const cityCoeff = city?.coefficient || 1.0;
    basePricePerMb *= cityCoeff;

    const totalMin = Math.round(basePricePerMb * 0.75 * lengthMb);
    const totalMedian = Math.round(basePricePerMb * lengthMb);
    const totalMax = Math.round(basePricePerMb * 1.35 * lengthMb);

    const perMbMin = Math.round(basePricePerMb * 0.75);
    const perMbMedian = Math.round(basePricePerMb);
    const perMbMax = Math.round(basePricePerMb * 1.35);

    return { totalMin, totalMedian, totalMax, perMbMin, perMbMedian, perMbMax };
  };

  const toggleEquipment = (id: string) => {
    setEquipment(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const prices = step === 5 ? calculatePrice() : null;
  const furnitureLabel = FURNITURE_TYPES.find(f => f.value === furnitureType)?.label || '';

  return (
    <div className="space-y-6">
      <StepIndicator steps={STEPS} currentStep={step} />

      {/* KROK 1: Rodzaj mebli */}
      {step === 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Jakie meble chcesz zamówić?</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {FURNITURE_TYPES.map(ft => (
              <button
                key={ft.value}
                onClick={() => setFurnitureType(ft.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  furnitureType === ft.value
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-medium">{ft.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Opisz czego szukasz (opcjonalnie)
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="np. kuchnia w kształcie L, biały mat, bez uchwytów, blat kwarcowy..."
              value={furnitureDesc}
              onChange={e => setFurnitureDesc(e.target.value)}
            />
          </div>

          {/* Upload wyceny */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Masz wycenę od stolarza?</p>
                <p className="text-xs text-slate-500">Dodaj plik — porównamy z cenami rynkowymi w raporcie</p>
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" onChange={e => { if (e.target.files?.[0]) setUploadedFile(e.target.files[0]); }} />
              {uploadedFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
                    {uploadedFile.name.length > 25 ? uploadedFile.name.slice(0, 22) + '...' : uploadedFile.name}
                  </span>
                  <button onClick={() => { setUploadedFile(null); if (fileRef.current) fileRef.current.value = ''; }} className="text-xs text-slate-400 hover:text-slate-600">✕</button>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()} className="text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                  Dodaj wycenę
                </button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* KROK 2: Wymiary */}
      {step === 1 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Wymiary mebli</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            <NumberInput
              label={furnitureType === 'kuchnia' ? 'Długość kuchni (mb)' : 'Szerokość mebla (mb)'}
              value={lengthMb}
              onChange={(value) => setLengthMb(value)}
              min={0.5}
              max={10}
              step={0.5}
              unit="mb"
            />
            <NumberInput
              label="Wysokość (cm)"
              value={heightCm}
              onChange={(value) => setHeightCm(Math.round(value))}
              min={60}
              max={300}
              step={10}
              unit="cm"
            />
            <NumberInput
              label="Głębokość (cm)"
              value={depthCm}
              onChange={(value) => setDepthCm(Math.round(value))}
              min={30}
              max={100}
              step={5}
              unit="cm"
            />
          </div>
          {heightCm > 240 && (
            <p className="mt-3 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              Meble powyżej 240 cm wymagają specjalnego montażu — cena wyższa o ok. 10–20%.
            </p>
          )}
        </Card>
      )}

      {/* KROK 3: Materiały */}
      {step === 2 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Materiały i wykończenie</h3>
          <div className="space-y-5">
            <RadioGroup
              label="Rodzaj frontów"
              name="frontMaterial"
              options={FRONT_MATERIALS}
              value={frontMaterial}
              onChange={setFrontMaterial}
            />
            {(furnitureType === 'kuchnia' || furnitureType === 'lazienka') && (
              <RadioGroup
                label="Blat"
                name="countertop"
                options={COUNTERTOP_OPTIONS}
                value={countertop}
                onChange={setCountertop}
              />
            )}
          </div>
        </Card>
      )}

      {/* KROK 4: Wyposażenie */}
      {step === 3 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Wyposażenie dodatkowe</h3>
          <p className="text-sm text-slate-500 mb-4">Zaznacz elementy, które chcesz uwzględnić w wycenie:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {EQUIPMENT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggleEquipment(opt.id)}
                className={`p-3 rounded-lg border-2 text-left text-sm transition-all flex items-center gap-2 ${
                  equipment.includes(opt.id)
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
                  equipment.includes(opt.id) ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}>
                  {equipment.includes(opt.id) && (
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* KROK 5: Lokalizacja */}
      {step === 4 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Lokalizacja</h3>
          <p className="text-sm text-slate-500 mb-4">Ceny mebli na wymiar różnią się w zależności od miasta — wybierz swoją lokalizację:</p>
          <div className="max-w-md">
            <CityAutocomplete
              label="Miasto"
              placeholder="Wpisz nazwę miasta..."
              value={city}
              onChange={setCity}
            />
          </div>
        </Card>
      )}

      {/* KROK 6: Wynik */}
      {step === 5 && prices && (
        <div className="space-y-4">
          <PriceResult
            title={`${furnitureLabel} na wymiar`}
            subtitle={`${city?.name} · ${lengthMb} mb · ${FRONT_MATERIALS.find(f => f.value === frontMaterial)?.label}`}
            min={prices.totalMin}
            median={prices.totalMedian}
            max={prices.totalMax}
            unit="zł / całość"
          />

          <Card>
            <h4 className="font-semibold text-slate-800 mb-3">Cena za metr bieżący</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-400 uppercase">Minimum</p>
                <p className="text-lg font-bold text-slate-700">{(prices.perMbMin || 0).toLocaleString('pl-PL')} zł</p>
                <p className="text-xs text-slate-400">za mb</p>
              </div>
              <div className="bg-blue-50 rounded-lg py-2">
                <p className="text-xs text-blue-500 uppercase">Mediana</p>
                <p className="text-xl font-bold text-blue-700">{(prices.perMbMedian || 0).toLocaleString('pl-PL')} zł</p>
                <p className="text-xs text-blue-400">za mb</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase">Maksimum</p>
                <p className="text-lg font-bold text-slate-700">{(prices.perMbMax || 0).toLocaleString('pl-PL')} zł</p>
                <p className="text-xs text-slate-400">za mb</p>
              </div>
            </div>
          </Card>

          {furnitureDesc && (
            <Card>
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">Opis zamówienia:</span> {furnitureDesc}
              </p>
            </Card>
          )}

          {uploadedFile && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
              <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <div>
                <p className="text-sm font-medium text-green-800">Wycena od stolarza załączona</p>
                <p className="text-xs text-green-600">Plik: {uploadedFile.name} — pełne porównanie dostępne w raporcie</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nawigacja */}
      <div className="flex items-center justify-between pt-2">
        {step > 0 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            ← Wstecz
          </Button>
        ) : <div />}

        {step < 5 ? (
          <Button
            variant="cta"
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
          >
            {step === 4 ? 'Oblicz cenę' : 'Dalej →'}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleReset}>
            Nowa wycena
          </Button>
        )}
      </div>
    </div>
  );

  function handleReset() {
    setStep(0);
    setFurnitureType('');
    setFurnitureDesc('');
    setLengthMb(3);
    setHeightCm(220);
    setDepthCm(60);
    setFrontMaterial('laminated');
    setCountertop('laminate');
    setEquipment(['softclose']);
    setCity(null);
    setUploadedFile(null);
  }
}
