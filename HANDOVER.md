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

## Revision 1 (owner feedback, 22 Nov 2026)

Done:

- Brand type and colour from the Figma file "Jayleads" (green identity, frame 21): Sansita One headers
  (self-hosted, `src/fonts/sansita-one.woff2`, OFL), Figtree text, and the brand colours only:
  #033726, #006847, #02AD4D, #FFCB30, #FF8D30, on white and #EEFFFA. Orange is never text on a light
  ground (1.9:1); there it is an underline swash or a fill. Sansita One has no ₦, so the display
  stack hands that glyph to Figtree ExtraBold.
- "Entry 0X" labels removed; each section keeps its own name.
- Hero: DJI_0945 plus nine site photos as a carousel (`src/components/hero/carousel.tsx`).
  Secondary button now "Watch: Palm Grove Explained".
- Every "Get Pricing & Plot Details" now scrolls to the pre-launch prices (`#pricing`); the form
  opens from "Reserve This Plot" or "Talk to an Advisor" there.
- Form: plot prices shown in the interest dropdown (submitted values unchanged); button
  "Submit My Request".
- Seedlings: four @jaylead_ng reels (posters are frames from each reel).
- Proof from the farm: a mixed photo + silent video field log with a lightbox. The founder quote
  opens reel DZMkHQTKNWE; @jaylead5 is linked and in the JSON-LD `sameAs`.
- Projection: the owner's Year 3 to 10 table for 1 hectare, also in llms.txt.
- Share cards re-rendered with the new fonts, colours and the site billboard photo.

Assets: photos come from the Drive folder "Site- planting" and are converted to 1600px WebP with
EXIF/GPS stripped (`magick in.jpg -auto-orient -strip -resize '1600x1600>' -quality 68 out.webp`).
Clips are converted with
`ffmpeg -i in -an -vf scale=1280:-2 -c:v libx264 -crf 26 -maxrate 2200k -movflags +faststart`
and have no audio stream.

Open:

- **Seedling videos IMG_4317, 4301, 4319, 4321.** The Drive folder is not shared with the build
  account. When the files arrive, transcode them as above into `public/video/site/`, add them to
  `clips` in `src/data/palm-grove.ts`, then put 4317 and 4301 first in `seedlings.media` and all
  four into `proof.fieldLog`.
- **Per-acre projection.** The workbook covers 1 hectare only; confirm the per-acre basis first.
- **Brochure video.** "Watch: Palm Grove Explained" still lands on the 14-second aerial fallback
  until the YouTube ID is supplied.

### Revision 1b (22 Nov 2026): copy, whitespace, three colours

- Copy rewritten in plain voice; no em/en dashes, no "Not just X. It is Y." patterns. Owner-specified labels kept verbatim.
- Section padding raised to py-24 / sm:py-32 / lg:py-40, larger gaps after section heads.
- Palette cut to three colours: #033726 (text, dark bands), #006847 (buttons and links on light, number badges), #FF8D30 (single accent: CTAs on dark bands, prices, headline emphasis, play buttons). Greys and tints are mixed from #033726. Leaf #02AD4D, sun #FFCB30 and mint #B6FFD6/#EEFFFA removed.
