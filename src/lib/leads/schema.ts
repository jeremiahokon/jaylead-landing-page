/**
 * Server-side validation for both forms. Client code imports ./fields only,
 * so zod never reaches the browser bundle.
 */
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

import { interests, trackingFields } from './fields';

const name = z.string().trim().min(2, 'Please enter your full name.').max(120);

/**
 * Any country's number (brief: buyers at home and in the diaspora). Numbers
 * without a country code are read as Nigerian (0803…); "00" is accepted for
 * "+". Validated against libphonenumber's per-country rules, stored E.164.
 * Server-only, so the metadata never reaches the browser.
 */
const whatsapp = z
  .string()
  .trim()
  .transform((v, ctx) => {
    const parsed = parsePhoneNumberFromString(
      v.replace(/^00/, '+').replaceAll(/[^\d+]/g, ''),
      'NG'
    );

    if (!parsed?.isValid()) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Enter a valid WhatsApp number. Outside Nigeria, start with your country code, for example +44 7911 123456.',
      });

      return v;
    }

    return parsed.number;
  });

const email = z
  .string()
  .trim()
  .email('That email address does not look right.');

const consent = z.literal('yes', {
  message: 'Please tick the box so we can contact you.',
});

const tracking = Object.fromEntries(
  trackingFields.map((f) => [f, z.string().max(500).optional()])
) as Record<(typeof trackingFields)[number], z.ZodOptional<z.ZodString>>;

export const schemas = {
  pricing: z.object({
    name,
    whatsapp,
    email,
    location: z
      .string()
      .trim()
      .min(2, 'Tell us your state, or your country if abroad.')
      .max(120),
    interest: z.enum(interests, {
      message: 'Choose what you are interested in.',
    }),
    consent,
    ...tracking,
  }),
  brochure: z.object({ name, email, whatsapp, consent, ...tracking }),
};

export type PricingLead = z.infer<typeof schemas.pricing>;
export type BrochureLead = z.infer<typeof schemas.brochure>;

export type Lead =
  | ({ form: 'pricing' } & PricingLead)
  | ({ form: 'brochure' } & BrochureLead);
