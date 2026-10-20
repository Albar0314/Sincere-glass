'use client';

import { useState } from 'react';
interface LoadCase {
  id: string;
  label: string;
  context: string;
  lineLoad: string; // kN/m horizontal line load at handrail
  pointLoad: string; // kN concentrated
  infill: string; // kN/m² infill area load
  impactClass: string; // EN 12600 class
  recommended: string; // glass build-up
  mounting: string; // typical mounting
}
const CASES: LoadCase[] = [{
  id: 'residential-balcony',
  label: "Balcón residencial",
  context: 'Private dwelling, up to 4 stories, standard occupancy',
  lineLoad: '0.74 kN/m (EN) · 0.73 kN/m (ASCE 7)',
  pointLoad: '0.5 kN',
  infill: '0.5 kN/m²',
  impactClass: 'Class 2(B)2 — 450 mm drop',
  recommended: '8 + 1.52 PVB + 8 mm tempered laminated',
  mounting: 'Base shoe or top-mounted spigots'
}, {
  id: 'commercial-mezzanine',
  label: "Entreplanta comercial",
  context: 'Office floor, retail balcony, hotel atrium walkway',
  lineLoad: '1.5 kN/m (EN) · 2.19 kN/m (ASCE 7)',
  pointLoad: '1.5 kN',
  infill: '1.5 kN/m²',
  impactClass: 'Class 1(B)1 — 1200 mm drop',
  recommended: '10 + 1.52 SGP + 10 mm tempered laminated',
  mounting: 'Structural base shoe, stainless U-channel'
}, {
  id: 'public-viewing',
  label: "Plataforma de observación pública",
  context: 'Observation deck, stadium, high-footfall assembly',
  lineLoad: '3.0 kN/m (EN) · 4.38 kN/m (ASCE 7)',
  pointLoad: '1.5 kN',
  infill: '1.5 kN/m²',
  impactClass: 'Class 1(B)1 — 1200 mm drop (hard-body often added)',
  recommended: '12 + 1.52 SGP + 12 mm tempered laminated (triple-ply option)',
  mounting: 'Engineered base shoe with hydraulic clamping'
}, {
  id: 'stair-landing',
  label: "Lateral de escalera y rellano",
  context: 'Internal stair balustrade, no occupant crowd load path',
  lineLoad: '0.74 kN/m (EN residential) · 1.5 kN/m (EN commercial)',
  pointLoad: '0.5 kN · 1.5 kN',
  infill: '0.5 kN/m² · 1.5 kN/m²',
  impactClass: 'Class 2(B)2 min — Class 1(B)1 if top-rail missing',
  recommended: '8 + 1.52 PVB + 8 mm (residential) · 10 + 1.52 SGP + 10 mm (commercial, frameless)',
  mounting: 'Standoff fittings or slim base channel'
}];
export default function LoadCaseSelector() {
  const [activeId, setActiveId] = useState<string>(CASES[0].id);
  const active = CASES.find(c => c.id === activeId)!;
  return <div className="my-10 bg-[#1C1F26] border border-[#3A4250]/40 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
          Seleccione el caso de uso
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          ¿Cuál es la ubicación de la barandilla de vidrio?
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {CASES.map(c => {
        const isActive = c.id === activeId;
        return <button key={c.id} onClick={() => setActiveId(c.id)} className={`text-left p-3 rounded-xl border transition-all ${isActive ? 'border-[#DAA745] bg-[#DAA745]/10' : 'border-[#3A4250]/40 bg-[#3A4250]/10 hover:border-[#3A4250]'}`}>
              <div className={`text-sm font-semibold ${isActive ? 'text-[#DAA745]' : 'text-[#F2F0ED]'}`}>
                {c.label}
              </div>
            </button>;
      })}
      </div>

      <div className="bg-[#3A4250]/15 rounded-xl p-5 sm:p-6 border border-[#3A4250]/30">
        <div className="text-sm text-[#8B95A5] mb-5 italic">{active.context}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-[#1C1F26]/60 rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Carga lineal horizontal (en pasamanos)
            </div>
            <div className="text-sm font-mono text-[#F2F0ED]">{active.lineLoad}</div>
          </div>
          <div className="bg-[#1C1F26]/60 rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Carga puntual concentrada
            </div>
            <div className="text-sm font-mono text-[#F2F0ED]">{active.pointLoad}</div>
          </div>
          <div className="bg-[#1C1F26]/60 rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Carga de área de relleno
            </div>
            <div className="text-sm font-mono text-[#F2F0ED]">{active.infill}</div>
          </div>
          <div className="bg-[#1C1F26]/60 rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-1">
              Clase de impacto EN 12600
            </div>
            <div className="text-sm font-mono text-[#F2F0ED]">{active.impactClass}</div>
          </div>
        </div>

        <div className="border-t border-[#3A4250]/30 pt-5">
          <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
            Vidrio recomendado típico
          </div>
          <div className="text-base font-semibold text-[#F2F0ED] mb-3">{active.recommended}</div>
          <div className="text-xs text-[#8B95A5]">
            <span className="text-[#DAA745]">Montaje:</span> {active.mounting}
          </div>
        </div>
      </div>

      <p className="text-xs text-[#8B95A5] mt-4 italic">
        Las cargas indicadas son cargas de diseño horizontal mínimas según normativa, aplicadas en la parte superior de la barandilla de vidrio. Los ingenieros del proyecto deben verificarlas frente a las enmiendas locales y las combinaciones sísmicas y de viento. Los valores anteriores combinan la Tabla 6.12 de EN 1991-1-1 y el §4.5.1 de ASCE 7-22.
      </p>
    </div>;
}