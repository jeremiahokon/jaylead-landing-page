import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { SectionHead } from '@/components/section-head';

import { opportunity } from '@/data/palm-grove';

/**
 * Section 3. The four stat cards are set as one ledger sum instead of four
 * boxes: needed, minus produced, equals the shortfall, which costs ₦1T+.
 * The figures are the brief's, verbatim.
 */
export function Opportunity() {
  const [needed, produced, gap, cost] = opportunity.stats;
  const ops = ['', '−', '=', ''];

  return (
    <section
      aria-labelledby="opportunity-title"
      className="bg-bone-deep py-24 sm:py-32 lg:py-40"
    >
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHead
            label="Why palm oil, why now"
            id="opportunity-title"
            title={opportunity.headline}
          />
          <p className="text-lede measure mt-6">{opportunity.copy}</p>
          <CtaLink cta={opportunity.cta} className="mt-10 sm:mt-12" />
        </div>
        <dl data-reveal className="self-end">
          {[needed, produced, gap].map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-wrap items-baseline justify-between gap-x-4 py-5 ${i === 2 ? 'border-ink border-b-2' : 'border-rule border-b'}`}
            >
              <dt className="micro text-stone order-2">{s.label}</dt>
              <dd className="font-display text-figure tabular order-1">
                <span
                  aria-hidden="true"
                  className="text-stone inline-block w-[1.1em]"
                >
                  {ops[i]}
                </span>
                {s.figure}
                <span className="text-title ml-2">{s.unit}</span>
              </dd>
            </div>
          ))}
          <div className="on-ink rounded-card mt-6 flex flex-wrap items-baseline justify-between gap-x-4 px-6 py-6">
            <dt className="micro text-sand">{cost.label}</dt>
            <dd className="font-display text-figure text-oil">{cost.figure}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
