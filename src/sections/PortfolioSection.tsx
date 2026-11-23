import React, { useMemo, useRef, useState } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { FadeIn } from '../components/FadeIn';
import { PortfolioTile } from '../components/PortfolioTile';
import { Lightbox } from '../components/Lightbox';
import {
  PORTFOLIO_ITEMS,
  PortfolioCategory,
  PortfolioItem,
} from '../data/portfolio';

type FilterTab = 'All' | PortfolioCategory;

const FILTER_TABS: FilterTab[] = [
  'All',
  'Ad creatives',
  'Social',
  'Landing pages',
];

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Landing pages are wide 3:2 website screens — keep them larger (2 cols desktop/tablet, 1 mobile)
  const gridColumnsClass =
    activeFilter === 'Landing pages'
      ? 'columns-1 sm:columns-2 lg:columns-2'
      : 'columns-1 sm:columns-2 lg:columns-3';

  const handleSelect = (item: PortfolioItem, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  };

  return (
    <Section id="work" labelledBy="work-heading" surface="sand">
      <Container>
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-brass/60">
            <div>
              <h2 id="work-heading" className="text-umber max-w-2xl">
                Concept studies, <em>art-directed</em> in-house.
              </h2>
              <p className="mt-4 text-[17px] text-umber/85 max-w-xl">
                Every brand shown here is fictional. Every decision is real.
                Your brand is next.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter concept studies by category"
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 text-[13px] font-medium rounded-[2px] whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer border ${
                      isActive
                        ? 'bg-umber text-alabaster border-umber'
                        : 'bg-alabaster/70 text-umber border-brass/50 hover:bg-alabaster'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <div className={`mt-10 sm:mt-12 gap-8 ${gridColumnsClass}`}>
          {filteredItems.map((item, index) => (
            <PortfolioTile
              key={item.id}
              item={item}
              onSelect={handleSelect}
              eager={index < 3}
            />
          ))}
        </div>

        {/* Closing callout placed on an alabaster plate to keep terracotta links off sand surfaces */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <p className="bg-alabaster border border-brass/60 rounded-[2px] px-6 py-4 text-center text-[16px] text-umber">
            Want to see this for your own products?{' '}
            <a
              href="#sample"
              className="text-terracotta-hover font-medium underline underline-offset-4 decoration-terracotta hover:text-umber transition-colors"
            >
              Request a free 3-concept sample.
            </a>
          </p>
        </div>
      </Container>

      <Lightbox
        item={selectedItem}
        items={filteredItems}
        onClose={handleClose}
        onNavigate={setSelectedItem}
      />
    </Section>
  );
};
