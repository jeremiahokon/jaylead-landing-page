import { Container } from '@/components/container';
import { CtaLink } from '@/components/cta-link';
import { SectionHead } from '@/components/section-head';

import { legal } from '@/data/palm-grove';

/**
 * Section 10, on ink. "Your documents" is one card styled as a deed cover
 * on bone; protections are a numbered list; reporting closes the section.
 */
export function LegalSafety() {
  return (
    <section
      aria-labelledby="legal-title"
      className="on-ink py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          label="Legal documents and safety"
          id="legal-title"
          title={legal.headline}
        />
        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="bg-bone text-ink rounded-card self-start p-7 sm:p-10">
            <p className="micro text-stone">Your documents, for each plot</p>
            <ul className="mt-6">
              {legal.documents.map((d, i) => (
                <li
                  key={d}
                  className="border-rule flex items-baseline gap-4 border-b py-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="num-badge shrink-0 self-center"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-title">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="micro text-sand">How we protect the estate</h3>
            <dl className="mt-4">
              {legal.protections.map((p) => (
                <div
                  key={p.title}
                  className="border-rule-light grid gap-1 border-b py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="text-bone font-bold">{p.title}</dt>
                  <dd className="text-sand">{p.line}</dd>
                </div>
              ))}
            </dl>
            <h3 className="micro text-sand mt-10">Reporting and insurance</h3>
            <p className="text-lede mt-3">{legal.reporting}</p>
            <CtaLink cta={legal.cta} className="mt-9" />
          </div>
        </div>
      </Container>
    </section>
  );
}
