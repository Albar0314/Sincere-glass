'use client';

import { useState } from 'react';

type Interlayer = 'pvb' | 'sgp' | 'eva' | 'acoustic';

interface Spec {
  key: string;
  label: string;
  pvb: string;
  sgp: string;
  eva: string;
  acoustic: string;
}

const specs: Spec[] = [
  { key: 'full-name', label: 'Full Name', pvb: 'Polyvinyl Butyral', sgp: 'SentryGlas (Ionoplast)', eva: 'Ethylene Vinyl Acetate', acoustic: 'Acoustic PVB (A-PVB)' },
  { key: 'stiffness', label: 'Stiffness (post-break)', pvb: 'Low (soft, flexible)', sgp: 'Very high (near-structural)', eva: 'Low', acoustic: 'Lowest (optimized for damping)' },
  { key: 'edge', label: 'Edge Stability', pvb: 'Must be dry-glazed; moisture degrades', sgp: 'Edge-stable, works wet-glazed', eva: 'Moisture-sensitive', acoustic: 'Must be dry-glazed' },
  { key: 'thickness', label: 'Standard Thickness', pvb: '0.38 / 0.76 / 1.52 mm', sgp: '0.89 / 1.52 / 2.28 mm', eva: '0.38 / 0.76 mm', acoustic: '0.76 / 1.14 mm' },
  { key: 'cost', label: 'Material Cost (relative)', pvb: '1.0× (baseline)', sgp: '~3-5× PVB', eva: '~1.2× PVB', acoustic: '~1.3× PVB' },
  { key: 'process', label: 'Process', pvb: 'Autoclave (140°C, 12 bar)', sgp: 'Autoclave (135°C, 12 bar)', eva: 'Vacuum oven (120°C, no pressure)', acoustic: 'Autoclave (140°C, 12 bar)' },
  { key: 'uv', label: 'UV Blocking', pvb: '99%+ inherent', sgp: '99%+ inherent', eva: '95-99% (varies by grade)', acoustic: '99%+ inherent' },
  { key: 'use', label: 'Primary Use', pvb: 'Automotive, standard safety glass', sgp: 'Hurricane, structural, bomb-blast', eva: 'Decorative inclusions (fabric, metal mesh)', acoustic: 'Street-facing residential, acoustic-critical' },
];

const palette: Record<Interlayer, { color: string; bg: string }> = {
  pvb: { color: '#F59E0B', bg: 'bg-amber-500/10' },
  sgp: { color: '#8B5CF6', bg: 'bg-purple-500/10' },
  eva: { color: '#34D399', bg: 'bg-emerald-500/10' },
  acoustic: { color: '#60A5FA', bg: 'bg-blue-500/10' },
};

const labels: Record<Interlayer, string> = {
  pvb: 'PVB',
  sgp: 'SGP',
  eva: 'EVA',
  acoustic: 'A-PVB',
};

export default function PVBvsSGPComparison() {
  const [selected, setSelected] = useState<Interlayer[]>(['pvb', 'sgp']);

  function toggle(k: Interlayer) {
    if (selected.includes(k)) {
      if (selected.length > 1) setSelected(selected.filter((x) => x !== k));
    } else {
      if (selected.length < 3) setSelected([...selected, k]);
      else setSelected([...selected.slice(1), k]);
    }
  }

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-4">
        Interlayer Technology Comparison
      </p>
      <p className="text-xs text-[#8B95A5] mb-5">
        Click any 1-3 interlayers to compare (click a selected one to deselect).
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(labels) as Interlayer[]).map((k) => {
          const active = selected.includes(k);
          const p = palette[k];
          return (
            <button
              key={k}
              onClick={() => toggle(k)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                active ? 'text-white' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40'
              }`}
              style={active ? { backgroundColor: p.color, borderColor: p.color } : {}}
            >
              {labels[k]}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-[#8B95A5] font-medium border-b border-[#3A4250]/40">
                Property
              </th>
              {selected.map((k) => (
                <th
                  key={k}
                  className="text-left py-3 px-4 text-xs font-semibold border-b border-[#3A4250]/40"
                  style={{ color: palette[k].color }}
                >
                  {labels[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((row) => (
              <tr key={row.key} className="border-b border-[#3A4250]/20 last:border-0">
                <td className="py-3 px-4 text-[#8B95A5] font-medium text-xs">{row.label}</td>
                {selected.map((k) => (
                  <td key={k} className="py-3 px-4 text-[#F2F0ED]/90 text-xs leading-relaxed">
                    {row[k]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
