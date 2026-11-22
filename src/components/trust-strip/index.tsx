import { trustBadges } from '@/data/palm-grove';

/** Section 2. Small badges in one slim row, no CTA (brief §2). */
export function TrustStrip() {
  return (
    <section aria-label="Registration and compliance" className="on-ink">
      <ul className="mx-auto flex max-w-[88rem] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-(--gutter) py-4 sm:justify-between">
        {trustBadges.map((b) => (
          <li key={b.label} className="micro text-sand flex items-center gap-2">
            <span
              aria-hidden="true"
              className="bg-sand size-1.5 rounded-full"
            />
            <span>
              {b.label}
              {'detail' in b ? (
                <span className="text-sand"> ({b.detail})</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
