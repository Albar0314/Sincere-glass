'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="my-12">
      <h2 id="faq" className="text-2xl font-semibold text-[#F2F0ED] mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-[#3A4250]/30 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#3A4250]/10 transition-colors"
              >
                <span className="font-medium text-[#F2F0ED] pr-4">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-[#8B95A5] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-[#8B95A5] leading-relaxed">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
