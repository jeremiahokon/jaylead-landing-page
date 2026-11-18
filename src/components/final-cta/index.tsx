import { Container } from '@/components/container';
import { WhatsAppIcon } from '@/components/icons';
import { LeadForm } from '@/components/lead-form';

import { buildWhatsAppLink } from '@/lib/whatsapp';

import { business, finalCta } from '@/data/palm-grove';

/**
 * Section 13. Form 1 embedded inline, not a pop-up (brief §13). This is
 * also #apply, where every form CTA lands when JavaScript is off.
 */
export function FinalCta() {
  return (
    <section
      id="apply"
      aria-labelledby="apply-title"
      className="on-ink grain py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="micro border-rule-light text-mist border-b pb-3">
            Entry 11 · Your plot
          </p>
          <h2 id="apply-title" className="font-display text-hero mt-6">
            Your Money Can Farm <span className="em-oil">While You Sleep.</span>
          </h2>
          <p className="text-lede text-sand mt-6">{finalCta.line}</p>
        </div>
        <div className="bg-bone/[0.06] ring-rule-light rounded-card p-6 ring-1 sm:p-9">
          <LeadForm kind="pricing" idPrefix="inline" tone="ink" />
          <p className="text-small text-sand mt-6 text-center">
            {finalCta.below}
          </p>
          <ul
            aria-label="Registration"
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {finalCta.badges.map((b) => (
              <li
                key={b}
                className="micro border-rule-light text-sand rounded-full border px-3 py-1.5"
              >
                {b}
              </li>
            ))}
          </ul>
          <div className="border-rule-light mt-7 flex flex-col items-center gap-3 border-t pt-7 sm:flex-row sm:justify-center">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-ghost"
            >
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
            <a
              href={`tel:${business.phoneE164}`}
              className="link-under font-bold"
            >
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
