import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { SectionHead } from '@/components/section-head';

import { ownership } from '@/data/palm-grove';

/**
 * Section 4. The brief's "icon + one line" cards become numbered register
 * lines: the main site's owner ruled out decorative icon sets, and a title
 * register numbers its entries.
 */
export function WhatYouOwn() {
  return (
    <section aria-labelledby="own-title" className="py-20 sm:py-28">
      <Container>
        <SectionHead
          entry="02"
          label="What you own"
          id="own-title"
          title={
            <>
              This Is Not Just an Investment.{' '}
              <span className="em-oil">It Is Land You Own.</span>
            </>
          }
        />
        <ol className="border-rule mt-14 grid border-t sm:grid-cols-2">
          {ownership.items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              className="border-rule grid grid-cols-[3.5rem_1fr] gap-x-4 border-b py-8 sm:odd:pr-10 sm:even:border-l sm:even:pl-10"
            >
              <span
                className="font-display text-title text-oil tabular"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-title">{item.title}</h3>
                <p className="text-stone mt-2">{item.line}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="on-ink rounded-card mt-10 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
          <p className="font-display text-title max-w-2xl">{ownership.strip}</p>
          <CtaLink cta={ownership.cta} className="shrink-0" />
        </div>
      </Container>
    </section>
  );
}
