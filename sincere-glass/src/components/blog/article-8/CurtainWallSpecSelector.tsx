'use client';

import { useState } from 'react';

interface Result {
  buildUp: string;
  thickness: string;
  rationale: string;
  cost: string;
  productLink: { href: string; label: string };
  deepLink: { href: string; label: string };
}

interface Question {
  id: string;
  text: string;
  options: Array<{ label: string; nextId: string | null; result?: Result }>;
}

const flow: Record<string, Question> = {
  start: {
    id: 'start',
    text: 'What is the building height / exposure category?',
    options: [
      { label: 'Low-rise (1-3 storeys) — low wind load', nextId: 'low-climate' },
      { label: 'Mid-rise (4-10 storeys) — moderate wind load', nextId: 'mid-climate' },
      { label: 'High-rise (10+ storeys) — significant wind load', nextId: 'high-climate' },
    ],
  },
  'low-climate': {
    id: 'low-climate',
    text: 'What is the climate?',
    options: [
      {
        label: 'Mild — minimal heating/cooling',
        nextId: null,
        result: {
          buildUp: 'Tempered IGU (6+12A+6 clear)',
          thickness: '~24mm overall',
          rationale: 'For low-rise mild-climate buildings, a basic tempered IGU meets safety code (tempered for impact safety) and provides adequate thermal performance without Low-E coating. Minimizes cost while meeting all code requirements.',
          cost: '~$42-50/m² FOB Wuhan',
          productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
          deepLink: { href: '/blog/insulated-glass-vs-laminated-glass', label: 'Insulated vs Laminated detail →' },
        },
      },
      {
        label: 'Harsh — significant heating or cooling costs',
        nextId: null,
        result: {
          buildUp: 'Low-E Tempered IGU (6+12A+6 Low-E)',
          thickness: '~24mm overall',
          rationale: 'Adding Low-E coating cuts U-value from ~2.6 to ~1.4 W/m²·K — a 45% improvement in thermal performance. For low-rise buildings with meaningful HVAC loads, this upgrade pays back within 2-4 years in most climates.',
          cost: '~$55-68/m² FOB Wuhan',
          productLink: { href: '/products/low-e-glass', label: 'Low-E Glass' },
          deepLink: { href: '/blog/how-is-insulated-glass-made', label: 'How IGUs are made →' },
        },
      },
    ],
  },
  'mid-climate': {
    id: 'mid-climate',
    text: 'What is the climate?',
    options: [
      {
        label: 'Mild to moderate climate',
        nextId: null,
        result: {
          buildUp: 'Low-E Tempered IGU with argon fill (6+12Ar+6 Low-E tempered)',
          thickness: '~24mm overall',
          rationale: 'Baseline mid-rise commercial specification. Tempered lites for wind-load reserve, Low-E coating + argon fill for thermal performance. Warm-edge spacer recommended for reduced edge condensation.',
          cost: '~$60-72/m² FOB Wuhan',
          productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
          deepLink: { href: '/blog/architectural-glass-manufacturing-guide', label: 'The 3 fabrication processes →' },
        },
      },
      {
        label: 'Harsh climate or sound-critical location',
        nextId: null,
        result: {
          buildUp: 'Laminated IGU with Low-E (6+1.52+6 lami outer / 12Ar / 6 Low-E tempered inner)',
          thickness: '~32mm overall',
          rationale: 'The premium mid-rise facade specification. Laminated outer lite handles acoustic damping and provides fragment retention for fall-arrest safety. Low-E tempered inner lite handles thermal duty. This is the configuration we recommend for serious commercial projects.',
          cost: '~$95-120/m² FOB Wuhan',
          productLink: { href: '/products/insulated-glass', label: 'Laminated IGU' },
          deepLink: { href: '/blog/insulated-glass-vs-laminated-glass', label: 'The "both" option explained →' },
        },
      },
    ],
  },
  'high-climate': {
    id: 'high-climate',
    text: 'Is the building in a hurricane or seismic-active region?',
    options: [
      {
        label: 'No — standard high-rise environment',
        nextId: null,
        result: {
          buildUp: 'Heat-soaked tempered laminated IGU (6+1.52+6 HS lami / 12Ar / 6 Low-E HS tempered)',
          thickness: '~32mm overall',
          rationale: 'Heat-soak testing (HST) per EN 14179 mitigates spontaneous NiS breakage risk — critical for high-rise where a falling pane is a liability event. Laminated outer provides fall-arrest safety even if a pane fails. This is the industry standard for 20+ storey curtain walls.',
          cost: '~$110-140/m² FOB Wuhan (HST adds ~$8-12/m²)',
          productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
          deepLink: { href: '/blog/how-is-tempered-glass-made', label: 'NiS risk explained →' },
        },
      },
      {
        label: 'Yes — hurricane zone or earthquake zone',
        nextId: null,
        result: {
          buildUp: 'SGP-laminated IGU, heat-soaked (6+1.52 SGP+6 HS / 12Ar / 6 Low-E HS)',
          thickness: '~32mm overall',
          rationale: 'SGP (SentryGlas) interlayer is ~100× stiffer than PVB post-break, allowing the panel to continue carrying wind load after glass failure. Required for Miami-Dade NOA certification per TAS 201/202/203. Also appropriate for seismic zones where glass movement capability matters.',
          cost: '~$140-180/m² FOB Wuhan',
          productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
          deepLink: { href: '/blog/how-is-laminated-glass-made', label: 'PVB vs SGP explained →' },
        },
      },
    ],
  },
};

export default function CurtainWallSpecSelector() {
  const [currentId, setCurrentId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const current = flow[currentId];

  function reset() {
    setCurrentId('start');
    setHistory([]);
    setResult(null);
  }

  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev);
    setResult(null);
  }

  function selectOption(opt: typeof current.options[0]) {
    if (opt.result) {
      setResult(opt.result);
    } else if (opt.nextId) {
      setHistory((h) => [...h, currentId]);
      setCurrentId(opt.nextId);
    }
  }

  return (
    <div className="my-10 bg-gradient-to-br from-[#3A4250]/20 to-[#1C1F26] border border-[#DAA745]/30 rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold m-0">
          Curtain Wall Spec Selector
        </p>
        {(history.length > 0 || result) && (
          <button
            onClick={reset}
            className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
          >
            ↻ Start over
          </button>
        )}
      </div>

      {result ? (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Recommended build-up</p>
            <h3 className="text-xl md:text-2xl font-bold text-[#DAA745] mb-2 m-0">{result.buildUp}</h3>
            <p className="text-sm text-[#8B95A5] font-mono mb-4">
              {result.thickness} · {result.cost}
            </p>
            <p className="text-[#F2F0ED] leading-relaxed mb-5">{result.rationale}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={result.productLink.href}
              className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline"
            >
              {result.productLink.label} →
            </a>
            <a
              href={result.deepLink.href}
              className="px-5 py-2.5 border border-[#8B95A5]/40 text-[#F2F0ED] rounded-full text-sm font-medium hover:border-[#DAA745]/60 hover:text-[#DAA745] transition-colors no-underline"
            >
              {result.deepLink.label}
            </a>
          </div>
          <button
            onClick={back}
            className="text-xs text-[#8B95A5] hover:text-[#F2F0ED] transition-colors mt-2"
          >
            ← Pick a different answer
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg text-[#F2F0ED] font-medium mb-5">{current.text}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectOption(opt)}
                className="w-full text-left px-5 py-3 bg-[#1C1F26]/60 border border-[#3A4250]/40 rounded-lg text-[#F2F0ED] text-sm hover:border-[#DAA745]/50 hover:bg-[#DAA745]/5 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <button
              onClick={back}
              className="text-xs text-[#8B95A5] hover:text-[#F2F0ED] transition-colors mt-4"
            >
              ← Back
            </button>
          )}
        </div>
      )}
    </div>
  );
}
