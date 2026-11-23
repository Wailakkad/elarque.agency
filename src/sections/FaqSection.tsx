import React from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { FadeIn } from '../components/FadeIn';
import { Accordion } from '../components/Accordion';
import { Dictionary } from '../i18n';

interface FaqSectionProps {
  t: Dictionary['faq'];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ t }) => {
  return (
    <Section id="faq" labelledBy="faq-heading" surface="sand">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <h2 id="faq-heading" className="text-umber">
                {t.headingBefore}
                <em>{t.headingItalic}</em>
                {t.headingAfter}
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-8">
            <FadeIn delay={0.08}>
              <Accordion items={t.items} />
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
};
