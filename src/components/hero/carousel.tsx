'use client';

import { type ReactNode, useEffect, useState } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@/lib/utils';

const DELAY = 6000;

/**
 * The hero frame: Embla (the engine behind shadcn's carousel) cross-fading
 * the site photos behind server-rendered copy (children). One progress bar
 * per photo; the active one fills over the autoplay delay. Hover pauses
 * (and restarts the bar with the timer); reduced motion stops autoplay.
 * Without JavaScript the first photo shows on its own.
 */
export function HeroCarousel({
  slides,
  labels,
  children,
}: {
  slides: ReactNode[];
  /** One short name per photo, for the controls. */
  labels: string[];
  children: ReactNode;
}) {
  const [ref, api] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Fade(),
    Autoplay({
      delay: DELAY,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const pad = (n: number) => String(n).padStart(2, '0');

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setIndex(api.selectedScrollSnap());

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      api.plugins().autoplay?.stop();

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos from the Palm Grove Estate site"
      data-paused={paused || undefined}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="hero-frame on-photo rounded-card bg-ink relative isolate mx-auto w-[90vw] overflow-hidden lg:grid lg:min-h-[min(calc(100svh-var(--header-h)-2.5rem),58rem)]"
    >
      {/* Phones: the photo on top, copy below. Desktop: the photo fills the frame. */}
      <div className="media-field relative h-[46svh] min-h-72 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <div ref={ref} className="absolute inset-0 overflow-hidden">
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                aria-hidden={i === index ? undefined : true}
                className="relative h-full min-w-0 flex-[0_0_100%]"
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="from-ink/85 absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t to-transparent"
        />
        <div
          aria-hidden="true"
          className="from-ink/95 via-ink/65 absolute inset-0 hidden bg-linear-to-r to-transparent lg:block"
        />

        <div className="text-bone absolute inset-x-0 bottom-0 grid gap-2 px-4 pb-4 sm:px-8 sm:pb-6 lg:px-14 lg:pb-12">
          <ol className="flex gap-1.5" aria-label="Choose a photo">
            {slides.map((_, i) => (
              <li key={i} className="flex-1">
                <button
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-current={i === index ? 'true' : undefined}
                  className="block w-full py-2"
                >
                  <span className="bg-bone/30 block h-[3px] overflow-hidden rounded-full">
                    <span
                      key={i === index ? `on-${index}-${paused}` : i}
                      className={cn(
                        'bg-oil block h-full origin-left',
                        i === index ? 'hero-bar' : 'scale-x-0'
                      )}
                    />
                  </span>
                  <span className="sr-only">
                    Photo {i + 1}: {labels[i]}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex items-center justify-between gap-4">
            <p className="micro text-sand min-w-0 truncate" aria-live="polite">
              <span className="tabular text-bone">
                {pad(index + 1)} / {pad(count)}
              </span>
              <span className="hidden sm:inline"> · {labels[index]}</span>
            </p>
            <div className="flex shrink-0 gap-2">
              {[
                {
                  glyph: '←',
                  name: 'Previous photo',
                  go: () => api?.scrollPrev(),
                },
                { glyph: '→', name: 'Next photo', go: () => api?.scrollNext() },
              ].map((b) => (
                <button
                  key={b.name}
                  type="button"
                  onClick={b.go}
                  className="ring-bone/40 bg-ink/40 hover:bg-bone hover:text-ink grid size-11 place-items-center rounded-full ring-1 transition-colors"
                >
                  <span aria-hidden="true">{b.glyph}</span>
                  <span className="sr-only">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-bone relative max-w-4xl px-6 pt-8 pb-9 sm:p-10 lg:self-end lg:px-14 lg:pt-14 lg:pb-44">
        {children}
      </div>
    </div>
  );
}
