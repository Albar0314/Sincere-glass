"use client";

import { useMemo, useState } from "react";
type BuildUp = "6+6" | "8+8" | "10+10" | "12+12";
type Interlayer = "pvb" | "acoustic-pvb" | "sgp";
const GLASS_FOB_PER_M2: Record<string, number> = {
  "6": 11,
  "8": 15,
  "10": 20,
  "12": 26
};
const INTERLAYERS: Record<Interlayer, {
  label: string;
  shortLabel: string;
  cost: number;
  note: string;
}> = {
  "pvb": {
    label: "PVB (polivinil butiral) estándar (0,76 mm)",
    shortLabel: "PVB",
    cost: 3,
    note: "Lámina intermedia de seguridad por defecto. No estructural en carga de larga duración."
  },
  "acoustic-pvb": {
    label: "PVB (polivinil butiral) acústico (tricapa de 0,76 mm)",
    shortLabel: "Acoustic PVB",
    cost: 5,
    note: "El núcleo más blando mejora el STC (Clase de Transmisión Sonora) en 2-3 dB frente al PVB (polivinil butiral) estándar."
  },
  "sgp": {
    label: "Ionoplast SGP (SentryGlas Plus) (1,52 mm)",
    shortLabel: "SGP",
    cost: 13,
    note: "100 veces más rígido que el PVB (polivinil butiral) a las 24 h. Acción compuesta estructural."
  }
};
const BUILDUPS: BuildUp[] = ["6+6", "8+8", "10+10", "12+12"];
const BUILDUP_LITES: Record<BuildUp, string[]> = {
  "6+6": ["6", "6"],
  "8+8": ["8", "8"],
  "10+10": ["10", "10"],
  "12+12": ["12", "12"]
};
const INTERLAYER_KEYS: Interlayer[] = ["pvb", "acoustic-pvb", "sgp"];
function fmtUSD(n: number): string {
  return "$" + n.toFixed(2);
}
function fmtUSDRound(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}
export default function InterlayerCostCalculator() {
  const [buildUp, setBuildUp] = useState<BuildUp>("10+10");
  const [interlayer, setInterlayer] = useState<Interlayer>("pvb");
  const [area, setArea] = useState<number>(300);
  const result = useMemo(() => {
    const lites = BUILDUP_LITES[buildUp];
    const glassPerM2 = lites.reduce((sum, mm) => sum + GLASS_FOB_PER_M2[mm], 0);
    const interlayerPerM2 = INTERLAYERS[interlayer].cost;
    const totalPerM2 = glassPerM2 + interlayerPerM2;
    const orderTotal = totalPerM2 * area;
    const pvbBasePerM2 = glassPerM2 + INTERLAYERS["pvb"].cost;
    const premiumPerM2 = totalPerM2 - pvbBasePerM2;
    const premiumPct = pvbBasePerM2 === 0 ? 0 : premiumPerM2 / pvbBasePerM2 * 100;
    const premiumTotal = premiumPerM2 * area;
    return {
      glassPerM2,
      interlayerPerM2,
      totalPerM2,
      orderTotal,
      pvbBasePerM2,
      premiumPerM2,
      premiumPct,
      premiumTotal
    };
  }, [buildUp, interlayer, area]);
  const isPVB = interlayer === "pvb";
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Calculadora interactiva
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Calcule su costo FOB de lámina intermedia y el sobrecosto del SGP (SentryGlas Plus)
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Estimaciones basadas en los índices FOB de Wuhan 2026 para vidrio flotado y láminas intermedias. Modifique cualquier parámetro para ver la variación respecto a una referencia de PVB (polivinil butiral) estándar.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Composición del vidrio
          </label>
          <div className="grid grid-cols-2 gap-2">
            {BUILDUPS.map(b => <button key={b} onClick={() => setBuildUp(b)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${buildUp === b ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
                {b} mm
              </button>)}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Tipo de lámina intermedia
          </label>
          <div className="space-y-2">
            {INTERLAYER_KEYS.map(k => <button key={k} onClick={() => setInterlayer(k)} className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${interlayer === k ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
                {INTERLAYERS[k].shortLabel}
              </button>)}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Área del pedido (m²)
          </label>
          <input type="number" min={10} max={5000} step={10} value={area} onChange={e => setArea(Math.max(10, Math.min(5000, Number(e.target.value) || 0)))} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
          <p className="text-[11px] text-[#8B95A5] mt-2 m-0">
            Contenedor típico: 300-400 m² de vidrio laminado 10+10.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-5">
        <div className="rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 p-5">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-3">
            {buildUp} mm con {INTERLAYERS[interlayer].shortLabel}
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#8B95A5]">Vidrio (2 hojas)</dt>
              <dd className="text-[#F2F0ED] font-mono">
                {fmtUSD(result.glassPerM2)} /m²
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#8B95A5]">Interlayer</dt>
              <dd className="text-[#F2F0ED] font-mono">
                {fmtUSD(result.interlayerPerM2)} /m²
              </dd>
            </div>
            <div className="h-px bg-[#3A4250]/60 my-2" />
            <div className="flex justify-between">
              <dt className="text-[#F2F0ED] font-semibold">
                Subtotal FOB
              </dt>
              <dd className="text-[#DAA745] font-mono font-semibold">
                {fmtUSD(result.totalPerM2)} /m²
              </dd>
            </div>
            <div className="flex justify-between pt-1">
              <dt className="text-[#8B95A5]">Total del pedido ({area} m²)</dt>
              <dd className="text-[#F2F0ED] font-mono">
                {fmtUSDRound(result.orderTotal)}
              </dd>
            </div>
          </dl>
        </div>

        <div className={`rounded-lg p-5 border ${isPVB ? "bg-[#3A4250]/10 border-[#3A4250]/40" : "bg-[#DAA745]/10 border-[#DAA745]/40"}`}>
          <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-3">
            {isPVB ? "You are at baseline" : "Premium vs standard PVB"}
          </div>
          {isPVB ? <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
              El PVB (polivinil butiral) estándar es la referencia. Cambie a PVB Acústico o SGP (SentryGlas Plus) a la izquierda para ver el diferencial de coste exacto para esta composición y volumen de pedido.
            </p> : <>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-[#DAA745] font-mono">
                  +{result.premiumPct.toFixed(1)}%
                </span>
                <span className="text-sm text-[#8B95A5]">
                  por m² vs 2x{buildUp.split("+")[0]} mm PVB (polivinil butiral)
                </span>
              </div>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#8B95A5]">Línea base PVB (polivinil butiral)</dt>
                  <dd className="text-[#F2F0ED] font-mono">
                    {fmtUSD(result.pvbBasePerM2)} /m²
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#8B95A5]">Incremento por m²</dt>
                  <dd className="text-[#DAA745] font-mono">
                    +{fmtUSD(result.premiumPerM2)}
                  </dd>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#DAA745]/30 mt-2">
                  <dt className="text-[#F2F0ED] font-semibold">
                    Incremento total del pedido
                  </dt>
                  <dd className="text-[#DAA745] font-mono font-semibold">
                    +{fmtUSDRound(result.premiumTotal)}
                  </dd>
                </div>
              </dl>
            </>}
        </div>
      </div>

      <p className="text-xs text-[#8B95A5] italic m-0">
        {INTERLAYERS[interlayer].note}
      </p>
    </div>;
}