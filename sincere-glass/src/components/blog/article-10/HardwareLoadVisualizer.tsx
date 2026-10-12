'use client';

import { useState } from 'react';

type Thickness = 6 | 8 | 10 | 12;

/**
 * HardwareLoadVisualizer — shows how glass thickness drives hinge load.
 * Door panel geometry: 2000 × 760 mm (industry baseline).
 * Density of soda-lime glass: 2.5 kg/dm³ = 2500 kg/m³.
 * Panel weight = 2.0 × 0.76 × (t/1000) × 2500.
 * Load per hinge assumes 2 pivot hinges, 70/30 top/bottom split.
 */
export default function HardwareLoadVisualizer() {
  const [thickness, setThickness] = useState<Thickness>(10);

  const area = 2.0 * 0.76; // m²
  const weight = area * (thickness / 1000) * 2500; // kg
  const topHinge = weight * 0.7;
  const bottomHinge = weight * 0.3;

  // Hardware ratings (typical mid-range frameless shower hinge).
  const hingeMaxRating: Record<Thickness, number> = {
    6: 20,   // 6mm clamp hardware
    8: 25,   // 8mm standard
    10: 35,  // 10mm standard
    12: 50,  // 12mm heavy-duty
  };
  const rating = hingeMaxRating[thickness];
  const utilization = Math.round((topHinge / rating) * 100);

  const colorByUtil =
    utilization < 60 ? '#4ade80' : utilization < 85 ? '#DAA745' : '#f87171';

  return (
    <div className="my-10 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1h1a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1h1z" />
        </svg>
        <span className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
          Hinge Load vs Glass Thickness
        </span>
      </div>

      <h3 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-2">
        How thickness drives hardware demand
      </h3>
      <p className="text-sm text-[#8B95A5] m-0 mb-5 leading-relaxed">
        Standard frameless shower door: 2000 × 760 mm. Soda-lime glass density = 2500 kg/m³.
        Top pivot carries ~70% of panel weight.
      </p>

      <div className="flex gap-2 mb-6">
        {([6, 8, 10, 12] as const).map((t) => (
          <button
            key={t}
            onClick={() => setThickness(t)}
            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              thickness === t
                ? 'bg-[#DAA745] text-[#1C1F26]'
                : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]'
            }`}
          >
            {t} mm
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 items-start">
        {/* SVG door panel */}
        <div className="rounded-lg bg-[#1C1F26] p-4">
          <svg
            viewBox="0 0 260 320"
            className="w-full h-auto"
            role="img"
            aria-label={`Shower door panel with ${thickness}mm glass, showing hinge load distribution`}
          >
            <defs>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8B95A5" stopOpacity="0.15" />
                <stop offset="1" stopColor="#8B95A5" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Wall jamb */}
            <rect x="10" y="20" width="12" height="280" fill="#3A4250" rx="2" />

            {/* Glass panel */}
            <rect
              x="30"
              y="30"
              width="200"
              height="260"
              fill="url(#glassGrad)"
              stroke="#8B95A5"
              strokeWidth={thickness * 0.4}
              rx="2"
            />

            {/* Top hinge */}
            <g>
              <rect x="18" y="48" width="24" height="18" fill="#DAA745" rx="2" />
              <circle cx="30" cy="57" r="4" fill="#1C1F26" />
              <text x="52" y="55" fill="#F2F0ED" fontSize="11" fontWeight="600">
                {topHinge.toFixed(1)} kg
              </text>
              <text x="52" y="68" fill="#8B95A5" fontSize="9">
                70% load (top pivot)
              </text>
            </g>

            {/* Bottom hinge */}
            <g>
              <rect x="18" y="252" width="24" height="18" fill="#DAA745" rx="2" />
              <circle cx="30" cy="261" r="4" fill="#1C1F26" />
              <text x="52" y="259" fill="#F2F0ED" fontSize="11" fontWeight="600">
                {bottomHinge.toFixed(1)} kg
              </text>
              <text x="52" y="272" fill="#8B95A5" fontSize="9">
                30% load (bottom)
              </text>
            </g>

            {/* Panel label */}
            <text x="130" y="160" textAnchor="middle" fill="#F2F0ED" fontSize="13" fontWeight="600">
              {thickness} mm tempered
            </text>
            <text x="130" y="178" textAnchor="middle" fill="#8B95A5" fontSize="10">
              2000 × 760 mm
            </text>
            <text x="130" y="194" textAnchor="middle" fill="#DAA745" fontSize="18" fontWeight="700">
              {weight.toFixed(1)} kg
            </text>
            <text x="130" y="208" textAnchor="middle" fill="#8B95A5" fontSize="9">
              total panel weight
            </text>
          </svg>
        </div>

        {/* Utilization panel */}
        <div className="space-y-4">
          <div className="rounded-lg bg-[#1C1F26] p-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs text-[#8B95A5] uppercase tracking-wider">
                Top hinge load
              </span>
              <span className="text-sm text-[#F2F0ED] font-semibold">
                {topHinge.toFixed(1)} / {rating} kg
              </span>
            </div>
            <div className="h-3 bg-[#3A4250]/40 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(utilization, 100)}%`,
                  backgroundColor: colorByUtil,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#8B95A5] mt-1">
              <span>0 kg</span>
              <span>Hinge rated for {rating} kg</span>
            </div>
            <div className="mt-3 text-sm font-semibold" style={{ color: colorByUtil }}>
              {utilization}% utilization
              {utilization >= 85 && ' — spec heavier hinge'}
              {utilization < 60 && ' — safe margin'}
            </div>
          </div>

          <div className="rounded-lg bg-[#3A4250]/20 p-4 text-xs text-[#8B95A5] leading-relaxed">
            <strong className="text-[#F2F0ED] block mb-1">Hardware rating reference</strong>
            6 mm clamp hardware: ~20 kg per pivot ·
            8 mm: ~25 kg ·
            10 mm: ~35 kg ·
            12 mm: ~50 kg (heavy-duty).
            Verify with your hardware supplier's load chart before ordering.
          </div>
        </div>
      </div>
    </div>
  );
}
