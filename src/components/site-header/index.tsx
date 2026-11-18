import { CtaLink } from '@/components/cta-link';
import { WhatsAppIcon } from '@/components/icons';
import { Logo } from '@/components/logo';

import { buildWhatsAppLink } from '@/lib/whatsapp';

import { hero } from '@/data/palm-grove';

/**
 * Section 0. No navigation menu (brief §1, §0): the logo, WhatsApp and one
 * CTA. Sticky by CSS alone. The logo is not a link, so nothing leads away.
 */
export function SiteHeader() {
  return (
    <header className="border-rule bg-bone/92 supports-[not(backdrop-filter:blur(1px))]:bg-bone sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-(--header-h) w-full max-w-[88rem] items-center justify-between gap-3 px-(--gutter)">
        <Logo className="h-7 shrink-0 sm:h-9" />
        <div className="flex items-center gap-1.5 sm:gap-3">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-ghost min-h-11 min-w-11 shrink-0 gap-2 px-0 sm:px-4"
          >
            <WhatsAppIcon className="size-5" />
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
          <CtaLink
            cta={hero.primary}
            className="min-h-11 px-3.5 text-[0.78rem] whitespace-nowrap sm:px-6 sm:text-[0.9375rem]"
          />
        </div>
      </div>
    </header>
  );
}
