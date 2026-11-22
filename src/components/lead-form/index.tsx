'use client';

import { type ReactNode, useActionState } from 'react';

import { UtmFields } from '@/components/utm-fields';

import { submitLead } from '@/app/actions/submit-lead';

import {
  type FormKind,
  type FormState,
  type Interest,
  interestLabels,
  interests,
} from '@/lib/leads/fields';
import { cn } from '@/lib/utils';

const initial: FormState = { status: 'idle' };

const field =
  'mt-2 block w-full rounded-card border-0 bg-white px-4 py-3.5 text-[1.0625rem] text-ink shadow-[inset_0_0_0_1.5px_var(--color-rule)] outline-none transition-shadow placeholder:text-stone focus:shadow-[inset_0_0_0_2px_var(--color-ink)] aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-alert)]';

const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%23033726' stroke-width='1.8'/%3E%3C/svg%3E")`;

const phoneHint =
  'Outside Nigeria? Start with your country code, e.g. +44 or +1.';

const labels: Record<FormKind, string> = {
  pricing: 'Submit My Request',
  brochure: 'Download Brochure',
};

/**
 * Form 1 (pricing) and Form 2 (brochure), brief §2. Posts to a server
 * action, so it works without JavaScript; with it, errors return inline and
 * the button shows a pending state. Rendered in the modal and inline in
 * Section 13, so ids are prefixed per instance.
 */
export function LeadForm({
  kind,
  interest,
  idPrefix,
  tone = 'light',
  layout = 'page',
  footerNote,
}: {
  kind: FormKind;
  interest?: Interest;
  idPrefix: string;
  tone?: 'light' | 'ink';
  /**
   * 'dialog' splits the form into a scrolling body and a fixed footer that
   * holds the submit button, so the button never scrolls out of reach.
   */
  layout?: 'page' | 'dialog';
  /** A line under the submit button, inside the fixed footer. */
  footerNote?: ReactNode;
}) {
  const inDialog = layout === 'dialog';
  const [state, action, pending] = useActionState(submitLead, initial);
  const v = (name: string) => state.values?.[name] ?? '';
  const err = (name: string) => state.errors?.[name];
  const id = (name: string) => `${idPrefix}-${name}`;
  const onInk = tone === 'ink';

  const described = (name: string) =>
    err(name) ? `${id(name)}-err` : undefined;

  const errEl = (name: string) =>
    err(name) ? (
      <p
        id={`${id(name)}-err`}
        className={cn(
          'text-small mt-2 font-bold',
          onInk ? 'text-alert-light' : 'text-alert'
        )}
      >
        {err(name)}
      </p>
    ) : null;

  const text = (
    name: string,
    label: string,
    type: 'text' | 'tel' | 'email',
    autoComplete: string,
    placeholder?: string,
    hint?: string
  ) => (
    <div>
      <label htmlFor={id(name)} className="text-small font-bold">
        {label}
      </label>
      <input
        id={id(name)}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        inputMode={type === 'tel' ? 'tel' : undefined}
        placeholder={placeholder}
        defaultValue={v(name)}
        aria-invalid={err(name) ? true : undefined}
        aria-describedby={
          [hint ? `${id(name)}-hint` : '', described(name) ?? '']
            .filter(Boolean)
            .join(' ') || undefined
        }
        className={field}
      />
      {hint ? (
        <p
          id={`${id(name)}-hint`}
          className={cn('text-small mt-2', onInk ? 'text-sand' : 'text-stone')}
        >
          {hint}
        </p>
      ) : null}
      {errEl(name)}
    </div>
  );

  return (
    <form
      action={action}
      className={inDialog ? 'flex min-h-0 flex-1 flex-col' : 'grid gap-5'}
    >
      <input type="hidden" name="form" value={kind} />
      {/* Honeypot: hidden from people and assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <UtmFields />

      <div
        className={
          inDialog
            ? 'grid min-h-0 flex-1 gap-5 overflow-y-auto overscroll-contain px-6 py-6 sm:px-9'
            : 'contents'
        }
      >
        {state.message ? (
          <p
            role="alert"
            className={cn(
              'text-small rounded-card px-4 py-3 font-bold',
              onInk ? 'bg-bone/10 text-alert-light' : 'bg-alert/10 text-alert'
            )}
          >
            {state.message}
          </p>
        ) : null}

        {text('name', 'Full name', 'text', 'name')}
        {kind === 'pricing' ? (
          <>
            {text(
              'whatsapp',
              'WhatsApp number',
              'tel',
              'tel',
              'e.g. +234 803 123 4567',
              phoneHint
            )}
            {text('email', 'Email address', 'email', 'email')}
            {text(
              'location',
              'Location (State / Country)',
              'text',
              'address-level1',
              'e.g. Lagos, or London, UK'
            )}
            <div>
              <label htmlFor={id('interest')} className="text-small font-bold">
                I am interested in
              </label>
              {/*
               * Keyed by the submitted value: React resets the form after the
               * action, and a select only reads defaultValue on mount, so
               * without the remount a failed submit would drop the choice.
               */}
              <select
                key={v('interest') || 'initial'}
                id={id('interest')}
                name="interest"
                required
                defaultValue={v('interest') || interest || ''}
                aria-invalid={err('interest') ? true : undefined}
                aria-describedby={described('interest')}
                style={{ backgroundImage: chevron }}
                className={cn(
                  field,
                  'appearance-none bg-size-[1rem] bg-position-[right_1rem_center] bg-no-repeat pr-10'
                )}
              >
                <option value="" disabled>
                  Choose one
                </option>
                {interests.map((o) => (
                  <option key={o} value={o}>
                    {interestLabels[o]}
                  </option>
                ))}
              </select>
              {errEl('interest')}
            </div>
          </>
        ) : (
          <>
            {text('email', 'Email address', 'email', 'email')}
            {text(
              'whatsapp',
              'WhatsApp number',
              'tel',
              'tel',
              'e.g. +234 803 123 4567',
              phoneHint
            )}
          </>
        )}

        <div>
          <label className="text-small flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              value="yes"
              required
              defaultChecked={v('consent') === 'yes'}
              aria-invalid={err('consent') ? true : undefined}
              aria-describedby={described('consent')}
              className={cn(
                'mt-0.5 size-5 shrink-0',
                onInk ? 'accent-oil' : 'accent-ink'
              )}
            />
            <span className={onInk ? 'text-sand' : 'text-stone'}>
              I agree that Jaylead AgriEstate may store and use my details to
              contact me about Palm Grove Estate, in line with the NDPR and our{' '}
              <a
                href="/legal/privacy-policy"
                target="_blank"
                className="link-under"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errEl('consent')}
        </div>
      </div>

      <div
        className={
          inDialog
            ? 'border-rule bg-bone flex-none border-t px-6 pt-4 pb-5 sm:px-9'
            : 'contents'
        }
      >
        <button type="submit" disabled={pending} className="pill w-full">
          {pending ? 'Sending…' : labels[kind]}
        </button>
        {footerNote ? (
          <p className="text-small text-stone mt-3 text-center">{footerNote}</p>
        ) : null}
      </div>
    </form>
  );
}
