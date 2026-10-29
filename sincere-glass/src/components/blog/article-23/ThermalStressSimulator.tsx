"use client";

import { useMemo, useState } from "react";

type EdgeType = "clean-cut" | "ground" | "polished";
type Backing = "none" | "air-gap-vented" | "air-gap-sealed" | "insulated-r20";
type Treatment = "annealed" | "heat-strengthened" | "fully-tempered" | "fully-tempered-hs";

const EDGE_FACTOR: Record<EdgeType, number> = {
  "clean-cut": 1.4,
  ground: 1.0,
  polished: 0.75,
};

const BACKING_DELTA_T: Record<Backing, number> = {
  // Expected center-of-glass vs edge ΔT contribution in Celsius under
  // peak summer solar load on south/west elevation, mid-latitude climate.
  none: 15,
  "air-gap-vented": 22,
  "air-gap-sealed": 38,
  "insulated-r20": 55,
};

const TREATMENT_ALLOWABLE: Record<Treatment, number> = {
  // Allowable thermal ΔT edge-to-center per ASTM E2431 / EN 572 practice.
  annealed: 40,
  "heat-strengthened": 100,
  "fully-tempered": 200,
  "fully-tempered-hs": 200,
};

const TREATMENT_LABEL: Record<Treatment, string> = {
  annealed: "Annealed",
  "heat-strengthened": "Heat-Strengthened (HS)",
  "fully-tempered": "Fully Tempered (FT)",
  "fully-tempered-hs": "FT + Heat-Soaked (HST)",
};

const BACKING_LABEL: Record<Backing, string> = {
  none: "No backing / open interior",
  "air-gap-vented": "Air gap, vented to interior",
  "air-gap-sealed": "Air gap, sealed cavity",
  "insulated-r20": "Insulated backing (R-20+)",
};

const EDGE_LABEL: Record<EdgeType, string> = {
  "clean-cut": "Clean-cut (as-sawn)",
  ground: "Seamed / lightly ground",
  polished: "Flat-polished edges",
};

export default function ThermalStressSimulator() {
  const [thickness, setThickness] = useState(6);
  const [edge, setEdge] = useState<EdgeType>("ground");
  const [backing, setBacking] = useState<Backing>("air-gap-sealed");
  const [treatment, setTreatment] = useState<Treatment>("heat-strengthened");
  const [darkFrit, setDarkFrit] = useState(true);

  const result = useMemo(() => {
    const baseDeltaT = BACKING_DELTA_T[backing];
    const thicknessFactor = 1 + (thickness - 6) * 0.04; // thicker = slightly higher ΔT
    const absorptionFactor = darkFrit ? 1.3 : 1.0;
    const effectiveDeltaT = baseDeltaT * thicknessFactor * absorptionFactor;

    const edgeStress = effectiveDeltaT * EDGE_FACTOR[edge];
    const allowable = TREATMENT_ALLOWABLE[treatment];
    const utilization = (edgeStress / allowable) * 100;

    let tier: "Low" | "Moderate" | "High" | "Critical";
    let tierColor: string;
    let verdict: string;
    let actions: string[];

    if (utilization < 40) {
      tier = "Low";
      tierColor = "bg-green-500";
      verdict = "Thermal fracture risk is well within allowable limits for this build-up.";
      actions = [
        "Standard QA inspection acceptable",
        "No special shading or ventilation needed",
      ];
    } else if (utilization < 70) {
      tier = "Moderate";
      tierColor = "bg-amber-400";
      verdict =
        "Risk is manageable but marginal — any adverse condition (shadow pattern, snow line, interior obstruction) could push this build-up over the allowable.";
      actions = [
        "Upgrade edge finish to polished to reduce stress-concentration factor",
        "Verify that the backing cavity will actually ventilate as designed",
        "Consider heat-soak testing to catch NiS inclusions",
      ];
    } else if (utilization < 100) {
      tier = "High";
      tierColor = "bg-orange-500";
      verdict =
        "This build-up is close to its allowable. Field conditions routinely vary by 15-25%; thermal fracture is likely over a 10-year service life.";
      actions = [
        "Mandate heat-soak testing (HST per EN 14179)",
        "Upgrade from HS to FT, or specify polished edges",
        "Switch to a construction method with lower back-cavity ΔT (silicone opacifier or IMP)",
      ];
    } else {
      tier = "Critical";
      tierColor = "bg-red-600";
      verdict =
        "Allowable thermal stress is exceeded. Fracture is not a question of if but when.";
      actions = [
        "Redesign is required — do not proceed with this build-up",
        "Change to fully tempered with heat-soak, polished edges",
        "Replace sealed-cavity construction with vented cavity or IMP",
      ];
    }

    return {
      effectiveDeltaT: Math.round(effectiveDeltaT),
      edgeStress: Math.round(edgeStress),
      allowable,
      utilization: Math.min(utilization, 150),
      tier,
      tierColor,
      verdict,
      actions,
    };
  }, [thickness, edge, backing, treatment, darkFrit]);

  return (
    <div className="my-10 rounded-2xl border border-brand-secondary/20 bg-white dark:bg-brand-dark p-6 md:p-8">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-brand-primary dark:text-brand-light">
          Spandrel Thermal Stress Simulator
        </h4>
        <p className="mt-1 text-sm text-brand-secondary">
          Enter your proposed build-up. The simulator estimates edge-to-center ΔT under peak solar load and compares to the allowable for your heat treatment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-brand-primary dark:text-brand-light">
              Glass thickness: <span className="font-bold text-brand-accent">{thickness} mm</span>
            </label>
            <input
              type="range"
              min={4}
              max={19}
              step={1}
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full accent-brand-accent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brand-primary dark:text-brand-light">
              Edge finish
            </label>
            <select
              value={edge}
              onChange={(e) => setEdge(e.target.value as EdgeType)}
              className="w-full rounded-lg border border-brand-secondary/30 bg-white dark:bg-brand-dark/40 px-3 py-2 text-sm text-brand-primary dark:text-brand-light"
            >
              {(Object.keys(EDGE_LABEL) as EdgeType[]).map((k) => (
                <option key={k} value={k}>
                  {EDGE_LABEL[k]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brand-primary dark:text-brand-light">
              Back-cavity construction
            </label>
            <select
              value={backing}
              onChange={(e) => setBacking(e.target.value as Backing)}
              className="w-full rounded-lg border border-brand-secondary/30 bg-white dark:bg-brand-dark/40 px-3 py-2 text-sm text-brand-primary dark:text-brand-light"
            >
              {(Object.keys(BACKING_LABEL) as Backing[]).map((k) => (
                <option key={k} value={k}>
                  {BACKING_LABEL[k]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brand-primary dark:text-brand-light">
              Heat treatment
            </label>
            <select
              value={treatment}
              onChange={(e) => setTreatment(e.target.value as Treatment)}
              className="w-full rounded-lg border border-brand-secondary/30 bg-white dark:bg-brand-dark/40 px-3 py-2 text-sm text-brand-primary dark:text-brand-light"
            >
              {(Object.keys(TREATMENT_LABEL) as Treatment[]).map((k) => (
                <option key={k} value={k}>
                  {TREATMENT_LABEL[k]}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-brand-primary dark:text-brand-light">
            <input
              type="checkbox"
              checked={darkFrit}
              onChange={(e) => setDarkFrit(e.target.checked)}
              className="h-4 w-4 accent-brand-accent"
            />
            Dark-color spandrel (black / bronze / charcoal — raises absorption)
          </label>
        </div>

        {/* Output */}
        <div className="rounded-xl bg-gradient-to-br from-brand-primary/95 to-brand-dark p-5 text-brand-light">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
              Risk Tier
            </span>
            <span className={`rounded-full ${result.tierColor} px-3 py-1 text-xs font-bold uppercase text-white`}>
              {result.tier}
            </span>
          </div>

          {/* Utilization bar */}
          <div className="mb-5">
            <div className="mb-1 flex justify-between text-xs">
              <span>Edge stress</span>
              <span className="font-mono">
                {result.edgeStress} / {result.allowable} MPa-equivalent
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-brand-light/10">
              <div
                className={`absolute inset-y-0 left-0 ${result.tierColor} transition-all duration-500`}
                style={{ width: `${Math.min(result.utilization, 100)}%` }}
              />
              {result.utilization > 100 && (
                <div
                  className="absolute inset-y-0 bg-red-800 opacity-80"
                  style={{
                    left: "100%",
                    width: `${result.utilization - 100}%`,
                    transform: "translateX(-100%)",
                  }}
                />
              )}
            </div>
            <div className="mt-1 text-right text-xs font-mono text-brand-accent">
              {Math.round(result.utilization)}% of allowable
            </div>
          </div>

          {/* ΔT visualization */}
          <div className="mb-5">
            <div className="mb-2 text-xs uppercase tracking-wider text-brand-accent">
              Center-to-edge temperature differential
            </div>
            <svg viewBox="0 0 200 60" className="w-full" aria-hidden="true">
              <defs>
                <linearGradient id="dt-grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <rect x="0" y="20" width="200" height="20" fill="url(#dt-grad)" rx="2" />
              <text x="4" y="55" fill="#e5e7eb" fontSize="9">edge (cool)</text>
              <text x="196" y="55" fill="#e5e7eb" fontSize="9" textAnchor="end">
                center (+{result.effectiveDeltaT}°C)
              </text>
              <text x="100" y="15" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">
                ΔT ≈ {result.effectiveDeltaT}°C
              </text>
            </svg>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-brand-light/90">{result.verdict}</p>

          <ul className="space-y-1.5 text-sm">
            {result.actions.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brand-accent">→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-xs text-brand-secondary">
        Simplified model for pre-design screening. Final specification should be verified against ASTM E2431 (Thermal Fracture Analysis of Flat Glass) or project-specific thermal stress analysis by the glass fabricator. Values assume south/west elevation at mid-latitude peak-summer load. Data verified: 2026-10-29.
      </p>
    </div>
  );
}
