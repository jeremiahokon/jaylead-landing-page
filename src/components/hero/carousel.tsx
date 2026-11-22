'use client';

import { Children, type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const INTERVAL = 5000;

/**
 * The hero's site photos. Each slide is rendered on the server and passed in
 * as children; this leaf only decides which one shows. Slide 1 (DJI_0945) is
 * the only visible one in the server HTML, so without JavaScript the hero is
 * one complete photo. Autoplay cross-fades every 5 s, pauses while hovered,
 * focused or in a background tab, and never starts under reduced motion.
 */
export function HeroCarousel({
  children,
  labels,
  className,
}: {
  children: ReactNode;
  /** One short name per slide, for the dot buttons. */
  labels: string[];
  className?: string;
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || count < 2) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      if (document.visibilityState === 'visible')
        setIndex((i) => (i + 1) % count);
    }, INTERVAL);

    return () => clearInterval(id);
  }, [paused, count]);

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos from the Palm Grove Estate site"
      className={className}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node | null))
          setPaused(false);
      }}
    >
      <div className="relative">
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i === index ? undefined : true}
            className={cn(
              'transition-opacity duration-1000 ease-(--ease-out-expo)',
              i === 0 ? 'relative' : 'absolute inset-0',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            {slide}
          </div>
        ))}
      </div>

      {count > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <ol className="flex flex-wrap sm:gap-1" aria-label="Choose a photo">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? 'true' : undefined}
                  className="group grid size-5 place-items-center sm:size-6"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'block h-1.5 rounded-full transition-all duration-500',
                      i === index
                        ? 'bg-moss w-5'
                        : 'bg-ink/25 group-hover:bg-ink/50 w-1.5'
                    )}
                  />
                  <span className="sr-only">
                    Photo {i + 1}: {labels[i]}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="ring-rule hover:bg-ink hover:text-bone grid size-10 place-items-center rounded-full ring-1 transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span className="sr-only">Previous photo</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="ring-rule hover:bg-ink hover:text-bone grid size-10 place-items-center rounded-full ring-1 transition-colors"
            >
              <span aria-hidden="true">→</span>
              <span className="sr-only">Next photo</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
