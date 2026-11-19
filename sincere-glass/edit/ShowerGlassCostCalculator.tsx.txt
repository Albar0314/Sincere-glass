"use client";

import { useState } from "react";

type Thickness = 8 | 10 | 12;
type Hardware = "basic" | "premium";

// Reference per-m2 price for standard clear TEMPERED shower glass, FOB Wuhan,
// 2024 Q1 - 2026 Q3. Low iron adds a premium on the glass only.
const BASE_PER_M2: Record<Thickness, number> = { 8: 46, 10: 58, 12: 74 };
const LOW_IRON_PREMIUM = 0.22; // +22% on the glass line

// Hardware + edgework per shower job (hinges, handle, seals, polished edges).
// A fixed cost that does NOT change between clear and low iron - this is the
// whole point: the premium is a share of the total, not of the glass alone.
const HARDWARE: Record<Hardware, { label: string; cost: number }> = {
  basic: { label: "Standard (hinges, seal, polished edges)", cost: 120 },
  premium: { label: "Premium (heavy hinges, bar handle, coating)", cost: 240 },
};

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function ShowerGlassCostCalculator() {
  const [area, setArea] = useState(3.5); // m2 of glass in the enclosure
  const [thickness, setThickness] = useState<Thickness>(10);
  const [hardware, setHardware] = useState<Hardware>("basic");

  const glassClear = BASE_PER_M2[thickness] * area;
  const glassLowIron = glassClear * (1 + LOW_IRON_PREMIUM);
  const hw = HARDWARE[hardware].cost;

  const totalClear = glassClear + hw;
  const totalLowIron = glassLowIron + hw;
  const premium = totalLowIron - totalClear;
  const premiumShare = (premium / totalLowIron) * 100;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        What low iron adds to a shower job
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Glass area: {area.toFixed(1)} m&sup2;
          </span>
          <input
            type="range"
            min={1.5}
            max={8}
            step={0.5}
            value={area}
            onChange={(e) => setArea(parseFloat(e.target.value))}
            className="mt-2 w-full accent-sky-600"
          />
          <span className="text-xs text-slate-400">
            A single frameless panel is ~1.8-2.5 m&sup2;
          </span>
        </label>

        <div>
          <span className="text-sm font-medium text-slate-700">Thickness</span>
          <div className="mt-2 flex gap-2">
            {([8, 10, 12] as Thickness[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setThickness(t)}
                className={`flex-1 rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                  thickness === t
                    ? "border-sky-500 bg-sky-50 text-sky-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {t} mm
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-slate-700">Hardware</span>
          <div className="mt-2 flex flex-col gap-2">
            {(["basic", "premium"] as Hardware[]).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHardware(h)}
                className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                  hardware === h
                    ? "border-sky-500 bg-sky-50 text-sky-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {HARDWARE[h].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-3 text-slate-600">Standard clear tempered (total)</td>
              <td className="p-3 text-right font-semibold text-slate-800">
                {money(totalClear)}
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3 text-slate-600">Low iron tempered (total)</td>
              <td className="p-3 text-right font-semibold text-slate-800">
                {money(totalLowIron)}
              </td>
            </tr>
            <tr className="bg-sky-50">
              <td className="p-3 font-medium text-sky-900">
                Low iron premium
              </td>
              <td className="p-3 text-right font-bold text-sky-900">
                +{money(premium)} &middot; {premiumShare.toFixed(0)}% of the job
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Reference pricing only (glass FOB Wuhan, 2024 Q1 - 2026 Q3); subject to spec,
        coating, FX. Not a formal quote. Hardware is a fixed cost shared by both options,
        which is why the premium is a modest share of the finished enclosure.
      </p>
    </div>
  );
}
