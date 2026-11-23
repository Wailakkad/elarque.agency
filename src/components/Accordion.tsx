import React, { useId, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = items.length;
    let nextIndex: number | null = null;

    if (e.key === 'ArrowDown') {
      nextIndex = (index + 1) % count;
    } else if (e.key === 'ArrowUp') {
      nextIndex = (index - 1 + count) % count;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="border-t border-brass/60">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className="border-b border-brass/60">
            <h3>
              <button
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full py-6 sm:py-7 flex items-start justify-between gap-6 text-left cursor-pointer group min-h-[48px]"
              >
                <span className="font-display text-xl sm:text-2xl font-normal text-umber leading-snug group-hover:text-terracotta-hover transition-colors duration-200">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 w-6 h-6 shrink-0 inline-flex items-center justify-center text-umber/75 group-hover:text-umber transition-colors duration-200"
                >
                  {isOpen ? (
                    <Minus className="w-4 h-4 stroke-[1.5]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[1.5]" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-7 pr-8 sm:pr-12"
            >
              <p className="text-[16px] sm:text-[17px] leading-relaxed text-umber/85 max-w-2xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
