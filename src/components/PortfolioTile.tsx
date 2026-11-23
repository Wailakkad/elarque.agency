import React, { useState } from 'react';
import { PortfolioItem } from '../data/portfolio';
import { gridImageUrl } from '../lib/cloudinary';

interface PortfolioTileProps {
  item: PortfolioItem;
  onSelect: (item: PortfolioItem, triggerElement: HTMLButtonElement) => void;
  eager?: boolean;
}

export const PortfolioTile: React.FC<PortfolioTileProps> = ({
  item,
  onSelect,
  eager = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <article className="break-inside-avoid mb-8 sm:mb-10">
      <button
        type="button"
        onClick={(e) => onSelect(item, e.currentTarget)}
        aria-label={`Open concept study: ${item.title} for ${item.brandName}`}
        className="group w-full text-left block cursor-pointer focus-visible:outline-2 focus-visible:outline-terracotta focus-visible:outline-offset-4"
      >
        <div className="relative overflow-hidden bg-travertine/35 border border-travertine/70 rounded-portfolio">
          {!hasError ? (
            <img
              src={gridImageUrl(item.image)}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading={eager ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className="block w-full h-auto rounded-portfolio transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full aspect-[3/2] flex flex-col items-center justify-center p-6 text-center bg-travertine/40 text-umber/75">
              <span className="font-display italic text-2xl text-umber">{item.brandName}</span>
              <span className="micro-label mt-2">{item.title}</span>
            </div>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-brass/50 flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <p className="micro-label text-umber/70 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-sage">Concept study</span>
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-normal text-umber mt-1 leading-snug group-hover:text-terracotta-hover transition-colors duration-200">
              {item.title}
            </h3>
          </div>
          <span className="font-display italic text-base text-umber/75 shrink-0">
            {item.brandName}
          </span>
        </div>
      </button>
    </article>
  );
};
