/**
 * Every fact this page states, in one typed module.
 *
 * Source of truth: "Palm Grove Estate Lead Generation Landing Page: Content
 * Architecture" (PDF in the repo root, cited below as "brief §n"). Copy is
 * verbatim from it. Where the main site (www.jayleadagro.com) disagrees, the
 * brief wins and the conflict is listed in HANDOVER.md.
 *
 * Photos: the Palm Grove Estate site in Osun State, from Jaylead's own drone
 * and phone (Drive folder "Site- planting", shot 20 to 29 October 2026,
 * supplied by the owner 22 Nov 2026). Videos: the owner's seedling clips,
 * sound removed, and Jaylead's own Instagram reels. No stock.
 */
import type { Interest } from '@/lib/leads/fields';

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/** One of the owner's site photos (all 1600 x 900, shot October 2026). */
function site(n: string, alt: string): Photo {
  return {
    src: `/images/site/dji-${n}.webp`,
    alt,
    width: 1600,
    height: 900,
    caption: 'Palm Grove Estate site, Osun State, October 2026',
  };
}

/**
 * What a CTA does. `pricing` and `brochure` open a form. `section` scrolls to
 * the pre-launch prices first (owner, 22 Nov 2026: "Get Pricing & Plot
 * Details" goes to the offer, and the form is filled from there, so only
 * people who have seen the price send a lead).
 */
export type CtaAction =
  | { kind: 'pricing'; interest?: Interest }
  | { kind: 'section'; target: 'pricing' }
  | { kind: 'brochure' }
  | { kind: 'whatsapp' };

export type Cta = { label: string; action: CtaAction };

/** A display headline: the plain lead-in, then the part set in the accent. */
export type Headline = readonly [plain: string, emphasis: string];

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

/** The founder's own Instagram (followed by @jaylead_ng as "Adetunji Jacob Ogunyemi"). */
export const founderInstagram = {
  handle: '@jaylead5',
  url: 'https://www.instagram.com/jaylead5/',
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
    'Buy titled oil palm farmland at Palm Grove Estate in Osun State. Jaylead plants it, farms it and sells the oil, and you receive 70% of the harvest revenue.',
  priceHook:
    'Pre-launch price: ₦4,000,000 an acre, payable in instalments over 3 or 6 months.',
  primary: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'section', target: 'pricing' },
  } satisfies Cta,
  secondaryLabel: 'Watch: Palm Grove Explained',
  /*
   * The site itself, in the owner's order: DJI_0945 first (it is also the
   * still the page shows without JavaScript), then the rest as a carousel.
   */
  photos: [
    site(
      '0945',
      'The Palm Grove Estate billboard, "Plant Once. Harvest for Decades.", standing in a cleared field beside banana plants, with a Jaylead staff member in a hi-vis vest'
    ),
    site(
      '0946',
      'A Jaylead staff member in a hi-vis vest beside the Palm Grove Estate billboard, with banana plants behind'
    ),
    site(
      '0964',
      'Drone view looking down on a cleared plot of the estate, edged by green bush, with a survey marker in one corner'
    ),
    site(
      '0965',
      'Drone view of a large cleared plot at Palm Grove Estate, ringed by thick green vegetation'
    ),
    site(
      '0967',
      'Drone view of cleared ground opening into the bush along a footpath, with markers on the plot'
    ),
    site(
      '0969',
      'Drone view down onto a cleared, pegged plot with a white survey post, bordered by banana plants and bush'
    ),
    site(
      '0976',
      'Drone view over cleared land at Palm Grove Estate, with the estate billboard and a staff member standing in front of it'
    ),
    site(
      '0970',
      'Drone view of a cleared strip running between banana plants, with a white survey post'
    ),
    site(
      '0971',
      'The Palm Grove Estate billboard on cleared land against green hills and a blue sky'
    ),
    site(
      '0972',
      'The Palm Grove Estate billboard on its posts in the middle of freshly cleared land'
    ),
  ] satisfies Photo[] as Photo[],
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
  copy: 'Nigeria uses 2.6 million tonnes of palm oil a year and grows 1.5 million. The 1.1 million tonnes it is short are imported, at a cost of over ₦1 trillion in foreign exchange every year. Palm Grove Estate is planted to supply that gap, and your plot is part of it.',
  stats: [
    { figure: '2.6M', unit: 'tonnes', label: 'needed per year' },
    { figure: '1.5M', unit: 'tonnes', label: 'produced locally' },
    { figure: '1.1M', unit: 'tonnes', label: 'shortfall' },
    { figure: '₦1T+', unit: '', label: 'spent on imports yearly' },
  ],
  cta: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'section', target: 'pricing' },
  } satisfies Cta,
};

/* ── 4 What you own ────────────────────────────────────────────────── */

export const ownership = {
  headline: ['You own the land and', 'every tree on it.'] as Headline,
  items: [
    {
      title: 'Titled land',
      line: 'A surveyed plot at Palm Grove Estate, Osun State, backed by a Deed of Assignment.',
    },
    {
      title: 'The palm trees on it',
      line: 'Improved Supergene hybrid palms bred for high yield: 60 on an acre, 150 on a hectare.',
    },
    {
      title: 'A share of the harvest',
      line: '70% of the harvest revenue, paid to you every year from the first harvest.',
    },
    {
      title: 'Freedom to sell, transfer or inherit',
      line: 'Sell it, transfer it or leave it to your children. It stays yours.',
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

export const seedlings = {
  headline: ['Every tree starts as a', 'Supergene seedling.'] as Headline,
  copy: 'Palm Grove Estate is planted with improved Supergene hybrid seedlings, the variety commercial growers choose for yield and oil content. The first batch is already in the ground.',
  /*
   * Owner's picks (22 Nov 2026): IMG_4317 and IMG_4301, then four reels from
   * @jaylead_ng. Reel facts from the posts themselves; posters are frames
   * from each reel (the covers Instagram chose are not farm footage).
   */
  media: [
    {
      kind: 'reel',
      shortcode: 'DewLWTGuVLV',
      title: 'Meet the Supergene seedlings',
      duration: '0:56',
      date: '21 October 2026',
      poster: {
        src: '/images/DewLWTGuVLV.webp',
        alt: 'A Jaylead field worker in a hi-vis vest holding up a young Supergene oil palm seedling in the nursery',
        width: 720,
        height: 900,
      },
    },
    {
      kind: 'reel',
      shortcode: 'DeR5LZmquXa',
      title: 'Small seedlings, big possibilities',
      duration: '0:11',
      date: '9 October 2026',
      poster: {
        src: '/images/DeR5LZmquXa.webp',
        alt: 'Two workers in hi-vis vests tending rows of young oil palm seedlings in the nursery',
        width: 720,
        height: 900,
      },
    },
    {
      kind: 'reel',
      shortcode: 'DfPXw4nOE5E',
      title: 'The first batch of planting',
      duration: '0:34',
      date: '2 November 2026',
      poster: {
        src: '/images/DfPXw4nOE5E.webp',
        alt: 'A newly planted oil palm seedling in fresh soil at Palm Grove Estate, captioned "first batch of planting"',
        width: 720,
        height: 900,
      },
    },
    {
      kind: 'reel',
      shortcode: 'Dfo0h6Fqp4y',
      title: 'Planting is underway in Osun',
      duration: '0:32',
      date: '12 November 2026',
      poster: {
        src: '/images/Dfo0h6Fqp4y.webp',
        alt: 'A worker watering a freshly planted oil palm seedling from a green bowl',
        width: 720,
        height: 900,
      },
    },
  ] satisfies Reel[] as Reel[],
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
  headline: ['Pre-Launch', 'Plot Prices.'] as Headline,
  includes: [
    'Titled land',
    'Palm trees planted',
    '70% share of annual harvest revenue',
    'Full legal documents',
    'No annual or maintenance fees',
  ],
  ctaLabel: 'Reserve This Plot',
  /*
   * Every "Get Pricing & Plot Details" lands here, so the section also
   * catches the visitor who has not chosen a size yet.
   */
  undecided: {
    line: 'Not sure whether an acre or a hectare suits you? Talk it through with an advisor first.',
    cta: {
      label: 'Talk to an Advisor',
      action: { kind: 'pricing', interest: 'Not sure yet' },
    } satisfies Cta,
  },
};

/* ── 7 Brochure ────────────────────────────────────────────────────── */

export const brochure = {
  headline: 'Palm Grove Estate, explained in one video.',
  copy: 'One video walks through the whole brochure: what you own, the prices, the timeline, how the 70/30 split works and the documents you receive.',
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
    action: { kind: 'section', target: 'pricing' },
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
  headline: ['From deposit to first harvest,', 'step by step.'] as Headline,
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
  year: string;
  phase: 'First Fruiting' | 'Yield Ramp-Up' | 'Peak Production';
  /** Exactly as supplied by the owner. Strings, so nothing is reformatted. */
  revenue: string;
  share: string;
};

export const earnings = {
  headline: ['How you earn', 'from your plot.'] as Headline,
  steps: [
    'The palm fruit is harvested, pressed into Crude Palm Oil (CPO) and sold commercially.',
    '70% of the revenue is paid out to land buyers.',
    'Jaylead keeps 30% to run and manage the estate.',
  ],
  /*
   * Owner, 22 Nov 2026, verbatim. Workings in
   * Palm-Grove-Revenue-Projection-Year3-10.xlsx: CPO 2.24 t/ha in Year 3,
   * 30/55/75% of the 12.5 t/ha full yield in Years 4 to 6, full from Year 7,
   * at ₦1,400,000 a tonne; your share is 70% of revenue. Per hectare only:
   * the per-acre version is still open (HANDOVER.md).
   */
  projection: {
    headline: [
      'Your Projected Harvest Income:',
      'Year 3 to Year 10',
    ] as Headline,
    intro:
      'Projection for 1 hectare (150 palm trees) at ₦1,400,000 per tonne of Crude Palm Oil. You receive 70% of the revenue.',
    columns: {
      year: 'Year',
      phase: 'Phase',
      revenue: 'Price ₦1.4M/tonne (Revenue)',
      share: 'Your 70% Share',
    },
    rows: [
      {
        year: '3',
        phase: 'First Fruiting',
        revenue: '₦3,136,000',
        share: '₦2,195,200',
      },
      {
        year: '4',
        phase: 'Yield Ramp-Up',
        revenue: '₦5,250,000',
        share: '₦3,675,000',
      },
      {
        year: '5',
        phase: 'Yield Ramp-Up',
        revenue: '₦9,625,000',
        share: '₦6,737,500',
      },
      {
        year: '6',
        phase: 'Yield Ramp-Up',
        revenue: '₦13,125,000',
        share: '₦9,187,500',
      },
      {
        year: '7',
        phase: 'Peak Production',
        revenue: '₦17,500,000',
        share: '₦12,250,000',
      },
      {
        year: '8',
        phase: 'Peak Production',
        revenue: '₦17,500,000',
        share: '₦12,250,000',
      },
      {
        year: '9',
        phase: 'Peak Production',
        revenue: '₦17,500,000',
        share: '₦12,250,000',
      },
      {
        year: '10',
        phase: 'Peak Production',
        revenue: '₦17,500,000',
        share: '₦12,250,000',
      },
    ] satisfies ProjectionRow[] as ProjectionRow[],
    disclaimer:
      'Illustrative projection per hectare, using the high scenario of ₦1,400,000 per tonne. Actual results depend on farm production and Crude Palm Oil market prices.',
  },
  cta: {
    label: 'Get My Full Projection',
    action: { kind: 'pricing' },
  } satisfies Cta,
};

/* ── 10 Legal + safety ─────────────────────────────────────────────── */

export const legal = {
  headline: ['Every plot comes with', 'papers you can check.'] as Headline,
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
    'The farm is insured through NAIC and a private insurer. You get a report every quarter from day one and an audited statement every year from the first harvest, and you are welcome to send your own auditor.',
  cta: {
    label: 'Book a Site Inspection',
    action: { kind: 'pricing', interest: 'Site inspection' },
  } satisfies Cta,
};

/* ── 11 Proof from the farm ────────────────────────────────────────── */

/**
 * One of the owner's own clips, transcoded to 720p H.264 with the sound
 * track removed (not just muted, scripts in HANDOVER.md) so it can play
 * inline, silently, while in view.
 */
export type FarmClip = {
  kind: 'clip';
  id: string;
  src: string;
  date: string;
  poster: Photo;
};

/** A clip from its file id (public/video/site, poster in images/site/posters). */
function clip(id: string, date: string, alt: string): FarmClip {
  return {
    kind: 'clip',
    id,
    src: `/video/site/${id}.mp4`,
    date,
    poster: {
      src: `/images/site/posters/${id}.webp`,
      alt,
      width: 1280,
      height: 720,
    },
  };
}

/** A photo the field log shows, with the camera's file code and the date. */
function logPhoto(n: string, alt: string, date = '20 Oct 2026'): FieldLogItem {
  const p = site(n, alt);

  return { kind: 'photo', photo: { ...p, caption: `DJI_${n} · ${date}` } };
}

export type FieldLogItem = FarmClip | { kind: 'photo'; photo: Photo };

export const proof = {
  headline: ['Photos and video from', 'the site in Osun.'] as Headline,
  /*
   * Owner, 22 Nov 2026: no stand-alone photos here. Mix the site photos
   * (including the hero's), the seedling photo and the silent clips into
   * one field log. Order is the reading order: motion, wide, close, repeat.
   */
  fieldLog: [
    clip(
      'dji-0973',
      '20 Oct 2026',
      'Slow drone pass over the Palm Grove Estate billboard on cleared land'
    ),
    logPhoto(
      '0952',
      'Green hills and bush around the Palm Grove Estate site, seen from the drone'
    ),
    {
      kind: 'photo',
      photo: {
        src: '/images/site/seedling-4623.webp',
        alt: 'A young oil palm seedling, its first fronds opening, newly planted in the grass at Palm Grove Estate',
        width: 1200,
        height: 1600,
        caption: 'Seedling in the ground · 29 Oct 2026',
      },
    },
    logPhoto(
      '0965',
      'Drone view of a large cleared plot ringed by thick green vegetation'
    ),
    logPhoto(
      '0941',
      'A worker in a hi-vis vest crossing cleared land beside the estate billboard'
    ),
    clip(
      'dji-0948',
      '20 Oct 2026',
      'Drone footage of a Jaylead staff member at the estate billboard beside banana plants and cleared bush'
    ),
    logPhoto(
      '0971',
      'The Palm Grove Estate billboard on cleared land against green hills'
    ),
    logPhoto(
      '0969',
      'Drone view down onto a cleared, pegged plot with a white survey post'
    ),
    logPhoto(
      '0955',
      'Banana plants at the edge of the cleared land, seen from above'
    ),
    logPhoto(
      '0975',
      'A surveyor holding a measuring pole on newly cleared ground, from the drone'
    ),
    logPhoto(
      '0956',
      'A cleared slope on the estate running up to a line of bush and trees'
    ),
    logPhoto(
      '0976',
      'The estate billboard from the air, with a staff member standing in front of it'
    ),
    logPhoto(
      '0951',
      'Rolling farmland and bush around Palm Grove Estate, seen from the drone'
    ),
  ] satisfies FieldLogItem[] as FieldLogItem[],
  /*
   * Brief §11 asks for a 2 to 3 line MD message. Not supplied yet; this is
   * his own words from "Our story" (Instagram reel DZMkHQTKNWE), and the
   * quote opens that reel (owner, 22 Nov 2026).
   */
  founder: {
    name: 'Adetunji Jacob Ogunyemi',
    role: 'Managing Director',
    quote: 'A personal agenda over time grew to become a collective agenda.',
    story: {
      kind: 'reel',
      shortcode: 'DZMkHQTKNWE',
      title: 'Our story, told by the founder',
      duration: '2:53',
      date: '5 June 2026',
      poster: {
        src: '/images/founder-portrait-agbada.webp',
        alt: 'Adetunji Jacob Ogunyemi in a green kaftan, outdoors by palm trees',
        width: 1440,
        height: 1440,
      },
    } satisfies Reel,
    instagram: founderInstagram,
  },
  cta: {
    label: 'Get Pricing & Plot Details',
    action: { kind: 'section', target: 'pricing' },
  } satisfies Cta,
};

/* ── 12 FAQs (one array: accordion, FAQPage JSON-LD and llms.txt) ──── */

export type Faq = { question: string; answer: string; cta: Cta };

export const faqHeadline: Headline = ['What buyers', 'ask us most.'];

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
    cta: {
      label: 'Get Pricing & Plot Details',
      action: { kind: 'section', target: 'pricing' },
    },
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
    cta: {
      label: 'Get Pricing & Plot Details',
      action: { kind: 'section', target: 'pricing' },
    },
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
    cta: {
      label: 'Get Pricing & Plot Details',
      action: { kind: 'section', target: 'pricing' },
    },
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
    cta: {
      label: 'Get Pricing & Plot Details',
      action: { kind: 'section', target: 'pricing' },
    },
  },
];

/* ── 13 Final CTA ──────────────────────────────────────────────────── */

export const finalCta = {
  headline: ['Reserve your plot at the', 'pre-launch price.'] as Headline,
  line: 'Leave your details and an advisor will send the plot prices and payment plan to your WhatsApp.',
  below: 'No spam. One advisor, one conversation about your plot.',
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
  headline: ['Thank you.', 'We have received your details.'] as Headline,
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
