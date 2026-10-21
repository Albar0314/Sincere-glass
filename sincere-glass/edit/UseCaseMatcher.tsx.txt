"use client";
import { useMemo, useState } from "react";

type Interlayer = "pvb" | "acoustic" | "sgp";

interface Choice {
  id: string;
  label: string;
  weights: Record<Interlayer, number>;
}

interface Question {
  id: string;
  prompt: string;
  choices: Choice[];
}

const QUESTIONS: Question[] = [
  {
    id: "application",
    prompt: "What is the primary application?",
    choices: [
      {
        id: "facade",
        label: "Facade / curtain-wall glazing",
        weights: { pvb: 2, acoustic: 1, sgp: 1 },
      },
      {
        id: "balustrade",
        label: "Balustrade / glass guard",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
      {
        id: "overhead",
        label: "Overhead / canopy / skylight",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
      {
        id: "shopfront",
        label: "Storefront / display window",
        weights: { pvb: 2, acoustic: 1, sgp: 1 },
      },
      {
        id: "partition",
        label: "Interior partition / office",
        weights: { pvb: 2, acoustic: 2, sgp: 0 },
      },
    ],
  },
  {
    id: "span",
    prompt: "What is the free span of the panel?",
    choices: [
      {
        id: "small",
        label: "Under 1.5 m",
        weights: { pvb: 2, acoustic: 1, sgp: 1 },
      },
      {
        id: "medium",
        label: "1.5 to 2.5 m",
        weights: { pvb: 1, acoustic: 1, sgp: 2 },
      },
      {
        id: "large",
        label: "Over 2.5 m",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
    ],
  },
  {
    id: "load",
    prompt: "What governs the load case?",
    choices: [
      {
        id: "standard",
        label: "Standard wind / barrier load",
        weights: { pvb: 2, acoustic: 1, sgp: 1 },
      },
      {
        id: "crowd",
        label: "Crowd / public-access line load",
        weights: { pvb: 1, acoustic: 0, sgp: 3 },
      },
      {
        id: "impact",
        label: "Impact / hurricane / blast",
        weights: { pvb: 1, acoustic: 0, sgp: 3 },
      },
    ],
  },
  {
    id: "exposure",
    prompt: "What is the long-term edge exposure?",
    choices: [
      {
        id: "dry",
        label: "Dry interior",
        weights: { pvb: 2, acoustic: 2, sgp: 1 },
      },
      {
        id: "humid",
        label: "Humid or tropical",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
      {
        id: "coastal",
        label: "Coastal / salt-laden",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
      {
        id: "openedge",
        label: "Open-edge detail (no gasket)",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
    ],
  },
  {
    id: "acoustic",
    prompt: "What is the acoustic requirement?",
    choices: [
      {
        id: "none",
        label: "No specific target",
        weights: { pvb: 2, acoustic: 0, sgp: 1 },
      },
      {
        id: "stc36",
        label: "STC 36 is enough",
        weights: { pvb: 3, acoustic: 1, sgp: 0 },
      },
      {
        id: "stc39",
        label: "STC 38 to 40 required",
        weights: { pvb: 0, acoustic: 3, sgp: 0 },
      },
      {
        id: "stc42",
        label: "STC 42+ required (studio / airport-adjacent)",
        weights: { pvb: 0, acoustic: 2, sgp: 0 },
      },
    ],
  },
  {
    id: "warranty",
    prompt: "What edge warranty does the spec require?",
    choices: [
      {
        id: "5y",
        label: "5 year typical",
        weights: { pvb: 2, acoustic: 2, sgp: 0 },
      },
      {
        id: "10y",
        label: "10 year",
        weights: { pvb: 1, acoustic: 1, sgp: 2 },
      },
      {
        id: "15y",
        label: "15 year or longer",
        weights: { pvb: 0, acoustic: 0, sgp: 3 },
      },
    ],
  },
];

const RECOMMENDATIONS: Record<
  Interlayer,
  { title: string; summary: string; nextSteps: string[] }
> = {
  "pvb": {
    title: "Standard PVB (0.76 mm) is the right pick",
    summary:
      "Your inputs point to a classic safety-glazing laminate. Standard PVB gives you fragment retention, hits common STC targets, and keeps the FOB cost minimal.",
    nextSteps: [
      "Spec the laminate as nominal (e.g. 6-0.76-6) with Class 1(B)1 or Class 2(B)2 impact per EN 12600 as appropriate.",
      "Confirm whether the detail is edge-sealed or edge-exposed. If exposed and the environment is humid, re-run the matcher.",
      "Ask your supplier for the specific PVB brand (Saflex, Trosifol, EVERLAM) and the moisture content certificate.",
    ],
  },
  "acoustic": {
    title: "Acoustic PVB is the right pick",
    summary:
      "The acoustic requirement is doing the deciding here. A trilayer acoustic PVB adds 2 to 3 STC points at roughly 30 percent cost premium over standard PVB.",
    nextSteps: [
      "Specify the acoustic grade explicitly (Saflex Q-series, Trosifol SC Monolayer, or equivalent).",
      "Ask for the mock-up test report at the exact build-up you plan to use. STC varies with glass thickness and asymmetry.",
      "If structural performance also matters (balustrade, overhead), re-run the matcher. Acoustic PVB is softer than standard PVB and is not a structural interlayer.",
    ],
  },
  "sgp": {
    title: "SGP ionoplast is the right pick",
    summary:
      "Structural stiffness, post-breakage retention, or edge exposure (or all three) are forcing SGP. The interlayer premium is 3 to 5x PVB, but at this spec it buys composite action, open-edge tolerance, and a 15 year+ warranty-worthy edge.",
    nextSteps: [
      "Specify SGP as 1.52 mm minimum (SentryGlas Classic, SentryGlas Xtra, or Trosifol Extra Stiff). Double-ply 2.28 mm for very large or very loaded panels.",
      "Confirm the autoclave cycle at your supplier. SGP needs a longer, hotter cycle than PVB and some lines are not configured for it.",
      "For balustrade or overhead work, cross-check that the glass itself is heat-soaked (EN 14179) and the hardware spec matches the SGP build-up thickness.",
    ],
  },
};

const INTERLAYER_KEYS: Interlayer[] = ["pvb", "acoustic", "sgp"];

export default function UseCaseMatcher() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const complete = QUESTIONS.every((q) => answers[q.id]);

  const scores = useMemo(() => {
    const s: Record<Interlayer, number> = { pvb: 0, acoustic: 0, sgp: 0 };
    for (const q of QUESTIONS) {
      const ans = answers[q.id];
      if (!ans) continue;
      const choice = q.choices.find((c) => c.id === ans);
      if (!choice) continue;
      for (const k of INTERLAYER_KEYS) {
        s[k] += choice.weights[k];
      }
    }
    return s;
  }, [answers]);

  const recommendation: Interlayer = useMemo(() => {
    // Explicit assignment to every union member — avoids TS narrowing issue
    let best: Interlayer = "pvb";
    let bestScore = scores.pvb;
    if (scores.acoustic > bestScore) {
      best = "acoustic";
      bestScore = scores.acoustic;
    }
    if (scores.sgp > bestScore) {
      best = "sgp";
      bestScore = scores.sgp;
    }
    return best;
  }, [scores]);

  const totalScore = scores.pvb + scores.acoustic + scores.sgp;

  function reset() {
    setAnswers({});
  }

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          6-Question Matcher
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Match your project to the right interlayer
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Answer six scoped questions and the matcher returns Standard PVB,
          Acoustic PVB, or SGP based on a weighted score across all answers.
          No single question decides the result on its own.
        </p>
      </div>

      <div className="space-y-6 mb-6">
        {QUESTIONS.map((q, qi) => (
          <div key={q.id}>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xs font-mono text-[#DAA745]">
                {String(qi + 1).padStart(2, "0")}
              </span>
              <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">
                {q.prompt}
              </h4>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {q.choices.map((c) => (
                <button
                  key={c.id}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: c.id }))
                  }
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                    answers[q.id] === c.id
                      ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]"
                      : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#3A4250]/40 my-6" />

      {!complete && (
        <div className="rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 text-center">
          <p className="text-sm text-[#8B95A5] m-0">
            Answer all six questions above to see the recommendation. Currently{" "}
            {Object.keys(answers).length} of {QUESTIONS.length} answered.
          </p>
        </div>
      )}

      {complete && (
        <div className="rounded-lg bg-[#DAA745]/10 border border-[#DAA745]/40 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
              Recommendation
            </div>
            <button
              onClick={reset}
              className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors underline"
            >
              Reset
            </button>
          </div>
          <h4 className="text-lg font-bold text-[#F2F0ED] m-0 mb-3">
            {RECOMMENDATIONS[recommendation].title}
          </h4>
          <p className="text-sm text-[#F2F0ED] leading-relaxed m-0 mb-5">
            {RECOMMENDATIONS[recommendation].summary}
          </p>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {INTERLAYER_KEYS.map((k) => {
              const pct = totalScore === 0 ? 0 : (scores[k] / totalScore) * 100;
              const isPick = k === recommendation;
              return (
                <div key={k}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span
                      className={`text-xs font-semibold ${
                        isPick ? "text-[#DAA745]" : "text-[#8B95A5]"
                      }`}
                    >
                      {k === "pvb"
                        ? "PVB"
                        : k === "acoustic"
                        ? "Acoustic"
                        : "SGP"}
                    </span>
                    <span
                      className={`text-[11px] font-mono ${
                        isPick ? "text-[#DAA745]" : "text-[#8B95A5]"
                      }`}
                    >
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded bg-[#3A4250]/40 overflow-hidden">
                    <div
                      className={`h-full rounded transition-all duration-500 ${
                        isPick ? "bg-[#DAA745]" : "bg-[#8B95A5]/60"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
              Next steps
            </div>
            <ul className="space-y-2 list-none pl-0">
              {RECOMMENDATIONS[recommendation].nextSteps.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-xs text-[#F2F0ED] leading-relaxed"
                >
                  <span className="text-[#DAA745] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
