'use client';

import { useState } from 'react';

export default function BreakagePatternViewer() {
  const [view, setView] = useState<'annealed' | 'tempered'>('annealed');

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setView('annealed')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            view === 'annealed'
              ? 'bg-red-500 text-white'
              : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'
          }`}
        >
          Annealed Breakage
        </button>
        <button
          onClick={() => setView('tempered')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            view === 'tempered'
              ? 'bg-amber-500 text-[#1C1F26]'
              : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'
          }`}
        >
          Tempered Breakage
        </button>
      </div>

      <div className="flex justify-center">
        {view === 'annealed' ? (
          <svg viewBox="0 0 400 300" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Frame */}
            <rect x="20" y="20" width="360" height="260" fill="none" stroke="#8B95A5" strokeWidth="2" opacity="0.5" />

            {/* Large jagged shards radiating from impact point */}
            <g stroke="#EF4444" strokeWidth="1.5" fill="rgba(239,68,68,0.1)">
              {/* Impact point ~ center-left */}
              <polygon points="150,120 50,30 20,80" />
              <polygon points="150,120 50,30 170,20 200,80" />
              <polygon points="150,120 200,80 300,40 280,120" />
              <polygon points="150,120 280,120 380,100 380,180" />
              <polygon points="150,120 380,180 350,240 220,220" />
              <polygon points="150,120 220,220 150,280 100,250" />
              <polygon points="150,120 100,250 20,260 20,180" />
              <polygon points="150,120 20,180 20,80" />
            </g>

            {/* Impact point marker */}
            <circle cx="150" cy="120" r="6" fill="#EF4444" />
            <circle cx="150" cy="120" r="12" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.5" />

            {/* Caption */}
            <text x="200" y="295" textAnchor="middle" className="fill-[#8B95A5] text-[11px] italic">
              Large dagger-shaped shards — high injury risk
            </text>
          </svg>
        ) : (
          <svg viewBox="0 0 400 300" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Frame */}
            <rect x="20" y="20" width="360" height="260" fill="none" stroke="#8B95A5" strokeWidth="2" opacity="0.5" />

            {/* Uniform grid of small cuboid granules */}
            <g stroke="#F59E0B" strokeWidth="0.5" fill="rgba(245,158,11,0.08)">
              {Array.from({ length: 20 }).map((_, row) =>
                Array.from({ length: 28 }).map((_, col) => {
                  const x = 22 + col * 13 + (row % 2 === 0 ? 0 : 3);
                  const y = 22 + row * 13;
                  if (x > 378 || y > 278) return null;
                  const w = 10 + Math.random() * 4;
                  const h = 10 + Math.random() * 4;
                  return <rect key={`${row}-${col}`} x={x} y={y} width={w} height={h} rx="1" />;
                })
              )}
            </g>

            {/* Caption */}
            <text x="200" y="295" textAnchor="middle" className="fill-[#8B95A5] text-[11px] italic">
              Small cuboid granules — minimal injury risk (per GB 15763.2 §6.6)
            </text>
          </svg>
        )}
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
        <div className={`p-4 rounded-lg transition-opacity ${view === 'annealed' ? 'bg-red-500/10 border border-red-500/30 opacity-100' : 'opacity-40'}`}>
          <p className="font-semibold text-red-300 mb-2">Annealed glass fails open</p>
          <p className="text-[#8B95A5] leading-relaxed m-0">
            Residual stress is near zero. Breakage releases crack energy into
            large shards (typically {'>'}50cm²) with dagger-sharp edges. Code
            prohibits annealed in "safety glazing" locations.
          </p>
        </div>
        <div className={`p-4 rounded-lg transition-opacity ${view === 'tempered' ? 'bg-amber-500/10 border border-amber-500/30 opacity-100' : 'opacity-40'}`}>
          <p className="font-semibold text-amber-300 mb-2">Tempered glass dices</p>
          <p className="text-[#8B95A5] leading-relaxed m-0">
            Compressive surface stress inverts the fracture pattern. GB 15763.2 §6.6
            requires 40+ granules in any 50mm×50mm square. Granules are blunt and
            relatively harmless.
          </p>
        </div>
      </div>
    </div>
  );
}
