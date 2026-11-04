"use client";

import { useMemo, useState } from "react";

type Buildup = "single" | "double-air" | "double-argon-lowe" | "triple-argon-lowe";

const BUILDUP_U: Record<Buildup, { label: string; u: number }> = {
  "single": { label: "Single pane 6 mm", u: 5.7 },
  "double-air": { label: "Double IGU, air (6-12A-6)", u: 2.7 },
  "double-argon-lowe": { label: "Double IGU, argon + Low-E", u: 1.3 },
  "triple-argon-lowe": { label: "Triple IGU, argon + dual Low-E", u: 0.8 },
};

// Approximate inner-surface temperature of the warm (indoor) lite
// via steady-state 1D heat balance at standard interior/exterior film coefficients.
// Tsurf = Ti - (U / hi) * (Ti - To), with hi assumed 7.7 W/m2K per EN 673 / NFRC.
function innerSurfaceTemp(Ti: number, To: number, U: number): number {
  const hi = 7.7;
  return Ti - (U / hi) * (Ti - To);
}

// Dew point via Magnus-Tetens approximation.
function dewPoint(TiC: number, rhPct: number): number {
  const a = 17.625;
  const b = 243.04;
  const rh = rhPct / 100;
  const alpha = Math.log(rh) + (a * TiC) / (b + TiC);
  return (b * alpha) / (a - alpha);
}

interface Verdict {
  label: string;
  tone: "a" | "b" | "c";
  advice: string;
}

function verdictFor(surface: number, dew: number): Verdict {
  const margin = surface - dew;
  if (margin > 3) return { label: "No condensation risk", tone: "a", advice: "Inner glass surface stays well above the dew point. Specification is adequate." };
  if (margin > 0) return { label: "Marginal: condensation likely at coldest hours", tone: "b", advice: "Consider upgrading glass to Low-E or argon fill, lowering indoor humidity, or improving warm-edge spacer." };
  return { label: "Condensation will form on inner glass", tone: "c", advice: "Build-up is undersized for this climate and humidity. Upgrade to double Low-E, triple pane, or reduce indoor humidity." };
}

export default function CondensationRiskSimulator() {
  const [Ti, setTi] = useState<number>(21);
  const [To, setTo] = useState<number>(-5);
  const [rh, setRh] = useState<number>(50);
  const [buildup, setBuildup] = useState<Buildup>("double-air");

  const U = BUILDUP_U[buildup].u;
  const surface = useMemo(() => innerSurfaceTemp(Ti, To, U), [Ti, To, U]);
  const dew = useMemo(() => dewPoint(Ti, rh), [Ti, rh]);
  const v = useMemo(() => verdictFor(surface, dew), [surface, dew]);

  const toneBg = v.tone === "a" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : v.tone === "b" ? "bg-amber-50 border-amber-300 text-amber-900" : "bg-rose-50 border-rose-300 text-rose-900";

  return (
    <div className="my-10 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Interactive</div>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">Condensation Risk Simulator</h3>
        <p className="mt-1 text-sm text-slate-600">
          Enter indoor temperature, outdoor temperature, indoor relative humidity and IGU build-up. The simulator computes the inner-surface temperature of the warm lite via a steady-state heat balance and compares it to the dew point via the Magnus-Tetens approximation. If the inner glass surface falls below the dew point, condensation forms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Indoor temperature (deg C)</label>
          <input
            type="range"
            min={10}
            max={26}
            step={1}
            value={Ti}
            onChange={(e) => setTi(parseInt(e.target.value))}
            className="mt-2 w-full accent-slate-900"
          aria-label="Indoor temperature (deg C)" />
          <div className="mt-1 text-sm text-slate-900">{Ti} deg C</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Outdoor temperature (deg C)</label>
          <input
            type="range"
            min={-30}
            max={15}
            step={1}
            value={To}
            onChange={(e) => setTo(parseInt(e.target.value))}
            className="mt-2 w-full accent-slate-900"
          aria-label="Outdoor temperature (deg C)" />
          <div className="mt-1 text-sm text-slate-900">{To} deg C</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Indoor relative humidity (%)</label>
          <input
            type="range"
            min={20}
            max={70}
            step={5}
            value={rh}
            onChange={(e) => setRh(parseInt(e.target.value))}
            className="mt-2 w-full accent-slate-900"
          aria-label="Indoor relative humidity (%)" />
          <div className="mt-1 text-sm text-slate-900">{rh}%</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">IGU build-up</label>
          <div className="mt-2 space-y-2">
            {(Object.keys(BUILDUP_U) as Buildup[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBuildup(b)}
                className={`w-full text-left px-3 py-2 rounded-md border text-sm ${buildup === b ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"}`}
              >
                {BUILDUP_U[b].label}
                <span className="ml-2 text-xs opacity-70">U={BUILDUP_U[b].u} W/m2K</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Inner glass surface temp</div>
            <div className="text-2xl font-semibold text-slate-900">{surface.toFixed(1)} deg C</div>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Indoor dew point</div>
            <div className="text-2xl font-semibold text-slate-900">{dew.toFixed(1)} deg C</div>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Margin</div>
            <div className="text-2xl font-semibold text-slate-900">{(surface - dew).toFixed(1)} K</div>
          </div>
        </div>

        <div className={`mt-4 rounded-md border px-3 py-2 text-sm ${toneBg}`}>
          <div className="font-semibold">{v.label}</div>
          <div className="mt-1">{v.advice}</div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Model uses interior film coefficient hi=7.7 W/m2K per EN 673 and Magnus-Tetens dew-point approximation. Real buildings have corner and frame effects (edge-of-glass is 2-4 K colder than center-of-glass); specify warm-edge spacer to mitigate. Data verified: 2026-11.
        </div>
      </div>
    </div>
  );
}
