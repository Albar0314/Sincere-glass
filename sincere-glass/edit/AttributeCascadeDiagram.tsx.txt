"use client";

import { useState } from "react";

type NodeKey = "substrate" | "processing" | "thickness" | "assembly" | "coating" | "size" | "weight" | "strength" | "u-value" | "cost" | "hardware" | "shipping";

type NodeDef = {
  key: NodeKey;
  label: string;
  type: "input" | "derived";
  x: number;
  y: number;
  desc: string;
};

const NODES: NodeDef[] = [
  // Six input attributes (left column)
  { key: "substrate",  label: "Substrate",   type: "input",   x: 90,  y: 70,  desc: "Clear, ultra-clear, tinted, or reflective. Affects optical performance and base cost." },
  { key: "processing", label: "Processing",  type: "input",   x: 90,  y: 140, desc: "Annealed, tempered, heat-strengthened, laminated, or tempered-laminated. Drives safety classification and strength." },
  { key: "thickness",  label: "Thickness",   type: "input",   x: 90,  y: 210, desc: "6 to 19 mm. The single biggest driver of weight, strength, cost, and shipping density." },
  { key: "assembly",   label: "Assembly",    type: "input",   x: 90,  y: 280, desc: "Monolithic, double IGU, or triple IGU. Governs thermal performance and overall package thickness." },
  { key: "coating",    label: "Coating",     type: "input",   x: 90,  y: 350, desc: "None, Low-E (soft or hard), solar control, or ceramic frit. Changes U-value, SHGC, and aesthetics." },
  { key: "size",       label: "Panel size",  type: "input",   x: 90,  y: 420, desc: "Standard, large, or jumbo. Impacts crating, shipping container choice, and installation method." },

  // Six derived outputs (right column)
  { key: "weight",     label: "Weight / m²", type: "derived", x: 460, y: 70,  desc: "Driven by thickness and assembly. 2,500 kg/m³ density; 12mm mono = 30 kg/m²; triple IGU 6+12A+6+12A+6 = ~45 kg/m²." },
  { key: "strength",   label: "Break load",      type: "derived", x: 460, y: 140, desc: "Driven by processing + thickness. Tempered 12mm = ~36 kN/m² (4-5x annealed). Lamination adds post-break retention." },
  { key: "u-value",    label: "U-value",         type: "derived", x: 460, y: 210, desc: "Driven by assembly + coating. Monolithic 12mm = 5.6 W/m²K. Double IGU with Low-E argon = 1.1-1.6 W/m²K." },
  { key: "cost",       label: "Cost / m²",   type: "derived", x: 460, y: 280, desc: "Driven by all six inputs. Rule of thumb: thickness and lamination each ~2x; coating +15-25%; jumbo size +20-40%." },
  { key: "hardware",   label: "Hardware spec",   type: "derived", x: 460, y: 350, desc: "Driven by weight + size. 180 kg panel caps two-person install; above that, vacuum lifters, heavier hinges, deeper glazing pockets." },
  { key: "shipping",   label: "Container plan",  type: "derived", x: 460, y: 420, desc: "Driven by size + weight + assembly. Jumbo panels need flat-rack; triple IGUs cut panels-per-container by ~40%." },
];

// edges: {from, to}
const EDGES: Array<{ from: NodeKey; to: NodeKey }> = [
  { from: "substrate",  to: "cost" },
  { from: "substrate",  to: "u-value" },

  { from: "processing", to: "strength" },
  { from: "processing", to: "cost" },

  { from: "thickness",  to: "weight" },
  { from: "thickness",  to: "strength" },
  { from: "thickness",  to: "cost" },
  { from: "thickness",  to: "shipping" },

  { from: "assembly",   to: "weight" },
  { from: "assembly",   to: "u-value" },
  { from: "assembly",   to: "cost" },
  { from: "assembly",   to: "shipping" },

  { from: "coating",    to: "u-value" },
  { from: "coating",    to: "cost" },

  { from: "size",       to: "shipping" },
  { from: "size",       to: "hardware" },
  { from: "size",       to: "cost" },

  // weight cascade
  { from: "weight",     to: "hardware" },
  { from: "weight",     to: "shipping" },
];

export default function AttributeCascadeDiagram() {
  const [hover, setHover] = useState<NodeKey | null>(null);

  // Compute reachable downstream nodes from the hovered node (BFS)
  const highlighted = new Set<NodeKey>();
  if (hover) {
    const queue: NodeKey[] = [hover];
    highlighted.add(hover);
    while (queue.length) {
      const cur = queue.shift() as NodeKey;
      for (const e of EDGES) {
        if (e.from === cur && !highlighted.has(e.to)) {
          highlighted.add(e.to);
          queue.push(e.to);
        }
      }
    }
  }

  const activeNode = hover ? NODES.find((n) => n.key === hover) : null;

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
          Interactive: Attribute Cascade
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          How specification choices cascade into weight, cost, hardware, and shipping
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Hover any input (left) to highlight every downstream derived output (right) it influences. Hover a derived output to trace it back.
        </p>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 580 490"
          className="w-full h-auto"
          role="img"
          aria-label="Attribute cascade diagram showing how six input specifications drive six derived outputs"
        >
          {/* edges */}
          {EDGES.map((e, i) => {
            const from = NODES.find((n) => n.key === e.from);
            const to = NODES.find((n) => n.key === e.to);
            if (!from || !to) return null;
            const active = highlighted.has(from.key) && highlighted.has(to.key);
            return (
              <path
                key={i}
                d={`M ${from.x + 95} ${from.y + 18} C ${(from.x + to.x) / 2 + 60} ${from.y + 18}, ${(from.x + to.x) / 2 - 60} ${to.y + 18}, ${to.x} ${to.y + 18}`}
                fill="none"
                stroke={active ? "#DAA745" : "#3A4250"}
                strokeWidth={active ? 1.8 : 0.8}
                opacity={active ? 0.9 : 0.35}
              />
            );
          })}

          {/* nodes */}
          {NODES.map((n) => {
            const active = highlighted.has(n.key);
            const isInput = n.type === "input";
            return (
              <g
                key={n.key}
                onMouseEnter={() => setHover(n.key)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n.key)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={95}
                  height={36}
                  rx={8}
                  fill={active ? "#DAA745" : isInput ? "#3A4250" : "#1C1F26"}
                  stroke={active ? "#DAA745" : isInput ? "#8B95A5" : "#3A4250"}
                  strokeWidth={1.2}
                />
                <text
                  x={n.x + 47.5}
                  y={n.y + 22.5}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={active ? "#1C1F26" : "#F2F0ED"}
                >
                  {n.label}
                </text>
              </g>
            );
          })}

          {/* column headers */}
          <text x={137} y={30} textAnchor="middle" fontSize={10} fill="#8B95A5" fontWeight={600} className="uppercase tracking-wider">
            Inputs (you specify)
          </text>
          <text x={507} y={30} textAnchor="middle" fontSize={10} fill="#8B95A5" fontWeight={600} className="uppercase tracking-wider">
            Derived (factory computes)
          </text>
        </svg>
      </div>

      {/* detail panel */}
      <div className="mt-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-4 min-h-[88px]">
        {activeNode ? (
          <>
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
              {activeNode.type === "input" ? "Input attribute" : "Derived output"} &mdash; {activeNode.label}
            </div>
            <p className="text-sm text-[#F2F0ED] m-0 leading-relaxed">{activeNode.desc}</p>
          </>
        ) : (
          <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">
            Hover a node to see what it drives. The six inputs on the left are what you control in the spec sheet; the six outputs on the right are what the factory computes from them.
          </p>
        )}
      </div>
    </div>
  );
}
