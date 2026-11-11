"use client";

import { useState } from "react";

/**
 * GasCostROICalculator
 * Decides whether upgrading from Argon fill to Krypton fill actually pays back.
 *
 * Inputs: IGU area (m2), energy price (USD/kWh), climate zone (HDD).
 * Outputs: upgrade premium total, annual energy saved, payback years, 25-yr net.
 *
 * Model:
 *   deltaU = U_argon - U_krypton for the chosen cavity width (approximate)
 *   Annual heating energy saved per m2 = deltaU * HDD * 24 / 1000 kWh
 *   (basic degree-day approximation at the window, no shading/solar offset)
 *   Premium per m2 = USD 42 at the factory gate (range 35-60)
 */

const PREMIUM_PER_M2 = 42; // USD, 2024 Q1 - 2026 Q3 factory average, FOB Wuhan
const HOURS_PER_DAY = 24;
const LIFETIME_YEARS = 25;

interface Zone {
  label: string;
  hdd: number;
  example: string;
}

const ZONES: Zone[] = [
  { label: "IECC 3 (mild)",      hdd: 1500, example: "Atlanta, GA" },
  { label: "IECC 4 (moderate)",  hdd: 2800, example: "Washington DC" },
  { label: "IECC 5 (cold)",      hdd: 3800, example: "Chicago, IL" },
  { label: "IECC 6 (very cold)", hdd: 4800, example: "Minneapolis, MN" },
  { label: "IECC 7 (subarctic)", hdd: 6000, example: "Fairbanks, AK (south)" },
  { label: "Passive House",      hdd: 4500, example: "certified PH project" },
];

/**
 * Delta U (argon -> krypton) at the cavity width implied by the
 * build-up. For a 4-12-4 IGU argon is near optimum; for 4-8-4 krypton wins.
 */
const DELTA_U_BY_WIDTH: Record<number, number> = {
  6:  0.4,
  8:  0.4,
  10: 0.4,
  12: 0.3,
  14: 0.1,
  16: 0.0,
};

export default function GasCostROICalculator() {
  const [area, setArea] = useState<number>(20);
  const [cavity, setCavity] = useState<number>(10);
  const [zoneIdx, setZoneIdx] = useState<number>(2);
  const [energyPrice, setEnergyPrice] = useState<number>(0.15);

  const zone = ZONES[zoneIdx];
  const deltaU = DELTA_U_BY_WIDTH[cavity] ?? 0;

  // Energy saved per m2 per year, in kWh.
  // Simplified: q = U * A * dT; annual heating = U * A * HDD * 24 / 1000
  const annualKwhPerM2 = (deltaU * zone.hdd * HOURS_PER_DAY) / 1000;
  const annualKwhTotal = annualKwhPerM2 * area;
  const annualDollarSaving = annualKwhTotal * energyPrice;
  const premiumTotal = PREMIUM_PER_M2 * area;
  const payback = annualDollarSaving > 0 ? premiumTotal / annualDollarSaving : Infinity;
  const lifetimeNet = annualDollarSaving * LIFETIME_YEARS - premiumTotal;

  const verdict = (() => {
    if (deltaU === 0) {
      return {
        tone: "bad",
        title: "No reason to upgrade",
        body: `At ${cavity}mm cavity width, argon is already at its thermal optimum. Krypton cannot do meaningfully better. Save the premium.`,
      };
    }
    if (payback <= 7) {
      return {
        tone: "good",
        title: "Worth the premium",
        body: `Payback in under 7 years with clear net savings over the IGU lifetime. Krypton earns its cost here.`,
      };
    }
    if (payback <= 15) {
      return {
        tone: "borderline",
        title: "Borderline. Decide on comfort grounds.",
        body: `Payback is 7-15 years. If occupant comfort or Passive House certification matters, go krypton. On pure ROI, argon is defensible.`,
      };
    }
    return {
      tone: "bad",
      title: "Does not pay back",
      body: `Payback exceeds 15 years - longer than the typical first seal-failure replacement interval. Spend the budget on better Low-E coating or triple pane instead.`,
    };
  })();

  const verdictBg =
    verdict.tone === "good" ? "bg-emerald-50 border-emerald-200"
    : verdict.tone === "borderline" ? "bg-amber-50 border-amber-200"
    : "bg-rose-50 border-rose-200";
  const verdictText =
    verdict.tone === "good" ? "text-emerald-900"
    : verdict.tone === "borderline" ? "text-amber-900"
    : "text-rose-900";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Krypton upgrade: does it pay back?
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Argon is the baseline. Krypton adds roughly USD 42 per m2 at the factory gate. Enter your project to see if the energy savings justify it over 25 years.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* IGU area */}
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Glazing area (m2)
          </span>
          <input
            type="number"
            value={area}
            min={1}
            max={500}
            step={1}
            onChange={(e) => setArea(Math.max(1, Number(e.target.value) || 1))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
        </label>

        {/* Cavity width */}
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
            IGU cavity width (mm)
          </span>
          <select
            value={cavity}
            onChange={(e) => setCavity(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          >
            {[6, 8, 10, 12, 14, 16].map((w) => (
              <option key={w} value={w}>{w}mm</option>
            ))}
          </select>
        </label>

        {/* Climate */}
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Climate zone
          </span>
          <select
            value={zoneIdx}
            onChange={(e) => setZoneIdx(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          >
            {ZONES.map((z, i) => (
              <option key={z.label} value={i}>
                {z.label} - {z.hdd} HDD ({z.example})
              </option>
            ))}
          </select>
        </label>

        {/* Energy price */}
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Electricity / heating price (USD/kWh)
          </span>
          <input
            type="number"
            value={energyPrice}
            min={0.05}
            max={0.80}
            step={0.01}
            onChange={(e) => setEnergyPrice(Math.max(0.05, Number(e.target.value) || 0.05))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
        </label>
      </div>

      {/* Results */}
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Upgrade premium</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            ${premiumTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-500">one-time, factory gate</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Annual energy saved</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {annualKwhTotal.toFixed(0)} kWh
          </div>
          <div className="text-xs text-slate-500">per project per year</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Annual dollar saving</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            ${annualDollarSaving.toFixed(0)}
          </div>
          <div className="text-xs text-slate-500">at current energy price</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Payback</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {isFinite(payback) ? `${payback.toFixed(1)} yrs` : "never"}
          </div>
          <div className="text-xs text-slate-500">
            25-yr net: ${lifetimeNet.toFixed(0)}
          </div>
        </div>
      </div>

      <div className={`mt-5 rounded-xl border p-5 ${verdictBg}`}>
        <div className={`text-sm font-semibold ${verdictText}`}>{verdict.title}</div>
        <p className={`mt-2 text-sm leading-relaxed ${verdictText}`}>{verdict.body}</p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Model: degree-day approximation at the glazing (U * A * HDD * 24 / 1000). Ignores solar gain, shading, frame effects and future energy price inflation. Reference pricing only; subject to spec, coating, FX. Not a formal quote.
      </p>
    </div>
  );
}
