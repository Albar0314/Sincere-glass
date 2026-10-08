'use client';

import { useState } from 'react';
const scenarios = [{
  scenario: 'Curtain wall / building fa\u00e7ade',
  tempered: 2,
  laminated: 4,
  verdict: 'laminated',
  note: "La retención post-rotura evita la caída de fragmentos — crítico en altura"
}, {
  scenario: 'Interior partitions & doors',
  tempered: 4,
  laminated: 2,
  verdict: 'tempered',
  note: "Resistencia y rentabilidad; sin riesgo de caída por encima"
}, {
  scenario: 'Skylights & overhead glazing',
  tempered: 1,
  laminated: 5,
  verdict: 'laminated',
  note: "La mayoría de los códigos de construcción exigen vidrio laminado en instalaciones en altura — el vidrio roto no debe caer"
}, {
  scenario: 'Shower enclosures',
  tempered: 5,
  laminated: 1,
  verdict: 'tempered',
  note: "Patrón de rotura seguro; resistencia a la humedad; fácil limpieza"
}, {
  scenario: 'Hurricane / typhoon zones',
  tempered: 2,
  laminated: 5,
  verdict: 'laminated',
  note: "El vidrio laminado con clasificación de impacto cumple las normas de resistencia a escombros transportados por el viento"
}, {
  scenario: 'Storefronts & security glass',
  tempered: 2,
  laminated: 5,
  verdict: 'laminated',
  note: "La lámina intermedia resiste la entrada forzada; el vidrio permanece en el marco ante un golpe"
}, {
  scenario: 'Balustrades & railings',
  tempered: 3,
  laminated: 4,
  verdict: 'laminated',
  note: "El vidrio laminado (frecuentemente con hojas templadas) mantiene la barrera intacta en caso de rotura"
}, {
  scenario: 'Acoustic / soundproofing',
  tempered: 1,
  laminated: 5,
  verdict: 'laminated',
  note: "La lámina intermedia de PVB (polivinil butiral)/SGP (SentryGlas Plus) amortigua la transmisión sonora en todas las frecuencias"
}];
function Dots({
  count,
  color
}: {
  count: number;
  color: string;
}) {
  return <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => <div key={n} className={`w-2.5 h-2.5 rounded-full ${n <= count ? color : 'bg-gray-200'}`} />)}
    </div>;
}
export default function DecisionMatrix() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  return <div className="my-12 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-[#F2F0ED]">
            <th className="text-left py-3 pr-4 font-semibold text-[#F2F0ED]">Application</th>
            <th className="text-center py-3 px-4 font-semibold text-[#F2F0ED]">Tempered</th>
            <th className="text-center py-3 px-4 font-semibold text-[#F2F0ED]">Laminated</th>
            <th className="text-left py-3 pl-4 font-semibold text-[#F2F0ED]">Mejor Opción</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s, i) => <tr key={i} className="border-b border-[#3A4250]/30 cursor-pointer hover:bg-[#3A4250]/10 transition-colors" onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}>
              <td className="py-3 pr-4 text-[#8B95A5]">
                <span className="flex items-center gap-2">
                  {s.scenario}
                  <svg className={`w-3.5 h-3.5 text-[#8B95A5] transition-transform ${expandedIdx === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
                {expandedIdx === i && <p className="mt-2 text-xs text-[#8B95A5]/70">{s.note}</p>}
              </td>
              <td className="py-3 px-4"><div className="flex justify-center"><Dots count={s.tempered} color="bg-[#8B95A5]" /></div></td>
              <td className="py-3 px-4"><div className="flex justify-center"><Dots count={s.laminated} color="bg-[#DAA745]" /></div></td>
              <td className="py-3 pl-4">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${s.verdict === 'tempered' ? 'bg-[#3A4250] text-white' : 'bg-[#DAA745] text-white'}`}>
                  {s.verdict === 'tempered' ? 'Tempered' : 'Laminated'}
                </span>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}