# ilezaremont.pl — Mapa Cen Remontow

Portal z kalkulatorami wycen remontow i Mapa Cen Remontow w modelu Price Map.

## Szybki start

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom serwer deweloperski
npm run dev

# 3. Otwórz http://localhost:3000
```

## Deploy na Cloudflare Pages

```bash
# 1. Build statyczny
npm run build

# 2. Pliki wyjściowe w folderze /out

# 3. W Cloudflare Pages:
#    - Podłącz repo GitHub
#    - Build command: npm run build
#    - Build output directory: out
#    - Framework preset: Next.js (Static HTML Export)
```

## Struktura projektu

```
src/
├── app/                          # Strony (Next.js App Router)
│   ├── page.tsx                  # Strona główna
│   ├── layout.tsx                # Root layout (Header, Footer)
│   ├── globals.css               # Style globalne
│   ├── sitemap.ts                # Sitemap XML
│   ├── kalkulator/
│   │   ├── page.tsx              # Index kalkulatorów
│   │   ├── remont-lazienki/      # Kalkulator łazienki
│   │   ├── malowanie-scian/      # Kalkulator malowania
│   │   └── ukladanie-plytek/     # Kalkulator płytek
│   ├── mapa-cen/
│   │   ├── page.tsx              # Mapa Cen Remontów
│   │   ├── [miasto]/             # Strony miast (dynamiczne)
│   │   └── [miasto]/[usluga]/    # Strony miasto+usługa
│   ├── metodologia/              # Opis metodologii
│   ├── o-nas/                    # O nas
│   └── poradnik/                 # Blog (skeleton)
├── components/
│   ├── ui/                       # Komponenty UI
│   ├── calculators/              # Kalkulatory
│   ├── mapa-cen/                 # Moduł Mapa Cen
│   ├── home/                     # Komponenty strony głównej
│   └── layout/                   # Header, Footer
├── data/
│   ├── pricing.ts                # Dane cenowe bazowe
│   └── cities.ts                 # Baza miast polskich
└── lib/
    └── pricing-engine.ts         # Algorytm wyceny
```

## Stack technologiczny

- **Next.js 14** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS**
- **Cloudflare Pages** (hosting)

## Kalibracja cen

Ceny bazowe w `src/data/pricing.ts` — edytuj po otrzymaniu danych od fachowcow.
Wspolczynniki miast w `src/data/cities.ts`.
Algorytm w `src/lib/pricing-engine.ts`.

## Nastepne kroki

1. Integracja Przelewy24 (platnosci za raporty)
2. Generowanie PDF (Puppeteer)
3. Rozbudowa bloga (artykuly SEO)
4. Baza wykonawcow (lead generation)
