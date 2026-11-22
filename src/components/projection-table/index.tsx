import { cn } from '@/lib/utils';

import type { ProjectionRow } from '@/data/palm-grove';

/**
 * Year 3 to Year 10 harvest income for 1 hectare, exactly as the owner
 * supplied it (strings, never recalculated). Phases are grouped by a tint
 * and a coloured marker; peak years carry the weight. On phones the table
 * scrolls sideways inside its frame rather than squeezing the figures.
 */
export function ProjectionTable({
  rows,
  columns,
  caption,
}: {
  rows: ProjectionRow[];
  columns: Record<'year' | 'phase' | 'revenue' | 'share', string>;
  caption: string;
}) {
  return (
    <div className="-mx-2 overflow-x-auto px-2">
      <table className="w-full min-w-[34rem] text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="micro border-ink text-stone border-b-2">
            <th scope="col" className="py-3 pr-4">
              {columns.year}
            </th>
            <th scope="col" className="py-3 pr-4">
              {columns.phase}
            </th>
            <th scope="col" className="py-3 pr-4 text-right">
              {columns.revenue}
            </th>
            <th scope="col" className="py-3 text-right">
              {columns.share}
            </th>
          </tr>
        </thead>
        <tbody className="tabular">
          {rows.map((r, i) => {
            const peak = r.phase === 'Peak Production';
            const newPhase = i === 0 || rows[i - 1].phase !== r.phase;

            return (
              <tr
                key={r.year}
                className={cn(
                  'border-rule border-b',
                  peak && 'bg-bone-deep',
                  newPhase && i > 0 && 'border-t-ink/40 border-t'
                )}
              >
                <th
                  scope="row"
                  className="font-display text-title py-3.5 pr-4 pl-2 whitespace-nowrap"
                >
                  {r.year}
                </th>
                <td className="text-small py-3.5 pr-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'size-2 rounded-full',
                        peak
                          ? 'bg-ink'
                          : r.phase === 'First Fruiting'
                            ? 'bg-stone'
                            : 'bg-moss'
                      )}
                    />
                    <span className={newPhase ? '' : 'text-stone'}>
                      {r.phase}
                    </span>
                  </span>
                </td>
                <td className="text-stone py-3.5 pr-4 text-right whitespace-nowrap">
                  {r.revenue}
                </td>
                <td
                  className={cn(
                    'py-3.5 pr-2 text-right whitespace-nowrap',
                    peak ? 'font-extrabold' : 'font-bold'
                  )}
                >
                  {r.share}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
