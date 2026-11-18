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
    <section aria-labelledby="legal-title" className="on-ink py-20 sm:py-28">
      <Container>
        <SectionHead
          entry="08"
          label="Legal documents and safety"
          id="legal-title"
          title={
            <>
              Documented. Insured.{' '}
              <span className="em-oil">Open to Audit.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="grain bg-bone text-ink rounded-card p-7 sm:p-10">
            <p className="micro text-stone">Your documents, for each plot</p>
            <ul className="mt-6">
              {legal.documents.map((d, i) => (
                <li
                  key={d}
                  className="border-rule flex items-baseline gap-4 border-b py-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-oil tabular"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-title">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="micro text-mist">How we protect the estate</h3>
            <dl className="mt-4">
              {legal.protections.map((p) => (
                <div
                  key={p.title}
                  className="border-rule-light grid gap-1 border-b py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="text-sun font-bold">{p.title}</dt>
                  <dd className="text-sand">{p.line}</dd>
                </div>
              ))}
            </dl>
            <h3 className="micro text-mist mt-10">Reporting and insurance</h3>
            <p className="text-lede mt-3">{legal.reporting}</p>
            <CtaLink cta={legal.cta} className="mt-9" />
          </div>
        </div>
      </Container>
    </section>
  );
}
