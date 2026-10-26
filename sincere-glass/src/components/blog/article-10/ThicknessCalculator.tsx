'use client';

import { useMemo, useState } from 'react';

type Support = 'frameless' | 'semi-frameless' | 'framed';
type UseCase = 'door' | 'fixed-panel' | 'return-panel' | 'single-slab-enclosure';

interface Recommendation {
  thickness: string;
  rationale: string;
  warning?: string;
  codeNote: string;
}

/**
 * ThicknessCalculator — buyer-side selector.
 * 3 inputs → one bounded recommendation.
 * Logic reflects IBC 2406, ANSI Z97.1 Cat II, CPSC 16 CFR 1201 Cat II,
 * and typical hinge/clamp manufacturer ratings for shower hardware.
 */
export default function ThicknessCalculator() {
  const [support, setSupport] = useState<Support>('frameless');
  const [useCase, setUseCase] = useState<UseCase>('door');
  const [heightMm, setHeightMm] = useState<number>(1900);
  const [widthMm, setWidthMm] = useState<number>(750);

  const rec = useMemo<Recommendation>(() => {
    const h = heightMm;
    const w = widthMm;
    const area = (h * w) / 1_000_000; // m²

    // Framed — hardware carries load, glass can be thinner.
    if (support === 'framed') {
      if (useCase === 'fixed-panel' && h <= 1850 && w <= 900)
        return {
          thickness: '5 mm tempered',
          rationale: 'Framed enclosure, panel ≤1850×900 mm. Aluminum frame carries deflection load.',
          codeNote: 'Must still meet CPSC 16 CFR 1201 Category II / ANSI Z97.1 Class A.',
        };
      return {
        thickness: '6 mm tempered',
        rationale: 'Framed enclosure, oversized panel. Frame rated 6 mm glazing is the common default.',
        codeNote: 'CPSC 16 CFR 1201 Category II required for all shower glazing in the US.',
      };
    }

    // Semi-frameless — top/bottom U-channel or clips, no vertical frame.
    if (support === 'semi-frameless') {
      if (h <= 2000 && area <= 1.6)
        return {
          thickness: '8 mm tempered',
          rationale: 'Semi-frameless with partial support. 8 mm handles deflection on panels up to ~1.6 m².',
          codeNote: 'Match hinge/clamp rating to 8 mm — most mid-range hardware is 6–10 mm.',
        };
      return {
        thickness: '10 mm tempered',
        rationale: 'Semi-frameless, oversized panel. Steps up to 10 mm to control deflection and resonance.',
        codeNote: 'Verify clamp torque spec for 10 mm — not all mid-range hardware supports it.',
      };
    }

    // Frameless — the hard case. Glass IS the structure.
    // Door — swings and slams, hardware moment arm matters.
    if (useCase === 'door') {
      if (h <= 2000 && w <= 760)
        return {
          thickness: '10 mm tempered',
          rationale: 'Standard frameless door up to 760 mm wide. 10 mm is the global shower-door default.',
          codeNote: 'Hinge load typically 20–25 kg per pivot — spec hinges rated for 10 mm × panel weight.',
        };
      return {
        thickness: '12 mm tempered',
        rationale: 'Wide frameless door (>760 mm) or tall (>2000 mm). Hinge moment arm demands 12 mm.',
        warning: 'Verify hinge rating supports 12 mm + panel weight (often ≥35 kg per hinge).',
        codeNote: 'Over-spec hinges: pivot blocks rated 10 mm will deflect on 12 mm panels under daily cycling.',
      };
    }

    // Frameless fixed panel — easier case, no hinge moment, but still deflection.
    if (useCase === 'fixed-panel') {
      if (h <= 2000 && area <= 1.8)
        return {
          thickness: '10 mm tempered',
          rationale: 'Frameless fixed panel. 10 mm is the industry baseline for 2 m tall glass.',
          codeNote: 'Bottom U-channel or wall clamp spacing ≤600 mm recommended for stability.',
        };
      return {
        thickness: '12 mm tempered',
        rationale: 'Oversized frameless fixed panel (>1.8 m² or >2 m tall). 12 mm reduces deflection and resonance.',
        codeNote: 'Consider 10 mm laminated as alternative if head impact zones are nearby — see FAQ.',
      };
    }

    // Return panel (90° glass-to-glass).
    if (useCase === 'return-panel')
      return {
        thickness: '10 mm tempered',
        rationale: 'Return panel joined to door panel at 90°. 10 mm matches door and bonds via glass-to-glass clip.',
        codeNote: 'Clip hardware is thickness-matched — do not mix 8 mm return with 10 mm door.',
      };

    // Single-slab enclosure (walk-in, no door).
    if (h <= 2100 && area <= 2.0)
      return {
        thickness: '10 mm tempered',
        rationale: 'Walk-in enclosure, single panel ≤2 m². 10 mm clear tempered is the standard.',
        codeNote: 'Floor channel or wall-mounted brackets — verify hardware rating.',
      };

    return {
      thickness: '12 mm tempered',
      rationale: 'Oversized walk-in enclosure (>2 m² single panel). 12 mm reduces oil-can effect and resonance.',
      warning: 'For panels >2.5 m tall, consider laminated construction (6+6 PVB) for post-breakage retention.',
      codeNote: 'Jumbo single-panel enclosures benefit from our 3.3.3 m × 15 m tempering line — no vertical seam needed.',
    };
  }, [support, useCase, heightMm, widthMm]);

  return (
    <div className="my-10 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v4H4v-4z" />
        </svg>
        <span className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
          Interactive Thickness Selector
        </span>
      </div>

      <h3 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-5">
        Find the right thickness for your shower configuration
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <label className="block">
          <span className="block text-xs text-[#8B95A5] mb-1.5 uppercase tracking-wider">
            Support type
          </span>
          <select
            value={support}
            onChange={(e) => setSupport(e.target.value as Support)}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          >
            <option value="frameless">Frameless (no vertical frame)</option>
            <option value="semi-frameless">Semi-frameless (U-channel or clips)</option>
            <option value="framed">Framed (full aluminum frame)</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-xs text-[#8B95A5] mb-1.5 uppercase tracking-wider">
            Use case
          </span>
          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as UseCase)}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          >
            <option value="door">Hinged door panel</option>
            <option value="fixed-panel">Fixed side panel</option>
            <option value="return-panel">90° return panel</option>
            <option value="single-slab-enclosure">Walk-in enclosure (single slab)</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-xs text-[#8B95A5] mb-1.5 uppercase tracking-wider">
            Panel height (mm): <strong className="text-[#F2F0ED]">{heightMm}</strong>
          </span>
          <input
            type="range"
            min={1500}
            max={2400}
            step={50}
            value={heightMm}
            onChange={(e) => setHeightMm(Number(e.target.value))}
            className="w-full accent-[#DAA745]"
          />
          <div className="flex justify-between text-[10px] text-[#8B95A5] mt-1">
            <span>1500</span>
            <span>2400 mm</span>
          </div>
        </label>

        <label className="block">
          <span className="block text-xs text-[#8B95A5] mb-1.5 uppercase tracking-wider">
            Panel width (mm): <strong className="text-[#F2F0ED]">{widthMm}</strong>
          </span>
          <input
            type="range"
            min={500}
            max={1200}
            step={50}
            value={widthMm}
            onChange={(e) => setWidthMm(Number(e.target.value))}
            className="w-full accent-[#DAA745]"
          />
          <div className="flex justify-between text-[10px] text-[#8B95A5] mt-1">
            <span>500</span>
            <span>1200 mm</span>
          </div>
        </label>
      </div>

      <div className="rounded-lg bg-[#1C1F26] border border-[#DAA745]/40 p-5">
        <div className="flex items-start gap-3 mb-3">
          <svg className="w-5 h-5 text-[#DAA745] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">
              Recommended spec
            </div>
            <div className="text-2xl font-bold text-[#DAA745]">{rec.thickness}</div>
          </div>
        </div>
        <p className="text-sm text-[#F2F0ED] m-0 mb-3 leading-relaxed">{rec.rationale}</p>
        {rec.warning && (
          <div className="rounded bg-[#3A4250]/40 border-l-2 border-[#DAA745] px-3 py-2 mb-3">
            <p className="text-xs text-[#DAA745] font-semibold m-0 mb-1">⚠ Hardware check</p>
            <p className="text-xs text-[#F2F0ED] m-0 leading-relaxed">{rec.warning}</p>
          </div>
        )}
        <p className="text-xs text-[#8B95A5] m-0 leading-relaxed italic">{rec.codeNote}</p>
      </div>

      <p className="text-[11px] text-[#8B95A5]/70 mt-3 m-0 leading-relaxed">
        Reference tool only — final specification should be verified with your fabricator and local building authority. All shower glass must be tempered safety glass per CPSC 16 CFR 1201 Category II (US) or regional equivalent.
      </p>
    </div>
  );
}
