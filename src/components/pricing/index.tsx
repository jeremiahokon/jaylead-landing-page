import { Container } from '@/components/container';
import { PlotCard } from '@/components/plot-card';
import { SectionHead } from '@/components/section-head';

import { plots, pricing } from '@/data/palm-grove';

/**
 * Section 6, on the ink band. Labelled clearly as a pre-launch offer, with
 * no end date or slot counter (brief §6: only if true and honoured; none
 * has been given).
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="on-ink grain py-20 sm:py-28"
    >
      <Container>
        <SectionHead
          entry="04"
          label={pricing.eyebrow}
          id="pricing-title"
          title={
            <>
              Pre-Launch <span className="em-oil">Plot Prices.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {plots.map((p) => (
            <PlotCard key={p.id} plot={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
