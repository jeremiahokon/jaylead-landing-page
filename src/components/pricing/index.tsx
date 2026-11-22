import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { PlotCard } from '@/components/plot-card';
import { SectionHead } from '@/components/section-head';

import { plots, pricing } from '@/data/palm-grove';

/**
 * Section 6, on the ink band. Labelled clearly as a pre-launch offer, with
 * no end date or slot counter (brief §6: only if true and honoured; none
 * has been given). Every "Get Pricing & Plot Details" on the page lands
 * here; the form opens from a plot card, or from "Talk to an Advisor".
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="on-ink grain py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          label={pricing.eyebrow}
          id="pricing-title"
          title={pricing.headline}
        />
        <div className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-2">
          {plots.map((p) => (
            <PlotCard key={p.id} plot={p} />
          ))}
        </div>
        <div className="border-rule-light mt-14 flex flex-col items-start gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lede text-sand max-w-xl">
            {pricing.undecided.line}
          </p>
          <CtaLink cta={pricing.undecided.cta} variant="ghost" />
        </div>
      </Container>
    </section>
  );
}
