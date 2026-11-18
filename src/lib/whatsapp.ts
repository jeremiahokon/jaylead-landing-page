import { business, whatsappMessage } from '@/data/palm-grove';

/**
 * A plain wa.me link with a URL-encoded prefilled message. A string, so every
 * WhatsApp CTA is an ordinary <a href> that works with JavaScript off.
 */
export const buildWhatsAppLink = (message: string = whatsappMessage) =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
