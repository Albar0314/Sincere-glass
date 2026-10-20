'use client';

import { useState } from 'react';

// Relative cost structure for 12mm tempered glass panel ex-works Wuhan.
// Baseline (plain rectangle, no polish, no holes) = 100 index points.
// Options add surcharges in index points.
const BASE = {
  rawFloat: 42,
  tempering: 28,
  qcPackaging: 16,
  handling: 14,
};

type EdgeOpt = 'cut' | 'ground' | 'polished';
type HolesOpt = 'none' | 'few' | 'many';
type ShapeOpt = 'rect' | 'cnc';

const EDGE_SURCHARGE: Record<EdgeOpt, number> = { cut: 0, ground: 8, polished: 18 };
const HOLES_SURCHARGE: Record<HolesOpt, number> = { none: 0, few: 6, many: 15 };
const SHAPE_SURCHARGE: Record<ShapeOpt, number> = { rect: 0, cnc: 12 };

const EDGE_LABELS: [EdgeOpt, string][] = [
  ['cut',      'As-cut (not for architectural use)'],
  ['ground',   'Ground / seamed'],
  ['polished', 'Flat-polished'],
];
const HOLES_LABELS: [HolesOpt, string][] = [
  ['none', 'None'],
  ['few',  '1 to 4 holes'],
  ['many', '5+ holes or cutouts'],
];
const SHAPE_LABELS: [ShapeOpt, string][] = [
  ['rect', 'Rectangle'],
  ['cnc',  'CNC / curved'],
];

export default function CostFactorBreakdown() {
  const [edge, setEdge] = useState<EdgeOpt>('ground');
  const [holes, setHoles] = useState<HolesOpt>('none');
  const [shape, setShape] = useState<ShapeOpt>('rect');

  const surchargeTotal =
    EDGE_SURCHARGE[edge] + HOLES_SURCHARGE[holes] + SHAPE_SURCHARGE[shape];
  const total = 100 + surchargeTotal;
  const multiplier = (total / 100).toFixed(2);

  const segments = [
    { label: 'Raw 12mm float',   pct: BASE.rawFloat,          color: '#DAA745' },
    { label: 'Tempering cycle',  pct: BASE.tempering,         color: '#C08B4A' },
    { label: 'Edge processing',  pct: EDGE_SURCHARGE[edge],   color: '#8B95A5' },
    { label: 'Holes / cutouts',  pct: HOLES_SURCHARGE[holes], color: '#6b7a8a' },
    { label: 'CNC shaping',      pct: SHAPE_SURCHARGE[shape], color: '#4e5a6a' },
    { label: 'QC + packaging',   pct: BASE.qcPackaging,       color: '#3A4250' },
    { label: 'Handling + o/h',   pct: BASE.handling,          color: '#2a3140' },
  ].filter((s) => s.pct > 0);

  const renderGroup = (
    legend: string,
    options: [string, string][],
    value: string,
    setter: (v: any) => void,
  ) => (
    <div>
      <label className="block text-[10px] font-semibold text-[#DAA745] mb-1.5 uppercase tracking-wider">
        {legend}
      </label>
      {options.map(([v, l]) => (
        <button
          key={v}
          onClick={() => setter(v as any)}
          className={`block w-full text-left px-2.5 py-1.5 rounded text-xs mb-1 transition-colors ${
            value === v
              ? 'bg-[#DAA745] text-[#1C1F26] font-semibold'
              : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/40 hover:text-[#F2F0ED]'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-5 md:p-7">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#F2F0ED] m-0 mb-1">
          Cost factor breakdown (12mm tempered)
        </h3>
        <p className="text-xs text-[#8B95A5] m-0">
          Relative cost structure. Plain rectangle with ground edges and no
          holes = baseline 1.00. Toggle options to see the multiplier.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        {renderGroup('Edges', EDGE_LABELS as [string, string][], edge, setEdge)}
        {renderGroup('Holes / cutouts', HOLES_LABELS as [string, string][], holes, setHoles)}
        {renderGroup('Shape', SHAPE_LABELS as [string, string][], shape, setShape)}
      </div>

      <div className="rounded-lg bg-[#1C1F26] p-4 mb-4">
        <div className="flex h-6 rounded overflow-hidden mb-3">
          {segments.map((s, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{ width: `${(s.pct / total) * 100}%`, background: s.color }}
              title={`${s.label}: ${s.pct}%`}
            />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-1 text-xs">
          {segments.map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#8B95A5]">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="text-[#F2F0ED] tabular-nums">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between bg-[#DAA745]/10 border border-[#DAA745]/30 rounded-lg px-4 py-3">
        <span className="text-xs text-[#F2F0ED]">
          Relative cost vs plain-rectangle baseline
        </span>
        <span className="text-2xl font-bold text-[#DAA745] tabular-nums">
          x{multiplier}
        </span>
      </div>

      <p className="text-[10px] text-[#8B95A5]/70 mt-3 m-0 leading-relaxed">
        Shown as a cost index, not currency. Actual pricing depends on panel
        size, order volume, and the current float-glass market. Baseline uses
        our 2026 standard tempering line cycle at the Wuhan facility.
      </p>
    </div>
  );
}
