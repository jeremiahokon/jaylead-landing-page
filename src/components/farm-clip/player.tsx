'use client';

import { useEffect, useRef } from 'react';

/**
 * A silent site clip that plays only while it is on screen. The files carry
 * no audio stream at all. Server HTML ships `controls`, so with JavaScript
 * off the clip is still playable by hand; once this runs, controls are
 * removed and the clip plays and pauses itself with the viewport. Under
 * reduced motion it keeps its controls and never starts on its own.
 * Nothing downloads before the clip comes near the viewport.
 */
export function ClipPlayer({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;

    if (!v) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    v.controls = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          v.preload = 'auto';
          void v.play().catch(() => {
            v.controls = true;
          });
        } else v.pause();
      },
      { threshold: [0, 0.5] }
    );

    io.observe(v);

    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="none"
      aria-label={label}
      className={className}
    />
  );
}
