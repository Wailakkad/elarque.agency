import React, { useState } from 'react';
import { ChevronDown, Info, RotateCcw, Sparkles } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { A_LA_CARTE, FOUNDING_OFFER_ACTIVE, OFFERS } from '../data/offers';
import { Dictionary, Locale } from '../i18n';

interface OffersSectionProps {
  t: Dictionary['offers'];
  locale: Locale;
}

const REASSURANCE_ICONS = [Sparkles, RotateCcw, Info];

export const OffersSection: React.FC<OffersSectionProps> = ({ t, locale }) => {
  const [valueOpen, setValueOpen] = useState(false);

  const valuePrices = [
    `${t.valueLabels[0]} $${A_LA_CARTE.adCreative}`,
    `${t.valueLabels[1]} $${A_LA_CARTE.socialDesign}`,
    `${t.valueLabels[2]} $${A_LA_CARTE.reel}`,
    `${t.valueLabels[3]} $${A_LA_CARTE.landingPage}`,
  ].join(' · ');

  const gridClassFor = (id: string): string => {
    if (id === 'growth') return 'order-1 md:order-2';
    if (id === 'starter') return 'order-2 md:order-1';
    return 'order-3 md:col-span-2 lg:col-span-1';
  };

  const delayFor = (id: string, featured: boolean): number => {
    if (featured) return 0.24;
    return id === 'starter' ? 0 : 0.12;
  };

  return (
    <section
      id="offers"
      aria-labelledby="offers-heading"
      className="bg-alabaster text-umber py-[72px] lg:py-[120px]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="micro-label text-brass">{t.microLabel}</p>
          <h2
            id="offers-heading"
            className="mt-4 text-umber text-[clamp(36px,5vw,64px)]"
          >
            {t.headingBefore}
            <em>{t.headingItalic}</em>
            {t.headingAfter}
          </h2>
          <p className="mt-5 text-[17px] sm:text-[18px] leading-[1.6] text-umber/85">
            {t.subheading}
          </p>
          {FOUNDING_OFFER_ACTIVE && (
            <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-brass/60 bg-sand/50 px-4 py-2 text-[13px] leading-snug text-umber/85 text-left">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-brass shrink-0"
              />
              {t.foundingLabel}
            </p>
          )}
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {OFFERS.map((offer) => (
            <PricingCard
              key={offer.id}
              offer={offer}
              locale={locale}
              labels={{
                oneTime: t.oneTime,
                valueSuffix: t.valueSuffix,
                savePrefix: t.savePrefix,
                bonusTag: t.bonusTag,
                orderPrefix: t.orderPrefix,
                onWhatsApp: t.onWhatsApp,
              }}
              delay={delayFor(offer.id, offer.featured)}
              gridClass={gridClassFor(offer.id)}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <button
            type="button"
            onClick={() => setValueOpen((open) => !open)}
            aria-expanded={valueOpen}
            aria-controls="offers-value-panel"
            className="inline-flex items-center gap-2 text-[15px] text-umber/85 hover:text-umber underline underline-offset-4 decoration-brass/70 cursor-pointer rounded-[2px]"
          >
            {t.valueTitle}
            <ChevronDown
              aria-hidden="true"
              className={`w-4 h-4 stroke-[1.5] transition-transform duration-200 ${
                valueOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {valueOpen && (
            <div
              id="offers-value-panel"
              className="max-w-xl text-[15px] leading-relaxed text-umber/75 space-y-1"
            >
              <p>{valuePrices}</p>
              <p>{t.valueNote}</p>
            </div>
          )}
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3 border-t border-brass/60 pt-8">
          {t.reassurance.map((item, index) => {
            const Icon = REASSURANCE_ICONS[index];
            return (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-umber/80"
              >
                <Icon
                  aria-hidden="true"
                  className="w-4 h-4 mt-1 shrink-0 text-brass stroke-[1.5]"
                />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-[15px]">
          <a
            href="#sample"
            className="text-umber/85 hover:text-umber underline underline-offset-4 decoration-brass/80 transition-colors"
          >
            {t.samplePrompt}
          </a>
        </p>
      </div>
    </section>
  );
};
