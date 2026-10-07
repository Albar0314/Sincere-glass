'use client';

import { useState } from 'react';

interface Gas {
  key: string;
  name: string;
  conductivity: number; // W/m·K at 20°C
  cost: string;
  uValue: number; // U-value of 6+12G+6 IGU with Low-E, W/m²·K
  description: string;
  color: string;
}

const gases: Gas[] = [
  {
    key: 'air',
    name: 'Dry Air',
    conductivity: 0.0253,
    cost: 'Free',
    uValue: 1.8,
    description: 'Standard reference. Dried before sealing to prevent internal condensation. Suitable for budget-conscious projects and residential applications in mild climates.',
    color: '#94A3B8',
  },
  {
    key: 'argon',
    name: 'Argon',
    conductivity: 0.0177,
    cost: '~$2-3/m² added',
    uValue: 1.4,
    description: 'Industry-standard upgrade. ~30% lower thermal conductivity than air. Fills about 90-95% of the cavity (small fraction remains air). The best cost/performance ratio for commercial glazing.',
    color: '#60A5FA',
  },
  {
    key: 'krypton',
    name: 'Krypton',
    conductivity: 0.0094,
    cost: '~$30-50/m² added',
    uValue: 1.1,
    description: 'Premium gas. ~2.7× more insulating than air. Primarily used in narrow cavities (6-10mm) where argon loses performance due to convection. Common in triple-pane IGUs and Passive House construction.',
    color: '#A78BFA',
  },
  {
    key: 'xenon',
    name: 'Xenon',
    conductivity: 0.0052,
    cost: '~$200+/m² added',
    uValue: 0.9,
    description: 'Research-grade. Rarely used commercially due to cost. Primarily specified for ultra-thin aerospace or specialty laboratory applications. Not economically justifiable for building glazing.',
    color: '#F59E0B',
  },
];

const MAX_COND = 0.03;
const MAX_U = 2.0;

export default function GasConductivityChart() {
  const [active, setActive] = useState('argon');
  const current = gases.find((g) => g.key === active)!;

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-5">
        Gas Fill Options — Thermal Impact
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {gases.map((g) => {
          const isActive = active === g.key;
          return (
            <button
              key={g.key}
              onClick={() => setActive(g.key)}
              className={'px-4 py-2 rounded-full text-sm font-medium transition-all border ' + (
                isActive ? 'text-white' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40'
              )}
              style={isActive ? { backgroundColor: g.color, borderColor: g.color } : {}}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      {/* Two-bar comparison */}
      <div className="space-y-5 mb-6">
        {/* Thermal conductivity bar */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-medium text-[#F2F0ED]">
              Thermal Conductivity
            </span>
            <span className="text-sm font-mono text-[#DAA745]">
              {current.conductivity.toFixed(4)} W/m·K
            </span>
          </div>
          <div className="relative h-8 bg-[#1C1F26]/60 rounded-full overflow-hidden">
            {/* All gases shown as transparent reference bars */}
            {gases.map((g) => (
              <div
                key={g.key}
                className="absolute top-0 bottom-0 border-r"
                style={{
                  left: 0,
                  width: ((g.conductivity / MAX_COND) * 100) + '%',
                  borderColor: g.color + (g.key === active ? 'FF' : '40'),
                  opacity: g.key === active ? 1 : 0.15,
                  backgroundColor: g.color,
                  transition: 'all 0.4s',
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-end pr-3">
              <span className="text-xs text-[#8B95A5]">Lower = better insulation</span>
            </div>
          </div>
        </div>

        {/* U-value bar */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-medium text-[#F2F0ED]">
              Resulting IGU U-value <span className="text-xs text-[#8B95A5]">(6+12G+6, Low-E)</span>
            </span>
            <span className="text-sm font-mono text-[#DAA745]">
              {current.uValue.toFixed(1)} W/m²·K
            </span>
          </div>
          <div className="relative h-8 bg-[#1C1F26]/60 rounded-full overflow-hidden">
            {gases.map((g) => (
              <div
                key={g.key}
                className="absolute top-0 bottom-0 border-r"
                style={{
                  left: 0,
                  width: ((g.uValue / MAX_U) * 100) + '%',
                  borderColor: g.color + (g.key === active ? 'FF' : '40'),
                  opacity: g.key === active ? 1 : 0.15,
                  backgroundColor: g.color,
                  transition: 'all 0.4s',
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-end pr-3">
              <span className="text-xs text-[#8B95A5]">Lower U-value = better overall thermal performance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div
        className="bg-[#1C1F26]/40 rounded-lg p-5 border"
        style={{ borderColor: current.color + '50' }}
      >
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h4 className="text-lg font-bold m-0" style={{ color: current.color }}>
            {current.name}
          </h4>
          <span className="text-xs font-mono text-[#8B95A5]">
            Added cost: {current.cost}
          </span>
        </div>
        <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{current.description}</p>
      </div>
    </div>
  );
}
