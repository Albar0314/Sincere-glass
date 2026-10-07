'use client';

import { useState } from 'react';

interface Family {
  id: string;
  name: string;
  desc: string;
  position: { x: number; y: number };
  color: string;
  linkHref: string;
  linkLabel: string;
}

const families: Family[] = [
  {
    id: 'annealed',
    name: 'Annealed (Float)',
    desc: 'Raw material. Not safety glass. Cheapest.',
    position: { x: 400, y: 50 },
    color: '#64748B',
    linkHref: '/blog/tempered-glass-vs-annealed-glass',
    linkLabel: 'Why annealed is not enough →',
  },
  {
    id: 'tempered',
    name: 'Tempered',
    desc: '4-5× stronger. Safe granular breakage.',
    position: { x: 200, y: 180 },
    color: '#FBBF24',
    linkHref: '/products/tempered-glass',
    linkLabel: 'View tempered glass →',
  },
  {
    id: 'laminated',
    name: 'Laminated',
    desc: 'PVB/SGP interlayer. Fragment retention.',
    position: { x: 600, y: 180 },
    color: '#F59E0B',
    linkHref: '/blog/tempered-glass-vs-laminated-glass',
    linkLabel: 'Tempered vs Laminated →',
  },
  {
    id: 'insulated',
    name: 'Insulated (IGU)',
    desc: 'Sealed cavity + Low-E. Energy saver.',
    position: { x: 200, y: 320 },
    color: '#60A5FA',
    linkHref: '/blog/insulated-glass-vs-laminated-glass',
    linkLabel: 'Insulated vs Laminated →',
  },
  {
    id: 'coated',
    name: 'Coated (Low-E / Enameled)',
    desc: 'Surface treatment. Thermal or decorative.',
    position: { x: 600, y: 320 },
    color: '#A78BFA',
    linkHref: '/products/low-e-glass',
    linkLabel: 'View Low-E glass →',
  },
];

export default function GlassFamilyMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = families.find((f) => f.id === hovered);

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-4 text-center">
        The 5 Families of Architectural Glass
      </p>

      <div className="relative">
        <svg viewBox="0 0 800 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#3A4250" strokeWidth="1" strokeDasharray="4,2" opacity="0.5">
            <line x1="400" y1="80" x2="200" y2="150" />
            <line x1="400" y1="80" x2="600" y2="150" />
            <line x1="200" y1="210" x2="200" y2="290" />
            <line x1="600" y1="210" x2="600" y2="290" />
          </g>

          {families.map((f) => {
            const isHovered = hovered === f.id;
            return (
              <g
                key={f.id}
                onMouseEnter={() => setHovered(f.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={f.position.x}
                  cy={f.position.y}
                  r={isHovered ? 44 : 40}
                  fill={f.color}
                  fillOpacity={isHovered ? 0.3 : 0.15}
                  stroke={f.color}
                  strokeWidth={isHovered ? 3 : 2}
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={f.position.x}
                  y={f.position.y - 2}
                  textAnchor="middle"
                  className="fill-[#F2F0ED] text-[12px] font-semibold"
                >
                  {f.name.split(' ')[0]}
                </text>
                <text
                  x={f.position.x}
                  y={f.position.y + 14}
                  textAnchor="middle"
                  className="fill-[#F2F0ED] text-[10px]"
                >
                  {f.name.split(' ').slice(1).join(' ')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 min-h-[80px] bg-[#1C1F26]/40 rounded-lg p-4 border border-[#3A4250]/20">
        {current ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: current.color }}
              />
              <h4 className="text-base font-semibold text-[#F2F0ED] m-0">
                {current.name}
              </h4>
            </div>
            <p className="text-sm text-[#8B95A5] mb-2">{current.desc}</p>
            <a
              href={current.linkHref}
              className="text-xs font-medium text-[#DAA745] hover:underline"
            >
              {current.linkLabel}
            </a>
          </>
        ) : (
          <p className="text-sm text-[#8B95A5] italic text-center m-0">
            Hover any circle to see details and drill-down links
          </p>
        )}
      </div>
    </div>
  );
}