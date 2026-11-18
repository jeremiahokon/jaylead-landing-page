/**
 * The page's single JSON-LD @graph: WebSite + WebPage + the business
 * (RealEstateAgent + Organization, the same narrowest type the main site
 * uses) + the two plots as Products with Offers + FAQPage, from the same
 * `faqs` array the accordion and /llms.txt render. No rating or review
 * markup, and no return or yield figures.
 */
import { absolute, mainSiteUrl, siteKeywords, siteUrl } from '@/lib/site';

import { business, estate, faqs, hero, plots, seo } from '@/data/palm-grove';

const id = (fragment: string) => `${siteUrl}/#${fragment}`;

export function pageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url: siteUrl,
        name: `${estate.name} by ${business.name}`,
        inLanguage: 'en-NG',
        publisher: { '@id': id('business') },
      },
      {
        '@type': 'WebPage',
        '@id': id('webpage'),
        url: absolute('/'),
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': id('website') },
        about: { '@id': id('business') },
        primaryImageOfPage: absolute(hero.photo.src),
        inLanguage: 'en-NG',
      },
      {
        '@type': ['RealEstateAgent', 'Organization'],
        '@id': id('business'),
        name: business.name,
        legalName: business.legalName,
        slogan: business.tagline,
        url: mainSiteUrl,
        logo: absolute('/brand/jaylead-mark-512.png'),
        image: absolute('/images/office-logo-wall.webp'),
        telephone: business.phoneE164,
        email: business.email,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'CAC RC',
          value: business.rcNumber,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.address.street,
          addressLocality: 'Ilorin',
          addressRegion: 'Kwara',
          addressCountry: 'NG',
        },
        areaServed: [
          { '@type': 'State', name: 'Osun' },
          { '@type': 'State', name: 'Kwara' },
          { '@type': 'Country', name: 'Nigeria' },
        ],
        founder: {
          '@type': 'Person',
          name: business.managingDirector,
          jobTitle: 'Managing Director',
        },
        currenciesAccepted: 'NGN',
        keywords: siteKeywords.join(', '),
        sameAs: [
          mainSiteUrl,
          ...business.socials.flatMap((s) => (s.url ? [s.url] : [])),
        ],
      },
      ...plots.map((p) => ({
        '@type': 'Product',
        '@id': id(`plot-${p.id}`),
        name: `${p.size} plot, ${estate.name}`,
        description: `${p.size} of titled farmland with ${p.trees} Supergene oil palms at ${estate.name}, ${estate.location}. Planted and managed by ${business.name}.`,
        category: 'Agricultural land',
        brand: { '@id': id('business') },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'NGN',
          price: p.price,
          availability: 'https://schema.org/PreOrder',
          seller: { '@id': id('business') },
          url: absolute('/#pricing'),
        },
      })),
      {
        '@type': 'FAQPage',
        '@id': id('faq'),
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}
