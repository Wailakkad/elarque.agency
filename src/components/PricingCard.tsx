import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock, Repeat } from 'lucide-react';
import { Button } from './Button';
import { getWhatsAppUrl } from '../config';
import { Offer } from '../data/offers';
import { Locale } from '../i18n';

export interface PricingCardLabels {
  oneTime: string;
  valueSuffix: string;
  savePrefix: string;
  bonusTag: string;
  orderPrefix: string;
  onWhatsApp: string;
}

interface PricingCardProps {
  offer: Offer;
  locale: Locale;
  labels: PricingCardLabels;
  /** Scroll-reveal stagger delay (seconds) */
  delay: number;
  /** Grid child classes: order + tablet/mobile spans */
  gridClass: string;
}

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

function useCountUp(target: number, enabled: boolean, instant: boolean): number {
  const [value, setValue] = useState(() => (instant ? target : 0));

  useEffect(() => {
    if (instant) {
      setValue(target);
      return;
    }
    if (!enabled) return;

    let raf = 0;
    const start = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, instant]);

  return value;
}

const CheckArc: React.FC<{ featured: boolean }> = ({ featured }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className={`w-[18px] h-[18px] shrink-0 mt-[3px] ${featured ? 'text-brass' : 'text-brass'}`}
  >
    <path
      d="M3.2 10.8c1.9.2 3.5 1.4 4.6 3.1 2.2-4.6 5.4-8.1 9.2-9.8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PricingCard: React.FC<PricingCardProps> = ({
  offer,
  locale,
  labels,
  delay,
  gridClass,
}) => {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [inView, setInView] = useState(false);
  const featured = offer.featured;
  const priceValue = useCountUp(offer.price, inView, prefersReducedMotion);
  const savePct = Math.round((1 - offer.price / offer.menuValue) * 100);
  const name = offer.name[locale];
  const ctaText = `${labels.orderPrefix} ${name}`;

  const articleClass = featured
    ? [
        'relative flex flex-col h-full rounded-portfolio border border-brass bg-umber text-alabaster p-9',
        'shadow-[0_28px_60px_-28px_rgba(43,36,32,0.5)]',
        "after:content-[''] after:pointer-events-none after:absolute after:inset-[6px] after:rounded-[12px] after:border after:border-brass/35",
        'lg:-translate-y-4 lg:hover:-translate-y-[22px]',
      ].join(' ')
    : [
        'relative flex flex-col h-full rounded-portfolio border border-travertine bg-sand/55 text-umber p-9',
        'hover:border-brass hover:-translate-y-1.5',
      ].join(' ');

  const mutedLabel = featured ? 'text-travertine' : 'text-umber/65';

  return (
    <motion.div
      className={`h-full ${gridClass}`}
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: featured ? 0.98 : 1 }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: CARD_EASE }}
      onViewportEnter={() => setInView(true)}
    >
      <article
        aria-labelledby={`offer-${offer.id}-name`}
        className={`${articleClass} transition-[transform,border-color] duration-300 ease-out`}
      >
        {featured && offer.badge && (
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full bg-terracotta text-alabaster text-[12px] font-medium tracking-wide px-4 py-1.5 shadow-sm">
            {offer.badge[locale]}
          </span>
        )}

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className={`micro-label ${mutedLabel}`}>{offer.tag[locale]}</span>
          {!featured && offer.badge && (
            <span className="shrink-0 whitespace-nowrap rounded-full border border-brass text-umber/90 text-[11px] font-medium px-2.5 py-1">
              {offer.badge[locale]}
            </span>
          )}
        </div>

        <h3
          id={`offer-${offer.id}-name`}
          className="font-display text-[32px] font-medium leading-tight mt-3"
        >
          {name}
        </h3>

        <p
          className={`mt-2 text-[14px] leading-relaxed ${
            featured ? 'text-alabaster/70' : 'text-umber/65'
          }`}
        >
          {offer.forWho[locale]}
        </p>

        <div className="mt-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span
              className="font-display leading-none tracking-tight tabular-nums text-[64px] sm:text-[70px] lg:text-[72px]"
              style={{ minWidth: `${String(offer.price).length + 2}ch` }}
            >
              {'$' + priceValue}
            </span>
            <span className={`micro-label ${featured ? 'text-alabaster/70' : 'text-umber/65'}`}>
              {labels.oneTime}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5 text-[14px]">
            <span
              className={`line-through ${
                featured ? 'text-alabaster/60' : 'text-umber/55'
              }`}
            >
              {'$' + offer.menuValue} {labels.valueSuffix}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${
                featured ? 'bg-sage/45 text-alabaster' : 'bg-sage/30 text-umber'
              }`}
            >
              {labels.savePrefix} {savePct}%
            </span>
          </div>
        </div>

        <p
          className={`mt-5 font-display italic text-[19px] leading-snug ${
            featured ? 'text-alabaster/85' : 'text-umber/80'
          }`}
        >
          {offer.tagline[locale]}
        </p>

        <div
          className={`my-6 border-t ${featured ? 'border-brass/50' : 'border-brass/60'}`}
          aria-hidden="true"
        />

        <ul className="space-y-3.5">
          {offer.items.map((item) => (
            <li
              key={item.label.en}
              className={`flex items-start gap-3 text-[16px] leading-snug ${
                item.included
                  ? featured
                    ? 'text-alabaster/90'
                    : 'text-umber/90'
                  : featured
                    ? 'text-alabaster/50'
                    : 'text-umber/55'
              }`}
            >
              {item.included ? (
                <CheckArc featured={featured} />
              ) : (
                <span
                  aria-hidden="true"
                  className="mt-[11px] w-3 h-px bg-current shrink-0 opacity-70"
                />
              )}
              <span>{item.label[locale]}</span>
            </li>
          ))}
          {offer.bonus.map((bonus) => (
            <li
              key={bonus.en}
              className={`flex items-start gap-3 text-[16px] leading-snug ${
                featured ? 'text-alabaster/90' : 'text-umber/90'
              }`}
            >
              <CheckArc featured={featured} />
              <span className="flex flex-wrap items-center gap-2">
                {bonus[locale]}
                <span
                  className={`micro-label text-[10px] leading-none rounded-full border px-1.5 py-1 ${
                    featured
                      ? 'text-travertine border-brass'
                      : 'text-umber border-brass'
                  }`}
                >
                  {labels.bonusTag}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div
          className={`mt-6 pt-5 border-t micro-label flex flex-wrap gap-x-5 gap-y-2 ${
            featured
              ? 'border-brass/40 text-travertine'
              : 'border-brass/40 text-umber/65'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Repeat className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
            {offer.revisions[locale]}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
            {offer.delivery[locale]}
          </span>
        </div>

        <div className="mt-auto pt-7">
          <Button
            href={getWhatsAppUrl(offer.whatsappText[locale])}
            target="_blank"
            rel="noopener noreferrer"
            variant={featured ? 'primary' : 'outlineFill'}
            className="w-full"
            aria-label={`${ctaText} ${labels.onWhatsApp}`}
          >
            {ctaText}
          </Button>
        </div>
      </article>
    </motion.div>
  );
};
