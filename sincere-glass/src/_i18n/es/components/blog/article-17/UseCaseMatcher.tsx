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
const QUESTIONS: Question[] = [{
  id: "application",
  prompt: "What is the primary application?",
  choices: [{
    id: "facade",
    label: "Acristalamiento de fachada / muro cortina",
    weights: {
      pvb: 2,
      acoustic: 1,
      sgp: 1
    }
  }, {
    id: "balustrade",
    label: "Barandilla de vidrio / protección de vidrio",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }, {
    id: "overhead",
    label: "Techo / marquesina / claraboya",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }, {
    id: "shopfront",
    label: "Escaparate / vitrina",
    weights: {
      pvb: 2,
      acoustic: 1,
      sgp: 1
    }
  }, {
    id: "partition",
    label: "Partición interior / oficina",
    weights: {
      pvb: 2,
      acoustic: 2,
      sgp: 0
    }
  }]
}, {
  id: "span",
  prompt: "What is the free span of the panel?",
  choices: [{
    id: "small",
    label: "Menos de 1,5 m",
    weights: {
      pvb: 2,
      acoustic: 1,
      sgp: 1
    }
  }, {
    id: "medium",
    label: "De 1,5 a 2,5 m",
    weights: {
      pvb: 1,
      acoustic: 1,
      sgp: 2
    }
  }, {
    id: "large",
    label: "Más de 2,5 m",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }]
}, {
  id: "load",
  prompt: "What governs the load case?",
  choices: [{
    id: "standard",
    label: "Carga de viento / barrera estándar",
    weights: {
      pvb: 2,
      acoustic: 1,
      sgp: 1
    }
  }, {
    id: "crowd",
    label: "Carga lineal para aglomeraciones / acceso público",
    weights: {
      pvb: 1,
      acoustic: 0,
      sgp: 3
    }
  }, {
    id: "impact",
    label: "Impacto / huracán / explosión",
    weights: {
      pvb: 1,
      acoustic: 0,
      sgp: 3
    }
  }]
}, {
  id: "exposure",
  prompt: "What is the long-term edge exposure?",
  choices: [{
    id: "dry",
    label: "Interior seco",
    weights: {
      pvb: 2,
      acoustic: 2,
      sgp: 1
    }
  }, {
    id: "humid",
    label: "Húmedo o tropical",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }, {
    id: "coastal",
    label: "Costero / ambiente salino",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }, {
    id: "openedge",
    label: "Detalle de borde abierto (sin junta)",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }]
}, {
  id: "acoustic",
  prompt: "What is the acoustic requirement?",
  choices: [{
    id: "none",
    label: "Sin objetivo específico",
    weights: {
      pvb: 2,
      acoustic: 0,
      sgp: 1
    }
  }, {
    id: "stc36",
    label: "STC (Clase de Transmisión Sonora) 36 es suficiente",
    weights: {
      pvb: 3,
      acoustic: 1,
      sgp: 0
    }
  }, {
    id: "stc39",
    label: "Se requiere STC (Clase de Transmisión Sonora) 38 a 40",
    weights: {
      pvb: 0,
      acoustic: 3,
      sgp: 0
    }
  }, {
    id: "stc42",
    label: "Se requiere STC (Clase de Transmisión Sonora) 42+ (estudio / zona adyacente a aeropuerto)",
    weights: {
      pvb: 0,
      acoustic: 2,
      sgp: 0
    }
  }]
}, {
  id: "warranty",
  prompt: "What edge warranty does the spec require?",
  choices: [{
    id: "5y",
    label: "5 años típico",
    weights: {
      pvb: 2,
      acoustic: 2,
      sgp: 0
    }
  }, {
    id: "10y",
    label: "10 años",
    weights: {
      pvb: 1,
      acoustic: 1,
      sgp: 2
    }
  }, {
    id: "15y",
    label: "15 años o más",
    weights: {
      pvb: 0,
      acoustic: 0,
      sgp: 3
    }
  }]
}];
const RECOMMENDATIONS: Record<Interlayer, {
  title: string;
  summary: string;
  nextSteps: string[];
}> = {
  "pvb": {
    title: "El PVB (polivinil butiral) estándar (0,76 mm) es la opción adecuada",
    summary: "Sus datos apuntan a un laminado de vidrio de seguridad clásico. El PVB estándar ofrece retención de fragmentos, alcanza los objetivos habituales de STC (Clase de Transmisión Sonora) y mantiene el coste FOB al mínimo.",
    nextSteps: ["Spec the laminate as nominal (e.g. 6-0.76-6) with Class 1(B)1 or Class 2(B)2 impact per EN 12600 as appropriate.", "Confirm whether the detail is edge-sealed or edge-exposed. If exposed and the environment is humid, re-run the matcher.", "Ask your supplier for the specific PVB brand (Saflex, Trosifol, EVERLAM) and the moisture content certificate."]
  },
  "acoustic": {
    title: "El PVB (polivinil butiral) acústico es la opción adecuada",
    summary: "El requisito acústico es el factor determinante aquí. Un PVB acústico tricapa añade de 2 a 3 puntos de STC (Clase de Transmisión Sonora) con un coste aproximadamente un 30 por ciento superior al del PVB estándar.",
    nextSteps: ["Specify the acoustic grade explicitly (Saflex Q-series, Trosifol SC Monolayer, or equivalent).", "Ask for the mock-up test report at the exact build-up you plan to use. STC varies with glass thickness and asymmetry.", "If structural performance also matters (balustrade, overhead), re-run the matcher. Acoustic PVB is softer than standard PVB and is not a structural interlayer."]
  },
  "sgp": {
    title: "El ionoplast SGP (SentryGlas Plus) es la opción adecuada",
    summary: "La rigidez estructural, la retención tras rotura o la exposición de bordes —o los tres factores a la vez— justifican el uso de SGP (SentryGlas Plus). El coste de la lámina intermedia es de 3 a 5 veces el del PVB (polivinil butiral), pero con esta especificación se obtiene acción compuesta, tolerancia de borde abierto y un borde con garantía de más de 15 años.",
    nextSteps: ["Specify SGP as 1.52 mm minimum (SentryGlas Classic, SentryGlas Xtra, or Trosifol Extra Stiff). Double-ply 2.28 mm for very large or very loaded panels.", "Confirm the autoclave cycle at your supplier. SGP needs a longer, hotter cycle than PVB and some lines are not configured for it.", "For balustrade or overhead work, cross-check that the glass itself is heat-soaked (EN 14179) and the hardware spec matches the SGP build-up thickness."]
  }
};
const INTERLAYER_KEYS: Interlayer[] = ["pvb", "acoustic", "sgp"];
export default function UseCaseMatcher() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const complete = QUESTIONS.every(q => answers[q.id]);
  const scores = useMemo(() => {
    const s: Record<Interlayer, number> = {
      pvb: 0,
      acoustic: 0,
      sgp: 0
    };
    for (const q of QUESTIONS) {
      const ans = answers[q.id];
      if (!ans) continue;
      const choice = q.choices.find(c => c.id === ans);
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
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Selector de 6 preguntas
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Adapte su proyecto a la lámina intermedia correcta
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Responda seis preguntas específicas y el selector devuelve PVB estándar, PVB acústico o SGP (SentryGlas Plus) basándose en una puntuación ponderada de todas las respuestas. Ninguna pregunta por sí sola determina el resultado.
        </p>
      </div>

      <div className="space-y-6 mb-6">
        {QUESTIONS.map((q, qi) => <div key={q.id}>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xs font-mono text-[#DAA745]">
                {String(qi + 1).padStart(2, "0")}
              </span>
              <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">
                {q.prompt}
              </h4>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {q.choices.map(c => <button key={c.id} onClick={() => setAnswers(prev => ({
            ...prev,
            [q.id]: c.id
          }))} className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${answers[q.id] === c.id ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
                  {c.label}
                </button>)}
            </div>
          </div>)}
      </div>

      <div className="h-px bg-[#3A4250]/40 my-6" />

      {!complete && <div className="rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 text-center">
          <p className="text-sm text-[#8B95A5] m-0">
            Responda las seis preguntas anteriores para ver la recomendación. Actualmente{" "}
            {Object.keys(answers).length} of {QUESTIONS.length} respondidas.
          </p>
        </div>}

      {complete && <div className="rounded-lg bg-[#DAA745]/10 border border-[#DAA745]/40 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
              Recommendation
            </div>
            <button onClick={reset} className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors underline">
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
            {INTERLAYER_KEYS.map(k => {
          const pct = totalScore === 0 ? 0 : scores[k] / totalScore * 100;
          const isPick = k === recommendation;
          return <div key={k}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`text-xs font-semibold ${isPick ? "text-[#DAA745]" : "text-[#8B95A5]"}`}>
                      {k === "pvb" ? "PVB" : k === "acoustic" ? "Acoustic" : "SGP"}
                    </span>
                    <span className={`text-[11px] font-mono ${isPick ? "text-[#DAA745]" : "text-[#8B95A5]"}`}>
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded bg-[#3A4250]/40 overflow-hidden">
                    <div className={`h-full rounded transition-all duration-500 ${isPick ? "bg-[#DAA745]" : "bg-[#8B95A5]/60"}`} style={{
                width: `${pct}%`
              }} />
                  </div>
                </div>;
        })}
          </div>

          <div>
            <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
              Próximos pasos
            </div>
            <ul className="space-y-2 list-none pl-0">
              {RECOMMENDATIONS[recommendation].nextSteps.map((s, i) => <li key={i} className="flex gap-3 text-xs text-[#F2F0ED] leading-relaxed">
                  <span className="text-[#DAA745] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  <span>{s}</span>
                </li>)}
            </ul>
          </div>
        </div>}
    </div>;
}