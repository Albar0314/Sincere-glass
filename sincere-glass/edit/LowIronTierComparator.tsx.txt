"use client";

import React, { useState } from "react";

type TierKey = "float-mill" | "fabricator" | "trader";

interface TierProfile {
  key: TierKey;
  name: string;
  examples: string;
  bestFor: string;
  moq: string;
  fabrication: string;
  colorControl: string;
  pricingLayer: string;
  leadTime: string;
  verdict: string;
}

const TIERS: Record<TierKey, TierProfile> = {
  "float-mill": {
    key: "float-mill",
    name: "Tier-1 Float Glass Mill",
    examples: "CSG Holding, Xinyi Glass, Taiwan Glass, Vitro, Pilkington",
    bestFor: "Container-load raw annealed jumbo sheets (3,300 x 6,000 mm) for regional glass processors",
    moq: "1-5 full containers (20-100+ metric tons per thickness)",
    fabrication: "Raw annealed jumbo sheets only; no custom cut-to-size, holes, or tempering",
    colorControl: "Source of original Fe2O3 melt; consistent within one furnace campaign",
    pricingLayer: "Lowest raw-sheet base price, but buyer bears cutting waste and local tempering cost",
    leadTime: "15-30 days depending on furnace campaign schedule",
    verdict: "If you operate your own cutting and tempering plant and order >= 20 tons per thickness, buy direct from a float mill.",
  },
  fabricator: {
    key: "fabricator",
    name: "Direct Deep-Processing Fabricator",
    examples: "Integrated architectural processors (e.g., Sincere Glass Wuhan, 20,000 m2 plant)",
    bestFor: "Project-ready cut-to-size tempered, laminated, IGU, ceramic frit, or curved low-iron panels",
    moq: "100 m2 stock thicknesses (6-10 mm); 200-300 m2 for 15-19 mm or custom coatings",
    fabrication: "Full CNC cutting, polishing, drilling, tempering (up to 3.3 m x 15 m), HST, lamination, IGU",
    colorControl: "Single-lot allocation from Tier-1 float stock with mill certificate traceability",
    pricingLayer: "Factory-direct FOB pricing with zero broker margin and optimized jumbo nesting",
    leadTime: "15-20 working days (tempered); 20-25 working days (laminated / IGU)",
    verdict: "If you are a facade contractor, glazing distributor, or developer buying finished panels, buy from an integrated fabricator.",
  },
  trader: {
    key: "trader",
    name: "Trading Company / Export Broker",
    examples: "Asset-light Alibaba/Made-in-China trading desks without owned furnaces",
    bestFor: "Small mixed-SKU hardware + glass consolidation where technical spec risk is low",
    moq: "Flexible (sometimes 20-50 m2), often consolidated from multiple local workshops",
    fabrication: "Subcontracted to third-party processors; limited control over roller-wave or edge quality",
    colorControl: "High risk of mixed float lots across sub-factories, causing green-to-blue edge mismatch",
    pricingLayer: "+10% to +25% undisclosed margin, or artificially low quotes achieved via clear-glass substitution",
    leadTime: "Unpredictable during peak seasons; remake disputes stall between broker and workshop",
    verdict: "If your project requires ASTM/EN safety certification, HST logs, or uniform facade color, avoid unverified brokers.",
  },
};

export default function LowIronTierComparator() {
  const [active, setActive] = useState<TierKey>("fabricator");
  const current = TIERS[active];

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4" role="tablist" aria-label="Low iron glass supplier tiers">
        {(Object.keys(TIERS) as TierKey[]).map((key) => {
          const item = TIERS[key];
          const isSelected = active === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActive(key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "bg-[#1C1F26] text-[#DAA745] shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-lg font-bold text-slate-900">{current.name}</h3>
          <span className="text-xs font-medium text-slate-500">{current.examples}</span>
        </div>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Best-Fit Buyer</dt>
            <dd className="mt-1 text-sm text-slate-800">{current.bestFor}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Typical MOQ</dt>
            <dd className="mt-1 text-sm text-slate-800">{current.moq}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fabrication Scope</dt>
            <dd className="mt-1 text-sm text-slate-800">{current.fabrication}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Batch &amp; Color Traceability</dt>
            <dd className="mt-1 text-sm text-slate-800">{current.colorControl}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pricing Structure</dt>
            <dd className="mt-1 text-sm text-slate-800">{current.pricingLayer}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Production Lead Time</dt>
            <dd className="mt-1 text-sm text-slate-800">{current.leadTime}</dd>
          </div>
        </dl>

        <div className="mt-4 rounded-xl border-l-4 border-[#DAA745] bg-[#1C1F26] p-4 text-sm text-slate-100">
          <strong className="text-[#DAA745]">Sourcing Rule: </strong>
          {current.verdict}
        </div>
      </div>
    </div>
  );
}
