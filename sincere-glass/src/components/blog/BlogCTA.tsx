'use client';

import { useQuote } from '@/lib/QuoteContext';

interface Props {
  title?: string;
  description?: string;
}

export default function BlogCTA({
  title = 'Need Custom Glass for Your Project?',
  description = 'Get a free quote from our engineering team. We\'ll help you choose the right glass type, thickness, and coating for your specific requirements.',
}: Props) {
  const { openQuote } = useQuote();

  return (
    <section className="my-16 bg-gradient-to-br from-[#3A4250] to-[#1C1F26] rounded-xl p-8 md:p-12 border border-[#DAA745]/20">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#F2F0ED] mb-3">
          {title}
        </h2>
        <p className="text-[#8B95A5] mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={openQuote}
            className="px-6 py-3 bg-[#DAA745] text-[#1C1F26] font-medium rounded-lg hover:bg-[#DAA745]/90 transition-colors"
          >
            Request a Quote
          </button>
          <a
            href="https://wa.me/8613487671210"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#8B95A5]/30 text-[#F2F0ED] rounded-lg hover:border-[#DAA745]/50 hover:text-[#DAA745] transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
