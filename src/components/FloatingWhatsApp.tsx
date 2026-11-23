import React from 'react';
import { getWhatsAppUrl } from '../config';

export const FloatingWhatsApp: React.FC = () => {
  const href = getWhatsAppUrl(
    "Hi ELARQUE, I'd like to ask about your creative services."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message ELARQUE on WhatsApp"
      title="Message ELARQUE on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 w-[52px] h-[52px] rounded-full bg-umber text-alabaster border border-brass/40 shadow-md inline-flex items-center justify-center transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-umber/90"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
};
