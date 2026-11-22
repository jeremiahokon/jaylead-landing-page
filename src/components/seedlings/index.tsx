import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { ReelCard } from '@/components/reel-card';
import { SectionHead } from '@/components/section-head';

import { seedlings } from '@/data/palm-grove';

/**
 * Section 5. Copy left, a native scroll-snap rail right (no carousel
 * script) of Jaylead's Instagram reels, each played in a pop-up on tap.
 */
export function Seedlings() {
  return (
    <section
      aria-labelledby="seedlings-title"
      className="bg-bone-deep py-24 sm:py-32 lg:py-40"
    >
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div>
          <SectionHead
            label="Our seedlings"
            id="seedlings-title"
            title={seedlings.headline}
          />
          <p className="text-lede measure mt-6">{seedlings.copy}</p>
          <CtaLink cta={seedlings.cta} className="mt-10 sm:mt-12" />
        </div>
        <ul
          aria-label="Seedling videos from the farm"
          className="rail -mx-(--gutter) flex gap-4 overflow-x-auto px-(--gutter) pb-4 lg:mx-0 lg:px-0"
        >
          {seedlings.media.map((reel) => (
            <li key={reel.shortcode} className="w-[78%] shrink-0 sm:w-[46%]">
              <ReelCard
                reel={reel}
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 46vw, 78vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
