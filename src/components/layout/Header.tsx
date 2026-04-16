'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight" aria-label="ilezaremont.pl - Mapa Cen Remontów">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-brand-blue">ile</span><span className="text-accent-orange">za</span><span className="text-brand-green">remont</span><span className="text-slate-500">.pl</span>
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-500 mt-0.5">
              Mapa Cen Remontów
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
                Kalkulatory
                <svg className={`h-3.5 w-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-0 w-52 rounded-lg border border-slate-200 bg-white shadow-lg py-1 animate-slide-down">
                  <Link href="/kalkulator/remont-lazienki" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Remont łazienki
                  </Link>
                  <Link href="/kalkulator/malowanie-scian" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Malowanie ścian
                  </Link>
                  <Link href="/kalkulator/ukladanie-plytek" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Układanie płytek
                  </Link>
                  <Link href="/kalkulator/kuchnia-na-wymiar" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Kuchnia na wymiar
                  </Link>
                  <Link href="/kalkulator/okna-pcv" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Okna PCV
                  </Link>
                  <Link href="/kalkulator/meble-na-wymiar" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Meble na wymiar
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <Link href="/kalkulator" className="block px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50">
                    Wszystkie kalkulatory
                  </Link>
                </div>
              )}
            </div>

            <Link href="/mapa-cen" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
              Mapa Cen
            </Link>
            <Link href="/poradnik" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
              Poradnik
            </Link>
            <Link href="/metodologia" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors">
              Metodologia
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            aria-expanded={isOpen}
            aria-label="Menu"
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-slate-100 py-3 md:hidden animate-slide-down">
            <div className="space-y-1">
              <Link href="/kalkulator/remont-lazienki" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Remont łazienki
              </Link>
              <Link href="/kalkulator/malowanie-scian" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Malowanie ścian
              </Link>
              <Link href="/kalkulator/ukladanie-plytek" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Układanie płytek
              </Link>
              <Link href="/kalkulator/kuchnia-na-wymiar" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Kuchnia na wymiar
              </Link>
              <Link href="/kalkulator/okna-pcv" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Okna PCV
              </Link>
              <Link href="/kalkulator/meble-na-wymiar" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Kalkulator: Meble na wymiar
              </Link>
              <div className="my-2 border-t border-slate-100" />
              <Link href="/mapa-cen" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Mapa Cen
              </Link>
              <Link href="/poradnik" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Poradnik
              </Link>
              <Link href="/metodologia" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
                Metodologia
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
