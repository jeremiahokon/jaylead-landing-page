/**
 * Ad and analytics events: one call reports to both Meta Pixel and GA4.
 * Safe anywhere on the client: when an ID is unset, or a blocker stopped the
 * script, the global is absent and the call does nothing. Ported from the
 * main site (../jaylead.ng/src/lib/analytics.ts). No personal data is sent.
 */
type Fbq = (
  cmd: 'track' | 'trackCustom',
  name: string,
  params?: object
) => void;
type Gtag = (cmd: 'event', name: string, params?: object) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
  }
}

export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const gaId = process.env.NEXT_PUBLIC_GA_ID;

/** Form 1 conversion. Fired on the thank-you page only (brief §15). */
export function trackLead(interest?: string) {
  window.fbq?.('track', 'Lead', {
    content_name: 'Palm Grove pricing form',
    content_category: interest || undefined,
  });
  window.gtag?.('event', 'generate_lead', {
    form_type: 'pricing',
    lead_interest: interest || undefined,
  });
}

/** Form 2 conversion, kept separate from Lead (brief §5 tracking). */
export function trackBrochureDownload() {
  window.fbq?.('trackCustom', 'BrochureDownload', {
    content_name: 'Palm Grove brochure',
  });
  window.gtag?.('event', 'brochure_download', { form_type: 'brochure' });
}

/** A WhatsApp button was tapped. */
export function trackWhatsApp(sourcePage: string) {
  window.fbq?.('track', 'Contact', { content_name: 'whatsapp' });
  window.gtag?.('event', 'whatsapp_click', { source_page: sourcePage });
}
