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
  className,
  frameClassName,
  preload,
  captionTone = 'stone',
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  frameClassName?: string;
  preload?: boolean;
  captionTone?: 'stone' | 'mist';
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          'rounded-card relative overflow-hidden bg-[radial-gradient(120%_90%_at_30%_20%,#1f5a3d,#0d3924)]',
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
        <figcaption
          className={cn(
            'micro mt-3',
            captionTone === 'mist' ? 'text-mist' : 'text-stone'
          )}
        >
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
