"use client";

import { useMemo, useState } from "react";

type Thickness = "6" | "8" | "10" | "12" | "15" | "19";
type Process = "annealed" | "tempered" | "pvb-lami" | "sgp-lami";

const BASE_USD_PER_M2: Record<Thickness, { clear: number; lowIron: number }> = {
  "6":  { clear: 12,  lowIron: 16 },
  "8":  { clear: 15,  lowIron: 20 },
  "10": { clear: 18,  lowIron: 25 },
  "12": { clear: 24,  lowIron: 34 },
  "15": { clear: 38,  lowIron: 55 },
  "19": { clear: 58,  lowIron: 86 },
};

const PROCESS_ADDER_USD_PER_M2: Record<Process, { label: string; adder: number }> = {
  "annealed":  { label: "Annealed (as cut)",            adder: 0 },
  "tempered":  { label: "Tempered",                     adder: 8 },
  "pvb-lami":  { label: "Laminated (PVB 1.52 mm)",      adder: 16 },
  "sgp-lami":  { label: "Laminated (SGP 1.52 mm)",      adder: 32 },
};

export default function CostPremiumCalculatorV2() {
  const [thickness, setThickness] = useState<Thickness>("10");
  const [process, setProcess] = useState<Process>("tempered");
  const [width, setWidth] = useState<number>(1200);
  const [height, setHeight] = useState<number>(2400);
  const [quantity, setQuantity] = useState<number>(50);

  const result = useMemo(() => {
    const base = BASE_USD_PER_M2[thickness];
    const proc = PROCESS_ADDER_USD_PER_M2[process].adder;
    const panelAreaM2 = (width / 1000) * (height / 1000);
    const totalAreaM2 = panelAreaM2 * quantity;

    const clearPerM2 = base.clear + proc;
    const lowIronPerM2 = base.lowIron + proc;

    const clearTotal = clearPerM2 * totalAreaM2;
    const lowIronTotal = lowIronPerM2 * totalAreaM2;
    const premiumUsd = lowIronTotal - clearTotal;
    const premiumPct = (premiumUsd / clearTotal) * 100;

    return {
      panelAreaM2,
      totalAreaM2,
      clearPerM2,
      lowIronPerM2,
      clearTotal,
      lowIronTotal,
      premiumUsd,
      premiumPct,
    };
  }, [thickness, process, width, height, quantity]);

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Cost Premium Calculator (Low Iron vs Clear)
        </h3>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          Interactive
        </span>
      </div>

      <p className="mb-5 text-sm text-slate-600">
        Enter panel size, quantity, thickness, and processing to see the
        absolute cost delta and percentage premium of specifying low iron
        instead of standard clear. Process adders (tempering, lamination) are
        the same for both products, so the premium is driven entirely by the
        raw substrate cost delta multiplied by total area.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Thickness
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(BASE_USD_PER_M2) as Thickness[]).map((t) => {
                const active = thickness === t;
                return (
                  <button
                    key={t}
                    onClick={() => setThickness(t)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm font-medium transition " +
                      (active
                        ? "border-amber-500 bg-amber-50 text-amber-800"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300")
                    }
                  >
                    {t} mm
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Processing
            </label>
            <select
              value={process}
              onChange={(e) => setProcess(e.target.value as Process)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none"
            aria-label="Processing">
              {(Object.keys(PROCESS_ADDER_USD_PER_M2) as Process[]).map((p) => (
                <option key={p} value={p}>
                  {PROCESS_ADDER_USD_PER_M2[p].label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Panel width (mm)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              aria-label="Panel width (mm)" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Panel height (mm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              aria-label="Panel height (mm)" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quantity (panels)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            aria-label="Quantity (panels)" />
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 p-5 text-slate-100">
          <div className="mb-3 border-b border-slate-700 pb-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Result
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Panel area</dt>
              <dd>{result.panelAreaM2.toFixed(2)} m2</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Total area</dt>
              <dd>{result.totalAreaM2.toFixed(1)} m2</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Clear per m2</dt>
              <dd>${result.clearPerM2.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Low iron per m2</dt>
              <dd>${result.lowIronPerM2.toFixed(2)}</dd>
            </div>
            <div className="my-2 border-t border-slate-700" />
            <div className="flex justify-between">
              <dt className="text-slate-400">Clear total</dt>
              <dd>${Math.round(result.clearTotal).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Low iron total</dt>
              <dd>${Math.round(result.lowIronTotal).toLocaleString()}</dd>
            </div>
            <div className="my-2 border-t border-slate-700" />
            <div className="flex justify-between text-amber-300">
              <dt>Premium (USD)</dt>
              <dd>+${Math.round(result.premiumUsd).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between text-amber-300">
              <dt>Premium (percent)</dt>
              <dd>+{result.premiumPct.toFixed(1)}%</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Reference pricing only; FOB Wuhan, 2026 Q3-Q4 benchmarks. Subject to
        spec, coating, order volume and FX. Not a formal quote. For a binding
        offer please request one through our contact form. Data verified:
        2026-11.
      </p>
    </div>
  );
}
