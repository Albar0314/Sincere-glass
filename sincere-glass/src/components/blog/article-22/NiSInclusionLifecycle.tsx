'use client';

import { useState } from 'react';

/**
 * NiS inclusion lifecycle visualizer.
 * Shows 4 stages of nickel sulfide inclusion evolution inside tempered glass:
 *   1. Freshly tempered — α-phase trapped by rapid quench
 *   2. 1–3 years in service — slow α→β conversion begins
 *   3. β-phase expansion (+2–4% volume) stresses tensile core
 *   4. Spontaneous fracture propagates from the inclusion
 *
 * No external data; stage transitions are user-driven.
 */

type Stage = 0 | 1 | 2 | 3;

const STAGES: {
  key: Stage;
  label: string;
  time: string;
  title: string;
  caption: string;
}[] = [
  {
    key: 0,
    label: 'Day 0',
    time: 'Fresh from the quench',
    title: 'NiS inclusion trapped in α-phase',
    caption:
      'A rare NiS particle (typically 50–300 μm) survived float production and sits inside the glass. The 15-second air quench cooled the panel so fast that the inclusion is frozen in its high-temperature α-phase. No volume change yet. Panel ships.',
  },
  {
    key: 1,
    label: 'Year 1–3',
    time: 'In service',
    title: 'Slow α→β phase transition',
    caption:
      'At building ambient temperature (15–35°C), the α-phase is metastable. NiS atoms slowly rearrange into the β-phase crystal lattice. Rate depends on temperature history: sun-exposed facade glass converts faster than north-wall glass. Still no visible symptom.',
  },
  {
    key: 2,
    label: 'Year 3–7',
    time: 'β-phase forms',
    title: 'β-phase expansion stresses the core',
    caption:
      'β-phase occupies 2–4% more volume than α-phase. The expanding inclusion pushes outward on the surrounding glass. If the inclusion sits in the tempered glass tensile core (where internal stress is already ~50 MPa pulling outward), the local stress crosses the fracture limit.',
  },
  {
    key: 3,
    label: 'Hour 0',
    time: 'Fracture event',
    title: '"Spontaneous" breakage',
    caption:
      'Fracture nucleates at the inclusion and propagates through the entire panel at ~1,500 m/s. From the observer\'s side it looks spontaneous — nothing hit the glass. The signature is a classic "butterfly wing" pattern of two cuboid fragments cradling the inclusion, visible under microscope on recovered shards.',
  },
];

export default function NiSInclusionLifecycle() {
  const [stage, setStage] = useState<Stage>(0);
  const current = STAGES[stage];

  // Visual properties scale with stage
  const inclusionSize = 8 + stage * 4;              // grows across stages
  const stressRings = stage >= 2 ? 3 : 0;
  const cracks = stage === 3;

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold">
          Interactive &middot; NiS lifecycle
        </div>
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0 mt-1">
          How a 100-μm particle brings down a tempered glass panel
        </h3>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-0">
        {/* SVG visualization */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#3A4250]/40 bg-[#3A4250]/10 flex items-center justify-center">
          <svg
            viewBox="0 0 300 220"
            className="w-full max-w-[320px]"
            role="img"
            aria-label={`Stage ${stage + 1}: ${current.title}`}
          >
            {/* Glass panel cross-section */}
            <rect
              x="20"
              y="60"
              width="260"
              height="100"
              fill="#8B95A5"
              fillOpacity="0.15"
              stroke="#8B95A5"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />

            {/* Compression zones (surface) */}
            <rect x="20" y="60" width="260" height="18" fill="#DAA745" fillOpacity="0.18" />
            <rect x="20" y="142" width="260" height="18" fill="#DAA745" fillOpacity="0.18" />

            {/* Tensile core label */}
            <text
              x="150"
              y="54"
              textAnchor="middle"
              fontSize="8"
              fill="#8B95A5"
              fontFamily="monospace"
            >
              compression +100 MPa
            </text>
            <text
              x="150"
              y="175"
              textAnchor="middle"
              fontSize="8"
              fill="#8B95A5"
              fontFamily="monospace"
            >
              compression +100 MPa
            </text>
            <text
              x="150"
              y="115"
              textAnchor="middle"
              fontSize="9"
              fill="#8B95A5"
              fontFamily="monospace"
            >
              tensile core −50 MPa
            </text>

            {/* Stress rings around growing inclusion */}
            {Array.from({ length: stressRings }).map((_, i) => (
              <circle
                key={i}
                cx="150"
                cy="110"
                r={inclusionSize + 6 + i * 6}
                fill="none"
                stroke="#DAA745"
                strokeOpacity={0.5 - i * 0.12}
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            ))}

            {/* Crack lines */}
            {cracks && (
              <g stroke="#9A5555" strokeWidth="1.2" fill="none">
                <path d="M150 110 L24 62" />
                <path d="M150 110 L276 62" />
                <path d="M150 110 L24 158" />
                <path d="M150 110 L276 158" />
                <path d="M150 110 L80 60" />
                <path d="M150 110 L220 160" />
              </g>
            )}

            {/* The NiS inclusion itself */}
            <circle
              cx="150"
              cy="110"
              r={inclusionSize}
              fill={stage === 3 ? '#9A5555' : stage >= 2 ? '#DAA745' : '#3A4250'}
              stroke="#F2F0ED"
              strokeWidth="0.8"
            />
            <text
              x="150"
              y="113"
              textAnchor="middle"
              fontSize="7"
              fill="#F2F0ED"
              fontFamily="monospace"
              fontWeight="700"
            >
              NiS
            </text>

            {/* Time axis label */}
            <text
              x="150"
              y="205"
              textAnchor="middle"
              fontSize="10"
              fill="#DAA745"
              fontFamily="monospace"
              fontWeight="600"
            >
              {current.label}
            </text>
          </svg>
        </div>

        {/* Caption + stage controls */}
        <div className="p-6">
          <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">
            {current.time}
          </div>
          <h4 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-3">
            {current.title}
          </h4>
          <p className="text-sm text-[#8B95A5] leading-relaxed m-0 mb-5">
            {current.caption}
          </p>

          <div className="pt-5 border-t border-[#3A4250]/40">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-3">
              Walk the lifecycle
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStage(s.key)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    stage === s.key
                      ? 'bg-[#DAA745] text-[#1C1F26]'
                      : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#8B95A5]/70 mt-3 leading-relaxed">
              Heat soak testing (HST) accelerates stages 1–3 inside a controlled oven, so inclusions large enough to cause fracture do so in the factory, not in your building.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
