import type { ProjectionRow } from '@/data/palm-grove';

/**
 * The 30-year projection (brief §9), per acre and per hectare. The toggle is
 * two radio inputs and CSS :has() (globals.css, .projection), so it needs no
 * JavaScript. Figures are rendered exactly as supplied strings. On small
 * screens the first rows show and the rest sit behind "See all years".
 */
export function ProjectionTable({
  acre,
  hectare,
  visibleRows,
}: {
  acre: ProjectionRow[];
  hectare: ProjectionRow[];
  visibleRows: number;
}) {
  const plots = [
    { id: 'acre', label: 'Per 1 acre', rows: acre },
    { id: 'hectare', label: 'Per 1 hectare', rows: hectare },
  ] as const;

  const table = (rows: ProjectionRow[], caption: string) => (
    <table className="w-full text-left">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="micro border-ink text-stone border-b-2">
          <th scope="col" className="py-3 pr-4">
            Years
          </th>
          <th scope="col" className="py-3 pr-4 text-right">
            Total revenue
          </th>
          <th scope="col" className="py-3 text-right">
            Your 70% share
          </th>
        </tr>
      </thead>
      <tbody className="tabular">
        {rows.map((r) => (
          <tr key={r.years} className="border-rule border-b">
            <th scope="row" className="py-3 pr-4 font-normal">
              {r.years}
            </th>
            <td className="text-stone py-3 pr-4 text-right">
              {r.totalRevenue}
            </td>
            <td className="py-3 text-right font-bold">{r.buyerShare}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="projection">
      <fieldset className="inline-flex rounded-full p-1 shadow-[inset_0_0_0_1.5px_var(--color-rule)]">
        <legend className="sr-only">Show the projection for</legend>
        {plots.map((p, i) => (
          <label
            key={p.id}
            className="text-small cursor-pointer rounded-full px-5 py-2.5 font-bold transition-colors"
          >
            <input
              type="radio"
              name="projection-plot"
              id={`proj-${p.id}`}
              defaultChecked={i === 0}
              className="sr-only"
            />
            {p.label}
          </label>
        ))}
      </fieldset>
      {plots.map((p) => (
        <div key={p.id} data-plot={p.id} className="mt-6">
          {p.rows.length > visibleRows ? (
            <>
              {table(
                p.rows.slice(0, visibleRows),
                `30-year projection, ${p.label.toLowerCase()}`
              )}
              <details className="group">
                <summary className="text-small link-under mt-4 inline-block font-bold group-open:hidden">
                  See all years
                </summary>
                {table(
                  p.rows.slice(visibleRows),
                  `30-year projection continued, ${p.label.toLowerCase()}`
                )}
              </details>
            </>
          ) : (
            table(p.rows, `30-year projection, ${p.label.toLowerCase()}`)
          )}
        </div>
      ))}
    </div>
  );
}
