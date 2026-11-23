import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '../data/portfolio';
import { lightboxImageUrl } from '../lib/cloudinary';

interface LightboxProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onNavigate: (item: PortfolioItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const currentIndex = item
    ? items.findIndex((entry) => entry.id === item.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < items.length - 1;

  const goToPrev = () => {
    if (item && hasPrev) {
      onNavigate(items[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (item && hasNext) {
      onNavigate(items[currentIndex + 1]);
    }
  };

  useEffect(() => {
    setImgError(false);
    setZoomed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, items, onClose, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    if (startX === null) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  if (!item) return null;

  // Original proportions: fit-to-screen never crops; zoom shows full width at natural height
  const imageClass = zoomed
    ? 'block w-full h-auto max-h-none rounded-portfolio cursor-zoom-out'
    : 'block max-w-full max-h-[62vh] w-auto h-auto object-contain rounded-portfolio cursor-zoom-in';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-umber/85"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-alabaster text-umber rounded-[2px] border border-travertine shadow-xl grid grid-cols-1 md:grid-cols-12"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close concept study details"
          className="absolute top-4 right-4 z-10 w-10 h-10 inline-flex items-center justify-center rounded-[2px] bg-alabaster/95 border border-brass/60 text-umber hover:bg-sand transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="md:col-span-7 bg-sand/60 flex items-center justify-center p-6 sm:p-8 relative">
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrev}
                disabled={!hasPrev}
                aria-label="Previous concept study"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 inline-flex items-center justify-center rounded-[2px] bg-alabaster/95 border border-brass/60 text-umber hover:bg-sand transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={!hasNext}
                aria-label="Next concept study"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 inline-flex items-center justify-center rounded-[2px] bg-alabaster/95 border border-brass/60 text-umber hover:bg-sand transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </>
          )}
          <div
            className={`w-full flex items-center justify-center border border-travertine/80 rounded-portfolio ${
              zoomed ? 'max-h-[70vh] overflow-y-auto' : 'max-h-[65vh] overflow-hidden'
            }`}
          >
            {!imgError ? (
              <img
                src={lightboxImageUrl(item.image)}
                alt={item.alt}
                width={item.width}
                height={item.height}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                onClick={() => setZoomed((z) => !z)}
                title={zoomed ? 'Zoom out' : 'Zoom in'}
                className={imageClass}
              />
            ) : (
              <div className="aspect-[3/2] w-full flex flex-col items-center justify-center p-8 bg-travertine/30 text-center">
                <span className="font-display italic text-3xl text-umber">{item.brandName}</span>
                <span className="micro-label mt-2 text-umber/70">{item.title}</span>
              </div>
            )}
          </div>
          {!imgError && (
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 micro-label text-umber/55 pointer-events-none">
              {zoomed ? 'Click to fit' : 'Click to zoom'}
            </p>
          )}
        </div>

        <div className="md:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <p className="micro-label text-umber/70 flex items-center gap-2">
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-sage">Concept study</span>
            </p>

            <h3
              id="lightbox-title"
              className="font-display text-3xl sm:text-4xl font-normal text-umber mt-3 leading-tight"
            >
              {item.title}
            </h3>
            <p className="font-display italic text-xl text-umber/80 mt-1">
              {item.brandName} (fictional brand)
            </p>

            <div className="my-6 border-t border-brass/60" aria-hidden="true" />

            <dl className="space-y-4 text-[15px] leading-relaxed text-umber/90">
              <div>
                <dt className="micro-label text-umber/65">Concept</dt>
                <dd className="mt-1">{item.note.concept}</dd>
              </div>
              {item.note.hook && (
                <div>
                  <dt className="micro-label text-umber/65">Hook</dt>
                  <dd className="mt-1 font-display italic text-xl text-umber">
                    &ldquo;{item.note.hook}&rdquo;
                  </dd>
                </div>
              )}
              <div>
                <dt className="micro-label text-umber/65">Why it works</dt>
                <dd className="mt-1">{item.note.whyItWorks}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 pt-6 border-t border-brass/50">
            <a
              href="#sample"
              onClick={onClose}
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-[2px] bg-terracotta text-alabaster text-[15px] font-medium hover:bg-terracotta-hover transition-colors"
            >
              Request a free 3-concept sample
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
