"use client";

import { useState } from "react";

// SHGC climate advisor: pick IECC climate zone band + facade orientation -> target SHGC range.
// Cooling-dominated zones (1-3) want low SHGC on every face. Heating-dominated zones (6-8) want
// a higher SHGC on the south face for passive solar, lower elsewhere. Mixed (4-5) sit between.
// Defaults (Zone 5, South) render a real recommendation at SSR.
// ASCII-only body. No backticks, no template interpolation.

type Orient = "N" | "E" | "S" | "W";

const ZONES = [1, 2, 3, 4, 5, 6, 7, 8];
const ORIENTS: Orient[] = ["N", "E", "S", "W"];
const ORIENT_LABEL: Record<Orient, string> = { N: "North", E: "East", S: "South", W: "West" };

interface Advice {
  range: string;
  rationale: string;
}

function advise(zone: number, orient: Orient): Advice {
  if (zone <= 3) {
    return {
      range: "0.20 - 0.25",
      rationale:
        "If the climate is cooling-dominated, then keep SHGC low on every face to cut solar heat gain and air-conditioning load. Orientation barely changes the answer here.",
    };
  }
  if (zone <= 5) {
    if (orient === "S") {
      return {
        range: "0.30 - 0.40",
        rationale:
          "If the zone is mixed and the glass faces south, then a moderate SHGC lets in useful winter sun while a Low-E coating still holds down summer gain.",
      };
    }
    return {
      range: "0.25 - 0.35",
      rationale:
        "If the zone is mixed and the glass faces north, east or west, then lean to the lower end: those faces give little winter benefit but plenty of summer glare and gain.",
    };
  }
  if (orient === "S") {
    return {
      range: "0.40 - 0.55",
      rationale:
        "If the zone is heating-dominated and the glass faces south, then a higher SHGC harvests passive solar heat through the long cold season. Pair it with a low U-factor so the heat stays in.",
    };
  }
  return {
    range: "0.25 - 0.35",
    rationale:
      "If the zone is heating-dominated but the glass faces north, east or west, then keep SHGC modest: those faces lose far more heat than they gain. Spend the budget on a lower U-factor instead.",
  };
}

const MATRIX: Array<{ band: string; south: string; other: string }> = [
  { band: "Zones 1-3 (hot / cooling)", south: "0.20 - 0.25", other: "0.20 - 0.25" },
  { band: "Zones 4-5 (mixed)", south: "0.30 - 0.40", other: "0.25 - 0.35" },
  { band: "Zones 6-8 (cold / heating)", south: "0.40 - 0.55", other: "0.25 - 0.35" },
];

function chip(active: boolean) {
  return {
    minWidth: 38,
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #2A2E37",
    background: active ? "#C9A227" : "transparent",
    color: active ? "#13161C" : "#E6E8EC",
    cursor: "pointer",
    fontWeight: 600,
  } as const;
}

export default function ShgcClimateAdvisor() {
  const [zone, setZone] = useState<number>(5);
  const [orient, setOrient] = useState<Orient>("S");
  const out = advise(zone, orient);

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
        SHGC Climate Advisor
      </div>

      <div style={{ fontSize: 14, color: "#9AA0AA", marginBottom: 6 }}>IECC climate zone</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {ZONES.map((z) => (
          <button key={z} type="button" onClick={() => setZone(z)} style={chip(zone === z)}>
            {z}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 14, color: "#9AA0AA", marginBottom: 6 }}>Facade orientation</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {ORIENTS.map((o) => (
          <button key={o} type="button" onClick={() => setOrient(o)} style={chip(orient === o)}>
            {ORIENT_LABEL[o]}
          </button>
        ))}
      </div>

      <div style={{ background: "#0D0F13", borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#9AA0AA" }}>
          Target SHGC for Zone {zone}, {ORIENT_LABEL[orient]} face
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color: "#C9A227", margin: "4px 0 8px" }}>
          {out.range}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#C3C7CE", margin: 0 }}>{out.rationale}</p>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #2A2E37", color: "#9AA0AA", textAlign: "left" }}>
            <th style={{ padding: "6px 4px" }}>Climate band</th>
            <th style={{ padding: "6px 4px" }}>South face</th>
            <th style={{ padding: "6px 4px" }}>N / E / W faces</th>
          </tr>
        </thead>
        <tbody>
          {MATRIX.map((r) => (
            <tr key={r.band} style={{ borderBottom: "1px solid #1C1F26" }}>
              <td style={{ padding: "6px 4px" }}>{r.band}</td>
              <td style={{ padding: "6px 4px", color: "#C9A227" }}>{r.south}</td>
              <td style={{ padding: "6px 4px" }}>{r.other}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: 11, color: "#6B717B", margin: "12px 0 0" }}>
        General guidance aligned to IECC zoning and ENERGY STAR direction; confirm against local
        energy code and the project energy model before specifying.
      </p>
    </div>
  );
}
