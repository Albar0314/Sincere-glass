'use client';

import { useState, useEffect } from 'react';

type ClassId = 'class3' | 'class2' | 'class1';

interface ImpactClass {
  id: ClassId;
  label: string;
  dropHeight: number;      // mm
  usage: string;
  // Pass/fail for the three build-ups from the previous component
  passFail: { monolithic: boolean; pvb: boolean; sgp: boolean };
}

const CLASSES: ImpactClass[] = [
  {
    id: 'class3',
    label: 'Class 3(B)3 — 190 mm drop',
    dropHeight: 190,
    usage: 'Low-risk: interior partitions, decorative glass. Rarely accepted for guard duty.',
    passFail: { monolithic: true, pvb: true, sgp: true },
  },
  {
    id: 'class2',
    label: 'Class 2(B)2 — 450 mm drop',
    dropHeight: 450,
    usage:
      'Minimum for most residential balustrades and glass guards with a continuous top-rail.',
    passFail: { monolithic: false, pvb: true, sgp: true },
  },
  {
    id: 'class1',
    label: 'Class 1(B)1 — 1200 mm drop',
    dropHeight: 1200,
    usage:
      'Required for frameless/structural balustrades, commercial public access, overhead and no-top-rail configurations.',
    passFail: { monolithic: false, pvb: false, sgp: true },
  },
];

export default function PendulumImpactSimulator() {
  const [activeId, setActiveId] = useState<ClassId>('class2');
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const active = CLASSES.find((c) => c.id === activeId)!;

  // Drive the pendulum animation via a frame counter
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const start = performance.now();
    const duration = 2000;
    const loop = (t: number) => {
      const elapsed = t - start;
      setFrame(Math.min(1, elapsed / duration));
      if (elapsed < duration) {
        raf = requestAnimationFrame(loop);
      } else {
        setPlaying(false);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const trigger = () => {
    setFrame(0);
    setPlaying(true);
  };

  // Pendulum pivot at (260, 30). String length 180. Angle swings from -70° (lifted) to 0° (vertical).
  // frame 0..1 maps to the swing.
  const ease = frame < 0.5 ? 2 * frame * frame : 1 - Math.pow(-2 * frame + 2, 2) / 2;
  const angleStart = -70;
  const angleEnd = 0;
  const angle = angleStart + (angleEnd - angleStart) * ease;
  const rad = (angle * Math.PI) / 180;
  const impactorX = 260 + 180 * Math.sin(rad);
  const impactorY = 30 + 180 * Math.cos(rad);

  // Simple "crack" overlay drawn after impact
  const impacted = frame >= 0.98;

  return (
    <div className="my-10 bg-[#1C1F26] border border-[#3A4250]/40 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
          EN 12600 pendulum impact
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          Drop the 50 kg impactor — see which build-up survives
        </h3>
      </div>

      {/* Class selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {CLASSES.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveId(c.id);
                setFrame(0);
                setPlaying(false);
              }}
              className={`text-left p-3 rounded-xl border transition-all ${
                isActive
                  ? 'border-[#DAA745] bg-[#DAA745]/10'
                  : 'border-[#3A4250]/40 bg-[#3A4250]/10 hover:border-[#3A4250]'
              }`}
            >
              <div
                className={`text-sm font-semibold ${
                  isActive ? 'text-[#DAA745]' : 'text-[#F2F0ED]'
                }`}
              >
                {c.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-[#F2F0ED]/5 rounded-xl p-4 border border-[#3A4250]/30 mb-5">
        <svg viewBox="0 0 500 280" className="w-full h-auto" aria-hidden>
          {/* Floor */}
          <line x1="20" y1="260" x2="480" y2="260" stroke="#3A4250" strokeWidth="1.5" />
          {/* Specimen frame */}
          <rect x="40" y="60" width="12" height="200" fill="#3A4250" />
          <rect x="68" y="60" width="12" height="200" fill="#3A4250" />
          {/* Glass panel */}
          <rect
            x="52"
            y="80"
            width="26"
            height="170"
            fill="#CFE2E8"
            fillOpacity="0.55"
            stroke="#8EB3BE"
          />
          {impacted && (
            <>
              <path
                d="M55 140 L75 145 M55 150 L75 148 M57 160 L75 155 M58 142 L74 160 M60 150 L72 165"
                stroke="#1C1F26"
                strokeWidth="0.8"
                fill="none"
                opacity="0.85"
              />
              <circle cx="65" cy="150" r="3" fill="#1C1F26" />
            </>
          )}

          {/* Height marker (reference line showing active drop height, scaled visually) */}
          <line
            x1="100"
            y1={260 - (active.dropHeight / 1200) * 180}
            x2="440"
            y2={260 - (active.dropHeight / 1200) * 180}
            stroke="#DAA745"
            strokeDasharray="3 3"
            opacity="0.7"
          />
          <text
            x="105"
            y={260 - (active.dropHeight / 1200) * 180 - 4}
            fontSize="10"
            fill="#DAA745"
            fontWeight="600"
          >
            drop height {active.dropHeight} mm
          </text>

          {/* Pivot */}
          <circle cx="260" cy="30" r="4" fill="#8B95A5" />
          <text x="268" y="34" fontSize="9" fill="#8B95A5">
            pivot
          </text>
          {/* String */}
          <line
            x1="260"
            y1="30"
            x2={impactorX}
            y2={impactorY}
            stroke="#8B95A5"
            strokeWidth="1.5"
          />
          {/* Impactor (50 kg twin-tyre bag) */}
          <circle cx={impactorX} cy={impactorY} r="18" fill="#DAA745" />
          <text x={impactorX} y={impactorY + 3} textAnchor="middle" fontSize="9" fill="#1C1F26" fontWeight="700">
            50 kg
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <button
          onClick={trigger}
          disabled={playing}
          className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors disabled:opacity-50"
        >
          {playing ? 'Dropping...' : 'Drop impactor'}
        </button>
        <p className="text-xs text-[#8B95A5] italic max-w-md text-right">
          Per EN 12600, a 50 kg twin-tyre impactor is dropped at the class-specified height. The
          glass must either not break, or break safely (laminate retains fragments).
        </p>
      </div>

      <div className="bg-[#3A4250]/15 rounded-xl p-5 border border-[#3A4250]/30 mb-4">
        <div className="text-sm text-[#8B95A5] mb-4">{active.usage}</div>
        <div className="grid grid-cols-3 gap-3">
          {(['monolithic', 'pvb', 'sgp'] as const).map((bid) => {
            const pass = active.passFail[bid];
            const labels: Record<typeof bid, string> = {
              monolithic: '12 mm Mono Temp',
              pvb: '8-1.52-8 PVB',
              sgp: '10-1.52-10 SGP',
            };
            return (
              <div
                key={bid}
                className={`rounded-lg p-3 border ${
                  pass
                    ? 'border-green-500/40 bg-green-500/10'
                    : 'border-red-500/40 bg-red-500/10'
                }`}
              >
                <div className="text-xs text-[#F2F0ED] font-mono mb-1">{labels[bid]}</div>
                <div
                  className={`text-sm font-bold ${
                    pass ? 'text-green-300' : 'text-red-300'
                  }`}
                >
                  {pass ? '✓ Passes' : '✗ Not accepted'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-[#8B95A5] italic">
        Pass/fail shown reflects typical EN 12600 outcomes for these build-ups when installed as
        guards with code-specified mounting. A monolithic tempered panel can pass Class 2 as a
        bare specimen, but is widely restricted in guard duty because post-breakage behaviour —
        not pendulum behaviour — is what prevents a fall.
      </p>
    </div>
  );
}
