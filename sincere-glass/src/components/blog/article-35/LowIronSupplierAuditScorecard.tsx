"use client";

import React, { useMemo, useState } from "react";
import { useQuote } from "@/lib/QuoteContext";

interface Checkpoint {
  id: string;
  pillar: "Substrate Provenance" | "Fabrication Envelope" | "Export Packaging & Risk";
  label: string;
  detail: string;
  weight: number;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: "mill-cert",
    pillar: "Substrate Provenance",
    label: "Batch-specific float mill certificate (Fe2O3 <= 0.010%)",
    detail: "Written chemical composition report tied to the exact float mill campaign (CSG, Xinyi, Taiwan Glass, or named Tier-1 mill), not a generic brochure.",
    weight: 18,
  },
  {
    id: "optical-data",
    pillar: "Substrate Provenance",
    label: "Spectrophotometer VLT & CIE L*a*b* b* edge-color report",
    detail: "Verified visible light transmittance (>= 90.5% at 6 mm) and b* yellowness/greenness index measured from the actual stock lot.",
    weight: 14,
  },
  {
    id: "single-batch",
    pillar: "Substrate Provenance",
    label: "Single-campaign lot lock for color-critical elevations",
    detail: "Commitment that all panels on one elevation are cut from the same float furnace run to prevent visible edge-color drift.",
    weight: 12,
  },
  {
    id: "inhouse-lines",
    pillar: "Fabrication Envelope",
    label: "Verified in-house cutting, edging, tempering & autoclave lines",
    detail: "Live video walkthrough or equipment serial check confirming the vendor owns processing lines rather than outsourcing to a third-party shop.",
    weight: 16,
  },
  {
    id: "jumbo-envelope",
    pillar: "Fabrication Envelope",
    label: "Furnace & autoclave envelope matches max panel size (up to 3.3 m x 15 m)",
    detail: "Confirmed roller-wave distortion limits (<= 0.15 mm/300 mm) and convection heating for thick low-iron plates (12-19 mm).",
    weight: 10,
  },
  {
    id: "hst-protocol",
    pillar: "Fabrication Envelope",
    label: "Documented Heat Soak Test (EN 14179-1:2016) kiln log",
    detail: "Required for tempered low-iron panels in overhead, balustrade, or high-rise facade zones to eliminate nickel sulfide spontaneous breakage.",
    weight: 10,
  },
  {
    id: "ispm15-crating",
    pillar: "Export Packaging & Risk",
    label: "ISPM-15 fumigated A-frame steel/plywood crates with cork/powder interleaving",
    detail: "Export-grade end-cap plywood crates with moisture desiccant and stamped IPPC certification for destination port clearance.",
    weight: 10,
  },
  {
    id: "spare-lite",
    pillar: "Export Packaging & Risk",
    label: "Pre-agreed 2%-3% spare-lite allocation & breakage replacement SLA",
    detail: "Written policy covering transit-breakage documentation and fast-track replacement production without full-MOQ penalties.",
    weight: 10,
  },
];

type VerdictTier = "disqualify" | "high-risk" | "conditional" | "qualified";

export default function LowIronSupplierAuditScorecard() {
  const { openQuote } = useQuote();
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "mill-cert": true,
    "inhouse-lines": true,
    "ispm15-crating": true,
  });
  const [thickness, setThickness] = useState<string>("10mm");
  const [assembly, setAssembly] = useState<string>("Tempered Monolithic");
  const [volumeSqm, setVolumeSqm] = useState<number>(350);

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const result = useMemo(() => {
    let score = 0;
    const missing: string[] = [];
    for (const cp of CHECKPOINTS) {
      if (checked[cp.id]) {
        score += cp.weight;
      } else {
        missing.push(cp.label);
      }
    }

    let tier: VerdictTier = "disqualify";
    let title = "Disqualify - Unverified Broker or High Substitution Risk";
    let summary =
      "Score below 40/100 indicates missing mill traceability and unverified factory ownership. Do not wire a deposit until batch Fe2O3 documentation and live line ownership are confirmed.";
    let badgeClass = "bg-red-500/20 text-red-300 border-red-500/40";
    let ringColor = "#EF4444";

    if (score >= 85) {
      tier = "qualified";
      title = "Qualified Direct Factory Partner";
      summary =
        "Score 85-100/100 confirms mill-level low-iron traceability, in-house processing control, and export crating discipline. Safe to proceed to pre-production sample sign-off.";
      badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      ringColor = "#10B981";
    } else if (score >= 65) {
      tier = "conditional";
      title = "Conditional Approval - Close Documentation Gaps First";
      summary =
        "Score 65-84/100 shows viable fabrication capability, but remaining documentation gaps must be written into the Proforma Invoice before releasing the 30% deposit.";
      badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
      ringColor = "#DAA745";
    } else if (score >= 40) {
      tier = "high-risk";
      title = "High Risk - Mandatory Third-Party Pre-Shipment Audit";
      summary =
        "Score 40-64/100 leaves critical exposure to standard-clear substitution, batch color mismatch, or transit breakage. Require a pre-production lab test and witnessed loading.";
      badgeClass = "bg-orange-500/20 text-orange-300 border-orange-500/40";
      ringColor = "#F97316";
    }

    return { score, tier, title, summary, badgeClass, ringColor, missing };
  }, [checked]);

  const handleRequestQuote = () => {
    const missingSummary =
      result.missing.length > 0
        ? `Open audit items to verify: ${result.missing.slice(0, 3).join("; ")}.`
        : "All 8 supplier verification checkpoints required in submittal pack.";
    const prefillMessage = [
      `Low Iron Glass Supplier Inquiry (from Buyer's Checklist Scorecard)`,
      `- Target Build-up: ${thickness} ${assembly}`,
      `- Estimated Volume: ${volumeSqm} m2`,
      `- Audit Readiness Score: ${result.score}/100 (${result.title})`,
      `- ${missingSummary}`,
      `Please provide FOB Wuhan quotation, float mill Fe2O3 certificate sample, and production lead time.`,
    ].join("\n");
    openQuote("Low Iron Glass", prefillMessage);
  };

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="my-8 rounded-2xl border border-slate-700/80 bg-[#1C1F26] p-6 text-slate-100 shadow-xl">
      <div className="flex flex-col gap-6 border-b border-slate-700/80 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-block rounded-full bg-[#DAA745]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#DAA745]">
            Interactive Supplier Audit Scorecard
          </span>
          <h3 className="mt-2 text-xl font-bold text-white">
            Low Iron Glass Supplier Verification Scorer (100-Point Protocol)
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Check the evidence your candidate supplier has actually provided in writing.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3">
          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            aria-label={`Supplier verification score ${result.score} out of 100`}
            className="shrink-0"
          >
            <circle
              cx="52"
              cy="52"
              r={radius}
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            <circle
              cx="52"
              cy="52"
              r={radius}
              fill="none"
              stroke={result.ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 52 52)"
            />
            <text
              x="52"
              y="50"
              textAnchor="middle"
              className="fill-white text-2xl font-bold"
            >
              {result.score}
            </text>
            <text
              x="52"
              y="66"
              textAnchor="middle"
              className="fill-slate-400 text-[10px] font-medium"
            >
              / 100 PTS
            </text>
          </svg>
          <div className="max-w-[230px]">
            <span
              className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${result.badgeClass}`}
            >
              {result.tier.toUpperCase()}
            </span>
            <p className="mt-1.5 text-sm font-semibold text-white">{result.title}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <label
            htmlFor="audit-thickness"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            Target Glass Thickness
          </label>
          <select
            id="audit-thickness"
            aria-label="Target Glass Thickness"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus:border-[#DAA745] focus:outline-none"
          >
            <option value="6mm">6 mm Low Iron</option>
            <option value="8mm">8 mm Low Iron</option>
            <option value="10mm">10 mm Low Iron</option>
            <option value="12mm">12 mm Low Iron</option>
            <option value="15mm">15 mm Low Iron</option>
            <option value="19mm">19 mm Low Iron</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="audit-assembly"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            Processing Build-up
          </label>
          <select
            id="audit-assembly"
            aria-label="Processing Build-up"
            value={assembly}
            onChange={(e) => setAssembly(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus:border-[#DAA745] focus:outline-none"
          >
            <option value="Tempered Monolithic">Tempered Monolithic</option>
            <option value="PVB / SGP Laminated">PVB / SGP Laminated</option>
            <option value="Double / Triple IGU">Double / Triple IGU</option>
            <option value="Ceramic Frit Spandrel">Ceramic Frit Spandrel</option>
            <option value="Curved Tempered">Curved Tempered</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="audit-volume"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            Estimated Order Area (m2)
          </label>
          <input
            id="audit-volume"
            type="number"
            min={50}
            max={20000}
            step={50}
            aria-label="Estimated Order Area in square meters"
            value={volumeSqm}
            onChange={(e) => setVolumeSqm(Math.max(50, Number(e.target.value) || 50))}
            className="mt-1.5 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus:border-[#DAA745] focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {CHECKPOINTS.map((cp) => {
          const isChecked = !!checked[cp.id];
          return (
            <label
              key={cp.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                isChecked
                  ? "border-[#DAA745]/70 bg-[#DAA745]/10"
                  : "border-slate-700/80 bg-slate-900/50 hover:border-slate-500"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleItem(cp.id)}
                aria-label={cp.label}
                className="mt-1 h-4 w-4 shrink-0 accent-[#DAA745]"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DAA745]">
                    {cp.pillar}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] font-mono text-slate-300">
                    +{cp.weight} pts
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-white">{cp.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{cp.detail}</p>
              </div>
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-200">{result.summary}</p>
        <button
          type="button"
          onClick={handleRequestQuote}
          className="shrink-0 rounded-lg bg-[#DAA745] px-5 py-3 text-sm font-bold text-[#1C1F26] transition hover:bg-[#e7b95c]"
        >
          Get Factory Audit Pack &amp; Quote
        </button>
      </div>
    </div>
  );
}
