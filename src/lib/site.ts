/**
 * The one canonical origin, shared by metadata, JSON-LD, the sitemap, robots
 * and llms.txt so none of them can name a different host. The owner chose a
 * subdomain of the live main site (18 Nov 2026). Set NEXT_PUBLIC_SITE_URL in
 * the host dashboard to override; preview deploys never become canonical.
 */
const CANONICAL = 'https://palmgrove.jayleadagro.com';

/** Tolerates unset, empty, or protocol-less values from a host dashboard. */
function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();

  if (!value) return CANONICAL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  return URL.canParse(withProtocol) ? new URL(withProtocol).origin : CANONICAL;
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Absolute URL for a site path. */
export const absolute = (path = '/') =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

/** Bare host for legal copy ("palmgrove.jayleadagro.com"). */
export const siteHost = new URL(siteUrl).host;

/** The main website (risk disclosure, brand). */
export const mainSiteUrl = 'https://www.jayleadagro.com';

/**
 * About 100 bytes of meta keywords. Google ignores the tag; it stays as the
 * checked-in record of the phrases this page is meant to win. The same list
 * feeds schema.org `keywords`, which is read.
 */
export const siteKeywords = [
  'Palm Grove Estate Osun',
  'oil palm farmland for sale Nigeria',
  'titled farmland Osun State',
  'oil palm investment Nigeria',
];
