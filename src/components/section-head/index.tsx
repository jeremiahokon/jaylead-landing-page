import { cn } from '@/lib/utils';

import type { Headline } from '@/data/palm-grove';

/**
 * Every section opens on its own name: a micro-caps label over a rule, then
 * the headline in the display face. A two-part headline sets its second
 * part in the accent.
 */
export function SectionHead({
  label,
  title,
  lede,
  id,
  className,
}: {
  label: string;
  title: string | Headline;
  lede?: string;
  id: string;
  className?: string;
}) {
  return (
    <header className={cn('max-w-4xl', className)}>
      <p className="micro border-b border-current/20 pb-3 opacity-80">
        {label}
      </p>
      <h2 id={id} className="font-display text-display mt-6">
        {typeof title === 'string' ? title : <Emphasis headline={title} />}
      </h2>
      {lede ? (
        <p className="text-lede measure mt-6 opacity-85 sm:mt-8">{lede}</p>
      ) : null}
    </header>
  );
}

/** "Plain lead-in <accent>emphasis</accent>", for any heading level. */
export function Emphasis({
  headline: [plain, emphasis],
  className,
}: {
  headline: Headline;
  className?: string;
}) {
  return (
    <>
      {plain} <span className={cn('em-oil', className)}>{emphasis}</span>
    </>
  );
}
