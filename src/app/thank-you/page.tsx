/**
 * Section 15: the only page that fires the conversion (brief §15), and free
 * of anything else: no header CTA, no sections. Static; the query string
 * (which form, which interest) is read by the thank-you-actions island
 * inside <Suspense>.
 */
import { Suspense } from 'react';

import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { WhatsAppIcon } from '@/components/icons';
import { Logo } from '@/components/logo';
import { Emphasis } from '@/components/section-head';
import { ThankYouActions } from '@/components/thank-you-actions';

import { buildWhatsAppLink } from '@/lib/whatsapp';

import {
  brochure,
  brochureWhatsappMessage,
  business,
  thankYou,
} from '@/data/palm-grove';

export const metadata: Metadata = {
  title: 'Thank you | Palm Grove Estate',
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you' },
};

export default function ThankYouPage() {
  const advisor = (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="pill pill-ghost"
    >
      Talk to an Advisor
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );

  return (
    <main id="main" className="grain min-h-dvh py-10 sm:py-16">
      <Container className="max-w-3xl">
        <Logo />
        <p className="micro text-stone mt-16">Palm Grove Estate · Osun State</p>
        <h1 className="font-display text-display mt-5">
          <Emphasis headline={thankYou.headline} />
        </h1>
        <p className="text-lede mt-6">{thankYou.next}</p>

        <Suspense fallback={null}>
          <ThankYouActions pdfUrl={brochure.pdfUrl}>{advisor}</ThankYouActions>
        </Suspense>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
          >
            <WhatsAppIcon className="size-5" />
            {thankYou.whatsappLabel}
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
          <a
            href={buildWhatsAppLink(thankYou.inspectionMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-ghost"
          >
            {thankYou.inspectionLabel}
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
        </div>

        {/* Brief §15: the brochure link is always shown, even for Form 1. */}
        <div className="border-rule mt-12 border-t pt-8">
          <p className="micro text-stone">The Palm Grove Estate brochure</p>
          {brochure.pdfUrl ? (
            <a
              href={brochure.pdfUrl}
              download
              className="link-under font-display text-title mt-3 inline-block"
            >
              Download the brochure (PDF)
            </a>
          ) : (
            <a
              href={buildWhatsAppLink(brochureWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-under font-display text-title mt-3 inline-block"
            >
              Get the brochure on WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
          )}
        </div>

        <p className="text-small text-stone mt-16">
          {business.legalName} · RC {business.rcNumber} ·{' '}
          <a href={`tel:${business.phoneE164}`} className="link-under">
            {business.phoneDisplay}
          </a>
        </p>
      </Container>
    </main>
  );
}
