import { pageGraph } from '@/lib/jsonld';

/** Escapes "<" so no string in the data can close the script tag. */
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pageGraph()).replaceAll('<', String.raw`<`),
      }}
    />
  );
}
