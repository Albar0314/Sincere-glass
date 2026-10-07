'use client';

import { useState } from 'react';

interface Scenario {
  id: string;
  label: string;
  icon: string;
  problem: string;
  recommendation: 'insulated' | 'laminated' | 'both';
  reasoning: string;
  productLink: { href: string; label: string };
}

const scenarios: Scenario[] = [
  {
    id: 'cold-climate',
    label: 'Cold-climate office tower',
    icon: '❄️',
    problem: 'Heating bills eat 40% of operating budget; staff complain of window drafts.',
    recommendation: 'insulated',
    reasoning: 'U-value is the dominant performance metric. A double-pane IGU with argon fill and Low-E coating cuts heat loss by 60-70% vs single pane. Laminated glass alone changes U-value negligibly.',
    productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
  },
  {
    id: 'street-noise',
    label: 'Street-facing residential, noisy district',
    icon: '🔊',
    problem: 'Traffic noise at 70+ dB, residents cannot sleep.',
    recommendation: 'laminated',
    reasoning: 'The PVB (or acoustic PVB) interlayer dampens airborne sound, raising STC rating by 3-5 points vs plain glass of equal thickness. A 6.38mm acoustic laminated unit outperforms a 6+12A+6 IGU for noise.',
    productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
  },
  {
    id: 'skylight',
    label: 'Overhead skylight / canopy',
    icon: '🏛️',
    problem: 'Code requires glass that stays in place if broken (fall-arrest).',
    recommendation: 'laminated',
    reasoning: 'IBC 2021 §2405.5 mandates laminated glass for overhead glazing — tempered-only glass can rain shards. The PVB layer holds broken pieces in place. IGU adds thermal benefit but does not satisfy the safety requirement on its own.',
    productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
  },
  {
    id: 'luxury-villa',
    label: 'Luxury villa, floor-to-ceiling glass',
    icon: '🏖️',
    problem: 'Needs thermal comfort + storm protection + quiet interior + security.',
    recommendation: 'both',
    reasoning: 'High-end facades combine both: a laminated outer lite (safety + sound) + air gap + Low-E tempered inner lite (thermal). This "laminated IGU" is standard for premium coastal projects and hurricane-prone regions.',
    productLink: { href: '/products/insulated-glass', label: 'Laminated IGU' },
  },
  {
    id: 'retail-storefront',
    label: 'Retail storefront, high-traffic street',
    icon: '🛍️',
    problem: 'Impact risk from carts, bags, break-in attempts.',
    recommendation: 'laminated',
    reasoning: 'Laminated glass with SGP interlayer resists forced entry — a thief can crack it but cannot create a passable hole. A standard IGU shatters on impact. For commercial storefronts facing public access, laminated is non-negotiable.',
    productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
  },
];

const palette: Record<string, { bg: string; text: string; border: string }> = {
  insulated: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30' },
  laminated: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
  both: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
};

const label: Record<string, string> = {
  insulated: 'Insulated Glass (IGU)',
  laminated: 'Laminated Glass',
  both: 'Combine Both — Laminated IGU',
};

export default function BuyerScenarioPicker() {
  const [active, setActive] = useState(scenarios[0].id);
  const current = scenarios.find((s) => s.id === active)!;
  const colors = palette[current.recommendation];

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-4">
        Pick your scenario
      </p>

      {/* Scenario tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`p-3 rounded-lg border transition-all text-left ${
              active === s.id
                ? 'bg-[#DAA745]/10 border-[#DAA745]/40 text-[#F2F0ED]'
                : 'bg-[#1C1F26]/40 border-[#3A4250]/30 text-[#8B95A5] hover:text-[#F2F0ED] hover:border-[#3A4250]/60'
            }`}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xs leading-snug">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Scenario detail */}
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#8B95A5] font-medium mb-2">
            The problem
          </p>
          <p className="text-[#F2F0ED] leading-relaxed">{current.problem}</p>
        </div>

        <div className={`border rounded-lg p-5 ${colors.bg} ${colors.border}`}>
          <p className="text-xs uppercase tracking-wider font-medium mb-2 opacity-70">
            Recommendation
          </p>
          <p className={`text-xl font-semibold mb-3 ${colors.text}`}>
            {label[current.recommendation]}
          </p>
          <p className="text-[#F2F0ED]/90 leading-relaxed mb-4">{current.reasoning}</p>
          <a
            href={current.productLink.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#DAA745] hover:underline"
          >
            View {current.productLink.label} →
          </a>
        </div>
      </div>
    </div>
  );
}
