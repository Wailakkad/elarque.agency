// Pricing source of truth for the Offers section (src/sections/OffersSection.tsx).
// Edit prices, copy, items and WhatsApp messages here — not in the component.

export interface LocalizedText {
  en: string;
  fr: string;
}

export interface OfferItem {
  label: LocalizedText;
  /** false = shown muted with a dash (not included) */
  included: boolean;
}

export interface Offer {
  id: string;
  tag: LocalizedText;
  name: LocalizedText;
  /** USD, one-time price shown on the card */
  price: number;
  /** À-la-carte value used for the struck-through comparison and savings % */
  menuValue: number;
  forWho: LocalizedText;
  tagline: LocalizedText;
  items: OfferItem[];
  /** Extra included deliverables, rendered with a BONUS tag */
  bonus: LocalizedText[];
  revisions: LocalizedText;
  delivery: LocalizedText;
  featured: boolean;
  badge: LocalizedText | null;
  whatsappText: LocalizedText;
}

/** When false, the founding-client pill in the section header is hidden. */
export const FOUNDING_OFFER_ACTIVE = true;

/** À-la-carte unit prices (USD) used for the value comparison. */
export const A_LA_CARTE = {
  adCreative: 15,
  socialDesign: 12,
  reel: 59,
  landingPage: 249,
} as const;

export const OFFERS: Offer[] = [
  {
    id: 'starter',
    tag: { en: 'OFFER 01', fr: 'OFFRE 01' },
    name: { en: 'Starter Ad Pack', fr: 'Pack Annonces Starter' },
    price: 79,
    menuValue: 99,
    forWho: {
      en: 'Trying ELARQUE on one product',
      fr: 'Tester ELARQUE sur un seul produit',
    },
    tagline: {
      en: 'Start with five ads that look like a real campaign.',
      fr: "Commencez par cinq annonces qui ont l'allure d'une vraie campagne.",
    },
    items: [
      {
        label: { en: '5 AI ad creatives', fr: '5 visuels publicitaires IA' },
        included: true,
      },
      {
        label: { en: '2 social designs', fr: '2 créations social' },
        included: true,
      },
      {
        label: {
          en: '3 hook headline ideas',
          fr: '3 idées de titres accrocheurs',
        },
        included: true,
      },
      { label: { en: 'Reels', fr: 'Reels' }, included: false },
      {
        label: { en: 'Landing page', fr: 'Landing page' },
        included: false,
      },
    ],
    bonus: [],
    revisions: { en: '1 revision round', fr: '1 série de révisions' },
    delivery: {
      en: '3 to 5 working days',
      fr: 'Délai : 3 à 5 jours ouvrés',
    },
    featured: false,
    badge: null,
    whatsappText: {
      en: "Hi ELARQUE, I'd like the Starter Ad Pack.",
      fr: 'Bonjour ELARQUE, je souhaite le Pack Annonces Starter.',
    },
  },
  {
    id: 'growth',
    tag: { en: 'OFFER 02', fr: 'OFFRE 02' },
    name: { en: 'Growth Bundle', fr: 'Bundle Croissance' },
    price: 199,
    menuValue: 281,
    forWho: {
      en: 'A product that needs a full week of content',
      fr: "Un produit qui a besoin d'une semaine de contenu",
    },
    tagline: {
      en: 'A week of content, ready to post.',
      fr: 'Une semaine de contenu, prête à publier.',
    },
    items: [
      {
        label: { en: '10 AI ad creatives', fr: '10 visuels publicitaires IA' },
        included: true,
      },
      {
        label: { en: '6 social designs', fr: '6 créations social' },
        included: true,
      },
      { label: { en: '1 short Reel', fr: '1 Reel court' }, included: true },
      {
        label: {
          en: 'Hook pack and 10 captions',
          fr: "Pack d'accroches et 10 légendes",
        },
        included: true,
      },
      {
        label: { en: 'Landing page', fr: 'Landing page' },
        included: false,
      },
    ],
    bonus: [],
    revisions: { en: '2 revision rounds', fr: '2 séries de révisions' },
    delivery: {
      en: '5 to 7 working days',
      fr: 'Délai : 5 à 7 jours ouvrés',
    },
    featured: true,
    badge: { en: 'Most chosen', fr: 'Le plus choisi' },
    whatsappText: {
      en: "Hi ELARQUE, I'd like the Growth Bundle.",
      fr: 'Bonjour ELARQUE, je souhaite le Bundle Croissance.',
    },
  },
  {
    id: 'launch',
    tag: { en: 'OFFER 03', fr: 'OFFRE 03' },
    name: { en: 'Launch Kit', fr: 'Kit Lancement' },
    price: 449,
    menuValue: 688,
    forWho: {
      en: 'A new or relaunching brand that needs ads and a website',
      fr: 'Une marque nouvelle ou en relance qui a besoin d’annonces et d’un site',
    },
    tagline: {
      en: 'Ads, Reels and a website, all ready to launch.',
      fr: 'Annonces, Reels et site web, prêts à lancer.',
    },
    items: [
      {
        label: {
          en: '15 AI ad creatives',
          fr: '15 visuels publicitaires IA',
        },
        included: true,
      },
      {
        label: { en: '8 social designs', fr: '8 créations social' },
        included: true,
      },
      { label: { en: '2 short Reels', fr: '2 Reels courts' }, included: true },
      {
        label: {
          en: '1 responsive landing page with WhatsApp link and basic SEO',
          fr: '1 landing page responsive avec lien WhatsApp et SEO de base',
        },
        included: true,
      },
      {
        label: {
          en: 'Hook pack, captions and a mini brand style sheet (colours, fonts, tone)',
          fr: "Pack d'accroches, légendes et mini charte de marque (couleurs, polices, ton)",
        },
        included: true,
      },
    ],
    bonus: [],
    revisions: { en: '2 revision rounds', fr: '2 séries de révisions' },
    delivery: {
      en: '7 to 10 working days',
      fr: 'Délai : 7 à 10 jours ouvrés',
    },
    featured: false,
    badge: { en: 'Best value', fr: 'Meilleur rapport' },
    whatsappText: {
      en: "Hi ELARQUE, I'd like the Launch Kit.",
      fr: 'Bonjour ELARQUE, je souhaite le Kit Lancement.',
    },
  },
];
