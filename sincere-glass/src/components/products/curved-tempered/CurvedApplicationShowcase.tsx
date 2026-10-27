'use client';

import { useState } from 'react';

const APPS = [
  {
    key: 'facade',
    label: 'Curved curtain-wall facade',
    radius: 'R 2000–8000 mm',
    thickness: '8–12 mm (laminated typical)',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        <defs>
          <linearGradient id="facade-g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#DAA745" stopOpacity="0.1" />
            <stop offset="1" stopColor="#DAA745" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Building body */}
        <path d="M 20 90 Q 80 10 140 90 Z" fill="url(#facade-g)" stroke="#DAA745" strokeWidth="1.5" />
        {/* Panel seams */}
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const x = 20 + (140 - 20) * t;
          const yTop = 90 - (90 - 10) * (1 - Math.abs(t - 0.5) * 2);
          return <line key={t} x1={x} y1={90} x2={x} y2={yTop} stroke="#3A4250" strokeWidth="0.6" />;
        })}
        {/* Horizontal mullions */}
        <line x1="25" y1="60" x2="135" y2="60" stroke="#3A4250" strokeWidth="0.4" opacity="0.5" />
        <line x1="40" y1="30" x2="120" y2="30" stroke="#3A4250" strokeWidth="0.4" opacity="0.5" />
      </svg>
    ),
    note: 'Continuous curves without faceting. Common in airport terminals, museums, flagship retail.',
  },
  {
    key: 'balustrade',
    label: 'Rotunda balustrade',
    radius: 'R 800–2500 mm',
    thickness: '10–12 mm laminated (safety glazing)',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        {/* Rotunda floor plan from above */}
        <ellipse cx="80" cy="70" rx="55" ry="18" fill="none" stroke="#8B95A5" strokeWidth="1" strokeDasharray="2,2" />
        {/* Curved panels around the rotunda */}
        <path d="M 30 70 A 55 18 0 0 1 130 70" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" />
        {/* Posts */}
        {[30, 60, 100, 130].map((x) => (
          <circle key={x} cx={x} cy="70" r="2.5" fill="#DAA745" />
        ))}
        {/* Center dot = atrium */}
        <circle cx="80" cy="70" r="3" fill="none" stroke="#8B95A5" strokeWidth="1" />
        <text x="80" y="40" fill="#8B95A5" fontSize="8" textAnchor="middle" fontFamily="monospace">top view</text>
      </svg>
    ),
    note: 'Overlooks, atrium perimeters, grand staircases. Spans the arc without visible joints every meter.',
  },
  {
    key: 'canopy',
    label: 'Entrance canopy',
    radius: 'R 1500–4000 mm',
    thickness: '10.76 mm laminated minimum (overhead glazing)',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        {/* Ground */}
        <line x1="10" y1="90" x2="150" y2="90" stroke="#3A4250" strokeWidth="1" />
        {/* Building wall */}
        <line x1="30" y1="90" x2="30" y2="20" stroke="#3A4250" strokeWidth="1.5" />
        {/* Canopy arc */}
        <path d="M 30 45 Q 90 25 140 55" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" />
        {/* Supporting rods */}
        <line x1="90" y1="35" x2="90" y2="90" stroke="#8B95A5" strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1="140" y1="55" x2="140" y2="90" stroke="#8B95A5" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Door */}
        <rect x="30" y="65" width="20" height="25" fill="none" stroke="#8B95A5" strokeWidth="0.8" />
      </svg>
    ),
    note: 'Hotels, corporate entrances, retail flagship. Must be laminated for overhead code compliance.',
  },
  {
    key: 'shopfront',
    label: 'Bay-window shopfront',
    radius: 'R 500–1800 mm',
    thickness: '10–12 mm (often laminated for security)',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        {/* Ground */}
        <line x1="10" y1="88" x2="150" y2="88" stroke="#3A4250" strokeWidth="1" />
        {/* Bay walls */}
        <line x1="30" y1="88" x2="30" y2="30" stroke="#3A4250" strokeWidth="1.5" />
        <line x1="130" y1="88" x2="130" y2="30" stroke="#3A4250" strokeWidth="1.5" />
        {/* Bay curve (top-down projected forward) */}
        <path d="M 30 88 Q 80 60 130 88" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" />
        {/* Transom */}
        <line x1="25" y1="30" x2="135" y2="30" stroke="#3A4250" strokeWidth="1" />
        {/* Door opening */}
        <rect x="70" y="60" width="20" height="28" fill="none" stroke="#8B95A5" strokeWidth="0.6" strokeDasharray="2,2" />
      </svg>
    ),
    note: 'Projects the shop into the street. Tightest radii in the typical architectural range.',
  },
  {
    key: 'elevator',
    label: 'Elevator shaft enclosure',
    radius: 'R 1200–2200 mm',
    thickness: '10–12 mm laminated',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        {/* Elevator shaft circle (plan view) */}
        <circle cx="80" cy="50" r="35" fill="none" stroke="#8B95A5" strokeWidth="1" strokeDasharray="3,3" />
        {/* Three curved panels making up the enclosure */}
        <path d="M 80 15 A 35 35 0 0 1 110.3 32.5" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" />
        <path d="M 115 40 A 35 35 0 0 1 115 60" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" />
        <path d="M 110.3 67.5 A 35 35 0 0 1 80 85" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" />
        <path d="M 80 85 A 35 35 0 0 1 50 50" fill="none" stroke="#DAA745" strokeWidth="3" strokeLinecap="round" strokeDasharray="2,2" />
        {/* Elevator car */}
        <rect x="68" y="40" width="24" height="20" fill="none" stroke="#8B95A5" strokeWidth="0.8" />
        <text x="80" y="97" fill="#8B95A5" fontSize="8" textAnchor="middle" fontFamily="monospace">top view</text>
      </svg>
    ),
    note: 'Full-glass panoramic lifts. Three to four curved panels per level, often laminated for impact.',
  },
];

export default function CurvedApplicationShowcase() {
  const [active, setActive] = useState(0);
  const app = APPS[active];

  return (
    <div className="rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
          Applications
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          Where curved tempered gets specified
        </h3>
      </div>

      {/* App tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 border-b border-[#3A4250]/40">
        {APPS.map((a, i) => (
          <button
            key={a.key}
            onClick={() => setActive(i)}
            className={`px-3 py-3 text-xs font-medium transition-colors border-r last:border-r-0 border-[#3A4250]/40 ${
              i === active
                ? 'bg-[#3A4250]/30 text-[#DAA745]'
                : 'text-[#8B95A5] hover:bg-[#3A4250]/15'
            }`}
          >
            {a.label.split(' ').slice(-1)[0]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">
        <div className="p-6 bg-[#3A4250]/5 border-b md:border-b-0 md:border-r border-[#3A4250]/40 flex items-center justify-center min-h-[180px]">
          {app.svg}
        </div>
        <div className="p-6">
          <h4 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-3">
            {app.label}
          </h4>
          <div className="space-y-2 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">Radius range</span>
              <span className="text-sm text-[#DAA745] font-mono">{app.radius}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">Thickness</span>
              <span className="text-sm text-[#F2F0ED] font-mono">{app.thickness}</span>
            </div>
          </div>
          <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
            {app.note}
          </p>
        </div>
      </div>
    </div>
  );
}
