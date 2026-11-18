/**
 * Every fact this page states, in one typed module.
 *
 * Source of truth: "Palm Grove Estate Lead Generation Landing Page: Content
 * Architecture" (PDF in the repo root, cited below as "brief §n"). Copy is
 * verbatim from it. Where the main site (www.jayleadagro.com) disagrees, the
 * brief wins and the conflict is listed in HANDOVER.md.
 *
 * Photos are Jaylead's own material, copied from the main site repo
 * (../jaylead.ng/public). None of it is confirmed as Palm Grove Estate, so
 * captions say "Jaylead farmland", exactly as the main site does. No stock.
 */
import type { Interest } from '@/lib/leads/fields';

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/** What a CTA does. Every CTA but one opens a form (brief §2). */
export type CtaAction =
  | { kind: 'pricing'; interest?: Interest }
  | { kind: 'brochure' }
  | { kind: 'whatsapp' };

export type Cta = { label: string; action: CtaAction };

/* ── Business ──────────────────────────────────────────────────────── */

export const business = {
  name: 'Jaylead AgriEstate',
  legalName: 'Jaylead AgriEstate Limited',
  rcNumber: '9492571',
  tagline: 'Building Wealth. Securing Futures.',
  phoneDisplay: '+234 916 099 2539',
  phoneE164: '+2349160992539',
  whatsappNumber: '2349160992539',
  email: 'jayleadagriestate@gmail.com',
  website: 'www.jayleadagro.com',
  address: {
    street: 'Tipper Garage Roundabout, Beside Mazabs Event Centre',
    locality: 'Tanke, Ilorin',
    region: 'Kwara State',
    full: 'Tipper Garage Roundabout, Beside Mazabs Event Centre, Tanke, Ilorin, Kwara State',
  },
  socialHandle: '@jaylead_ng',
  /*
   * Instagram and TikTok URLs confirmed in the main site's settings seed.
   * Facebook's page URL is unconfirmed (HANDOVER.md), so it renders as text.
   */
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/jaylead_ng/' },
    { label: 'Facebook', url: null },
    { label: 'TikTok', url: 'https://www.tiktok.com/@jaylead_ng' },
  ],
  managingDirector: 'Adetunji Jacob Ogunyemi',
} as const;

export const estate = {
  name: 'Palm Grove Estate',
  location: 'Osun State',
} as const;

/** Brief §0: the pre-filled click-to-chat message, verbatim. */
export const whatsappMessage =
  "Hi Jaylead, I'd like to know more about Palm Grove Estate.";

/* ── 1 Hero ────────────────────────────────────────────────────────── */

export const hero = {
  headline: ['Own the Land.', 'Grow the Wealth.', 'Build the Legacy.'],
  subheadline:
    'Own titled oil palm farmland in Palm Grove Estate, Osun State. Jaylead plants and manages it, and 70% of the harvest revenue goes to land buyers.',
  priceHook:
    'Pre-launch offer: from ₦4,000,000 per acre, with instalment payment available.',
  primary: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'pricing' },
  } satisfies Cta,
  secondaryLabel: 'Watch the Brochure Video',
  /*
   * Brief asks for the planted first batch. Not supplied yet: this is the
   * main site's own drone still, captioned as the main site captions it.
   */
  photo: {
    src: '/images/aerial-fields.webp',
    alt: 'Aerial view over Jaylead farmland: a patchwork of cultivated plots, crop rows and tree cover under a pale sky',
    width: 1276,
    height: 718,
    caption: 'Jaylead farmland from the air, September 2026',
  } satisfies Photo,
};

/* ── 2 Trust strip ─────────────────────────────────────────────────── */

export const trustBadges = [
  { label: 'CAC Registered', detail: 'RC No. 9492571' },
  { label: 'SCUML Certified' },
  { label: 'TIN Validated' },
  { label: 'NAIC Farm Asset Insured' },
  { label: 'Independent Audits Welcome' },
] as const;

/* ── 3 The opportunity ─────────────────────────────────────────────── */

export const opportunity = {
  headline: 'Nigeria Imports What It Should Be Growing.',
  copy: 'Nigeria needs 2.6 million tonnes of palm oil every year but produces only 1.5 million tonnes. The 1.1 million-tonne shortfall costs the country over ₦1 trillion in foreign exchange annually. Palm Grove Estate puts your money into the ground to help close that gap.',
  stats: [
    { figure: '2.6M', unit: 'tonnes', label: 'needed per year' },
    { figure: '1.5M', unit: 'tonnes', label: 'produced locally' },
    { figure: '1.1M', unit: 'tonnes', label: 'shortfall' },
    { figure: '₦1T+', unit: '', label: 'spent on imports yearly' },
  ],
  cta: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'pricing' },
  } satisfies Cta,
};

/* ── 4 What you own ────────────────────────────────────────────────── */

export const ownership = {
  headline: 'This Is Not Just an Investment. It Is Land You Own.',
  items: [
    {
      title: 'Titled land',
      line: 'Your own plot in the Palm Grove Estate, Osun State.',
    },
    {
      title: 'The palm trees on it',
      line: 'Improved Supergene high-yield hybrid palms.',
    },
    {
      title: 'A share of the harvest',
      line: '70% of revenue goes to land buyers every year from first harvest.',
    },
    {
      title: 'Freedom to sell, transfer or inherit',
      line: 'Your plot is yours to pass on.',
    },
  ],
  strip:
    'No annual fees. No maintenance fees. Jaylead plants, farms and manages everything.',
  cta: {
    label: 'Request Full Details',
    action: { kind: 'pricing' },
  } satisfies Cta,
};

/* ── 5 Our seedlings ───────────────────────────────────────────────── */

/** An Instagram reel, played in a pop-up after a tap (nothing loads before). */
export type Reel = {
  kind: 'reel';
  shortcode: string;
  title: string;
  duration: string;
  date: string;
  poster: Photo;
};

export type SeedlingMedia = Reel | { kind: 'photo'; photo: Photo };

export const seedlings = {
  headline: 'Healthy Seedlings. A Strong Start.',
  copy: 'Every tree in Palm Grove Estate begins as an improved Supergene high-yield hybrid seedling. The first batch has already been planted.',
  /*
   * Brief §5 wants 3 to 4 real photos: nursery, seedling close-up,
   * transplanting, the first planted batch. None supplied yet (see
   * HANDOVER.md). Until then the rail mixes two of Jaylead's own Instagram
   * reels (tap to play in a pop-up, the main site's format) with a dated
   * field photo. Add real seedling photos to the front of this array.
   * Reel facts (title, duration, date) are from ../jaylead.ng/src/data/instagram.ts.
   */
  media: [
    {
      kind: 'reel',
      shortcode: 'DdJx-XQqgvp',
      title: 'Soil testing before planting',
      duration: '0:04',
      date: '11 September 2026',
      poster: {
        src: '/images/DdJx-XQqgvp.webp',
        alt: 'A soil tester pushed into dark farm soil among young plants',
        width: 720,
        height: 900,
      },
    },
    {
      kind: 'reel',
      shortcode: 'DdD4lwIummX',
      title: 'On site: getting the land ready',
      duration: '0:15',
      date: '9 September 2026',
      poster: {
        src: '/images/DdD4lwIummX.webp',
        alt: 'The Managing Director in a hi-vis vest on overgrown farmland',
        width: 480,
        height: 600,
      },
    },
    {
      kind: 'photo',
      photo: {
        src: '/images/aerial-perimeter.webp',
        alt: 'Drone view of open farmland with a long white perimeter fence and site buildings',
        width: 1276,
        height: 718,
        caption: 'Jaylead farmland and perimeter fence, September 2026',
      },
    },
  ] satisfies SeedlingMedia[] as SeedlingMedia[],
  cta: {
    label: 'Book a Site Inspection',
    action: { kind: 'pricing', interest: 'Site inspection' },
  } satisfies Cta,
};

/* ── 6 Pricing ─────────────────────────────────────────────────────── */

export type Plot = {
  id: 'acre' | 'hectare';
  size: string;
  interest: Interest;
  trees: number;
  price: number;
  deposit: number;
  balance: string;
};

export const plots: Plot[] = [
  {
    id: 'acre',
    size: '1 Acre',
    interest: '1 Acre',
    trees: 60,
    price: 4_000_000,
    deposit: 1_000_000,
    balance: 'Pay over 3 or 6 months',
  },
  {
    id: 'hectare',
    size: '1 Hectare',
    interest: '1 Hectare',
    trees: 150,
    price: 10_000_000,
    deposit: 2_500_000,
    balance: 'Pay over 3 or 6 months',
  },
];

export const pricing = {
  eyebrow: 'Pre-launch offer',
  headline: 'Pre-Launch Plot Prices.',
  includes: [
    'Titled land',
    'Palm trees planted',
    '70% share of annual harvest revenue',
    'Full legal documents',
    'No annual or maintenance fees',
  ],
  ctaLabel: 'Reserve This Plot',
};

/* ── 7 Brochure ────────────────────────────────────────────────────── */

export const brochure = {
  headline: 'Palm Grove Estate Brochure Video',
  copy: 'Watch the video to see the whole Palm Grove Estate brochure explained: what you own, the prices, the timeline, how the 70/30 revenue split works, and your legal documents.',
  bullets: [
    'Plot prices and payment plans',
    'Estate phases and timeline',
    'Your legal documents and revenue split',
  ],
  cta: {
    label: 'Download the Brochure (PDF)',
    action: { kind: 'brochure' },
  } satisfies Cta,
  endOverlay: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'pricing' },
  } satisfies Cta,
  /*
   * Not supplied yet (HANDOVER.md). Set the YouTube video ID (captions on)
   * and the PDF path under /public. Until then the main site's 14-second
   * aerial plays in the video slot, and the thank-you page offers the
   * brochure on WhatsApp instead of a download.
   */
  youTubeId: null as string | null,
  pdfUrl: null as string | null,
  fallbackVideo: {
    src: '/video/aerial.mp4',
    poster: '/images/aerial-site.webp',
    caption:
      'Silent drone flight over Jaylead farmland, September 2026. The full brochure video is coming soon.',
  },
};

/** Brief §15: when no PDF exists yet, the brochure is sent on WhatsApp. */
export const brochureWhatsappMessage =
  'Hi Jaylead, please send me the Palm Grove Estate brochure.';

/* ── 8 Timeline ────────────────────────────────────────────────────── */

export const timeline = {
  headline: 'From Deposit to Harvest: What Happens and When.',
  phases: [
    {
      phase: 'Phase 1',
      when: 'Pre-launch',
      what: 'The estate layout is mapped into Hectare and Acre zones. You get a virtual plot allocation right after your deposit.',
    },
    {
      phase: 'Phase 2',
      when: 'Months 1 to 3',
      what: 'Land is cleared and levelled, physical plot allocation is done (you can visit and identify your plot), seedlings are transplanted, and security infrastructure is set up.',
    },
    {
      phase: 'Phase 3',
      when: 'Years 3 to 4',
      what: 'The processing mill is commissioned, the first fruit bunches are harvested, and the 70/30 revenue split begins.',
    },
    {
      phase: 'Phase 4',
      when: 'Year 4 onward',
      what: 'Yields ramp up and peak in Years 8 to 15. Crude Palm Oil is sold commercially and annual distributions are paid to land buyers. You get quarterly and annual reports.',
    },
  ],
  cta: {
    label: 'Start My Plot Application',
    action: { kind: 'pricing' },
  } satisfies Cta,
};

/* ── 9 Earnings + projection ───────────────────────────────────────── */

export type ProjectionRow = {
  /** "Year 3", or a group label like "Years 5 to 7". */
  years: string;
  /** Exactly as supplied by finance. Strings, so nothing is ever reformatted. */
  totalRevenue: string;
  buyerShare: string;
};

export const earnings = {
  headline: 'Your Share of Every Harvest.',
  steps: [
    'Palm fruit is harvested and processed into Crude Palm Oil (CPO), which is sold commercially.',
    '70% of the revenue is distributed to land buyers.',
    '30% is retained by Jaylead to manage the estate.',
  ],
  disclaimer:
    'Illustrative projection based on stated assumptions. Actual results depend on farm production and Crude Palm Oil market prices.',
  /*
   * Brief §9: the 30-year CPO projection from the Jaylead finance document.
   * NOT SUPPLIED YET. Paste rows exactly as given: do not round or
   * recalculate. The table, toggle and assumptions render once rows exist.
   */
  projection: {
    acre: [] as ProjectionRow[],
    hectare: [] as ProjectionRow[],
    /** First N rows shown before "See all years" on small screens. */
    visibleRows: 4,
    assumptions: [] as string[],
  },
  cta: {
    label: 'Get My Full Projection',
    action: { kind: 'pricing' },
  } satisfies Cta,
};

/* ── 10 Legal + safety ─────────────────────────────────────────────── */

export const legal = {
  headline: 'Documented. Insured. Open to Audit.',
  documents: [
    'Deed of Assignment',
    'Registered Survey',
    'Layout Plan',
    'Payment Receipt',
  ],
  protections: [
    {
      title: 'Legal and regulatory',
      line: 'CAC registered, SCUML certified, TIN validated.',
    },
    {
      title: 'Security',
      line: 'Perimeter fencing, CCTV, security personnel and community partnership.',
    },
    {
      title: 'Environment',
      line: 'Soil testing, disease monitoring, irrigation and drainage.',
    },
    {
      title: 'Market',
      line: 'Product diversification, strategic pricing and commodity price hedging.',
    },
  ],
  reporting:
    'NAIC farm asset insurance plus private insurance. Quarterly reports from day one. Audited annual statements from first harvest. Independent audits welcome, including your own personal auditor.',
  cta: {
    label: 'Book a Site Inspection',
    action: { kind: 'pricing', interest: 'Site inspection' },
  } satisfies Cta,
};

/* ── 11 Proof from the farm ────────────────────────────────────────── */

export const proof = {
  headline: 'See the Work on the Ground.',
  photos: [
    {
      src: '/images/aerial-site.webp',
      alt: 'Drone view of green farmland with crop rows, a dirt track, a fence line and farm buildings',
      width: 1276,
      height: 718,
      caption: 'Drone aerial of Jaylead farmland, 17 September 2026',
    },
    {
      src: '/images/office-logo-wall.webp',
      alt: 'The illuminated Jaylead AgriEstate logo sign on the wall of the Tanke, Ilorin office',
      width: 720,
      height: 576,
      caption: 'Our office, Tanke, Ilorin',
    },
  ] satisfies Photo[] as Photo[],
  /*
   * Brief §11 asks for a 2 to 3 line MD message. Not supplied yet; this is
   * his own words from the main site's "Our story" (Instagram reel
   * DZMkHQTKNWE). Replace with the message once written.
   */
  founder: {
    name: 'Adetunji Jacob Ogunyemi',
    role: 'Managing Director',
    quote: 'A personal agenda over time grew to become a collective agenda.',
    photo: {
      src: '/images/founder-portrait-suit.webp',
      alt: 'Adetunji Jacob Ogunyemi, Managing Director of Jaylead AgriEstate',
      width: 1440,
      height: 1440,
    } satisfies Photo,
  },
  /* Brief §11: real testimonials only. None yet, so the block is omitted. */
  testimonials: [] as { quote: string; name: string; place: string }[],
  cta: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'pricing' },
  } satisfies Cta,
};

/* ── 12 FAQs (one array: accordion, FAQPage JSON-LD and llms.txt) ──── */

export type Faq = { question: string; answer: string; cta: Cta };

export const faqs: Faq[] = [
  {
    question: 'Is Jaylead AgriEstate legally registered?',
    answer:
      "Yes. Jaylead AgriEstate Limited is registered with the CAC (RC No. 9492571), certified by SCUML and validated for tax (TIN). The estate's farm assets are insured through NAIC, plus private insurance. We also welcome independent audits.",
    cta: {
      label: 'Request Verification Documents',
      action: { kind: 'pricing' },
    },
  },
  {
    question: 'What exactly do I own when I buy a plot?',
    answer:
      'You own the titled land, the oil palm trees planted on it, and a share of the annual harvest proceeds. You also have the right to sell, transfer or inherit your plot.',
    cta: { label: 'Get Pricing & Plot Details', action: { kind: 'pricing' } },
  },
  {
    question: 'How much does a plot cost and can I pay in instalments?',
    answer:
      'At the pre-launch price, 1 acre (60 trees) is ₦4,000,000 and 1 hectare (150 trees) is ₦10,000,000. You start with a first deposit of ₦1,000,000 for an acre or ₦2,500,000 for a hectare, then pay the balance over 3 or 6 months.',
    cta: {
      label: 'Reserve My Plot',
      action: { kind: 'pricing', interest: '1 Acre' },
    },
  },
  {
    question: 'When do I start earning?',
    answer:
      'The first fruit bunches are harvested in Years 3 to 4, once the processing mill is commissioned. From the first harvest, 70% of the revenue is distributed to land buyers. Yields ramp up from Year 4 and peak in Years 8 to 15.',
    cta: { label: 'Get My Full Projection', action: { kind: 'pricing' } },
  },
  {
    question: 'How does the 70/30 revenue split work?',
    answer:
      'Crude Palm Oil from the estate is sold commercially. Seventy percent (70%) of the revenue is distributed to land buyers every year, and Jaylead keeps thirty percent (30%) to manage the estate.',
    cta: { label: 'Get My Full Projection', action: { kind: 'pricing' } },
  },
  {
    question: 'Are there any annual or maintenance fees?',
    answer:
      'No. There are no annual fees and no maintenance fees. Jaylead plants, farms and manages the estate. The 30% management share is the only deduction from harvest revenue.',
    cta: { label: 'Get Pricing & Plot Details', action: { kind: 'pricing' } },
  },
  {
    question: 'Which documents will I receive?',
    answer:
      'For each plot you receive a Deed of Assignment, a Registered Survey, a Layout Plan and a Payment Receipt.',
    cta: { label: 'Download the Brochure', action: { kind: 'brochure' } },
  },
  {
    question: 'Can I visit the estate and see my plot?',
    answer:
      'Yes. Site inspections can be booked. Physical plot allocation happens in Months 1 to 3, when buyers can visit and identify their plot. Buyers also get a virtual plot allocation right after the deposit.',
    cta: {
      label: 'Book a Site Inspection',
      action: { kind: 'pricing', interest: 'Site inspection' },
    },
  },
  {
    question: 'Is my return guaranteed? What are the risks?',
    answer:
      'Your income comes from real farm production and Crude Palm Oil sales, so it depends on harvest results and market prices. It is not a bank deposit. Jaylead manages these risks through legal compliance, security (fencing, CCTV, security personnel), soil testing and disease monitoring, irrigation and drainage, product diversification and commodity price hedging, with quarterly reports and independent audits open to every buyer.',
    cta: { label: 'Talk to an Advisor', action: { kind: 'pricing' } },
  },
  {
    question: 'How will I know how the estate and my income are doing?',
    answer:
      'You receive quarterly reports from day one and audited annual statements from the first harvest. You are also free to bring your own personal auditor.',
    cta: { label: 'Get Pricing & Plot Details', action: { kind: 'pricing' } },
  },
  {
    question: 'Can I buy from outside Nigeria?',
    answer:
      'Yes, you can speak to an advisor about buying from abroad. After your deposit you receive a virtual plot allocation, and you can visit the estate and identify your plot once physical allocation is done.',
    cta: {
      label: 'Talk to an Advisor on WhatsApp',
      action: { kind: 'whatsapp' },
    },
  },
  {
    question: 'How do I get started?',
    answer:
      'Fill in the short form or message us on WhatsApp. An advisor will contact you, help you choose a plot size, and guide you through the deposit and your documents.',
    cta: { label: 'Get Pricing & Plot Details', action: { kind: 'pricing' } },
  },
];

/* ── 13 Final CTA ──────────────────────────────────────────────────── */

export const finalCta = {
  headline: 'Your Money Can Farm While You Sleep.',
  line: 'Tell us where to send your plot prices, payment plan and details.',
  below: 'No spam. An advisor will contact you shortly.',
  badges: [
    'CAC RC 9492571',
    'SCUML Certified',
    'TIN Validated',
    'NAIC Insured',
  ],
};

/* ── 14 Footer ─────────────────────────────────────────────────────── */

export const footer = {
  disclaimer:
    'Returns depend on farm production and market prices. Projections are illustrative. Please review all documents before purchase.',
  links: [
    { label: 'Privacy Policy', path: '/legal/privacy-policy' },
    { label: 'Terms', path: '/legal/terms' },
  ],
};

/* ── 15 Thank-you ──────────────────────────────────────────────────── */

export const thankYou = {
  headline: 'Thank you. We have received your details.',
  next: 'An advisor will contact you shortly on WhatsApp or by phone to help you choose a plot and answer your questions.',
  whatsappLabel: 'Chat with an Advisor on WhatsApp now',
  inspectionLabel: 'Book a Site Inspection',
  inspectionMessage:
    "Hi Jaylead, I'd like to book a site inspection at Palm Grove Estate.",
};

/* ── SEO ───────────────────────────────────────────────────────────── */

export const seo = {
  title: 'Palm Grove Estate, Osun: Own Titled Oil Palm Farmland | Jaylead',
  description:
    'Own titled oil palm farmland at Palm Grove Estate, Osun State, from ₦4,000,000 per acre with instalments. Jaylead plants and manages it; 70% of harvest revenue goes to land buyers.',
};
