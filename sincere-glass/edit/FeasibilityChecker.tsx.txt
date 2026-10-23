"use client";

import { useMemo, useState } from "react";

/**
 * Three-input feasibility checker: thickness (6-19 mm), radius (300-10000 mm),
 * and finished panel size (W × H in mm). Returns a verdict (Available /
 * Borderline / Not available), the recommended process (cold-bend, standard
 * hot-bend, hot-bend with custom mold), the expected tolerance, and an
 * indicative lead time. Enforces our 500 mm minimum radius and
 * 3300 mm × 15000 mm panel ceiling as hard rules. All logic runs client-side;
 * no data leaves the browser.
 */

type Verdict = "available" | "borderline" | "unavailable";

type Result = {
  verdict: Verdict;
  verdictLabel: string;
  verdictColor: string;
  process: string;
  tolerance: string;
  leadTime: string;
  notes: string[];
};

// Minimum radius achievable per thickness (empirical, Sincere Glass facility)
const MIN_R_BY_THICKNESS: Record<number, number> = {
  6: 500,
  8: 700,
  10: 900,
  12: 1200,
  15: 1800,
  19: 2500,
};

const MAX_W = 3300;
const MAX_H = 15000;

function evaluate(thickness: number, radius: number, w: number, h: number): Result {
  const notes: string[] = [];
  const longSide = Math.max(w, h);
  const shortSide = Math.min(w, h);
  const minR = MIN_R_BY_THICKNESS[thickness] || 500;

  // Hard failures
  if (longSide > MAX_H || shortSide > MAX_W) {
    return {
      verdict: "unavailable",
      verdictLabel: "Beyond our capacity",
      verdictColor: "#dc2626",
      process: "N/A",
      tolerance: "N/A",
      leadTime: "N/A",
      notes: [
        "Panel exceeds our 3,300 mm × 15,000 mm production envelope.",
        "Consider splitting into multiple panels with structural silicone joints.",
      ],
    };
  }

  if (radius < 500) {
    return {
      verdict: "unavailable",
      verdictLabel: "Below minimum radius",
      verdictColor: "#dc2626",
      process: "N/A",
      tolerance: "N/A",
      leadTime: "N/A",
      notes: [
        "Our minimum achievable radius is 500 mm (6 mm panels only).",
        "A tighter curve requires acrylic, polycarbonate, or a two-piece faceted build.",
      ],
    };
  }

  if (radius < minR) {
    return {
      verdict: "unavailable",
      verdictLabel: "Radius too tight for this thickness",
      verdictColor: "#dc2626",
      process: "N/A",
      tolerance: "N/A",
      leadTime: "N/A",
      notes: [
        `A ${thickness} mm panel cannot bend tighter than ${minR} mm radius.`,
        `Try a thinner panel (${thickness > 6 ? thickness - 2 + " mm or less" : "6 mm"}) to reach this radius.`,
      ],
    };
  }

  // Determine process
  let process: string;
  let tolerance: string;
  let leadTime: string;

  if (radius < 800) {
    process = "Hot-bending with dedicated steel mold";
    tolerance = "±2 mm on chord, ±1° on angle";
    leadTime = "25-35 days (includes mold setup)";
    notes.push("Mold is reusable — repeat orders at the same radius have shorter lead time.");
  } else if (radius < 3000) {
    process = "Standard hot-bending furnace";
    tolerance = "±3 mm on chord, ±1° on angle";
    leadTime = "15-25 days";
  } else if (radius < 5000) {
    process = "Hot-bending or cold-bending (project dependent)";
    tolerance = "±3 mm on chord";
    leadTime = "15-25 days hot-bend / 10-20 days cold-bend";
    notes.push("For shallow curves on-site cold-bending is usually more economical.");
  } else {
    process = "Cold-bending on site";
    tolerance = "±5 mm (installed condition)";
    leadTime = "10-20 days (flat panel production + framing)";
    notes.push("Cold-bending bends a flat panel against a curved frame during installation.");
  }

  // Borderline flags
  let verdict: Verdict = "available";
  let verdictLabel = "Available";
  let verdictColor = "#059669";

  if (longSide > MAX_H * 0.9 || shortSide > MAX_W * 0.9) {
    verdict = "borderline";
    verdictLabel = "Available with constraints";
    verdictColor = "#DAA745";
    notes.push("Panel approaches our size ceiling — final confirmation required against current furnace schedule.");
  }
  if (radius <= minR + 100) {
    verdict = "borderline";
    verdictLabel = "Available with constraints";
    verdictColor = "#DAA745";
    notes.push("Radius is near the thickness limit — a sample bend is recommended before production run.");
  }

  if (notes.length === 0 && verdict === "available") {
    notes.push("No manufacturing constraints detected. Standard quote applies.");
  }

  return { verdict, verdictLabel, verdictColor, process, tolerance, leadTime, notes };
}

export default function FeasibilityChecker() {
  const [thickness, setThickness] = useState<number>(10);
  const [radius, setRadius] = useState<number>(1500);
  const [width, setWidth] = useState<number>(1200);
  const [height, setHeight] = useState<number>(2400);

  const result = useMemo(() => evaluate(thickness, radius, width, height), [thickness, radius, width, height]);

  return (
    <div className="rounded-2xl bg-brand-dark text-white p-6 md:p-8 shadow-xl">
      <div className="mb-6">
        <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-2">
          Feasibility Checker
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-white">
          Can we make it? Try your spec.
        </h3>
        <p className="text-sm text-white/60 mt-2">
          Enter thickness, radius, and finished size. The checker returns the recommended process, tolerance, and lead-time range in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
              Glass thickness
            </label>
            <div className="flex flex-wrap gap-2">
              {[6, 8, 10, 12, 15, 19].map((t) => (
                <button
                  key={t}
                  onClick={() => setThickness(t)}
                  className={
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors " +
                    (thickness === t
                      ? "bg-brand-accent text-brand-dark"
                      : "bg-white/10 text-white/70 hover:bg-white/15")
                  }
                >
                  {t} mm
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
              Curve radius: <span className="text-brand-accent">{radius} mm</span>
            </label>
            <input
              type="range"
              min={300}
              max={10000}
              step={50}
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value, 10))}
              className="w-full accent-brand-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/40 mt-1">
              <span>300</span>
              <span>5000</span>
              <span>10000</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
                Width (mm)
              </label>
              <input
                type="number"
                value={width}
                min={100}
                max={5000}
                onChange={(e) => setWidth(Math.max(100, parseInt(e.target.value, 10) || 0))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">
                Height (mm)
              </label>
              <input
                type="number"
                value={height}
                min={100}
                max={20000}
                onChange={(e) => setHeight(Math.max(100, parseInt(e.target.value, 10) || 0))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>
          <p className="text-[11px] text-white/40">
            Our envelope: 3,300 mm × 15,000 mm (per panel). Larger assemblies are built from multiple panels.
          </p>
        </div>

        {/* Result */}
        <div
          className="rounded-xl p-5 border-l-4"
          style={{ borderLeftColor: result.verdictColor, backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: result.verdictColor, backgroundColor: result.verdictColor + "22" }}
          >
            {result.verdictLabel}
          </div>

          <div className="space-y-3 mt-2">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                Recommended process
              </p>
              <p className="text-sm text-white font-medium mt-0.5">{result.process}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                  Tolerance
                </p>
                <p className="text-sm text-white/90 mt-0.5">{result.tolerance}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                  Lead time
                </p>
                <p className="text-sm text-white/90 mt-0.5">{result.leadTime}</p>
              </div>
            </div>
            {result.notes.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-2">
                  Notes
                </p>
                <ul className="space-y-1.5">
                  {result.notes.map((n, i) => (
                    <li key={i} className="text-sm text-white/80 flex items-start gap-2 leading-relaxed">
                      <span className="text-brand-accent mt-0.5">·</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-[11px] text-white/40 leading-relaxed">
        Estimates reflect typical production conditions in our Hubei facility. Final confirmation requires drawing review.
        Data verified: 2026-10-23.
      </p>
    </div>
  );
}
