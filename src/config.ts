export const SITE_CONFIG = {
  // WhatsApp number in international format, digits only (no '+' or spaces)
  WHATSAPP_NUMBER: '212652700293',

  CONTACT_EMAIL: 'akkadouail8@gmail.com',

  // TODO: Replace with your live production URL (e.g. 'https://elarque.studio')
  SITE_URL: 'TODO_SITE_URL',

  INSTAGRAM_URL: 'https://www.instagram.com/elarque.ai.creative.studio/',

  FACEBOOK_URL: 'https://www.facebook.com/profile.php?id=61596389627612',
} as const;

export function getWhatsAppUrl(message: string): string {
  const number = SITE_CONFIG.WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getContactMailtoUrl(): string {
  return `mailto:${SITE_CONFIG.CONTACT_EMAIL}`;
}
