"use client";

import { useMemo, useState } from "react";
type ViewMode = "table" | "radar";
type Metric = {
  key: string;
  label: string;
  unit: string;
  industry: number;
  sincereStd: number;
  sincereMax: number;
  note: string;
  // For radar normalization: what counts as "100" on the chart
  radarMax: number;
};
const METRICS: Metric[] = [{
  key: "panel-width",
  label: "Ancho máximo del panel",
  unit: "mm",
  industry: 2440,
  sincereStd: 2440,
  sincereMax: 3000,
  note: "Nuestro horno de templado tiene una envolvente de 3.000 x 15.000 mm, complementada en el lado de seguridad por un autoclave de laminado de 3 x 15 m.",
  radarMax: 3000
}, {
  key: "panel-length",
  label: "Largo máximo del panel",
  unit: "mm",
  industry: 6000,
  sincereStd: 9000,
  sincereMax: 15000,
  note: "Los paneles jumbo de 15 m requieren contenedores marítimos de plataforma plana (flat-rack) y planificación a escala de proyecto. Consulte el análisis detallado de paneles jumbo.",
  radarMax: 15000
}, {
  key: "tempered-max-thickness",
  label: "Espesor máximo de vidrio templado",
  unit: "mm",
  industry: 15,
  sincereStd: 19,
  sincereMax: 19,
  note: "19 mm es el límite arquitectónico práctico. Espesores mayores requieren proveedores especializados de vidrio flotado.",
  radarMax: 25
}, {
  key: "igu-cavity",
  label: "Cavidad máxima de UVA (Unidad de Vidrio Aislante)",
  unit: "mm",
  industry: 16,
  sincereStd: 20,
  sincereMax: 24,
  note: "Las cavidades más profundas mejoran el valor U, pero presentan riesgo de corrientes de convección. Nuestra línea de doble sello valida hasta 24 mm con relleno de argón.",
  radarMax: 24
}, {
  key: "sgp-interlayer",
  label: "Número máximo de láminas intermedias SGP (SentryGlas Plus)",
  unit: "plies",
  industry: 2,
  sincereStd: 3,
  sincereMax: 4,
  note: "Cuatro láminas (0,76 x 4 = 3,04 mm) se especifican para aplicaciones estructurales en altura y de piso transitable según EN 14449.",
  radarMax: 4
}, {
  key: "lead-time",
  label: "Plazo de entrega típico",
  unit: "days",
  industry: 25,
  sincereStd: 15,
  sincereMax: 10,
  note: "La producción estándar es de 10 a 15 días hábiles desde la orden de compra. Los formatos jumbo y el triple acristalamiento añaden de 5 a 10 días. En este indicador, menor es mejor.",
  // Inverted for radar: shorter is better. We'll compute radar value as (max-x)/max.
  radarMax: 30
}];
export default function CapabilityEnvelopeMatrix() {
  const [view, setView] = useState<ViewMode>("table");
  return <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
            Interactivo: Envolvente de Capacidades
          </div>
          <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
            Sincere Glass frente al estándar típico del sector, en seis dimensiones de especificación
          </h3>
        </div>
        <div className="inline-flex rounded-lg border border-[#3A4250]/60 overflow-hidden self-start">
          <button type="button" onClick={() => setView("table")} className={`px-4 py-1.5 text-xs font-semibold transition-colors ${view === "table" ? "bg-[#DAA745] text-[#1C1F26]" : "bg-transparent text-[#8B95A5] hover:text-[#F2F0ED]"}`} aria-pressed={view === "table"}>
            Table
          </button>
          <button type="button" onClick={() => setView("radar")} className={`px-4 py-1.5 text-xs font-semibold transition-colors ${view === "radar" ? "bg-[#DAA745] text-[#1C1F26]" : "bg-transparent text-[#8B95A5] hover:text-[#F2F0ED]"}`} aria-pressed={view === "radar"}>
            Radar
          </button>
        </div>
      </div>

      {view === "table" ? <TableView /> : <RadarView />}

      <p className="text-xs text-[#8B95A5] mt-5 leading-relaxed">
        El estándar típico del sector refleja la capacidad media de los fabricantes de vidrio arquitectónico chinos de gama media, comparado con fichas técnicas públicas y comentarios de compradores. El Estándar Sincere es lo que comprometemos en un pedido normal por contenedor; el Máximo Sincere es el techo que entregamos en encargos a escala de proyecto con ajustes en el plazo de entrega. Datos verificados: 2026-10-23.
      </p>
    </div>;
}
function TableView() {
  return <div className="overflow-x-auto">
      <table aria-label="Envolvente de capacidades: estándar típico del sector frente al estándar y máximo de Sincere Glass en seis dimensiones de especificación" className="w-full text-sm border-collapse">
        <caption className="text-xs text-[#8B95A5] mb-2 text-left caption-top">
          Comparación de envolvente de capacidades — Sincere Glass (Wuhan) frente al estándar típico del sector de gama media. Datos verificados: 2026-10-23.
        </caption>
        <thead>
          <tr className="border-b border-[#3A4250]/40">
            <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Dimension</th>
            <th scope="col" className="text-right text-[#DAA745] text-xs uppercase tracking-wider py-2 px-4">Estándar típico del sector</th>
            <th scope="col" className="text-right text-[#DAA745] text-xs uppercase tracking-wider py-2 px-4">Estándar Sincere</th>
            <th scope="col" className="text-right text-[#DAA745] text-xs uppercase tracking-wider py-2 px-4">Sincere Max</th>
            <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pl-4">Note</th>
          </tr>
        </thead>
        <tbody className="text-[#8B95A5]">
          {METRICS.map(m => <tr key={m.key} className="border-b border-[#3A4250]/20 align-top">
              <th scope="row" className="text-left font-semibold py-3 pr-4 text-[#F2F0ED]">
                {m.label}
                <span className="text-[#8B95A5] font-normal"> ({m.unit})</span>
              </th>
              <td className="text-right py-3 px-4">{m.industry.toLocaleString()}</td>
              <td className="text-right py-3 px-4 text-[#F2F0ED]">{m.sincereStd.toLocaleString()}</td>
              <td className="text-right py-3 px-4 text-[#DAA745] font-semibold">{m.sincereMax.toLocaleString()}</td>
              <td className="text-left py-3 pl-4 text-xs leading-relaxed max-w-[300px]">{m.note}</td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}
function RadarView() {
  const cx = 220;
  const cy = 220;
  const r = 150;
  const n = METRICS.length;
  const points = useMemo(() => {
    return METRICS.map((m, i) => {
      const angle = i / n * Math.PI * 2 - Math.PI / 2;
      // Lead-time is inverted (shorter = better)
      const normIndustry = m.key === "lead-time" ? Math.max(0, (m.radarMax - m.industry) / m.radarMax) : m.industry / m.radarMax;
      const normStd = m.key === "lead-time" ? Math.max(0, (m.radarMax - m.sincereStd) / m.radarMax) : m.sincereStd / m.radarMax;
      const normMax = m.key === "lead-time" ? Math.max(0, (m.radarMax - m.sincereMax) / m.radarMax) : m.sincereMax / m.radarMax;
      return {
        key: m.key,
        label: m.label,
        angle,
        axisEnd: {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r
        },
        industry: {
          x: cx + Math.cos(angle) * r * normIndustry,
          y: cy + Math.sin(angle) * r * normIndustry
        },
        std: {
          x: cx + Math.cos(angle) * r * normStd,
          y: cy + Math.sin(angle) * r * normStd
        },
        max: {
          x: cx + Math.cos(angle) * r * normMax,
          y: cy + Math.sin(angle) * r * normMax
        }
      };
    });
  }, []);
  const industryPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.industry.x} ${p.industry.y}`).join(" ") + " Z";
  const stdPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.std.x} ${p.std.y}`).join(" ") + " Z";
  const maxPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.max.x} ${p.max.y}`).join(" ") + " Z";
  return <div className="grid lg:grid-cols-[1fr_200px] gap-6 items-center">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 440 440" className="w-full h-auto max-w-[440px] mx-auto block" role="img" aria-label="Gráfico de radar que compara el estándar típico del sector, el Estándar Sincere y el Sincere Max en seis dimensiones de especificación">
          {/* grid rings */}
          {[0.25, 0.5, 0.75, 1].map(f => <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="#3A4250" strokeWidth={0.6} opacity={0.5} />)}
          {/* axes */}
          {points.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.axisEnd.x} y2={p.axisEnd.y} stroke="#3A4250" strokeWidth={0.6} opacity={0.5} />)}

          {/* polygons */}
          <path d={industryPath} fill="#8B95A5" fillOpacity={0.15} stroke="#8B95A5" strokeWidth={1.2} />
          <path d={stdPath} fill="#F2F0ED" fillOpacity={0.1} stroke="#F2F0ED" strokeWidth={1.4} />
          <path d={maxPath} fill="#DAA745" fillOpacity={0.18} stroke="#DAA745" strokeWidth={1.6} />

          {/* labels */}
          {points.map((p, i) => {
          const labelDist = r + 30;
          const lx = cx + Math.cos(p.angle) * labelDist;
          const ly = cy + Math.sin(p.angle) * labelDist;
          const anchor = Math.abs(Math.cos(p.angle)) < 0.3 ? "middle" : Math.cos(p.angle) > 0 ? "start" : "end";
          return <text key={i} x={lx} y={ly} textAnchor={anchor} fontSize={10} fontWeight={600} fill="#F2F0ED" dominantBaseline="middle">
                {p.label}
              </text>;
        })}
        </svg>
      </div>

      <div className="space-y-3">
        <LegendRow color="#DAA745" label="Sincere Max" />
        <LegendRow color="#F2F0ED" label="Estándar Sincere" />
        <LegendRow color="#8B95A5" label="Estándar típico del sector" />
        <p className="text-xs text-[#8B95A5] leading-relaxed mt-3">
          Los ejes están normalizados al límite superior de cada dimensión. Para el plazo de entrega, un tiempo menor es mejor, por lo que un mayor alcance en el eje indica una entrega más rápida.
        </p>
      </div>
    </div>;
}
function LegendRow({
  color,
  label
}: {
  color: string;
  label: string;
}) {
  return <div className="flex items-center gap-2">
      <span className="inline-block w-3 h-3 rounded-sm" style={{
      background: color,
      opacity: 0.5
    }} aria-hidden="true" />
      <span className="text-xs text-[#F2F0ED]">{label}</span>
    </div>;
}