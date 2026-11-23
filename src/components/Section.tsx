import React from 'react';

export type SectionSurface = 'alabaster' | 'sand' | 'umber';

interface SectionProps {
  id?: string;
  labelledBy?: string;
  surface?: SectionSurface;
  className?: string;
  children: React.ReactNode;
}

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  alabaster: 'bg-alabaster text-umber',
  sand: 'bg-sand text-umber',
  umber: 'bg-umber text-alabaster',
};

export const Section: React.FC<SectionProps> = ({
  id,
  labelledBy,
  surface = 'alabaster',
  className = '',
  children,
}) => {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-20 sm:py-28 lg:py-32 ${SURFACE_CLASSES[surface]} ${className}`}
    >
      {children}
    </section>
  );
};
