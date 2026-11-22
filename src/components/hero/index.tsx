import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { Photo } from '@/components/photo';

import { estate, hero } from '@/data/palm-grove';

import { HeroCarousel } from './carousel';

/**
 * Section 1. One promise at size, one proof (the site itself, as a carousel
 * of the owner's photos, DJI_0945 first), one primary action that goes to
 * the pre-launch prices. The secondary button is a plain anchor to the
 * brochure video (brief §1).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid items-center gap-10 pt-10 pb-14 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-20 lg:pb-20">
        <div>
          <p
            className="micro fade-up text-stone"
            style={{ '--d': '0ms' } as React.CSSProperties}
          >
            {estate.name} · {estate.location}
          </p>
          <h1 id="hero-title" className="font-display text-hero mt-5">
            {hero.headline.map((line, i) => (
              <span key={line} className="rise mask-line block">
                <span
                  className={i === 1 ? 'em-oil block' : 'block'}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div
            className="fade-up"
            style={{ '--d': '420ms' } as React.CSSProperties}
          >
            <p className="text-lede measure mt-7">{hero.subheadline}</p>
            <p className="text-small border-oil mt-5 inline-flex flex-wrap items-baseline gap-x-2 border-l-2 pl-3 font-bold">
              {hero.priceHook}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink cta={hero.primary} />
              <a href="#brochure-video" className="pill pill-ghost">
                {hero.secondaryLabel}
              </a>
            </div>
          </div>
        </div>
        <HeroCarousel
          className="fade-up"
          labels={hero.photos.map((p) => p.alt.split(',')[0])}
        >
          {hero.photos.map((photo, i) => (
            <Photo
              key={photo.src}
              photo={photo}
              sizes="(min-width: 1024px) 45vw, 100vw"
              frameClassName="aspect-[4/3]"
              preload={i === 0}
            />
          ))}
        </HeroCarousel>
      </Container>
    </section>
  );
}
