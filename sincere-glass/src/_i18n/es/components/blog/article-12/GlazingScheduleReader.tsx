'use client';

import { useState } from 'react';
interface Spec {
  id: string;
  mark: string; // e.g. "G-01"
  location: string;
  spec: string; // the raw spec string, as it would appear in a glazing schedule
  decoded: Array<{
    token: string;
    meaning: string;
  }>;
  rationale: string;
}
const SPECS: Spec[] = [{
  id: 's1',
  mark: 'G-01',
  location: "Fachada este, niveles 2–20",
  spec: '6T + 12A(Ar) + 6T Low-E#2 (CE/SGCC)',
  decoded: [{
    token: '6T',
    meaning: '6 mm fully tempered glass, outboard lite'
  }, {
    token: '12A(Ar)',
    meaning: '12 mm air cavity filled with argon gas'
  }, {
    token: '6T',
    meaning: '6 mm fully tempered glass, inboard lite'
  }, {
    token: 'Low-E#2',
    meaning: 'Low-emissivity coating on surface #2 (inner face of outboard lite)'
  }, {
    token: 'CE/SGCC',
    meaning: 'Carries both European CE marking and US SGCC certification'
  }],
  rationale: 'Standard commercial Low-E IGU for a mid-rise office facade. Argon fill gives roughly 10% U-value improvement over air. Coating on surface #2 is the common choice for cooling-dominated climates.'
}, {
  id: 's2',
  mark: 'G-04',
  location: "Barandilla de vidrio del atrio, entreplanta nivel 3",
  spec: "10T HSG + 1.52 SGP (SentryGlas Plus) + 10T HSG (sin marco, EN 12600 Clase 1(B)1)",
  decoded: [{
    token: '10T',
    meaning: '10 mm fully tempered glass'
  }, {
    token: 'HSG',
    meaning: 'Heat-soak tested per EN 14179, reduces NiS spontaneous breakage'
  }, {
    token: '1.52 SGP',
    meaning: '1.52 mm SentryGlas ionoplast interlayer (stiffer than PVB)'
  }, {
    token: 'frameless',
    meaning: 'No top-rail; glass is the structural element'
  }, {
    token: 'EN 12600 Class 1(B)1',
    meaning: 'Passed 1200 mm pendulum impact drop safely'
  }],
  rationale: 'Frameless balustrade — the glass cantilevers from the base shoe and carries the handrail line load itself. SGP (not PVB) gives post-breakage residual capacity so the guard stays standing if both lites break.'
}, {
  id: 's3',
  mark: 'G-07',
  location: "Baño de huéspedes, mampara de ducha",
  spec: "10T CPSC Cat II, pulido de bordes, esquinas perforadas para bisagras",
  decoded: [{
    token: '10T',
    meaning: '10 mm fully tempered monolithic (no interlayer)'
  }, {
    token: 'CPSC Cat II',
    meaning: 'Passes US CPSC 16 CFR 1201 Category II impact test (400 ft-lbs)'
  }, {
    token: 'polished edge',
    meaning: 'Flat-polished edge finish — mandatory for exposed-edge frameless'
  }, {
    token: 'corner-drilled',
    meaning: 'Pre-drilled holes positioned for hinge hardware'
  }],
  rationale: 'Standard frameless shower. Monolithic tempered is the right call here — laminated is unnecessary and traps moisture at the interlayer edges. Thickness driven by door width and hinge load, not aesthetics.'
}, {
  id: 's4',
  mark: 'G-11',
  location: "Claraboya en cubierta, atrio central",
  spec: "8T + 12A(Ar) + 6T + 1.52 PVB (polivinil butiral) + 6T (Low-E#2, hoja interior laminada)",
  decoded: [{
    token: '8T',
    meaning: '8 mm tempered outboard lite — faces exterior'
  }, {
    token: '12A(Ar)',
    meaning: '12 mm argon-filled cavity'
  }, {
    token: '6T + 1.52 PVB + 6T',
    meaning: '13.52 mm laminated inboard assembly — fallout-resistant'
  }, {
    token: 'Low-E#2',
    meaning: 'Low-E coating on surface #2 (inside the IGU)'
  }, {
    token: 'laminated inner',
    meaning: 'Required by code — if outer breaks, the laminated inner holds fragments'
  }],
  rationale: 'Overhead glazing is the strictest safety case. If any lite breaks, fragments must not fall onto occupants. The inner lite is always laminated, and the outer is tempered to resist hail impact. Many jurisdictions now require SGP instead of PVB on skylights above public areas.'
}];
export default function GlazingScheduleReader() {
  const [activeId, setActiveId] = useState<string>(SPECS[0].id);
  const active = SPECS.find(s => s.id === activeId)!;
  return <div className="my-10 bg-[#1C1F26] border border-[#3A4250]/40 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
          Cómo se leen realmente las fichas técnicas
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          Descifrar un programa de acristalamiento real
        </h3>
      </div>

      {/* Schedule table — click a row to decode */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#3A4250]/40">
              <th className="text-left text-[11px] font-semibold text-[#8B95A5] uppercase tracking-wider py-2 pr-3 w-[70px]">
                Mark
              </th>
              <th className="text-left text-[11px] font-semibold text-[#8B95A5] uppercase tracking-wider py-2 pr-3 w-[180px]">
                Location
              </th>
              <th className="text-left text-[11px] font-semibold text-[#8B95A5] uppercase tracking-wider py-2">
                Specification
              </th>
            </tr>
          </thead>
          <tbody>
            {SPECS.map(s => {
            const isActive = s.id === activeId;
            return <tr key={s.id} onClick={() => setActiveId(s.id)} className={`border-b border-[#3A4250]/20 cursor-pointer transition-colors ${isActive ? 'bg-[#DAA745]/10' : 'hover:bg-[#3A4250]/15'}`}>
                  <td className={`py-3 pr-3 text-sm font-mono ${isActive ? 'text-[#DAA745] font-bold' : 'text-[#F2F0ED]'}`}>
                    {s.mark}
                  </td>
                  <td className="py-3 pr-3 text-sm text-[#8B95A5]">{s.location}</td>
                  <td className="py-3 text-sm text-[#F2F0ED] font-mono text-xs">{s.spec}</td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>

      {/* Decoded panel */}
      <div className="bg-[#3A4250]/15 rounded-xl p-5 sm:p-6 border border-[#3A4250]/30">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-1">
              Decoding {active.mark}
            </div>
            <div className="text-base font-mono text-[#F2F0ED]">{active.spec}</div>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          {active.decoded.map((d, i) => <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-2 border-b border-[#3A4250]/20 last:border-0">
              <div className="text-xs font-mono text-[#DAA745] font-bold sm:w-[150px] flex-shrink-0">
                {d.token}
              </div>
              <div className="text-xs text-[#F2F0ED] leading-relaxed">{d.meaning}</div>
            </div>)}
        </div>

        <div className="pt-3 border-t border-[#3A4250]/30">
          <div className="text-[11px] uppercase tracking-wider text-[#8B95A5] mb-2">
            Por qué esta especificación
          </div>
          <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{active.rationale}</p>
        </div>
      </div>

      <p className="text-xs text-[#8B95A5] italic mt-4">
        Los programas de acristalamiento concentran mucha información en una sola línea. Si una especificación que recibe omite la designación de vidrio templado/laminado, el número de superficie del recubrimiento, el marcado de certificación o el tipo de lámina intermedia para un conjunto laminado, trátela como incompleta y consulte antes de cotizar.
      </p>
    </div>;
}