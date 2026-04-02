import Card from '@/components/ui/Card';
import Link from 'next/link';

interface CalculatorCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const CALCULATORS: CalculatorCard[] = [
  {
    id: 'okna-pcv',
    title: 'Okna PCV',
    description:
      'Ceny okien jednoskrzydłowych, dwuskrzydłowych, balkonowych i dachowych z montażem',
    icon: '🪟',
    link: '/kalkulator/okna-pcv',
  },
  {
    id: 'meble-na-wymiar',
    title: 'Meble na wymiar',
    description:
      'Kuchnie, szafy wnękowe, meble łazienkowe i pokojowe — wybierz rodzaj i poznaj cenę za mb',
    icon: '🪑',
    link: '/kalkulator/meble-na-wymiar',
  },
  {
    id: 'lazienka',
    title: 'Remont łazienki',
    description:
      'Pełny koszt remontu łazienki od wyposażenia po wykończenie',
    icon: '🚿',
    link: '/kalkulator/remont-lazienki',
  },
  {
    id: 'malowanie',
    title: 'Malowanie ścian',
    description:
      'Szacunek kosztów malowania pomieszczeń w Twoim domu',
    icon: '🎨',
    link: '/kalkulator/malowanie-scian',
  },
  {
    id: 'plytki',
    title: 'Układanie płytek',
    description:
      'Koszty materiałów i montażu różnych typów płytek',
    icon: '🧱',
    link: '/kalkulator/ukladanie-plytek',
  },
  {
    id: 'kuchnia-na-wymiar',
    title: 'Kuchnia na wymiar',
    description:
      'Pełna wycena kuchni: kształt zabudowy, fronty, blat, AGD, wyposażenie. Dodaj swój projekt!',
    icon: '🍳',
    link: '/kalkulator/kuchnia-na-wymiar',
  },
];

export default function CalculatorCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CALCULATORS.map((calc) => (
        <Link
          key={calc.id}
          href={calc.link}
          className="group"
        >
          <Card hover className="h-full">
            <div className="space-y-4">
              <div className="text-4xl">{calc.icon}</div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-brand-blue transition-colors">
                  {calc.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {calc.description}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2 text-sm font-medium text-brand-blue">
                Oblicz koszt
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
