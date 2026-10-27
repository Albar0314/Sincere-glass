'use client';

import { useState } from 'react';

type CurveType = 'cylindrical' | 'conical' | 'spherical';

interface TypeData {
  label: string;
  feasibility: 'standard' | 'specialty' | 'not-tempered';
  summary: string;
  details: string;
  apps: string[];
  rMinNote: string;
  altIfBlocked?: string;
}

const TYPES: Record<CurveType, TypeData> = {
  cylindrical: {
    label: 'Cylindrical (single-axis)',
    feasibility: 'standard',
    summary: 'One axis of curvature. The panel wraps around an invisible cylinder.',
    details:
      'This is what 95% of curved tempered glass orders actually are. The glass is heated flat, then slumped against a cylindrical mold during the quench. The inner and outer surfaces maintain uniform compressive stress because the curvature is in only one direction. Our 2600mm × arc-length line handles Rₘᵢₙ 500mm at 6mm thickness.',
    apps: [
      'Curved curtain-wall facades',
      'Elevator shaft enclosures',
      'Rotunda balustrades',
      'Shopfront bay windows',
      'Curved shower screens',
    ],
    rMinNote: 'Rₘᵢₙ 500mm at 6mm; 1100mm at 12mm',
  },
  conical: {
    label: 'Conical (tapered single-axis)',
    feasibility: 'specialty',
    summary: 'Single-axis curvature with varying radius along the panel height.',
    details:
      'The top of the panel has a different radius than the bottom. Common in towers that widen or narrow with height, or in frustum-shaped canopies. Tooling cost is roughly 1.8× a cylindrical mold because the mold itself has compound geometry. Our line can produce conical panels up to 2600mm tall with a radius variance up to 40% top-to-bottom. Beyond that, we recommend splitting into two cylindrical segments.',
    apps: [
      'Tower crowns and spires',
      'Frustum canopies',
      'Flared facade feature walls',
      'Boat hull-type architectural elements',
    ],
    rMinNote: 'Rₘᵢₙ at narrow end: as per cylindrical table + 15% safety margin',
  },
  spherical: {
    label: 'Spherical (double-axis)',
    feasibility: 'not-tempered',
    summary: 'Curvature in two axes simultaneously — like a dome segment.',
    details:
      'A true double-curved tempered panel is physically not producible on standard bending-tempering lines. Thermal gradients during the quench are impossible to balance across two directions of curvature — the panel either cracks on the quench or arrives with warped optics unfit for architectural use. The industry workaround is cold-bent laminated glass: two or more flat tempered plies are mechanically bent against the structure on site and locked in place by the PVB or SGP interlayer as it cools. This is not a Sincere Glass product on its own; we supply the flat tempered plies, and the facade contractor laminates and bends on site.',
    apps: [
      'Dome segments (Apple-store style)',
      'Spherical skylights',
      'Full-double-curvature feature glazing',
    ],
    rMinNote: 'Not produced on tempering lines',
    altIfBlocked:
      'Alternative: cold-bent laminated with flat tempered plies + SGP interlayer, bent on site. We supply the plies; your facade contractor handles the on-site lamination step.',
  },
};

export default function CurvatureTypeExplorer() {
  const [selected, setSelected] = useState<CurveType>('cylindrical');
  const data = TYPES[selected];

  const feasibilityColor =
    data.feasibility === 'standard'
      ? '#DAA745'
      : data.feasibility === 'specialty'
      ? '#C8923A'
      : '#9A5555';
  const feasibilityLabel =
    data.feasibility === 'standard'
      ? 'Standard production'
      : data.feasibility === 'specialty'
      ? 'Specialty, longer lead'
      : 'Not available in tempered glass';

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold">
          Interactive &middot; Curvature types
        </div>
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0 mt-1">
          Which curve type is your project?
        </h3>
      </div>

      {/* SVG picker */}
      <div className="grid grid-cols-3 gap-0 border-b border-[#3A4250]/40">
        {(Object.keys(TYPES) as CurveType[]).map((key) => {
          const isActive = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`p-5 text-left transition-colors ${
                isActive
                  ? 'bg-[#3A4250]/30'
                  : 'bg-transparent hover:bg-[#3A4250]/10'
              } ${key !== 'spherical' ? 'border-r border-[#3A4250]/40' : ''}`}
            >
              <svg
                viewBox="0 0 120 80"
                className="w-full h-20 mb-3"
                style={{
                  color: isActive ? '#DAA745' : '#5D6677',
                  transition: 'color 150ms',
                }}
              >
                {key === 'cylindrical' && (
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="60" cy="40" rx="40" ry="12" />
                    <line x1="20" y1="40" x2="20" y2="65" />
                    <line x1="100" y1="40" x2="100" y2="65" />
                    <path d="M 20 65 Q 60 80 100 65" />
                  </g>
                )}
                {key === 'conical' && (
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="60" cy="20" rx="25" ry="6" />
                    <ellipse cx="60" cy="60" rx="45" ry="10" />
                    <line x1="35" y1="20" x2="15" y2="60" />
                    <line x1="85" y1="20" x2="105" y2="60" />
                  </g>
                )}
                {key === 'spherical' && (
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="60" cy="40" r="30" />
                    <ellipse cx="60" cy="40" rx="30" ry="10" />
                    <path d="M 30 40 Q 60 25 90 40" />
                  </g>
                )}
              </svg>
              <div
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isActive ? 'text-[#DAA745]' : 'text-[#8B95A5]'
                }`}
              >
                {key}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h4 className="text-xl font-semibold text-[#F2F0ED] m-0">{data.label}</h4>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${feasibilityColor}20`,
              color: feasibilityColor,
              border: `1px solid ${feasibilityColor}50`,
            }}
          >
            {feasibilityLabel}
          </div>
        </div>

        <p className="text-sm text-[#DAA745] font-medium m-0 mb-3">{data.summary}</p>
        <p className="text-sm text-[#8B95A5] leading-relaxed m-0 mb-5">{data.details}</p>

        {data.altIfBlocked && (
          <div className="my-5 p-4 rounded-lg bg-[#9A5555]/10 border border-[#9A5555]/30">
            <div className="text-[10px] uppercase tracking-wider text-[#9A5555] font-semibold mb-1">
              Workaround
            </div>
            <p className="text-sm text-[#F2F0ED] m-0 leading-relaxed">{data.altIfBlocked}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 pt-5 border-t border-[#3A4250]/40">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-2">
              Typical applications
            </div>
            <ul className="list-none pl-0 space-y-1 m-0">
              {data.apps.map((app) => (
                <li key={app} className="text-xs text-[#F2F0ED] flex gap-2">
                  <span className="text-[#DAA745]">—</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-2">
              Radius envelope on our line
            </div>
            <p className="text-xs text-[#F2F0ED] m-0 leading-relaxed">{data.rMinNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
