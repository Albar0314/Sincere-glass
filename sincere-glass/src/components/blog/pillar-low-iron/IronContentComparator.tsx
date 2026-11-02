'use client';

import { useState } from 'react';

type Mode = 'standard' | 'low-iron';
type Thickness = '4' | '6' | '10' | '15' | '19';

interface GlassSpec {
  fe2o3: string;
  vlt: number;
  bStarShift: number;
  edgeColor: string;
  edgeHex: string;
}

const DATA: Record<Mode, Record<Thickness, GlassSpec>> = {
  'standard': {
    '4':  { fe2o3: '0.10 to 0.15', vlt: 90, bStarShift: 1.2, edgeColor: 'Faint green',   edgeHex: '#cfe3cc' },
    '6':  { fe2o3: '0.10 to 0.15', vlt: 88, bStarShift: 2.0, edgeColor: 'Clear green',   edgeHex: '#a8d3a4' },
    '10': { fe2o3: '0.10 to 0.15', vlt: 83, bStarShift: 3.6, edgeColor: 'Strong green',  edgeHex: '#78bd7a' },
    '15': { fe2o3: '0.10 to 0.15', vlt: 78, bStarShift: 5.1, edgeColor: 'Deep green',    edgeHex: '#4ea059' },
    '19': { fe2o3: '0.10 to 0.15', vlt: 75, bStarShift: 6.4, edgeColor: 'Bottle green',  edgeHex: '#2e8a44' },
  },
  'low-iron': {
    '4':  { fe2o3: 'under 0.01',   vlt: 92, bStarShift: 0.2, edgeColor: 'Near colorless', edgeHex: '#edf5ee' },
    '6':  { fe2o3: 'under 0.01',   vlt: 91, bStarShift: 0.4, edgeColor: 'Near colorless', edgeHex: '#e5f1e8' },
    '10': { fe2o3: 'under 0.01',   vlt: 91, bStarShift: 0.6, edgeColor: 'Pale blue tint', edgeHex: '#dce9e7' },
    '15': { fe2o3: 'under 0.01',   vlt: 90, bStarShift: 0.9, edgeColor: 'Pale blue tint', edgeHex: '#cce0dd' },
    '19': { fe2o3: 'under 0.01',   vlt: 89, bStarShift: 1.1, edgeColor: 'Faint blue',     edgeHex: '#b9d4d0' },
  },
};

interface Props {
  initialMode?: Mode;
  initialThickness?: Thickness;
}

export default function IronContentComparator({
  initialMode = 'standard',
  initialThickness = '10',
}: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [thickness, setThickness] = useState<Thickness>(initialThickness);

  const spec = DATA[mode][thickness];
  const vltBarWidth = `${spec.vlt}%`;

  const other: Mode = mode === 'standard' ? 'low-iron' : 'standard';
  const otherSpec = DATA[other][thickness];
  const vltDelta = spec.vlt - otherSpec.vlt;

  return (
    <div className="my-10 rounded-xl bg-[#3A4250]/15 border border-[#3A4250]/40 p-6 md:p-8">
      <div className="mb-5">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
          Interactive Comparator
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Iron Content and Visible Light Transmission
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {(['standard', 'low-iron'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-[#DAA745] text-[#1C1F26]'
                : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
            }`}
          >
            {m === 'standard' ? 'Standard Float' : 'Low Iron Float'}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Thickness</div>
        <div className="grid grid-cols-5 gap-2">
          {(['4', '6', '10', '15', '19'] as Thickness[]).map((t) => (
            <button
              key={t}
              onClick={() => setThickness(t)}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                thickness === t
                  ? 'bg-[#F2F0ED] text-[#1C1F26]'
                  : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
              }`}
            >
              {t} mm
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-lg bg-[#1C1F26] p-5 border border-[#3A4250]/30">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">
            Visible Light Transmission
          </div>
          <div className="text-3xl font-bold text-[#F2F0ED] mb-3">
            {spec.vlt}
            <span className="text-base font-normal text-[#8B95A5] ml-1">percent</span>
          </div>
          <div className="h-2 bg-[#3A4250]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DAA745] transition-all duration-300"
              style={{ width: vltBarWidth }}
            />
          </div>
          <div className="text-xs text-[#8B95A5] mt-2">
            {vltDelta > 0
              ? `${vltDelta} points higher than ${other === 'standard' ? 'standard' : 'low iron'} at this thickness`
              : `${Math.abs(vltDelta)} points lower than ${other === 'standard' ? 'standard' : 'low iron'} at this thickness`}
          </div>
        </div>

        <div className="rounded-lg bg-[#1C1F26] p-5 border border-[#3A4250]/30">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">
            Edge Color (Field Test)
          </div>
          <div
            className="h-14 rounded-md mb-3 border border-[#3A4250]/60"
            style={{ background: spec.edgeHex }}
            aria-label={`Edge color sample: ${spec.edgeColor}`}
          />
          <div className="text-sm font-medium text-[#F2F0ED]">{spec.edgeColor}</div>
          <div className="text-xs text-[#8B95A5] mt-1">
            Hold the glass sample on its edge against a white sheet to verify
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 text-center border-t border-[#3A4250]/30 pt-4">
        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">
            Fe2O3 Content (percent by weight)
          </div>
          <div className="text-lg font-semibold text-[#F2F0ED]">{spec.fe2o3}</div>
        </div>
        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">
            Color Shift (b-star)
          </div>
          <div className="text-lg font-semibold text-[#F2F0ED]">
            plus {spec.bStarShift}
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-[#8B95A5] italic">
        Reference values. Actual VLT varies by glass maker and specific tempering or coating treatment. Data verified: 2026-11-02.
      </div>
    </div>
  );
}
