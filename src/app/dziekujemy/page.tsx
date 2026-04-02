import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DziÄkujemy za zakup â ilezaremont.pl',
  description: 'TwÃ³j raport cenowy jest gotowy do pobrania. DziÄkujemy za zaufanie!',
  robots: { index: false, follow: false },
};

export default function DziekujemyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            DziÄkujemy za zakup!
          </h1>
          <p className="text-lg text-slate-500">
            PÅatnoÅÄ przebiegÅa pomyÅlnie. TwÃ³j raport cenowy jest gotowy.
          </p>
        </div>

        {/* Download Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Pobierz swÃ³j raport</h2>
            <p className="text-blue-200 text-sm">PDF Â· 10 stron analizy Â· gotowy do pobrania</p>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-600">
              Kliknij poniÅ¼szy przycisk, aby pobraÄ raport cenowy w formacie PDF.
              Raport zostaÅ rÃ³wnieÅ¼ wysÅany na TwÃ³j adres e-mail.
            </p>

            <a
              href="/raport-przyklad.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-base no-underline text-center cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Pobierz raport PDF
            </a>

            <p className="text-xs text-slate-400 text-center">
              Link do pobrania jest waÅ¼ny przez 30 dni
            </p>
          </div>
        </div>

        {/* What's inside */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 mb-8">
          <h3 className="font-semibold text-slate-800 mb-3">Co znajdziesz w raporcie:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flv className="flex items-center gap-2">
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
          </div>
        </div>

        {/* Help section */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">
            Masz pytania? Napisz do nas na{' '}
            <a href="mailto:raport@ilezaremont.pl" className="text-blue-600 hover:text-blue-800 font-medium">
              raport@ilezaremont.pl
            </a>
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              &larr; Strona gÅÃ³wna
            </Link>
            <Link href="/kalkulator" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Kalkulatory &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
