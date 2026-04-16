import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-8LCDYBE9H3";
const META_PIXEL_ID = "1303474345016515";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mapa Cen Remontów | ilezaremont.pl",
  description:
    "Sprawdź ile kosztuje remont w Twoim mieście. Kalkulatory kosztów, mapa cen remontów, poradniki eksperckie. Dane dla 333 miast w Polsce.",
  keywords: [
    "ile kosztuje remont",
    "ceny remontów",
    "kalkulator remontów",
    "koszt remontu",
    "mapa cen",
    "remont domu",
    "remont mieszkania",
    "ile kosztuje remont",
  ],
  authors: [{ name: "ilezaremont.pl" }],
  creator: "ilezaremont.pl",
  publisher: "Adsales sp. z o.o.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://ilezaremont.pl",
    siteName: "ilezaremont.pl",
    title: "Mapa Cen Remontów | ilezaremont.pl",
    description:
      "Sprawdź ile kosztuje remont w Twoim mieście. Kalkulatory kosztów, mapa cen, poradniki eksperckie.",
    images: [
      {
        url: "https://ilezaremont.pl/og-image.png",
        width: 1200,
        height: 630,
        alt: "ilezaremont.pl - Mapa Cen Remontów",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapa Cen Remontów | ilezaremont.pl",
    description:
      "Sprawdź ile kosztuje remont w Twoim mieście. Kalkulatory i mapa cen.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ilezaremont.pl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ilezaremont.pl",
    "url": "https://ilezaremont.pl",
    "description": "Kompleksowa analiza cen remontów i budowy w Polsce",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ilezaremont.pl/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
        }
