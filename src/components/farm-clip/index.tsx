import { cn } from '@/lib/utils';

import type { FarmClip as FarmClipData } from '@/data/palm-grove';

import { ClipPlayer } from './player';

/**
 * One of the owner's own clips: silent, inline, playing while in view,
 * framed like a photo with the camera file code and date underneath.
 */
export function FarmClip({
  clip,
  frameClassName,
}: {
  clip: FarmClipData;
  frameClassName?: string;
}) {
  return (
    <figure>
      <div
        className={cn(
          'rounded-card media-field relative overflow-hidden',
          frameClassName
        )}
        style={
          frameClassName?.includes('aspect-')
            ? undefined
            : {
                aspectRatio: `${clip.poster.width} / ${clip.poster.height}`,
              }
        }
      >
        <ClipPlayer
          src={clip.src}
          poster={clip.poster.src}
          label={`${clip.poster.alt}. Silent video.`}
          className="absolute inset-0 size-full object-cover"
        />
        <span
          aria-hidden="true"
          className="micro bg-ink/70 text-bone pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-sm"
        >
          <span className="bg-bone size-1.5 animate-pulse rounded-full motion-reduce:animate-none" />
          Video
        </span>
      </div>
      <figcaption className="micro text-stone mt-3">
        {clip.id.toUpperCase().replace('-', '_')} · {clip.date}
      </figcaption>
    </figure>
  );
}
