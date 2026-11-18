'use server';

/**
 * Both lead forms post here. Works without JavaScript: the form posts
 * natively, and on success the visitor is redirected to /thank-you either
 * way. With JavaScript, validation errors come back inline through
 * useActionState.
 *
 * Guards: a honeypot field, a per-IP rate limit (5 per 10 minutes per server
 * instance) and zod validation.
 */
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { deliverLead } from '@/lib/leads/deliver';
import { type FormKind, formKinds, type FormState } from '@/lib/leads/fields';
import { type Lead, schemas } from '@/lib/leads/schema';

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);

  recent.push(now);
  hits.set(ip, recent);

  return recent.length > 5;
}

export async function submitLead(
  _prev: FormState,
  form: FormData
): Promise<FormState> {
  const kind = String(form.get('form')) as FormKind;

  if (!formKinds.includes(kind))
    return { status: 'error', message: 'Unknown form.' };

  const raw = Object.fromEntries(
    [...form.entries()]
      .filter(([k, v]) => !k.startsWith('$') && typeof v === 'string')
      .map(([k, v]) => [k, String(v)])
  );

  const done = `/thank-you?form=${kind}${
    kind === 'pricing' && raw.interest
      ? `&interest=${encodeURIComponent(raw.interest)}`
      : ''
  }`;

  // Honeypot: real people never see or fill this field.
  if (raw.company) redirect(done);

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';

  if (limited(ip))
    return {
      status: 'error',
      message:
        'Too many submissions. Please try again in a few minutes, or message us on WhatsApp.',
      values: raw,
    };

  const parsed = schemas[kind].safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsed.error.issues)
      errors[String(issue.path[0])] ??= issue.message;

    return {
      status: 'error',
      errors,
      message: 'Please check the highlighted fields.',
      values: raw,
    };
  }

  await deliverLead({ form: kind, ...parsed.data } as Lead, {
    hutk: (await cookies()).get('hubspotutk')?.value,
    ip,
    pageUri: parsed.data.page_url ?? h.get('referer') ?? undefined,
  });

  redirect(done);
}
