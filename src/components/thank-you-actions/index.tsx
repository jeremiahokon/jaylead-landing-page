'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { trackBrochureDownload, trackLead } from '@/lib/analytics';

/**
 * The thank-you page's only script (brief §15): fires the conversion once
 * per submission (Lead for Form 1, BrochureDownload for Form 2) and, after
 * Form 2, starts the brochure download. Reads the query string, so it sits
 * inside <Suspense> and the page itself stays static.
 */
export function ThankYouActions({
  pdfUrl,
  children,
}: {
  pdfUrl: string | null;
  /** Server-rendered "Talk to an Advisor" button. */
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const form = params.get('form');
  const interest = params.get('interest') ?? undefined;
  const isBrochure = form === 'brochure';

  useEffect(() => {
    if (form !== 'pricing' && form !== 'brochure') return;

    const key = `pg_conv_${form}_${interest ?? ''}`;

    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage blocked: fire anyway.
    }

    if (form === 'brochure') {
      trackBrochureDownload();

      if (pdfUrl) {
        const a = document.createElement('a');

        a.href = pdfUrl;
        a.download = '';
        document.body.append(a);
        a.click();
        a.remove();
      }
    } else {
      trackLead(interest);
    }
  }, [form, interest, pdfUrl]);

  if (!isBrochure || !pdfUrl) return null;

  return (
    <div className="bg-bone-deep rounded-card mt-8 grid justify-items-start gap-4 p-6">
      <p className="font-bold">
        Your brochure download should start automatically.
      </p>
      <a href={pdfUrl} download className="link-under font-bold">
        Click here if your download did not start
      </a>
      {children}
    </div>
  );
}
