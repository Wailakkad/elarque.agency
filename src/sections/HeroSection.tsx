import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'motion/react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Monogram } from '../components/Monogram';
import { HeroIntro, shouldPlayHeroIntro } from '../components/HeroIntro';
import { heroImageUrl } from '../lib/cloudinary';
import { Dictionary } from '../i18n';

// —— Animation timing (tweak here) ——
const HEADLINE_STAGGER = 0.12;
const HEADLINE_DURATION = 0.9;
const WALL_SCALE_FROM = 1.08;
const WALL_REVEAL_DELAY = 0.3;
const WALL_REVEAL_DURATION = 1;
const MARQUEE_DURATION_S = 48;
const WALL_COLUMN_DURATION_S = 42;
const WALL_ROW_DURATION_S = 36;
const MAGNETIC_MAX_SHIFT_PX = 6;
const MAGNETIC_RANGE_PAD_PX = 12;
const PARALLAX_MAX_PX = 8;
const PRELOAD_COUNT = 3;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

interface HeroWallItem {
  id: string;
  image: string;
  alt: string;
}

const HERO_WALL: HeroWallItem[] = [
  {
    id: 'wall-aurea',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Aur%C3%A9a_glow_hero.png',
    alt: 'AI-created concept study for a fictional brand',
  },
  {
    id: 'wall-oleya',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Oleya_dark-luxe_body_oil.jpg',
    alt: 'AI-created concept study for a fictional brand',
  },
  {
    id: 'wall-noura',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Natural_Glow_in_a_Moroccan_Courtyard.png',
    alt: 'AI-created concept study for a fictional brand',
  },
  {
    id: 'wall-pure-lune',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374704/Pure_Lune_social_proof.jpg',
    alt: 'AI-created concept study for a fictional brand',
  },
  {
    id: 'wall-calme',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374705/Calm%C3%A9_UGC_bathroom.jpg',
    alt: 'AI-created concept study for a fictional brand',
  },
  {
    id: 'wall-vessa',
    image:
      'https://res.cloudinary.com/dhkyla1rv/image/upload/v1795374704/Vessa_cleanser_texture_hero.png',
    alt: 'AI-created concept study for a fictional brand',
  },
];

const COL_LEFT = [HERO_WALL[0], HERO_WALL[2], HERO_WALL[4]];
const COL_RIGHT = [HERO_WALL[1], HERO_WALL[3], HERO_WALL[5]];

const VERTICAL_MASK =
  'linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%)';
const HORIZONTAL_MASK =
  'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: HEADLINE_STAGGER,
      delayChildren: 0.05,
    },
  },
};

const lineUpVariants: Variants = {
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { duration: HEADLINE_DURATION, ease: REVEAL_EASE },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: REVEAL_EASE },
  },
};

interface HeroSectionProps {
  t: Dictionary['hero'];
}

interface WallCardProps {
  item: HeroWallItem;
  chip: string;
  priority?: boolean;
  decorative?: boolean;
}

const WallCard: React.FC<WallCardProps> = ({
  item,
  chip,
  priority = false,
  decorative = false,
}) => (
  <figure
    className="relative shrink-0 overflow-hidden rounded-portfolio border border-alabaster/10 bg-travertine/15"
    aria-hidden={decorative ? 'true' : undefined}
  >
    <img
      src={heroImageUrl(item.image)}
      alt={decorative ? '' : item.alt}
      width={700}
      height={875}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      className="block w-full h-auto"
    />
    <figcaption className="absolute left-2 bottom-2 micro-label rounded-[2px] bg-umber/80 text-alabaster px-2 py-1">
      {chip}
    </figcaption>
  </figure>
);

interface MagneticCtaProps {
  href: string;
  children: React.ReactNode;
}

const MagneticCta: React.FC<MagneticCtaProps> = ({ href, children }) => {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const rangeX = rect.width / 2 + MAGNETIC_RANGE_PAD_PX;
    const rangeY = rect.height / 2 + MAGNETIC_RANGE_PAD_PX;
    if (Math.abs(dx) <= rangeX && Math.abs(dy) <= rangeY) {
      const clamp = (v: number) =>
        Math.max(-MAGNETIC_MAX_SHIFT_PX, Math.min(MAGNETIC_MAX_SHIFT_PX, v));
      x.set(clamp(dx * 0.16));
      y.set(clamp(dy * 0.16));
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={wrapperRef}
      className="inline-flex"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.div style={{ x, y }}>
        <Button href={href} variant="primary">
          {children}
        </Button>
      </motion.div>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  const prefersReducedMotion = useReducedMotion();
  const [needsIntro] = useState(() => shouldPlayHeroIntro());
  const [introLifted, setIntroLifted] = useState(() => !needsIntro);
  const [introDone, setIntroDone] = useState(() => !needsIntro);
  const [wallPaused, setWallPaused] = useState(false);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });
  const springY = useSpring(parallaxY, {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });

  const revealed = introLifted;

  useEffect(() => {
    HERO_WALL.slice(0, PRELOAD_COUNT).forEach(({ image }) => {
      const img = new Image();
      img.src = heroImageUrl(image);
    });
  }, []);

  const handleIntroLift = useCallback(() => setIntroLifted(true), []);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  const wallStyle = useMemo(
    () =>
      ({
        '--hero-marquee-duration': `${MARQUEE_DURATION_S}s`,
        '--hero-wall-duration': `${WALL_COLUMN_DURATION_S}s`,
        '--hero-row-duration': `${WALL_ROW_DURATION_S}s`,
      }) as React.CSSProperties,
    []
  );

  const handleWallMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width - 0.5;
    const ry = (e.clientY - rect.top) / rect.height - 0.5;
    parallaxX.set(-rx * PARALLAX_MAX_PX * 2);
    parallaxY.set(-ry * PARALLAX_MAX_PX * 2);
  };

  const handleWallLeave = () => {
    setWallPaused(false);
    parallaxX.set(0);
    parallaxY.set(0);
  };

  const renderStaticWall = (mobile: boolean) => (
    <div
      className={
        mobile
          ? 'grid grid-cols-2 gap-3 sm:gap-4'
          : 'grid grid-cols-2 gap-3 sm:gap-4 h-full'
      }
      style={{
        maskImage: mobile ? HORIZONTAL_MASK : VERTICAL_MASK,
        WebkitMaskImage: mobile ? HORIZONTAL_MASK : VERTICAL_MASK,
      }}
    >
      {HERO_WALL.slice(0, 4).map((item) => (
        <WallCard key={`static-${item.id}`} item={item} chip={t.wallChip} />
      ))}
    </div>
  );

  const renderDesktopWall = () => {
    if (prefersReducedMotion) {
      return (
        <div className="relative h-[560px] lg:h-[640px] xl:h-[700px]">
          {renderStaticWall(false)}
        </div>
      );
    }

    const columnGroup = (items: HeroWallItem[], keyPrefix: string) => (
      <div className="flex flex-col gap-3 sm:gap-4 pb-3 sm:pb-4">
        {items.map((item, i) => (
          <WallCard
            key={`${keyPrefix}-a-${item.id}`}
            item={item}
            chip={t.wallChip}
            priority={i < PRELOAD_COUNT && keyPrefix === 'left'}
          />
        ))}
      </div>
    );

    const duplicateGroup = (
      items: HeroWallItem[],
      keyPrefix: string
    ) => (
      <div className="flex flex-col gap-3 sm:gap-4 pb-3 sm:pb-4" aria-hidden="true">
        {items.map((item) => (
          <WallCard
            key={`${keyPrefix}-b-${item.id}`}
            item={item}
            chip={t.wallChip}
            decorative
          />
        ))}
      </div>
    );

    return (
      <div
        className="relative h-[560px] lg:h-[640px] xl:h-[700px]"
        onMouseEnter={() => setWallPaused(true)}
        onMouseLeave={handleWallLeave}
        onMouseMove={handleWallMove}
      >
        <motion.div
          className={`absolute inset-0 ${wallPaused ? 'hero-wall-paused' : ''}`}
          style={{ x: springX, y: springY }}
        >
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4 h-full"
            style={{
              maskImage: VERTICAL_MASK,
              WebkitMaskImage: VERTICAL_MASK,
            }}
          >
            <div className="relative overflow-hidden h-full">
              <div className="hero-col-up">
                {columnGroup(COL_LEFT, 'left')}
                {duplicateGroup(COL_LEFT, 'left')}
              </div>
            </div>
            <div className="relative overflow-hidden h-full">
              <div className="hero-col-down">
                {columnGroup(COL_RIGHT, 'right')}
                {duplicateGroup(COL_RIGHT, 'right')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderMobileWall = () => {
    if (prefersReducedMotion) {
      return <div className="lg:hidden mt-10">{renderStaticWall(true)}</div>;
    }

    return (
      <div
        className="lg:hidden mt-10 overflow-hidden"
        onMouseEnter={() => setWallPaused(true)}
        onMouseLeave={() => setWallPaused(false)}
      >
        <div
          className={`hero-row ${wallPaused ? 'hero-wall-paused hero-row-paused' : ''}`}
          style={{
            maskImage: HORIZONTAL_MASK,
            WebkitMaskImage: HORIZONTAL_MASK,
          }}
        >
          <div className="flex gap-3 sm:gap-4 w-max pr-3 sm:pr-4">
            {HERO_WALL.map((item, i) => (
              <div key={`row-a-${item.id}`} className="w-[42vw] max-w-[200px] shrink-0">
                <WallCard
                  item={item}
                  chip={t.wallChip}
                  priority={i < PRELOAD_COUNT}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 sm:gap-4 w-max pr-3 sm:pr-4" aria-hidden="true">
            {HERO_WALL.map((item) => (
              <div key={`row-b-${item.id}`} className="w-[42vw] max-w-[200px] shrink-0">
                <WallCard item={item} chip={t.wallChip} decorative />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] bg-umber text-alabaster overflow-hidden flex flex-col pt-24 sm:pt-28 lg:pt-32 pb-32 sm:pb-36"
      style={wallStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-[18%] w-[min(50vw,480px)] opacity-[0.06] text-brass hidden md:block z-0"
      >
        <Monogram className="w-full h-full" />
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04] z-[1]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="elarque-hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#elarque-hero-grain)" />
      </svg>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              className="lg:col-span-6"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate={revealed ? 'visible' : 'hidden'}
              variants={containerVariants}
            >
              <motion.p
                variants={fadeUpVariants}
                className="micro-label text-travertine mb-5"
              >
                {t.eyebrow}
              </motion.p>

              <h1 id="hero-heading" className="text-alabaster max-w-xl">
                <span className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    variants={lineUpVariants}
                  >
                    {t.headlineBefore}
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    variants={lineUpVariants}
                  >
                    <em>{t.headlineItalic}</em>
                    {t.headlineAfter}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUpVariants}
                className="mt-6 sm:mt-8 text-[17px] sm:text-[18px] leading-[1.6] text-alabaster/85 max-w-xl"
              >
                {t.subheadline}
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <MagneticCta href="#sample">{t.primaryCta}</MagneticCta>
                <Button href="#work" variant="secondaryLight">
                  {t.secondaryCta}
                </Button>
              </motion.div>

              <motion.p
                variants={fadeUpVariants}
                className="micro-label text-alabaster/70 mt-8 sm:mt-10 pt-6 border-t border-brass/50 max-w-xl leading-relaxed"
              >
                {t.trustLine}
              </motion.p>
            </motion.div>

            <motion.div
              className="lg:col-span-6 hidden lg:block"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: WALL_SCALE_FROM }
              }
              animate={
                revealed
                  ? { opacity: 1, scale: 1 }
                  : prefersReducedMotion
                    ? undefined
                    : { opacity: 0, scale: WALL_SCALE_FROM }
              }
              transition={{
                duration: WALL_REVEAL_DURATION,
                delay: WALL_REVEAL_DELAY,
                ease: REVEAL_EASE,
              }}
            >
              {renderDesktopWall()}
            </motion.div>
          </div>
        </Container>

        {renderMobileWall()}
      </div>

      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="border-t border-alabaster/10 overflow-hidden py-3">
        <div
          className={`hero-marquee ${wallPaused ? 'hero-wall-paused hero-marquee-paused' : ''}`}
        >
          <div className="flex w-max">
            <span className="micro-label text-alabaster/55 whitespace-nowrap pr-6">
              {t.marquee}
            </span>
            <span
              className="micro-label text-alabaster/55 whitespace-nowrap pr-6"
              aria-hidden="true"
            >
              {t.marquee}
            </span>
          </div>
        </div>
        </div>

        <div
          aria-hidden="true"
          className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-3 flex items-center gap-3 text-alabaster/45"
        >
          <span className="micro-label">{t.scrollCue}</span>
          <motion.span
            className="block w-10 h-px bg-alabaster/40 origin-left"
            animate={prefersReducedMotion ? undefined : { scaleX: [0.35, 1, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {needsIntro && !introDone && (
        <HeroIntro
          skipLabel={t.introSkip}
          onLift={handleIntroLift}
          onDone={handleIntroDone}
        />
      )}
    </section>
  );
};
