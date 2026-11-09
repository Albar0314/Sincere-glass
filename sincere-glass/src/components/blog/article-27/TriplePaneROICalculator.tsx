"use client";

import { useMemo, useState } from "react";

type ClimateZone = "1-2" | "3" | "4" | "5" | "6" | "7-8";
type FuelType = "gas" | "electric" | "heatpump";

const ZONE_META: Record<ClimateZone, { label: string; hdd: number; cdd: number; description: string }> = {
  "1-2": { label: "Zone 1-2 (hot)", hdd: 500, cdd: 3500, description: "Miami, Phoenix, Dubai, Singapore" },
  "3":   { label: "Zone 3 (warm)",  hdd: 1800, cdd: 2200, description: "Los Angeles, Atlanta, Sydney" },
  "4":   { label: "Zone 4 (mixed)", hdd: 3200, cdd: 1500, description: "Washington DC, Tokyo, Madrid" },
  "5":   { label: "Zone 5 (cool)",  hdd: 5200, cdd: 900,  description: "Chicago, Boston, Berlin" },
  "6":   { label: "Zone 6 (cold)",  hdd: 7000, cdd: 600,  description: "Minneapolis, Moscow, Stockholm" },
  "7-8": { label: "Zone 7-8 (very cold)", hdd: 9000, cdd: 300, description: "Winnipeg, Helsinki, Yakutsk" },
};

const FUEL_META: Record<FuelType, { label: string; defaultRate: number; unit: string; efficiency: number }> = {
  gas:      { label: "Natural gas", defaultRate: 1.20, unit: "USD/therm", efficiency: 0.90 },
  electric: { label: "Electric resistance", defaultRate: 0.17, unit: "USD/kWh", efficiency: 1.00 },
  heatpump: { label: "Heat pump (COP 3)",  defaultRate: 0.17, unit: "USD/kWh", efficiency: 3.00 },
};

// Simplified heat loss model: annual kWh saved per m2 per unit U-factor delta per HDD
// Based on 24h * DeltaU * HDD / 1000, with conservative assumption of 60% window heat loss contribution
const KWH_PER_M2_PER_HDD = 0.024;

export default function TriplePaneROICalculator() {
  const [zone, setZone] = useState<ClimateZone>("5");
  const [area, setArea] = useState<number>(20);       // m2 of window
  const [fuel, setFuel] = useState<FuelType>("gas");
  const [rate, setRate] = useState<number>(FUEL_META.gas.defaultRate);
  const [doubleU, setDoubleU] = useState<number>(1.6);
  const [tripleU, setTripleU] = useState<number>(0.8);
  const [upgradeCost, setUpgradeCost] = useState<number>(180); // USD per m2 upgrade premium

  const result = useMemo(() => {
    const deltaU = doubleU - tripleU;
    const hdd = ZONE_META[zone].hdd;
    const cdd = ZONE_META[zone].cdd;
    const totalDD = hdd + cdd * 0.4;  // cooling benefit weighted at 40%

    // kWh saved per year
    const kwhSaved = KWH_PER_M2_PER_HDD * deltaU * totalDD * area;

    // Convert to cost saved based on fuel
    let annualSavings = 0;
    if (fuel === "gas") {
      const thermsSaved = kwhSaved / 29.3;
      annualSavings = thermsSaved * rate / FUEL_META.gas.efficiency;
    } else {
      annualSavings = kwhSaved * rate / FUEL_META[fuel].efficiency;
    }

    const upgradeCostTotal = upgradeCost * area;
    const paybackYears = annualSavings > 0 ? upgradeCostTotal / annualSavings : Infinity;
    const lifetimeSavings25yr = annualSavings * 25 - upgradeCostTotal;

    let verdict: { label: string; tone: "good" | "marginal" | "bad"; reason: string };
    if (paybackYears < 10) {
      verdict = { label: "Worth it", tone: "good", reason: "Payback under 10 years; triple pane pays for itself well within window lifetime." };
    } else if (paybackYears < 20) {
      verdict = { label: "Marginal", tone: "marginal", reason: "Payback 10-20 years. Consider for comfort/condensation reasons, not just ROI." };
    } else {
      verdict = { label: "Not worth it on energy alone", tone: "bad", reason: "Payback exceeds 20 years. Spend the premium on better frames, shading, or insulation instead." };
    }

    return {
      kwhSaved,
      annualSavings,
      upgradeCostTotal,
      paybackYears,
      lifetimeSavings25yr,
      verdict,
    };
  }, [zone, area, fuel, rate, doubleU, tripleU, upgradeCost]);

  const toneClass = result.verdict.tone === "good"
    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
    : result.verdict.tone === "marginal"
    ? "border-amber-400 bg-amber-50 text-amber-900"
    : "border-rose-400 bg-rose-50 text-rose-900";

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-slate-900">Triple Pane ROI Calculator</h3>
      <p className="mb-5 text-sm text-slate-600">
        Estimate payback period and lifetime savings for upgrading from double to triple pane, by climate zone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Climate zone (IECC)</span>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value as ClimateZone)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {Object.entries(ZONE_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label} - {v.description}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Total window area (m2)</span>
          <input
            type="number"
            min={1}
            max={500}
            value={area}
            onChange={(e) => setArea(Math.max(1, Number(e.target.value) || 0))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Heating fuel</span>
          <select
            value={fuel}
            onChange={(e) => {
              const v = e.target.value as FuelType;
              setFuel(v);
              setRate(FUEL_META[v].defaultRate);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {Object.entries(FUEL_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Fuel rate ({FUEL_META[fuel].unit})</span>
          <input
            type="number"
            step={0.01}
            min={0}
            value={rate}
            onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Double pane U (W/m2K)</span>
          <input
            type="number"
            step={0.1}
            min={0.5}
            max={3.0}
            value={doubleU}
            onChange={(e) => setDoubleU(Math.max(0.5, Number(e.target.value) || 0))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-700">Triple pane U (W/m2K)</span>
          <input
            type="number"
            step={0.1}
            min={0.3}
            max={2.0}
            value={tripleU}
            onChange={(e) => setTripleU(Math.max(0.3, Number(e.target.value) || 0))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-xs font-medium text-slate-700">Upgrade premium (USD per m2, triple over double)</span>
          <input
            type="number"
            step={10}
            min={0}
            value={upgradeCost}
            onChange={(e) => setUpgradeCost(Math.max(0, Number(e.target.value) || 0))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Annual energy saved</div>
          <div className="text-xl font-bold text-slate-900">{result.kwhSaved.toFixed(0)}<span className="ml-1 text-xs font-normal">kWh</span></div>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Annual USD saved</div>
          <div className="text-xl font-bold text-slate-900">${result.annualSavings.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Upgrade cost</div>
          <div className="text-xl font-bold text-slate-900">${result.upgradeCostTotal.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Payback</div>
          <div className="text-xl font-bold text-slate-900">
            {isFinite(result.paybackYears) ? `${result.paybackYears.toFixed(1)}yr` : "N/A"}
          </div>
        </div>
      </div>

      <div className={`rounded-xl border-2 p-4 ${toneClass}`}>
        <div className="font-semibold mb-1">Verdict: {result.verdict.label}</div>
        <div className="text-sm">{result.verdict.reason}</div>
        <div className="mt-2 text-sm">
          25-year net savings (after upgrade cost):{" "}
          <strong>${result.lifetimeSavings25yr.toFixed(0)}</strong>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500 italic">
        Simplified single-zone model using HDD/CDD and center-of-glass delta-U. Real savings depend on
        frame U, air infiltration, orientation, shading, and whole-building thermal envelope.
        Reference pricing only; subject to spec, coating, FX. Not a formal quote.
      </div>
    </div>
  );
}
