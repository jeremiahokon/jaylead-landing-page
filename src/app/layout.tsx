/**
 * Fonts, site-wide metadata and the analytics island.
 *
 * Three woff2 files, 30 KB together, copied from the main site: Bespoke Slab
 * roman and italic for display (its heavy slab italic matches the Jaylead
 * wordmark) and Lexend for text. Each carries a drawn-in naira sign.
 */
import localFont from 'next/font/local';

import type { Metadata, Viewport } from 'next';

import { Analytics } from '@/components/analytics';

import { siteKeywords, siteUrl } from '@/lib/site';

import { seo } from '@/data/palm-grove';

import './globals.css';

const slab = localFont({
  src: [
    { path: '../fonts/bespoke-slab.woff2', weight: '700', style: 'normal' },
    {
      path: '../fonts/bespoke-slab-italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-slab',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

const lexend = localFont({
  src: '../fonts/lexend.woff2',
  weight: '400 700',
  variable: '--font-lexend',
  display: 'swap',
  adjustFontFallback: 'Arial',
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
  themeColor: '#0d3924',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NG"
      data-scroll-behavior="smooth"
      className={`${slab.variable} ${lexend.variable}`}
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
