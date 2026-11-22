'use client';

import { useEffect, useRef, useState } from 'react';

import { PlayMark } from '@/components/play-mark';

/**
 * Section 7's player (brief §7). Two modes, decided by the data file:
 *
 * - YouTube ID set: a click-to-load facade (nothing from YouTube loads until
 *   the visitor taps, brief §5 "lazy-load the video"), captions forced on
 *   for muted viewing, and the player's postMessage stream watched for
 *   "ended".
 * - No ID yet: the main site's own 14-second aerial, preload="none".
 *
 * Either way, when the video ends the overlay (server-rendered children: the
 * "Get Pricing & Plot Details" CTA) appears over the frame.
 */
export function BrochureVideo({
  youTubeId,
  fallback,
  title,
  children,
}: {
  youTubeId: string | null;
  fallback: { src: string; poster: string };
  title: string;
  children: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!youTubeId || !playing) return;

    const onMessage = (e: MessageEvent) => {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return;

      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

        const state =
          data?.event === 'onStateChange'
            ? data.info
            : data?.event === 'infoDelivery'
              ? data.info?.playerState
              : undefined;

        if (state === 0) setEnded(true);
      } catch {
        // Not a player message.
      }
    };

    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [youTubeId, playing]);

  const replay = () => {
    setEnded(false);

    if (video.current) {
      video.current.currentTime = 0;
      void video.current.play();
    } else {
      setPlaying(false);
    }
  };

  return (
    <div className="rounded-card media-field relative aspect-video overflow-hidden">
      {youTubeId ? (
        playing ? (
          <iframe
            ref={frame}
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&cc_load_policy=1&rel=0&playsinline=1&enablejsapi=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() =>
              frame.current?.contentWindow?.postMessage(
                JSON.stringify({ event: 'listening', id: 1 }),
                '*'
              )
            }
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <PlayMark />
            <span className="sr-only">Play: {title}</span>
          </button>
        )
      ) : (
        <video
          ref={video}
          src={fallback.src}
          poster={fallback.poster}
          preload="none"
          controls
          muted
          playsInline
          onPlay={() => setEnded(false)}
          onEnded={() => setEnded(true)}
          className="absolute inset-0 size-full object-cover"
          aria-label={title}
        />
      )}

      {ended ? (
        <div className="on-ink bg-ink/85 absolute inset-0 grid place-items-center p-6 text-center">
          <div className="grid justify-items-center gap-4">
            {children}
            <button
              type="button"
              onClick={replay}
              className="text-small link-under text-sand"
            >
              Watch again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
