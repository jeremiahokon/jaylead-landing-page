import type { MetadataRoute } from 'next';

import { absolute } from '@/lib/site';

/** The page plus its legal pages; /thank-you is noindex and left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absolute('/legal/privacy-policy'), priority: 0.2 },
    { url: absolute('/legal/terms'), priority: 0.2 },
  ];
}
