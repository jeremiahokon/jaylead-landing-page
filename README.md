# Palm Grove Estate landing page

Single-page lead-generation site for **Jaylead AgriEstate's Palm Grove Estate**, served at
`palmgrove.jayleadagro.com` (a subdomain of the main site, www.jayleadagro.com). Built from
`Palm-Grove-Landing-Page-Content-Architecture.pdf` (the brief: LOCKED for copy, order and CTA
behaviour) with the main site's brand: Bespoke Slab + Lexend, bone paper, logo green, the
logo's sun as the one accent.

Next.js 16 (App Router, Cache Components), Tailwind v4, zod (+ libphonenumber-js for WhatsApp
numbers from any country). Every route prerenders static.

## Commands

```sh
pnpm dev      # local dev
pnpm build    # production build: every route should show ○ (static)
pnpm check    # prettier + eslint
pnpm og       # re-render the 1200×630 share cards from scripts/opengraph-image.html
```

## Where things live

| What                                                            | Where                                              |
| --------------------------------------------------------------- | -------------------------------------------------- |
| Every fact, price, FAQ and caption on the page                  | `src/data/palm-grove.ts`                           |
| Canonical origin (metadata, JSON-LD, sitemap, robots, llms.txt) | `src/lib/site.ts`                                  |
| Sections (Server Components, one kebab-case folder each)        | `src/components/<section>/index.tsx`               |
| Lead form server action                                         | `src/app/actions/submit-lead.ts`                   |
| Lead delivery: HubSpot, then Resend email, then server log      | `src/lib/leads/`                                   |
| Meta Pixel / Google tag and conversion events                   | `src/components/analytics`, `src/lib/analytics.ts` |

Client islands (the whole list): `lead-dialog`, `lead-form`, `utm-fields`, `brochure-video`,
`reel-card/player` (Instagram pop-up), `thank-you-actions`, `analytics/whatsapp-tracker`. Everything else renders on the server, and
every CTA works with JavaScript off (form CTAs fall back to the inline form at `#apply`).

## Environment variables

| Variable                                                             | Purpose                                                               |
| -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                               | Optional override of the canonical origin                             |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_PRICING`, `HUBSPOT_FORM_BROCHURE` | Send leads to HubSpot (Forms API v3)                                  |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`                                | Fallback: email each lead to the sales inbox (comma-separate several) |
| `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID`                     | Ad tracking (`G-…` or `AW-…`)                                         |

Privacy Policy and Terms live at `/legal/privacy-policy` and `/legal/terms` (copied from the main
site, adapted only where its text was untrue here).

See `HANDOVER.md` for what is still needed before launch.
