import type { MetadataRoute } from 'next';

import { business, estate } from '@/data/palm-grove';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${estate.name} | ${business.name}`,
    short_name: estate.name,
    start_url: '/',
    display: 'browser',
    background_color: '#f1ecdf',
    theme_color: '#0d3924',
    icons: [
      {
        src: '/brand/jaylead-mark-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/jaylead-mark-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
