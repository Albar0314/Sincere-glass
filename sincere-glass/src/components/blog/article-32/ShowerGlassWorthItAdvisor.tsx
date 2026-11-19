"use client";

import { useState } from "react";

type Enclosure = "framed" | "semi" | "frameless";
type Thickness = 6 | 8 | 10 | 12;
type Verdict = "Worth it" | "Optional" | "Skip";

const ENCLOSURES: { key: Enclosure; label: string; hint: string }[] = [
  { key: "framed", label: "Framed", hint: "metal frame on all four sides" },
  { key: "semi", label: "Semi-frameless", hint: "frame on some edges only" },
  { key: "frameless", label: "Frameless", hint: "thick panels, minimal hardware" },
];

const THICKNESSES: Thickness[] = [6, 8, 10, 12];

// Verdict matrix. Reasoning: the green tint of standard clear glass compounds
// with thickness, and a frame hides the edge where the color is most visible.
// So the "worth it" case rises with both thickness and edge exposure.
function decide(enc: Enclosure, t: Thickness): { verdict: Verdict; reason: string } {
  if (enc === "framed") {
    if (t <= 6)
      return {
        verdict: "Skip",
        reason:
          "A thin, fully framed screen hides the edge and shows almost no green at 6 mm. The clarity gain is hard to see, so standard clear tempered is the economical call.",
      };
    return {
      verdict: "Optional",
      reason:
        "The frame hides the edge where green is strongest. At this thickness some tint shows through the face, so low iron is a nice-to-have rather than a necessity.",
    };
  }
  if (enc === "semi") {
    if (t <= 8)
      return {
        verdict: "Optional",
        reason:
          "With some exposed edges the tint starts to read, but at 6-8 mm it is still mild. Choose low iron if the bathroom is bright or the client is clarity-sensitive.",
      };
    return {
      verdict: "Worth it",
      reason:
        "Exposed edges plus a thicker pane make the green of standard glass obvious. Low iron keeps the exposed edges and the view colorless.",
    };
  }
  // frameless
  if (t <= 6)
    return {
      verdict: "Optional",
      reason:
        "Frameless shows every edge, but a 6 mm panel is thin enough that the tint is mild. Most frameless showers use 8-12 mm, where the case for low iron is stronger.",
    };
  return {
    verdict: "Worth it",
    reason:
      "Frameless panels this thick put a fully exposed, deep-green edge at eye level. This is the classic case for low iron: the colorless edge is the whole point of going frameless.",
  };
}

const VERDICT_STYLE: Record<Verdict, string> = {
  "Worth it": "bg-emerald-50 text-emerald-800 border-emerald-200",
  Optional: "bg-amber-50 text-amber-800 border-amber-200",
  Skip: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function ShowerGlassWorthItAdvisor() {
  const [enc, setEnc] = useState<Enclosure>("frameless");
  const [thickness, setThickness] = useState<Thickness>(10);
  const { verdict, reason } = decide(enc, thickness);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Is low iron worth it for your shower?
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-slate-700">Enclosure type</div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {ENCLOSURES.map((e) => (
            <button
              key={e.key}
              type="button"
              onClick={() => setEnc(e.key)}
              className={`rounded-xl border p-3 text-left transition ${
                enc === e.key
                  ? "border-sky-500 bg-sky-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="text-sm font-semibold text-slate-800">{e.label}</div>
              <div className="mt-0.5 text-xs text-slate-500">{e.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-slate-700">Panel thickness</div>
        <div className="mt-2 flex flex-wrap gap-2">
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
      </div>

      <div className={`mt-5 rounded-xl border p-4 ${VERDICT_STYLE[verdict]}`}>
        <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
          Verdict
        </div>
        <div className="mt-1 text-lg font-bold">{verdict}</div>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{reason}</p>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Guidance for a typical residential enclosure. Overhead glass, steam rooms and
        oversized panels have extra safety requirements - send us the drawing for a firm call.
      </p>
    </div>
  );
}
