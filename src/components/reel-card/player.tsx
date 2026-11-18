'use client';

import { type ReactNode, useRef, useState } from 'react';

/**
 * Tap-to-load facade, ported from the main site's video-card player. The card
 * is a real link to the Instagram post, so it works with JavaScript off.
 * With JavaScript a tap opens a pop-up and only then mounts Instagram's
 * embed; closing unmounts it. No request or cookie reaches Instagram before
 * the tap. If the frame hasn't loaded in 8 s, a fallback link shows.
 */
export function ReelPlayer({
  label,
  permalink,
  embedUrl,
  children,
  className,
}: {
  label: string;
  permalink: string;
  embedUrl: string;
  /** The card face, rendered on the server. */
  children: ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [open, setOpen] = useState(false);
  const [slow, setSlow] = useState(false);

  const close = () => dialog.current?.close();

  return (
    <>
      <a
        ref={trigger}
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Play video: ${label} (loads from Instagram)`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          setSlow(false);
          setOpen(true);
          dialog.current?.showModal();
          timer.current = setTimeout(() => setSlow(true), 8000);
        }}
      >
        {children}
      </a>
      <dialog
        ref={dialog}
        className="reel-dialog m-auto"
        aria-label={label}
        onClose={() => {
          clearTimeout(timer.current);
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex flex-col items-end gap-3 p-2">
          <button
            type="button"
            onClick={close}
            className="micro text-bone min-h-11 px-2 underline underline-offset-4"
          >
            Close
          </button>
          <div className="reel-frame bg-bone rounded-card relative overflow-hidden">
            {open ? (
              <iframe
                src={embedUrl}
                title={`Instagram video: ${label}`}
                className="absolute inset-0 size-full border-0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                onLoad={(e) => {
                  clearTimeout(timer.current);
                  setSlow(false);
                  e.currentTarget.focus();
                }}
              />
            ) : null}
            {slow ? (
              <p className="bg-bone/95 text-ink text-small absolute inset-x-0 bottom-0 p-4">
                Couldn’t load the video.{' '}
                <a
                  href={permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-under"
                >
                  Watch it on Instagram
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
