'use client';

import { useState } from 'react';

// Values are indicative based on float-glass physics (density 2500 kg/m^3)
// and GB 15763.2-2005 §5.2.1 minimum surface compressive stress of 90 MPa.
// Max area assumes horizontal 4-edge support with no wind load.
type Metric = 'weight' | 'strength' | 'maxArea' | 'cost' | 'stc';
const DATA: Array<{
  mm: number;
  weight: number; // kg/m^2
  strength: number; // kN/m^2 break load
  maxArea: number; // m^2 4-edge support, indicative
  cost: number; // relative index, 6mm = 1.00
  stc: number; // STC rating
  typical: string;
}> = [{
  mm: 6,
  weight: 15,
  strength: 18,
  maxArea: 2.5,
  cost: 1.00,
  stc: 31,
  typical: 'Interior doors, shower screens'
}, {
  mm: 8,
  weight: 20,
  strength: 24,
  maxArea: 4.5,
  cost: 1.32,
  stc: 32,
  typical: 'Small storefronts, 1.0 m balustrades'
}, {
  mm: 10,
  weight: 25,
  strength: 30,
  maxArea: 7.0,
  cost: 1.65,
  stc: 33,
  typical: 'Standard storefronts, light canopies'
}, {
  mm: 12,
  weight: 30,
  strength: 36,
  maxArea: 10.5,
  cost: 2.05,
  stc: 34,
  typical: '1.1 m balustrades, canopies, large storefronts'
}, {
  mm: 15,
  weight: 37.5,
  strength: 45,
  maxArea: 15.0,
  cost: 2.80,
  stc: 35,
  typical: 'Structural fins, pool fencing above 1.2 m'
}, {
  mm: 19,
  weight: 47.5,
  strength: 57,
  maxArea: 20.0,
  cost: 3.85,
  stc: 37,
  typical: 'Floor glass, long-span fins, heavy balustrades'
}];
const METRICS: {
  key: Metric;
  label: string;
  unit: string;
}[] = [{
  key: 'strength',
  label: "Carga de rotura",
  unit: 'kN/m^2'
}, {
  key: 'maxArea',
  label: "Área máxima del panel",
  unit: 'm^2 (indicative)'
}, {
  key: 'weight',
  label: 'Weight',
  unit: 'kg/m^2'
}, {
  key: 'cost',
  label: "Costo relativo",
  unit: 'index (6mm = 1.00)'
}, {
  key: 'stc',
  label: "Acústica (STC)",
  unit: 'dB'
}];
export default function ThicknessPerformanceComparator() {
  const [metric, setMetric] = useState<Metric>('strength');
  const [selected, setSelected] = useState<number>(12);
  const max = Math.max(...DATA.map(d => d[metric]));
  const selectedRow = DATA.find(d => d.mm === selected)!;
  const activeMetric = METRICS.find(m => m.key === metric)!;
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-5 md:p-7">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#F2F0ED] m-0 mb-1">
          Comparador de rendimiento por espesor
        </h3>
        <p className="text-xs text-[#8B95A5] m-0">
          Seleccione un espesor y una métrica para comparar en toda la gama que templamos.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {METRICS.map(m => <button key={m.key} onClick={() => setMetric(m.key)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${metric === m.key ? 'bg-[#DAA745] text-[#1C1F26]' : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50'}`}>
            {m.label}
          </button>)}
      </div>

      <div className="space-y-2 mb-5">
        {DATA.map(d => {
        const pct = Math.round(d[metric] / max * 100);
        const isSelected = d.mm === selected;
        return <button key={d.mm} onClick={() => setSelected(d.mm)} className="w-full text-left group">
              <div className="flex items-center gap-3">
                <span className={`w-12 text-xs font-semibold tabular-nums ${isSelected ? 'text-[#DAA745]' : d.mm === 12 ? 'text-[#F2F0ED]' : 'text-[#8B95A5]'}`}>
                  {d.mm}mm
                </span>
                <div className="flex-1 h-6 rounded bg-[#1C1F26] overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${isSelected ? 'bg-[#DAA745]' : 'bg-[#3A4250] group-hover:bg-[#4e5a6a]'}`} style={{
                width: `${pct}%`
              }} />
                </div>
                <span className={`w-20 text-right text-xs tabular-nums ${isSelected ? 'text-[#DAA745] font-semibold' : 'text-[#8B95A5]'}`}>
                  {d[metric]}
                </span>
              </div>
            </button>;
      })}
      </div>

      <div className="rounded-lg bg-[#1C1F26] border border-[#DAA745]/40 p-4">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <span className="text-2xl font-bold text-[#DAA745]">{selectedRow.mm}mm</span>
          <span className="text-xs text-[#8B95A5]">
            {activeMetric.label}:{' '}
            <span className="text-[#F2F0ED] font-medium">
              {selectedRow[metric]} {activeMetric.unit}
            </span>
          </span>
        </div>
        <p className="text-xs text-[#8B95A5] m-0 leading-relaxed">
          Uso habitual a este espesor:{' '}
          <span className="text-[#F2F0ED]">{selectedRow.typical}</span>
        </p>
      </div>

      <p className="text-[10px] text-[#8B95A5]/70 mt-3 m-0 leading-relaxed">
        Valores indicativos basados en la física de GB 15763.2-2005 (densidad 2500 kg/m^3, tensión de compresión superficial mínima de 90 MPa) y apoyo en 4 bordes horizontal sin carga de viento para el área máxima. Los límites reales del proyecto están determinados por la condición de apoyo específica y el caso de carga.
      </p>
    </div>;
}