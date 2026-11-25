export type Locale = 'en' | 'fr';

export interface Dictionary {
  nav: {
    work: string;
    offers: string;
    process: string;
    faq: string;
    freeSample: string;
    skipToContent: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    eyebrow: string;
    headlineBefore: string;
    headlineItalic: string;
    headlineAfter: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    marquee: string;
    scrollCue: string;
    wallChip: string;
    introSkip: string;
  };
  offers: {
    microLabel: string;
    headingBefore: string;
    headingItalic: string;
    headingAfter: string;
    subheading: string;
    foundingLabel: string;
    oneTime: string;
    valueSuffix: string;
    savePrefix: string;
    bonusTag: string;
    orderPrefix: string;
    onWhatsApp: string;
    valueTitle: string;
    valueLabels: string[];
    valueNote: string;
    reassurance: string[];
    samplePrompt: string;
  };
  finalCta: {
    headingBefore: string;
    headingItalic: string;
    headingAfter: string;
    body: string;
    fields: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      brandLink: string;
      brandLinkPlaceholder: string;
      productDetails: string;
      productDetailsPlaceholder: string;
      productHelp: string;
      message: string;
      messageOptionalTag: string;
      messagePlaceholder: string;
    };
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      brandRequired: string;
      submitFailed: string;
    };
    submitButton: string;
    submittingButton: string;
    reassurance: string;
    consent: string;
    whatsappLinkLabel: string;
    whatsappDefaultMessage: string;
    successMessage: string;
    fallbackWhatsappLabel: string;
  };
  footer: {
    description: string;
    whatsappLabel: string;
    emailLabel: string;
    instagramLabel: string;
    facebookLabel: string;
  };
  faq: {
    headingBefore: string;
    headingItalic: string;
    headingAfter: string;
    items: { question: string; answer: string }[];
  };
}

export const DICTIONARY: Record<Locale, Dictionary> = {
  en: {
    nav: {
      work: 'Work',
      offers: 'Offers',
      process: 'Process',
      faq: 'FAQ',
      freeSample: 'Free sample',
      skipToContent: 'Skip to content',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      eyebrow: 'AI CREATIVE STUDIO FOR BEAUTY BRANDS',
      headlineBefore: 'Your skincare visuals, ',
      headlineItalic: 'no shoot required',
      headlineAfter: '.',
      subheadline:
        'ELARQUE is an AI creative studio for beauty brands. Ads, Reels, social content and landing pages, created with AI under strict art direction and delivered in days. No studio, no camera.',
      primaryCta: 'Request a free 3-concept sample',
      secondaryCta: 'See the work',
      trustLine:
        'Static ads · Reels · Landing pages · Built for clean, clinical and botanical skincare',
      marquee:
        'Art-directed AI creative · Skincare ads · Reels · Social · Landing pages · No shoot required · ',
      scrollCue: 'Scroll',
      wallChip: 'Concept study',
      introSkip: 'Skip intro',
    },
    offers: {
      microLabel: 'PRICING',
      headingBefore: 'Choose how you ',
      headingItalic: 'start',
      headingAfter: '.',
      subheading:
        'Clear scope, one price, delivered fast. Pick a pack, or start with a free sample.',
      foundingLabel: 'Founding client pricing for our first 10 clients',
      oneTime: 'one-time',
      valueSuffix: 'value',
      savePrefix: 'Save',
      bonusTag: 'BONUS',
      orderPrefix: 'Order',
      onWhatsApp: 'on WhatsApp',
      valueTitle: 'How the value is calculated',
      valueLabels: ['Ad creative', 'Social design', 'Reel', 'Landing page'],
      valueNote: 'Bundles save you 20% to 35%.',
      reassurance: [
        'Free 3-concept sample before you decide',
        'Rework free if your first delivery misses the brief',
        'Creative only. Paid ad management is not included.',
      ],
      samplePrompt: 'Not sure yet? Request a free 3-concept sample',
    },
    finalCta: {
      headingBefore: 'See your products, ',
      headingItalic: 'art-directed',
      headingAfter: ' by AI.',
      body: "Send us one product. In 3 business days you'll receive three ad concepts art-directed for your brand, free and with no obligation.",
      fields: {
        name: 'Name',
        namePlaceholder: 'Camille Laurent',
        email: 'Email',
        emailPlaceholder: 'camille@yourbrand.com',
        brandLink: 'Brand or Instagram link',
        brandLinkPlaceholder: 'https://instagram.com/yourbrand',
        productDetails: 'Product page link (optional)',
        productDetailsPlaceholder:
          'Paste a product page link — or leave empty and send your product image on WhatsApp',
        productHelp:
          'No link? Just send your product image on WhatsApp after submitting.',
        message: 'Message',
        messageOptionalTag: '(optional)',
        messagePlaceholder: 'Share campaign goals, mood references, or target launch date.',
      },
      errors: {
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        brandRequired: 'Please share your brand name or Instagram link.',
        submitFailed:
          'Something went wrong. Please try again or message us on WhatsApp.',
      },
      submitButton: 'Request my free 3-concept sample',
      submittingButton: 'Sending...',
      reassurance: 'No payment details. No spam. Concepts are yours to keep.',
      consent: 'We only use your details to send your sample.',
      whatsappLinkLabel: 'Message us on WhatsApp.',
      whatsappDefaultMessage:
        "Hi ELARQUE, I'd like to ask about your creative services.",
      successMessage: "Thank you. We'll be in touch within one business day.",
      fallbackWhatsappLabel: 'Send via WhatsApp instead',
    },
    footer: {
      description:
        'ELARQUE is an AI creative studio for beauty brands. Ads, Reels, social content and landing pages, created with AI under strict art direction and delivered in days. No studio, no camera.',
      whatsappLabel: 'WhatsApp',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
      facebookLabel: 'Facebook',
    },
    faq: {
      headingBefore: 'Questions, ',
      headingItalic: 'answered',
      headingAfter: '.',
      items: [
        {
          question: 'Will my product and label look exactly right?',
          answer:
            'Yes. We composite your real packaging files into each image, so label text, logos and proportions match the product you ship. We never let AI generate text on your packaging.',
        },
        {
          question: 'Is this made with AI?',
          answer:
            'Yes. Our visuals are created with AI. What sets them apart is the art direction: composition, light and texture are defined by a creative director, and every image is refined and checked against your real packaging.',
        },
        {
          question: 'Will my brand stay consistent?',
          answer:
            'Yes. We start from your colours, type, lighting and tone, and you approve the direction before we produce volume.',
        },
        {
          question: 'Who owns the assets and can I use them in ads?',
          answer:
            'You receive full commercial usage of the final delivered assets for your brand, including paid ads.',
        },
        {
          question: 'How fast will I get my work?',
          answer:
            'The Advertising Creative Pack is delivered in 3-5 working days. Landing pages are scoped with you on the first call.',
        },
        {
          question: 'Do you run my ads?',
          answer:
            'Not at launch. We make the creative; you or your media buyer run it.',
        },
        {
          question: 'What about skin claims and regulations?',
          answer:
            "You own your claims. We avoid risky wording by default and flag phrases worth checking, but we don't provide legal advice.",
        },
        {
          question: "What if I don't like the first result?",
          answer:
            "Each offer includes a revision round. Send one consolidated set of feedback and we'll refine it.",
        },
      ],
    },
  },
  fr: {
    nav: {
      work: 'Réalisations',
      offers: 'Offres',
      process: 'Processus',
      faq: 'FAQ',
      freeSample: 'Essai gratuit',
      skipToContent: 'Aller au contenu',
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
    },
    hero: {
      eyebrow: 'STUDIO CRÉATIF IA POUR MARQUES DE BEAUTÉ',
      headlineBefore: 'Vos visuels skincare, ',
      headlineItalic: 'sans',
      headlineAfter: ' shooting.',
      subheadline:
        "ELARQUE est un studio créatif IA dédié aux marques de beauté. Publicités, Reels, contenus sociaux et landing pages : tout est créé par l'IA sous direction artistique, et livré en quelques jours. Sans studio, sans appareil photo.",
      primaryCta: 'Demander 3 concepts gratuits',
      secondaryCta: 'Voir les créations',
      trustLine:
        'Publicités statiques · Vidéos Reels · Landing pages · Pour le skincare clean, clinique et botanique',
      marquee:
        'Création IA sous direction artistique · Publicités skincare · Reels · Social · Landing pages · Sans shooting · ',
      scrollCue: 'Défiler',
      wallChip: 'Étude de concept',
      introSkip: "Passer l'intro",
    },
    offers: {
      microLabel: 'TARIFS',
      headingBefore: 'Choisissez votre ',
      headingItalic: 'départ',
      headingAfter: '.',
      subheading:
        'Un périmètre clair, un seul prix, livré rapidement. Choisissez un pack, ou commencez par un échantillon gratuit.',
      foundingLabel: 'Tarif client fondateur pour nos 10 premiers clients',
      oneTime: 'paiement unique',
      valueSuffix: 'de valeur',
      savePrefix: 'Économie de',
      bonusTag: 'BONUS',
      orderPrefix: 'Commander',
      onWhatsApp: 'sur WhatsApp',
      valueTitle: 'Comment la valeur est calculée',
      valueLabels: [
        'Visuel publicitaire',
        'Création social',
        'Reel',
        'Landing page',
      ],
      valueNote: 'Les bundles font économiser de 20 à 35 %.',
      reassurance: [
        'Échantillon gratuit de 3 concepts avant de décider',
        'Retouches offertes si la première livraison ne suit pas le brief',
        "Création uniquement. La gestion des publicités payantes n'est pas incluse.",
      ],
      samplePrompt:
        'Pas sûr de vous ? Demandez un échantillon gratuit de 3 concepts',
    },
    finalCta: {
      headingBefore: 'Vos produits, ',
      headingItalic: 'dirigés',
      headingAfter: " par l'IA.",
      body: 'Envoyez-nous un produit. Sous 3 jours ouvrés, vous recevez trois concepts publicitaires dirigés sur mesure pour votre marque, gratuitement et sans engagement.',
      fields: {
        name: 'Nom',
        namePlaceholder: 'Camille Laurent',
        email: 'E-mail',
        emailPlaceholder: 'camille@votremarque.com',
        brandLink: 'Marque ou lien Instagram',
        brandLinkPlaceholder: 'https://instagram.com/votremarque',
        productDetails: 'Lien de la page produit (optionnel)',
        productDetailsPlaceholder:
          'Collez un lien de page produit — ou laissez vide et envoyez votre image produit sur WhatsApp',
        productHelp:
          "Pas de lien ? Envoyez simplement votre image produit sur WhatsApp après l'envoi.",
        message: 'Message',
        messageOptionalTag: '(optionnel)',
        messagePlaceholder: 'Précisez vos objectifs, références visuelles ou date de lancement.',
      },
      errors: {
        nameRequired: 'Veuillez indiquer votre nom.',
        emailRequired: 'Veuillez indiquer votre adresse e-mail.',
        emailInvalid: 'Veuillez saisir une adresse e-mail valide.',
        brandRequired: 'Veuillez indiquer votre marque ou lien Instagram.',
        submitFailed:
          'Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.',
      },
      submitButton: 'Recevoir mes 3 concepts gratuits',
      submittingButton: 'Envoi en cours...',
      reassurance: 'Aucune carte bancaire. Aucun spam. Les concepts vous appartiennent.',
      consent: 'Nous utilisons vos informations uniquement pour vous envoyer votre échantillon.',
      whatsappLinkLabel: 'Écrivez-nous sur WhatsApp.',
      whatsappDefaultMessage:
        'Bonjour ELARQUE, je souhaite poser une question sur vos services créatifs.',
      successMessage: 'Merci. Nous vous répondrons sous un jour ouvré.',
      fallbackWhatsappLabel: 'Envoyer via WhatsApp',
    },
    footer: {
      description:
        "ELARQUE est un studio créatif IA dédié aux marques de beauté. Publicités, Reels, contenus sociaux et landing pages : tout est créé par l'IA sous direction artistique, et livré en quelques jours. Sans studio, sans appareil photo.",
      whatsappLabel: 'WhatsApp',
      emailLabel: 'E-mail',
      instagramLabel: 'Instagram',
      facebookLabel: 'Facebook',
    },
    faq: {
      headingBefore: 'Questions, ',
      headingItalic: 'réponses',
      headingAfter: '.',
      items: [
        {
          question: 'Mon produit et mon étiquette seront-ils exacts ?',
          answer:
            'Oui. Nous intégrons vos fichiers de packaging réels dans chaque visuel : texte, logos et proportions correspondent au produit expédié. Nous ne laissons jamais l’IA générer le texte de votre packaging.',
        },
        {
          question: 'Est-ce créé avec l’IA ?',
          answer:
            'Oui. Nos visuels sont créés avec l’IA. Ce qui les distingue, c’est la direction artistique : composition, lumière et texture sont définies par un directeur artistique, et chaque image est affinée et contrôlée par rapport à votre packaging réel.',
        },
        {
          question: 'Ma marque restera-t-elle cohérente ?',
          answer:
            'Oui. Nous partons de vos couleurs, typographies, lumières et de votre ton, et vous validez la direction avant la production en volume.',
        },
        {
          question: 'À qui appartiennent les visuels et puis-je les utiliser en publicité ?',
          answer:
            'Vous recevez une licence commerciale complète sur les livrables finaux pour votre marque, publicités payantes comprises.',
        },
        {
          question: 'Quels délais pour mes créations ?',
          answer:
            'Le Pack Créatif Publicitaire IA est livré sous 3 à 5 jours ouvrés. Les landing pages sont cadrées avec vous dès le premier appel.',
        },
        {
          question: 'Gérez-vous mes publicités ?',
          answer:
            'Pas au lancement. Nous créons les visuels ; vous ou votre média-buyer les diffusiez.',
        },
        {
          question: 'Et les claims sur la peau et la réglementation ?',
          answer:
            'Vos claims vous appartiennent. Nous évitons par défaut les formulations risquées et signalons les formulations à vérifier, mais nous ne fournissons pas de conseil juridique.',
        },
        {
          question: "Et si le premier résultat ne me convient pas ?",
          answer:
            "Chaque offre inclut une série de révisions. Envoyez un seul ensemble de retours consolidés et nous affinons.",
        },
      ],
    },
  },
};
