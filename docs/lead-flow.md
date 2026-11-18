# Where form responses go

The Palm Grove page has two forms. Both send their responses to the same place.

| Form                                   | Opened by                                                                    | Fields                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Form 1: Get Pricing & Plot Details** | Every "Get Pricing", "Reserve This Plot" and "Book a Site Inspection" button | Name, WhatsApp, email, location, "I am interested in", consent |
| **Form 2: Download Brochure**          | The brochure buttons                                                         | Name, email, WhatsApp, consent                                 |

Both also carry hidden fields filled in automatically: `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content`, `utm_term`, `ad_id` and `page_url`. These record which advert
brought the buyer.

## What happens when someone submits

1. **The server checks the answers** (`src/lib/leads/schema.ts`, Zod):
   - the name, email and location look real;
   - the WhatsApp number is valid for its country (any country; no code means Nigeria);
   - the consent box is ticked.

   If something is wrong, the form shows the error and keeps everything the buyer typed.

2. **Bots are dropped silently.** There is a hidden "company" field that people never see;
   anything that fills it in is treated as a bot. Each address can also submit only 5 times
   every 10 minutes.
3. **The lead is delivered** (`src/lib/leads/deliver.ts`), trying each option in turn:
   1. **HubSpot**, once the `HUBSPOT_*` settings exist. **Not set up yet.**
   2. **Email via Resend**, to the sales inbox. **This is the route for now.**
   3. **Server log only.** If neither of the above is configured, the lead is printed in the
      Vercel logs as `[lead] No CRM or email configured; lead not stored`.
      ⚠️ **On this route the lead is lost.**
4. **The buyer lands on `/thank-you`.** This page fires the ad conversion: Meta `Lead` (or
   `BrochureDownload`) and Google `generate_lead` (or `brochure_download`). It also offers
   WhatsApp, "Book a Site Inspection" and the brochure.

## Turning on email (do this before any ad goes live)

1. Create a free account at resend.com and make an **API key**.
2. In Resend, go to **Domains**, add `jayleadagro.com`, and add the DNS records it shows at the
   domain's DNS host. Wait until Resend shows the domain as **Verified**.
   - Until the domain is verified, Resend's test sender (`onboarding@resend.dev`) **only
     delivers to the email address that owns the Resend account**.
3. In Vercel, open **Project, then Settings, then Environment Variables** (Production), add the
   variables below, then redeploy:

| Variable            | Value                                              | Notes                                                      |
| ------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| `RESEND_API_KEY`    | `re_…` (from Resend)                               | Secret. Never commit it.                                   |
| `LEAD_NOTIFY_EMAIL` | `jayleadagriestate@gmail.com` (or the sales inbox) | Several inboxes allowed, separated by commas               |
| `LEAD_FROM_EMAIL`   | `Palm Grove <leads@jayleadagro.com>`               | Only after the domain is verified. Leave unset until then. |

4. Test it: submit the form on the live site with your own details. The email should arrive
   within a minute.

### What the email looks like

**Subject:** `New Palm Grove lead [1 Hectare]: Ada Test` (for Form 2, the tag is
`[Brochure Download]`)

```
form: pricing
name: Ada Test
whatsapp: +447911123456
email: ada@example.com
location: London, UK
interest: 1 Hectare
utm_source: facebook
utm_campaign: palm-grove-launch
ad_id: 120212345678
page_url: https://palmgrove.jayleadagro.com/?utm_source=facebook…
```

- **Reply-To is the buyer's email address,** so pressing Reply answers the buyer directly.
- **WhatsApp numbers arrive in international format** (`+234…`, `+44…`), ready to paste into
  `wa.me/`.

## Later: HubSpot

Once the account exists, set `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_PRICING` and
`HUBSPOT_FORM_BROCHURE`. See `HANDOVER.md` for the forms and contact properties to create.

- **Keep the Resend settings in place.** If HubSpot ever fails, the email still goes.
- The buyer's instant auto-reply (brief §2) is built as a **HubSpot workflow**, not in this code.

## WhatsApp

All WhatsApp buttons open a chat with **+234 916 099 2539**, the office line from the main
site. The chat opens with a pre-filled message, which you can change in
`src/data/palm-grove.ts`:

| Where                                         | Pre-filled message                                                   |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Header, FAQ, thank-you "Chat with an Advisor" | Hi Jaylead, I'd like to know more about Palm Grove Estate.           |
| Brochure (no PDF yet)                         | Hi Jaylead, please send me the Palm Grove Estate brochure.           |
| Thank-you "Book a Site Inspection"            | Hi Jaylead, I'd like to book a site inspection at Palm Grove Estate. |

To use a different sales number, change `whatsappNumber`, `phoneDisplay` and `phoneE164` in
`business`, all in the same file.

## Placeholders still in use

| Item                     | Current state                                                | What replaces it                           |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| Lead destination         | Not configured (server log only)                             | Resend env vars now, HubSpot later         |
| Meta Pixel / Google tag  | Off (`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID` unset) | The real IDs                               |
| Brochure PDF             | None; the thank-you page offers it on WhatsApp               | `brochure.pdfUrl`                          |
| Brochure video           | Main site's 14-second aerial clip                            | `brochure.youTubeId`                       |
| 30-year projection table | Hidden; the 70/30 split is shown instead                     | `earnings.projection`                      |
| Hero photo               | Main site aerial                                             | Photo of the planted first batch           |
| Seedling photos          | Two Instagram reels and a perimeter photo                    | Nursery, seedling and transplanting photos |
| MD message               | Founder's own words from the main site                       | A 2 to 3 line message from the MD          |
| Testimonials             | Hidden                                                       | Real buyer quotes                          |
| Facebook link            | Shown as text only                                           | The page URL                               |
| Domain                   | `palmgrove.jayleadagro.com` (DNS not yet pointed)            | A CNAME to Vercel                          |
