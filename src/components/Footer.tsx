import React from 'react';
import { Container } from './Container';
import { BrandLockup, Monogram } from './Monogram';
import { Dictionary } from '../i18n';
import { SITE_CONFIG, getContactMailtoUrl, getWhatsAppUrl } from '../config';

interface FooterProps {
  nav: Dictionary['nav'];
  footer: Dictionary['footer'];
}

export const Footer: React.FC<FooterProps> = ({ nav, footer }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-alabaster text-umber border-t border-brass/60 py-16 sm:py-20">
      {/* Faint 6% opacity decorative monogram */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-12 -bottom-16 text-umber opacity-[0.06]"
      >
        <Monogram className="w-72 h-72 sm:w-88 sm:h-88" decorative />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-brass/60">
          <div className="md:col-span-5 space-y-4">
            <a href="#top" aria-label="ELARQUE back to top" className="inline-flex">
              <BrandLockup />
            </a>
            <p className="text-[15px] text-umber/80 max-w-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="micro-label text-umber/65">Studio</p>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a href="#work" className="hover:underline underline-offset-4 decoration-brass">
                  {nav.work}
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:underline underline-offset-4 decoration-brass">
                  {nav.offers}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:underline underline-offset-4 decoration-brass">
                  {nav.process}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline underline-offset-4 decoration-brass">
                  {nav.faq}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="micro-label text-umber/65">Direct</p>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a
                  href={getWhatsAppUrl("Hi ELARQUE, I'd like to ask about your creative services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-brass"
                >
                  {footer.whatsappLabel}
                </a>
              </li>
              <li>
                <a
                  href={getContactMailtoUrl()}
                  className="hover:underline underline-offset-4 decoration-brass"
                >
                  {footer.emailLabel}: {SITE_CONFIG.CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-brass"
                >
                  {footer.instagramLabel}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-brass"
                >
                  {footer.facebookLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-umber/70">
          <p>&copy; ELARQUE {currentYear}</p>
          <p className="micro-label text-umber/60">Art-directed AI creative for beauty brands</p>
        </div>
      </Container>
    </footer>
  );
};
