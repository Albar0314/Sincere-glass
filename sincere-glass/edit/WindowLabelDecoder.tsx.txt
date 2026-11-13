"use client";

import { useState } from "react";

// Interactive NFRC-style window label. Click a metric cell to decode what the number means
// and what a good range looks like. Default selection is U-Factor, so SSR shows a real panel.
// ASCII-only body. No backticks, no template interpolation.

type Key = "u" | "shgc" | "vt" | "al" | "cr";

interface Metric {
  key: Key;
  name: string;
  value: string;
  blurb: string;
  scale: string;
}

const METRICS: Metric[] = [
  {
    key: "u",
    name: "U-Factor",
    value: "0.30",
    blurb:
      "How fast the whole window loses heat. Lower is better. This is the number that decides winter comfort and heating bills.",
    scale: "Scale 0.10 (best) to 1.20 (single pane). Code minimum in cold US zones is near 0.30.",
  },
  {
    key: "shgc",
    name: "SHGC",
    value: "0.25",
    blurb:
      "Solar Heat Gain Coefficient: the fraction of the sun's heat that gets through. Lower keeps you cooler in summer; higher helps in cold climates.",
    scale: "Scale 0 to 1. Hot climates want 0.25 or less; cold-climate south glass can use 0.40 or more.",
  },
  {
    key: "vt",
    name: "VT",
    value: "0.51",
    blurb:
      "Visible Transmittance: how much daylight comes through. Higher means a brighter room. A good Low-E coating keeps VT high while cutting SHGC.",
    scale: "Scale 0 to 1. Clear double glazing is around 0.50 to 0.70.",
  },
  {
    key: "al",
    name: "Air Leakage",
    value: "0.20",
    blurb:
      "Air forced through the assembly under pressure. Lower is tighter. Optional on the label and set by the frame, not the glass.",
    scale: "Scale: code caps near 0.30; 0.20 and below is good.",
  },
  {
    key: "cr",
    name: "Condensation Resistance",
    value: "55",
    blurb:
      "How well the window resists interior condensation. Higher resists better. Optional, and driven mostly by edge spacer and frame.",
    scale: "Scale 1 to 100.",
  },
];

function cell(active: boolean) {
  return {
    flex: "1 1 90px",
    textAlign: "center" as const,
    padding: "10px 6px",
    borderRadius: 8,
    border: active ? "1px solid #C9A227" : "1px solid #2A2E37",
    background: active ? "#1E2128" : "#0D0F13",
    cursor: "pointer",
  };
}

export default function WindowLabelDecoder() {
  const [sel, setSel] = useState<Key>("u");
  const active = METRICS.find((m) => m.key === sel) || METRICS[0];

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
        Decode a Window Label (click a number)
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {METRICS.map((m) => (
          <div
            key={m.key}
            role="button"
            tabIndex={0}
            onClick={() => setSel(m.key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSel(m.key);
            }}
            style={cell(m.key === sel)}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: "#C9A227" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "#9AA0AA", marginTop: 2 }}>{m.name}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0D0F13", borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
          {active.name} = {active.value}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#C3C7CE", margin: "0 0 8px" }}>
          {active.blurb}
        </p>
        <p style={{ fontSize: 13, color: "#9AA0AA", margin: 0 }}>{active.scale}</p>
      </div>

      <p style={{ fontSize: 11, color: "#6B717B", margin: "12px 0 0" }}>
        Sample values shown for a typical double pane Low-E argon IGU. U-Factor and SHGC are the two
        ratings every energy code checks first.
      </p>
    </div>
  );
}
