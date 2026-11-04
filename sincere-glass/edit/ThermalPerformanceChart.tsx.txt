"use client";

import { useMemo, useState } from "react";

type MetricKey = "u" | "shgc" | "vlt" | "stc";

interface Row {
  id: string;
  label: string;
  buildup: string;
  u: number;
  shgc: number;
  vlt: number;
  stc: number;
}

const ROWS: Row[] = [
  { id: "single", label: "Single pane", buildup: "6 mm clear monolithic", u: 5.7, shgc: 0.82, vlt: 89, stc: 31 },
  { id: "double-air", label: "Double IGU, air", buildup: "6-12A-6 clear", u: 2.7, shgc: 0.76, vlt: 79, stc: 32 },
  { id: "double-argon-lowe", label: "Double IGU, argon + Low-E", buildup: "6-16Ar-6 with soft-coat Low-E on surface 2", u: 1.3, shgc: 0.42, vlt: 70, stc: 33 },
  { id: "triple-air", label: "Triple IGU, air", buildup: "4-12A-4-12A-4 clear", u: 1.9, shgc: 0.72, vlt: 72, stc: 34 },
  { id: "triple-argon-lowe", label: "Triple IGU, argon + dual Low-E", buildup: "4-14Ar-4-14Ar-4 with Low-E on surfaces 2 and 5", u: 0.8, shgc: 0.37, vlt: 61, stc: 36 },
  { id: "triple-krypton-lowe", label: "Triple IGU, krypton + dual Low-E", buildup: "4-9Kr-4-9Kr-4 with Low-E on surfaces 2 and 5", u: 0.6, shgc: 0.35, vlt: 60, stc: 36 },
];

const METRIC_INFO: Record<MetricKey, { label: string; unit: string; lowerIsBetter: boolean; max: number; note: string }> = {
  u: { label: "U-value", unit: "W/m2K", lowerIsBetter: true, max: 6.0, note: "Heat loss. Lower is better. EN 673 / NFRC 100." },
  shgc: { label: "SHGC", unit: "0-1", lowerIsBetter: false, max: 1.0, note: "Solar heat gain. High for cold climates, low for hot climates." },
  vlt: { label: "VLT", unit: "%", lowerIsBetter: false, max: 100, note: "Visible light transmittance. Higher means brighter interior." },
  stc: { label: "STC", unit: "class", lowerIsBetter: false, max: 40, note: "Sound Transmission Class. Higher means quieter." },
};

export default function ThermalPerformanceChart() {
  const [metric, setMetric] = useState<MetricKey>("u");
  const info = METRIC_INFO[metric];

  const sorted = useMemo(() => {
    const rows = [...ROWS];
    if (info.lowerIsBetter) rows.sort((a, b) => a[metric] - b[metric]);
    else rows.sort((a, b) => b[metric] - a[metric]);
    return rows;
  }, [metric, info.lowerIsBetter]);

  return (
    <div className="my-10 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Interactive</div>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">Thermal and Acoustic Performance by Build-Up</h3>
        <p className="mt-1 text-sm text-slate-600">
          Six representative IGU and monolithic build-ups, four performance metrics. Switch between U-value, SHGC, VLT and STC to see how construction choices shift the trade-offs. Values reference factory QC datasheets for standard soda-lime constructions.
        </p>
      </div>

      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(METRIC_INFO) as MetricKey[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={`px-3 py-1.5 text-sm rounded-md border ${metric === m ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"}`}
            >
              {METRIC_INFO[m].label}
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-slate-500">{info.note}</div>
      </div>

      <div className="px-6 py-5 space-y-3">
        {sorted.map((row, idx) => {
          const val = row[metric];
          const pct = Math.min(100, (val / info.max) * 100);
          const barColor = idx === 0 ? "bg-emerald-500" : idx === sorted.length - 1 ? "bg-rose-400" : "bg-slate-400";
          return (
            <div key={row.id} className="grid grid-cols-12 items-center gap-3">
              <div className="col-span-12 md:col-span-4">
                <div className="text-sm font-medium text-slate-900">{row.label}</div>
                <div className="text-xs text-slate-500">{row.buildup}</div>
              </div>
              <div className="col-span-9 md:col-span-6">
                <div className="h-6 w-full rounded bg-slate-100 overflow-hidden">
                  <div className={`h-full ${barColor} transition-all duration-300`} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <span className="text-sm font-semibold text-slate-900">
                  {typeof val === "number" ? val.toFixed(metric === "shgc" ? 2 : metric === "u" ? 1 : 0) : val}
                </span>
                <span className="ml-1 text-xs text-slate-500">{info.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500">
        Reference values from factory QC datasheets. Actual performance varies with coating supplier, batch, spacer type, and measurement standard. Data verified: 2026-11.
      </div>
    </div>
  );
}
