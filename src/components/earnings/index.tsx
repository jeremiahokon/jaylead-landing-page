import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { ProjectionTable } from '@/components/projection-table';
import { SectionHead } from '@/components/section-head';

import { earnings } from '@/data/palm-grove';

/**
 * Section 9, the page's signature moment: the 70/30 split set as one
 * oversized slab line over a bar that draws itself on scroll (CSS
 * scroll-driven animation, static where unsupported or reduced).
 *
 * The 30-year table renders only when finance's figures are in the data
 * file. Until then the section still closes on the split, the illustrative
 * line and "Get My Full Projection", so it never renders empty.
 */
export function Earnings() {
  const { projection, steps, cta, disclaimer } = earnings;

  const hasProjection =
    projection.acre.length > 0 || projection.hectare.length > 0;

  return (
    <section
      aria-labelledby="earnings-title"
      className="overflow-hidden py-20 sm:py-28"
    >
      <Container>
        <SectionHead
          entry="07"
          label="How you earn"
          id="earnings-title"
          title={
            <>
              Your Share of <span className="em-oil">Every Harvest.</span>
            </>
          }
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

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
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

        <div className="bg-bone-deep rounded-card mt-16 grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <div>
            <h3 className="font-display text-title">
              30-year revenue projection
            </h3>
            <p className="text-stone mt-3">
              {hasProjection
                ? 'Per 1 acre and per 1 hectare, with your 70% share beside total revenue.'
                : 'The year-by-year projection for 1 acre and 1 hectare, with your 70% share beside total revenue, is sent with your plot details.'}
            </p>
            <CtaLink cta={cta} className="mt-7" />
          </div>
          <div>
            {hasProjection ? (
              <ProjectionTable
                acre={projection.acre}
                hectare={projection.hectare}
                visibleRows={projection.visibleRows}
              />
            ) : null}
            <p className="text-small text-stone mt-6 italic first:mt-0">
              {disclaimer}
            </p>
            {projection.assumptions.length > 0 ? (
              <>
                <p className="micro text-stone mt-6">Key assumptions</p>
                <ul className="text-small text-stone mt-3 grid list-disc gap-1.5 pl-5">
                  {projection.assumptions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
