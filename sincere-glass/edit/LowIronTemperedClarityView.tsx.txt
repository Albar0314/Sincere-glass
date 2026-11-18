"use client";

import { useState } from "react";

// Article #31 (W3-#11) interactive #2
// Light transmittance + edge tint, low iron tempered vs standard clear
// tempered, as thickness grows. Renders real DOM at SSR with default
// state (6mm). Dynamic swatch colors are computed, not hardcoded brand
// colors. ASCII-only per project rule.

const THICKNESSES = [4, 6, 8, 10, 12, 15, 19];

// Approximate visible-light transmittance, planning reference.
// Standard clear drops with thickness (iron absorption); low iron stays high.
const DATA: Record<number, { lowIron: number; clear: number }> = {
  4: { lowIron: 91, clear: 89 },
  6: { lowIron: 90, clear: 88 },
  8: { lowIron: 90, clear: 86 },
  10: { lowIron: 89, clear: 84 },
  12: { lowIron: 89, clear: 82 },
  15: { lowIron: 88, clear: 80 },
  19: { lowIron: 88, clear: 77 },
};

// Illustrative edge tint only (not a color spec): clear glass greens with
// thickness; low iron stays near colorless.
function clearEdge(mm: number): string {
  const t = (mm - 4) / (19 - 4); // 0..1
  const r = Math.round(210 - 70 * t);
  const g = Math.round(232 - 40 * t);
  const b = Math.round(216 - 70 * t);
  return `rgb(${r}, ${g}, ${b})`;
}
function lowIronEdge(mm: number): string {
  const t = (mm - 4) / (19 - 4);
  const r = Math.round(238 - 8 * t);
  const g = Math.round(244 - 4 * t);
  const b = Math.round(243 - 6 * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function LowIronTemperedClarityView() {
  const [mm, setMm] = useState<number>(6);
  const d = DATA[mm] ?? DATA[6];
  const gain = d.lowIron - d.clear;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Clarity vs thickness
      </h4>

      <label className="mt-4 block text-sm">
        <span className="font-medium text-slate-700">Thickness: {mm} mm</span>
        <input
          type="range"
          min={0}
          max={THICKNESSES.length - 1}
          step={1}
          value={THICKNESSES.indexOf(mm)}
          onChange={(e) => setMm(THICKNESSES[Number(e.target.value)])}
          className="mt-2 w-full"
        />
      </label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Low iron tempered
          </div>
          <div className="mt-1 text-3xl font-bold text-slate-900">
            {d.lowIron}%
          </div>
          <div className="mt-1 text-xs text-slate-500">visible light transmittance</div>
          <div
            className="mt-3 h-10 w-full rounded-md border border-slate-300"
            style={{ backgroundColor: lowIronEdge(mm) }}
            aria-label="Low iron edge tint, near colorless"
          />
          <div className="mt-1 text-xs text-slate-500">edge tint: near colorless</div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Standard clear tempered
          </div>
          <div className="mt-1 text-3xl font-bold text-slate-900">{d.clear}%</div>
          <div className="mt-1 text-xs text-slate-500">visible light transmittance</div>
          <div
            className="mt-3 h-10 w-full rounded-md border border-slate-300"
            style={{ backgroundColor: clearEdge(mm) }}
            aria-label="Standard clear edge tint, green"
          />
          <div className="mt-1 text-xs text-slate-500">edge tint: green, deepens with thickness</div>
        </div>
      </div>

      <p className="mt-4 rounded-lg bg-sky-50 p-3 text-sm text-slate-700">
        At {mm} mm, low iron transmits about{" "}
        <span className="font-semibold text-slate-900">{gain} points</span> more
        light and shows no green cast. The gap widens as the glass gets thicker,
        which is why low iron matters most on thick railings, floors and fins.
      </p>

      <p className="mt-3 text-xs text-slate-500">
        Transmittance figures are planning reference (Sincere Glass, 6mm basis
        extrapolated). Edge swatches are illustrative, not a color standard.
      </p>
    </div>
  );
}
