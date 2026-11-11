"use client";

import { useState } from "react";

/**
 * GasConductivityComparator
 * Horizontal bar chart comparing thermal conductivity of 4 IGU fill gases.
 * Click a bar to see what U-value a standard 4-12-4 Low-E IGU with that
 * fill delivers, plus a plain-English translation of what the number means.
 *
 * All values are published reference figures at 283 K / 10 C:
 *   Air    0.0241 W/m.K
 *   Argon  0.0163 W/m.K  (~67% of air)
 *   Krypton 0.00874 W/m.K (~36% of air)
 *   Xenon  0.00504 W/m.K (~21% of air)
 *
 * SSR renders a real default (Argon selected) so crawlers see real content.
 */

type GasKey = "air" | "argon" | "krypton" | "xenon";

interface GasRow {
  key: GasKey;
  name: string;
  conductivity: number;    // W/m.K at 283 K
  ratioAir: number;        // fraction vs air
  uValue: number;          // W/m2.K for 4-12-4 Low-E IGU, e=0.04, one coating
  costPerIGU: string;      // relative cost per m2 of IGU
  colorVar: string;        // tailwind bg class
  textColorVar: string;    // tailwind text class
  plain: string;           // one-line plain explanation
}

const GAS_DATA: GasRow[] = [
  {
    key: "air",
    name: "Air (no fill)",
    conductivity: 0.0241,
    ratioAir: 1.0,
    uValue: 1.6,
    costPerIGU: "baseline",
    colorVar: "bg-slate-500",
    textColorVar: "text-slate-300",
    plain: "The default when nobody specifies a gas. Works, but leaves 20-30% of the thermal performance on the table.",
  },
  {
    key: "argon",
    name: "Argon (90% fill)",
    conductivity: 0.0163,
    ratioAir: 0.676,
    uValue: 1.3,
    costPerIGU: "+2 to 4 USD per m2",
    colorVar: "bg-amber-500",
    textColorVar: "text-amber-300",
    plain: "The industry standard. A 90% argon fill delivers almost all the practical benefit of gas filling, at a cost that disappears into rounding.",
  },
  {
    key: "krypton",
    name: "Krypton (90% fill)",
    conductivity: 0.00874,
    ratioAir: 0.363,
    uValue: 1.1,
    costPerIGU: "+35 to 60 USD per m2",
    colorVar: "bg-emerald-500",
    textColorVar: "text-emerald-300",
    plain: "Lower conductivity, but only earns the premium when the cavity must be narrower than 10mm. Otherwise argon matches it for pennies.",
  },
  {
    key: "xenon",
    name: "Xenon (rare)",
    conductivity: 0.00504,
    ratioAir: 0.209,
    uValue: 1.0,
    costPerIGU: "+200 to 400 USD per m2",
    colorVar: "bg-indigo-500",
    textColorVar: "text-indigo-300",
    plain: "Lab-grade performance, Mars-grade price. Used in niche spacecraft and vacuum glazing R and D, not production IGUs.",
  },
];

const AIR_CONDUCTIVITY = 0.0241;
// Bar width scale: anchor Air at 100% of the chart width
const MAX_BAR = 100;

export default function GasConductivityComparator() {
  const [selected, setSelected] = useState<GasKey>("argon");
  const row = GAS_DATA.find((g) => g.key === selected) || GAS_DATA[1];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Thermal conductivity: the raw numbers
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Lower is better. Click a bar to see the U-value that gas delivers in a standard 4-12-4 Low-E IGU.
        </p>
      </div>

      <div className="space-y-3">
        {GAS_DATA.map((g) => {
          const widthPct = (g.conductivity / AIR_CONDUCTIVITY) * MAX_BAR;
          const isActive = g.key === selected;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setSelected(g.key)}
              className={`block w-full rounded-lg border p-3 text-left transition-all ${
                isActive
                  ? "border-amber-500 bg-amber-50"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300"
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-slate-900">{g.name}</span>
                <span className="font-mono text-xs text-slate-600">
                  {g.conductivity.toFixed(4)} W/m.K
                </span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full ${g.colorVar}`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {Math.round(g.ratioAir * 100)}% of air conductivity
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wide ${row.textColorVar}`}>
              {row.name}
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-bold">{row.uValue.toFixed(1)}</span>
              <span className="text-sm text-slate-400">W/m2.K center-of-glass U</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              For a 4mm-12mm-4mm Low-E IGU, one soft coating at e = 0.04
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-slate-400">Factory premium</div>
            <div className="mt-1 text-sm font-semibold text-slate-100">{row.costPerIGU}</div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">{row.plain}</p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Reference conductivity values at 283 K per ISO 15099 and EN 673 Annex A. U-value approximations assume ideal fill rate; real production fill rates run 88-95%, so real U-values track 2-5% higher.
      </p>
    </div>
  );
}
