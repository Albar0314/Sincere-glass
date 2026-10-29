"use client";

import { useState, useMemo } from "react";

type Method = {
  key: string;
  name: string;
  shortName: string;
  description: string;
  durability: number; // 1-5
  colorStability: number;
  thermalRisk: number; // 1-5, higher = worse
  lowEOk: boolean;
  fieldRepair: "yes" | "limited" | "no";
  relativeCost: number; // 1-5
  bestFor: string;
  avoidFor: string;
  reference: string;
};

const METHODS: Method[] = [
  {
    key: "ceramic-frit",
    name: "Ceramic Frit Back Coating",
    shortName: "Ceramic Frit",
    description:
      "Inorganic glass-ceramic enamel screen-printed onto the #4 surface, then fused during tempering. Becomes permanently part of the glass.",
    durability: 5,
    colorStability: 5,
    thermalRisk: 4,
    lowEOk: true,
    fieldRepair: "no",
    relativeCost: 3,
    bestFor:
      "Permanent high-rise curtain-wall spandrel where UV exposure, cleaning chemicals and 25+ year service life are expected.",
    avoidFor:
      "Projects requiring field color changes or very low thermal-stress tolerance without heat-soak treatment.",
    reference: "ASTM C1048 (heat-strengthened or tempered); EN 12150; GB 17841",
  },
  {
    key: "silicone-opacifier",
    name: "Silicone Opacifier Film",
    shortName: "Silicone Film",
    description:
      "Factory-applied silicone-based opaque film laminated to the back face. Flexible, allows some differential expansion between glass and backing.",
    durability: 4,
    colorStability: 4,
    thermalRisk: 2,
    lowEOk: true,
    fieldRepair: "limited",
    relativeCost: 3,
    bestFor:
      "Spandrel positions with high thermal exposure (south/west elevations, insulated backing) where thermal stress must be minimized.",
    avoidFor:
      "Deep-color saturation requirements where frit's full-chroma palette is specified.",
    reference: "ASTM C1368 (surface quality); project-specific film data sheets",
  },
  {
    key: "painted-back",
    name: "Painted Back (Polyester / PU)",
    shortName: "Painted",
    description:
      "Factory-sprayed polyester or polyurethane coating on the back face. Lower cost but less durable than frit.",
    durability: 3,
    colorStability: 3,
    thermalRisk: 3,
    lowEOk: true,
    fieldRepair: "limited",
    relativeCost: 2,
    bestFor:
      "Low- to mid-rise projects, interior applications, or temporary installations where lifecycle matches a 10-15 year horizon.",
    avoidFor:
      "High-UV facades, buildings expecting 25+ year cladding warranties, or climates with large thermal swings.",
    reference: "AAMA 2605 (high-performance organic coatings); ISO 2812",
  },
  {
    key: "imp-panel",
    name: "Insulated Spandrel Panel (IMP)",
    shortName: "IMP",
    description:
      "Composite assembly: glass face + mineral-wool or rigid insulation + metal back pan. Delivers thermal performance from the spandrel itself.",
    durability: 5,
    colorStability: 5,
    thermalRisk: 2,
    lowEOk: true,
    fieldRepair: "no",
    relativeCost: 5,
    bestFor:
      "Energy-code-driven projects (ASHRAE 90.1, Title 24) where spandrel R-value must match or supplement vision-glass U-value targets.",
    avoidFor:
      "Budget-constrained builds, or where spandrel depth would conflict with floor-slab or shear-wall thickness.",
    reference: "NFRC 100 (U-factor); ASHRAE 90.1 §5.5; UL 263 (fire)",
  },
];

type SortKey =
  | "default"
  | "durability"
  | "colorStability"
  | "thermalRisk"
  | "relativeCost";

const COLUMN_LABELS: Record<SortKey, string> = {
  default: "Method",
  durability: "Durability",
  colorStability: "Color Stability (UV)",
  thermalRisk: "Thermal Stress Risk",
  relativeCost: "Relative Cost",
};

function Dots({ value, inverse = false }: { value: number; inverse?: boolean }) {
  // inverse: higher score = worse (for thermal risk / cost)
  return (
    <div className="flex gap-0.5" aria-label={`${value} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`inline-block h-1.5 w-3 rounded-sm ${
            i <= value
              ? inverse
                ? value >= 4
                  ? "bg-red-500"
                  : value >= 3
                  ? "bg-amber-500"
                  : "bg-green-500"
                : "bg-brand-accent"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function ConstructionMethodMatrix() {
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [expanded, setExpanded] = useState<string | null>("ceramic-frit");

  const sorted = useMemo(() => {
    if (sortKey === "default") return METHODS;
    return [...METHODS].sort((a, b) => {
      if (sortKey === "thermalRisk" || sortKey === "relativeCost") {
        return a[sortKey] - b[sortKey]; // ascending = better first
      }
      return b[sortKey] - a[sortKey]; // descending = better first
    });
  }, [sortKey]);

  return (
    <div className="my-10 rounded-2xl border border-brand-secondary/20 bg-white dark:bg-brand-dark p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h4 className="text-xl font-bold text-brand-primary dark:text-brand-light">
            Spandrel Construction Method Matrix
          </h4>
          <p className="mt-1 text-sm text-brand-secondary">
            Click a column header to sort. Click a row to expand application notes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(COLUMN_LABELS) as SortKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setSortKey(k)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                sortKey === k
                  ? "bg-brand-primary text-white dark:bg-brand-accent dark:text-brand-dark"
                  : "bg-gray-100 text-brand-primary hover:bg-gray-200 dark:bg-brand-dark/60 dark:text-brand-light"
              }`}
            >
              Sort: {COLUMN_LABELS[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-sm"
          aria-label="Comparison of four spandrel glass construction methods across seven engineering and commercial dimensions"
        >
          <caption className="sr-only">
            Spandrel construction methods compared on durability, color stability, thermal stress risk, Low-E compatibility, field repairability, and relative cost. Data verified: 2026-10-29.
          </caption>
          <thead>
            <tr className="border-b-2 border-brand-primary/20">
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                Method
              </th>
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                Durability
              </th>
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                UV Color
              </th>
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                Thermal Risk
              </th>
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                Low-E OK
              </th>
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                Field Repair
              </th>
              <th scope="col" className="py-3 text-left font-semibold text-brand-primary dark:text-brand-light">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => {
              const isOpen = expanded === m.key;
              return (
                <>
                  <tr
                    key={m.key}
                    onClick={() => setExpanded(isOpen ? null : m.key)}
                    className={`cursor-pointer border-b border-brand-secondary/15 transition ${
                      isOpen
                        ? "bg-brand-accent/10 dark:bg-brand-accent/15"
                        : "hover:bg-gray-50 dark:hover:bg-brand-dark/40"
                    }`}
                  >
                    <th scope="row" className="py-3 pr-3 text-left align-middle font-semibold text-brand-primary dark:text-brand-light">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block transition-transform ${isOpen ? "rotate-90" : ""}`} aria-hidden>
                          ▸
                        </span>
                        {m.shortName}
                      </div>
                    </th>
                    <td className="py-3"><Dots value={m.durability} /></td>
                    <td className="py-3"><Dots value={m.colorStability} /></td>
                    <td className="py-3"><Dots value={m.thermalRisk} inverse /></td>
                    <td className="py-3 text-center">
                      {m.lowEOk ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-200">
                          ✓
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/40 dark:text-red-200">
                          ✗
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-xs capitalize text-brand-secondary">
                      {m.fieldRepair}
                    </td>
                    <td className="py-3"><Dots value={m.relativeCost} inverse /></td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-brand-secondary/15 bg-brand-accent/5 dark:bg-brand-accent/10">
                      <td colSpan={7} className="px-3 py-5">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                              How it works
                            </div>
                            <p className="text-sm leading-relaxed text-brand-primary dark:text-brand-light">
                              {m.description}
                            </p>
                          </div>
                          <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                              Best for
                            </div>
                            <p className="text-sm leading-relaxed text-brand-primary dark:text-brand-light">
                              {m.bestFor}
                            </p>
                          </div>
                          <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
                              Avoid when
                            </div>
                            <p className="text-sm leading-relaxed text-brand-primary dark:text-brand-light">
                              {m.avoidFor}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 border-t border-brand-secondary/15 pt-3 text-xs text-brand-secondary">
                          <span className="font-semibold">Reference standards:</span> {m.reference}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
