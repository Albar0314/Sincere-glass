"use client";

import { useState } from "react";

type Thickness = 6 | 8 | 10 | 12;
const THICKNESSES: Thickness[] = [6, 8, 10, 12];

// Illustrative edge colors. Standard soda-lime glass greens up as thickness
// grows (iron absorption compounds through the edge path); low iron stays
// near-colorless. These swatches are illustrative, not measured color values.
const CLEAR_EDGE: Record<Thickness, string> = {
  6: "#bfe3cf",
  8: "#9fd4b6",
  10: "#76c199",
  12: "#4faa7d",
};
const LOW_IRON_EDGE: Record<Thickness, string> = {
  6: "#eef6f4",
  8: "#e7f3f1",
  10: "#e0f0ee",
  12: "#d8ece9",
};

const NOTICEABILITY: Record<Thickness, string> = {
  6: "Barely visible - a faint green only at the exposed edge.",
  8: "Noticeable up close, especially on an exposed frameless edge.",
  10: "Clearly green at the edge and a slight cast across the face.",
  12: "Strongly green at the edge; obvious on any exposed panel.",
};

export default function ShowerTintEdgeViewer() {
  const [thickness, setThickness] = useState<Thickness>(10);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        How green is standard shower glass?
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {THICKNESSES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setThickness(t)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              thickness === t
                ? "border-sky-500 bg-sky-50 text-sky-900"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {t} mm
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <figure>
          <div
            className="h-28 rounded-lg border border-slate-200"
            style={{
              background: `linear-gradient(90deg, ${CLEAR_EDGE[thickness]} 0%, #f7faf9 55%)`,
            }}
            aria-label={`Standard clear glass edge at ${thickness} mm`}
          />
          <figcaption className="mt-2 text-center text-xs font-medium text-slate-600">
            Standard clear tempered
          </figcaption>
        </figure>
        <figure>
          <div
            className="h-28 rounded-lg border border-slate-200"
            style={{
              background: `linear-gradient(90deg, ${LOW_IRON_EDGE[thickness]} 0%, #ffffff 55%)`,
            }}
            aria-label={`Low iron glass edge at ${thickness} mm`}
          />
          <figcaption className="mt-2 text-center text-xs font-medium text-slate-600">
            Low iron tempered
          </figcaption>
        </figure>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <span className="text-sm text-slate-700">
          <strong>At {thickness} mm:</strong> {NOTICEABILITY[thickness]}
        </span>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Swatches are illustrative of the relative difference, viewed at the edge
        at arm&rsquo;s length in bathroom light - not measured color coordinates.
      </p>
    </div>
  );
}
