# Handover: Palm Grove Estate landing page

Status on 18 Nov 2026: built, every route static, both forms tested end to end (with and
without JavaScript). The items below are content or accounts only the client can supply.
Nothing has been invented to fill them; every section renders complete without them.

## Before launch (blocking)

1. **Lead destination.** Set either the HubSpot variables or the Resend variables (README).
   With neither, leads are only written to the server log. Until HubSpot exists, Resend is
   what stops leads being lost.
2. **DNS.** CNAME `palmgrove` to the Vercel project, and add the domain in Vercel.
3. **Ad pixels.** `NEXT_PUBLIC_META_PIXEL_ID` and `NEXT_PUBLIC_GA_ID`. Events: `Lead` /
   `generate_lead` (Form 1) and `BrochureDownload` / `brochure_download` (Form 2) fire on
   `/thank-you` only; `Contact` / `whatsapp_click` on every WhatsApp tap.
4. **Ad URLs** should carry `utm_source`, `utm_medium`, `utm_campaign` and `ad_id={{ad.id}}`
   (Meta) so every lead traces to its ad. They are stored first-touch and sent as hidden
   fields.

## HubSpot setup (when the account exists)

- Create two forms, "Palm Grove pricing" and "Palm Grove brochure"; put their GUIDs in
  `HUBSPOT_FORM_PRICING` / `HUBSPOT_FORM_BROCHURE`, plus `HUBSPOT_PORTAL_ID`.
- Create these contact properties and add them to both forms (HubSpot rejects fields that are
  not on the form): `palm_grove_lead_tag`, `palm_grove_interest`, `location_text`, `ad_id`,
  `page_url`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- Brief §2 "send an automatic WhatsApp or email message straight away" and §5 "Sales team is
  notified immediately": build these as HubSpot workflows triggered by the two forms.
- If HubSpot fails, the lead still goes to the Resend email, so keep Resend configured.

## Content still to supply (the page renders without it)

| Item                                       | Brief       | Where it goes                                                  | Until then                                                     |
| ------------------------------------------ | ----------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| 30-year projection table + key assumptions | §9          | `earnings.projection` in `src/data/palm-grove.ts`, as supplied | 70/30 split, illustrative line and "Get My Full Projection"    |
| Brochure PDF                               | §2, §7, §15 | `public/` + `brochure.pdfUrl`                                  | Thank-you page offers the brochure on WhatsApp                 |
| Brochure video (YouTube, captions on)      | §7          | `brochure.youTubeId`                                           | Main site's 14 s silent aerial; end overlay still opens Form 1 |
| Photo of the planted first batch (hero)    | §1          | `hero.photo`                                                   | Main site's own aerial, captioned "Jaylead farmland"           |
| 3 to 4 seedling photos                     | §5          | front of `seedlings.media`                                     | Two Instagram reels (tap to play) + a dated perimeter photo    |
| MD's 2 to 3 line message                   | §11         | `proof.founder.quote`                                          | His own words from the main site's "Our story"                 |
| Real buyer testimonials                    | §11         | `proof.testimonials`                                           | Block omitted entirely                                         |
| Facebook page URL                          | §14         | `business.socials`                                             | "Facebook" shown as text, not a link                           |

## Conflicts with the main site (brief followed; please confirm)

- **Documents:** the brief lists Deed of Assignment, Registered Survey, Layout Plan, Payment
  Receipt. The main site lists Certificate of Allocation instead of Payment Receipt.
- **1 Hectare availability:** the main site marks it "Reserved"; this page sells it.
- **Pre-launch end date / slots:** none shown (brief §6 allows one only if true and honoured).
- The projection box says the year-by-year projection "is sent with your plot details":
  confirm Sales will send it to Form 1 leads.

## Decisions taken

- Motion tier `css`: no animation runtime. The hero rises on load; sections settle in with CSS
  scroll-driven animation (transform only, so nothing is ever hidden from crawlers).
- Radii: 4px for every surface, fully round for pills and badges, nothing in between.
- No navigation menu, and the logo is not a link (brief §1: nothing leads away).
- Privacy Policy and Terms are local pages (`/legal/*`), copied from the main site with three
  changes where its text is untrue here: the host name, the forms this page has, and storage
  (HubSpot / email instead of Sanity). Terms' risk-disclosure link goes to the main site.
  Both are marked "Draft for the client's review", as on the main site.
- WhatsApp numbers: any country. Without a country code a number is read as Nigerian; with
  `+` or `00` it is checked against that country's rules, and stored as +E.164.
- Seedlings rail: Instagram reels open in a pop-up (main site's format). Nothing loads from
  Instagram until the tap; with JavaScript off the card links to the post.
- The thank-you page's "Book a Site Inspection" opens WhatsApp with an inspection message, so
  that page stays free of forms.
- Critical path at build: about 278 KB gzip (HTML with inlined CSS 59 KB, JS 188 KB, three
  fonts 30 KB), plus the hero image.
