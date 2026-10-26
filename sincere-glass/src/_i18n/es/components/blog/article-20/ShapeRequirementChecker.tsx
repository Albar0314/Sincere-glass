"use client";

import { useState } from "react";

/**
 * Binary decision tree for "do I actually need curved glass?" Walks the
 * buyer through four yes/no questions in sequence: (1) does the geometry
 * physically demand a curve or can flat panels mitred together achieve
 * it, (2) is the visual continuity critical (reflections and sightlines),
 * (3) is the panel size large enough that facet joints would be visually
 * disruptive, (4) does the project budget absorb a 60-200 percent glass
 * premium. The verdict path shows "flat suffices", "curved justified",
 * or "mixed strategy" with specific reasoning. Rendered client-side as
 * a progressive-disclosure flow so the answer is earned, not shown
 * all at once.
 */

type Answer = "yes" | "no" | null;
interface QuestionNode {
  id: string;
  text: string;
  yesHint?: string;
  noHint?: string;
}
const QUESTIONS: QuestionNode[] = [{
  id: "geometry",
  text: "¿La geometría arquitectónica requiere una curva, o podría ejecutarse con paneles planos en inglete?",
  yesHint: "e.g. a cylindrical lift shaft, a sweeping facade, a dome segment",
  noHint: "e.g. a polygonal tower that could use 8-12 flat facets"
}, {
  id: "visual",
  text: "¿Es la continuidad visual ininterrumpida a lo largo de la superficie un requisito crítico para la intención del diseño?",
  yesHint: "Flagship retail, museum, hospitality facades — reflections must flow smoothly",
  noHint: "Commercial office, industrial, or budget-driven project"
}, {
  id: "size",
  text: "¿Son los paneles suficientemente grandes (más de 2 m de ancho) como para que las juntas de facetado resulten visualmente prominentes?",
  yesHint: "Small flat facets look modern; large flat facets reveal the joints",
  noHint: "Small panels < 1.5 m hide facet joints behind frame members"
}, {
  id: "budget",
  text: "¿El presupuesto del proyecto absorbe un sobrecosto del 60 al 200 por ciento en las partidas de vidrio afectadas?",
  yesHint: "Premium commercial, hospitality, high-end residential",
  noHint: "Value-engineered or tight-budget project"
}];
type Verdict = {
  tier: "flat" | "mixed" | "curved";
  heading: string;
  color: string;
  bg: string;
  reasoning: string[];
};
function evaluate(answers: Record<string, Answer>): Verdict {
  const geometry = answers.geometry === "yes";
  const visual = answers.visual === "yes";
  const size = answers.size === "yes";
  const budget = answers.budget === "yes";

  // Rule tree
  if (!geometry && !visual) {
    return {
      tier: "flat",
      heading: "Flat glass suffices",
      color: "#059669",
      bg: "rgba(5,150,105,0.08)",
      reasoning: ["No geometric or visual demand that curves solve.", "Flat tempered or laminated panels achieve the same functional outcome at 40-70 percent less glass cost.", "Mitred or butt-jointed flat panels can approximate smooth facades convincingly at normal viewing distance."]
    };
  }
  if (geometry && visual && size && budget) {
    return {
      tier: "curved",
      heading: "Curved glass is justified",
      color: "#DAA745",
      bg: "rgba(218,167,69,0.1)",
      reasoning: ["All four pressure factors align: geometric requirement, visual continuity, panel scale, and budget headroom.", "At this spec level, flat facets would read as a value-engineered compromise.", "Hot-bending is the right process; cold-bending only if the final radius is above 5,000 mm."]
    };
  }
  if (!budget && (geometry || visual)) {
    return {
      tier: "mixed",
      heading: "Mixed strategy recommended",
      color: "#0369a1",
      bg: "rgba(3,105,161,0.08)",
      reasoning: ["The design pulls toward curved but the budget does not fully support it.", "Specify curved panels only at the most visible focal zones (entrance, ground-floor facade, feature elements).", "Use flat panels for upper floors, back-of-house, and anywhere the viewing distance is over 15 m.", "This hybrid approach typically keeps the glass premium under 25 percent of pure-curved budget."]
    };
  }
  if (geometry && !visual) {
    return {
      tier: "mixed",
      heading: "Consider faceted-flat as the primary strategy",
      color: "#0369a1",
      bg: "rgba(3,105,161,0.08)",
      reasoning: ["The geometry suggests a curve, but visual continuity is not critical.", "A faceted flat solution (8-12 flat panels approximating the curve) delivers the shape at roughly flat-glass cost.", "Reserve true curved glass only for small focal elements if any."]
    };
  }
  return {
    tier: "mixed",
    heading: "Mixed strategy recommended",
    color: "#0369a1",
    bg: "rgba(3,105,161,0.08)",
    reasoning: ["Some pressure factors push to curved, others to flat.", "Scope the premium specifically to the elements that need it; let the rest default to flat.", "Our engineering team can price both options line-by-line for direct comparison."]
  };
}
export default function ShapeRequirementChecker() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const answered = Object.values(answers).filter(v => v !== null).length;
  const allAnswered = answered === QUESTIONS.length;
  const verdict = allAnswered ? evaluate(answers) : null;
  function setAnswer(id: string, value: Answer) {
    setAnswers(a => ({
      ...a,
      [id]: value
    }));
  }
  function reset() {
    setAnswers({});
    setShowResult(false);
  }
  return <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm my-6">
      <div className="mb-5">
        <p className="text-[#DAA745] text-sm font-semibold uppercase tracking-wider mb-2">
          Verificación de decisión
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-[#1C1F26]">
          ¿Realmente necesita vidrio curvado?
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2">
          Cuatro preguntas directas. Si no puede responder "sí" a las preguntas de geometría y visuales, el vidrio plano probablemente resuelve su problema.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#DAA745] transition-all duration-300" style={{
          width: answered / QUESTIONS.length * 100 + "%"
        }} />
        </div>
        <span className="text-xs text-[#8B95A5] font-mono">{answered}/{QUESTIONS.length}</span>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {QUESTIONS.map((q, i) => {
        const current = answers[q.id];
        const previousAnswered = i === 0 || answers[QUESTIONS[i - 1].id] !== undefined;
        if (!previousAnswered) return null;
        return <div key={q.id} className={"rounded-lg p-4 transition-all " + (current ? "bg-gray-50 border border-gray-200" : "bg-[#DAA745]/5 border border-[#DAA745]/30")}>
              <p className="font-medium text-[#1C1F26] text-sm md:text-base leading-relaxed">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1C1F26] text-white text-xs font-bold text-center leading-6 mr-2">
                  {i + 1}
                </span>
                {q.text}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 ml-8">
                <button type="button" onClick={() => setAnswer(q.id, "yes")} className={"px-4 py-1.5 rounded-md text-sm font-semibold transition-colors " + (current === "yes" ? "bg-emerald-500 text-white" : "bg-gray-100 text-[#1C1F26] hover:bg-gray-200")}>
                  Yes
                </button>
                <button type="button" onClick={() => setAnswer(q.id, "no")} className={"px-4 py-1.5 rounded-md text-sm font-semibold transition-colors " + (current === "no" ? "bg-red-500 text-white" : "bg-gray-100 text-[#1C1F26] hover:bg-gray-200")}>
                  No
                </button>
                {q.yesHint && current === "yes" && <span className="text-xs text-emerald-700 self-center italic">{q.yesHint}</span>}
                {q.noHint && current === "no" && <span className="text-xs text-red-700 self-center italic">{q.noHint}</span>}
              </div>
            </div>;
      })}
      </div>

      {/* Verdict */}
      {allAnswered && verdict && <div className="mt-6 rounded-xl p-5 border-l-4" style={{
      borderLeftColor: verdict.color,
      backgroundColor: verdict.bg
    }}>
          <p className="text-xs uppercase tracking-wider font-semibold text-[#8B95A5] mb-1">
            Recommendation
          </p>
          <h4 className="font-display text-lg md:text-xl font-bold text-[#1C1F26]" style={{
        color: verdict.color
      }}>
            {verdict.heading}
          </h4>
          <ul className="mt-3 space-y-2">
            {verdict.reasoning.map((r, i) => <li key={i} className="text-sm text-[#1C1F26]/85 flex items-start gap-2 leading-relaxed">
                <span className="mt-0.5" style={{
            color: verdict.color
          }}>&#9656;</span>
                <span>{r}</span>
              </li>)}
          </ul>
          <button type="button" onClick={reset} className="mt-4 text-xs text-[#8B95A5] hover:text-[#1C1F26] underline">
            Reiniciar y probar respuestas distintas
          </button>
        </div>}
    </div>;
}