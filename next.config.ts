import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,

  experimental: {
    // Ad traffic is almost all first visits on budget Android: inline the
    // stylesheet rather than spend a render-blocking round trip on it.
    inlineCss: true,
  },

  images: {
    // WebP only: the sources are WebP already, and AVIF encoding is slow
    // enough to stall first requests (it hung the dev server).
    formats: ['image/webp'],
    // The largest source photo is 1440px wide (most are 1276px), so the
    // default 1920/2048/3840 rungs could never return anything bigger.
    deviceSizes: [640, 750, 828, 1080, 1280],
    imageSizes: [96, 160, 256, 384],
    qualities: [75],
    minimumCacheTTL: 31_536_000, // static assets; the name changes when they do
  },
};

export default nextConfig;
