'use client';

import { useEffect, useRef, useState } from 'react';

import { LeadForm } from '@/components/lead-form';

import { type FormKind, type Interest, isInterest } from '@/lib/leads/fields';

type Open = { kind: FormKind; interest?: Interest; n: number };

const copy: Record<FormKind, { title: string; line: string }> = {
  pricing: {
    title: 'Get Pricing & Plot Details',
    line: 'Tell us where to send your plot prices, payment plan and details.',
  },
  brochure: {
    title: 'Download the Brochure',
    line: 'Plot prices and payment plans, estate phases and timeline, your legal documents and revenue split.',
  },
};

/**
 * The one modal (brief §2: every form CTA opens a pop-up). CTAs stay plain
 * server-rendered anchors to #apply; this island catches clicks on any
 * [data-lead] element with one delegated listener, so no CTA needs to be a
 * client component. Native <dialog>: showModal() makes the page inert,
 * traps focus and closes on Escape; focus returns to the trigger on close.
 */
export function LeadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<Open | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;

      const el = (e.target as Element | null)?.closest?.<HTMLElement>(
        '[data-lead]'
      );

      if (!el) return;

      const kind = el.dataset.lead === 'brochure' ? 'brochure' : 'pricing';
      const interest = el.dataset.interest;

      e.preventDefault();
      trigger.current = el;
      setOpen((prev) => ({
        kind,
        interest: isInterest(interest) ? interest : undefined,
        n: (prev?.n ?? 0) + 1,
      }));
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const d = ref.current;

    if (open && d && !d.open) d.showModal();
  }, [open]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="lead-dialog"
      aria-labelledby="lead-dialog-title"
      onClose={() => {
        setOpen(null);
        trigger.current?.focus();
      }}
      onClick={(e) => {
        // Tap on the backdrop closes it.
        if (e.target === e.currentTarget) close();
      }}
    >
      {open ? (
        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="micro text-stone">Palm Grove Estate · Osun State</p>
              <h2
                id="lead-dialog-title"
                className="font-display text-title mt-3"
              >
                {copy[open.kind].title}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="hover:bg-ink/10 -mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-2xl leading-none transition-colors"
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <p className="text-small text-stone mt-3">{copy[open.kind].line}</p>
          <div className="mt-7">
            <LeadForm
              key={open.n}
              kind={open.kind}
              interest={open.interest}
              idPrefix="dialog"
            />
          </div>
          <p className="text-small text-stone mt-5 text-center">
            No spam. An advisor will contact you shortly.
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
