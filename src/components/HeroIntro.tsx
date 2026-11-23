import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const INTRO_SESSION_KEY = 'elarque_intro_seen';

export const INTRO_DRAW_MS = 1500;
export const INTRO_LIFT_DELAY_MS = 1600;
export const INTRO_LIFT_DURATION_S = 0.8;
export const INTRO_LIFT_EASE = [0.76, 0, 0.24, 1] as const;

export function shouldPlayHeroIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  try {
    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1') return false;
  } catch {
    return true;
  }
  return true;
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
  } catch {
    /* ignore */
  }
}

interface HeroIntroProps {
  onLift: () => void;
  onDone: () => void;
  skipLabel: string;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  onLift,
  onDone,
  skipLabel,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const liftedRef = useRef(false);
  const doneRef = useRef(false);

  const lift = useCallback(() => {
    if (liftedRef.current) return;
    liftedRef.current = true;
    setLeaving(true);
    onLift();
  }, [onLift]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    markIntroSeen();
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (prefersReducedMotion) {
      markIntroSeen();
      onLift();
      onDone();
      return;
    }

    const timer = window.setTimeout(lift, INTRO_LIFT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, lift, onLift, onDone]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') lift();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lift]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-[60] cursor-pointer"
      role="presentation"
      onClick={lift}
    >
      <motion.div
        className="absolute inset-0 bg-umber flex flex-col items-center justify-center"
        initial={{ y: 0 }}
        animate={leaving ? { y: '-100%' } : { y: 0 }}
        transition={{
          duration: INTRO_LIFT_DURATION_S,
          ease: INTRO_LIFT_EASE,
        }}
        onAnimationComplete={() => {
          if (leaving) finish();
        }}
      >
        <button
          type="button"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:px-4 focus:py-2 focus:bg-alabaster focus:text-umber focus:rounded-[2px] focus:text-sm focus:font-medium"
          onClick={(e) => {
            e.stopPropagation();
            lift();
          }}
        >
          {skipLabel}
        </button>

        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-brass"
          aria-hidden="true"
        >
          <motion.path
            d="M34 7H20C12.268 7 6 13.268 6 21V33H20"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.1, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
            }}
          />
          <motion.line
            x1="6"
            y1="21"
            x2="27"
            y2="21"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, delay: 0.55, ease: 'easeInOut' }}
          />
        </svg>

        <motion.span
          className="mt-5 font-display text-alabaster uppercase tracking-[0.22em] text-lg sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          aria-hidden="true"
        >
          ELARQUE
        </motion.span>

        <div
          className="mt-8 w-28 h-px bg-alabaster/15 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full bg-brass origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTRO_DRAW_MS / 1000, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};
