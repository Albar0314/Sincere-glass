'use client';

import { useState } from 'react';
interface Result {
  glass: string;
  rationale: string;
  productLink: {
    href: string;
    label: string;
  };
  deepLink?: {
    href: string;
    label: string;
  };
}
interface Question {
  id: string;
  text: string;
  options: Array<{
    label: string;
    nextId: string | null;
    result?: Result;
  }>;
}
const flow: Record<string, Question> = {
  start: {
    id: 'start',
    text: "¿Cuál es la principal preocupación para esta aplicación?",
    options: [{
      label: "Seguridad humana (impacto, caídas, robos)",
      nextId: 'safety'
    }, {
      label: "Rendimiento energético (calefacción, refrigeración, HVAC)",
      nextId: 'energy'
    }, {
      label: "Solo apariencia (partición interior, arte enmarcado)",
      nextId: 'appearance'
    }]
  },
  safety: {
    id: 'safety',
    text: "¿Habrá personas caminando bajo, junto o contra el vidrio?",
    options: [{
      label: "En altura (claraboya, marquesina, escalera de vidrio)",
      nextId: null,
      result: {
        glass: 'Laminated Glass (required by code)',
        rationale: 'IBC §2405.5 mandates laminated for overhead glazing — the PVB interlayer holds broken pieces in place rather than letting them fall.',
        productLink: {
          href: '/products/laminated-glass',
          label: "Vidrio laminado"
        },
        deepLink: {
          href: '/blog/tempered-glass-vs-laminated-glass',
          label: "Vidrio templado vs laminado en detalle →"
        }
      }
    }, {
      label: "Puerta, mampara de ducha, ventana baja, barandilla de vidrio",
      nextId: null,
      result: {
        glass: 'Tempered Glass (minimum)',
        rationale: 'IBC §2406.4 requires safety glass in these locations. Tempered is the cheapest compliant option; laminated adds UV blocking and acoustic benefit.',
        productLink: {
          href: '/products/tempered-glass',
          label: "Vidrio templado"
        },
        deepLink: {
          href: '/blog/tempered-glass-vs-laminated-glass',
          label: "Cuándo pasar al vidrio laminado →"
        }
      }
    }, {
      label: "Escaparate orientado a la calle o riesgo elevado de intrusión",
      nextId: null,
      result: {
        glass: 'Laminated Glass (SGP interlayer)',
        rationale: 'SGP interlayer resists forced entry — a thief can crack it but cannot create a passable hole. Standard tempered shatters on hard impact.',
        productLink: {
          href: '/products/laminated-glass',
          label: "Vidrio laminado"
        }
      }
    }]
  },
  energy: {
    id: 'energy',
    text: "¿El clima es severo (veranos calurosos, inviernos fríos o ambos)?",
    options: [{
      label: "Sí — costos significativos de calefacción/refrigeración",
      nextId: null,
      result: {
        glass: 'Insulated Glass with Low-E coating',
        rationale: 'A 6+12A+6 IGU with Low-E coating and argon fill cuts U-value from 5.6 to ~1.4 W/m²·K — a 70% reduction in heat transfer compared to single-pane glazing.',
        productLink: {
          href: '/products/insulated-glass',
          label: "Vidrio Aislante"
        },
        deepLink: {
          href: '/blog/insulated-glass-vs-laminated-glass',
          label: "UVA (Unidad de Vidrio Aislante) vs. vidrio laminado en detalle →"
        }
      }
    }, {
      label: "Clima moderado, pero se busca cierta eficiencia energética",
      nextId: null,
      result: {
        glass: 'Insulated Glass (basic, no Low-E)',
        rationale: 'A plain IGU (6+12A+6 clear) achieves U-value ~2.6-2.8 — significantly better than single pane without the added cost of Low-E coating.',
        productLink: {
          href: '/products/insulated-glass',
          label: "Vidrio Aislante"
        }
      }
    }, {
      label: "Tanto la seguridad COMO la eficiencia energética son prioritarias",
      nextId: null,
      result: {
        glass: 'Laminated IGU (combined unit)',
        rationale: 'The premium facade spec: laminated outer lite (safety + acoustic) + argon cavity + Low-E tempered inner lite (thermal). Our 3m×15m lines can produce both processes in sequence.',
        productLink: {
          href: '/products/insulated-glass',
          label: "UVA Laminada"
        },
        deepLink: {
          href: '/blog/insulated-glass-vs-laminated-glass',
          label: "Explicación de la opción \"ambas\" →"
        }
      }
    }]
  },
  appearance: {
    id: 'appearance',
    text: "¿El vidrio se encuentra en una ubicación de riesgo definida por la normativa?",
    options: [{
      label: "No — a más de 18 in del suelo, sin riesgo de impacto",
      nextId: null,
      result: {
        glass: 'Annealed Float Glass',
        rationale: "If no code requirement forces safety glass, annealed is the cheapest option (~$5-8/m² vs $18-22/m² for tempered). You can also cut and drill it yourself after purchase.",
        productLink: {
          href: '/contact',
          label: "Solicitar cotización"
        },
        deepLink: {
          href: '/blog/tempered-glass-vs-annealed-glass',
          label: "Cuándo el vidrio recocido es la opción correcta →"
        }
      }
    }, {
      label: "Se requiere patrón decorativo o color",
      nextId: null,
      result: {
        glass: 'Enameled Glass (ceramic frit)',
        rationale: 'Ceramic frit baked onto tempered glass gives permanent color/pattern that will not fade or peel. Common for spandrels, feature walls, decorative facades.',
        productLink: {
          href: '/products/enameled-glass',
          label: "Vidrio esmaltado"
        }
      }
    }]
  }
};
export default function GlassSelectorFlowchart() {
  const [currentId, setCurrentId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const current = flow[currentId];
  function reset() {
    setCurrentId('start');
    setHistory([]);
    setResult(null);
  }
  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setCurrentId(prev);
    setResult(null);
  }
  function selectOption(opt: typeof current.options[0]) {
    if (opt.result) {
      setResult(opt.result);
    } else if (opt.nextId) {
      setHistory(h => [...h, currentId]);
      setCurrentId(opt.nextId);
    }
  }
  return <div className="my-10 bg-gradient-to-br from-[#3A4250]/20 to-[#1C1F26] border border-[#DAA745]/30 rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold m-0">
          Selector de Vidrio — Árbol de Decisión Interactivo
        </p>
        {(history.length > 0 || result) && <button onClick={reset} className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors">
            ↻ Volver a empezar
          </button>}
      </div>

      {result ? <div className="space-y-4">
          <div>
            <p className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Nuestra recomendación</p>
            <h3 className="text-2xl font-bold text-[#DAA745] mb-3 m-0">{result.glass}</h3>
            <p className="text-[#F2F0ED] leading-relaxed mb-4">{result.rationale}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={result.productLink.href} className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline">
              {result.productLink.label} →
            </a>
            {result.deepLink && <a href={result.deepLink.href} className="px-5 py-2.5 border border-[#8B95A5]/40 text-[#F2F0ED] rounded-full text-sm font-medium hover:border-[#DAA745]/60 hover:text-[#DAA745] transition-colors no-underline">
                {result.deepLink.label}
              </a>}
          </div>
          <button onClick={back} className="text-xs text-[#8B95A5] hover:text-[#F2F0ED] transition-colors mt-2">
            ← Elegir una respuesta diferente
          </button>
        </div> : <div>
          <p className="text-lg text-[#F2F0ED] font-medium mb-5">{current.text}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => <button key={i} onClick={() => selectOption(opt)} className="w-full text-left px-5 py-3 bg-[#1C1F26]/60 border border-[#3A4250]/40 rounded-lg text-[#F2F0ED] text-sm hover:border-[#DAA745]/50 hover:bg-[#DAA745]/5 transition-colors">
                {opt.label}
              </button>)}
          </div>
          {history.length > 0 && <button onClick={back} className="text-xs text-[#8B95A5] hover:text-[#F2F0ED] transition-colors mt-4">
              ← Volver
            </button>}
        </div>}
    </div>;
}