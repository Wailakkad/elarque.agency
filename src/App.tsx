import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { DICTIONARY, Locale } from './i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HeroSection } from './sections/HeroSection';
import { ShiftSection } from './sections/ShiftSection';
import { ProcessSection } from './sections/ProcessSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { OffersSection } from './sections/OffersSection';
import { FaqSection } from './sections/FaqSection';
import { FinalCtaSection } from './sections/FinalCtaSection';

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const t = DICTIONARY[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-alabaster text-umber flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-terracotta focus:text-alabaster focus:rounded-[2px] focus:text-sm focus:font-medium"
        >
          {t.nav.skipToContent}
        </a>

        <Header locale={locale} onLocaleChange={setLocale} t={t.nav} />

        <main id="main-content" className="flex-1">
          <HeroSection t={t.hero} />
          <ShiftSection />
          <ProcessSection />
          <PortfolioSection />
          <OffersSection t={t.offers} locale={locale} />
          <FaqSection t={t.faq} />
          <FinalCtaSection t={t.finalCta} locale={locale} />
        </main>

        <Footer nav={t.nav} footer={t.footer} />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
