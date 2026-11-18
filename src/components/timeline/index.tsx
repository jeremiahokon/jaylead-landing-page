import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { SectionHead } from '@/components/section-head';

import { timeline } from '@/data/palm-grove';

/**
 * Section 8. A vertical ledger: the "when" set large in the left column, a
 * rule with a node per phase, the "what" on the right.
 */
export function Timeline() {
  return (
    <section
      aria-labelledby="timeline-title"
      className="bg-bone-deep py-20 sm:py-28"
    >
      <Container>
        <SectionHead
          entry="06"
          label="How it works"
          id="timeline-title"
          title={
            <>
              From Deposit to Harvest:{' '}
              <span className="em-oil">What Happens and When.</span>
            </>
          }
        />
        <ol className="before:bg-ink/25 relative mt-14 before:absolute before:top-2 before:bottom-2 before:left-[0.4375rem] before:w-px md:before:left-[calc(33%+0.4375rem)]">
          {timeline.phases.map((p) => (
            <li
              key={p.phase}
              data-reveal
              className="relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[33%_1fr] md:gap-0 md:pl-0"
            >
              <span
                aria-hidden="true"
                className="bg-oil ring-bone-deep absolute top-2 left-0 size-[0.9375rem] rounded-full ring-4 md:left-[33%]"
              />
              <div className="md:pr-10 md:text-right">
                <p className="micro text-stone">{p.phase}</p>
                <h3 className="font-display text-title mt-1">{p.when}</h3>
              </div>
              <p className="measure md:pl-10">{p.what}</p>
            </li>
          ))}
        </ol>
        <CtaLink cta={timeline.cta} className="mt-14" />
      </Container>
    </section>
  );
}
