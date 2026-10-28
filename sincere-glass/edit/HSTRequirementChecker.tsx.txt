'use client';

import { useMemo, useState } from 'react';

/**
 * HST requirement checker.
 * 4 inputs → verdict (Required / Strongly recommended / Optional) + code refs.
 *
 * Based on EN 14179-1 scope and common building-code guidance for
 * overhead, high-rise and public-area tempered glass.
 */

type Height = 'low' | 'mid' | 'high';   // <10m / 10–30m / >30m
type Panel = 'small' | 'medium' | 'large'; // <2 / 2–5 / >5 m²
type Install = 'vertical' | 'overhead' | 'balustrade' | 'interior';
type Access = 'yes' | 'no';
type Verdict = 'required' | 'recommended' | 'optional';

const HEIGHT_LABEL: Record<Height, string> = {
  low: '<10 m (low-rise)',
  mid: '10–30 m (mid-rise)',
  high: '>30 m (high-rise)',
};
const PANEL_LABEL: Record<Panel, string> = {
  small: '<2 m²',
  medium: '2–5 m²',
  large: '>5 m² (jumbo)',
};
const INSTALL_LABEL: Record<Install, string> = {
  vertical: 'Vertical facade / curtain wall',
  overhead: 'Overhead glazing / skylight',
  balustrade: 'Balustrade / guardrail',
  interior: 'Interior partition / door',
};
const ACCESS_LABEL: Record<Access, string> = {
  yes: 'Yes — public can stand or walk below',
  no: 'No — restricted or no occupancy below',
};

function evaluate(
  height: Height,
  panel: Panel,
  install: Install,
  access: Access
): { verdict: Verdict; headline: string; detail: string; refs: string[] } {
  // Hard rules first — overhead glazing is HST territory almost everywhere
  if (install === 'overhead') {
    return {
      verdict: 'required',
      headline: 'HST is required',
      detail:
        'Overhead glazing with monolithic tempered glass is explicitly within the scope of EN 14179-1 and is typically mandated by national annexes across EU, UK, AU and much of ASEAN. Even where laminated construction is already specified, the tempered plies in a laminated overhead unit are commonly HST-processed to meet post-breakage residual load requirements.',
      refs: ['EN 14179-1 §4 scope', 'DIN 18008-2 Annex A', 'BS 6262-4'],
    };
  }

  // High-rise + large panel + public access = required
  if (height === 'high' && (panel === 'large' || access === 'yes')) {
    return {
      verdict: 'required',
      headline: 'HST is required',
      detail:
        'Tempered glass installed above 30 m with public access below is the canonical "falling glass liability" scenario. HST is specified by project insurers and typically written into the facade sub-contract. Expect your facade engineer to require EN 14179-1 compliance certificates per batch.',
      refs: ['EN 14179-1 §4', 'ASTM C1048 §8 (optional in US but client-driven)', 'GB/T 18701.2'],
    };
  }

  // Mid-rise facades with public access and reasonable panel size — strongly recommended
  if ((height === 'mid' || height === 'high') && access === 'yes' && install === 'vertical') {
    return {
      verdict: 'recommended',
      headline: 'HST is strongly recommended',
      detail:
        'Not strictly mandatory under most codes at 10–30 m, but spontaneous-breakage incidents in this height band drive the majority of insurance claims. Specify HST unless the client has explicitly signed off accepting NiS risk. For high-visibility facades (hotels, retail flagship, corporate HQ), HST is now effectively standard.',
      refs: ['EN 14179-1 §4 (recommended practice)', 'CWCT TN 92'],
    };
  }

  // Balustrade on upper floors
  if (install === 'balustrade' && (height === 'mid' || height === 'high')) {
    return {
      verdict: 'recommended',
      headline: 'HST is strongly recommended',
      detail:
        'Elevated balustrades are typically specified as laminated tempered under EN 12600 class 1(B)1 impact, but the tempered plies themselves should be HST-processed to avoid a single-ply spontaneous fracture leaving the balustrade with reduced load capacity until replacement. Many European jurisdictions have moved HST from "recommended" to "required" for balustrades above 4 m fall height.',
      refs: ['EN 12600 impact', 'EN 14179-1 §4', 'DIN 18008-4'],
    };
  }

  // Interior or small low-rise panels
  if (install === 'interior' || (height === 'low' && panel === 'small' && access === 'no')) {
    return {
      verdict: 'optional',
      headline: 'HST is optional',
      detail:
        'Interior partitions, shower screens, and small low-rise panels without occupied space below carry low NiS liability. The statistical fracture rate (~1 in 400 metric tonnes of tempered glass) rarely justifies the +15–25% HST premium for these applications. Standard tempered meets code; HST is a client-driven option.',
      refs: ['EN 12150 (base tempering standard)', 'GB 15763.2'],
    };
  }

  // Default fallback: recommended
  return {
    verdict: 'recommended',
    headline: 'HST is recommended',
    detail:
      'Your configuration sits in the band where HST is not legally required but is insurance-preferred. For projects where a single spontaneous fracture would be visible, costly to replace, or create liability, specify HST. For back-of-house or temporary installations, standard tempered is acceptable.',
    refs: ['EN 14179-1 §4', 'ASTM C1048'],
  };
}

export default function HSTRequirementChecker() {
  const [height, setHeight] = useState<Height>('mid');
  const [panel, setPanel] = useState<Panel>('medium');
  const [install, setInstall] = useState<Install>('vertical');
  const [access, setAccess] = useState<Access>('yes');

  const result = useMemo(
    () => evaluate(height, panel, install, access),
    [height, panel, install, access]
  );

  const verdictColor =
    result.verdict === 'required'
      ? '#9A5555'
      : result.verdict === 'recommended'
      ? '#DAA745'
      : '#8B95A5';

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold">
          Interactive &middot; HST requirement
        </div>
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0 mt-1">
          Do you need heat soak testing for this installation?
        </h3>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-0">
        {/* Inputs */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#3A4250]/40 space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">
              Building height at install location
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(Object.keys(HEIGHT_LABEL) as Height[]).map((h) => (
                <button
                  key={h}
                  onClick={() => setHeight(h)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    height === h
                      ? 'bg-[#DAA745] text-[#1C1F26]'
                      : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
                  }`}
                >
                  {HEIGHT_LABEL[h]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">
              Panel area (per lite)
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(Object.keys(PANEL_LABEL) as Panel[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPanel(p)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    panel === p
                      ? 'bg-[#DAA745] text-[#1C1F26]'
                      : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
                  }`}
                >
                  {PANEL_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">
              Installation type
            </div>
            <select
              value={install}
              onChange={(e) => setInstall(e.target.value as Install)}
              className="w-full px-3 py-2 bg-[#3A4250]/40 border border-[#3A4250]/60 rounded text-sm text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
            >
              {(Object.keys(INSTALL_LABEL) as Install[]).map((i) => (
                <option key={i} value={i} className="bg-[#1C1F26]">
                  {INSTALL_LABEL[i]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">
              Public access below install
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(Object.keys(ACCESS_LABEL) as Access[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setAccess(a)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    access === a
                      ? 'bg-[#DAA745] text-[#1C1F26]'
                      : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
                  }`}
                >
                  {a === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="p-6 bg-[#3A4250]/10">
          <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-3">
            Code & insurance verdict
          </div>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: `${verdictColor}20`,
              color: verdictColor,
              border: `1px solid ${verdictColor}50`,
            }}
          >
            {result.verdict === 'required'
              ? 'Required'
              : result.verdict === 'recommended'
              ? 'Strongly recommended'
              : 'Optional'}
          </div>
          <h4 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-3">
            {result.headline}
          </h4>
          <p className="text-sm text-[#8B95A5] leading-relaxed m-0 mb-5">
            {result.detail}
          </p>

          <div className="pt-5 border-t border-[#3A4250]/40">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-2">
              Applicable standards
            </div>
            <ul className="list-none p-0 m-0 space-y-1">
              {result.refs.map((r) => (
                <li
                  key={r}
                  className="text-xs text-[#F2F0ED] font-mono"
                >
                  <span className="text-[#DAA745] mr-2">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] text-[#8B95A5]/70 mt-4 leading-relaxed">
            Verdict is advisory. Local codes override — always cross-check with your facade engineer and the AHJ for the project location.
          </p>
        </div>
      </div>
    </div>
  );
}
