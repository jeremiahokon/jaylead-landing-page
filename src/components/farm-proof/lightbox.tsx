'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Shot = { src: string; alt: string; caption: string };

/**
 * Full-size view for the field log's photos. Every photo tile is a plain
 * link to its image file, so with JavaScript off a tap opens the photo. With
 * JavaScript, one delegated listener catches [data-shot] clicks and opens a
 * native <dialog> instead (Escape closes, focus returns, arrows step).
 */
export function FieldLogLightbox({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [shots, setShots] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;

    if (!el) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;

      const hit = (e.target as Element | null)?.closest?.<HTMLElement>(
        '[data-shot]'
      );

      if (!hit) return;

      e.preventDefault();

      const all = [...el.querySelectorAll<HTMLElement>('[data-shot]')].map(
        (a) => ({
          src: a.getAttribute('href') ?? '',
          alt: a.dataset.alt ?? '',
          caption: a.dataset.caption ?? '',
        })
      );

      trigger.current = hit;
      setShots(all);
      setIndex(all.findIndex((s) => s.src === hit.getAttribute('href')));
    };

    el.addEventListener('click', onClick);

    return () => el.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (index !== null && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [index]);

  const step = (d: number) =>
    setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length));

  const shot = index === null ? null : shots[index];

  return (
    <div ref={root}>
      {children}
      <dialog
        ref={dialog}
        className="reel-dialog m-auto"
        aria-label={shot?.alt ?? 'Photo'}
        onClose={() => {
          setIndex(null);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);

          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        {shot ? (
          <figure className="flex max-h-[100dvh] w-[min(92vw,80rem)] flex-col gap-3 p-2">
            <div className="flex flex-none items-center justify-between gap-4">
              <p className="micro text-sand">
                <span className="tabular">
                  {(index ?? 0) + 1} / {shots.length}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="micro text-bone min-h-11 px-3 underline underline-offset-4"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="micro text-bone min-h-11 px-3 underline underline-offset-4"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  className="micro text-oil min-h-11 px-3 underline underline-offset-4"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="rounded-card media-field relative aspect-video overflow-hidden">
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              </div>
            </div>
            <figcaption className="text-small text-sand flex-none">
              {shot.alt}.{' '}
              <span className="micro text-sand">{shot.caption}</span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </div>
  );
}
