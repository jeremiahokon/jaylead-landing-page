/**
 * Meta Pixel and Google tag (GA4 / Ads), brief §5. Each loads only when its
 * ID is set (NEXT_PUBLIC_META_PIXEL_ID, NEXT_PUBLIC_GA_ID), after the page
 * is interactive, so neither delays first paint. Conversions fire on the
 * thank-you page only (thank-you-actions); WhatsApp taps everywhere.
 * Ported from the main site (../jaylead.ng/src/components/analytics).
 */
import Script from 'next/script';

import { gaId, metaPixelId } from '@/lib/analytics';

import { WhatsAppTracker } from './whatsapp-tracker';

const validPixel = metaPixelId && /^\d+$/.test(metaPixelId);
const validGa = gaId && /^(G|AW)-[A-Z0-9]+$/.test(gaId);

export function Analytics() {
  return (
    <>
      {validPixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(metaPixelId)});fbq('track','PageView');`}
        </Script>
      ) : null}
      {validGa ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
          </Script>
        </>
      ) : null}
      <WhatsAppTracker />
    </>
  );
}
