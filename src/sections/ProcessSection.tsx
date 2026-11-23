import React from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { FadeIn } from '../components/FadeIn';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Brief and label capture',
    description:
      'You send product files, references and goals. We lock your brand rules and real packaging.',
  },
  {
    number: '02',
    title: 'Creative direction',
    description:
      'A human art director defines mood, light, composition and hooks.',
  },
  {
    number: '03',
    title: 'AI production',
    description:
      'We generate, composite and refine variations from that direction.',
  },
  {
    number: '04',
    title: 'Refine and quality check',
    description:
      'Every asset is refined and quality-checked by our creative director against your real packaging.',
  },
  {
    number: '05',
    title: 'Deliver and iterate',
    description:
      'Formats for every placement, ready to post or run as ads.',
  },
];

const ArcStepIcon: React.FC = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-brass shrink-0"
    aria-hidden="true"
  >
    <path
      d="M4 16V10C4 6.686 6.686 4 10 4C13.314 4 16 6.686 16 10V16"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

export const ProcessSection: React.FC = () => {
  return (
    <Section id="process" labelledBy="process-heading" surface="alabaster">
      <Container>
        <FadeIn>
          <h2 id="process-heading" className="text-umber max-w-3xl">
            Art direction. Production at <em>speed</em>.
          </h2>
        </FadeIn>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.05}>
              <article className="pt-5 border-t border-brass/60 h-full flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="micro-label text-umber/70 tabular-nums">
                    {step.number}
                  </span>
                  <ArcStepIcon />
                </div>
                <h3 className="font-display text-2xl font-medium text-umber mt-4 leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.6] text-umber/85">
                  {step.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
};
