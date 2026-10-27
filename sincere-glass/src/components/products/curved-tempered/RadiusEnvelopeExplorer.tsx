'use client';

import { useState } from 'react';

/**
 * R_min envelope on the Sincere Glass Wuhan bending-tempering line.
 * Values are production floors, not marketing — the quench cracks the inner
 * curve below these radii.
 */
const ROWS = [
  { t: '6',  rMin: 500,  arcMax: 2400, maxH: 2600, typical: ['Decorative screens', 'Shopfront bay', 'Rotunda balustrade'] },
  { t: '8',  rMin: 650,  arcMax: 2800, maxH: 2600, typical: ['Low-rise facade', 'Interior partition', 'Shower screen'] },
  { t: '10', rMin: 850,  arcMax: 3000, maxH: 2600, typical: ['Curtain-wall facade', 'Entrance canopy', 'Balustrade'] },
  { t: '12', rMin: 1100, arcMax: 3000, maxH: 2600, typical: ['High-rise facade', 'Overhead glazing (laminated)', 'Load-bearing balustrade'] },
  { t: '15', rMin: 1600, arcMax: 3000, maxH: 2600, typical: ['Structural glazing', 'Jumbo overhead glazing'] },
  { t: '19', rMin: 2200, arcMax: 3000, maxH: 2600, typical: ['Extreme-load structural glass'] },
];

export default function RadiusEnvelopeExplorer() {
  const [selected, setSelected] = useState(2); // default 10mm
  const row = ROWS[selected];

  // Visual: SVG curve showing the actual R_min for the selected thickness.
  // Scale: 1000mm = 100 SVG units; the arc chord is drawn to approximate the geometry.
  const viewR = Math.min(220, (row.rMin / 1200) * 180);
  const chordHalf = Math.min(140, Math.sqrt(viewR * viewR - Math.max(0, viewR - 60) ** 2) || 80);

  return (
    <div className="rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
          Interactive &middot; Production envelope
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          Our bending-tempering line by thickness
        </h3>
      </div>

      {/* Thickness picker */}
      <div className="px-6 py-4 border-b border-[#3A4250]/40 flex gap-2 flex-wrap">
        {ROWS.map((r, i) => (
          <button
            key={r.t}
            onClick={() => setSelected(i)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selected === i
                ? 'bg-[#DAA745] text-[#1C1F26]'
                : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
            }`}
          >
            {r.t} mm
          </button>
        ))}
      </div>

      {/* Visualization + specs */}
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
        <div className="p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#3A4250]/40 bg-[#3A4250]/5">
          <svg viewBox="-180 -40 360 220" className="w-full max-w-xs">
            <defs>
              <linearGradient id="curvedGlass" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#DAA745" stopOpacity="0.0" />
                <stop offset="100%" stopColor="#DAA745" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Chord reference line */}
            <line x1={-chordHalf} y1={60} x2={chordHalf} y2={60} stroke="#3A4250" strokeWidth="1" strokeDasharray="4,4" />
            {/* The actual curve */}
            <path
              d={`M ${-chordHalf} 60 A ${viewR} ${viewR} 0 0 1 ${chordHalf} 60`}
              fill="none"
              stroke="#DAA745"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Radius indicator line */}
            <line x1={0} y1={60 - viewR + 60} x2={0} y2={60} stroke="#8B95A5" strokeWidth="1" strokeDasharray="2,2" />
            <text x={6} y={60 - viewR / 2 + 30} fill="#8B95A5" fontSize="11" fontFamily="monospace">
              R = {row.rMin} mm
            </text>
            {/* Chord label */}
            <text x={0} y={78} fill="#8B95A5" fontSize="10" textAnchor="middle" fontFamily="monospace">
              arc up to {row.arcMax} mm
            </text>
            {/* Thickness label */}
            <text x={-chordHalf - 8} y={64} fill="#DAA745" fontSize="12" textAnchor="end" fontWeight="600" fontFamily="monospace">
              {row.t}mm
            </text>
          </svg>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">Minimum radius</div>
              <div className="text-xl font-bold text-[#DAA745] font-mono">{row.rMin} mm</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">Max single arc</div>
              <div className="text-xl font-bold text-[#F2F0ED] font-mono">{row.arcMax} mm</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">Max panel height</div>
              <div className="text-xl font-bold text-[#F2F0ED] font-mono">{row.maxH} mm</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">Radius tolerance</div>
              <div className="text-xl font-bold text-[#F2F0ED] font-mono">&plusmn;1–1.5 mm</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3A4250]/40">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-2">
              Typical uses at {row.t} mm
            </div>
            <ul className="list-none pl-0 space-y-1 m-0">
              {row.typical.map((app) => (
                <li key={app} className="text-sm text-[#F2F0ED] flex gap-2">
                  <span className="text-[#DAA745]">—</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
