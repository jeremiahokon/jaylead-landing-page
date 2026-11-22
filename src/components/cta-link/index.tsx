import { WhatsAppIcon } from '@/components/icons';

import { cn } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';

import type { Cta } from '@/data/palm-grove';

/**
 * Every CTA on the page. A plain anchor, so it works with JavaScript off:
 * form CTAs jump to the inline form in Section 13 (#apply). With JavaScript,
 * the lead-dialog island intercepts [data-lead] clicks and opens the modal
 * with the interest pre-selected (brief §2). Section CTAs ("Get Pricing &
 * Plot Details") only scroll to the pre-launch prices; the form opens from
 * the plot cards there.
 */
export function CtaLink({
  cta,
  variant = 'solid',
  className,
  message,
}: {
  cta: Cta;
  variant?: 'solid' | 'ghost';
  className?: string;
  /** WhatsApp only: overrides the default prefilled message. */
  message?: string;
}) {
  const cls = cn('pill', variant === 'ghost' && 'pill-ghost', className);
  const { action, label } = cta;

  if (action.kind === 'whatsapp')
    return (
      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        <WhatsAppIcon className="size-5" />
        {label}
        <span className="sr-only"> (opens WhatsApp)</span>
      </a>
    );

  if (action.kind === 'section')
    return (
      <a href={`#${action.target}`} className={cls}>
        {label}
      </a>
    );

  return (
    <a
      href="#apply"
      data-lead={action.kind}
      data-interest={action.kind === 'pricing' ? action.interest : undefined}
      className={cls}
    >
      {label}
    </a>
  );
}
