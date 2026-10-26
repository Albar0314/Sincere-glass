"use client";

import { useMemo, useState } from "react";

/**
 * Curved vs flat cost-premium estimator. Three inputs: curve radius (mm),
 * finished panel area (m2), and geometry (single-axis, double-axis,
 * free-form). Returns the per-m2 cost premium multiplier over flat
 * tempered of the same thickness, plus a project-total premium in USD.
 * The multiplier uses an empirical curve built from our Wuhan plant's
 * export quotes: single-axis panels at R>=800 mm run 1.6-2.1x flat;
 * tight-radius (R<800 mm) runs 2.2-3.0x; spherical adds 50% on top of
 * the single-axis multiplier because of custom-mold cost; free-form
 * adds another 30% for CNC mold shaping. Mold cost amortizes over
 * order area, so the per-m2 premium drops as area rises. The baseline
 * flat tempered unit price is user-adjustable with a sensible default.
 * All math client-side.
 */

type Geometry = "single" | "spherical" | "freeform";
const GEOM_LABEL: Record<Geometry, string> = {
  single: "Single-axis (cylindrical)",
  spherical: "Double-axis (spherical)",
  freeform: "Free-form (asymmetric)"
};
const GEOM_MULTIPLIER: Record<Geometry, number> = {
  single: 1.0,
  spherical: 1.5,
  freeform: 1.95
};
function baseMultiplier(radius: number): number {
  // Hot-bend tight radius penalty curve. Below 500 is non-viable per our page.
  if (radius < 500) return 3.5;
  if (radius < 800) return 2.6; // tight hot-bend with dedicated mold
  if (radius < 1500) return 2.1; // standard hot-bend
  if (radius < 3000) return 1.75;
  if (radius < 5000) return 1.5; // either hot or cold
  return 1.25; // shallow cold-bend territory
}
function moldAmortization(area: number, geometry: Geometry): number {
  // Mold cost absorbed by order area. Small orders carry more mold cost per m2.
  const base = geometry === "single" ? 1500 : geometry === "spherical" ? 4500 : 7000;
  const perSqm = base / Math.max(area, 1);
  return Math.min(perSqm, 150); // cap: mold never adds more than $150/m2 even on tiny orders
}
function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
}
export default function CurvedPremiumCalculator() {
  const [radius, setRadius] = useState<number>(1500);
  const [area, setArea] = useState<number>(50);
  const [geometry, setGeometry] = useState<Geometry>("single");
  const [flatPrice, setFlatPrice] = useState<number>(80);
  const result = useMemo(() => {
    const baseMult = baseMultiplier(radius);
    const geomMult = GEOM_MULTIPLIER[geometry];
    const combinedMult = baseMult * geomMult;
    const moldPerSqm = moldAmortization(area, geometry);
    const curvedPerSqm = flatPrice * combinedMult + moldPerSqm;
    const flatTotal = flatPrice * area;
    const curvedTotal = curvedPerSqm * area;
    const deltaTotal = curvedTotal - flatTotal;
    const deltaPct = Math.round((curvedPerSqm / flatPrice - 1) * 100);
    const viable = radius >= 500;
    return {
      viable,
      baseMult,
      geomMult,
      combinedMult,
      moldPerSqm,
      curvedPerSqm,
      flatTotal,
      curvedTotal,
      deltaTotal,
      deltaPct
    };
  }, [radius, area, geometry, flatPrice]);
  return <div className="rounded-2xl bg-[#1C1F26] text-white p-6 md:p-8 shadow-xl my-6">
      <div className="mb-6">
        <p className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-2">
          Pruebe su especificación
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-white">
          Estimador de sobrecosto por curvado
        </h3>
        <p className="text-sm text-white/60 mt-2">
          Ajuste el radio y el área, seleccione la geometría. La calculadora devuelve el diferencial de coste por m² y el total del proyecto respecto al vidrio templado plano del mismo espesor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
              Radio de curvatura: <span className="text-[#DAA745]">{radius} mm</span>
            </label>
            <input type="range" min={300} max={8000} step={50} value={radius} onChange={e => setRadius(parseInt(e.target.value, 10))} className="w-full accent-[#DAA745] cursor-pointer" aria-label="Radio de curvatura en milímetros" />
            <div className="flex justify-between text-[10px] text-white/40 mt-1">
              <span>300</span>
              <span>500 (mínimo)</span>
              <span>3000</span>
              <span>8000</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
              Área del proyecto: <span className="text-[#DAA745]">{area} m&sup2;</span>
            </label>
            <input type="range" min={5} max={500} step={5} value={area} onChange={e => setArea(parseInt(e.target.value, 10))} className="w-full accent-[#DAA745] cursor-pointer" aria-label="Área total del panel terminado en metros cuadrados" />
            <div className="flex justify-between text-[10px] text-white/40 mt-1">
              <span>5</span>
              <span>50</span>
              <span>200</span>
              <span>500</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
              Geometry
            </label>
            <div className="flex flex-col gap-2">
              {(Object.keys(GEOM_LABEL) as Geometry[]).map(g => <button key={g} type="button" onClick={() => setGeometry(g)} className={"text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors " + (geometry === g ? "bg-[#DAA745] text-[#1C1F26]" : "bg-white/10 text-white/70 hover:bg-white/15")}>
                  {GEOM_LABEL[g]}
                </button>)}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
              Base de referencia — vidrio templado plano: <span className="text-[#DAA745]">${flatPrice}/m&sup2;</span>
            </label>
            <input type="range" min={40} max={200} step={5} value={flatPrice} onChange={e => setFlatPrice(parseInt(e.target.value, 10))} className="w-full accent-[#DAA745] cursor-pointer" aria-label="Precio base del vidrio templado plano por metro cuadrado" />
            <p className="text-[11px] text-white/40 mt-1">
              El valor predeterminado de $80/m² refleja vidrio templado claro de 10 mm en condiciones FOB-China, T4 2026. Ajuste según su especificación real.
            </p>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl bg-white/5 border-l-4 p-5" style={{
        borderLeftColor: result.viable ? "#DAA745" : "#dc2626"
      }}>
          {!result.viable ? <div>
              <p className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-2">No viable</p>
              <p className="text-white/80 text-sm">
                Radio inferior al mínimo de producción de 500 mm. Considere una hoja de menor espesor o una composición facetada de dos piezas.
              </p>
            </div> : <div className="space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                  Curvado por m²
                </p>
                <p className="text-3xl font-display font-bold text-[#DAA745] mt-0.5">
                  {formatUSD(result.curvedPerSqm)}
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Base plana: {formatUSD(flatPrice)}/m&sup2;
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                    Total del proyecto (curvado)
                  </p>
                  <p className="text-xl text-white font-bold mt-0.5">{formatUSD(result.curvedTotal)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                    Equivalente plano
                  </p>
                  <p className="text-xl text-white/80 font-bold mt-0.5">{formatUSD(result.flatTotal)}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                  Sobrecosto respecto al plano
                </p>
                <p className="text-xl text-[#DAA745] font-bold mt-0.5">
                  +{formatUSD(result.deltaTotal)} <span className="text-white/60 text-sm font-normal">(+{result.deltaPct}%)</span>
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1 text-xs text-white/60">
                <p>Penalización por geometría: {result.baseMult.toFixed(2)}x</p>
                <p>Multiplicador geométrico: {result.geomMult.toFixed(2)}x</p>
                <p>Molde amortizado: {formatUSD(result.moldPerSqm)}/m&sup2;</p>
              </div>
            </div>}
        </div>
      </div>

      <p className="mt-5 text-[11px] text-white/40 leading-relaxed">
        Estimación de planificación basada en el historial de cotizaciones de exportación de Sincere Glass. El precio contractual real depende de los planos específicos, las configuraciones de laminado/UVA (Unidad de Vidrio Aislante) y los mercados actuales de vidrio flotado. Datos verificados: 2026-10-26.
      </p>
    </div>;
}