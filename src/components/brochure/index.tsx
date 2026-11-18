import { BrochureVideo } from '@/components/brochure-video';
import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { SectionHead } from '@/components/section-head';

import { brochure } from '@/data/palm-grove';

/**
 * Section 7. The video (lazy, captions on) with the gated brochure download
 * beside it. "Download the Brochure (PDF)" opens Form 2; the end-of-video
 * overlay opens Form 1 (brief §7).
 */
export function Brochure() {
  return (
    <section aria-labelledby="brochure-title" className="py-20 sm:py-28">
      <Container>
        <SectionHead
          entry="05"
          label="Brochure"
          id="brochure-title"
          title={brochure.headline}
          lede={brochure.copy}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-14">
          <figure id="brochure-video">
            <BrochureVideo
              youTubeId={brochure.youTubeId}
              fallback={brochure.fallbackVideo}
              title={brochure.headline}
            >
              <p className="font-display text-title">Seen enough?</p>
              <CtaLink cta={brochure.endOverlay} />
            </BrochureVideo>
            {brochure.youTubeId ? null : (
              <figcaption className="micro text-stone mt-3">
                {brochure.fallbackVideo.caption}
              </figcaption>
            )}
          </figure>
          <div className="bg-bone-deep rounded-card p-7 sm:p-9">
            <p className="micro text-stone">Inside the brochure</p>
            <ul className="mt-5 grid gap-4">
              {brochure.bullets.map((b, i) => (
                <li
                  key={b}
                  className="border-rule grid grid-cols-[2rem_1fr] items-baseline border-b pb-4"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-oil tabular"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-bold">{b}</span>
                </li>
              ))}
            </ul>
            <CtaLink cta={brochure.cta} className="mt-8 w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
