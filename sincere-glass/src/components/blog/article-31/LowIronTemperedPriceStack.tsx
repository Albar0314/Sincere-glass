"use client";

import { useState } from "react";

// Article #31 (W3-#11) interactive #3
// Cost build-up for low iron tempered glass: base float -> low iron premium
// -> tempering -> optional heat soak -> optional polished edges. Renders real
// DOM at SSR with default state (6mm / 10 m2). All figures planning reference.
// ASCII-only per project rule.

const BASE_FLOAT: Record<number, number> = {
  4: 9,
  6: 12,
  8: 16,
  10: 20,
  12: 26,
  15: 38,
  19: 52,
};
const THICKNESSES = Object.keys(BASE_FLOAT).map(Number);

const LOW_IRON_PREMIUM = 0.22; // +22% over clear float
const TEMPER_ADD = 8; // USD per m2
const HEAT_SOAK_RATE = 0.12; // +12% of (low iron + temper) subtotal
const POLISH_ADD = 7; // USD per m2

function usd(n: number): string {
  return "$" + n.toFixed(2);
}

export default function LowIronTemperedPriceStack() {
  const [mm, setMm] = useState<number>(6);
  const [area, setArea] = useState<number>(10);
  const [heatSoak, setHeatSoak] = useState<boolean>(false);
  const [polish, setPolish] = useState<boolean>(false);

  const base = BASE_FLOAT[mm] ?? BASE_FLOAT[6];
  const lowIron = base * LOW_IRON_PREMIUM;
  const temper = TEMPER_ADD;
  const subtotal = base + lowIron + temper;
  const soak = heatSoak ? subtotal * HEAT_SOAK_RATE : 0;
  const edges = polish ? POLISH_ADD : 0;
  const perM2 = subtotal + soak + edges;
  const safeArea = Number.isFinite(area) && area > 0 ? area : 0;
  const total = perM2 * safeArea;

  const rows: { label: string; value: number }[] = [
    { label: "Base clear float", value: base },
    { label: "Low iron premium (+22%)", value: lowIron },
    { label: "Tempering", value: temper },
    { label: "Heat soak (EN 14179)", value: soak },
    { label: "Polished edges", value: edges },
  ];

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Low iron tempered price stack
      </h4>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Thickness</span>
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800"
            value={mm}
            onChange={(e) => setMm(Number(e.target.value))}
          >
            {THICKNESSES.map((t) => (
              <option key={t} value={t}>
                {t} mm
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Area (m2)</span>
          <input
            type="number"
            min={1}
            step={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={heatSoak}
            onChange={(e) => setHeatSoak(e.target.checked)}
          />
          Heat soak test
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={polish}
            onChange={(e) => setPolish(e.target.checked)}
          />
          Polished edges
        </label>
      </div>

      <table className="mt-5 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-300 text-slate-500">
            <th className="py-2 pr-3 font-medium">Cost component</th>
            <th className="py-2 text-right font-medium">USD / m2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-slate-200">
              <td className="py-2 pr-3 text-slate-700">{r.label}</td>
              <td className="py-2 text-right text-slate-800">{usd(r.value)}</td>
            </tr>
          ))}
          <tr className="border-b-2 border-slate-400">
            <td className="py-2 pr-3 font-semibold text-slate-900">Per m2</td>
            <td className="py-2 text-right font-semibold text-slate-900">
              {usd(perM2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 rounded-xl bg-sky-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-800">
          Estimated line cost
        </div>
        <div className="mt-1 text-3xl font-bold text-slate-900">{usd(total)}</div>
        <div className="mt-1 text-xs text-slate-500">
          {mm} mm, {safeArea} m2 {heatSoak ? "with heat soak" : "no heat soak"}
          {polish ? ", polished edges" : ""}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Planning reference only, ex-works basis, Sincere Glass 2026 figures. Not
        a quote. Freight, packing, hardware and duties are separate. Ask for a
        firm quote with your sizes.
      </p>
    </div>
  );
}
