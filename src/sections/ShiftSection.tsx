import React from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { FadeIn } from '../components/FadeIn';

export const ShiftSection: React.FC = () => {
  return (
    <Section id="shift" labelledBy="shift-heading" surface="umber">
      <Container>
        <FadeIn>
          <h2 id="shift-heading" className="text-alabaster max-w-4xl">
            Great skincare deserves better than six weeks of production, or a{' '}
            <em>plastic-looking</em> render.
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 border-t border-brass/60">
            <div className="py-8 md:py-10 md:pr-12 border-b md:border-b-0 md:border-r border-brass/60">
              <p className="micro-label text-travertine">THE OLD WAY</p>
              <p className="mt-4 text-[17px] leading-[1.6] text-alabaster/90 max-w-md">
                Studio shoots take weeks to book, cost thousands, and give you a
                handful of images to stretch across a whole quarter.
              </p>
            </div>

            <div className="py-8 md:py-10 md:pl-12">
              <p className="micro-label text-travertine">THE GENERIC AI WAY</p>
              <p className="mt-4 text-[17px] leading-[1.6] text-alabaster/90 max-w-md">
                Fast and cheap, but the glass looks wrong, the skin looks waxy,
                and the label text melts. Customers notice, even when they
                can&rsquo;t say why.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mt-12 sm:mt-16 mx-auto max-w-3xl bg-sand text-umber rounded-[2px] border-t border-brass/60 px-7 py-9 sm:px-12 sm:py-11 text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-umber">
              The ELARQUE way
            </h3>
            <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-umber/90 max-w-2xl mx-auto">
              A creative director defines the light, texture and composition. AI
              builds it. Your real label is placed in every visual, so the
              product looks exactly like the one in their hands.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
};
