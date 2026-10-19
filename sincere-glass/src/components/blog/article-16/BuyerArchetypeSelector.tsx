"use client";

import { useState } from "react";

type ArchetypeId = "distributor" | "contractor" | "architect" | "developer";

interface Archetype {
  id: ArchetypeId;
  label: string;
  volume: string;
  frequency: string;
  priorityConcerns: string[];
  recommendedPath: string;
  readingPriority: Array<{
    rank: number;
    slug: string;
    title: string;
    whyItMatters: string;
  }>;
  avoid: string;
}

const ARCHETYPES: Archetype[] = [
  {
    id: "distributor",
    label: "Small Distributor / Importer",
    volume: "1–3 containers / order, repeating 4–8× per year",
    frequency: "Repeat buyer",
    priorityConcerns: [
      "Consistent quality batch to batch",
      "Payment terms (looking for L/C or OA, not 100% T/T)",
      "Warranty responsiveness on defective shipments",
    ],
    recommendedPath:
      "Build a long-term relationship with one or two vetted factories rather than chasing lowest unit price each cycle. Negotiate L/C at sight after the first 2 successful shipments. Volume unlocks better payment terms more reliably than it unlocks lower prices.",
    readingPriority: [
      {
        rank: 1,
        slug: "architectural-glass-supplier-china-vetting",
        title: "Supplier Vetting Threat Model",
        whyItMatters:
          "Your biggest risk is quality drift once the factory thinks you are locked in. The 5-risk framework helps you set up continuous verification, not one-time vetting.",
      },
      {
        rank: 2,
        slug: "glass-shipping-container-loading-guide",
        title: "Container Loading Playbook",
        whyItMatters:
          "You ship often. Standardize crate specs with your factory once and inspect per shipment — stops breakage from quietly climbing.",
      },
      {
        rank: 3,
        slug: "how-to-import-glass-from-china",
        title: "5-Stage Import Journey",
        whyItMatters:
          "Lighter reference since you already know the mechanics; use it to onboard new team members or expand to a second factory.",
      },
    ],
    avoid:
      "Do not stay with a factory purely because switching costs feel high. The second supplier is cheaper to onboard than the first if you have your spec, contract templates, and inspection checklist written.",
  },
  {
    id: "contractor",
    label: "General Contractor on a Single Project",
    volume: "4–20 containers over the project lifecycle",
    frequency: "One-time buyer for this project",
    priorityConcerns: [
      "On-time delivery to site (schedule risk)",
      "No defects that stop installation",
      "Clear fault-attribution if a panel fails on site",
    ],
    recommendedPath:
      "You are a schedule-driven buyer, not a volume-driven one. Pick a factory that has delivered to overseas projects your size before. Pay for a pre-shipment inspection by a third party (SGS, Bureau Veritas, Intertek) — do not skip it. Build a 2–3 week schedule buffer at the install side for a possible rework shipment.",
    readingPriority: [
      {
        rank: 1,
        slug: "how-to-import-glass-from-china",
        title: "5-Stage Import Journey",
        whyItMatters:
          "You have no second chance to learn the mechanics. The chronological walkthrough aligns to your project timeline.",
      },
      {
        rank: 2,
        slug: "glass-shipping-container-loading-guide",
        title: "Container Loading Playbook",
        whyItMatters:
          "On a one-shot project, container-level breakage is a schedule-killer. The crate specs here are what you ask the factory for in writing.",
      },
      {
        rank: 3,
        slug: "architectural-glass-supplier-china-vetting",
        title: "Supplier Vetting Threat Model",
        whyItMatters:
          "Fast version: use the 10-item scorecard, not the full threat model, and lean on third-party verification instead of in-house vetting.",
      },
    ],
    avoid:
      "Do not try to save on third-party inspection because the factory sent nice photos. A $500 pre-shipment inspection is cheap insurance against a $50,000 schedule slip.",
  },
  {
    id: "architect",
    label: "Architect / Spec Writer",
    volume: "0 — you specify, someone else purchases",
    frequency: "Repeat specifier across projects",
    priorityConcerns: [
      "Can the specified glass actually be made at the sizes you need?",
      "Will your spec survive value-engineering substitutions?",
      "Code compliance in the destination jurisdiction",
    ],
    recommendedPath:
      "Your job is to write a specification tight enough that cheaper substitutes get rejected at submittal review. Reference specific standards (IBC, EN 12150, GB 15763, AS 1288) with clause numbers. Specify tested interlayer brand (Trosifol, Eastman, Kuraray SGP) when safety-critical. Build a shortlist of factories whose capability you have verified for your firm's future specs.",
    readingPriority: [
      {
        rank: 1,
        slug: "architectural-glass-supplier-china-vetting",
        title: "Supplier Vetting Threat Model",
        whyItMatters:
          "Lets you write 'factories meeting Risk Tier 1 criteria' into your spec rather than naming brands and triggering non-collusion issues.",
      },
      {
        rank: 2,
        slug: "how-to-import-glass-from-china",
        title: "5-Stage Import Journey",
        whyItMatters:
          "Context on what your contractor will go through — lets you build realistic lead times and inspection milestones into the construction schedule.",
      },
      {
        rank: 3,
        slug: "glass-shipping-container-loading-guide",
        title: "Container Loading Playbook",
        whyItMatters:
          "Reference material. You will not run the shipping, but you will field questions from the contractor and need to know what good looks like.",
      },
    ],
    avoid:
      "Do not write 'equal or approved' without naming the standards and performance metrics the substitute must meet. That phrase alone is how spec writers lose control at value-engineering stage.",
  },
  {
    id: "developer",
    label: "Developer with Multi-Project Pipeline",
    volume: "30+ containers per year across projects",
    frequency: "Programmatic buyer",
    priorityConcerns: [
      "Preferred-supplier agreements with volume pricing",
      "Standardized spec across projects (fewer SKUs)",
      "Quality track record over 2–3 years, not one shipment",
    ],
    recommendedPath:
      "You buy enough to run a competitive two-factory setup: a primary (70% of volume) and a secondary (30%) kept warm. Standardize your glass make-ups across projects so you can negotiate volume pricing against stable SKUs. Audit factories annually in person; do not rely on self-reporting.",
    readingPriority: [
      {
        rank: 1,
        slug: "architectural-glass-supplier-china-vetting",
        title: "Supplier Vetting Threat Model",
        whyItMatters:
          "At your volume, vetting is a continuous program, not a one-time check. The threat model is the framework your sourcing team runs annually.",
      },
      {
        rank: 2,
        slug: "glass-shipping-container-loading-guide",
        title: "Container Loading Playbook",
        whyItMatters:
          "At 30+ containers/year, FCL vs LCL and insurance choices move real money. Standardize once; track breakage rate per factory monthly.",
      },
      {
        rank: 3,
        slug: "how-to-import-glass-from-china",
        title: "5-Stage Import Journey",
        whyItMatters:
          "Operational baseline. Your team should know it; you review it when onboarding a new sourcing hire.",
      },
    ],
    avoid:
      "Do not consolidate to a single factory for a 2% price advantage. One supplier with no backup is the most expensive risk in architectural glass sourcing.",
  },
];

export default function BuyerArchetypeSelector() {
  const [activeId, setActiveId] = useState<ArchetypeId>("distributor");
  const active = ARCHETYPES.find((a) => a.id === activeId) || ARCHETYPES[0];

  return (
    <div className="my-10 rounded-2xl bg-[#3A4250]/15 border border-[#3A4250]/40 p-5 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Interactive · Buyer Archetype Selector
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#F2F0ED] m-0">
          Which buyer are you? Pick your archetype for a recommended path.
        </h3>
        <p className="text-sm text-[#8B95A5] leading-relaxed mt-2 m-0">
          Volume, frequency, and project context change what you should optimize for. Pick the closest match.
        </p>
      </div>

      {/* Archetype cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
        {ARCHETYPES.map((a) => {
          const isActive = a.id === activeId;
          return (
            <button
              key={a.id}
              onClick={() => setActiveId(a.id)}
              aria-pressed={isActive}
              className={`text-left p-3 md:p-4 rounded-xl border-2 transition-all ${
                isActive
                  ? "border-[#DAA745] bg-[#DAA745]/10"
                  : "border-[#3A4250]/40 bg-[#1C1F26]/40 hover:border-[#8B95A5]/60"
              }`}
            >
              <div
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isActive ? "text-[#DAA745]" : "text-[#8B95A5]"
                }`}
              >
                {a.frequency}
              </div>
              <div
                className={`text-sm md:text-base font-bold leading-tight ${
                  isActive ? "text-[#F2F0ED]" : "text-[#F2F0ED]/80"
                }`}
              >
                {a.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active archetype detail */}
      <div
        key={active.id}
        className="bg-[#1C1F26]/60 rounded-xl p-5 md:p-6 border border-[#3A4250]/30 animate-fadeUp"
      >
        <div className="grid md:grid-cols-2 gap-4 mb-5 pb-5 border-b border-[#3A4250]/30">
          <div>
            <div className="text-xs text-[#8B95A5]/60 uppercase tracking-wider mb-1">
              Typical volume
            </div>
            <div className="text-sm text-[#F2F0ED]">{active.volume}</div>
          </div>
          <div>
            <div className="text-xs text-[#8B95A5]/60 uppercase tracking-wider mb-1">
              Priority concerns
            </div>
            <ul className="space-y-0.5 list-none pl-0 m-0">
              {active.priorityConcerns.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-[#F2F0ED]/90"
                >
                  <span className="text-[#DAA745] flex-shrink-0">·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
            Recommended path
          </div>
          <p className="text-sm text-[#F2F0ED]/90 leading-relaxed m-0">
            {active.recommendedPath}
          </p>
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-3">
            Your reading priority
          </div>
          <ol className="space-y-3 list-none pl-0 m-0">
            {active.readingPriority.map((item) => (
              <li
                key={item.rank}
                className="flex gap-3 p-3 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/30"
              >
                <div className="w-7 h-7 rounded-full bg-[#DAA745] text-[#1C1F26] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {item.rank}
                </div>
                <div className="flex-1">
                  <a
                    href={`/blog/${item.slug}`}
                    className="text-sm font-semibold text-[#F2F0ED] hover:text-[#DAA745] transition-colors no-underline block mb-1"
                  >
                    {item.title} →
                  </a>
                  <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
                    {item.whyItMatters}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-3 rounded-lg bg-[#DAA745]/5 border border-[#DAA745]/20">
          <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-1">
            One thing to avoid
          </div>
          <p className="text-xs text-[#F2F0ED]/90 leading-relaxed m-0">
            {active.avoid}
          </p>
        </div>
      </div>
    </div>
  );
}
