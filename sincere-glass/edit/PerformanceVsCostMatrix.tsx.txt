"use client";
import { useState } from "react";

type Interlayer = "pvb" | "acoustic" | "sgp";

interface MetricRow {
  id: string;
  label: string;
  unit: string;
  description: string;
  values: Record<Interlayer, number>;
  displayValues: Record<Interlayer, string>;
  higherIsBetter: boolean;
}

const INTERLAYER_META: Record<
  Interlayer,
  { label: string; color: string; costX: string }
> = {
  "pvb": {
    label: "Standard PVB",
    color: "#8B95A5",
    costX: "1.0x cost",
  },
  "acoustic": {
    label: "Acoustic PVB",
    color: "#C4952E",
    costX: "1.3x cost",
  },
  "sgp": {
    label: "SGP ionoplast",
    color: "#DAA745",
    costX: "4.3x cost (interlayer only)",
  },
};

const METRICS: MetricRow[] = [
  {
    id: "retention",
    label: "Post-breakage retention",
    unit: "minutes rigid",
    description:
      "How long a doubly-cracked panel stays rigid without sagging, bench test at 23 °C.",
    values: { pvb: 20, acoustic: 20, sgp: 240 },
    displayValues: {
      pvb: "~20 min",
      acoustic: "~20 min",
      sgp: "4 h+ (rigid)",
    },
    higherIsBetter: true,
  },
  {
    id: "shear",
    label: "Shear modulus (24 h / 23 °C)",
    unit: "MPa",
    description:
      "Long-duration stiffness. Decides whether the laminate acts as a composite plate or two slipped sheets.",
    values: { pvb: 0.6, acoustic: 0.4, sgp: 85 },
    displayValues: { pvb: "0.6 MPa", acoustic: "0.4 MPa", sgp: "85 MPa" },
    higherIsBetter: true,
  },
  {
    id: "edge",
    label: "Edge weathering (humid, exposed)",
    unit: "years to visible delamination",
    description:
      "Open-edge service life before delamination becomes visible, humid or coastal exposure.",
    values: { pvb: 6, acoustic: 5, sgp: 22 },
    displayValues: {
      pvb: "~6 yr",
      acoustic: "~5 yr",
      sgp: "20 yr+",
    },
    higherIsBetter: true,
  },
  {
    id: "stc",
    label: "STC rating (6+interlayer+6)",
    unit: "dB",
    description:
      "Sound Transmission Class at the reference 6+6 build-up. Higher = quieter.",
    values: { pvb: 36, acoustic: 39, sgp: 35 },
    displayValues: { pvb: "36 dB", acoustic: "39 dB", sgp: "35 dB" },
    higherIsBetter: true,
  },
  {
    id: "cost",
    label: "Interlayer material cost",
    unit: "USD/m² (interlayer only)",
    description:
      "FOB China 2026 index, interlayer material only (not finished laminate).",
    values: { pvb: 3, acoustic: 5, sgp: 13 },
    displayValues: { pvb: "$3", acoustic: "$5", sgp: "$13" },
    higherIsBetter: false,
  },
];

const INTERLAYER_KEYS: Interlayer[] = ["pvb", "acoustic", "sgp"];

export default function PerformanceVsCostMatrix() {
  const [active, setActive] = useState<Interlayer | null>(null);

  function barWidthPct(metric: MetricRow, type: Interlayer): number {
    const vals = INTERLAYER_KEYS.map((k) => metric.values[k]);
    const max = Math.max(...vals);
    if (max === 0) return 0;
    const v = metric.values[type];
    // Log-ish scaling for shear modulus so PVB bars remain visible
    if (metric.id === "shear") {
      const logMax = Math.log10(max + 1);
      const logV = Math.log10(v + 1);
      return (logV / logMax) * 100;
    }
    return (v / max) * 100;
  }

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Performance × Cost Matrix
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          What each interlayer actually delivers for its price
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Five metrics on one axis, three interlayers on the other. SGP wins on
          structural and durability metrics by a factor of 10 to 100; acoustic
          PVB wins on STC; standard PVB wins on cost. Click a column header to
          highlight that interlayer across every row.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4 sticky top-0">
        <div className="text-xs text-[#8B95A5] uppercase tracking-wider self-end pb-2">
          Metric
        </div>
        {INTERLAYER_KEYS.map((k) => (
          <button
            key={k}
            onClick={() => setActive(active === k ? null : k)}
            className={`px-3 py-3 rounded-lg text-xs font-semibold text-left transition-colors border ${
              active === k
                ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]"
                : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"
            }`}
          >
            <div className="font-bold">{INTERLAYER_META[k].label}</div>
            <div
              className={`text-[11px] mt-1 font-normal ${
                active === k ? "text-[#1C1F26]/70" : "text-[#8B95A5]"
              }`}
            >
              {INTERLAYER_META[k].costX}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {METRICS.map((m) => (
          <div key={m.id}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-sm font-semibold text-[#F2F0ED]">
                {m.label}
              </div>
              <div className="text-[11px] text-[#8B95A5] italic">{m.unit}</div>
            </div>
            <p className="text-xs text-[#8B95A5] m-0 mb-3">{m.description}</p>
            <div className="grid grid-cols-4 gap-2 items-center">
              <div className="text-[11px] text-[#8B95A5] uppercase tracking-wider">
                Value
              </div>
              {INTERLAYER_KEYS.map((k) => {
                const dimmed = active !== null && active !== k;
                return (
                  <div
                    key={k}
                    className={`transition-opacity ${
                      dimmed ? "opacity-30" : "opacity-100"
                    }`}
                  >
                    <div className="h-6 rounded bg-[#3A4250]/30 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded transition-all duration-500"
                        style={{
                          width: `${barWidthPct(m, k)}%`,
                          backgroundColor: INTERLAYER_META[k].color,
                        }}
                      />
                    </div>
                    <div className="text-xs font-mono text-[#F2F0ED] mt-1">
                      {m.displayValues[k]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#8B95A5] italic mt-6 m-0">
        Shear modulus bar uses log scaling so PVB values remain visible against
        SGP. All other metrics are linearly scaled against the row maximum.
        Values are typical factory bench references, not design values.
      </p>
    </div>
  );
}
