'use client';

import { useState } from 'react';

type Failure = 'bubbles' | 'delamination' | 'yellowing' | 'haze' | 'perfect';

interface FailureInfo {
  title: string;
  cause: string;
  prevention: string;
  color: string;
}

const info: Record<Failure, FailureInfo> = {
  perfect: {
    title: 'Perfect Lamination',
    cause: 'Clean process, proper autoclave cycle, correct PVB handling.',
    prevention: 'No defects visible. Glass is uniformly clear with no interlayer artifacts.',
    color: '#34D399',
  },
  bubbles: {
    title: 'Trapped Air Bubbles',
    cause: 'Insufficient autoclave pressure during de-airing phase, or incomplete pre-press before autoclave. Can also result from PVB sheet contamination or wrinkles.',
    prevention: 'Pre-press at ~90°C before autoclave to compress trapped air. Maintain minimum 10 bar during PVB flow phase. Inspect PVB sheet for wrinkles before assembly.',
    color: '#EF4444',
  },
  delamination: {
    title: 'Edge Delamination',
    cause: 'Moisture ingress attacking the PVB-glass bond at exposed edges. Most common in frameless installations with PVB (not SGP) interlayer. Also from UV-exposed edges on south-facing facades.',
    prevention: 'Specify SGP interlayer for exposed-edge applications (hurricane zones, structural glass). Dry-glaze PVB panels with proper edge sealing. Avoid PVB in high-humidity environments without edge protection.',
    color: '#F59E0B',
  },
  yellowing: {
    title: 'Interlayer Yellowing',
    cause: 'Long-term UV degradation of substandard PVB, or PVB that was not stored properly (humidity, high temperature) before lamination. Also seen in older EVA interlayers.',
    prevention: 'Use UV-stabilized PVB from reputable suppliers (Kuraray, Eastman, Trosifol). Store PVB in climate-controlled room before use. Specify Low-Iron glass for color-critical applications to minimize greenish tint compounding.',
    color: '#FBBF24',
  },
  haze: {
    title: 'Interlayer Haze',
    cause: 'Water contamination of PVB during storage or handling. PVB is hygroscopic — absorbs moisture from the air, which causes cloudiness after autoclave. Also from improper cool-down (pressure released too early).',
    prevention: 'Store PVB sealed with desiccant. Climate-controlled lamination room (<50% RH). Maintain full pressure throughout cool-down below PVB flow point (~90°C).',
    color: '#A78BFA',
  },
};

const failures: Failure[] = ['perfect', 'bubbles', 'delamination', 'yellowing', 'haze'];

export default function DelaminationFailureViewer() {
  const [active, setActive] = useState<Failure>('perfect');
  const current = info[active];

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-5">
        Common Lamination Defects — What They Look Like, Why They Happen
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {failures.map((f) => {
          const i = info[f];
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                isActive ? 'text-white' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40'
              }`}
              style={isActive ? { backgroundColor: i.color, borderColor: i.color } : {}}
            >
              {i.title}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
        {/* SVG visualization */}
        <div className="flex justify-center">
          <svg viewBox="0 0 240 240" className="w-full max-w-[260px]" xmlns="http://www.w3.org/2000/svg">
            {/* Frame */}
            <rect x="10" y="10" width="220" height="220" fill="none" stroke="#8B95A5" strokeWidth="1.5" opacity="0.5" />

            {/* Glass panel representation */}
            <rect x="20" y="20" width="200" height="200" fill="#A5F3FC" fillOpacity="0.15" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />

            {active === 'perfect' && (
              <g opacity="0.3">
                <circle cx="80" cy="80" r="2" fill="#60A5FA" />
                <circle cx="160" cy="160" r="2" fill="#60A5FA" />
                <text x="120" y="130" textAnchor="middle" className="fill-[#34D399] text-[10px] font-medium">
                  Optically clear
                </text>
              </g>
            )}

            {active === 'bubbles' && (
              <g>
                {[
                  [50, 60, 6], [120, 90, 4], [180, 70, 5], [70, 150, 7],
                  [150, 170, 5], [100, 200, 4], [190, 140, 6], [40, 110, 3],
                  [130, 50, 4], [170, 200, 5],
                ].map(([cx, cy, r], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            )}

            {active === 'delamination' && (
              <g>
                {/* Delaminated edges */}
                <rect x="20" y="20" width="200" height="15" fill="#F59E0B" fillOpacity="0.3" />
                <rect x="20" y="205" width="200" height="15" fill="#F59E0B" fillOpacity="0.3" />
                <path d="M 20 35 Q 60 50 100 42 T 180 48 L 220 35 L 220 20 L 20 20 Z" fill="#F59E0B" fillOpacity="0.15" />
                <text x="120" y="30" textAnchor="middle" className="fill-[#F59E0B] text-[9px] font-medium">
                  Delaminated edge
                </text>
              </g>
            )}

            {active === 'yellowing' && (
              <rect x="20" y="20" width="200" height="200" fill="#FBBF24" fillOpacity="0.25" />
            )}

            {active === 'haze' && (
              <g>
                <defs>
                  <radialGradient id="haze">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="120" cy="120" r="90" fill="url(#haze)" />
                <circle cx="80" cy="80" r="40" fill="url(#haze)" />
                <circle cx="170" cy="150" r="35" fill="url(#haze)" />
              </g>
            )}

            {/* Side labels */}
            <text x="120" y="235" textAnchor="middle" className="fill-[#8B95A5] text-[9px]">
              Front view of laminated panel
            </text>
          </svg>
        </div>

        {/* Details */}
        <div
          className="bg-[#1C1F26]/40 rounded-lg p-5 border"
          style={{ borderColor: current.color + '50' }}
        >
          <h4 className="text-lg font-bold m-0 mb-3" style={{ color: current.color }}>
            {current.title}
          </h4>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-wider text-[#8B95A5] font-medium mb-1.5">
              Root cause
            </p>
            <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{current.cause}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1.5">
              Prevention
            </p>
            <p className="text-sm text-[#F2F0ED]/90 leading-relaxed m-0">{current.prevention}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
