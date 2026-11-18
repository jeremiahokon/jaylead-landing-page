import type { Metadata } from 'next';

import { LegalPage } from '@/components/legal-page';

import { siteHost } from '@/lib/site';

import { business } from '@/data/palm-grove';

/**
 * Copied from the main site's /legal/privacy-policy (28 September 2026).
 * Changed only where the main site's text is untrue here: this site's host,
 * the forms it has, and where leads are stored (HubSpot / email, not Sanity).
 */
export const metadata: Metadata = {
  title: 'Privacy Policy: Palm Grove Estate | Jaylead',
  description:
    'What Jaylead AgriEstate collects through the Palm Grove Estate page, why, and how to ask for it to be deleted.',
  alternates: { canonical: '/legal/privacy-policy' },
};

export default function Privacy() {
  const b = business;

  return (
    <LegalPage
      title="Privacy Policy"
      draftNote="Draft for the client’s review"
      updated="28 September 2026"
    >
      <p>
        This policy explains what {b.legalName} (“Jaylead”, “we”) collects
        through {siteHost}, why, and what you can ask us to do with it. It is
        written to meet the Nigeria Data Protection Act 2023.
      </p>
      <h2>What we collect</h2>
      <p>
        Only what you type into our forms: your name, phone or WhatsApp number,
        email address, location and the plot you are interested in. We also
        record which advert or link brought you to this page.
      </p>
      <h2>Why we collect it</h2>
      <p>
        To reply to you, arrange inspections and office visits, and send the
        pricing details or brochure you asked for. We do not sell your details
        or use them for advertising.
      </p>
      <h2>Where it is stored and who sees it</h2>
      <p>
        Form submissions are stored in our customer records system (HubSpot),
        which only authorised Jaylead staff can open, and a copy may be sent to
        our company inbox.
      </p>
      <h2>How long we keep it</h2>
      <p>
        We propose keeping enquiries for up to 24 months after our last
        conversation with you, then deleting them (period to be confirmed by
        Jaylead). If you become a customer, records are kept as the law and your
        agreement require.
      </p>
      <h2>Cookies and tracking</h2>
      <p>
        We use Google Analytics to understand how visitors use this website, and
        the Meta Pixel to measure how well our Facebook and Instagram adverts
        work and to show our adverts to people likely to be interested. These
        tools set cookies and record the pages you visit, and whether you sent
        us an enquiry or tapped to message us on WhatsApp. They do not receive
        your name, phone number or the contents of any form. You can block these
        cookies in your browser settings, opt out of Google Analytics at
        tools.google.com/dlpage/gaoptout, and manage advert preferences in your
        Facebook or Instagram settings. Videos from Instagram or YouTube do not
        load until you tap to play one; once you do, that platform may set its
        own cookies under its own privacy policy.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete the details we hold about you, or
        withdraw your consent, at any time. Email{' '}
        <a href={`mailto:${b.email}`}>{b.email}</a> or message us on WhatsApp at{' '}
        {b.phoneDisplay}. You may also complain to the Nigeria Data Protection
        Commission.
      </p>
      <h2>Contact</h2>
      <p>
        {b.legalName}, RC {b.rcNumber}, {b.address.full}.
      </p>
    </LegalPage>
  );
}
