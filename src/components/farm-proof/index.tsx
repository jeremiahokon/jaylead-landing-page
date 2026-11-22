import Image from 'next/image';

import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { FarmClip } from '@/components/farm-clip';
import { PlayMark } from '@/components/play-mark';
import { ReelPlayer } from '@/components/reel-card/player';
import { SectionHead } from '@/components/section-head';

import { cn } from '@/lib/utils';

import { type FieldLogItem, proof } from '@/data/palm-grove';

import { FieldLogLightbox } from './lightbox';

/*
 * Tile shapes, cycled through the log. Mixed on purpose: in CSS columns the
 * different heights stagger into a masonry, so no two columns line up.
 */
const shapes = [
  'aspect-[4/5]',
  'aspect-[3/2]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-[3/2]',
];

/* Three scroll speeds, so neighbouring tiles drift apart as you scroll. */
const drift = ['drift-1', 'drift-2', 'drift-3'];

function Tile({ item, i }: { item: FieldLogItem; i: number }) {
  const shape = shapes[i % shapes.length];
  const cls = cn('mb-4 break-inside-avoid sm:mb-5', drift[i % 3]);

  if (item.kind === 'clip')
    return (
      <li className={cls}>
        <FarmClip clip={item} frameClassName={shape} />
      </li>
    );

  const { photo } = item;

  return (
    <li className={cls}>
      <figure>
        <a
          href={photo.src}
          data-shot
          data-alt={photo.alt}
          data-caption={photo.caption}
          className={cn(
            'group rounded-card media-field relative block overflow-hidden',
            shape
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-(--ease-out-expo) group-hover:scale-[1.04]"
          />
          <span className="sr-only"> (open larger)</span>
        </a>
        <figcaption className="micro text-stone mt-3">
          {photo.caption}
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * Section 11, a field log from the site. The owner's photos and silent clips
 * mixed in one masonry, captioned the way a camera roll is (file code and
 * date), drifting at three speeds on scroll (CSS only, transform only,
 * static where unsupported or reduced). Photos open full size; clips play
 * while in view. Then the founder in his own words: the quote opens his
 * story reel, and his own Instagram sits beside his name.
 */
export function FarmProof() {
  const { headline, fieldLog, founder, cta } = proof;
  const clipCount = fieldLog.filter((m) => m.kind === 'clip').length;
  const permalink = `https://www.instagram.com/reel/${founder.story.shortcode}/`;

  return (
    <section
      aria-labelledby="proof-title"
      className="overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          label="Proof from the farm"
          id="proof-title"
          title={headline}
        />
        <p className="micro text-stone mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="bg-moss size-2 rounded-full" aria-hidden="true" />
          <span>Field log</span>
          <span aria-hidden="true">·</span>
          <span className="tabular">
            {fieldLog.length - clipCount} photos, {clipCount} videos
          </span>
          <span aria-hidden="true">·</span>
          <span>Palm Grove Estate, Osun State</span>
        </p>

        <FieldLogLightbox>
          <ul
            aria-label="Photos and videos from the Palm Grove Estate site"
            className="mt-12 columns-2 gap-4 sm:mt-16 sm:gap-6 lg:columns-3"
          >
            {fieldLog.map((item, i) => (
              <Tile
                key={item.kind === 'clip' ? item.id : item.photo.src}
                item={item}
                i={i}
              />
            ))}
          </ul>
        </FieldLogLightbox>

        <figure className="border-rule mt-24 border-t pt-16 sm:mt-32 sm:pt-20">
          <ReelPlayer
            label={founder.story.title}
            permalink={permalink}
            embedUrl={`${permalink}embed/`}
            className="group grid items-center gap-8 sm:grid-cols-[14rem_1fr] sm:gap-12"
          >
            <span className="rounded-card media-field relative block aspect-square max-w-56 overflow-hidden">
              <Image
                src={founder.story.poster.src}
                alt=""
                fill
                sizes="224px"
                className="object-cover transition-transform duration-[1200ms] ease-(--ease-out-expo) group-hover:scale-[1.05]"
              />
              <PlayMark />
            </span>
            <span className="block">
              <blockquote className="font-display text-display">
                <p>
                  <span aria-hidden="true">“</span>
                  {founder.quote}
                  <span aria-hidden="true">”</span>
                </p>
              </blockquote>
              <span className="micro bg-oil text-ink mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
                Watch his story ·{' '}
                <span className="tabular">{founder.story.duration}</span>
              </span>
            </span>
          </ReelPlayer>
          <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:pl-[17rem]">
            <span className="font-bold">{founder.name}</span>
            <span className="text-stone">{founder.role}</span>
            <span aria-hidden="true" className="text-stone">
              ·
            </span>
            <a
              href={founder.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-under text-moss font-bold"
            >
              {founder.instagram.handle} on Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </figcaption>
        </figure>

        <CtaLink cta={cta} className="mt-16 sm:mt-20" />
      </Container>
    </section>
  );
}
