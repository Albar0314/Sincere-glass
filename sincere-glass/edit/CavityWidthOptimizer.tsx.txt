"use client";

import { useState } from "react";

/**
 * CavityWidthOptimizer
 * Interactive line chart: U-value vs cavity width for Air / Argon / Krypton
 * in a 4-X-4 Low-E IGU. Key insight: Krypton optimum is around 8-10mm,
 * Argon around 14-16mm, Air around 16-18mm. Beyond the optimum,
 * convection currents inside the cavity start adding heat transfer back.
 *
 * SSR default shows Argon at 12mm selected (the industry sweet spot).
 */

type GasKey = "air" | "argon" | "krypton";
type Width = 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20;

const WIDTHS: Width[] = [6, 8, 10, 12, 14, 16, 18, 20];

/**
 * Approximate center-of-glass U-value in W/m2.K for a 4-X-4 Low-E IGU
 * (one soft coating, e = 0.04) based on EN 673 methodology.
 * These are engineering approximations rounded to one decimal.
 */
const U_TABLE: Record<GasKey, Record<Width, number>> = {
  air: {
    6: 2.1, 8: 1.9, 10: 1.8, 12: 1.7, 14: 1.6, 16: 1.6, 18: 1.6, 20: 1.6,
  },
  argon: {
    6: 1.8, 8: 1.5, 10: 1.4, 12: 1.3, 14: 1.2, 16: 1.1, 18: 1.2, 20: 1.2,
  },
  krypton: {
    6: 1.4, 8: 1.1, 10: 1.0, 12: 1.0, 14: 1.1, 16: 1.2, 18: 1.3, 20: 1.3,
  },
};

const GAS_META: Record<GasKey, { name: string; color: string; stroke: string }> = {
  air:     { name: "Air",     color: "#64748B", stroke: "stroke-slate-500" },
  argon:   { name: "Argon",   color: "#DAA745", stroke: "stroke-amber-500" },
  krypton: { name: "Krypton", color: "#10B981", stroke: "stroke-emerald-500" },
};

// Chart geometry
const CHART_W = 520;
const CHART_H = 260;
const PAD_L = 48;
const PAD_R = 24;
const PAD_T = 20;
const PAD_B = 40;
const PLOT_W = CHART_W - PAD_L - PAD_R;
const PLOT_H = CHART_H - PAD_T - PAD_B;
const U_MIN = 0.8;
const U_MAX = 2.2;

function xForWidth(w: Width): number {
  const idx = WIDTHS.indexOf(w);
  return PAD_L + (idx / (WIDTHS.length - 1)) * PLOT_W;
}
function yForU(u: number): number {
  const frac = (u - U_MIN) / (U_MAX - U_MIN);
  return PAD_T + (1 - frac) * PLOT_H;
}
function pathFor(gas: GasKey): string {
  return WIDTHS.map((w, i) => {
    const x = xForWidth(w);
    const y = yForU(U_TABLE[gas][w]);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

export default function CavityWidthOptimizer() {
  const [gas, setGas] = useState<GasKey>("argon");
  const [width, setWidth] = useState<Width>(12);

  const u = U_TABLE[gas][width];
  const data = U_TABLE[gas];
  const optimalU = Math.min(...WIDTHS.map((w) => data[w]));
  const optimalWidth = WIDTHS.find((w) => data[w] === optimalU) as Width;
  const selectedGas = GAS_META[gas];

  const verdict = (() => {
    if (width === optimalWidth) {
      return { tone: "optimal", text: `${selectedGas.name} at ${width}mm is the thermal optimum for this fill.` };
    }
    if (u <= optimalU + 0.1) {
      return { tone: "near", text: `Within 0.1 W/m2.K of the optimum. Acceptable, especially if overall IGU thickness is constrained.` };
    }
    if (width < optimalWidth) {
      return { tone: "narrow", text: `Cavity is too narrow for ${selectedGas.name}. Conduction through the gas is the bottleneck; widen to ${optimalWidth}mm or switch to a denser gas.` };
    }
    return { tone: "wide", text: `Cavity is wide enough that convection currents start forming, pushing U up. Narrow to ${optimalWidth}mm or accept the penalty.` };
  })();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Cavity width changes the answer
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Every gas has a sweet spot. Below it, conduction dominates. Above it, convection dominates. Krypton peaks narrow, argon medium, air wide.
        </p>
      </div>

      {/* Gas selector */}
      <div className="mb-3 flex gap-2" role="group" aria-label="Fill gas">
        {(Object.keys(GAS_META) as GasKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setGas(k)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              gas === k
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            aria-pressed={gas === k}
          >
            {GAS_META[k].name}
          </button>
        ))}
      </div>

      {/* SVG chart */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="h-auto w-full max-w-2xl"
          role="img"
          aria-label={`Chart of center-of-glass U-value versus cavity width for Air, Argon and Krypton. ${selectedGas.name} is highlighted at ${width}mm, U equals ${u}.`}
        >
          {/* Grid */}
          {[0.8, 1.2, 1.6, 2.0].map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_L}
                x2={CHART_W - PAD_R}
                y1={yForU(tick)}
                y2={yForU(tick)}
                stroke="#E2E8F0"
                strokeWidth={1}
              />
              <text
                x={PAD_L - 6}
                y={yForU(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-slate-500 text-[10px]"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}
          {/* X-axis ticks */}
          {WIDTHS.map((w) => (
            <g key={w}>
              <text
                x={xForWidth(w)}
                y={CHART_H - PAD_B + 16}
                textAnchor="middle"
                className="fill-slate-500 text-[10px]"
              >
                {w}
              </text>
            </g>
          ))}
          {/* Axis labels */}
          <text
            x={PAD_L / 2}
            y={PAD_T + PLOT_H / 2}
            textAnchor="middle"
            transform={`rotate(-90, ${PAD_L / 2 - 8}, ${PAD_T + PLOT_H / 2})`}
            className="fill-slate-600 text-[11px] font-medium"
          >
            U (W/m2.K)
          </text>
          <text
            x={PAD_L + PLOT_W / 2}
            y={CHART_H - 6}
            textAnchor="middle"
            className="fill-slate-600 text-[11px] font-medium"
          >
            Cavity width (mm)
          </text>

          {/* Lines */}
          {(Object.keys(GAS_META) as GasKey[]).map((k) => (
            <path
              key={k}
              d={pathFor(k)}
              fill="none"
              stroke={GAS_META[k].color}
              strokeWidth={gas === k ? 3 : 1.5}
              opacity={gas === k ? 1 : 0.35}
            />
          ))}

          {/* Points for the selected gas */}
          {WIDTHS.map((w) => (
            <circle
              key={w}
              cx={xForWidth(w)}
              cy={yForU(U_TABLE[gas][w])}
              r={w === width ? 6 : 3}
              fill={selectedGas.color}
              stroke={w === width ? "#0F172A" : "none"}
              strokeWidth={2}
              style={{ cursor: "pointer" }}
              onClick={() => setWidth(w)}
            />
          ))}
        </svg>
      </div>

      {/* Width selector */}
      <div className="mt-4">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Cavity width: {width}mm
        </label>
        <input
          type="range"
          min={0}
          max={WIDTHS.length - 1}
          step={1}
          value={WIDTHS.indexOf(width)}
          onChange={(e) => setWidth(WIDTHS[Number(e.target.value)])}
          className="mt-2 w-full accent-amber-500"
          aria-label="Cavity width"
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
          {WIDTHS.map((w) => <span key={w}>{w}</span>)}
        </div>
      </div>

      {/* Verdict */}
      <div className="mt-5 rounded-xl bg-slate-900 p-5 text-slate-100">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">{u.toFixed(1)}</span>
          <span className="text-sm text-slate-400">W/m2.K at {width}mm {selectedGas.name}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">{verdict.text}</p>
        <p className="mt-2 text-xs text-slate-400">
          Optimum for {selectedGas.name}: {optimalWidth}mm giving {optimalU.toFixed(1)} W/m2.K.
        </p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Values are engineering approximations for a 4-X-4 Low-E IGU with one soft coating at e = 0.04, calculated per EN 673 Annex A. Whole-window U-value with frame will be 0.2-0.4 higher.
      </p>
    </div>
  );
}
