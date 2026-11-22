import Image from 'next/image';

import { CtaLink } from '@/components/cta-link';

import { estate, hero } from '@/data/palm-grove';

import { HeroCarousel } from './carousel';

/**
 * Section 1, set like a property listing: the site itself fills a frame 90%
 * of the viewport wide, and the offer is written over it. The photos
 * cross-fade under story-style progress bars (DJI_0945 first, and the only
 * one in the server HTML, so without JavaScript the hero is one complete
 * photo). One primary action to the prices, one to the brochure video.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="pt-3 pb-8 sm:pt-5 sm:pb-12"
    >
      <HeroCarousel
        labels={hero.photos.map((p) => p.alt.split(',')[0])}
        slides={hero.photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="90vw"
            preload={i === 0}
            className="object-cover"
          />
        ))}
      >
        <p
          className="micro fade-up text-sand"
          style={{ '--d': '0ms' } as React.CSSProperties}
        >
          {estate.name} · {estate.location}
        </p>
        <h1 id="hero-title" className="font-display text-mast mt-5">
          {hero.headline.map((line, i) => (
            <span key={line} className="rise mask-line block">
              <span
                className={i === 1 ? 'text-oil block' : 'block'}
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
          <p className="text-lede lg:text-body text-bone/90 mt-6 max-w-[46ch] lg:mt-5">
            {hero.subheadline}
          </p>
          <p className="text-small bg-ink/55 ring-bone/25 rounded-card mt-6 inline-flex px-4 py-2 font-bold ring-1 sm:rounded-full">
            {hero.priceHook}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink cta={hero.primary} />
            <a href="#brochure-video" className="pill pill-ghost">
              {hero.secondaryLabel}
            </a>
          </div>
        </div>
      </HeroCarousel>
    </section>
  );
}
