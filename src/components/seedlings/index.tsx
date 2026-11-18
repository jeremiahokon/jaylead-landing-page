import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { Photo } from '@/components/photo';
import { ReelCard } from '@/components/reel-card';
import { SectionHead } from '@/components/section-head';

import { seedlings } from '@/data/palm-grove';

/**
 * Section 5. Copy left, a native scroll-snap rail of real photos right (no
 * carousel script) mixing Instagram reels (tap to play in a pop-up) and
 * photos, in the order the data file lists them.
 */
const sizes = '(min-width: 1024px) 26vw, (min-width: 640px) 46vw, 78vw';

export function Seedlings() {
  return (
    <section
      aria-labelledby="seedlings-title"
      className="bg-bone-deep py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div>
          <SectionHead
            entry="03"
            label="Our seedlings"
            id="seedlings-title"
            title={
              <>
                Healthy Seedlings.{' '}
                <span className="em-oil">A Strong Start.</span>
              </>
            }
          />
          <p className="text-lede measure mt-6">{seedlings.copy}</p>
          <CtaLink cta={seedlings.cta} className="mt-9" />
        </div>
        <ul
          aria-label="Videos and photos from the farm"
          className="rail -mx-(--gutter) flex gap-4 overflow-x-auto px-(--gutter) pb-4 lg:mx-0 lg:px-0"
        >
          {seedlings.media.map((m) => (
            <li
              key={m.kind === 'reel' ? m.shortcode : m.photo.src}
              className="w-[78%] shrink-0 sm:w-[46%]"
            >
              {m.kind === 'reel' ? (
                <ReelCard reel={m} sizes={sizes} />
              ) : (
                <Photo
                  photo={m.photo}
                  sizes={sizes}
                  frameClassName="aspect-[4/5]"
                />
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
