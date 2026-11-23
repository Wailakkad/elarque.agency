import React from 'react';

interface MonogramProps {
  className?: string;
  decorative?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({
  className = 'w-7 h-7',
  decorative = true,
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative ? 'true' : undefined}
      role={decorative ? undefined : 'img'}
    >
      {/* Quarter-circle arc spine closing the left side into top (longest) and bottom (shortest) bars */}
      <path
        d="M34 7H20C12.268 7 6 13.268 6 21V33H20"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      {/* Middle bar of medium descending length */}
      <line
        x1="6"
        y1="21"
        x2="27"
        y2="21"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
};

interface BrandLockupProps {
  className?: string;
  tone?: 'umber' | 'alabaster';
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  className = '',
  tone = 'umber',
}) => {
  const colorClass = tone === 'alabaster' ? 'text-alabaster' : 'text-umber';
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${colorClass} ${className}`}>
      <Monogram className="w-6 h-6 shrink-0" decorative />
      <span className="font-display font-medium uppercase tracking-[0.1em] text-lg sm:text-xl leading-none">
        ELARQUE
      </span>
    </span>
  );
};
