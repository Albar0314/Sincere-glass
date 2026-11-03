"use client";

import { useState } from "react";

type Construction = "single" | "laminated" | "igu";

interface MetricRow {
  label: string;
  unit: string;
  clear: number;
  lowIron: number;
  betterIs: "higher" | "lower";
  notes: string;
}

const DATA: Record<Construction, { title: string; description: string; rows: MetricRow[] }> = {
  single: {
    title: "6 mm single pane",
    description: "Baseline comparison, no interlayer and no second lite.",
    rows: [
      { label: "Visible light transmittance", unit: "VLT %", clear: 89, lowIron: 91, betterIs: "higher", notes: "Low iron gives roughly 2 percentage points more light at 6 mm." },
      { label: "Color rendering index", unit: "CRI 0-100", clear: 97, lowIron: 99, betterIs: "higher", notes: "Low iron hits near-perfect color fidelity; critical for displays and art." },
      { label: "Solar heat gain coefficient", unit: "SHGC 0-1", clear: 0.82, lowIron: 0.87, betterIs: "lower", notes: "Low iron lets slightly more solar heat through; a trade-off for warm climates without Low-E." },
    ],
  },
  laminated: {
    title: "6-1.52-6 PVB laminated",
    description: "Two lites bonded by 1.52 mm PVB interlayer. Thickness doubles so the green bias of clear glass is more visible.",
    rows: [
      { label: "Visible light transmittance", unit: "VLT %", clear: 85, lowIron: 90, betterIs: "higher", notes: "Low iron closes most of the lami penalty; clear loses more because the light path is longer." },
      { label: "Color rendering index", unit: "CRI 0-100", clear: 95, lowIron: 98, betterIs: "higher", notes: "PVB itself is near-neutral; the shift is driven by iron content." },
      { label: "Solar heat gain coefficient", unit: "SHGC 0-1", clear: 0.76, lowIron: 0.82, betterIs: "lower", notes: "Low iron advantage grows in lami because clear absorbs more solar heat as thickness increases." },
    ],
  },
  igu: {
    title: "6 / 12A / 6 IGU with soft-coat Low-E on surface 2",
    description: "Insulated glass with argon fill and soft-coat Low-E. The Low-E coating dominates the optical story but low iron still shifts VLT and CRI.",
    rows: [
      { label: "Visible light transmittance", unit: "VLT %", clear: 70, lowIron: 74, betterIs: "higher", notes: "Low-E drops both numbers; low iron recovers roughly 4 points." },
      { label: "Color rendering index", unit: "CRI 0-100", clear: 93, lowIron: 97, betterIs: "higher", notes: "Noticeable in storefronts where interior lighting is color-critical." },
      { label: "Solar heat gain coefficient", unit: "SHGC 0-1", clear: 0.35, lowIron: 0.38, betterIs: "lower", notes: "Low-E is doing the heavy lifting on SHGC; iron content barely moves the needle in an IGU." },
    ],
  },
};

export default function LightTransmittanceComparator() {
  const [construction, setConstruction] = useState<Construction>("single");
  const current = DATA[construction];

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Light Transmittance Comparator
        </h3>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          Interactive
        </span>
      </div>

      <p className="mb-5 text-sm text-slate-600">
        Switch between a single pane, a PVB laminated build-up, and an IGU with
        Low-E. The low iron advantage shrinks when a Low-E coating is in the
        stack, because the coating dominates the optical story. The advantage
        grows in laminated glass because the longer light path magnifies the
        iron absorption.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(DATA) as Construction[]).map((c) => {
          const active = construction === c;
          return (
            <button
              key={c}
              onClick={() => setConstruction(c)}
              className={
                "rounded-lg border px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "border-amber-500 bg-amber-50 text-amber-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300")
              }
            >
              {DATA[c].title}
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-sm italic text-slate-500">{current.description}</p>

      <div className="space-y-5">
        {current.rows.map((row) => {
          const max = Math.max(row.clear, row.lowIron, row.betterIs === "higher" ? 100 : 1);
          const clearPct = (row.clear / max) * 100;
          const lowIronPct = (row.lowIron / max) * 100;
          const delta = row.lowIron - row.clear;
          const better = row.betterIs === "higher" ? delta > 0 : delta < 0;
          return (
            <div key={row.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-800">{row.label}</div>
                  <div className="text-xs text-slate-500">{row.unit}</div>
                </div>
                <div className={"text-sm font-semibold " + (better ? "text-emerald-600" : "text-rose-600")}>
                  {delta > 0 ? "+" : ""}
                  {delta.toFixed(2)}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="mb-1 flex justify-between text-xs text-slate-600">
                    <span>Clear</span>
                    <span>{row.clear}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-200">
                    <div className="h-3 rounded-full bg-slate-500" style={{ width: clearPct + "%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-slate-600">
                    <span>Low Iron</span>
                    <span>{row.lowIron}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-200">
                    <div className="h-3 rounded-full bg-amber-500" style={{ width: lowIronPct + "%" }} />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-600">{row.notes}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Reference values from factory QC datasheets. Actual numbers vary with
        coating supplier, batch, and measurement standard (EN 410 vs NFRC 300).
        Data verified: 2026-11.
      </p>
    </div>
  );
}
