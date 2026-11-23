"use client";

import { useMemo, useState } from "react";

type ZoneChoice = "standard" | "hybrid" | "low-iron";

interface ZoneDef {
  id: string;
  name: string;
  spec: string;
  defaultArea: number;
  stdRate: number;
  hybridRate: number | null;
  liRate: number;
  recommended: ZoneChoice;
  riskIfStandard: string;
}

const ZONES: ZoneDef[] = [
  {
    id: "lobby",
    name: "Ground-Floor Lobby & Retail Storefront",
    spec: "15mm Tempered / 10+1.52+10 Laminated",
    defaultArea: 220,
    stdRate: 48,
    hybridRate: null,
    liRate: 74,
    recommended: "low-iron",
    riskIfStandard: "High visual risk: thick glass viewed under 2 m shows strong green cast on merchandise and white interiors.",
  },
  {
    id: "balustrade",
    name: "Frameless Balustrades & Wet-Area Doors",
    spec: "10+1.52 SGP+10 / 10mm Tempered",
    defaultArea: 140,
    stdRate: 62,
    hybridRate: null,
    liRate: 88,
    recommended: "low-iron",
    riskIfStandard: "High visual risk: polished exposed edges show bottle-green stripe at arm's length.",
  },
  {
    id: "podium-igu",
    name: "Podium Vision Curtain Wall (Floors 2-3)",
    spec: "6T+12Ar+6T Low-E#2 IGU",
    defaultArea: 240,
    stdRate: 52,
    hybridRate: 62,
    liRate: 72,
    recommended: "hybrid",
    riskIfStandard: "Moderate: outboard-only Low Iron removes exterior green reflection while saving 50% of substrate uplift.",
  },
  {
    id: "tower-igu",
    name: "Upper-Floor Tower Vision (Floors 4+)",
    spec: "6T+12Ar+6T Low-E#2 IGU",
    defaultArea: 450,
    stdRate: 52,
    hybridRate: 62,
    liRate: 72,
    recommended: "standard",
    riskIfStandard: "Low visual risk: viewed from >15 m street distance behind Low-E coating, standard clear is indistinguishable.",
  },
  {
    id: "spandrel",
    name: "Dark / Charcoal Ceramic Frit Spandrels",
    spec: "8mm Tempered Enameled (Dark RAL)",
    defaultArea: 150,
    stdRate: 26,
    hybridRate: null,
    liRate: 38,
    recommended: "standard",
    riskIfStandard: "Zero visual risk: dark ceramic frit completely masks iron tint (only white/pastel frit requires Low Iron).",
  },
];

function fmtWholeUsd(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function LowIronValueEngineeringLab() {
  const [areas, setAreas] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const z of ZONES) init[z.id] = z.defaultArea;
    return init;
  });

  const [choices, setChoices] = useState<Record<string, ZoneChoice>>(() => {
    const init: Record<string, ZoneChoice> = {};
    for (const z of ZONES) init[z.id] = z.recommended;
    return init;
  });

  const summary = useMemo(() => {
    let allStd = 0;
    let allLi = 0;
    let current = 0;
    let totalArea = 0;
    let riskFlags = 0;

    for (const z of ZONES) {
      const a = (areas as any)[z.id] as number;
      const c = (choices as any)[z.id] as ZoneChoice;
      totalArea += a;
      allStd += a * z.stdRate;
      allLi += a * z.liRate;

      const chosenRate =
        c === "low-iron"
          ? z.liRate
          : c === "hybrid" && z.hybridRate !== null
          ? z.hybridRate
          : z.stdRate;
      current += a * chosenRate;

      if (z.recommended === "low-iron" && c === "standard") {
        riskFlags += 1;
      }
    }

    const savedVsAllLi = allLi - current;
    const savedPct = allLi > allStd ? Math.round((savedVsAllLi / (allLi - allStd)) * 100) : 0;
    const upliftVsStd = allStd > 0 ? Math.round(((current - allStd) / allStd) * 100) : 0;

    return {
      totalArea,
      allStd,
      allLi,
      current,
      savedVsAllLi,
      savedPct,
      upliftVsStd,
      riskFlags,
    };
  }, [areas, choices]);

  const applyPreset = (mode: "all-li" | "ve-optimal" | "all-std") => {
    const next: Record<string, ZoneChoice> = {};
    for (const z of ZONES) {
      next[z.id] = mode === "all-li" ? "low-iron" : mode === "all-std" ? "standard" : z.recommended;
    }
    setChoices(next);
  };

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#1C1F26] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-1">
            Interactive BOQ Optimizer
          </div>
          <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
            Zone-Split Value Engineering Simulator (1,200 m2 Commercial Baseline)
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset("ve-optimal")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#DAA745] text-[#1C1F26]"
          >
            Recommended VE Split
          </button>
          <button
            type="button"
            onClick={() => applyPreset("all-li")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#3A4250]/30 text-[#F2F0ED] border border-[#3A4250]/50"
          >
            100% Low Iron
          </button>
          <button
            type="button"
            onClick={() => applyPreset("all-std")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#3A4250]/30 text-[#8B95A5] border border-[#3A4250]/50"
          >
            100% Standard Clear
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {ZONES.map((z) => {
          const areaVal = (areas as any)[z.id] as number;
          const choiceVal = (choices as any)[z.id] as ZoneChoice;
          const activeRate =
            choiceVal === "low-iron"
              ? z.liRate
              : choiceVal === "hybrid" && z.hybridRate !== null
              ? z.hybridRate
              : z.stdRate;

          return (
            <div
              key={z.id}
              className="rounded-xl border border-[#3A4250]/40 bg-[#111419] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <div className="text-sm font-semibold text-[#F2F0ED]">{z.name}</div>
                  <div className="text-xs text-[#8B95A5] font-mono">{z.spec}</div>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`zone-area-${z.id}`} className="text-xs text-[#8B95A5]">
                    Area (m2):
                  </label>
                  <input
                    id={`zone-area-${z.id}`}
                    type="number"
                    min={0}
                    max={5000}
                    step={10}
                    value={areaVal}
                    aria-label={`${z.name} area in square meters`}
                    onChange={(e) =>
                      setAreas((prev) => ({
                        ...prev,
                        [z.id]: Math.max(0, Number(e.target.value) || 0),
                      }))
                    }
                    className="w-20 rounded bg-[#1C1F26] border border-[#3A4250]/60 px-2 py-1 text-xs font-mono text-[#F2F0ED]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setChoices((p) => ({ ...p, [z.id]: "standard" }))}
                    className={
                      "px-2.5 py-1 rounded text-xs font-medium " +
                      (choiceVal === "standard"
                        ? "bg-[#8B95A5] text-[#1C1F26] font-semibold"
                        : "bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/40")
                    }
                  >
                    Standard (${z.stdRate}/m2)
                  </button>
                  {z.hybridRate !== null && (
                    <button
                      type="button"
                      onClick={() => setChoices((p) => ({ ...p, [z.id]: "hybrid" }))}
                      className={
                        "px-2.5 py-1 rounded text-xs font-medium " +
                        (choiceVal === "hybrid"
                          ? "bg-[#DAA745] text-[#1C1F26] font-semibold"
                          : "bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/40")
                      }
                    >
                      Outboard LI Only (${z.hybridRate}/m2)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setChoices((p) => ({ ...p, [z.id]: "low-iron" }))}
                    className={
                      "px-2.5 py-1 rounded text-xs font-medium " +
                      (choiceVal === "low-iron"
                        ? "bg-[#DAA745] text-[#1C1F26] font-semibold"
                        : "bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/40")
                    }
                  >
                    Full Low Iron (${z.liRate}/m2)
                  </button>
                </div>

                <div className="text-xs font-mono text-[#F2F0ED]">
                  Subtotal: {fmtWholeUsd(areaVal * activeRate)}
                </div>
              </div>

              <p className="text-[11px] text-[#8B95A5] mt-2 mb-0">{z.riskIfStandard}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-[#111419] border border-[#3A4250]/40 p-5">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#8B95A5]">
            Your Configured BOQ ({summary.totalArea.toLocaleString("en-US")} m2)
          </div>
          <div className="text-2xl font-bold text-[#F2F0ED] mt-1">
            {fmtWholeUsd(summary.current)}
          </div>
          <div className="text-xs text-[#8B95A5] mt-1">
            +{summary.upliftVsStd}% vs 100% Standard ({fmtWholeUsd(summary.allStd)})
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#DAA745]">
            Savings vs 100% Low Iron
          </div>
          <div className="text-2xl font-bold text-[#DAA745] mt-1">
            {fmtWholeUsd(summary.savedVsAllLi)}
          </div>
          <div className="text-xs text-[#F2F0ED] mt-1">
            Eliminates {summary.savedPct}% of Low Iron premium
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#8B95A5]">
            Aesthetic Risk Check
          </div>
          <div className="text-base font-bold mt-1 text-[#F2F0ED]">
            {summary.riskFlags === 0
              ? "Pass: High-Visibility Zones Protected"
              : `Warning: ${summary.riskFlags} Critical Zone(s) on Standard`}
          </div>
          <div className="text-xs text-[#8B95A5] mt-1">
            100% Low Iron benchmark: {fmtWholeUsd(summary.allLi)}
          </div>
        </div>
      </div>
    </div>
  );
}
