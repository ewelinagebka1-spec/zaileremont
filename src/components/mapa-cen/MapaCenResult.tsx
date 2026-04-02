'use client';

import React, { useMemo, useState, useEffect } from 'react';
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

const STRIPE_URL = 'https://buy.stripe.com/4gM3cv2Ub3cu9vv7i800000';

/* ── Countdown Timer ───────────────────────────────────────── */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set promo end to midnight tonight
    function getTarget() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      return end;
    }

    function tick() {
      const diff = Math.max(0, getTarget().getTime() - Date.now());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setTimeLeft({ hours: h, minutes: m, seconds: s });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-1 font-mono text-sm">
      <span className="rounded bg-white/20 px-2 py-1 font-bold">{pad(timeLeft.hours)}</span>
      <span className="font-bold">:</span>
      <span className="rounded bg-white/20 px-2 py-1 font-bold">{pad(timeLeft.minutes)}</span>
      <span className="font-bold">:</span>
      <span className="rounded bg-white/20 px-2 py-1 font-bold">{pad(timeLeft.seconds)}</span>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────── */
export default function MapaCenResult({ city, serviceType }: MapaCenResultProps) {
  const mappedServiceType = ['bathroom', 'painting', 'tiles'].includes(serviceType)
    ? (serviceType as 'bathroom' | 'painting' | 'tiles')
    : ('bathroom' as 'bathroom' | 'painting' | 'tiles');

  const items = SERVICE_ITEMS[serviceType] || SERVICE_ITEMS['bathroom'];

  const result = useMemo(() => {
    const answers: PricingFormAnswers = {
      city: city.id,
      serviceType: mappedServiceType,
      area: 10,
      selectedItems: items,
      marketType: 'secondary',
      standard: 'standard',
    };
    return calculatePrice(answers);
  }, [city, serviceType, mappedServiceType, items]);

  const warsawCoefficient = 1.25;
  const indexVsWarsaw = (city.coefficient / warsawCoefficient).toFixed(2);

  const comparison = useMemo(() => {
    const answers: PricingFormAnswers = {
      city: city.id,
      serviceType: mappedServiceType,
      area: 10,
      selectedItems: items,
      marketType: 'secondary',
      standard: 'standard',
    };
    const top10Cities = [...CITIES].sort((a, b) => b.coefficient - a.coefficient)
      .slice(0, 10)
      .map(c => c.id);
    return generateCityComparison(answers, top10Cities);
  }, [city, serviceType, mappedServiceType, items]);

  const percentiles = [
    { label: 'p10', value: result.p10, color: '#10b981', bg: '#d1fae5' },
    { label: 'p25', value: result.p25, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'p50', value: result.p50, color: '#f97316', bg: '#ffedd5' },
    { label: 'p75', value: result.p75, color: '#ea580c', bg: '#fed7aa' },
    { label: 'p90', value: result.p90, color: '#ef4444', bg: '#fee2e2' },
  ];

  const maxValue = Math.max(...percentiles.map(p => p.value));

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── Header Card ─────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        color: 'white',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '8px' }}>
          Raport cenowy
        </p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
          {SERVICE_NAMES[serviceType] || serviceType}
        </h2>
        <p style={{ fontSize: '18px', fontWeight: 500, opacity: 0.85, marginTop: '4px' }}>
          {city.name} · {city.voivodeship}
        </p>

        {/* Price boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
          {[
            { label: 'MIN', value: result.p10, accent: '#34d399' },
            { label: 'MEDIANA', value: result.p50, accent: '#fbbf24' },
            { label: 'MAX', value: result.p90, accent: '#f87171' },
          ].map(box => (
            <div key={box.label} style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: `4px solid ${box.accent}`,
            }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', opacity: 0.65, margin: 0 }}>{box.label}</p>
              <p style={{ fontSize: '32px', fontWeight: 800, margin: '4px 0 0', lineHeight: 1.1 }}>
                {Math.round(box.value)}
              </p>
              <p style={{ fontSize: '12px', opacity: 0.6, margin: 0 }}>zł/m²</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', padding: '12px 16px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}>
          <div>
            <p style={{ fontSize: '12px', opacity: 0.6, margin: 0 }}>Indeks vs. Warszawa</p>
            <p style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>{indexVsWarsaw}</p>
          </div>
          <p style={{ fontSize: '11px', opacity: 0.5, margin: 0 }}>
            Dane: algorytm ilezaremont.pl · kwiecień 2026
          </p>
        </div>
      </div>

      {/* ── Percentile Distribution ────────────────────── */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '28px 32px',
        marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px' }}>
          Rozkład percentylowy cen
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {percentiles.map(p => (
            <div key={p.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{p.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  {Math.round(p.value)} zł/m²
                </span>
              </div>
              <div style={{ height: '10px', borderRadius: '5px', background: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(p.value / maxValue) * 100}%`,
                  borderRadius: '5px',
                  background: `linear-gradient(90deg, ${p.bg}, ${p.color})`,
                  transition: 'width 0.6s ease-out',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── City Comparison ────────────────────────────── */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '28px 32px',
        marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px' }}>
          Porównanie z innymi miastami
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Miasto</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Min</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mediana</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Indeks</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c, idx) => {
                const isCurrent = c.city === city.name;
                return (
                  <tr key={idx} style={{
                    borderBottom: '1px solid #f1f5f9',
                    background: isCurrent ? '#eff6ff' : (idx % 2 === 0 ? '#fafbfc' : '#fff'),
                  }}>
                    <td style={{ padding: '10px 12px', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#1d4ed8' : '#334155' }}>
                      {c.city}
                      {isCurrent && (
                        <span style={{
                          marginLeft: '8px',
                          display: 'inline-block',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: '#1d4ed8',
                          color: '#fff',
                        }}>TY</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b' }}>{Math.round(c.minPrice)} zł</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#1e293b' }}>{Math.round(c.medianPrice)} zł</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b' }}>{Math.round(c.maxPrice)} zł</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#1e293b' }}>{c.coefficient.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Trend Section ──────────────────────────────── */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '28px 32px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Trend cenowy</h3>
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '20px',
            background: '#fef2f2',
            color: '#dc2626',
          }}>+8% r/r</span>
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
          Źródło: GUS — CPI dla usług budowlanych
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
          {[
            { q: 'Q1 2025', h: 60 },
            { q: 'Q2 2025', h: 68 },
            { q: 'Q3 2025', h: 75 },
            { q: 'Q4 2025', h: 82 },
            { q: 'Q1 2026', h: 92 },
          ].map((bar, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '100%',
                maxWidth: '48px',
                height: `${bar.h}%`,
                borderRadius: '6px 6px 0 0',
                background: i === 4
                  ? 'linear-gradient(180deg, #f97316, #ea580c)'
                  : 'linear-gradient(180deg, #93c5fd, #3b82f6)',
                transition: 'height 0.4s ease',
              }} />
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{bar.q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA — Buy Report ───────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        textAlign: 'center',
      }}>
        {/* Promo badge */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '4px 16px',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Promocja kończy się za
        </div>

        {/* Countdown */}
        <CountdownTimer />

        <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '20px 0 8px', lineHeight: 1.2 }}>
          Pobierz pełny raport PDF
        </h3>
        <p style={{ fontSize: '14px', opacity: 0.85, margin: '0 0 20px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
          Szczegółowa analiza cen, porównanie miast, trendy i prognozy — wszystko w jednym dokumencie.
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{
            fontSize: '22px',
            fontWeight: 700,
            textDecoration: 'line-through',
            opacity: 0.6,
          }}>69 zł</span>
          <span style={{
            fontSize: '42px',
            fontWeight: 900,
            lineHeight: 1,
          }}>29 zł</span>
        </div>

        {/* CTA Button */}
        <a
          href={STRIPE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '360px',
            margin: '0 auto 16px',
            padding: '16px 32px',
            background: '#fff',
            color: '#ea580c',
            fontSize: '18px',
            fontWeight: 800,
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onClick={(e) => { e.preventDefault(); window.open(STRIPE_URL, '_blank', 'noopener,noreferrer'); }}
        >
          Pobierz raport
        </a>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '12px', opacity: 0.75 }}>
          <span>14 dni na zwrot</span>
          <span>·</span>
          <span>Natychmiastowy PDF</span>
          <span>·</span>
          <span>Bezpieczna płatność</span>
        </div>
      </div>
    </div>
  );
}
