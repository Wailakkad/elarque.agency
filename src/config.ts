// Google Apps Script web app that appends form rows to a Google Sheet.
// Set VITE_SHEETS_ENDPOINT in .env (see .env.example).
export const SHEETS_ENDPOINT: string =
  import.meta.env.VITE_SHEETS_ENDPOINT?.trim() ?? '';

export const SITE_CONFIG = {
  // TODO: Replace with your WhatsApp number in international format without '+' or spaces (e.g. '33612345678')
  WHATSAPP_NUMBER: 'TODO_WHATSAPP_NUMBER',

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
