import { Metadata } from 'next';
import MapaCenPage from './client';

export const metadata: Metadata = {
  title: 'Mapa Cen Remontów 2026 — sprawdź ceny w swoim mieście | ilezaremont.pl',
  description: 'Interaktywna mapa cen remontów w Polsce. Sprawdź aktualne ceny remontów w Twoim mieście, porównaj różne usługi i otrzymaj profesjonalną wycenę.',
  keywords: 'mapa cen, ceny remontów, remont, usługi budowlane, malowanie, łazienka, płytki',
  openGraph: {
    title: 'Mapa Cen Remontów 2026 — sprawdź ceny w swoim mieście',
    description: 'Interaktywna mapa cen remontów w Polsce. Sprawdź aktualne ceny w Twoim mieście.',
    type: 'website',
  },
};

export default function Page() {
  return <MapaCenPage />;
}
