'use client';

import { useState } from 'react';

interface Result {
  process: string;
  processKey: 'tempering' | 'lamination' | 'igu' | 'combined';
  explanation: string;
  deepLink: { href: string; label: string };
  productLink: { href: string; label: string };
}

interface Question {
  text: string;
  options: Array<{ label: string; result: Result }>;
}

const question: Question = {
  text: 'What are you ultimately buying?',
  options: [
    {
      label: 'A single sheet of safety glass (shower, railing, door)',
      result: {
        process: 'Tempering',
        processKey: 'tempering',
        explanation: 'Your glass needs to be heated to 620°C and quench-cooled to lock in surface compression. This creates 4-5× strength and the safe granular breakage pattern required by building codes. A single-process order on our tempering furnace.',
        deepLink: { href: '/blog/how-is-tempered-glass-made', label: 'How tempered glass is made →' },
        productLink: { href: '/products/tempered-glass', label: 'Tempered Glass' },
      },
    },
    {
      label: 'Fragment-retention glass (overhead, hurricane, storefront)',
      result: {
        process: 'Lamination',
        processKey: 'lamination',
        explanation: 'Your glass needs to hold together after breakage. Two glass lites bonded by a PVB or SGP interlayer in a 2.5-hour autoclave cycle at 140°C and 12 bar. For hurricane zones specify SGP; for standard safety specify PVB.',
        deepLink: { href: '/blog/how-is-laminated-glass-made', label: 'How laminated glass is made →' },
        productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
      },
    },
    {
      label: 'Energy-efficient window (commercial facade, residential windows)',
      result: {
        process: 'IGU Assembly',
        processKey: 'igu',
        explanation: 'Your glass needs to insulate against heat loss. Two glass lites separated by a sealed cavity filled with argon, assembled with a desiccant-filled warm-edge spacer and dual-seal perimeter. 8-station assembly line, 25+ year sealed lifespan.',
        deepLink: { href: '/blog/how-is-insulated-glass-made', label: 'How IGUs are made →' },
        productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
      },
    },
    {
      label: 'Premium facade (needs safety AND energy AND acoustic)',
      result: {
        process: 'Combined: Tempering + Lamination + IGU Assembly',
        processKey: 'combined',
        explanation: 'A laminated-IGU runs through all three of our production lines in sequence: both lites are tempered → outer lite goes through lamination autoclave → the laminated lite + a Low-E tempered inner lite are assembled into an IGU. Our 3m × 15m furnace, 3m × 15m autoclave, and automatic argon-fill IGU line make this possible in one facility.',
        deepLink: { href: '/blog/insulated-glass-vs-laminated-glass', label: 'Laminated IGU selection guide →' },
        productLink: { href: '/products/insulated-glass', label: 'Laminated IGU' },
      },
    },
  ],
};

const palette: Record<Result['processKey'], string> = {
  tempering: '#FBBF24',
  lamination: '#F59E0B',
  igu: '#60A5FA',
  combined: '#34D399',
};

export default function ProcessSelector() {
  const [result, setResult] = useState<Result | null>(null);

  if (result) {
    const color = palette[result.processKey];
    return (
      <div className="my-10 bg-gradient-to-br from-[#3A4250]/20 to-[#1C1F26] border border-[#DAA745]/30 rounded-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold m-0">
            Fabrication Process Selector — Result
          </p>
          <button
            onClick={() => setResult(null)}
            className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
          >
            ↻ Start over
          </button>
        </div>

        <div>
          <p className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Your fabrication process</p>
          <h3 className="text-2xl font-bold mb-3 m-0" style={{ color }}>
            {result.process}
          </h3>
          <p className="text-[#F2F0ED] leading-relaxed mb-5">{result.explanation}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={result.deepLink.href}
              className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline"
            >
              {result.deepLink.label}
            </a>
            <a
              href={result.productLink.href}
              className="px-5 py-2.5 border border-[#8B95A5]/40 text-[#F2F0ED] rounded-full text-sm font-medium hover:border-[#DAA745]/60 hover:text-[#DAA745] transition-colors no-underline"
            >
              {result.productLink.label} →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 bg-gradient-to-br from-[#3A4250]/20 to-[#1C1F26] border border-[#DAA745]/30 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-6">
        Fabrication Process Selector
      </p>

      <p className="text-lg text-[#F2F0ED] font-medium mb-5">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt.result)}
            className="w-full text-left px-5 py-3 bg-[#1C1F26]/60 border border-[#3A4250]/40 rounded-lg text-[#F2F0ED] text-sm hover:border-[#DAA745]/50 hover:bg-[#DAA745]/5 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
