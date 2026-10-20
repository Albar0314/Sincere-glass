'use client';

import { useState } from 'react';

type Support = 'fourEdge' | 'twoEdge' | 'point';
type Wind = 'low' | 'medium' | 'high';

// Indicative max dimensions for 12mm tempered under given support and wind class.
// Based on GB 15763.2-2005 §5 and ASTM E1300 principles.
// A structural engineer should verify final limits for the specific project.
const LIMITS: Record<Support, Record<Wind, { w: number; h: number; note: string }>> = {
  fourEdge: {
    low:    { w: 3000, h: 15000, note: 'Our 3,000 x 15,000 mm jumbo envelope (tempering furnace and lamination autoclave both support this size).' },
    medium: { w: 2800, h: 6000,  note: 'Common mid-rise curtain-wall envelope at 12mm monolithic.' },
    high:   { w: 2200, h: 4500,  note: 'Coastal / high-wind-zone single-pane limit. Consider laminated 12+12 or upsize to 15mm for larger panels.' },
  },
  twoEdge: {
    low:    { w: 1800, h: 4500, note: 'Horizontal 2-edge (top and bottom clamp) is typical for fin-and-mullion storefront systems.' },
    medium: { w: 1600, h: 3500, note: 'Deflection becomes governing. Check span/180 limit per EN 13830 for curtain-wall glass.' },
    high:   { w: 1400, h: 3000, note: 'Narrow envelope. Most high-wind projects upsize to 15mm or move to laminated glass at 2-edge spans.' },
  },
  point: {
    low:    { w: 2400, h: 3600, note: '4-point spider fitting. Countersunk holes required; edge-to-hole distance >= 2x thickness (24 mm minimum for 12mm).' },
    medium: { w: 2000, h: 3000, note: 'Edge-to-hole distance >= 2x thickness per GB 15763.2 §5.5. Hole-to-hole spacing also >= 2x thickness.' },
    high:   { w: 1800, h: 2400, note: 'Rotation at point fixings governs. Consider SGP-laminated 12+12 for structural robustness.' },
  },
};

const SUPPORT_LABELS: [Support, string][] = [
  ['fourEdge', '4-edge supported (framed)'],
  ['twoEdge',  '2-edge supported (clamped top and bottom)'],
  ['point',    'Point-fixed (spider / countersunk)'],
];

const WIND_LABELS: [Wind, string][] = [
  ['low',    'Low (interior or sheltered, below 1.0 kPa)'],
  ['medium', 'Medium (standard mid-rise, 1.0 to 2.5 kPa)'],
  ['high',   'High (coastal or high-rise, above 2.5 kPa)'],
];

export default function MaxPanelSizeCalculator() {
  const [support, setSupport] = useState<Support>('fourEdge');
  const [wind, setWind] = useState<Wind>('low');

  const result = LIMITS[support][wind];
  const area = (result.w * result.h) / 1_000_000; // m^2
  const withinJumbo = result.w <= 3000 && result.h <= 15000;

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-5 md:p-7">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#F2F0ED] m-0 mb-1">
          Max panel size calculator (12mm tempered)
        </h3>
        <p className="text-xs text-[#8B95A5] m-0">
          Pick a support condition and wind-load class to see the indicative
          dimensional envelope for 12mm single-pane tempered.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
            Support condition
          </label>
          <div className="space-y-2">
            {SUPPORT_LABELS.map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSupport(val)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  support === val
                    ? 'bg-[#DAA745] text-[#1C1F26] font-semibold'
                    : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
            Wind-load class
          </label>
          <div className="space-y-2">
            {WIND_LABELS.map(([val, label]) => (
              <button
                key={val}
                onClick={() => setWind(val)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  wind === val
                    ? 'bg-[#DAA745] text-[#1C1F26] font-semibold'
                    : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#1C1F26] border border-[#DAA745]/40 p-5">
        <div className="flex flex-wrap items-baseline gap-5 mb-3">
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Max width
            </div>
            <div className="text-xl font-bold text-[#DAA745] tabular-nums">
              {result.w.toLocaleString()}{' '}
              <span className="text-xs text-[#8B95A5] font-normal">mm</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Max height
            </div>
            <div className="text-xl font-bold text-[#DAA745] tabular-nums">
              {result.h.toLocaleString()}{' '}
              <span className="text-xs text-[#8B95A5] font-normal">mm</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Area
            </div>
            <div className="text-xl font-bold text-[#F2F0ED] tabular-nums">
              {area.toFixed(1)}{' '}
              <span className="text-xs text-[#8B95A5] font-normal">m^2</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#8B95A5] m-0 mb-3 leading-relaxed">
          {result.note}
        </p>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium ${
            withinJumbo
              ? 'bg-[#DAA745]/20 text-[#DAA745]'
              : 'bg-red-500/15 text-red-300'
          }`}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            {withinJumbo ? (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
          {withinJumbo
            ? 'Within our 3,000 x 15,000 mm production envelope'
            : 'Exceeds standard envelope - contact for custom quotation'}
        </div>
      </div>

      <p className="text-[10px] text-[#8B95A5]/70 mt-3 m-0 leading-relaxed">
        Indicative only, based on GB 15763.2-2005 §5 and ASTM E1300 principles.
        A structural engineer should verify the specific wind, support, and
        deflection limits for your project before procurement.
      </p>
    </div>
  );
}
