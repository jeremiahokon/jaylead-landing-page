/**
 * HubSpot adapter: the Forms Submission API v3. Needs no private token, only
 * the portal ID and one form GUID per form, so nothing secret ships.
 *
 *   HUBSPOT_PORTAL_ID       e.g. 12345678
 *   HUBSPOT_FORM_PRICING    GUID of the "Palm Grove pricing" form (Form 1)
 *   HUBSPOT_FORM_BROCHURE   GUID of the "Palm Grove brochure" form (Form 2)
 *
 * Every property named in `fieldsFor` must exist on the HubSpot form, or
 * HubSpot rejects the submission. Custom properties to create once in
 * HubSpot (contact object): palm_grove_interest, palm_grove_lead_tag,
 * location_text, ad_id, page_url and the five utm_* properties. See
 * HANDOVER.md. The instant WhatsApp/email reply to the lead is a HubSpot
 * workflow triggered by these forms, not code here.
 */
import type { Lead } from './schema';

const ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit';

type Field = { objectTypeId: '0-1'; name: string; value: string };

export const hubspotConfigured = () =>
  Boolean(
    process.env.HUBSPOT_PORTAL_ID &&
    process.env.HUBSPOT_FORM_PRICING &&
    process.env.HUBSPOT_FORM_BROCHURE
  );

function splitName(full: string) {
  const [first, ...rest] = full.trim().split(/\s+/);

  return { firstname: first ?? full, lastname: rest.join(' ') };
}

/** The tag the Sales team filters on (brief §2 "Routing"). */
export const leadTag = (lead: Lead) =>
  lead.form === 'brochure' ? 'Brochure Download' : lead.interest;

function fieldsFor(lead: Lead): Field[] {
  const { firstname, lastname } = splitName(lead.name);

  const values: Record<string, string | undefined> = {
    firstname,
    lastname,
    email: lead.email,
    phone: lead.whatsapp,
    palm_grove_lead_tag: leadTag(lead),
    ...(lead.form === 'pricing'
      ? { palm_grove_interest: lead.interest, location_text: lead.location }
      : {}),
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_content: lead.utm_content,
    utm_term: lead.utm_term,
    ad_id: lead.ad_id,
    page_url: lead.page_url,
  };

  return Object.entries(values)
    .filter(([, v]) => v)
    .map(([name, value]) => ({ objectTypeId: '0-1', name, value: value! }));
}

export async function submitToHubSpot(
  lead: Lead,
  ctx: { hutk?: string; ip?: string; pageUri?: string }
) {
  const formGuid =
    lead.form === 'pricing'
      ? process.env.HUBSPOT_FORM_PRICING
      : process.env.HUBSPOT_FORM_BROCHURE;

  const res = await fetch(
    `${ENDPOINT}/${process.env.HUBSPOT_PORTAL_ID}/${formGuid}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: fieldsFor(lead),
        context: {
          hutk: ctx.hutk,
          ipAddress: ctx.ip,
          pageUri: ctx.pageUri,
          pageName: 'Palm Grove Estate',
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: 'I agree that Jaylead AgriEstate may store and use my details to contact me about Palm Grove Estate, in line with the NDPR.',
          },
        },
      }),
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!res.ok)
    throw new Error(
      `HubSpot ${res.status}: ${await res.text().catch(() => '')}`
    );
}
