'use client';

import { useState } from 'react';

interface GlassType {
  name: string;
  stress: number;  // MPa — surface compressive stress
  color: string;
  relative: string; // multiplier vs annealed
}

const types: GlassType[] = [
  { name: 'Annealed Glass', stress: 40, color: '#64748B', relative: '1×' },
  { name: 'Heat-Strengthened', stress: 80, color: '#60A5FA', relative: '2×' },
  { name: 'Tempered Glass', stress: 180, color: '#FBBF24', relative: '4-5×' },
  { name: 'Chemically Strengthened', stress: 500, color: '#A78BFA', relative: '~10×' },
];

const MAX = 550;

export default function StrengthSimulator() {
  const [hovered, setHovered] = useState<number | null>(2);

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
            Surface Compressive Stress
          </p>
          <p className="text-xs text-[#8B95A5]">Higher = harder to break</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8B95A5]">Measured in</p>
          <p className="text-sm text-[#F2F0ED] font-mono">MPa</p>
        </div>
      </div>

      <div className="space-y-4">
        {types.map((t, i) => {
          const active = hovered === i;
          const widthPercent = (t.stress / MAX) * 100;
          return (
            <div
              key={t.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer group"
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className={`text-sm font-medium transition-colors ${
                  active ? 'text-[#F2F0ED]' : 'text-[#8B95A5]'
                }`}>
                  {t.name}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-[#8B95A5] font-mono">{t.relative}</span>
                  <span className={`text-lg font-bold font-mono transition-colors ${
                    active ? 'text-[#DAA745]' : 'text-[#F2F0ED]/70'
                  }`}>
                    {t.stress}
                  </span>
                </div>
              </div>
              <div className="h-3 bg-[#3A4250]/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: t.color,
                    opacity: active ? 1 : 0.75,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-[#3A4250]/30 text-xs text-[#8B95A5] leading-relaxed">
        <p className="mb-2">
          <strong className="text-[#F2F0ED]">Why the gap matters:</strong> annealed glass fractures
          at the lowest stress — a dropped tool, a thermal shock, or wind load on a large pane can
          exceed its 40 MPa threshold. Tempered glass handles roughly 4-5× that stress <em>and</em>
          breaks into harmless granules instead of sharp shards.
        </p>
        <p className="m-0 italic">
          Reference: ASTM C1048 and GB 15763.2 for tempered glass surface stress requirements.
        </p>
      </div>
    </div>
  );
}
