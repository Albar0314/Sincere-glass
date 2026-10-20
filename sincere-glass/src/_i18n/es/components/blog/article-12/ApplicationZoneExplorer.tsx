'use client';

import { useState } from 'react';
type ZoneId = 'facade' | 'interior' | 'balustrade' | 'shower' | 'skylight' | 'floor';
interface Zone {
  id: ZoneId;
  label: string;
  typicalGlass: string;
  primaryCode: string;
  mustSatisfy: string;
  linkSlug?: string; // if a sub-article exists
  linkLabel?: string;
}
const ZONES: Zone[] = [{
  id: 'facade',
  label: "Fachada / Muro Cortina",
  typicalGlass: 'Low-E coated IGU, often with laminated inner lite for safety',
  primaryCode: 'ASTM E330 / EN 13830 / GB/T 21086',
  mustSatisfy: 'Wind load, thermal (U-value), solar (SHGC), impact safety, and in some regions blast and hurricane',
  linkSlug: 'curtain-wall-glass-specification',
  linkLabel: "Especificación de Vidrio para Muro Cortina →"
}, {
  id: 'interior',
  label: "Particiones Interiores",
  typicalGlass: '10 or 12 mm tempered monolithic; laminated where acoustic separation matters',
  primaryCode: 'ANSI Z97.1 / EN 12600 / GB 15763.2',
  mustSatisfy: 'Human-impact safety near doors and in high-traffic areas; acoustic STC in offices',
  linkSlug: undefined,
  linkLabel: "Guía detallada próximamente"
}, {
  id: 'balustrade',
  label: "Barandillas y Protecciones",
  typicalGlass: '8+1.52+8 PVB (framed) or 10+1.52+10 SGP (frameless) tempered laminated',
  primaryCode: 'IBC 2407 / EN 1991-1-1 + EN 12600 / AS 1288',
  mustSatisfy: 'Horizontal line load, soft-body pendulum impact, post-breakage residual capacity',
  linkSlug: 'balustrade-glass-specification',
  linkLabel: "Especificación de Vidrio para Barandilla de Vidrio →"
}, {
  id: 'shower',
  label: "Duchas y Áreas Húmedas",
  typicalGlass: '10 mm or 12 mm tempered monolithic (frameless); 6 mm tempered (framed)',
  primaryCode: '16 CFR 1201 / EN 14428 / GB 15763.2 / AS 1288',
  mustSatisfy: 'Category II impact (CPSC 1201) for frameless; thickness driven by hardware load',
  linkSlug: 'shower-glass-thickness-guide',
  linkLabel: "Guía de Espesor de Vidrio para Mampara de Ducha →"
}, {
  id: 'skylight',
  label: "Claraboyas y Acristalamiento en Altura",
  typicalGlass: 'Laminated outboard lite in all overhead IGUs; SGP interlayer preferred',
  primaryCode: 'IBC 2405 / EN 1991-1-3 / GB 50210',
  mustSatisfy: 'Snow load, hail impact, and mandatory fallout-resistant laminated inner lite',
  linkSlug: undefined,
  linkLabel: "Guía detallada próximamente"
}, {
  id: 'floor',
  label: "Suelos de Vidrio y Peldaños de Escalera",
  typicalGlass: 'Triple-laminated SGP: three tempered lites bonded with SGP interlayer',
  primaryCode: 'ASTM E2751 / EN 572 + CWCT TN66',
  mustSatisfy: 'Live load with safety factor ≥4, impact, slip resistance on walking surface',
  linkSlug: undefined,
  linkLabel: "Guía detallada próximamente"
}];
export default function ApplicationZoneExplorer() {
  const [activeId, setActiveId] = useState<ZoneId>('facade');
  const active = ZONES.find(z => z.id === activeId)!;
  const zoneRects: Record<ZoneId, {
    x: number;
    y: number;
    w: number;
    h: number;
  }> = {
    facade: {
      x: 60,
      y: 40,
      w: 20,
      h: 220
    },
    interior: {
      x: 180,
      y: 95,
      w: 10,
      h: 165
    },
    balustrade: {
      x: 230,
      y: 95,
      w: 60,
      h: 10
    },
    shower: {
      x: 320,
      y: 170,
      w: 55,
      h: 90
    },
    skylight: {
      x: 170,
      y: 40,
      w: 115,
      h: 10
    },
    floor: {
      x: 290,
      y: 95,
      w: 80,
      h: 10
    }
  };
  return <div className="my-10 bg-[#1C1F26] border border-[#3A4250]/40 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
          Haga clic en cualquier zona del edificio
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          ¿En qué parte del edificio se instalará el vidrio?
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* LEFT: Clickable building cross-section */}
        <div className="bg-[#F2F0ED]/5 rounded-xl p-4 border border-[#3A4250]/30">
          <svg viewBox="0 0 440 300" className="w-full h-auto" aria-label="Sección transversal del edificio">
            {/* Ground */}
            <line x1="20" y1="275" x2="420" y2="275" stroke="#3A4250" strokeWidth="1.5" />
            {/* Building outer walls */}
            <rect x="40" y="30" width="380" height="245" fill="none" stroke="#3A4250" strokeWidth="1.5" />
            {/* Floor slabs — 2 floors */}
            <line x1="40" y1="105" x2="420" y2="105" stroke="#3A4250" strokeWidth="1.2" />
            <line x1="40" y1="185" x2="420" y2="185" stroke="#3A4250" strokeWidth="1.2" />
            {/* Interior partition */}
            <line x1="185" y1="105" x2="185" y2="275" stroke="#3A4250" strokeWidth="1" strokeDasharray="2 2" />
            {/* Shower enclosure (inner box) */}
            <rect x="320" y="170" width="55" height="90" fill="none" stroke="#3A4250" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Zone overlays — clickable */}
            {ZONES.map(z => {
            const r = zoneRects[z.id];
            const isActive = z.id === activeId;
            return <g key={z.id} className="cursor-pointer" onClick={() => setActiveId(z.id)}>
                  <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={isActive ? '#DAA745' : '#DAA745'} fillOpacity={isActive ? 0.85 : 0.3} stroke={isActive ? '#DAA745' : 'none'} strokeWidth="1.5" />
                </g>;
          })}

            {/* Zone labels */}
            <text x="30" y="45" fontSize="9" fill="#8B95A5" textAnchor="end">
              facade
            </text>
            <text x="226" y="46" fontSize="9" fill="#8B95A5" textAnchor="middle">
              skylight
            </text>
            <text x="150" y="180" fontSize="9" fill="#8B95A5" textAnchor="end">
              interior
            </text>
            <text x="260" y="90" fontSize="9" fill="#8B95A5" textAnchor="middle">
              balustrade
            </text>
            <text x="348" y="165" fontSize="9" fill="#8B95A5" textAnchor="middle">
              shower
            </text>
            <text x="330" y="90" fontSize="9" fill="#8B95A5" textAnchor="middle">
              floor
            </text>
          </svg>

          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {ZONES.map(z => {
            const isActive = z.id === activeId;
            return <button key={z.id} onClick={() => setActiveId(z.id)} className={`text-[11px] py-1.5 px-2 rounded border transition-all ${isActive ? 'border-[#DAA745] bg-[#DAA745]/15 text-[#DAA745] font-semibold' : 'border-[#3A4250]/40 text-[#8B95A5] hover:border-[#3A4250]'}`}>
                  {z.label}
                </button>;
          })}
          </div>
        </div>

        {/* RIGHT: Zone details */}
        <div className="bg-[#3A4250]/15 rounded-xl p-5 sm:p-6 border border-[#3A4250]/30">
          <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
            {active.label}
          </div>

          <div className="mb-4">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Vidrio típico
            </div>
            <div className="text-sm text-[#F2F0ED] leading-relaxed">{active.typicalGlass}</div>
          </div>

          <div className="mb-4">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Referencia normativa principal
            </div>
            <div className="text-sm text-[#F2F0ED] font-mono">{active.primaryCode}</div>
          </div>

          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Obligatorio
            </div>
            <div className="text-sm text-[#F2F0ED] leading-relaxed">{active.mustSatisfy}</div>
          </div>

          {active.linkSlug ? <a href={`/blog/${active.linkSlug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-[#DAA745] text-[#1C1F26] text-sm font-semibold rounded-lg hover:bg-[#c4963e] transition-colors no-underline">
              {active.linkLabel}
            </a> : <div className="text-xs text-[#8B95A5] italic border border-dashed border-[#3A4250]/50 rounded-lg px-3 py-2">
              {active.linkLabel}
            </div>}
        </div>
      </div>
    </div>;
}