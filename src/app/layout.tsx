/**
 * Fonts, site-wide metadata and the analytics island.
 *
 * The Jaylead brand type from the Figma design system ("Jayleads", frame 21):
 * Sansita One for headers, Figtree for subtext. Sansita One is not in
 * next/font's Google list, so its Latin woff2 (15 KB, OFL, src/fonts) is
 * self-hosted; Figtree comes through next/font/google. Sansita One has no
 * naira sign, so the display stack falls back to Figtree for that one glyph
 * (globals.css, font-display).
 */
import { Figtree } from 'next/font/google';
import localFont from 'next/font/local';

import type { Metadata, Viewport } from 'next';

import { Analytics } from '@/components/analytics';

import { siteKeywords, siteUrl } from '@/lib/site';

import { seo } from '@/data/palm-grove';

import './globals.css';

const sansita = localFont({
  src: '../fonts/sansita-one.woff2',
  weight: '400',
  variable: '--font-sansita',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: siteKeywords,
  applicationName: 'Palm Grove Estate',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Jaylead AgriEstate',
    locale: 'en_NG',
    title: seo.title,
    description: seo.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#033726',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NG"
      data-scroll-behavior="smooth"
      className={`${sansita.variable} ${figtree.variable}`}
    >
      <body>
        <a
          href="#main"
          className="pill sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
