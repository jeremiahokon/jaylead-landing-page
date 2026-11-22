import { Logo } from '@/components/logo';

import { buildYear } from '@/lib/build-year';
import { mainSiteUrl } from '@/lib/site';

import { business, footer } from '@/data/palm-grove';

/** Section 14. Minimal and compliant (brief §14). */
export async function SiteFooter() {
  const year = await buildYear();

  return (
    <footer className="bg-ink-deep text-sand">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-(--gutter) py-14 md:grid-cols-[1fr_1.4fr]">
        <div>
          <Logo tone="light" />
          <p className="font-display text-title text-bone mt-5">
            {business.tagline}
          </p>
        </div>
        <div className="text-small grid gap-5 sm:grid-cols-2">
          <address className="not-italic">
            <span className="micro text-sand block">Office</span>
            <span className="mt-2 block">{business.address.full}</span>
          </address>
          <div>
            <span className="micro text-sand block">Contact</span>
            <ul className="mt-2 grid gap-1">
              <li>
                Phone / WhatsApp:{' '}
                <a href={`tel:${business.phoneE164}`} className="link-under">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="link-under break-all"
                >
                  {business.email}
                </a>
              </li>
              <li>
                <a href={mainSiteUrl} className="link-under">
                  {business.website}
                </a>
              </li>
            </ul>
          </div>
          <p className="sm:col-span-2">
            {business.socialHandle} on{' '}
            {business.socials.map((s, i) => (
              <span key={s.label}>
                {i > 0
                  ? i === business.socials.length - 1
                    ? ' and '
                    : ', '
                  : null}
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-under"
                  >
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="border-rule-light border-t">
        <div className="text-small text-sand mx-auto grid max-w-[88rem] gap-4 px-(--gutter) py-8 md:grid-cols-[1.4fr_1fr]">
          <p>{footer.disclaimer}</p>
          <div className="md:text-right">
            <p>
              © {year} {business.legalName}. RC {business.rcNumber}. All Rights
              Reserved.
            </p>
            <p className="mt-2 flex gap-4 md:justify-end">
              {footer.links.map((l) => (
                <a key={l.path} href={l.path} className="link-under">
                  {l.label}
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
