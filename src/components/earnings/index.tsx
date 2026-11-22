import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { ProjectionTable } from '@/components/projection-table';
import { Emphasis, SectionHead } from '@/components/section-head';

import { earnings } from '@/data/palm-grove';

/**
 * Section 9, the page's signature moment: the 70/30 split set as one
 * oversized slab line over a bar that draws itself on scroll (CSS
 * scroll-driven animation, static where unsupported or reduced).
 *
 * Then the owner's Year 3 to Year 10 projection for 1 hectare, its
 * disclaimer directly under the table, and "Get My Full Projection", which
 * opens the lead form.
 */
export function Earnings() {
  const { headline, projection, steps, cta } = earnings;

  return (
    <section
      aria-labelledby="earnings-title"
      className="overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          label="How you earn"
          id="earnings-title"
          title={headline}
        />

        <figure
          className="mt-14"
          aria-label="Revenue split: 70% to land buyers, 30% to Jaylead"
        >
          {/*
           * leading-none (not the giant token's 0.8) so the digits' full
           * height sits inside the box and never runs into the bar. The %
           * is a raised suffix: 0.4em, lifted so its top meets the cap height.
           */}
          <div className="flex items-end justify-between gap-6">
            <p className="font-display text-giant tabular leading-none">
              70<span className="pct">%</span>
            </p>
            <p className="font-display text-figure tabular text-stone leading-none">
              30<span className="pct">%</span>
            </p>
          </div>
          <div
            aria-hidden="true"
            className="bg-bone-deep mt-4 flex h-5 overflow-hidden rounded-full sm:h-7"
          >
            <span className="split-fill bg-ink block w-[70%] origin-left rounded-full" />
            <span className="block w-[30%]" />
          </div>
          <figcaption className="mt-4 flex justify-between gap-6">
            <span className="micro">To land buyers, every year</span>
            <span className="micro text-stone text-right">
              Retained by Jaylead to manage the estate
            </span>
          </figcaption>
        </figure>

        <ol className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s}
              className={`border-t-2 pt-5 ${i === 1 ? 'border-ink font-bold' : 'border-rule'}`}
            >
              <span className="micro text-stone">Step {i + 1}</span>
              <p className="mt-2">{s}</p>
            </li>
          ))}
        </ol>

        <div className="ring-rule rounded-card mt-20 p-6 ring-1 sm:mt-28 sm:p-12 lg:p-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14">
            <div>
              <h3 className="font-display text-figure max-w-3xl">
                <Emphasis headline={projection.headline} />
              </h3>
              <p className="text-lede text-stone measure mt-5">
                {projection.intro}
              </p>
            </div>
            <CtaLink cta={cta} className="hidden lg:inline-flex" />
          </div>
          <div className="mt-10">
            <ProjectionTable
              rows={projection.rows}
              columns={projection.columns}
              caption={`${projection.headline.join(' ')}. ${projection.intro}`}
            />
          </div>
          <p className="text-small text-stone measure mt-6 italic">
            {projection.disclaimer}
          </p>
          <CtaLink cta={cta} className="mt-8 w-full sm:w-auto lg:hidden" />
        </div>
      </Container>
    </section>
  );
}
