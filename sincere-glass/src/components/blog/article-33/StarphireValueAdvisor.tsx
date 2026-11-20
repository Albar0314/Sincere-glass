"use client";

import { useState } from "react";

type ProjectKey =
  | "shower"
  | "storefront"
  | "display"
  | "railing"
  | "furniture"
  | "backpainted";

type BudgetKey = "tight" | "balanced" | "premium";

type Verdict = "starphire" | "generic" | "standard";

const PROJECTS: { key: ProjectKey; label: string; note: string }[] = [
  { key: "shower", label: "Frameless shower / bath screen", note: "Thick edges on constant view" },
  { key: "display", label: "Museum / retail display case", note: "Low-iron is the category default" },
  { key: "storefront", label: "Storefront / curtain wall", note: "Large area, cost scales fast" },
  { key: "railing", label: "Glass railing / balustrade", note: "Edges visible, mid stakes" },
  { key: "furniture", label: "Glass table / shelving", note: "Thick glass, edge on show" },
  { key: "backpainted", label: "Back-painted splashback", note: "Color accuracy matters" },
];

const BUDGETS: { key: BudgetKey; label: string }[] = [
  { key: "tight", label: "Cost-first" },
  { key: "balanced", label: "Balanced" },
  { key: "premium", label: "Spec-first" },
];

// Verdict logic: brand Starphire only earns its premium where the edge/clarity
// is on permanent close-up view AND the budget allows a brand line item.
// Generic low-iron (Optiwhite / Diamant / UltraClear) matches Starphire optically
// in nearly every case; standard clear is fine only where tint is hidden.
function decide(project: ProjectKey, budget: BudgetKey): Verdict {
  const edgeOnShow =
    project === "shower" || project === "display" || project === "furniture";
  const tintMatters =
    project === "backpainted" || project === "display";

  if (budget === "premium" && (edgeOnShow || tintMatters)) return "starphire";
  if (edgeOnShow || tintMatters) return "generic";
  if (project === "railing") return budget === "tight" ? "standard" : "generic";
  // storefront: area dominates cost, brand rarely pays back
  return budget === "tight" ? "standard" : "generic";
}

const RESULT: Record<
  Verdict,
  { title: string; tone: string; body: string }
> = {
  starphire: {
    title: "Pay for Starphire (or an equivalent brand line)",
    tone: "border-sky-400/40 bg-sky-400/10 text-sky-100",
    body:
      "Here the edge or color is on permanent close-up view and the budget carries a brand line item. A named ultra-clear (Starphire / Optiwhite / Diamant) buys batch-to-batch consistency and documented Fe2O3 specs — worth it when a visible mismatch would be unacceptable.",
  },
  generic: {
    title: "Generic low-iron is the smart pick",
    tone: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
    body:
      "Any reputable low-iron glass (Fe2O3 around 0.01%) is optically in Starphire's class — the same near-colorless edge and ~91% light transmittance. Unless a spec sheet or client names Starphire, generic low-iron gives you the look without the brand premium.",
  },
  standard: {
    title: "Standard clear glass is fine",
    tone: "border-amber-400/40 bg-amber-400/10 text-amber-100",
    body:
      "The green tint is hidden or far from the eye, so paying for low-iron (branded or not) returns little. Put the saving into thickness, hardware or coatings where it actually shows.",
  },
};

export default function StarphireValueAdvisor() {
  const [project, setProject] = useState<ProjectKey>("shower");
  const [budget, setBudget] = useState<BudgetKey>("balanced");

  const verdict = decide(project, budget);
  const r = RESULT[verdict];

  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:p-6">
      <div className="mb-4">
        <h4 className="text-base font-semibold text-slate-100">
          Starphire value advisor
        </h4>
        <p className="mt-1 text-sm text-slate-400">
          Pick your project and budget stance to see whether the Starphire brand
          premium pays back — or whether generic low-iron (or plain clear) is the
          better call.
        </p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Project
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setProject(p.key)}
              className={
                "rounded-lg border px-3 py-2 text-left text-sm transition " +
                (project === p.key
                  ? "border-sky-400 bg-sky-400/10 text-slate-100"
                  : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600")
              }
            >
              <span className="block font-medium">{p.label}</span>
              <span className="block text-xs text-slate-500">{p.note}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Budget stance
        </p>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => setBudget(b.key)}
              className={
                "rounded-lg border px-4 py-2 text-sm transition " +
                (budget === b.key
                  ? "border-sky-400 bg-sky-400/10 text-slate-100"
                  : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600")
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className={"rounded-xl border p-4 " + r.tone}>
        <p className="text-sm font-semibold">{r.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed opacity-90">{r.body}</p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Guidance only, based on typical architectural-glass practice. Always
        confirm against the project spec and any named-brand requirement.
      </p>
    </div>
  );
}
