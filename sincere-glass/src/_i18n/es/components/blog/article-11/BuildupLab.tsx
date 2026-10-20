'use client';

import { useState } from 'react';
type BuildupId = 'monolithic' | 'pvb' | 'sgp';
interface Buildup {
  id: BuildupId;
  label: string;
  makeup: string;
  totalThickness: string;
  // 0 to 100 for bar fills
  strength: number;
  fallout: number;
  residual: number;
  cost: number;
  costLabel: string;
  verdict: string;
  risk: string;
}
const BUILDUPS: Buildup[] = [{
  id: 'monolithic',
  label: "Vidrio templado monolítico",
  makeup: '12 mm fully tempered',
  totalThickness: '12 mm',
  strength: 70,
  fallout: 10,
  residual: 5,
  cost: 100,
  costLabel: 'Index 1.0 (baseline)',
  verdict: 'Permitted in some codes for low-rise private balconies with a continuous top-rail (EN 14179 heat-soaked only). Many jurisdictions now disallow it in frameless or no-top-rail applications.',
  risk: 'If the pane breaks (spontaneous NiS failure, impact, edge nick), the entire panel disintegrates into granules at once — total loss of guard. Not permitted in overhead or public applications in most codes.'
}, {
  id: 'pvb',
  label: "Vidrio Templado Laminado — PVB (polivinil butiral)",
  makeup: '8 mm temp + 1.52 mm PVB + 8 mm temp',
  totalThickness: '17.52 mm',
  strength: 85,
  fallout: 80,
  residual: 35,
  cost: 165,
  costLabel: 'Index 1.65',
  verdict: 'The default for most residential balconies and framed commercial balustrades. PVB holds the glass granules together after breakage — the guard stays mostly in place long enough for repair.',
  risk: 'PVB is a soft interlayer. Under sustained load after both lites break, the panel sags and loses most of its stiffness within hours — not days. Avoid for frameless cantilevered geometry.'
}, {
  id: 'sgp',
  label: "Vidrio Templado Laminado — SGP (SentryGlas Plus)",
  makeup: '10 mm temp + 1.52 mm SGP + 10 mm temp',
  totalThickness: '21.52 mm',
  strength: 100,
  fallout: 100,
  residual: 85,
  cost: 230,
  costLabel: 'Index 2.3',
  verdict: 'Specified where the glass is the structure: frameless cantilevers, no top-rail, overhead balustrades, public viewing platforms. SGP (SentryGlas) is roughly 100× stiffer than PVB at 20°C.',
  risk: 'Cost premium is real. Specify when post-breakage residual strength is a code or engineering requirement, not as a default — PVB is the right call for most framed systems.'
}];
function Bar({
  label,
  value,
  color
}: {
  label: string;
  value: number;
  color: string;
}) {
  return <div>
      <div className="flex items-center justify-between text-xs text-[#8B95A5] mb-1.5">
        <span>{label}</span>
        <span className="font-mono text-[#F2F0ED]">{value}%</span>
      </div>
      <div className="h-2 bg-[#3A4250]/30 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{
        width: `${value}%`,
        background: color
      }} />
      </div>
    </div>;
}
function CrossSectionSVG({
  id
}: {
  id: BuildupId;
}) {
  // All drawn to the same vertical scale so the comparison is honest
  return <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden>
      <defs>
        <linearGradient id="g-glass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CFE2E8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8EB3BE" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <rect x="0" y="0" width="320" height="180" fill="transparent" />

      {id === 'monolithic' && <>
          <rect x="40" y="60" width="240" height="60" fill="url(#g-glass)" stroke="#8EB3BE" />
          <text x="160" y="95" textAnchor="middle" fontSize="11" fill="#1C1F26" fontWeight="600">
            Vidrio Templado de 12 mm
          </text>
          <text x="300" y="94" fontSize="10" fill="#8B95A5">
            60 →
          </text>
        </>}

      {id === 'pvb' && <>
          <rect x="40" y="45" width="240" height="35" fill="url(#g-glass)" stroke="#8EB3BE" />
          <text x="160" y="67" textAnchor="middle" fontSize="10" fill="#1C1F26">
            Vidrio Templado de 8 mm
          </text>
          <rect x="40" y="80" width="240" height="12" fill="#DAA745" opacity="0.65" />
          <text x="160" y="89" textAnchor="middle" fontSize="9" fill="#1C1F26" fontWeight="600">
            PVB (polivinil butiral) de 1.52 mm
          </text>
          <rect x="40" y="92" width="240" height="35" fill="url(#g-glass)" stroke="#8EB3BE" />
          <text x="160" y="114" textAnchor="middle" fontSize="10" fill="#1C1F26">
            Vidrio Templado de 8 mm
          </text>
        </>}

      {id === 'sgp' && <>
          <rect x="40" y="30" width="240" height="42" fill="url(#g-glass)" stroke="#8EB3BE" />
          <text x="160" y="55" textAnchor="middle" fontSize="10" fill="#1C1F26">
            Vidrio Templado de 10 mm
          </text>
          <rect x="40" y="72" width="240" height="12" fill="#C78820" opacity="0.75" />
          <text x="160" y="81" textAnchor="middle" fontSize="9" fill="#1C1F26" fontWeight="700">
            SGP (SentryGlas Plus) de 1.52 mm
          </text>
          <rect x="40" y="84" width="240" height="42" fill="url(#g-glass)" stroke="#8EB3BE" />
          <text x="160" y="109" textAnchor="middle" fontSize="10" fill="#1C1F26">
            Vidrio Templado de 10 mm
          </text>
        </>}

      {/* floor / embed indicator */}
      <line x1="30" y1="150" x2="290" y2="150" stroke="#3A4250" strokeWidth="1" />
      <rect x="135" y="132" width="50" height="18" fill="#3A4250" opacity="0.5" />
      <text x="160" y="145" textAnchor="middle" fontSize="9" fill="#8B95A5">
        zapata base
      </text>
      <text x="30" y="170" fontSize="9" fill="#8B95A5">
        No dibujado a escala dentro del conjunto de vidrio; solo se indican espesores relativos.
      </text>
    </svg>;
}
export default function BuildupLab() {
  const [activeId, setActiveId] = useState<BuildupId>('pvb');
  const active = BUILDUPS.find(b => b.id === activeId)!;
  return <div className="my-10 bg-[#1C1F26] border border-[#3A4250]/40 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
          Compare las tres opciones reales
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          Seleccione una composición para ver su perfil de riesgo
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {BUILDUPS.map(b => {
        const isActive = b.id === activeId;
        return <button key={b.id} onClick={() => setActiveId(b.id)} className={`text-left p-4 rounded-xl border transition-all ${isActive ? 'border-[#DAA745] bg-[#DAA745]/10' : 'border-[#3A4250]/40 bg-[#3A4250]/10 hover:border-[#3A4250]'}`}>
              <div className={`text-sm font-semibold mb-1 ${isActive ? 'text-[#DAA745]' : 'text-[#F2F0ED]'}`}>
                {b.label}
              </div>
              <div className="text-xs text-[#8B95A5] font-mono">{b.totalThickness}</div>
            </button>;
      })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: SVG */}
        <div className="bg-[#F2F0ED]/5 rounded-xl p-4 border border-[#3A4250]/30">
          <CrossSectionSVG id={activeId} />
          <div className="text-xs text-[#8B95A5] mt-2 text-center font-mono">
            {active.makeup}
          </div>
        </div>

        {/* Right: bars + verdict */}
        <div className="space-y-4">
          <Bar label="Resistencia antes de la rotura" value={active.strength} color="#DAA745" />
          <Bar label="Retención de fragmentos tras la rotura" value={active.fallout} color="#DAA745" />
          <Bar label="Capacidad de carga residual (24 h)" value={active.residual} color="#DAA745" />
          <Bar label="Costo relativo" value={active.cost > 100 ? 100 : active.cost} color="#8B95A5" />
          <div className="text-[11px] text-[#8B95A5] italic -mt-2">{active.costLabel}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1C1F26]/60 border border-[#3A4250]/30 rounded-lg p-4">
          <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
            Cuándo especificar
          </div>
          <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{active.verdict}</p>
        </div>
        <div className="bg-[#1C1F26]/60 border border-[#3A4250]/30 rounded-lg p-4">
          <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-2">
            Riesgo oculto
          </div>
          <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{active.risk}</p>
        </div>
      </div>
    </div>;
}