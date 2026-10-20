'use client';

import { useState } from 'react';
type Support = 'fourEdge' | 'twoEdge' | 'point';
type Wind = 'low' | 'medium' | 'high';

// Indicative max dimensions for 12mm tempered under given support and wind class.
// Based on GB 15763.2-2005 §5 and ASTM E1300 principles.
// A structural engineer should verify final limits for the specific project.
const LIMITS: Record<Support, Record<Wind, {
  w: number;
  h: number;
  note: string;
}>> = {
  fourEdge: {
    low: {
      w: 3000,
      h: 15000,
      note: "Nuestra envolvente jumbo de 3.000 x 15.000 mm (tanto el horno de templado como el autoclave de laminado admiten este tamaño)."
    },
    medium: {
      w: 2800,
      h: 6000,
      note: "Envolvente habitual de muro cortina en altura media con monolítico de 12 mm."
    },
    high: {
      w: 2200,
      h: 4500,
      note: "Límite de hoja única para zona costera / de alto viento. Considere vidrio laminado 12+12 o aumente a 15 mm para paneles de mayor tamaño."
    }
  },
  twoEdge: {
    low: {
      w: 1800,
      h: 4500,
      note: "El apoyo en 2 bordes horizontal (sujeción superior e inferior) es el habitual en sistemas de escaparate con montantes y aletas."
    },
    medium: {
      w: 1600,
      h: 3500,
      note: "La deformación pasa a ser el criterio determinante. Verifique el límite luz/180 según EN 13830 para vidrio de muro cortina."
    },
    high: {
      w: 1400,
      h: 3000,
      note: "Envolvente reducida. La mayoría de los proyectos en zonas de alto viento aumentan a 15 mm o pasan a vidrio laminado en vanos de 2 bordes."
    }
  },
  point: {
    low: {
      w: 2400,
      h: 3600,
      note: "Fijación araña de 4 puntos. Se requieren taladros avellanados; distancia de borde a taladro >= 2× espesor (mínimo 24 mm para 12 mm)."
    },
    medium: {
      w: 2000,
      h: 3000,
      note: "Distancia de borde a taladro >= 2× espesor según GB 15763.2 §5.5. La separación entre taladros también debe ser >= 2× espesor."
    },
    high: {
      w: 1800,
      h: 2400,
      note: "La rotación en las fijaciones puntuales es el criterio determinante. Considere un laminado 12+12 con SGP (SentryGlas Plus) para mayor robustez estructural."
    }
  }
};
const SUPPORT_LABELS: [Support, string][] = [['fourEdge', '4-edge supported (framed)'], ['twoEdge', '2-edge supported (clamped top and bottom)'], ['point', 'Point-fixed (spider / countersunk)']];
const WIND_LABELS: [Wind, string][] = [['low', 'Low (interior or sheltered, below 1.0 kPa)'], ['medium', 'Medium (standard mid-rise, 1.0 to 2.5 kPa)'], ['high', 'High (coastal or high-rise, above 2.5 kPa)']];
export default function MaxPanelSizeCalculator() {
  const [support, setSupport] = useState<Support>('fourEdge');
  const [wind, setWind] = useState<Wind>('low');
  const result = LIMITS[support][wind];
  const area = result.w * result.h / 1_000_000; // m^2
  const withinJumbo = result.w <= 3000 && result.h <= 15000;
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-5 md:p-7">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#F2F0ED] m-0 mb-1">
          Calculadora de tamaño máximo de panel (vidrio templado de 12 mm)
        </h3>
        <p className="text-xs text-[#8B95A5] m-0">
          Seleccione una condición de apoyo y una clase de carga de viento para ver el rango dimensional indicativo de vidrio templado de una sola hoja de 12 mm.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
            Condición de apoyo
          </label>
          <div className="space-y-2">
            {SUPPORT_LABELS.map(([val, label]) => <button key={val} onClick={() => setSupport(val)} className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${support === val ? 'bg-[#DAA745] text-[#1C1F26] font-semibold' : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50'}`}>
                {label}
              </button>)}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
            Clase de carga de viento
          </label>
          <div className="space-y-2">
            {WIND_LABELS.map(([val, label]) => <button key={val} onClick={() => setWind(val)} className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${wind === val ? 'bg-[#DAA745] text-[#1C1F26] font-semibold' : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50'}`}>
                {label}
              </button>)}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#1C1F26] border border-[#DAA745]/40 p-5">
        <div className="flex flex-wrap items-baseline gap-5 mb-3">
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Anchura máxima
            </div>
            <div className="text-xl font-bold text-[#DAA745] tabular-nums">
              {result.w.toLocaleString()}{' '}
              <span className="text-xs text-[#8B95A5] font-normal">mm</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Altura máxima
            </div>
            <div className="text-xl font-bold text-[#DAA745] tabular-nums">
              {result.h.toLocaleString()}{' '}
              <span className="text-xs text-[#8B95A5] font-normal">mm</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Area
            </div>
            <div className="text-xl font-bold text-[#F2F0ED] tabular-nums">
              {area.toFixed(1)}{' '}
              <span className="text-xs text-[#8B95A5] font-normal">m^2</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#8B95A5] m-0 mb-3 leading-relaxed">
          {result.note}
        </p>

        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium ${withinJumbo ? 'bg-[#DAA745]/20 text-[#DAA745]' : 'bg-red-500/15 text-red-300'}`}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            {withinJumbo ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /> : <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />}
          </svg>
          {withinJumbo ? 'Within our 3,000 x 15,000 mm production envelope' : 'Exceeds standard envelope - contact for custom quotation'}
        </div>
      </div>

      <p className="text-[10px] text-[#8B95A5]/70 mt-3 m-0 leading-relaxed">
        Solo orientativo, basado en GB 15763.2-2005 §5 y los principios de ASTM E1300.
        Un ingeniero estructural debe verificar los límites específicos de viento, apoyo y
        deflexión para su proyecto antes de la adquisición.
      </p>
    </div>;
}