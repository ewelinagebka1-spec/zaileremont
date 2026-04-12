'use client';

import { useState, useRef, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SelectField from '@/components/ui/SelectField';
import RadioGroup from '@/components/ui/RadioGroup';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import StepIndicator from '@/components/ui/StepIndicator';
import PriceResult from '@/components/ui/PriceResult';
import { CityData } from '@/data/cities';

const STEPS = [
  'Typ okna',
  'Ile sztuk',
  'Pakiet szybowy',
  'Opcje dodatkowe',
  'Lokalizacja',
  'Wycena',
];

const WINDOW_TYPES = [
  { value: '1-skrzydlowe', label: 'Jednoskrzydłowe', desc: 'np. 60×120 cm, do kuchni, łazienki' },
  { value: '2-skrzydlowe', label: 'Dwuskrzydłowe', desc: 'np. 150×150 cm, do pokoju' },
  { value: 'balkonowe', label: 'Balkonowe / tarasowe', desc: 'np. 200×230 cm, drzwi przesuwne' },
  { value: 'fix', label: 'Fix (nieotwierane)', desc: 'stałe przeszklenie, najtańsze' },
  { value: 'dachowe', label: 'Dachowe (Velux / Fakro)', desc: 'do poddaszy, obrotowe' },
];

const GLASS_PACKAGES = [
  { value: '2-szyby', label: 'Dwuszybowy (Uw ~1.3)' },
  { value: '3-szyby', label: 'Trzyszybowy (Uw ~0.9) — standard' },
  { value: '3-szyby-plus', label: 'Trzyszybowy wzmocniony (Uw ~0.7)' },
];

const PROFILE_COLORS = [
  { value: 'bialy', label: 'Biały (standard)' },
  { value: 'kolor-1str', label: 'Kolor jednostronny (np. antracyt)' },
  { value: 'kolor-2str', label: 'Kolor dwustronny' },
  { value: 'drewno', label: 'Okleina drewnopodobna' },
];

const EXTRAS = [
  { id: 'rolety', label: 'Rolety zewnętrzne nadstawne' },
  { id: 'moskitiera', label: 'Moskitiera' },
  { id: 'szprosy', label: 'Szprosy (dekoracyjne podziały)' },
  { id: 'nawiewnik', label: 'Nawiewnik higrosterowany' },
  { id: 'antywlamaniowe', label: 'Szyba antywłamaniowa (RC2)' },
  { id: 'demontaz', label: 'Demontaż starych okien' },
];

export default function WindowCalculator() {
  const [step, setStep] = useState(0);
  const [windowType, setWindowType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [glassPackage, setGlassPackage] = useState('3-szyby');
  const [profileColor, setProfileColor] = useState('bialy');
  const [extras, setExtras] = useState<string[]>([]);
  const [city, setCity] = useState<CityData | null>(null);
  const [windowDetails, setWindowDetails] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync step with URL for pixel tracking
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('krok', String(step + 1));
    window.history.replaceState({}, '', url.toString());
  }, [step]);

  // Initialize step from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const krok = params.get('krok');
    if (krok) {
      const parsed = parseInt(krok, 10) - 1;
      if (parsed >= 0 && parsed <= 5) setStep(parsed);
    }
  }, []);

  const canNext = () => {
    switch (step) {
      case 0: return !!windowType;
      case 1: return quantity > 0;
      case 2: return !!glassPackage;
      case 3: return true;
      case 4: return !!city;
      default: return false;
    }
  };

  const calculatePrice = () => {
    let basePrice = 0;
    switch (windowType) {
      case '1-skrzydlowe': basePrice = 700; break;
      case '2-skrzydlowe': basePrice = 1200; break;
      case 'balkonowe': basePrice = 2200; break;
      case 'fix': basePrice = 550; break;
      case 'dachowe': basePrice = 1800; break;
    }

    // Pakiet szybowy
    const glassMultiplier: Record<string, number> = {
      '2-szyby': 0.85,
      '3-szyby': 1.0,
      '3-szyby-plus': 1.2,
    };
    basePrice *= glassMultiplier[glassPackage] || 1.0;

    // Kolor profilu
    const colorAdd: Record<string, number> = {
      'bialy': 0,
      'kolor-1str': 150,
      'kolor-2str': 280,
      'drewno': 200,
    };
    basePrice += colorAdd[profileColor] || 0;

    // Dodatki
    const extrasAdd: Record<string, number> = {
      'rolety': 450,
      'moskitiera': 120,
      'szprosy': 80,
      'nawiewnik': 60,
      'antywlamaniowe': 250,
      'demontaz': 200,
    };
    for (const ex of extras) {
      basePrice += extrasAdd[ex] || 0;
    }

    // Współczynnik miasta
    const cityCoeff = city?.coefficient || 1.0;
    basePrice *= cityCoeff;

    const totalMin = Math.round(basePrice * 0.8 * quantity);
    const totalMedian = Math.round(basePrice * quantity);
    const totalMax = Math.round(basePrice * 1.3 * quantity);

    const perUnitMin = Math.round(basePrice * 0.8);
    const perUnitMedian = Math.round(basePrice);
    const perUnitMax = Math.round(basePrice * 1.3);

    return { totalMin, totalMedian, totalMax, perUnitMin, perUnitMedian, perUnitMax };
  };

  const toggleExtra = (id: string) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const prices = step === 5 ? calculatePrice() : null;
  const windowLabel = WINDOW_TYPES.find(w => w.value === windowType)?.label || '';

  return (
    <div className="space-y-6">
      <StepIndicator steps={STEPS} currentStep={step} />

      {/* KROK 1: Typ okna */}
      {step === 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Jaki typ okna?</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {WINDOW_TYPES.map(wt => (
              <button
                key={wt.value}
                onClick={() => setWindowType(wt.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  windowType === wt.value
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-medium block">{wt.label}</span>
                <span className="text-xs text-slate-500">{wt.desc}</span>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dodatkowe informacje (opcjonalnie)
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="np. wymiana 5 okien w bloku, parter, okna od południa..."
              value={windowDetails}
              onChange={e => setWindowDetails(e.target.value)}
            />
          </div>

          {/* Upload wyceny */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Masz wycenę od producenta?</p>
                <p className="text-xs text-slate-500">Dodaj plik — porównamy z cenami rynkowymi</p>
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

      {/* KROK 2: Ilość */}
      {step === 1 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Ile okien tego typu?</h3>
          <div className="flex items-center gap-4 max-w-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-12 w-12 rounded-lg border-2 border-slate-200 text-xl font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center"
            >−</button>
            <div className="text-center flex-1">
              <p className="text-4xl font-bold text-blue-700">{quantity}</p>
              <p className="text-xs text-slate-500">szt.</p>
            </div>
            <button
              onClick={() => setQuantity(Math.min(30, quantity + 1))}
              className="h-12 w-12 rounded-lg border-2 border-slate-200 text-xl font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center"
            >+</button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Przy zakupie powyżej 5 szt. producenci często dają rabat 5–10%. Uwzględnimy to w wycenie.
          </p>
        </Card>
      )}

      {/* KROK 3: Pakiet szybowy + kolor */}
      {step === 2 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Pakiet szybowy i kolor profilu</h3>
          <div className="space-y-5">
            <RadioGroup
              label="Pakiet szybowy"
              name="glassPackage"
              options={GLASS_PACKAGES}
              value={glassPackage}
              onChange={setGlassPackage}
            />
            <RadioGroup
              label="Kolor profilu"
              name="profileColor"
              options={PROFILE_COLORS}
              value={profileColor}
              onChange={setProfileColor}
            />
          </div>
        </Card>
      )}

      {/* KROK 4: Opcje dodatkowe */}
      {step === 3 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Opcje dodatkowe</h3>
          <p className="text-sm text-slate-500 mb-4">Zaznacz co chcesz doliczyć do wyceny:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {EXTRAS.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggleExtra(opt.id)}
                className={`p-3 rounded-lg border-2 text-left text-sm transition-all flex items-center gap-2 ${
                  extras.includes(opt.id)
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
                  extras.includes(opt.id) ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}>
                  {extras.includes(opt.id) && (
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
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Lokalizacja montażu</h3>
          <p className="text-sm text-slate-500 mb-4">Ceny okien i montażu różnią się w zależności od regionu:</p>
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
            title={`Okna PCV — ${windowLabel}`}
            subtitle={`${city?.name} · ${quantity} szt. · ${GLASS_PACKAGES.find(g => g.value === glassPackage)?.label} · ${PROFILE_COLORS.find(c => c.value === profileColor)?.label}`}
            min={prices.totalMin}
            median={prices.totalMedian}
            max={prices.totalMax}
            unit={quantity > 1 ? `zł / ${quantity} szt.` : 'zł / szt.'}
          />

          {quantity > 1 && (
            <Card>
              <h4 className="font-semibold text-slate-800 mb-3">Cena za sztukę</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Minimum</p>
                  <p className="text-lg font-bold text-slate-700">{prices.perUnitMin.toLocaleString('pl-PL')} zł</p>
                </div>
                <div className="bg-blue-50 rounded-lg py-2">
                  <p className="text-xs text-blue-500 uppercase">Mediana</p>
                  <p className="text-xl font-bold text-blue-700">{prices.perUnitMedian.toLocaleString('pl-PL')} zł</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Maksimum</p>
                  <p className="text-lg font-bold text-slate-700">{prices.perUnitMax.toLocaleString('pl-PL')} zł</p>
                </div>
              </div>
              {quantity >= 5 && (
                <p className="mt-3 text-xs text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  Przy {quantity} szt. możesz negocjować rabat 5–10% u producenta.
                </p>
              )}
            </Card>
          )}

          {windowDetails && (
            <Card>
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">Opis zamówienia:</span> {windowDetails}
              </p>
            </Card>
          )}

          {uploadedFile && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
              <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <div>
                <p className="text-sm font-medium text-green-800">Wycena producenta załączona</p>
                <p className="text-xs text-green-600">Plik: {uploadedFile.name} — porównanie dostępne w raporcie</p>
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
    setWindowType('');
    setQuantity(1);
    setGlassPackage('3-szyby');
    setProfileColor('bialy');
    setExtras([]);
    setCity(null);
    setWindowDetails('');
    setUploadedFile(null);
  }
}
