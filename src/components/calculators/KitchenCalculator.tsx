'use client';

import { useState, useRef } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import CityAutocomplete from '@/components/ui/CityAutocomplete';
import StepIndicator from '@/components/ui/StepIndicator';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { CityData } from '@/data/cities';

const STEPS = [
  'Kształt kuchni',
  'Wymiary',
  'Fronty i blat',
  'Wyposażenie',
  'AGD do zabudowy',
  'Projekt / wycena',
  'Lokalizacja',
  'Wycena',
];

const KITCHEN_SHAPES = [
  { value: 'I', label: 'Jednorzędowa (I)', desc: 'Szafki wzdłuż jednej ściany', icon: '▬' },
  { value: 'L', label: 'Kształt L', desc: 'Dwie prostopadłe ściany', icon: '⌐' },
  { value: 'U', label: 'Kształt U', desc: 'Trzy ściany', icon: '⊓' },
  { value: 'II', label: 'Dwurzędowa (II)', desc: 'Dwie równoległe ściany', icon: '║' },
  { value: 'wyspa', label: 'Z wyspą', desc: 'Kuchnia + wolnostojąca wyspa', icon: '▣' },
];

const FRONT_MATERIALS = [
  { value: 'laminated', label: 'Płyta laminowana (standard)' },
  { value: 'mdf-mat', label: 'MDF lakierowany mat' },
  { value: 'mdf-polysk', label: 'MDF lakierowany połysk' },
  { value: 'mdf-frezowany', label: 'MDF frezowany' },
  { value: 'akryl', label: 'Akryl' },
  { value: 'drewno', label: 'Drewno lite (dąb, jesion)' },
];

const HANDLE_TYPES = [
  { value: 'uchwyty', label: 'Klasyczne uchwyty' },
  { value: 'frezowane', label: 'Frezowane (bez uchwytów)' },
  { value: 'tip-on', label: 'Tip-On (otwieranie dotykowe)' },
  { value: 'profil-aluminiowy', label: 'Profil aluminiowy (gola)' },
];

const COUNTERTOP_OPTIONS = [
  { value: 'laminat', label: 'Laminat HPL (standard)' },
  { value: 'konglomerat', label: 'Konglomerat kwarcowy (np. Silestone)' },
  { value: 'granit', label: 'Granit naturalny' },
  { value: 'marmur', label: 'Marmur' },
  { value: 'drewno', label: 'Drewno lite (dąb, buk)' },
  { value: 'spieki', label: 'Spieki kwarcowe (np. Dekton)' },
];

const EQUIPMENT_OPTIONS = [
  { id: 'softclose', label: 'Cichy domyk (zawiasy + szuflady)', default: true },
  { id: 'cargo', label: 'Cargo / wysuwane kosze (narożne)' },
  { id: 'led', label: 'Oświetlenie LED pod szafkami górnymi' },
  { id: 'led-blat', label: 'Oświetlenie LED w blacie / wnętrzu szafek' },
  { id: 'drawers', label: 'Szuflady zamiast drzwiczek (dolne)' },
  { id: 'organizer', label: 'Organizery do szuflad (na sztućce, garnki)' },
  { id: 'kosz-segregacja', label: 'Kosz do segregacji (wbudowany)' },
  { id: 'suszarka', label: 'Suszarka do naczyń (zabudowana)' },
  { id: 'relingi', label: 'Relingi ścienne / boczne' },
  { id: 'gorne-do-sufitu', label: 'Szafki górne do sufitu (antresole)' },
];

const AGD_OPTIONS = [
  { id: 'piekarnik', label: 'Piekarnik do zabudowy', price: 0 },
  { id: 'plyta', label: 'Płyta indukcyjna / gazowa', price: 0 },
  { id: 'zmywarka', label: 'Zmywarka (zabudowa frontem)', price: 250 },
  { id: 'okap', label: 'Okap (teleskopowy / podszafkowy)', price: 0 },
  { id: 'okap-wyspowy', label: 'Okap wyspowy / sufitowy', price: 400 },
  { id: 'lodowka', label: 'Lodówka do zabudowy', price: 350 },
  { id: 'mikrofala', label: 'Mikrofala do zabudowy', price: 150 },
  { id: 'ekspres', label: 'Ekspres do kawy do zabudowy', price: 200 },
];

export default function KitchenCalculator() {
  const [step, setStep] = useState(0);

  // Krok 1: Kształt
  const [kitchenShape, setKitchenShape] = useState('');

  // Krok 2: Wymiary
  const [lengthA, setLengthA] = useState(3.0); // główna ściana
  const [lengthB, setLengthB] = useState(2.0); // druga ściana (L, U)
  const [lengthC, setLengthC] = useState(2.0); // trzecia ściana (U)
  const [islandLength, setIslandLength] = useState(1.5); // wyspa
  const [heightCm, setHeightCm] = useState(220);
  const [hasUpperCabinets, setHasUpperCabinets] = useState(true);
  const [depthCm, setDepthCm] = useState(60);

  // Krok 3: Fronty i blat
  const [frontMaterial, setFrontMaterial] = useState('laminated');
  const [handleType, setHandleType] = useState('uchwyty');
  const [countertop, setCountertop] = useState('laminat');
  const [backsplash, setBacksplash] = useState('plytki'); // 'plytki', 'szklo', 'laminat', 'brak'

  // Krok 4: Wyposażenie
  const [equipment, setEquipment] = useState<string[]>(['softclose']);

  // Krok 5: AGD
  const [agdItems, setAgdItems] = useState<string[]>([]);

  // Krok 6: Projekt / wycena
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [projectNotes, setProjectNotes] = useState('');
  const [hasOwnDesign, setHasOwnDesign] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Krok 7: Lokalizacja
  const [city, setCity] = useState<CityData | null>(null);

  const totalLength = () => {
    switch (kitchenShape) {
      case 'I': return lengthA;
      case 'L': return lengthA + lengthB;
      case 'U': return lengthA + lengthB + lengthC;
      case 'II': return lengthA + lengthB;
      case 'wyspa': return lengthA + lengthB + islandLength;
      default: return lengthA;
    }
  };

  const canNext = () => {
    switch (step) {
      case 0: return !!kitchenShape;
      case 1: return lengthA > 0;
      case 2: return !!frontMaterial && !!countertop;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      case 6: return !!city;
      default: return false;
    }
  };

  // ─── Szczegółowe rozbicie kosztów ───
  interface CostLine {
    label: string;
    unit: string;          // 'zł/mb', 'zł', 'zł/szt'
    qty: number;
    ekonom: number;
    standard: number;
    premium: number;
    note?: string;
  }

  const calculateBreakdown = () => {
    const tl = totalLength();
    const cityCoeff = city?.coefficient || 1.0;
    const lines: CostLine[] = [];

    // 1. Korpusy (szafki dolne + górne)
    const corpusBase = 950;
    const corpusUpper = hasUpperCabinets ? 550 : 0;
    const corpusMb = (corpusBase + corpusUpper) * cityCoeff;
    lines.push({
      label: hasUpperCabinets ? 'Korpusy (dolne + górne)' : 'Korpusy (tylko dolne)',
      unit: 'zł/mb',
      qty: tl,
      ekonom: Math.round(corpusMb * 0.85),
      standard: Math.round(corpusMb),
      premium: Math.round(corpusMb * 1.2),
    });

    // 2. Fronty
    const frontPrices: Record<string, { ekonom: number; standard: number; premium: number; label: string }> = {
      'laminated':     { ekonom: 280, standard: 380,  premium: 500,  label: 'Fronty — płyta laminowana' },
      'mdf-mat':       { ekonom: 450, standard: 600,  premium: 780,  label: 'Fronty — MDF lakierowany mat' },
      'mdf-polysk':    { ekonom: 550, standard: 720,  premium: 950,  label: 'Fronty — MDF lakierowany połysk' },
      'mdf-frezowany': { ekonom: 580, standard: 760,  premium: 1000, label: 'Fronty — MDF frezowany' },
      'akryl':         { ekonom: 620, standard: 800,  premium: 1050, label: 'Fronty — akryl' },
      'drewno':        { ekonom: 850, standard: 1100, premium: 1500, label: 'Fronty — drewno lite' },
    };
    const fp = frontPrices[frontMaterial] || frontPrices['laminated'];
    lines.push({
      label: fp.label,
      unit: 'zł/mb',
      qty: tl,
      ekonom: Math.round(fp.ekonom * cityCoeff),
      standard: Math.round(fp.standard * cityCoeff),
      premium: Math.round(fp.premium * cityCoeff),
    });

    // 3. Uchwyty / system otwierania
    const handlePrices: Record<string, { ekonom: number; standard: number; premium: number }> = {
      'uchwyty':           { ekonom: 15,  standard: 35,  premium: 80 },
      'frezowane':         { ekonom: 60,  standard: 90,  premium: 140 },
      'tip-on':            { ekonom: 100, standard: 150, premium: 220 },
      'profil-aluminiowy': { ekonom: 50,  standard: 80,  premium: 120 },
    };
    const hp = handlePrices[handleType] || handlePrices['uchwyty'];
    lines.push({
      label: `Uchwyty — ${HANDLE_TYPES.find(h => h.value === handleType)?.label || ''}`,
      unit: 'zł/mb',
      qty: tl,
      ekonom: Math.round(hp.ekonom * cityCoeff),
      standard: Math.round(hp.standard * cityCoeff),
      premium: Math.round(hp.premium * cityCoeff),
    });

    // 4. Blat
    const counterPrices: Record<string, { ekonom: number; standard: number; premium: number }> = {
      'laminat':      { ekonom: 150,  standard: 250,  premium: 400 },
      'konglomerat':  { ekonom: 600,  standard: 900,  premium: 1400 },
      'granit':       { ekonom: 800,  standard: 1200, premium: 1800 },
      'marmur':       { ekonom: 1000, standard: 1500, premium: 2500 },
      'drewno':       { ekonom: 400,  standard: 650,  premium: 1000 },
      'spieki':       { ekonom: 900,  standard: 1300, premium: 2200 },
    };
    const cp = counterPrices[countertop] || counterPrices['laminat'];
    lines.push({
      label: `Blat — ${COUNTERTOP_OPTIONS.find(c => c.value === countertop)?.label || ''}`,
      unit: 'zł/mb',
      qty: tl,
      ekonom: Math.round(cp.ekonom * cityCoeff),
      standard: Math.round(cp.standard * cityCoeff),
      premium: Math.round(cp.premium * cityCoeff),
    });

    // 5. Panel ścienny
    const backsplashPrices: Record<string, { ekonom: number; standard: number; premium: number }> = {
      'plytki':  { ekonom: 80,  standard: 150, premium: 280 },
      'szklo':   { ekonom: 250, standard: 380, premium: 550 },
      'laminat': { ekonom: 100, standard: 180, premium: 280 },
      'brak':    { ekonom: 0,   standard: 0,   premium: 0 },
    };
    const bp = backsplashPrices[backsplash] || backsplashPrices['plytki'];
    if (backsplash !== 'brak') {
      lines.push({
        label: `Panel ścienny — ${backsplash === 'szklo' ? 'szkło hartowane' : backsplash === 'plytki' ? 'płytki' : 'laminat'}`,
        unit: 'zł/mb',
        qty: tl,
        ekonom: Math.round(bp.ekonom * cityCoeff),
        standard: Math.round(bp.standard * cityCoeff),
        premium: Math.round(bp.premium * cityCoeff),
      });
    }

    // 6. Zawiasy i prowadnice (Blum vs budżetowe)
    const hingeStandard = equipment.includes('softclose');
    lines.push({
      label: hingeStandard ? 'Zawiasy i prowadnice — z cichym domykiem' : 'Zawiasy i prowadnice — standardowe',
      unit: 'zł/mb',
      qty: tl,
      ekonom: Math.round((hingeStandard ? 80 : 40) * cityCoeff),
      standard: Math.round((hingeStandard ? 150 : 70) * cityCoeff),
      premium: Math.round((hingeStandard ? 280 : 120) * cityCoeff),
      note: hingeStandard ? 'Blum / Hettich / GTV' : 'Ekonomiczne zawiasy',
    });

    // 7. Wyposażenie dodatkowe (bez softclose — już w zawiasach)
    const equipDetails: Record<string, { label: string; ekonom: number; standard: number; premium: number }> = {
      'cargo':            { label: 'Cargo narożne / wysuwane',   ekonom: 350,  standard: 600,  premium: 1100 },
      'led':              { label: 'LED pod szafkami górnymi',    ekonom: 120,  standard: 220,  premium: 400 },
      'led-blat':         { label: 'LED w blacie / szafkach',     ekonom: 200,  standard: 350,  premium: 600 },
      'drawers':          { label: 'Szuflady zam. drzwiczek',     ekonom: 180,  standard: 320,  premium: 550 },
      'organizer':        { label: 'Organizery do szuflad',       ekonom: 80,   standard: 160,  premium: 300 },
      'kosz-segregacja':  { label: 'Kosz do segregacji',          ekonom: 150,  standard: 280,  premium: 500 },
      'suszarka':         { label: 'Suszarka do naczyń',          ekonom: 80,   standard: 150,  premium: 280 },
      'relingi':          { label: 'Relingi ścienne',             ekonom: 50,   standard: 100,  premium: 200 },
      'gorne-do-sufitu':  { label: 'Szafki górne do sufitu',      ekonom: 300,  standard: 500,  premium: 850 },
    };
    for (const eq of equipment) {
      if (eq === 'softclose') continue;
      const ed = equipDetails[eq];
      if (ed) {
        lines.push({
          label: ed.label,
          unit: 'zł/mb',
          qty: tl,
          ekonom: Math.round(ed.ekonom * cityCoeff),
          standard: Math.round(ed.standard * cityCoeff),
          premium: Math.round(ed.premium * cityCoeff),
        });
      }
    }

    // 8. Narożniki / kształt
    if (kitchenShape === 'L' || kitchenShape === 'U' || kitchenShape === 'wyspa') {
      const cornerCount = kitchenShape === 'U' ? 2 : 1;
      lines.push({
        label: `Narożnik${cornerCount > 1 ? 'i' : ''} (${cornerCount} szt.)`,
        unit: 'zł/szt',
        qty: cornerCount,
        ekonom: Math.round(200 * cityCoeff),
        standard: Math.round(400 * cityCoeff),
        premium: Math.round(700 * cityCoeff),
      });
    }
    if (kitchenShape === 'wyspa') {
      lines.push({
        label: `Wyspa (${islandLength.toFixed(1)} mb)`,
        unit: 'zł',
        qty: 1,
        ekonom: Math.round(islandLength * 1200 * cityCoeff),
        standard: Math.round(islandLength * 2000 * cityCoeff),
        premium: Math.round(islandLength * 3200 * cityCoeff),
        note: 'Bez instalacji wod-kan i elektrycznej',
      });
    }

    // 9. AGD — zabudowa
    const agdDetails: Record<string, { label: string; ekonom: number; standard: number; premium: number }> = {
      'piekarnik':     { label: 'Zabudowa piekarnika',        ekonom: 0,   standard: 0,   premium: 100 },
      'plyta':         { label: 'Wycięcie pod płytę',         ekonom: 0,   standard: 80,  premium: 150 },
      'zmywarka':      { label: 'Zabudowa zmywarki frontem',  ekonom: 150, standard: 250, premium: 400 },
      'okap':          { label: 'Zabudowa okapu',             ekonom: 0,   standard: 100, premium: 200 },
      'okap-wyspowy':  { label: 'Zabudowa okapu wyspowego',   ekonom: 300, standard: 500, premium: 800 },
      'lodowka':       { label: 'Zabudowa lodówki',           ekonom: 200, standard: 350, premium: 600 },
      'mikrofala':     { label: 'Zabudowa mikrofali',         ekonom: 100, standard: 180, premium: 300 },
      'ekspres':       { label: 'Zabudowa ekspresu do kawy',  ekonom: 150, standard: 250, premium: 400 },
    };
    for (const agd of agdItems) {
      const ad = agdDetails[agd];
      if (ad) {
        lines.push({
          label: ad.label,
          unit: 'zł',
          qty: 1,
          ekonom: Math.round(ad.ekonom * cityCoeff),
          standard: Math.round(ad.standard * cityCoeff),
          premium: Math.round(ad.premium * cityCoeff),
        });
      }
    }

    // 10. Montaż
    lines.push({
      label: 'Montaż i regulacja',
      unit: 'zł/mb',
      qty: tl,
      ekonom: Math.round(200 * cityCoeff),
      standard: Math.round(350 * cityCoeff),
      premium: Math.round(550 * cityCoeff),
    });

    // 11. Transport
    lines.push({
      label: 'Transport',
      unit: 'zł',
      qty: 1,
      ekonom: Math.round(200 * cityCoeff),
      standard: Math.round(350 * cityCoeff),
      premium: Math.round(500 * cityCoeff),
    });

    // Sumy
    const sumEkonom = lines.reduce((sum, l) => sum + (l.unit === 'zł/mb' ? l.ekonom * l.qty : l.ekonom * l.qty), 0);
    const sumStandard = lines.reduce((sum, l) => sum + (l.unit === 'zł/mb' ? l.standard * l.qty : l.standard * l.qty), 0);
    const sumPremium = lines.reduce((sum, l) => sum + (l.unit === 'zł/mb' ? l.premium * l.qty : l.premium * l.qty), 0);

    return { lines, sumEkonom, sumStandard, sumPremium, totalLengthMb: tl };
  };

  const toggleEquipment = (id: string) => {
    setEquipment(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const toggleAgd = (id: string) => {
    setAgdItems(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles].slice(0, 5)); // max 5 plików
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const breakdown = step === 7 ? calculateBreakdown() : null;

  // Oblicz które wymiary pokazać w kroku 2
  const showLengthB = ['L', 'U', 'II', 'wyspa'].includes(kitchenShape);
  const showLengthC = kitchenShape === 'U';
  const showIsland = kitchenShape === 'wyspa';

  const shapeLabel = KITCHEN_SHAPES.find(s => s.value === kitchenShape)?.label || '';

  return (
    <div className="space-y-6">
      <StepIndicator steps={STEPS} currentStep={step + 1} />

      {/* KROK 1: Kształt kuchni */}
      {step === 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Jaki kształt ma Twoja kuchnia?</h3>
          <p className="text-sm text-slate-500 mb-4">Wybierz układ, który najlepiej pasuje do Twojej przestrzeni:</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {KITCHEN_SHAPES.map(shape => (
              <button
                key={shape.value}
                onClick={() => setKitchenShape(shape.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  kitchenShape === shape.value
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono">{shape.icon}</span>
                  <div>
                    <span className="font-medium block">{shape.label}</span>
                    <span className="text-xs text-slate-500">{shape.desc}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* KROK 2: Wymiary */}
      {step === 1 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Wymiary kuchni</h3>
          <p className="text-sm text-slate-500 mb-5">Podaj długości poszczególnych ścian kuchennych ({shapeLabel}):</p>

          <div className="space-y-5">
            {/* Wymiary ścian */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {kitchenShape === 'I' ? 'Długość kuchni' : 'Ściana A (główna)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                    value={lengthA}
                    onChange={e => setLengthA(parseFloat(e.target.value) || 0)}
                    min={0.5} max={10} step={0.1}
                  />
                  <span className="text-sm text-slate-500 shrink-0">m</span>
                </div>
              </div>

              {showLengthB && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {kitchenShape === 'II' ? 'Ściana B (naprzeciwko)' : 'Ściana B (boczna)'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                      value={lengthB}
                      onChange={e => setLengthB(parseFloat(e.target.value) || 0)}
                      min={0.5} max={10} step={0.1}
                    />
                    <span className="text-sm text-slate-500 shrink-0">m</span>
                  </div>
                </div>
              )}

              {showLengthC && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ściana C</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                      value={lengthC}
                      onChange={e => setLengthC(parseFloat(e.target.value) || 0)}
                      min={0.5} max={10} step={0.1}
                    />
                    <span className="text-sm text-slate-500 shrink-0">m</span>
                  </div>
                </div>
              )}

              {showIsland && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Wyspa (długość)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                      value={islandLength}
                      onChange={e => setIslandLength(parseFloat(e.target.value) || 0)}
                      min={0.8} max={4} step={0.1}
                    />
                    <span className="text-sm text-slate-500 shrink-0">m</span>
                  </div>
                </div>
              )}
            </div>

            {/* Łączna długość */}
            <div className="bg-blue-50 rounded-lg px-4 py-2.5 flex items-center justify-between">
              <span className="text-sm text-blue-700">Łączna długość zabudowy:</span>
              <span className="text-lg font-bold text-blue-800">{totalLength().toFixed(1)} mb</span>
            </div>

            {/* Wysokość i głębokość */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Wysokość szafek (cm)</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  value={heightCm}
                  onChange={e => setHeightCm(parseInt(e.target.value) || 220)}
                  min={200} max={300} step={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Głębokość (cm)</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  value={depthCm}
                  onChange={e => setDepthCm(parseInt(e.target.value) || 60)}
                  min={40} max={90} step={5}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasUpperCabinets}
                    onChange={e => setHasUpperCabinets(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Szafki górne</span>
                </label>
              </div>
            </div>

            {heightCm > 240 && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                Zabudowa powyżej 240 cm wymaga specjalnego montażu — cena wyższa o 10–20%.
              </p>
            )}
          </div>
        </Card>
      )}

      {/* KROK 3: Fronty i blat */}
      {step === 2 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Fronty, uchwyty i blat</h3>
          <div className="space-y-6">
            <RadioGroup
              label="Rodzaj frontów"
              name="frontMaterial"
              options={FRONT_MATERIALS}
              value={frontMaterial}
              onChange={setFrontMaterial}
            />

            <RadioGroup
              label="Typ uchwytów"
              name="handleType"
              options={HANDLE_TYPES}
              value={handleType}
              onChange={setHandleType}
            />

            <RadioGroup
              label="Blat kuchenny"
              name="countertop"
              options={COUNTERTOP_OPTIONS}
              value={countertop}
              onChange={setCountertop}
            />

            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Panel ścienny (między szafkami)</p>
              <div className="grid gap-2 sm:grid-cols-4">
                {[
                  { value: 'plytki', label: 'Płytki (osobno)' },
                  { value: 'szklo', label: 'Szkło hartowane' },
                  { value: 'laminat', label: 'Laminat / HPL' },
                  { value: 'brak', label: 'Brak / farba' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setBacksplash(opt.value)}
                    className={`p-2.5 rounded-lg border-2 text-sm text-center transition-all ${
                      backsplash === opt.value
                        ? 'border-blue-600 bg-blue-50 text-blue-800 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* KROK 4: Wyposażenie */}
      {step === 3 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Wyposażenie dodatkowe</h3>
          <p className="text-sm text-slate-500 mb-4">Zaznacz elementy, które chcesz uwzględnić:</p>
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

      {/* KROK 5: AGD do zabudowy */}
      {step === 4 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">AGD do zabudowy</h3>
          <p className="text-sm text-slate-500 mb-4">
            Zaznacz sprzęt, który ma być zabudowany w meblach. Wliczamy koszt adaptacji mebli (otwory, wzmocnienia), ale nie koszt samego sprzętu.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {AGD_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggleAgd(opt.id)}
                className={`p-3 rounded-lg border-2 text-left text-sm transition-all flex items-center gap-2 ${
                  agdItems.includes(opt.id)
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
                  agdItems.includes(opt.id) ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}>
                  {agdItems.includes(opt.id) && (
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </span>
                <div className="flex-1">
                  <span>{opt.label}</span>
                  {opt.price > 0 && (
                    <span className="text-xs text-slate-400 ml-1">(+{opt.price} zł zabudowa)</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Koszt samego sprzętu AGD nie jest wliczony w wycenę mebli. Doliczamy jedynie koszt adaptacji zabudowy meblowej.
          </p>
        </Card>
      )}

      {/* KROK 6: Twoja wycena */}
      {step === 5 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Masz już wycenę? Porównaj z rynkiem!</h3>
          <p className="text-sm text-slate-500 mb-5">
            Wklej treść wyceny z e-maila od salonu, stolarza lub wykonawcy — pokażemy Ci, czy cena jest dobra, czy przepłacasz.
          </p>

          {/* Czy ma wycenę */}
          <div className="mb-5">
            <p className="text-sm font-medium text-slate-700 mb-2">Skąd masz wycenę?</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { value: 'salon', label: 'Salon meblowy (IKEA, Agata...)' },
                { value: 'stolarz', label: 'Stolarz / wykonawca' },
                { value: 'nie', label: 'Nie mam jeszcze wyceny' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setHasOwnDesign(opt.value)}
                  className={`p-3 rounded-lg border-2 text-sm text-center transition-all ${
                    hasOwnDesign === opt.value
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pole do wklejenia wyceny */}
          {hasOwnDesign !== 'nie' && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Wklej treść wyceny z maila lub oferty
              </label>
              <p className="text-xs text-slate-400 mb-2">
                Skopiuj całą wycenę (Ctrl+C z maila) i wklej tutaj (Ctrl+V). Nie musisz formatować — wyciągniemy z tego najważniejsze dane.
              </p>
              <textarea
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                rows={8}
                placeholder={"Wklej tutaj treść maila z wyceną, np.:\n\nSzanowna Pani,\nprzesyłam wycenę kuchni w kształcie L:\n- korpusy: 4 200 zł\n- fronty MDF mat biały: 3 800 zł\n- blat konglomerat Silestone: 2 900 zł\n- montaż: 1 500 zł\nRazem: 12 400 zł brutto"}
                value={projectNotes}
                onChange={e => setProjectNotes(e.target.value)}
              />
            </div>
          )}

          {/* Upload plików — dodatkowy */}
          <div className="rounded-lg border-2 border-dashed border-slate-200 p-4 text-center hover:border-blue-300 transition-colors">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.dwg"
              multiple
              className="hidden"
              onChange={handleFileAdd}
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Lub dodaj plik z wyceną (PDF, JPG, DOC)
            </button>
            <p className="text-xs text-slate-400 mt-1">Maksymalnie 5 plików — wizualizacja, wycena, zdjęcia</p>
          </div>

          {/* Lista załączonych plików */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-green-800">
                      {file.name.length > 35 ? file.name.slice(0, 32) + '...' : file.name}
                    </span>
                    <span className="text-xs text-green-500">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <button onClick={() => removeFile(i)} className="text-xs text-slate-400 hover:text-red-500">
                    Usuń
                  </button>
                </div>
              ))}
            </div>
          )}

          {hasOwnDesign === 'nie' && (
            <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Nie masz wyceny? Żaden problem — nasz raport pokaże Ci realne ceny rynkowe, dzięki czemu będziesz wiedzieć
                ile powinna kosztować Twoja kuchnia <span className="font-semibold">zanim</span> pójdziesz do salonu.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* KROK 7: Lokalizacja */}
      {step === 6 && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Lokalizacja</h3>
          <p className="text-sm text-slate-500 mb-4">Ceny mebli kuchennych różnią się w zależności od miasta:</p>
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

      {/* KROK 8: Wynik — szczegółowe rozbicie */}
      {step === 7 && breakdown && (
        <div className="space-y-5">
          {/* Nagłówek wyniku */}
          <Card>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-slate-900">
                Kuchnia na wymiar — {shapeLabel}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {city?.name} · {breakdown.totalLengthMb.toFixed(1)} mb ·{' '}
                {FRONT_MATERIALS.find(f => f.value === frontMaterial)?.label} ·{' '}
                {COUNTERTOP_OPTIONS.find(c => c.value === countertop)?.label}
              </p>
            </div>

            {/* 3 kolumny podsumowujące */}
            <div className="grid grid-cols-3 gap-4 text-center mb-2">
              <div className="bg-green-50 rounded-lg py-3 px-2 border border-green-100">
                <p className="text-xs text-green-600 uppercase font-medium mb-1">Ekonomiczny</p>
                <p className="text-xl font-bold text-green-700">{breakdown.sumEkonom.toLocaleString('pl-PL')} zł</p>
                <p className="text-xs text-green-500 mt-0.5">{Math.round(breakdown.sumEkonom / breakdown.totalLengthMb).toLocaleString('pl-PL')} zł/mb</p>
              </div>
              <div className="bg-blue-50 rounded-lg py-3 px-2 border border-blue-200">
                <p className="text-xs text-blue-600 uppercase font-medium mb-1">Standard</p>
                <p className="text-2xl font-bold text-blue-700">{breakdown.sumStandard.toLocaleString('pl-PL')} zł</p>
                <p className="text-xs text-blue-500 mt-0.5">{Math.round(breakdown.sumStandard / breakdown.totalLengthMb).toLocaleString('pl-PL')} zł/mb</p>
              </div>
              <div className="bg-purple-50 rounded-lg py-3 px-2 border border-purple-100">
                <p className="text-xs text-purple-600 uppercase font-medium mb-1">Premium</p>
                <p className="text-xl font-bold text-purple-700">{breakdown.sumPremium.toLocaleString('pl-PL')} zł</p>
                <p className="text-xs text-purple-500 mt-0.5">{Math.round(breakdown.sumPremium / breakdown.totalLengthMb).toLocaleString('pl-PL')} zł/mb</p>
              </div>
            </div>
          </Card>

          {/* Tabela szczegółowego rozbicia */}
          <Card>
            <h4 className="font-semibold text-slate-800 mb-4">Szczegółowe rozbicie kosztów</h4>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-2 px-3 text-slate-600 font-medium">Element</th>
                    <th className="text-center py-2 px-1 text-slate-500 font-medium w-16">Ilość</th>
                    <th className="text-right py-2 px-3 text-green-700 font-medium">Ekonomiczny</th>
                    <th className="text-right py-2 px-3 text-blue-700 font-medium">Standard</th>
                    <th className="text-right py-2 px-3 text-purple-700 font-medium">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.lines.map((line, i) => {
                    const eTotal = line.unit === 'zł/mb' || line.unit === 'zł/szt' ? line.ekonom * line.qty : line.ekonom;
                    const sTotal = line.unit === 'zł/mb' || line.unit === 'zł/szt' ? line.standard * line.qty : line.standard;
                    const pTotal = line.unit === 'zł/mb' || line.unit === 'zł/szt' ? line.premium * line.qty : line.premium;
                    return (
                      <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="py-2.5 px-3">
                          <span className="text-slate-800">{line.label}</span>
                          {line.note && (
                            <span className="block text-xs text-slate-400 mt-0.5">{line.note}</span>
                          )}
                        </td>
                        <td className="text-center py-2.5 px-1 text-slate-500 text-xs">
                          {line.qty > 1 || line.unit === 'zł/mb' ? `${line.qty.toFixed(1)} ${line.unit === 'zł/mb' ? 'mb' : 'szt'}` : '—'}
                        </td>
                        <td className="text-right py-2.5 px-3 text-green-700 font-medium tabular-nums">
                          {eTotal > 0 ? `${eTotal.toLocaleString('pl-PL')} zł` : '—'}
                        </td>
                        <td className="text-right py-2.5 px-3 text-blue-700 font-medium tabular-nums">
                          {sTotal > 0 ? `${sTotal.toLocaleString('pl-PL')} zł` : '—'}
                        </td>
                        <td className="text-right py-2.5 px-3 text-purple-700 font-medium tabular-nums">
                          {pTotal > 0 ? `${pTotal.toLocaleString('pl-PL')} zł` : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold">
                    <td className="py-3 px-3 text-slate-900" colSpan={2}>SUMA</td>
                    <td className="text-right py-3 px-3 text-green-800 tabular-nums">{breakdown.sumEkonom.toLocaleString('pl-PL')} zł</td>
                    <td className="text-right py-3 px-3 text-blue-800 tabular-nums">{breakdown.sumStandard.toLocaleString('pl-PL')} zł</td>
                    <td className="text-right py-3 px-3 text-purple-800 tabular-nums">{breakdown.sumPremium.toLocaleString('pl-PL')} zł</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          {/* BANER — Porównanie dostawców (IKEA, Agata, Castorama, Stolarz) */}
          <div className="relative overflow-hidden rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <div className="px-5 py-6 sm:px-8">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🔒</span>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Ile zapłacisz w IKEA, Agata Meble, Castorama czy u stolarza?
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Kup pełny raport i sprawdź dokładne ceny tej kuchni u najpopularniejszych dostawców w Polsce.
                  </p>
                </div>
              </div>

              {/* Podgląd tabelki — zamazane */}
              <div className="relative mb-5">
                <div className="select-none" style={{ filter: 'blur(5px)', pointerEvents: 'none' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-2 text-slate-600">Dostawca</th>
                        <th className="text-right py-2 px-2 text-slate-600">Ekonom.</th>
                        <th className="text-right py-2 px-2 text-slate-600">Standard</th>
                        <th className="text-right py-2 px-2 text-slate-600">Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-2 font-medium">🟡 IKEA</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumEkonom * 0.75).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumStandard * 0.8).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumPremium * 0.7).toLocaleString('pl-PL')} zł</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-2 font-medium">🟠 Agata Meble</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumEkonom * 0.9).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumStandard * 0.95).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumPremium * 0.85).toLocaleString('pl-PL')} zł</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-2 font-medium">🔴 Castorama</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumEkonom * 0.85).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumStandard * 0.88).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumPremium * 0.82).toLocaleString('pl-PL')} zł</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-medium">🟤 Stolarz lokalny</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumEkonom * 1.1).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumStandard * 1.0).toLocaleString('pl-PL')} zł</td>
                        <td className="text-right py-2 px-2">{Math.round(breakdown.sumPremium * 1.15).toLocaleString('pl-PL')} zł</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 border border-orange-300 rounded-full px-4 py-1.5 text-sm font-semibold text-orange-700 shadow-sm">
                    Dostępne w pełnym raporcie
                  </span>
                </div>
              </div>

              {/* Raport CTA */}
              <div className="bg-white rounded-lg border border-orange-200 p-4 mb-4">
                <p className="text-sm text-slate-700 mb-3">
                  Pełny raport PDF ({breakdown.totalLengthMb.toFixed(1)} mb, {shapeLabel}, {city?.name}) zawiera:
                </p>
                <ul className="text-sm text-slate-600 space-y-1.5 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Ceny u 4 dostawców: IKEA, Agata Meble, Castorama, stolarz
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Rozbicie na {breakdown.lines.length} elementów z cenami ekonom / standard / premium
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Porównanie frontów ({FRONT_MATERIALS.find(f => f.value === frontMaterial)?.label}) i blatów ({COUNTERTOP_OPTIONS.find(c => c.value === countertop)?.label})
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Koszty Blum vs tańsze okucia — ile dopłacisz za jakość
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Ceny AGD do zabudowy — ranking cenowy w Twoim mieście
                  </li>
                </ul>
                <CountdownTimer className="mb-3" />
                <div className="flex items-center gap-4">
                  <a
                    href={`/kup-raport?typ=kuchnia&ksztalt=${kitchenShape}&dlugosc=${breakdown.totalLengthMb}&fronty=${frontMaterial}&blat=${countertop}&miasto=${city?.slug || ''}`}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-center shadow-lg hover:shadow-xl block"
                  >
                    Kup raport — <span className="line-through text-white/50 decoration-red-300 decoration-2 mr-1">69,99 zł</span> <span className="text-lg font-extrabold">29,99 zł</span>
                  </a>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400">Średnio oszczędzasz</p>
                    <p className="text-lg font-bold text-green-700">2 000+ zł</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center">
                Raport PDF dostarczony na e-mail w ciągu 1 godziny. Płatność Przelewy24.
              </p>
            </div>
          </div>

          {/* Podsumowanie konfiguracji */}
          <Card>
            <h4 className="font-semibold text-slate-800 mb-3">Twoja konfiguracja</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Kształt:</span>
                <span className="text-slate-800 font-medium">{shapeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Długość:</span>
                <span className="text-slate-800 font-medium">{breakdown.totalLengthMb.toFixed(1)} mb</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fronty:</span>
                <span className="text-slate-800 font-medium">{FRONT_MATERIALS.find(f => f.value === frontMaterial)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Uchwyty:</span>
                <span className="text-slate-800 font-medium">{HANDLE_TYPES.find(h => h.value === handleType)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Blat:</span>
                <span className="text-slate-800 font-medium">{COUNTERTOP_OPTIONS.find(c => c.value === countertop)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Szafki górne:</span>
                <span className="text-slate-800 font-medium">{hasUpperCabinets ? 'Tak' : 'Nie'}</span>
              </div>
              {equipment.length > 0 && (
                <div className="col-span-2 flex justify-between">
                  <span className="text-slate-500">Wyposażenie:</span>
                  <span className="text-slate-800 font-medium text-right max-w-[60%]">
                    {equipment.map(eq => EQUIPMENT_OPTIONS.find(e => e.id === eq)?.label.split(' (')[0]).join(', ')}
                  </span>
                </div>
              )}
              {agdItems.length > 0 && (
                <div className="col-span-2 flex justify-between">
                  <span className="text-slate-500">AGD zabudowa:</span>
                  <span className="text-slate-800 font-medium text-right max-w-[60%]">
                    {agdItems.map(a => AGD_OPTIONS.find(o => o.id === a)?.label.split(' (')[0]).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Pliki */}
          {uploadedFiles.length > 0 && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
              <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <div>
                <p className="text-sm font-medium text-green-800">
                  {uploadedFiles.length === 1 ? 'Plik załączony' : `${uploadedFiles.length} pliki załączone`} — uwzględnione w raporcie
                </p>
                <p className="text-xs text-green-600">
                  {uploadedFiles.map(f => f.name).join(', ')}
                </p>
              </div>
            </div>
          )}

          {projectNotes && (
            <Card>
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">Uwagi:</span> {projectNotes}
              </p>
            </Card>
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

        {step < 7 ? (
          <Button
            variant="cta"
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
          >
            {step === 6 ? 'Oblicz cenę' : 'Dalej →'}
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
    setKitchenShape('');
    setLengthA(3.0);
    setLengthB(2.0);
    setLengthC(2.0);
    setIslandLength(1.5);
    setHeightCm(220);
    setHasUpperCabinets(true);
    setDepthCm(60);
    setFrontMaterial('laminated');
    setHandleType('uchwyty');
    setCountertop('laminat');
    setBacksplash('plytki');
    setEquipment(['softclose']);
    setAgdItems([]);
    setUploadedFiles([]);
    setProjectNotes('');
    setHasOwnDesign('');
    setCity(null);
  }
}
