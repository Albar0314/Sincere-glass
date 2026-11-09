"use client";

import { useState } from "react";

type Metric = "uFactor" | "weight" | "cost" | "vt" | "thickness";

const CONFIGS = {
  double: {
    label: "Double Pane (3G)",
    buildUp: "4 - 12Ar - 4 (clear + Low-E)",
    lites: 2,
    uFactor: 1.6,
    uFactorIP: 0.28,
    weight: 20,
    cost: 100,
    vt: 0.78,
    shgc: 0.37,
    thickness: 20,
    stc: 32,
    note: "Reference baseline. Low-E softcoat on surface 3, argon fill 90%.",
  },
  triple: {
    label: "Triple Pane",
    buildUp: "4 - 12Ar - 4 - 12Ar - 4 (clear + 2x Low-E)",
    lites: 3,
    uFactor: 0.8,
    uFactorIP: 0.14,
    weight: 30,
    cost: 165,
    vt: 0.70,
    shgc: 0.33,
    thickness: 36,
    stc: 35,
    note: "Two Low-E coatings (surfaces 2 and 5), double argon cavity. Center-of-glass U; whole-window will be higher.",
  },
} as const;

const METRIC_META: Record<Metric, { label: string; unit: string; lowerIsBetter: boolean }> = {
  uFactor: { label: "U-factor (center of glass)", unit: "W/m2K", lowerIsBetter: true },
  weight: { label: "Weight", unit: "kg/m2", lowerIsBetter: true },
  cost: { label: "Relative cost index", unit: "", lowerIsBetter: true },
  vt: { label: "Visible transmittance (VT)", unit: "", lowerIsBetter: false },
  thickness: { label: "Overall thickness", unit: "mm", lowerIsBetter: false },
};

function PaneCross({ lites }: { lites: 2 | 3 }) {
  const isThree = lites === 3;
  const width = 200;
  const height = 140;
  const padding = 20;
  const liteW = 10;
  const cavityW = isThree ? 30 : 50;
  const totalW = lites * liteW + (lites - 1) * cavityW;
  const startX = (width - totalW) / 2;

  const lite = (i: number) => {
    const x = startX + i * (liteW + cavityW);
    return (
      <rect key={`l${i}`} x={x} y={padding} width={liteW} height={height - padding * 2}
        fill="#bfd9e3" stroke="#6b8794" strokeWidth={1} opacity={0.85} />
    );
  };
  const cavity = (i: number) => {
    const x = startX + liteW + i * (liteW + cavityW);
    return (
      <rect key={`c${i}`} x={x} y={padding} width={cavityW} height={height - padding * 2}
        fill="#f1f5f9" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={0.5} />
    );
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xs mx-auto" aria-hidden="true">
      {Array.from({ length: lites }, (_, i) => lite(i))}
      {Array.from({ length: lites - 1 }, (_, i) => cavity(i))}
      <text x={width / 2} y={height - 4} textAnchor="middle" fontSize="9" fill="#475569">
        {isThree ? "4-12Ar-4-12Ar-4" : "4-12Ar-4"}
      </text>
    </svg>
  );
}

export default function PaneConfigurationComparator() {
  const [metric, setMetric] = useState<Metric>("uFactor");
  const meta = METRIC_META[metric];
  const doubleVal = CONFIGS.double[metric];
  const tripleVal = CONFIGS.triple[metric];
  const better =
    meta.lowerIsBetter
      ? (tripleVal < doubleVal ? "triple" : "double")
      : (tripleVal > doubleVal ? "triple" : "double");
  const delta = ((tripleVal - doubleVal) / doubleVal) * 100;

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-semibold text-slate-900">Double vs Triple Pane: Build-up Comparator</h3>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as Metric)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-amber-500 focus:outline-none"
          aria-label="Choose metric to compare"
        >
          <option value="uFactor">U-factor (thermal)</option>
          <option value="weight">Weight (kg/m2)</option>
          <option value="cost">Relative cost</option>
          <option value="vt">Visible transmittance</option>
          <option value="thickness">Overall thickness</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(["double", "triple"] as const).map((key) => {
          const c = CONFIGS[key];
          const val = c[metric];
          const isWinner = (key === "triple" && better === "triple") || (key === "double" && better === "double");
          return (
            <div
              key={key}
              className={`rounded-xl border p-5 ${isWinner ? "border-amber-400 bg-amber-50/40" : "border-slate-200 bg-slate-50/40"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-slate-900">{c.label}</div>
                {isWinner && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                    Better on this metric
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mb-3 font-mono">{c.buildUp}</div>
              <PaneCross lites={c.lites as 2 | 3} />
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold text-slate-900">
                  {typeof val === "number" ? val.toFixed(metric === "uFactor" ? 2 : metric === "vt" ? 2 : 0) : val}
                  {meta.unit && <span className="ml-1 text-sm font-normal text-slate-500">{meta.unit}</span>}
                </div>
                <div className="text-xs text-slate-500 mt-1">{meta.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <strong>Delta:</strong> Triple pane is{" "}
        <span className="font-semibold text-amber-700">
          {delta > 0 ? "+" : ""}{delta.toFixed(0)}%
        </span>{" "}
        vs double pane on {meta.label.toLowerCase()}.{" "}
        {metric === "uFactor" && "50% lower U-factor means roughly half the conductive heat loss through the center of the glazing."}
        {metric === "weight" && "50% more kg/m2 drives frame, hardware, and shipping cost — a hidden line item."}
        {metric === "cost" && "+65% factory-gate cost is typical for same-size triple-pane IGU with 2x Low-E vs double-pane with 1x Low-E."}
        {metric === "vt" && "Each extra lite + coating cuts visible light transmittance by 8-10% — noticeable in north-facing rooms."}
        {metric === "thickness" && "36mm overall vs 20mm requires a deeper frame pocket; retrofits into existing double-pane frames rarely work."}
      </div>

      <div className="mt-3 text-xs text-slate-500 italic">
        Reference values for a 4-12Ar-4 Low-E double vs 4-12Ar-4-12Ar-4 double-Low-E triple. Center-of-glass U; whole-window U will be higher.
        Data verified against EN 673 calculations, Sincere Glass production specs, 2024 Q1 - 2026 Q3.
      </div>
    </div>
  );
}
