"use client";

import { useState } from "react";

type ThicknessKey = "6" | "8" | "10" | "12";

// Indicative clear-float processed price per m², FOB Wuhan, 2024 Q1 – 2026 Q3.
// Reference only — subject to spec, coating, size and FX. Not a formal quote.
const CLEAR_PER_M2: Record<ThicknessKey, number> = {
  "6": 12,
  "8": 16,
  "10": 20,
  "12": 26,
};

// Multipliers over standard clear (typical market spread).
const GENERIC_MULT = 1.18; // generic low-iron
const STARPHIRE_MULT = 1.45; // named brand line

const THICKNESSES: ThicknessKey[] = ["6", "8", "10", "12"];

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function StarphirePremiumCalculator() {
  const [area, setArea] = useState<number>(3.5);
  const [thk, setThk] = useState<ThicknessKey>("10");

  const safeArea = Number.isFinite(area) && area > 0 ? area : 0;
  const base = CLEAR_PER_M2[thk];

  const clear = base * safeArea;
  const generic = base * GENERIC_MULT * safeArea;
  const starphire = base * STARPHIRE_MULT * safeArea;

  const brandPremium = starphire - generic; // $ paid purely for the brand
  const brandPremiumPct =
    generic > 0 ? Math.round((brandPremium / generic) * 100) : 0;

  const rows = [
    { label: "Standard clear float", value: clear, tone: "text-amber-300" },
    { label: "Generic low-iron", value: generic, tone: "text-emerald-300" },
    { label: "Starphire (branded)", value: starphire, tone: "text-sky-300" },
  ];

  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:p-6">
      <h4 className="text-base font-semibold text-slate-100">
        Starphire premium calculator
      </h4>
      <p className="mt-1 text-sm text-slate-400">
        Estimate what the Starphire brand actually costs you over generic
        low-iron for your glass area — the number that decides whether the name
        is worth it.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Glass area (m²)
          </label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={Number.isFinite(area) ? area : ""}
            onChange={(e) => setArea(parseFloat(e.target.value))}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          />
        </div>
        <div>
          <p className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Thickness (mm)
          </p>
          <div className="mt-1.5 flex gap-2">
            {THICKNESSES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setThk(t)}
                className={
                  "flex-1 rounded-lg border px-2 py-2 text-sm transition " +
                  (thk === t
                    ? "border-sky-400 bg-sky-400/10 text-slate-100"
                    : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600")
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-2.5"
          >
            <span className="text-sm text-slate-300">{r.label}</span>
            <span className={"text-base font-semibold " + r.tone}>
              {money(r.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-sky-400/40 bg-sky-400/10 p-4">
        <p className="text-sm text-sky-100">
          <span className="font-semibold">Brand premium: {money(brandPremium)}</span>{" "}
          — about {brandPremiumPct}% more than generic low-iron, for the same
          optical class.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-sky-100/80">
          If X = the edge or color is on permanent close view and Y = a client or
          spec names the brand, then Z = pay it. Otherwise that figure is the
          saving from choosing generic low-iron.
        </p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Reference pricing only; subject to spec, coating, FX. Not a formal quote.
        Processed glass, FOB Wuhan, 2024 Q1 – 2026 Q3.
      </p>
    </div>
  );
}
