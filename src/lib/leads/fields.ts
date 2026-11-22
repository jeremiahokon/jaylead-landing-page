/**
 * Plain constants shared by the forms (client) and the server action. No zod
 * here, so the client bundle never pulls in the validator.
 */

/** Form 1 "I am interested in" options, verbatim from brief section 2. */
export const interests = [
  '1 Acre',
  '1 Hectare',
  'Not sure yet',
  'Site inspection',
] as const;

export type Interest = (typeof interests)[number];

/**
 * What the dropdown shows. The submitted value stays the bare option above,
 * so the server action, HubSpot and analytics are unchanged (owner, 22 Nov
 * 2026: show the price beside each plot size).
 */
export const interestLabels: Record<Interest, string> = {
  '1 Acre': '1 Acre (₦4,000,000)',
  '1 Hectare': '1 Hectare (₦10,000,000)',
  'Not sure yet': 'Not sure yet',
  'Site inspection': 'Site inspection',
};

export const formKinds = ['pricing', 'brochure'] as const;

export type FormKind = (typeof formKinds)[number];

/** Hidden attribution fields, captured on the client by utm-fields. */
export const trackingFields = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ad_id',
  'page_url',
] as const;

export type TrackingField = (typeof trackingFields)[number];

export type FormState = {
  status: 'idle' | 'error';
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

export const isInterest = (v: string | null | undefined): v is Interest =>
  (interests as readonly string[]).includes(v ?? '');
