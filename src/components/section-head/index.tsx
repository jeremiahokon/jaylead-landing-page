import { cn } from '@/lib/utils';

/**
 * Every section is one numbered entry in the register: a micro-caps entry
 * number over a ledger rule, then the brief's headline in slab.
 */
export function SectionHead({
  entry,
  label,
  title,
  lede,
  id,
  className,
}: {
  entry: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
  id: string;
  className?: string;
}) {
  return (
    <header className={cn('max-w-4xl', className)}>
      <p className="micro flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-current/20 pb-3 opacity-80">
        <span className="tabular whitespace-nowrap">Entry {entry}</span>
        <span aria-hidden="true">·</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="font-display text-display mt-6">
        {title}
      </h2>
      {lede ? (
        <p className="text-lede measure mt-5 opacity-85">{lede}</p>
      ) : null}
    </header>
  );
}
