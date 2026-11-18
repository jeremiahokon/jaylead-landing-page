import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { SectionHead } from '@/components/section-head';

import { faqs } from '@/data/palm-grove';

/**
 * Section 12. Native <details> accordion (works with JS off), each answer
 * ending in its own CTA (brief §12). The same `faqs` array feeds the
 * FAQPage JSON-LD and /llms.txt.
 */
export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className="bg-bone-deep py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <SectionHead
            entry="10"
            label="Questions"
            id="faq-title"
            title={
              <>
                Questions, <span className="em-oil">answered.</span>
              </>
            }
          />
        </div>
        <div className="border-rule border-t">
          {faqs.map((f, i) => (
            <details
              key={f.question}
              className="faq-item group border-rule border-b"
            >
              <summary className="grid grid-cols-[2.25rem_1fr_1.5rem] items-baseline gap-2 py-6">
                <span
                  aria-hidden="true"
                  className="font-display text-oil tabular"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-title">{f.question}</h3>
                <span
                  aria-hidden="true"
                  className="faq-mark text-title justify-self-end transition-transform duration-300"
                >
                  +
                </span>
              </summary>
              <div className="pb-8 pl-[2.75rem]">
                <p className="measure">{f.answer}</p>
                <CtaLink cta={f.cta} variant="ghost" className="mt-6" />
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
