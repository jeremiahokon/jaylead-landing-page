/**
 * Where a validated lead goes, in order of preference:
 *   1. HubSpot, when its env vars are set (./hubspot.ts)
 *   2. Resend email to the sales inbox (RESEND_API_KEY + LEAD_NOTIFY_EMAIL,
 *      the same variables the main site uses). LEAD_FROM_EMAIL sets the
 *      sender once jayleadagro.com is verified in Resend; until then Resend's
 *      test sender only delivers to the Resend account owner's own address.
 *      Reply-To is the buyer, so Sales can answer straight from the inbox.
 *   3. A server log line, so a misconfigured deploy is visible in the logs
 * If HubSpot fails, the email still goes, so a lead is never lost silently.
 */
import { hubspotConfigured, leadTag, submitToHubSpot } from './hubspot';
import type { Lead } from './schema';

import 'server-only';

async function email(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;

  if (!key || !to) return false;

  const body = Object.entries(lead)
    .filter(([k, v]) => v && k !== 'consent')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:
        process.env.LEAD_FROM_EMAIL ??
        'Palm Grove landing page <onboarding@resend.dev>',
      to: to.split(',').map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New Palm Grove lead [${leadTag(lead)}]: ${lead.name}`,
      text: body,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`Resend ${res.status}`);

  return true;
}

export async function deliverLead(
  lead: Lead,
  ctx: { hutk?: string; ip?: string; pageUri?: string }
) {
  let saved = false;

  if (hubspotConfigured()) {
    try {
      await submitToHubSpot(lead, ctx);
      saved = true;
    } catch (error) {
      console.error('[lead] HubSpot failed', error);
    }
  }

  if (!saved) {
    try {
      saved = await email(lead);
    } catch (error) {
      console.error('[lead] email failed', error);
    }
  }

  if (!saved)
    console.warn(
      `[lead] No CRM or email configured; lead not stored: [${leadTag(lead)}] ${lead.name}`
    );
}
