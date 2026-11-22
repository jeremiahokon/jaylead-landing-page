import Image from 'next/image';

import { PlayMark } from '@/components/play-mark';

import type { Reel } from '@/data/palm-grove';

import { ReelPlayer } from './player';

/**
 * An Instagram reel as a poster card (the main site's video-card format):
 * poster, play mark, title and "Instagram · duration". The face renders on
 * the server and is passed into the ReelPlayer island as children.
 */
export function ReelCard({ reel, sizes }: { reel: Reel; sizes: string }) {
  const permalink = `https://www.instagram.com/reel/${reel.shortcode}/`;

  return (
    <figure>
      <ReelPlayer
        label={reel.title}
        permalink={permalink}
        embedUrl={`${permalink}embed/`}
        className="group rounded-card media-field relative block aspect-[4/5] overflow-hidden"
      >
        <Image
          src={reel.poster.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-(--ease-out-expo) group-hover:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="from-ink/85 via-ink/15 to-ink/20 absolute inset-0 bg-gradient-to-t"
        />
        <PlayMark />
        <span className="text-bone absolute inset-x-0 bottom-0 p-5">
          <span className="font-display text-title block">{reel.title}</span>
          <span className="micro text-sand mt-2 block">
            Instagram · <span className="tabular">{reel.duration}</span>
          </span>
        </span>
      </ReelPlayer>
      <figcaption className="micro text-stone mt-3">
        {reel.poster.alt}. {reel.date}
      </figcaption>
    </figure>
  );
}
