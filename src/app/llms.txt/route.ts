/**
 * /llms.txt: the page's facts in plain text for answer engines. Built from
 * the same data module, and the same `faqs` array, as the page and JSON-LD.
 */
import { absolute } from '@/lib/site';
import { naira } from '@/lib/utils';

import {
  brochure,
  business,
  earnings,
  estate,
  faqs,
  hero,
  legal,
  plots,
  timeline,
} from '@/data/palm-grove';

export function GET() {
  const body = [
    `# ${estate.name}, ${estate.location}, by ${business.legalName}`,
    '',
    `> ${hero.subheadline}`,
    '',
    `Page: ${absolute('/')}`,
    `Company: ${business.legalName}, CAC RC ${business.rcNumber}. Office: ${business.address.full}. Phone/WhatsApp: ${business.phoneDisplay}. Email: ${business.email}.`,
    '',
    '## Pre-launch plot prices',
    ...plots.map(
      (p) =>
        `- ${p.size}: ${p.trees} oil palm trees, ${naira(p.price)}. First deposit ${naira(p.deposit)}; balance: ${p.balance.toLowerCase()}.`
    ),
    '',
    '## How you earn',
    ...earnings.steps.map((s) => `- ${s}`),
    `- ${earnings.disclaimer}`,
    '',
    '## Timeline',
    ...timeline.phases.map((p) => `- ${p.phase} (${p.when}): ${p.what}`),
    '',
    '## Documents for each plot',
    `- ${legal.documents.join(', ')}`,
    '',
    '## Brochure',
    `- ${brochure.bullets.join('; ')}.`,
    '',
    '## Frequently asked questions',
    ...faqs.flatMap((f) => ['', `### ${f.question}`, f.answer]),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
