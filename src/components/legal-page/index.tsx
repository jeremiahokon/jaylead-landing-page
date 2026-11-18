import Link from 'next/link';

import type { ReactNode } from 'react';

import { Container } from '@/components/container';
import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';

/**
 * Plain legal layout, ported from the main site: no marketing copy, a draft
 * notice, a reading measure. The logo and the "Back" link both return to the
 * estate page, so a visitor who checks the terms never loses the offer.
 */
export function LegalPage({
  title,
  draftNote,
  updated,
  children,
}: {
  title: string;
  draftNote: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-rule border-b">
        <Container className="flex items-center justify-between gap-4 py-4">
          <Link href="/" aria-label="Palm Grove Estate home">
            <Logo className="h-8 sm:h-9" />
          </Link>
          <Link href="/" className="link-under text-small font-bold">
            Back to Palm Grove Estate
          </Link>
        </Container>
      </header>
      <main id="main">
        <Container className="pt-14 pb-28 sm:pt-20">
          <h1 className="font-display text-display max-w-[18ch]">{title}</h1>
          <p className="micro text-stone mt-6">
            {draftNote} · Last updated {updated}
          </p>
          <div className="prose mt-12">{children}</div>
          <p className="mt-16">
            <Link href="/" className="pill">
              Back to Palm Grove Estate
            </Link>
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
