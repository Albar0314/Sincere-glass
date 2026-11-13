"use client";

import { useState } from "react";

// U-Factor <-> R-Value converter with US/metric unit toggle and a reference ladder.
// US U-factor units: Btu/(h.ft2.F). Metric U-value units: W/(m2.K). 1 US unit = 5.678 metric.
// R-value (US) = 1 / U(US). Defaults render real numbers at SSR (no-JS crawlers see output).
// ASCII-only body. No backticks, no template interpolation (safe to embed in deploy script).

const US_TO_SI = 5.678;

type Unit = "us" | "si";

interface LadderRow {
  label: string;
  uUs: number;
}

const LADDER: LadderRow[] = [
  { label: "Single pane, clear", uUs: 1.04 },
  { label: "Double pane, clear air", uUs: 0.48 },
  { label: "Double pane, Low-E + argon", uUs: 0.28 },
  { label: "Triple pane, 2x Low-E + argon", uUs: 0.15 },
  { label: "Passive House target", uUs: 0.14 },
];

function round(n: number, d: number): number {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
}

function tabBtn(active: boolean) {
  return {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #2A2E37",
    background: active ? "#C9A227" : "transparent",
    color: active ? "#13161C" : "#E6E8EC",
    cursor: "pointer",
    fontWeight: 600,
  } as const;
}

export default function UFactorRValueConverter() {
  const [uUs, setUUs] = useState<number>(0.3);
  const [unit, setUnit] = useState<Unit>("us");

  const uShown = unit === "us" ? uUs : round(uUs * US_TO_SI, 2);
  const uUnitLabel = unit === "us" ? "Btu/(h.ft2.F)" : "W/(m2.K)";
  const rShown = unit === "us" ? round(1 / uUs, 2) : round(1 / (uUs * US_TO_SI), 3);
  const rUnitLabel = unit === "us" ? "h.ft2.F/Btu" : "m2.K/W";

  let verdict = "";
  if (uUs <= 0.14) {
    verdict =
      "Passive House class. If you need this number, you are specifying triple pane with two Low-E coatings and argon or krypton fill.";
  } else if (uUs <= 0.3) {
    verdict =
      "Code-plus performance. A double pane Low-E argon IGU reaches this range and satisfies most IECC climate zones.";
  } else if (uUs <= 0.5) {
    verdict =
      "Baseline double pane. Acceptable in mild zones; upgrade the Low-E coating before you pay for a third pane.";
  } else {
    verdict =
      "Single pane territory. Any insulated glass unit is a large improvement from here.";
  }

  return (
    <div
      style={{
        border: "1px solid #2A2E37",
        borderRadius: 12,
        padding: 20,
        background: "#13161C",
        color: "#E6E8EC",
        margin: "24px 0",
      }}
    >
      <div
        style={{
          fontSize: 13,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#9AA0AA",
          marginBottom: 12,
        }}
      >
        U-Factor to R-Value Converter
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => setUnit("us")} style={tabBtn(unit === "us")}>
          US (U-Factor)
        </button>
        <button type="button" onClick={() => setUnit("si")} style={tabBtn(unit === "si")}>
          Metric (U-Value)
        </button>
      </div>

      <label style={{ display: "block", fontSize: 14, color: "#9AA0AA", marginBottom: 6 }}>
        Drag to set U-factor (US units): {uUs.toFixed(2)}
      </label>
      <input
        type="range"
        min={0.1}
        max={1.1}
        step={0.01}
        value={uUs}
        onChange={(e) => setUUs(parseFloat(e.target.value))}
        style={{ width: "100%", marginBottom: 20 }}
        aria-label="U-factor in US units"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: "#0D0F13", borderRadius: 10, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#9AA0AA" }}>U-value shown</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#C9A227" }}>{uShown}</div>
          <div style={{ fontSize: 11, color: "#6B717B" }}>{uUnitLabel}</div>
        </div>
        <div style={{ background: "#0D0F13", borderRadius: 10, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#9AA0AA" }}>Equivalent R-value</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#E6E8EC" }}>{rShown}</div>
          <div style={{ fontSize: 11, color: "#6B717B" }}>{rUnitLabel}</div>
        </div>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#C3C7CE", margin: "0 0 16px" }}>{verdict}</p>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #2A2E37", color: "#9AA0AA", textAlign: "left" }}>
            <th style={{ padding: "6px 4px" }}>Glass build-up</th>
            <th style={{ padding: "6px 4px" }}>U-factor (US)</th>
            <th style={{ padding: "6px 4px" }}>R-value</th>
          </tr>
        </thead>
        <tbody>
          {LADDER.map((row) => (
            <tr key={row.label} style={{ borderBottom: "1px solid #1C1F26" }}>
              <td style={{ padding: "6px 4px" }}>{row.label}</td>
              <td style={{ padding: "6px 4px", color: "#C9A227" }}>{row.uUs.toFixed(2)}</td>
              <td style={{ padding: "6px 4px" }}>{round(1 / row.uUs, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: 11, color: "#6B717B", margin: "12px 0 0" }}>
        Reference values only; whole-window U-factor varies with frame and size. Sincere Glass
        center-of-glass data, 2024 Q1 - 2026 Q3.
      </p>
    </div>
  );
}
