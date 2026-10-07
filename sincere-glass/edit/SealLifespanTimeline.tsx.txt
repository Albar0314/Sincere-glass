'use client';

import { useState } from 'react';

type System = 'single' | 'dual-standard' | 'dual-premium';

interface SealSystem {
  key: System;
  name: string;
  primary: string;
  secondary: string;
  color: string;
  // Failure curve: [year, % still sealed]
  curve: Array<[number, number]>;
  expectedLife: string;
  description: string;
}

const systems: SealSystem[] = [
  {
    key: 'single',
    name: 'Single Seal (Budget)',
    primary: 'Hot-melt butyl only',
    secondary: 'None',
    color: '#EF4444',
    curve: [[0, 100], [3, 95], [5, 85], [7, 65], [10, 40], [12, 20], [15, 5], [20, 0], [25, 0]],
    expectedLife: '5-10 years',
    description: 'Only used in low-cost residential windows. Fails quickly from UV exposure and moisture ingress. Not suitable for commercial glazing or any high-performance application. We do not produce single-seal IGUs.',
  },
  {
    key: 'dual-standard',
    name: 'Dual Seal — PIB + Polysulfide',
    primary: 'PIB (polyisobutylene)',
    secondary: 'Polysulfide',
    color: '#F59E0B',
    curve: [[0, 100], [5, 99], [10, 97], [15, 93], [20, 85], [25, 70], [30, 50]],
    expectedLife: '20-25 years',
    description: 'The baseline commercial IGU seal. PIB provides the gas and moisture barrier; polysulfide provides structural strength. Cost-effective for most commercial applications. Standard for mid-tier curtain walls.',
  },
  {
    key: 'dual-premium',
    name: 'Dual Seal — PIB + Silicone',
    primary: 'PIB (polyisobutylene)',
    secondary: 'Structural silicone',
    color: '#34D399',
    curve: [[0, 100], [5, 100], [10, 99], [15, 97], [20, 94], [25, 90], [30, 85]],
    expectedLife: '30+ years',
    description: 'The premium seal system. Silicone is UV-stable and remains flexible across wide temperature ranges, making it ideal for structural glazing and high-rise curtain walls where facade replacement is costly. Our standard spec.',
  },
];

export default function SealLifespanTimeline() {
  const [selected, setSelected] = useState<System[]>(['dual-standard', 'dual-premium']);

  function toggle(k: System) {
    if (selected.includes(k)) {
      if (selected.length > 1) setSelected(selected.filter((x) => x !== k));
    } else {
      setSelected([...selected, k]);
    }
  }

  // SVG dimensions
  const width = 700;
  const height = 300;
  const padL = 50;
  const padR = 20;
  const padT = 30;
  const padB = 50;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const MAX_YEAR = 30;
  const toX = (year: number) => padL + (year / MAX_YEAR) * plotW;
  const toY = (pct: number) => padT + plotH - (pct / 100) * plotH;

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-5">
        Seal System Lifespan — % of IGUs Still Sealed Over Time
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {systems.map((s) => {
          const active = selected.includes(s.key);
          return (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              className={'px-4 py-2 rounded-full text-xs font-medium transition-all border ' + (
                active ? 'text-white' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40'
              )}
              style={active ? { backgroundColor: s.color, borderColor: s.color } : {}}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={'0 0 ' + width + ' ' + height} className="w-full min-w-[500px]" xmlns="http://www.w3.org/2000/svg">
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((p) => (
            <g key={p}>
              <line
                x1={padL}
                y1={toY(p)}
                x2={width - padR}
                y2={toY(p)}
                stroke="#3A4250"
                strokeWidth="0.5"
                opacity="0.4"
                strokeDasharray="3,3"
              />
              <text
                x={padL - 8}
                y={toY(p) + 4}
                textAnchor="end"
                className="fill-[#8B95A5] text-[10px] font-mono"
              >
                {p}%
              </text>
            </g>
          ))}

          {/* Vertical year markers */}
          {[0, 5, 10, 15, 20, 25, 30].map((y) => (
            <g key={y}>
              <line
                x1={toX(y)}
                y1={padT}
                x2={toX(y)}
                y2={height - padB}
                stroke="#3A4250"
                strokeWidth="0.5"
                opacity="0.2"
              />
              <text
                x={toX(y)}
                y={height - padB + 18}
                textAnchor="middle"
                className="fill-[#8B95A5] text-[10px] font-mono"
              >
                {y}y
              </text>
            </g>
          ))}

          {/* Curves */}
          {selected.map((k) => {
            const s = systems.find((x) => x.key === k)!;
            const path = s.curve.map((pt, i) => (i === 0 ? 'M' : 'L') + ' ' + toX(pt[0]) + ' ' + toY(pt[1])).join(' ');
            return (
              <g key={k}>
                <path d={path} fill="none" stroke={s.color} strokeWidth="2.5" />
                {s.curve.map((pt, i) => (
                  <circle
                    key={i}
                    cx={toX(pt[0])}
                    cy={toY(pt[1])}
                    r="3"
                    fill={s.color}
                    stroke="#1C1F26"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })}

          {/* 10-year reference line */}
          <line
            x1={toX(10)}
            y1={padT}
            x2={toX(10)}
            y2={height - padB}
            stroke="#DAA745"
            strokeWidth="1"
            strokeDasharray="4,2"
            opacity="0.5"
          />
          <text
            x={toX(10)}
            y={padT - 8}
            textAnchor="middle"
            className="fill-[#DAA745] text-[9px]"
          >
            10-yr industry warranty
          </text>

          {/* X-axis label */}
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            className="fill-[#8B95A5] text-[10px]"
          >
            Years After Installation
          </text>
        </svg>
      </div>

      {/* Legend/detail cards */}
      <div className="grid gap-3 mt-6">
        {selected.map((k) => {
          const s = systems.find((x) => x.key === k)!;
          return (
            <div
              key={k}
              className="bg-[#1C1F26]/40 rounded-lg p-4 border"
              style={{ borderColor: s.color + '50' }}
            >
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">{s.name}</h4>
                </div>
                <span className="text-xs font-mono" style={{ color: s.color }}>
                  Expected life: {s.expectedLife}
                </span>
              </div>
              <p className="text-xs text-[#8B95A5] mb-2">
                <strong className="text-[#F2F0ED]">Primary:</strong> {s.primary} ·{' '}
                <strong className="text-[#F2F0ED]">Secondary:</strong> {s.secondary}
              </p>
              <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{s.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
