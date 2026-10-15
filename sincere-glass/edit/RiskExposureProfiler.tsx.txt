'use client';

import { useState, useMemo } from 'react';

type DealSize = 'small' | 'mid' | 'large' | 'enterprise';
type Relationship = 'first' | 'repeat' | 'longterm';
type Destination = 'strict' | 'moderate' | 'other';
type Complexity = 'simple' | 'standard' | 'complex';

interface RiskCell {
  score: number;        // 0–100
  label: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigation: string;
}

interface RiskProfile {
  legitimacy: RiskCell;
  capability: RiskCell;
  quality: RiskCell;
  financial: RiskCell;
  logistics: RiskCell;
  overall: number;
  verdict: {
    tier: 'green' | 'yellow' | 'orange' | 'red';
    headline: string;
    action: string;
  };
}

const DEAL_SIZES: { value: DealSize; label: string; usd: string }[] = [
  { value: 'small', label: 'Trial / sample order', usd: '< $20K' },
  { value: 'mid', label: 'Small container', usd: '$20K – $100K' },
  { value: 'large', label: 'Full container(s)', usd: '$100K – $500K' },
  { value: 'enterprise', label: 'Project order / multi-container', usd: '> $500K' },
];

const RELATIONSHIPS: { value: Relationship; label: string; note: string }[] = [
  { value: 'first', label: 'First order with this supplier', note: 'No track record' },
  { value: 'repeat', label: '1–3 prior orders delivered OK', note: 'Early relationship' },
  { value: 'longterm', label: '5+ orders over 2+ years', note: 'Established' },
];

const DESTINATIONS: { value: Destination; label: string; note: string }[] = [
  { value: 'strict', label: 'US / EU / Australia / Canada', note: 'IBC, EN, AS, CSA codes' },
  { value: 'moderate', label: 'Middle East / SE Asia / LATAM', note: 'Mixed enforcement' },
  { value: 'other', label: 'Africa / CIS / Pacific', note: 'Limited code enforcement' },
];

const COMPLEXITIES: { value: Complexity; label: string; note: string }[] = [
  { value: 'simple', label: 'Mono tempered or basic laminated', note: 'Single process' },
  { value: 'standard', label: 'Low-E IGU or SGP laminated', note: 'Multi-step, coated' },
  { value: 'complex', label: 'Curved + ceramic frit + jumbo', note: 'High-skill fabrication' },
];

function scoreFromInputs(
  deal: DealSize,
  rel: Relationship,
  dest: Destination,
  cmp: Complexity,
): RiskProfile {
  // Base weights per input dimension
  const dealWeight = { small: 5, mid: 25, large: 55, enterprise: 85 }[deal];
  const relWeight = { first: 60, repeat: 25, longterm: 5 }[rel];
  const destWeight = { strict: 70, moderate: 40, other: 20 }[dest];
  const cmpWeight = { simple: 20, standard: 50, complex: 80 }[cmp];

  // Each risk is a different weighted blend
  const legitimacy = clamp(relWeight * 0.7 + dealWeight * 0.3);
  const capability = clamp(cmpWeight * 0.6 + dealWeight * 0.3 + relWeight * 0.1);
  const quality = clamp(destWeight * 0.5 + cmpWeight * 0.35 + relWeight * 0.15);
  const financial = clamp(dealWeight * 0.65 + relWeight * 0.35);
  const logistics = clamp(dealWeight * 0.45 + destWeight * 0.35 + cmpWeight * 0.2);

  const overall = Math.round(
    (legitimacy + capability + quality + financial + logistics) / 5,
  );

  return {
    legitimacy: {
      score: legitimacy,
      label: tierLabel(legitimacy),
      mitigation: mitigationLegitimacy(legitimacy, rel),
    },
    capability: {
      score: capability,
      label: tierLabel(capability),
      mitigation: mitigationCapability(capability, cmp),
    },
    quality: {
      score: quality,
      label: tierLabel(quality),
      mitigation: mitigationQuality(quality, dest),
    },
    financial: {
      score: financial,
      label: tierLabel(financial),
      mitigation: mitigationFinancial(financial, deal),
    },
    logistics: {
      score: logistics,
      label: tierLabel(logistics),
      mitigation: mitigationLogistics(logistics, deal),
    },
    overall,
    verdict: verdictForScore(overall),
  };
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function tierLabel(n: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (n < 30) return 'Low';
  if (n < 55) return 'Medium';
  if (n < 80) return 'High';
  return 'Critical';
}

function verdictForScore(n: number): RiskProfile['verdict'] {
  if (n < 30) {
    return {
      tier: 'green',
      headline: 'Low exposure. Standard due diligence sufficient.',
      action: 'Business licence check + one video audit + reference call.',
    };
  }
  if (n < 55) {
    return {
      tier: 'yellow',
      headline: 'Moderate exposure. Add verification steps.',
      action: 'Full video audit, independent cert verification, 30/70 payment split with pre-shipment inspection.',
    };
  }
  if (n < 80) {
    return {
      tier: 'orange',
      headline: 'High exposure. Formal audit protocol required.',
      action: 'On-site visit OR SGS/CCIC/BV third-party audit, LC at sight, staged shipments, named-insured ICC-A cargo policy.',
    };
  }
  return {
    tier: 'red',
    headline: 'Critical exposure. Treat as unknown vendor until proven.',
    action: 'Trial order first (< $20K). Full on-site audit. Reduce order to minimum MOQ until 2–3 clean deliveries establish track record.',
  };
}

function mitigationLegitimacy(n: number, rel: Relationship): string {
  if (rel === 'longterm') return 'Already verified by relationship history. No extra steps needed.';
  if (n < 50) return 'Pull business licence from GSXT.gov.cn. Match address to Baidu Maps street view.';
  return 'Business licence + VAT invoice sample + factory address visit (in person or verified video). Confirm registered scope includes manufacturing, not just trading.';
}

function mitigationCapability(n: number, cmp: Complexity): string {
  if (cmp === 'simple' && n < 50) return 'Video walk-through of cutting line + tempering furnace is sufficient.';
  if (cmp === 'complex') return 'Request video of the exact process (bending oven for curved, screen-printing + firing for frit). Demand production photos of a prior order of similar complexity, with timestamps.';
  return 'Video audit of all relevant lines. Ask for monthly production capacity in square metres, cross-check against furnace throughput math.';
}

function mitigationQuality(n: number, dest: Destination): string {
  if (dest === 'strict') return 'Non-negotiable: current GB 15763 / EN 12150 / ANSI Z97.1 test reports from a CNAS-accredited lab. Verify report number on the lab’s own site. Pre-shipment inspection by SGS, CCIC, or BV before container seals.';
  if (n < 50) return 'Request test reports for the exact product spec. Spot-check one by calling the issuing lab.';
  return 'Independent test reports (CNAS-accredited lab) matched to the SKU, not generic. Pre-shipment inspection recommended.';
}

function mitigationFinancial(n: number, deal: DealSize): string {
  if (deal === 'enterprise') return 'Pull enterprise credit report (企查查 / 天眼查). Check legal disputes, tax arrears, equity-freeze actions. Insist on LC at sight (not usance). Consider trade credit insurance (Sinosure / Coface).';
  if (n < 50) return 'Light check: company registration date, registered capital, no obvious red flags on 企查查.';
  return 'Enterprise credit report. Payment terms: 30% TT deposit / 70% TT against B/L copy, OR LC at sight. Avoid 100% TT in advance for amounts > $50K to a first-time supplier.';
}

function mitigationLogistics(n: number, deal: DealSize): string {
  if (deal === 'enterprise') return 'ICC-A marine insurance (named insured = you). FOB Incoterm so you control freight forwarder. Pre-shipment inspection with photo evidence of crating, loading, container number, and seal number.';
  if (n < 40) return 'Standard FOB or CIF with the supplier’s cargo insurance is acceptable.';
  return 'ICC-A cargo insurance recommended for this exposure level. Confirm packing method (steel A-frames for jumbo), get container-seal photos before departure.';
}

export default function RiskExposureProfiler() {
  const [deal, setDeal] = useState<DealSize>('mid');
  const [rel, setRel] = useState<Relationship>('first');
  const [dest, setDest] = useState<Destination>('strict');
  const [cmp, setCmp] = useState<Complexity>('standard');

  const profile = useMemo(() => scoreFromInputs(deal, rel, dest, cmp), [deal, rel, dest, cmp]);

  const risks: { key: keyof Omit<RiskProfile, 'overall' | 'verdict'>; title: string }[] = [
    { key: 'legitimacy', title: 'Legitimacy risk' },
    { key: 'capability', title: 'Capability risk' },
    { key: 'quality', title: 'Quality risk' },
    { key: 'financial', title: 'Financial risk' },
    { key: 'logistics', title: 'Logistics risk' },
  ];

  const verdictColors: Record<RiskProfile['verdict']['tier'], { bg: string; border: string; text: string; dot: string }> = {
    green: { bg: 'bg-[#1C1F26]', border: 'border-emerald-500/40', text: 'text-emerald-400', dot: 'bg-emerald-500' },
    yellow: { bg: 'bg-[#1C1F26]', border: 'border-[#DAA745]/40', text: 'text-[#DAA745]', dot: 'bg-[#DAA745]' },
    orange: { bg: 'bg-[#1C1F26]', border: 'border-orange-500/50', text: 'text-orange-400', dot: 'bg-orange-500' },
    red: { bg: 'bg-[#1C1F26]', border: 'border-red-500/60', text: 'text-red-400', dot: 'bg-red-500' },
  };
  const v = verdictColors[profile.verdict.tier];

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
          Interactive · Risk exposure profiler
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#F2F0ED] m-0">
          Measure your exposure
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 m-0 leading-relaxed">
          Four inputs, five weighted risk dimensions, one verdict tier. Different from a generic
          scorecard: each risk uses its own blend of your deal profile.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <InputBlock label="Deal size (USD)">
          <select
            value={deal}
            onChange={(e) => setDeal(e.target.value as DealSize)}
            className="w-full px-3 py-2 rounded-lg bg-[#1C1F26] border border-[#3A4250]/60 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          >
            {DEAL_SIZES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label} ({o.usd})
              </option>
            ))}
          </select>
        </InputBlock>
        <InputBlock label="Relationship with supplier">
          <select
            value={rel}
            onChange={(e) => setRel(e.target.value as Relationship)}
            className="w-full px-3 py-2 rounded-lg bg-[#1C1F26] border border-[#3A4250]/60 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          >
            {RELATIONSHIPS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </InputBlock>
        <InputBlock label="End-use destination">
          <select
            value={dest}
            onChange={(e) => setDest(e.target.value as Destination)}
            className="w-full px-3 py-2 rounded-lg bg-[#1C1F26] border border-[#3A4250]/60 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          >
            {DESTINATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </InputBlock>
        <InputBlock label="Product complexity">
          <select
            value={cmp}
            onChange={(e) => setCmp(e.target.value as Complexity)}
            className="w-full px-3 py-2 rounded-lg bg-[#1C1F26] border border-[#3A4250]/60 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          >
            {COMPLEXITIES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </InputBlock>
      </div>

      {/* Risk cells */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {risks.map((r) => {
          const cell = profile[r.key];
          const tierColor = {
            Low: { bar: 'bg-emerald-500', text: 'text-emerald-400' },
            Medium: { bar: 'bg-[#DAA745]', text: 'text-[#DAA745]' },
            High: { bar: 'bg-orange-500', text: 'text-orange-400' },
            Critical: { bar: 'bg-red-500', text: 'text-red-400' },
          }[cell.label];
          return (
            <div
              key={r.key}
              className="rounded-xl bg-[#1C1F26] border border-[#3A4250]/40 p-4"
            >
              <div className="text-xs text-[#8B95A5] mb-1 uppercase tracking-wider">
                {r.title}
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <div className={`text-2xl font-bold ${tierColor.text}`}>{cell.score}</div>
                <div className={`text-xs font-semibold ${tierColor.text}`}>{cell.label}</div>
              </div>
              <div className="h-1.5 w-full bg-[#3A4250]/40 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full ${tierColor.bar} transition-all duration-500`}
                  style={{ width: `${cell.score}%` }}
                />
              </div>
              <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{cell.mitigation}</p>
            </div>
          );
        })}
      </div>

      {/* Verdict */}
      <div className={`rounded-xl border ${v.border} ${v.bg} p-5`}>
        <div className="flex items-center gap-3 mb-2">
          <span className={`w-2.5 h-2.5 rounded-full ${v.dot}`} />
          <span className="text-xs font-semibold text-[#8B95A5] uppercase tracking-wider">
            Overall exposure {profile.overall}/100
          </span>
        </div>
        <div className={`text-lg font-semibold ${v.text} mb-2`}>
          {profile.verdict.headline}
        </div>
        <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">
          <span className="text-[#8B95A5]">Recommended protocol: </span>
          {profile.verdict.action}
        </p>
      </div>
    </div>
  );
}

function InputBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#8B95A5] uppercase tracking-wider mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
