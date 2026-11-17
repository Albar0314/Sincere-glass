"use client";
// Article #30 interactive #3: recommended spacer by climate and priority.
// ASCII-only. Renders real default DOM at SSR (cold + condensation selected).
import { useState } from "react";

const CLIMATES = [
  { key: "cold", label: "Cold / heating-dominated" },
  { key: "mixed", label: "Mixed" },
  { key: "hot", label: "Hot / cooling-dominated" },
];
const PRIORITIES = [
  { key: "cond", label: "Condensation-prone (high indoor RH)" },
  { key: "energy", label: "Energy rating / comfort" },
  { key: "budget", label: "Lowest first cost" },
];

const REC: Record<string, Record<string, { pick: string; why: string }>> = {
  cold: {
    cond: { pick: "Warm edge (foam or TPS)", why: "Cold outdoor air makes the edge the first place to condense. The warmest edge option earns its cost here." },
    energy: { pick: "Warm edge (TGI, TPS or foam)", why: "Edge losses are a real share of whole-window U in cold climates. Warm edge lifts the rating." },
    budget: { pick: "Stainless steel warm edge", why: "The cheapest step off aluminum - most of the benefit at a small premium." },
  },
  mixed: {
    cond: { pick: "Warm edge (TGI or TPS)", why: "Shoulder-season nights still drive edge condensation. Warm edge keeps the sightline dry." },
    energy: { pick: "Warm edge (TGI or TPS)", why: "Balanced gain for both heating and cooling seasons." },
    budget: { pick: "Stainless steel warm edge", why: "A sensible default; aluminum only if cost is the single driver." },
  },
  hot: {
    cond: { pick: "Warm edge if indoor RH is high", why: "In cooled, humid interiors condensation can form on the warm-side edge; warm edge still helps." },
    energy: { pick: "Aluminum or stainless", why: "Edge heat loss matters less when cooling dominates; spend the budget on Low-E and SHGC instead." },
    budget: { pick: "Aluminum", why: "Acceptable where winters are mild and condensation is not a concern." },
  },
};

export default function SpacerSelectorMatrix() {
  const [climate, setClimate] = useState("cold");
  const [priority, setPriority] = useState("cond");
  const r = REC[climate][priority];

  function Group(props: { label: string; opts: { key: string; label: string }[]; val: string; set: (v: string) => void }) {
    return (
      <div>
        <p className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">{props.label}</p>
        <div className="flex flex-col gap-2">
          {props.opts.map((o) => (
            <button
              key={o.key}
              type="button"
              aria-pressed={o.key === props.val}
              onClick={() => props.set(o.key)}
              className={"text-left px-3 py-2 rounded-md text-sm border transition-colors " + (o.key === props.val ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-brand-dark border-black/10 hover:border-brand-accent")}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-black/10 bg-white p-5 md:p-6">
      <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold">Interactive</p>
      <h3 className="font-display text-lg font-bold text-brand-dark">Which spacer for your project?</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Group label="Climate" opts={CLIMATES} val={climate} set={setClimate} />
        <Group label="Priority" opts={PRIORITIES} val={priority} set={setPriority} />
      </div>
      <div className="mt-5 rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold">Suggested spacer</p>
        <p className="mt-1 font-display text-xl font-bold">{r.pick}</p>
        <p className="mt-2 text-sm text-white/70">{r.why}</p>
      </div>
      <p className="mt-4 text-xs text-brand-muted">
        A guide, not a specification. Final choice also depends on unit size, frame, warranty terms and local code.
      </p>
    </div>
  );
}
