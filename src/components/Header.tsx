import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLockup } from './Monogram';
import { Button } from './Button';
import { Dictionary, Locale } from '../i18n';

interface HeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: Dictionary['nav'];
}

export const Header: React.FC<HeaderProps> = ({ locale, onLocaleChange, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const onDark = !scrolled;
  const navItems = [
    { href: '#work', label: t.work },
    { href: '#offers', label: t.offers },
    { href: '#process', label: t.process },
    { href: '#faq', label: t.faq },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'bg-alabaster/95 border-b border-brass/60'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-6 sm:gap-8">
          {/* Left: Monogram + Wordmark */}
          <a
            href="#top"
            aria-label="ELARQUE home"
            className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-terracotta"
          >
            <BrandLockup tone={onDark ? 'alabaster' : 'umber'} />
          </a>

          {/* Center: Single-line text nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[15px] whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left ${
                  onDark
                    ? 'text-alabaster/85 hover:text-alabaster after:bg-alabaster'
                    : 'text-umber/85 hover:text-umber after:bg-umber'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: EN/FR switch + Free sample CTA (desktop) / Hamburger (mobile) */}
          <div className="flex items-center gap-4 shrink-0">
            <div
              role="group"
              aria-label="Language"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] tracking-[0.1em] uppercase"
            >
              <button
                type="button"
                onClick={() => onLocaleChange('en')}
                aria-pressed={locale === 'en'}
                className={`px-1.5 py-1 cursor-pointer transition-colors whitespace-nowrap ${
                  locale === 'en'
                    ? `${
                        onDark
                          ? 'text-alabaster'
                          : 'text-umber'
                      } font-medium underline underline-offset-4 decoration-brass`
                    : onDark
                      ? 'text-alabaster/55 hover:text-alabaster'
                      : 'text-umber/55 hover:text-umber'
                }`}
              >
                EN
              </button>
              <span aria-hidden="true" className="text-brass/70">
                /
              </span>
              <button
                type="button"
                onClick={() => onLocaleChange('fr')}
                aria-pressed={locale === 'fr'}
                className={`px-1.5 py-1 cursor-pointer transition-colors whitespace-nowrap ${
                  locale === 'fr'
                    ? `${
                        onDark
                          ? 'text-alabaster'
                          : 'text-umber'
                      } font-medium underline underline-offset-4 decoration-brass`
                    : onDark
                      ? 'text-alabaster/55 hover:text-alabaster'
                      : 'text-umber/55 hover:text-umber'
                }`}
              >
                FR
              </button>
            </div>

            <Button
              href="#sample"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              {t.freeSample}
            </Button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={t.menuOpen}
              className={`md:hidden w-11 h-11 inline-flex items-center justify-center rounded-[2px] cursor-pointer ${
                onDark
                  ? 'text-alabaster hover:bg-alabaster/10'
                  : 'text-umber hover:bg-sand/60'
              }`}
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile alabaster menu */}
      {menuOpen && (
        <div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 bg-alabaster text-umber flex flex-col justify-between p-6"
        >
          <div className="flex items-center justify-between h-12">
            <a
              href="#top"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center"
            >
              <BrandLockup />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label={t.menuClose}
              className="w-11 h-11 inline-flex items-center justify-center text-umber hover:bg-sand/60 rounded-[2px] cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <nav aria-label="Mobile menu links" className="flex flex-col gap-5 my-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl font-normal text-umber py-2 border-b border-brass/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="space-y-5 pt-6 border-t border-brass/60">
            <div className="flex items-center justify-between">
              <span className="micro-label text-umber/70">Language</span>
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em]">
                <button
                  type="button"
                  onClick={() => onLocaleChange('en')}
                  aria-pressed={locale === 'en'}
                  className={`px-2 py-1 cursor-pointer ${
                    locale === 'en'
                      ? 'font-medium text-umber underline underline-offset-4 decoration-brass'
                      : 'text-umber/60'
                  }`}
                >
                  EN
                </button>
                <span aria-hidden="true" className="text-brass/60">
                  /
                </span>
                <button
                  type="button"
                  onClick={() => onLocaleChange('fr')}
                  aria-pressed={locale === 'fr'}
                  className={`px-2 py-1 cursor-pointer ${
                    locale === 'fr'
                      ? 'font-medium text-umber underline underline-offset-4 decoration-brass'
                      : 'text-umber/60'
                  }`}
                >
                  FR
                </button>
              </div>
            </div>

            <Button
              href="#sample"
              variant="primary"
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              {t.freeSample}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
