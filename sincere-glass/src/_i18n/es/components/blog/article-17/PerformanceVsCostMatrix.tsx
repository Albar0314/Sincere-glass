"use client";

import { useState } from "react";
type Interlayer = "pvb" | "acoustic" | "sgp";
interface MetricRow {
  id: string;
  label: string;
  unit: string;
  description: string;
  values: Record<Interlayer, number>;
  displayValues: Record<Interlayer, string>;
  higherIsBetter: boolean;
}
const INTERLAYER_META: Record<Interlayer, {
  label: string;
  color: string;
  costX: string;
}> = {
  "pvb": {
    label: "PVB (polivinil butiral) estándar",
    color: "#8B95A5",
    costX: "1.0x cost"
  },
  "acoustic": {
    label: "PVB (polivinil butiral) acústico",
    color: "#C4952E",
    costX: "1.3x cost"
  },
  "sgp": {
    label: "SGP (SentryGlas Plus) ionoplasto",
    color: "#DAA745",
    costX: "4.3x cost (interlayer only)"
  }
};
const METRICS: MetricRow[] = [{
  id: "retention",
  label: "Retención post-rotura",
  unit: "minutes rigid",
  description: "Tiempo durante el cual un panel con doble fisura permanece rígido sin pandeo; ensayo de banco a 23 °C.",
  values: {
    pvb: 20,
    acoustic: 20,
    sgp: 240
  },
  displayValues: {
    pvb: "~20 min",
    acoustic: "~20 min",
    sgp: "4 h+ (rigid)"
  },
  higherIsBetter: true
}, {
  id: "shear",
  label: "Módulo de cortante (24 h / 23 °C)",
  unit: "MPa",
  description: "Rigidez a largo plazo. Determina si el laminado actúa como una placa compuesta o como dos hojas deslizadas.",
  values: {
    pvb: 0.6,
    acoustic: 0.4,
    sgp: 85
  },
  displayValues: {
    pvb: "0.6 MPa",
    acoustic: "0.4 MPa",
    sgp: "85 MPa"
  },
  higherIsBetter: true
}, {
  id: "edge",
  label: "Resistencia a la intemperie en bordes (húmedo, expuesto)",
  unit: "years to visible delamination",
  description: "Vida útil en servicio con borde abierto antes de que la delaminación sea visible, en exposición húmeda o costera.",
  values: {
    pvb: 6,
    acoustic: 5,
    sgp: 22
  },
  displayValues: {
    pvb: "~6 yr",
    acoustic: "~5 yr",
    sgp: "20 yr+"
  },
  higherIsBetter: true
}, {
  id: "stc",
  label: "Valoración STC (STC (Clase de Transmisión Sonora)) (6+lámina intermedia+6)",
  unit: "dB",
  description: "Clase de Transmisión Sonora para la composición de referencia 6+6. Mayor valor = mayor aislamiento acústico.",
  values: {
    pvb: 36,
    acoustic: 39,
    sgp: 35
  },
  displayValues: {
    pvb: "36 dB",
    acoustic: "39 dB",
    sgp: "35 dB"
  },
  higherIsBetter: true
}, {
  id: "cost",
  label: "Coste del material de la lámina intermedia",
  unit: "USD/m² (interlayer only)",
  description: "Índice FOB China 2026, solo material de lámina intermedia (no laminado terminado).",
  values: {
    pvb: 3,
    acoustic: 5,
    sgp: 13
  },
  displayValues: {
    pvb: "$3",
    acoustic: "$5",
    sgp: "$13"
  },
  higherIsBetter: false
}];
const INTERLAYER_KEYS: Interlayer[] = ["pvb", "acoustic", "sgp"];
export default function PerformanceVsCostMatrix() {
  const [active, setActive] = useState<Interlayer | null>(null);
  function barWidthPct(metric: MetricRow, type: Interlayer): number {
    const vals = INTERLAYER_KEYS.map(k => metric.values[k]);
    const max = Math.max(...vals);
    if (max === 0) return 0;
    const v = metric.values[type];
    // Log-ish scaling for shear modulus so PVB bars remain visible
    if (metric.id === "shear") {
      const logMax = Math.log10(max + 1);
      const logV = Math.log10(v + 1);
      return logV / logMax * 100;
    }
    return v / max * 100;
  }
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Matriz de Rendimiento × Coste
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Lo que cada lámina intermedia ofrece realmente por su precio
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Cinco métricas en un eje, tres láminas intermedias en el otro. SGP (SentryGlas Plus) supera en métricas estructurales y de durabilidad por un factor de 10 a 100; el PVB (polivinil butiral) acústico lidera en STC (Clase de Transmisión Sonora); el PVB (polivinil butiral) estándar lidera en coste. Haga clic en el encabezado de una columna para resaltar esa lámina intermedia en todas las filas.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4 sticky top-0">
        <div className="text-xs text-[#8B95A5] uppercase tracking-wider self-end pb-2">
          Metric
        </div>
        {INTERLAYER_KEYS.map(k => <button key={k} onClick={() => setActive(active === k ? null : k)} className={`px-3 py-3 rounded-lg text-xs font-semibold text-left transition-colors border ${active === k ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
            <div className="font-bold">{INTERLAYER_META[k].label}</div>
            <div className={`text-[11px] mt-1 font-normal ${active === k ? "text-[#1C1F26]/70" : "text-[#8B95A5]"}`}>
              {INTERLAYER_META[k].costX}
            </div>
          </button>)}
      </div>

      <div className="space-y-5">
        {METRICS.map(m => <div key={m.id}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-sm font-semibold text-[#F2F0ED]">
                {m.label}
              </div>
              <div className="text-[11px] text-[#8B95A5] italic">{m.unit}</div>
            </div>
            <p className="text-xs text-[#8B95A5] m-0 mb-3">{m.description}</p>
            <div className="grid grid-cols-4 gap-2 items-center">
              <div className="text-[11px] text-[#8B95A5] uppercase tracking-wider">
                Value
              </div>
              {INTERLAYER_KEYS.map(k => {
            const dimmed = active !== null && active !== k;
            return <div key={k} className={`transition-opacity ${dimmed ? "opacity-30" : "opacity-100"}`}>
                    <div className="h-6 rounded bg-[#3A4250]/30 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 rounded transition-all duration-500" style={{
                  width: `${barWidthPct(m, k)}%`,
                  backgroundColor: INTERLAYER_META[k].color
                }} />
                    </div>
                    <div className="text-xs font-mono text-[#F2F0ED] mt-1">
                      {m.displayValues[k]}
                    </div>
                  </div>;
          })}
            </div>
          </div>)}
      </div>

      <p className="text-[11px] text-[#8B95A5] italic mt-6 m-0">
        La barra del módulo de corte utiliza escala logarítmica para que los valores de PVB (polivinil butiral) sean visibles frente a los de SGP (SentryGlas Plus). Todas las demás métricas se escalan linealmente respecto al máximo de la fila. Los valores son referencias típicas de banco de fábrica, no valores de diseño.
      </p>
    </div>;
}