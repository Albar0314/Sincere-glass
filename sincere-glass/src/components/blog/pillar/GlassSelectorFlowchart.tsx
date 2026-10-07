'use client';

import { useState } from 'react';

interface Step {
  id: string;
  question: string;
  options: { label: string; next: string }[];
}

interface Result {
  id: string;
  isResult: true;
  recommendation: string;
  reasoning: string;
  cta: { label: string; href: string }[];
}

type Node = Step | Result;

const nodes: Record<string, Node> = {
  start: {
    id: 'start',
    question: 'Where will this glass be installed?',
    options: [
      { label: 'In or near a door / shower / low window', next: 'safety-required' },
      { label: 'In an overhead location (skylight, canopy)', next: 'overhead' },
      { label: 'A standard window above 18 in from floor', next: 'standard-window' },
      { label: 'Interior frame / artwork / mirror', next: 'result-annealed' },
    ],
  },
  'safety-required': {
    id: 'safety-required',
    question: 'What matters most beyond basic safety?',
    options: [
      { label: 'Lowest cost, meets code', next: 'result-tempered' },
      { label: 'Sound reduction (street noise, acoustic)', next: 'result-laminated' },
      { label: 'Hurricane / security / forced-entry resistance', next: 'result-laminated-sgp' },
    ],
  },
  overhead: {
    id: 'overhead',
    question: 'Is energy performance also important?',
    options: [
      { label: 'Yes — need thermal insulation too', next: 'result-laminated-igu' },
      { label: 'No — just need to meet overhead code', next: 'result-laminated' },
    ],
  },
  'standard-window': {
    id: 'standard-window',
    question: 'Is heating/cooling cost a concern?',
    options: [
      { label: 'Yes — cold climate, high energy bills', next: 'result-igu-lowe' },
      { label: 'Mild climate, cost is primary concern', next: 'result-annealed-or-tempered' },
    ],
  },

  'result-tempered': {
    id: 'result-tempered',
    isResult: true,
    recommendation: 'Tempered Glass',
    reasoning: 'The cheapest code-compliant safety glass. 4-5× stronger than annealed, breaks into harmless granules. Perfect for doors, shower screens, and most code-mandated safety locations.',
    cta: [
      { label: 'View Tempered Glass product', href: '/products/tempered-glass' },
      { label: 'Read: Tempered vs Laminated comparison', href: '/blog/tempered-glass-vs-laminated-glass' },
    ],
  },
  'result-laminated': {
    id: 'result-laminated',
    isResult: true,
    recommendation: 'Laminated Glass (PVB)',
    reasoning: 'PVB interlayer holds broken pieces in place (code-required for overhead and railings), absorbs sound by 3-5 STC points, blocks 99% UV. The default safety glass for everything above safety-glass minimum.',
    cta: [
      { label: 'View Laminated Glass product', href: '/products/laminated-glass' },
      { label: 'Read: Tempered vs Laminated comparison', href: '/blog/tempered-glass-vs-laminated-glass' },
    ],
  },
  'result-laminated-sgp': {
    id: 'result-laminated-sgp',
    isResult: true,
    recommendation: 'Laminated Glass with SGP interlayer',
    reasoning: 'SentryGlas (SGP) is 100× stiffer and 5× stronger than PVB. The standard for hurricane zones, bullet-resistant glazing, structural balustrades, and forced-entry-resistant storefronts.',
    cta: [
      { label: 'View Laminated Glass product', href: '/products/laminated-glass' },
    ],
  },
  'result-laminated-igu': {
    id: 'result-laminated-igu',
    isResult: true,
    recommendation: 'Laminated IGU (combined)',
    reasoning: 'The premium facade specification: laminated outer lite handles safety + acoustics + UV, air gap + Low-E inner lite handle thermal. Standard for high-end facades and overhead applications in all climates.',
    cta: [
      { label: 'View Insulated Glass product', href: '/products/insulated-glass' },
      { label: 'Read: Insulated vs Laminated comparison', href: '/blog/insulated-glass-vs-laminated-glass' },
    ],
  },
  'result-igu-lowe': {
    id: 'result-igu-lowe',
    isResult: true,
    recommendation: 'Insulated Glass Unit with Low-E coating',
    reasoning: 'Standard IGU drops U-value from ~5.6 to ~2.6; adding Low-E and argon fill drops it to ~1.4-1.8. Cuts heating/cooling energy by 30-50%. The default thermal-performance spec for most climates.',
    cta: [
      { label: 'View Insulated Glass product', href: '/products/insulated-glass' },
      { label: 'View Low-E Glass product', href: '/products/low-e-glass' },
      { label: 'Read: Insulated vs Laminated comparison', href: '/blog/insulated-glass-vs-laminated-glass' },
    ],
  },
  'result-annealed-or-tempered': {
    id: 'result-annealed-or-tempered',
    isResult: true,
    recommendation: 'Tempered Glass (recommended) or Annealed (budget)',
    reasoning: 'If the location does not qualify as a code-defined hazardous location, annealed is permitted and ~3× cheaper. But tempered is still safer against thermal shock and wind load. For small cost differences on exposed windows, tempered is usually worth it.',
    cta: [
      { label: 'Read: Tempered vs Annealed comparison', href: '/blog/tempered-glass-vs-annealed-glass' },
      { label: 'View Tempered Glass product', href: '/products/tempered-glass' },
    ],
  },
  'result-annealed': {
    id: 'result-annealed',
    isResult: true,
    recommendation: 'Annealed Float Glass',
    reasoning: 'For non-safety interior applications — framed artwork, mirrors, non-impact interior partitions, greenhouse glazing — annealed is the correct choice. Cheaper, faster lead time, can be cut/drilled by the fabricator.',
    cta: [
      { label: 'Read: Tempered vs Annealed comparison', href: '/blog/tempered-glass-vs-annealed-glass' },
    ],
  },
};

function isResult(n: Node): n is Result {
  return (n as Result).isResult === true;
}

export default function GlassSelectorFlowchart() {
  const [currentId, setCurrentId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const current = nodes[currentId];

  function go(next: string) {
    setHistory([...history, currentId]);
    setCurrentId(next);
  }

  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentId(prev);
  }

  function reset() {
    setHistory([]);
    setCurrentId('start');
  }

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium m-0">
          Interactive Selector
        </p>
        {history.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={back}
              className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
            >
              ← Back
            </button>
            <span className="text-xs text-[#8B95A5]/40">·</span>
            <button
              onClick={reset}
              className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
            >
              ⟲ Start over
            </button>
          </div>
        )}
      </div>

      {!isResult(current) ? (
        <div>
          <h3 className="text-xl font-semibold text-[#F2F0ED] mb-5 m-0">
            {current.question}
          </h3>
          <div className="space-y-2">
            {current.options.map((opt) => (
              <button
                key={opt.next}
                onClick={() => go(opt.next)}
                className="w-full text-left p-4 bg-[#1C1F26]/40 hover:bg-[#DAA745]/10 border border-[#3A4250]/40 hover:border-[#DAA745]/40 rounded-lg transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[#8B95A5] group-hover:text-[#DAA745] transition-colors">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#DAA745]/5 border border-[#DAA745]/30 rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-2">
            Our recommendation
          </p>
          <h3 className="text-2xl font-bold text-[#F2F0ED] mb-3 m-0">
            {current.recommendation}
          </h3>
          <p className="text-[#8B95A5] leading-relaxed mb-5">
            {current.reasoning}
          </p>
          <div className="flex flex-wrap gap-2">
            {current.cta.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline"
              >
                {c.label} →
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
