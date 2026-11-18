/**
 * The Palm Grove Estate landing page: sections 0 to 14 of the brief, in
 * order, all Server Components. The only islands on this route are the
 * lead dialog, the lead form (inside Section 13 and the dialog), UTM
 * capture, the brochure video and the WhatsApp tracker.
 */
import { Brochure } from '@/components/brochure';
import { Earnings } from '@/components/earnings';
import { Faq } from '@/components/faq';
import { FarmProof } from '@/components/farm-proof';
import { FinalCta } from '@/components/final-cta';
import { Hero } from '@/components/hero';
import { JsonLd } from '@/components/json-ld';
import { LeadDialog } from '@/components/lead-dialog';
import { LegalSafety } from '@/components/legal-safety';
import { Opportunity } from '@/components/opportunity';
import { Pricing } from '@/components/pricing';
import { Seedlings } from '@/components/seedlings';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Timeline } from '@/components/timeline';
import { TrustStrip } from '@/components/trust-strip';
import { WhatYouOwn } from '@/components/what-you-own';

export default function Home() {
  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Opportunity />
        <WhatYouOwn />
        <Seedlings />
        <Pricing />
        <Brochure />
        <Timeline />
        <Earnings />
        <LegalSafety />
        <FarmProof />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <LeadDialog />
    </>
  );
}
