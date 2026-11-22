/**
 * The play button on video posters: a brand-orange disc with a deep-green
 * triangle and a soft ring, so it reads on any photo. Ink on orange is
 * 5.7:1. Decorative: the surrounding link carries the name.
 */
export function PlayMark() {
  return (
    <span
      aria-hidden="true"
      className="bg-oil ring-bone/40 absolute top-1/2 left-1/2 grid size-18 -translate-1/2 place-items-center rounded-full shadow-[0_10px_40px_-6px_rgb(3_55_38/0.7)] ring-8 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-110"
    >
      <span className="border-l-ink ml-1.5 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent" />
    </span>
  );
}
