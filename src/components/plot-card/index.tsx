import { CtaLink } from '@/components/cta-link';

import { naira } from '@/lib/utils';

import { type Plot, pricing } from '@/data/palm-grove';

/**
 * One plot, set like a deed extract: the size, the price at slab scale in
 * the logo's gold, then ledger rows. "Reserve This Plot" opens Form 1 with
 * this size pre-selected (brief §6).
 */
export function PlotCard({ plot }: { plot: Plot }) {
  const rows = [
    ['Palm trees on the plot', `${plot.trees} oil palm trees`],
    ['First deposit', naira(plot.deposit)],
    ['Balance', plot.balance],
  ];

  return (
    <article
      aria-labelledby={`plot-${plot.id}`}
      className="border-rule-light rounded-card flex flex-col border p-7 sm:p-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 id={`plot-${plot.id}`} className="font-display text-title">
          {plot.size}
        </h3>
        <p className="micro text-sand">Pre-launch price</p>
      </div>
      <p className="font-display text-figure text-oil tabular mt-6">
        {naira(plot.price)}
      </p>
      <dl className="border-rule-light mt-8 border-t">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="border-rule-light flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b py-4"
          >
            <dt className="text-small text-sand">{k}</dt>
            <dd className="font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="micro text-sand mt-7">Each plot includes</p>
      <ul className="text-small text-sand mt-3 grid gap-2">
        {pricing.includes.map((x) => (
          <li key={x} className="flex gap-3">
            <span aria-hidden="true" className="text-sand">
              ✓
            </span>
            {x}
          </li>
        ))}
      </ul>
      <CtaLink
        cta={{
          label: pricing.ctaLabel,
          action: { kind: 'pricing', interest: plot.interest },
        }}
        className="mt-9 w-full"
      />
    </article>
  );
}
