"use client";

import { useState } from "react";
type NodeKey = "substrate" | "processing" | "thickness" | "assembly" | "coating" | "size" | "weight" | "strength" | "u-value" | "cost" | "hardware" | "shipping";
type NodeDef = {
  key: NodeKey;
  label: string;
  type: "input" | "derived";
  x: number;
  y: number;
  desc: string;
};
const NODES: NodeDef[] = [
// Six input attributes (left column)
{
  key: "substrate",
  label: "Substrate",
  type: "input",
  x: 90,
  y: 70,
  desc: "Incoloro, ultra-claro, tintado o reflectante. Afecta el rendimiento óptico y el costo base."
}, {
  key: "processing",
  label: "Processing",
  type: "input",
  x: 90,
  y: 140,
  desc: "Vidrio recocido, vidrio templado, vidrio semitemplado, vidrio laminado o vidrio templado laminado. Determina la clasificación de seguridad y la resistencia."
}, {
  key: "thickness",
  label: "Thickness",
  type: "input",
  x: 90,
  y: 210,
  desc: "6 a 19 mm. El factor individual más determinante en peso, resistencia, costo y densidad de carga en envío."
}, {
  key: "assembly",
  label: "Assembly",
  type: "input",
  x: 90,
  y: 280,
  desc: "Monolítico, doble UVA (Unidad de Vidrio Aislante) o triple UVA. Rige el rendimiento térmico y el espesor total del conjunto."
}, {
  key: "coating",
  label: "Coating",
  type: "input",
  x: 90,
  y: 350,
  desc: "Sin recubrimiento, vidrio de baja emisividad (Low-E) (capa blanda o capa dura), control solar o vidrio con frita cerámica. Modifica el valor U, el FS (Factor Solar) y la estética."
}, {
  key: "size",
  label: "Tamaño del panel",
  type: "input",
  x: 90,
  y: 420,
  desc: "Estándar, grande o jumbo. Incide en el embalaje, la elección del contenedor de envío y el método de instalación."
},
// Six derived outputs (right column)
{
  key: "weight",
  label: "Peso / m²",
  type: "derived",
  x: 460,
  y: 70,
  desc: "Determinado por el espesor y el conjunto. Densidad 2.500 kg/m³; monolítico 12 mm = 30 kg/m²; triple UVA 6+12A+6+12A+6 = ~45 kg/m²."
}, {
  key: "strength",
  label: "Carga de rotura",
  type: "derived",
  x: 460,
  y: 140,
  desc: "Determinado por el procesado y el espesor. Vidrio templado 12 mm = ~36 kN/m² (4-5x vidrio recocido). El laminado añade retención tras la rotura."
}, {
  key: "u-value",
  label: "U-value",
  type: "derived",
  x: 460,
  y: 210,
  desc: "Determinado por el conjunto y el recubrimiento. Monolítico 12 mm = 5,6 W/m²K. Doble UVA con vidrio de baja emisividad (Low-E) y relleno de argón = 1,1-1,6 W/m²K."
}, {
  key: "cost",
  label: "Costo / m²",
  type: "derived",
  x: 460,
  y: 280,
  desc: "Determinado por los seis parámetros. Regla general: espesor y laminado multiplican ~2x cada uno; recubrimiento +15-25%; tamaño jumbo +20-40%."
}, {
  key: "hardware",
  label: "Especificaciones de herrajes",
  type: "derived",
  x: 460,
  y: 350,
  desc: "Determinado por peso y tamaño. Los paneles de 180 kg admiten instalación con dos personas; por encima de ese límite, se requieren ventosas de vacío, bisagras reforzadas y bolsillos de acristalamiento más profundos."
}, {
  key: "shipping",
  label: "Plan de contenedor",
  type: "derived",
  x: 460,
  y: 420,
  desc: "Determinado por tamaño, peso y configuración. Los paneles jumbo requieren plataforma plana (flat-rack); las UVA (Unidad de Vidrio Aislante) triple reducen el número de paneles por contenedor en ~40%."
}];

// edges: {from, to}
const EDGES: Array<{
  from: NodeKey;
  to: NodeKey;
}> = [{
  from: "substrate",
  to: "cost"
}, {
  from: "substrate",
  to: "u-value"
}, {
  from: "processing",
  to: "strength"
}, {
  from: "processing",
  to: "cost"
}, {
  from: "thickness",
  to: "weight"
}, {
  from: "thickness",
  to: "strength"
}, {
  from: "thickness",
  to: "cost"
}, {
  from: "thickness",
  to: "shipping"
}, {
  from: "assembly",
  to: "weight"
}, {
  from: "assembly",
  to: "u-value"
}, {
  from: "assembly",
  to: "cost"
}, {
  from: "assembly",
  to: "shipping"
}, {
  from: "coating",
  to: "u-value"
}, {
  from: "coating",
  to: "cost"
}, {
  from: "size",
  to: "shipping"
}, {
  from: "size",
  to: "hardware"
}, {
  from: "size",
  to: "cost"
},
// weight cascade
{
  from: "weight",
  to: "hardware"
}, {
  from: "weight",
  to: "shipping"
}];
export default function AttributeCascadeDiagram() {
  const [hover, setHover] = useState<NodeKey | null>(null);

  // Compute reachable downstream nodes from the hovered node (BFS)
  const highlighted = new Set<NodeKey>();
  if (hover) {
    const queue: NodeKey[] = [hover];
    highlighted.add(hover);
    while (queue.length) {
      const cur = queue.shift() as NodeKey;
      for (const e of EDGES) {
        if (e.from === cur && !highlighted.has(e.to)) {
          highlighted.add(e.to);
          queue.push(e.to);
        }
      }
    }
  }
  const activeNode = hover ? NODES.find(n => n.key === hover) : null;
  return <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
          Interactivo: Cascada de atributos
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Cómo las decisiones de especificación repercuten en peso, costo, herrajes y transporte
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Pase el cursor sobre cualquier entrada (izquierda) para resaltar todos los resultados derivados (derecha) que influencia. Pase el cursor sobre un resultado derivado para rastrear su origen.
        </p>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 580 490" className="w-full h-auto" role="img" aria-label="Diagrama de cascada de atributos que muestra cómo seis especificaciones de entrada determinan seis resultados derivados">
          {/* edges */}
          {EDGES.map((e, i) => {
          const from = NODES.find(n => n.key === e.from);
          const to = NODES.find(n => n.key === e.to);
          if (!from || !to) return null;
          const active = highlighted.has(from.key) && highlighted.has(to.key);
          return <path key={i} d={`M ${from.x + 95} ${from.y + 18} C ${(from.x + to.x) / 2 + 60} ${from.y + 18}, ${(from.x + to.x) / 2 - 60} ${to.y + 18}, ${to.x} ${to.y + 18}`} fill="none" stroke={active ? "#DAA745" : "#3A4250"} strokeWidth={active ? 1.8 : 0.8} opacity={active ? 0.9 : 0.35} />;
        })}

          {/* nodes */}
          {NODES.map(n => {
          const active = highlighted.has(n.key);
          const isInput = n.type === "input";
          return <g key={n.key} onMouseEnter={() => setHover(n.key)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(n.key)} onBlur={() => setHover(null)} tabIndex={0} style={{
            cursor: "pointer",
            outline: "none"
          }}>
                <rect x={n.x} y={n.y} width={95} height={36} rx={8} fill={active ? "#DAA745" : isInput ? "#3A4250" : "#1C1F26"} stroke={active ? "#DAA745" : isInput ? "#8B95A5" : "#3A4250"} strokeWidth={1.2} />
                <text x={n.x + 47.5} y={n.y + 22.5} textAnchor="middle" fontSize={11} fontWeight={600} fill={active ? "#1C1F26" : "#F2F0ED"}>
                  {n.label}
                </text>
              </g>;
        })}

          {/* column headers */}
          <text x={137} y={30} textAnchor="middle" fontSize={10} fill="#8B95A5" fontWeight={600} className="uppercase tracking-wider">
            Entradas (usted especifica)
          </text>
          <text x={507} y={30} textAnchor="middle" fontSize={10} fill="#8B95A5" fontWeight={600} className="uppercase tracking-wider">
            Derivados (calculados en fábrica)
          </text>
        </svg>
      </div>

      {/* detail panel */}
      <div className="mt-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-4 min-h-[88px]">
        {activeNode ? <>
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
              {activeNode.type === "input" ? "Input attribute" : "Derived output"} &mdash; {activeNode.label}
            </div>
            <p className="text-sm text-[#F2F0ED] m-0 leading-relaxed">{activeNode.desc}</p>
          </> : <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">
            Pase el cursor sobre un nodo para ver qué determina. Las seis entradas a la izquierda son las variables que usted controla en la hoja de especificaciones; los seis resultados a la derecha son los que la fábrica calcula a partir de ellas.
          </p>}
      </div>
    </div>;
}