import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { Photo } from '@/components/photo';
import { SectionHead } from '@/components/section-head';

import { proof } from '@/data/palm-grove';

/**
 * Section 11. Real photos and the Managing Director's own words. The
 * testimonial block renders only when real testimonials exist (brief §11).
 */
export function FarmProof() {
  const [wide, tall] = proof.photos;

  return (
    <section aria-labelledby="proof-title" className="py-20 sm:py-28">
      <Container>
        <SectionHead
          entry="09"
          label="Proof from the farm"
          id="proof-title"
          title={
            <>
              See the Work <span className="em-oil">on the Ground.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <Photo
            photo={wide}
            sizes="(min-width: 768px) 60vw, 100vw"
            frameClassName="aspect-[16/10]"
          />
          <Photo
            photo={tall}
            sizes="(min-width: 768px) 36vw, 100vw"
            frameClassName="aspect-[16/10] md:aspect-auto md:h-[calc(100%-2rem)]"
          />
        </div>

        <figure className="border-rule mt-16 grid items-center gap-8 border-t pt-12 sm:grid-cols-[12rem_1fr] sm:gap-12">
          <Photo
            photo={proof.founder.photo}
            sizes="192px"
            frameClassName="aspect-square max-w-48"
          />
          <div>
            <blockquote className="font-display text-display">
              <p>
                <span aria-hidden="true" className="text-oil">
                  “
                </span>
                {proof.founder.quote}
                <span aria-hidden="true" className="text-oil">
                  ”
                </span>
              </p>
            </blockquote>
            <figcaption className="mt-5">
              <span className="font-bold">{proof.founder.name}</span>
              <span className="text-stone">, {proof.founder.role}</span>
            </figcaption>
          </div>
        </figure>

        {proof.testimonials.length > 0 ? (
          <ul className="mt-16 grid gap-6 md:grid-cols-2">
            {proof.testimonials.map((t) => (
              <li key={t.name} className="bg-bone-deep rounded-card p-7">
                <blockquote className="text-lede">“{t.quote}”</blockquote>
                <p className="micro text-stone mt-4">
                  {t.name}, {t.place}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <CtaLink cta={proof.cta} className="mt-14" />
      </Container>
    </section>
  );
}
