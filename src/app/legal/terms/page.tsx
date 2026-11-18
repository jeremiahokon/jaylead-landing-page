import type { Metadata } from 'next';

import { LegalPage } from '@/components/legal-page';

import { mainSiteUrl, siteHost } from '@/lib/site';

import { business } from '@/data/palm-grove';

/**
 * Copied from the main site's /legal/terms (28 September 2026). The risk
 * disclosure it links to lives on the main site.
 */
export const metadata: Metadata = {
  title: 'Terms: Palm Grove Estate | Jaylead',
  description: 'The terms for using the Palm Grove Estate page.',
  alternates: { canonical: '/legal/terms' },
};

export default function Terms() {
  const b = business;

  return (
    <LegalPage
      title="Website Terms"
      draftNote="Draft for the client’s review"
      updated="28 September 2026"
    >
      <p>
        These terms cover your use of {siteHost}, run by {b.legalName} (RC{' '}
        {b.rcNumber}).
      </p>
      <h2>Information, not an offer</h2>
      <p>
        This website describes our plots and investment options in general
        terms. Any purchase or investment is governed only by the individual
        agreement you sign with Jaylead, not by anything on this website.
      </p>
      <h2>Prices</h2>
      <p>
        Prices shown are pre-launch prices and can change. We confirm the
        current price and payment terms with you before any payment.
      </p>
      <h2>Paying safely</h2>
      <p>
        Pay only into the corporate account of {b.legalName}. We will never ask
        you to pay into a personal account. Before any transfer, call our office
        line, {b.phoneDisplay}, to confirm the account details.
      </p>
      <h2>Returns and risk</h2>
      <p>
        Farm income and investment returns depend on real farm performance and
        are not guaranteed. Please read our{' '}
        <a href={`${mainSiteUrl}/legal/risk-disclosure`}>risk disclosure</a>.
      </p>
      <h2>Content</h2>
      <p>
        Words, photos and videos on this site belong to Jaylead or are used with
        permission.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${b.email}`}>{b.email}</a>{' '}
        or {b.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
