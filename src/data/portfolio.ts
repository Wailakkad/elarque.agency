// To replace with real projects, drop images in /public/portfolio/, update the image path and set isPlaceholder to false.

export type PortfolioCategory = 'Ad creatives' | 'Social' | 'Landing pages';

export type PortfolioAspectRatio = '4:5' | '1:1' | '9:16' | '16:9' | '3:2';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  brandName: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: PortfolioAspectRatio;
  frameShape: 'arch' | 'rect';
  note: {
    concept: string;
    hook: string;
    whyItWorks: string;
  };
  isPlaceholder: boolean;
}

export const HERO_FRAMES = [
  {
    id: 'hero-1',
    image: '/src/assets/images/hero_serum_travertine_1795194803968.jpg',
    alt: 'AI-created: amber glass dropper serum resting on a carved travertine arch plinth in warm window light',
    caption: 'Velora — Botanical Barrier Serum',
  },
  {
    id: 'hero-2',
    image: '/src/assets/images/hero_balm_alabaster_1795194804348.jpg',
    alt: 'AI-created: matte ceramic cream jar revealing whipped alabaster barrier balm on natural linen',
    caption: 'Solenne — Lipid Recovery Balm',
  },
  {
    id: 'hero-3',
    image: '/src/assets/images/hero_oil_botanical_1795194803951.jpg',
    alt: 'AI-created: clear glass facial oil bottle with golden oil drop and chamomile stem on warm sandstone',
    caption: 'Luu Maus — Chamomile Facial Oil',
  },
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'aurea-glow-hero',
    category: 'Ad creatives',
    title: 'Glow Hero Ad',
    brandName: 'Auréa',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Aur%C3%A9a_glow_hero.png',
    alt: 'Glow Hero Ad, AI-created concept study for the fictional brand Auréa',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created glow hero ad for a fictional skincare brand.',
      hook: 'Glow, on your own terms.',
      whyItWorks:
        'a single saturated colour, the product held toward the viewer, and open space for the headline.',
    },
    isPlaceholder: false,
  },
  {
    id: 'calme-ugc-bathroom',
    category: 'Ad creatives',
    title: 'UGC Bathroom Testimonial',
    brandName: 'Calmé',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Calm%C3%A9_UGC_bathroom.jpg',
    alt: 'UGC Bathroom Testimonial, AI-created concept study for the fictional brand Calmé',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created UGC-style bathroom testimonial ad.',
      hook: 'My nightly reset in two steps.',
      whyItWorks:
        'a real-feeling bathroom moment with quick benefit tags that build trust fast.',
    },
    isPlaceholder: false,
  },
  {
    id: 'pure-lune-social-proof',
    category: 'Ad creatives',
    title: 'Social Proof Layout',
    brandName: 'Pure Lune',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374704/Pure_Lune_social_proof.jpg',
    alt: 'Social Proof Layout, AI-created concept study for the fictional brand Pure Lune',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created social proof ad with quote and star rating.',
      hook: 'a customer quote with a star rating.',
      whyItWorks:
        'soft colour, clear hierarchy and a simple call to action. Quote is placeholder copy for a fictional brand.',
    },
    isPlaceholder: false,
  },
  {
    id: 'noura-moroccan-courtyard',
    category: 'Ad creatives',
    title: 'Natural Glow in a Moroccan Courtyard',
    brandName: 'Noura',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Natural_Glow_in_a_Moroccan_Courtyard.png',
    alt: 'Natural Glow in a Moroccan Courtyard, AI-created concept study for the fictional brand Noura',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created bilingual MENA glow ad set in a Moroccan courtyard.',
      hook: 'natural radiance, told in French and Arabic.',
      whyItWorks:
        'local ingredients and setting, warm light, and bilingual copy for MENA audiences.',
    },
    isPlaceholder: false,
  },
  {
    id: 'vessa-cleanser-texture',
    category: 'Ad creatives',
    title: 'Cleanser Texture Hero',
    brandName: 'Vessa',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374704/Vessa_cleanser_texture_hero.png',
    alt: 'Cleanser Texture Hero, AI-created concept study for the fictional brand Vessa',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created cleanser texture hero with water in motion.',
      hook: 'Clean, never stripped.',
      whyItWorks:
        'texture and water in motion make the product feel fresh before a word is read.',
    },
    isPlaceholder: false,
  },
  {
    id: 'oleya-dark-luxe-body-oil',
    category: 'Ad creatives',
    title: 'Dark-Luxe Body Oil',
    brandName: 'Oleya',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Oleya_dark-luxe_body_oil.jpg',
    alt: 'Dark-Luxe Body Oil, AI-created concept study for the fictional brand Oleya',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created dark-luxe body oil ad with cinematic lighting.',
      hook: 'Skin in golden hour.',
      whyItWorks:
        'a dark, cinematic palette with a single glowing highlight signals a premium product.',
    },
    isPlaceholder: false,
  },
  {
    id: 'aurea-carousel-cover',
    category: 'Social',
    title: 'Carousel Cover',
    brandName: 'Auréa',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795375559/Aur%C3%A9a_carousel_cover.jpg',
    alt: 'Carousel Cover, AI-created concept study for the fictional brand Auréa',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created educational carousel cover for a fictional brand.',
      hook: '3 things your Vitamin C routine is missing.',
      whyItWorks:
        'an educational promise on a calm, branded cover that earns the swipe.',
    },
    isPlaceholder: false,
  },
  {
    id: 'calme-story-poll',
    category: 'Social',
    title: 'Story with Poll',
    brandName: 'Calmé',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795375559/Calm%C3%A9_story_with_poll.jpg',
    alt: 'Story with Poll, AI-created concept study for the fictional brand Calmé',
    width: 800,
    height: 1422,
    aspectRatio: '9:16',
    frameShape: 'rect',
    note: {
      concept: 'AI-created interactive story poll for a fictional brand.',
      hook: 'Pick your reset.',
      whyItWorks:
        'an interactive poll invites a tap, which keeps the brand in front of the audience.',
    },
    isPlaceholder: false,
  },
  {
    id: 'pure-lune-quote-card',
    category: 'Social',
    title: 'Quote Card',
    brandName: 'Pure Lune',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795375559/Pure_Lune_quote_card.jpg',
    alt: 'Quote Card, AI-created concept study for the fictional brand Pure Lune',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created shareable quote card for a fictional brand.',
      hook: "Skincare is not a rule. It's a ritual.",
      whyItWorks:
        "a shareable line in the brand's voice with the product quietly in frame.",
    },
    isPlaceholder: false,
  },
  {
    id: 'solenne-product-launch',
    category: 'Social',
    title: 'Product Launch Announcement',
    brandName: 'Solenne',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795375558/Solenne_product_launch.jpg',
    alt: 'Product Launch Announcement, AI-created concept study for the fictional brand Solenne',
    width: 800,
    height: 1000,
    aspectRatio: '4:5',
    frameShape: 'rect',
    note: {
      concept: 'AI-created product launch announcement for a fictional brand.',
      hook: 'Meet Solenne SPF 50.',
      whyItWorks:
        'a clear NEW badge, one benefit line and one simple action for launch day.',
    },
    isPlaceholder: false,
  },
  {
    id: 'noura-grid-preview',
    category: 'Social',
    title: '3x3 Grid Preview',
    brandName: 'Noura',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795375558/Noura_3x3_grid_preview.jpg',
    alt: '3x3 Grid Preview, AI-created concept study for the fictional brand Noura',
    width: 800,
    height: 800,
    aspectRatio: '1:1',
    frameShape: 'rect',
    note: {
      concept: 'AI-created 3x3 profile grid preview for a fictional brand.',
      hook: 'One palette. One style. Nine tiles.',
      whyItWorks:
        "Shows how a brand's posts look together on the profile: one palette, one style, nine tiles that feel like a single brand.",
    },
    isPlaceholder: false,
  },
  {
    id: 'aurea-landing-vitamin-c',
    category: 'Landing pages',
    title: 'Vitamin C Glow Homepage',
    brandName: 'Auréa',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795376695/Aur%C3%A9a_vitamin_C_glow_tangerine.jpg',
    alt: 'Vitamin C Glow Homepage, AI-created website concept for the fictional brand Auréa',
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    frameShape: 'rect',
    note: {
      concept:
        'Hero with a bold promise and floating product, then best sellers and an editorial product block.',
      hook: '',
      whyItWorks:
        "one clear action above the fold and a warm palette that matches the brand's ads.",
    },
    isPlaceholder: false,
  },
  {
    id: 'calme-landing-sensitive-skin',
    category: 'Landing pages',
    title: 'Sensitive Skin Homepage',
    brandName: 'Calmé',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795376695/Calm%C3%A9_sensitive_skin_mint.jpg',
    alt: 'Sensitive Skin Homepage, AI-created website concept for the fictional brand Calmé',
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    frameShape: 'rect',
    note: {
      concept:
        'A calm mint hero, a gentle brand promise and simple product cards.',
      hook: '',
      whyItWorks:
        'the layout feels as soothing as the product and keeps choices easy.',
    },
    isPlaceholder: false,
  },
  {
    id: 'pure-lune-landing-pink-ritual',
    category: 'Landing pages',
    title: 'Evening Ritual Homepage',
    brandName: 'Pure Lune',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795376695/Pure_Lune_pink_ritual.jpg',
    alt: 'Evening Ritual Homepage, AI-created website concept for the fictional brand Pure Lune',
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    frameShape: 'rect',
    note: {
      concept:
        'A dreamy evening hero, best sellers and a large editorial product moment.',
      hook: '',
      whyItWorks:
        'soft colour and generous spacing build a premium, giftable feel.',
    },
    isPlaceholder: false,
  },
  {
    id: 'noura-landing-argan-rose',
    category: 'Landing pages',
    title: 'Argan and Rose Homepage (FR)',
    brandName: 'Noura',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795376694/Noura_argan_and_rose_French_MENA.jpg',
    alt: 'Argan and Rose Homepage (FR), AI-created website concept for the fictional brand Noura',
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    frameShape: 'rect',
    note: {
      concept:
        'A French-language homepage built around local ingredients and warm tones.',
      hook: '',
      whyItWorks:
        'copy and visuals speak directly to Moroccan and MENA customers.',
    },
    isPlaceholder: false,
  },
];
