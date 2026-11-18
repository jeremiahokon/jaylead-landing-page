'use client';

import { useEffect } from 'react';

import { trackWhatsApp } from '@/lib/analytics';

/**
 * One delegated listener catches every WhatsApp link (header, FAQ, final
 * CTA, footer, thank-you), so no link needs to know about tracking
 * (brief §5: a click event on every WhatsApp button). Renders nothing.
 */
export function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      const href = link?.getAttribute('href') ?? '';

      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href))
        trackWhatsApp(location.pathname);
    };

    document.addEventListener('click', onClick, { capture: true });

    return () =>
      document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
