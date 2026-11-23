"use client";

import React, { useState } from "react";

interface RedFlag {
  id: string;
  signal: string;
  severity: "Critical" | "High";
  rootCause: string;
  verificationTest: string;
  contractClause: string;
}

const RED_FLAGS: RedFlag[] = [
  {
    id: "low-premium",
    signal: "Quote is only 10%-15% above standard clear float",
    severity: "Critical",
    rootCause:
      "True low-iron raw float (Fe2O3 < 0.010%) costs 60%-90% more at the furnace, yielding a 30%-60% finished panel premium. A 10%-15% delta almost always means semi-low-iron (0.04%-0.06% Fe2O3) or standard clear glass substitution.",
    verificationTest:
      "Request a 300 x 300 mm polished-edge sample alongside a standard clear control sample, plus the float mill chemical assay showing Fe2O3 <= 0.010%.",
    contractClause:
      "\"Substrate shall be Tier-1 ultra-clear float glass per GB 11614-2022 with Fe2O3 <= 0.010% and 6 mm VLT >= 90.5%. Substituted semi-clear glass is grounds for full rejection.\"",
  },
  {
    id: "no-mill-cert",
    signal: "Supplier refuses to name the upstream float mill",
    severity: "Critical",
    rootCause:
      "The vendor is either a broker buying spot remnants from multiple regional mills or mixing off-spec transition glass cut during a furnace color changeover.",
    verificationTest:
      "Require the raw jumbo pack label photo (showing mill name, batch date, and thickness) before cutting starts.",
    contractClause:
      "\"Supplier shall provide upstream float mill batch certificate and raw-crate label photographs prior to CNC cutting.\"",
  },
  {
    id: "mixed-lots",
    signal: "No single-batch commitment on multi-container facade orders",
    severity: "High",
    rootCause:
      "Different float mills use slightly different decolorizer chemistry (subtle pale blue vs. neutral ice-white edge). Mixing lots on one elevation creates visible checkerboard shading.",
    verificationTest:
      "Check edge color side-by-side under 6500K D65 daylight against a matte white background before approving shipment.",
    contractClause:
      "\"All panels assigned to the same building elevation shall be fabricated from a single float mill campaign lot.\"",
  },
  {
    id: "fake-brand",
    signal: "Claims Vitro Starphire or Pilkington Optiwhite at Chinese float pricing",
    severity: "Critical",
    rootCause:
      "Imported branded low-iron float carries a 20%-40% landed surcharge in China. Unusually cheap 'Starphire' quotes are mislabeled domestic float.",
    verificationTest:
      "If branded substrate is legally required by the architect, demand the official mill bill of lading and authorized distributor letter. Otherwise specify verified Chinese Tier-1 low-iron float transparently.",
    contractClause:
      "\"Float substrate brand shall be explicitly stated on the Proforma Invoice; 'or approved equal' substitutions require prior written architect sign-off.\"",
  },
  {
    id: "no-hst-log",
    signal: "Offers Heat Soak Testing as a checkbox with zero kiln telemetry",
    severity: "High",
    rootCause:
      "Low-iron glass still contains trace nickel sulfide risk when tempered. Shops without a calibrated EN 14179-1:2016 kiln sometimes skip the 2-hour 290 C soak to save energy.",
    verificationTest:
      "Demand time-temperature thermocouple charts stamped with batch number and kiln ID for every HST load.",
    contractClause:
      "\"Heat soak testing shall comply with EN 14179-1:2016 (290 C +/- 10 C holding phase for 2 hours) with signed thermocouple chart per kiln load.\"",
  },
  {
    id: "weak-crating",
    signal: "Quotes EXW or FOB with generic 'wood crate' description",
    severity: "High",
    rootCause:
      "Non-ISPM-15 solid wood triggers quarantine destruction at US, EU, and Australian ports; inadequate A-frame bracing causes 10%-15% transit breakage on heavy 12-19 mm panels.",
    verificationTest:
      "Ask for loading photos of previous 20'GP/40'OT shipments showing steel strapping, cork pads, desiccant bags, and visible IPPC stamps.",
    contractClause:
      "\"Export crates shall be ISPM-15 certified plywood/steel end-cap A-frames with cork interleaving, moisture desiccant, and 2%-3% spare panels included.\"",
  },
];

export default function LowIronRedFlagDiagnostic() {
  const [selectedId, setSelectedId] = useState<string>(RED_FLAGS[0].id);
  const activeFlag = RED_FLAGS.find((f) => f.id === selectedId) || RED_FLAGS[0];

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
          Procurement Red-Flag Diagnostic
        </span>
        <h3 className="mt-2 text-lg font-bold text-slate-900">
          6 Low Iron Glass Sourcing Traps &amp; How to Block Them in Your Contract
        </h3>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-2 lg:col-span-5" role="listbox" aria-label="Low iron glass supplier red flags">
          {RED_FLAGS.map((flag) => {
            const isSelected = flag.id === activeFlag.id;
            return (
              <button
                key={flag.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => setSelectedId(flag.id)}
                className={`rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                  isSelected
                    ? "border-[#1C1F26] bg-[#1C1F26] font-semibold text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <span
                  className={`mr-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                    flag.severity === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-amber-500/20 text-amber-500"
                  }`}
                >
                  {flag.severity}
                </span>
                {flag.signal}
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-7">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <h4 className="text-base font-bold text-slate-900">{activeFlag.signal}</h4>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                activeFlag.severity === "Critical"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {activeFlag.severity} Risk
            </span>
          </div>

          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Why This Happens
              </p>
              <p className="mt-1 leading-relaxed text-slate-700">{activeFlag.rootCause}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pre-Deposit Verification Test
              </p>
              <p className="mt-1 leading-relaxed text-slate-700">{activeFlag.verificationTest}</p>
            </div>

            <div className="rounded-lg border-l-4 border-[#DAA745] bg-slate-900 p-3.5 text-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-[#DAA745]">
                Copy-Paste Proforma Invoice Clause
              </p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-slate-200">
                {activeFlag.contractClause}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
