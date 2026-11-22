import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { Photo as PhotoData } from '@/data/palm-grove';

/**
 * An image over a treated green field, so the slot is never an empty grey
 * box before the image decodes. Caption sits under the frame in micro caps.
 */
export function Photo({
  photo,
  sizes,
  frameClassName,
  preload,
}: {
  photo: PhotoData;
  sizes: string;
  frameClassName?: string;
  preload?: boolean;
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
            : { aspectRatio: `${photo.width} / ${photo.height}` }
        }
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      </div>
      {photo.caption ? (
        <figcaption className="micro text-stone mt-3">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
