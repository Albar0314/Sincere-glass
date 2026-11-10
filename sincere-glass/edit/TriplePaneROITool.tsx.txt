// src/components/tools/TriplePaneROITool.tsx
// Dark-theme standalone port of TriplePaneROICalculator for /tools/ pages.
// Adds hash state and QuoteModal pre-fill. Calculation logic identical to the
// article #27 embedded version.

"use client";

import { useMemo } from "react";
import { useHashState } from "@/lib/useHashState";
import { useQuote } from "@/lib/QuoteContext";

type ClimateZone = "1-2" | "3" | "4" | "5" | "6" | "7-8";
type FuelType = "gas" | "electric" | "heatpump";

type State = {
  zone: ClimateZone;
  area: number;
  fuel: FuelType;
  rate: number;
  doubleU: number;
  tripleU: number;
  upgradeCost: number;
};

const DEFAULT_STATE: State = {
  zone: "5",
  area: 20,
  fuel: "gas",
  rate: 1.2,
  doubleU: 1.6,
  tripleU: 0.8,
  upgradeCost: 180,
};

const ZONE_META: Record<ClimateZone, { label: string; hdd: number; cdd: number; description: string }> = {
  "1-2": { label: "Zone 1-2 (hot)", hdd: 500, cdd: 3500, description: "Miami, Phoenix, Dubai, Singapore" },
  "3":   { label: "Zone 3 (warm)",  hdd: 1800, cdd: 2200, description: "Los Angeles, Atlanta, Sydney" },
  "4":   { label: "Zone 4 (mixed)", hdd: 3200, cdd: 1500, description: "Washington DC, Tokyo, Madrid" },
  "5":   { label: "Zone 5 (cool)",  hdd: 5200, cdd: 900,  description: "Chicago, Boston, Berlin" },
  "6":   { label: "Zone 6 (cold)",  hdd: 7000, cdd: 600,  description: "Minneapolis, Moscow, Stockholm" },
  "7-8": { label: "Zone 7-8 (very cold)", hdd: 9000, cdd: 300, description: "Winnipeg, Helsinki, Yakutsk" },
};

const FUEL_META: Record<FuelType, { label: string; defaultRate: number; unit: string; efficiency: number }> = {
  gas:      { label: "Natural gas", defaultRate: 1.2, unit: "USD/therm", efficiency: 0.9 },
  electric: { label: "Electric resistance", defaultRate: 0.17, unit: "USD/kWh", efficiency: 1.0 },
  heatpump: { label: "Heat pump (COP 3)",  defaultRate: 0.17, unit: "USD/kWh", efficiency: 3.0 },
};

const KWH_PER_M2_PER_HDD = 0.024;

const ZONE_VALUES = new Set<ClimateZone>(["1-2", "3", "4", "5", "6", "7-8"]);
const FUEL_VALUES = new Set<FuelType>(["gas", "electric", "heatpump"]);

function parseState(raw: Record<string, string>, fallback: State): State {
  const zone = ZONE_VALUES.has(raw.zone as ClimateZone) ? (raw.zone as ClimateZone) : fallback.zone;
  const fuel = FUEL_VALUES.has(raw.fuel as FuelType) ? (raw.fuel as FuelType) : fallback.fuel;
  const num = (v: string | undefined, min: number, fb: number) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= min ? n : fb;
  };
  return {
    zone,
    fuel,
    area: num(raw.area, 1, fallback.area),
    rate: num(raw.rate, 0, fallback.rate),
    doubleU: num(raw.doubleU, 0.3, fallback.doubleU),
    tripleU: num(raw.tripleU, 0.3, fallback.tripleU),
    upgradeCost: num(raw.cost, 0, fallback.upgradeCost),
  };
}

export default function TriplePaneROITool() {
  const [state, setState] = useHashState<State>(DEFAULT_STATE, parseState);
  const { openQuote } = useQuote();

  const result = useMemo(() => {
    const deltaU = state.doubleU - state.tripleU;
    const hdd = ZONE_META[state.zone].hdd;
    const cdd = ZONE_META[state.zone].cdd;
    const totalDD = hdd + cdd * 0.4;

    const kwhSaved = KWH_PER_M2_PER_HDD * deltaU * totalDD * state.area;

    let annualSavings = 0;
    if (state.fuel === "gas") {
      const thermsSaved = kwhSaved / 29.3;
      annualSavings = (thermsSaved * state.rate) / FUEL_META.gas.efficiency;
    } else {
      annualSavings = (kwhSaved * state.rate) / FUEL_META[state.fuel].efficiency;
    }

    const upgradeCostTotal = state.upgradeCost * state.area;
    const paybackYears = annualSavings > 0 ? upgradeCostTotal / annualSavings : Infinity;
    const lifetimeSavings25yr = annualSavings * 25 - upgradeCostTotal;

    let verdict: { label: string; tone: "good" | "marginal" | "bad"; reason: string };
    if (paybackYears < 10) {
      verdict = { label: "Worth it", tone: "good", reason: "Payback under 10 years; triple pane pays for itself well within window lifetime." };
    } else if (paybackYears < 20) {
      verdict = { label: "Marginal", tone: "marginal", reason: "Payback 10-20 years. Consider for comfort and condensation reasons, not just ROI." };
    } else {
      verdict = { label: "Not worth it on energy alone", tone: "bad", reason: "Payback exceeds 20 years. Spend the premium on better frames, shading, or insulation instead." };
    }

    return { kwhSaved, annualSavings, upgradeCostTotal, paybackYears, lifetimeSavings25yr, verdict };
  }, [state]);

  const toneClass =
    result.verdict.tone === "good"
      ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
      : result.verdict.tone === "marginal"
      ? "border-amber-400/60 bg-amber-500/10 text-amber-200"
      : "border-rose-400/60 bg-rose-500/10 text-rose-200";

  function handleQuote() {
    const msg =
      "Quote request for insulated glass units, generated from the Triple Pane ROI Calculator.\n\n" +
      "Climate zone: " + ZONE_META[state.zone].label + " (" + ZONE_META[state.zone].description + ")\n" +
      "Total window area: " + state.area + " m2\n" +
      "Heating fuel: " + FUEL_META[state.fuel].label + " at " + state.rate + " " + FUEL_META[state.fuel].unit + "\n" +
      "Target U-factors: double " + state.doubleU + " -> triple " + state.tripleU + " W/m2K\n" +
      "Assumed upgrade premium: USD " + state.upgradeCost + " / m2\n\n" +
      "Verdict: " + result.verdict.label + "\n" +
      "Payback: " + (Number.isFinite(result.paybackYears) ? result.paybackYears.toFixed(1) + " years" : "N/A") + "\n" +
      "Annual savings: USD " + result.annualSavings.toFixed(0) + "\n" +
      "25-year net: USD " + result.lifetimeSavings25yr.toFixed(0) + "\n\n" +
      "Please advise on triple-pane IGU spec options and price.";
    openQuote("Insulated Glass", msg);
  }

  return (
    <div className="rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#F2F0ED] m-0 mb-1">
          Triple pane ROI calculator
        </h2>
        <p className="text-sm text-[#8B95A5] m-0">
          Estimate payback period and lifetime savings for upgrading from double to triple pane, by climate zone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">Climate zone (IECC)</span>
          <select
            value={state.zone}
            onChange={(e) => setState({ zone: e.target.value as ClimateZone })}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          >
            {Object.entries(ZONE_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label} - {v.description}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">Total window area (m2)</span>
          <input
            type="number"
            min={1}
            max={500}
            value={state.area}
            onChange={(e) => setState({ area: Math.max(1, Number(e.target.value) || 0) })}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">Heating fuel</span>
          <select
            value={state.fuel}
            onChange={(e) => {
              const v = e.target.value as FuelType;
              setState({ fuel: v, rate: FUEL_META[v].defaultRate });
            }}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          >
            {Object.entries(FUEL_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
            Fuel rate ({FUEL_META[state.fuel].unit})
          </span>
          <input
            type="number"
            step={0.01}
            min={0}
            value={state.rate}
            onChange={(e) => setState({ rate: Math.max(0, Number(e.target.value) || 0) })}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">Double pane U (W/m2K)</span>
          <input
            type="number"
            step={0.1}
            min={0.5}
            max={3.0}
            value={state.doubleU}
            onChange={(e) => setState({ doubleU: Math.max(0.5, Number(e.target.value) || 0) })}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">Triple pane U (W/m2K)</span>
          <input
            type="number"
            step={0.1}
            min={0.3}
            max={2.0}
            value={state.tripleU}
            onChange={(e) => setState({ tripleU: Math.max(0.3, Number(e.target.value) || 0) })}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
            Upgrade premium (USD per m2, triple over double)
          </span>
          <input
            type="number"
            step={10}
            min={0}
            value={state.upgradeCost}
            onChange={(e) => setState({ upgradeCost: Math.max(0, Number(e.target.value) || 0) })}
            className="rounded-lg border border-[#3A4250] bg-[#1C1F26] px-3 py-2 text-sm text-[#F2F0ED] focus:border-[#DAA745] outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 p-3 text-center">
          <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider">Annual energy saved</div>
          <div className="text-xl font-bold text-[#F2F0ED] tabular-nums">
            {result.kwhSaved.toFixed(0)}<span className="ml-1 text-xs font-normal text-[#8B95A5]">kWh</span>
          </div>
        </div>
        <div className="rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 p-3 text-center">
          <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider">Annual USD saved</div>
          <div className="text-xl font-bold text-[#DAA745] tabular-nums">${result.annualSavings.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 p-3 text-center">
          <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider">Upgrade cost</div>
          <div className="text-xl font-bold text-[#F2F0ED] tabular-nums">${result.upgradeCostTotal.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 p-3 text-center">
          <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider">Payback</div>
          <div className="text-xl font-bold text-[#DAA745] tabular-nums">
            {isFinite(result.paybackYears) ? result.paybackYears.toFixed(1) + "yr" : "N/A"}
          </div>
        </div>
      </div>

      <div className={"rounded-xl border-2 p-4 " + toneClass}>
        <div className="font-semibold mb-1">Verdict: {result.verdict.label}</div>
        <div className="text-sm opacity-90">{result.verdict.reason}</div>
        <div className="mt-2 text-sm opacity-90">
          25-year net savings (after upgrade cost):{" "}
          <strong>${result.lifetimeSavings25yr.toFixed(0)}</strong>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleQuote}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#DAA745] text-[#1C1F26] text-sm font-bold rounded-lg hover:bg-[#c4963e] transition-colors"
        >
          Get quote for this spec
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-[11px] text-[#8B95A5]/70 italic leading-relaxed">
        Simplified single-zone model using HDD, CDD and center-of-glass delta-U. Real savings depend on frame U, air infiltration, orientation, shading and whole-building envelope. Reference pricing only; subject to spec, coating and FX. Not a formal quote.
      </p>
    </div>
  );
}
