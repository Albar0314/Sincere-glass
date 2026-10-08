'use client';

import { useState } from 'react';
type Part = 'outer' | 'spacer' | 'desiccant' | 'inner' | 'seal';
interface PartInfo {
  title: string;
  function: string;
  options: string;
  color: string;
}
const info: Record<Part, PartInfo> = {
  outer: {
    title: "Hoja Exterior",
    function: 'Faces the exterior environment. Takes the primary thermal and solar load. Low-E coating is typically applied here on surface #2 (interior-facing side of outer lite).',
    options: "Transparente, tintado (bronce/gris/azul/verde), reflectante, o con recubrimiento de vidrio de baja emisividad (Low-E). Generalmente 6mm de espesor mínimo para UVA (Unidad de Vidrio Aislante) arquitectónicas; 8-10mm para acristalamiento estructural.",
    color: '#60A5FA'
  },
  spacer: {
    title: "Perfil Separador",
    function: 'Maintains constant gap distance between the two lites. Also forms the structural perimeter that holds the sealant system. Thermal performance of the edge is dominated by spacer choice.',
    options: "Aluminio (más económico, mayor puente térmico), acero inoxidable (solución intermedia), perfiles separadores compuestos de borde cálido como TPS, Super Spacer o Swiggle (menor puente térmico — recomendado para UVA (Unidad de Vidrio Aislante) con vidrio de baja emisividad (Low-E)).",
    color: '#64748B'
  },
  desiccant: {
    title: 'Desiccant',
    function: 'Molecular sieve material inside the hollow spacer bar. Absorbs any moisture that penetrates the seal over time, preventing internal condensation. Also absorbs organic vapors from sealants during curing.',
    options: "Tamiz molecular 3A (estándar para UVA (Unidad de Vidrio Aislante)), gel de sílice (opción económica) o 4A/13X para aplicaciones específicas. Debe estar fresco en el momento del ensamblaje — el desecante expuesto pierde capacidad rápidamente.",
    color: '#FBBF24'
  },
  inner: {
    title: "Hoja Interior",
    function: 'Faces the interior environment. Can be a different thickness or type than the outer lite. For laminated-IGU, this is often the laminated side for safety against falling-outward scenarios.',
    options: "Generalmente vidrio transparente de 6mm para UVA (Unidad de Vidrio Aislante) estándar. Para mayor rendimiento acústico, especifique hoja interior de vidrio laminado (6+1.52+6). Para mayor rendimiento térmico, aplique un segundo recubrimiento de vidrio de baja emisividad (Low-E) en la superficie n.º 3 (cara interior de la hoja interior).",
    color: '#A5F3FC'
  },
  seal: {
    title: "Sistema de Doble Sello",
    function: 'The primary seal (butyl, inner) is the moisture and gas barrier. The secondary seal (silicone or polysulfide, outer) provides structural strength and UV protection. Together they determine the IGU lifespan.',
    options: "Sello primario: poliisobutileno (PIB) — estándar de la industria. Sello secundario: silicona (estable a los UV, mayor coste, vida útil de 30+ años), polisulfuro (solución intermedia, 20-25 años) o poliuretano (opción económica, 15 años). Nuestro estándar es PIB + silicona.",
    color: '#EF4444'
  }
};
const parts: Part[] = ['outer', 'spacer', 'desiccant', 'inner', 'seal'];
export default function IGUAnatomyExplorer() {
  const [active, setActive] = useState<Part>('outer');
  const current = info[active];

  // Position hotspots over the SVG
  const hotspots: Record<Part, {
    x: number;
    y: number;
  }> = {
    outer: {
      x: 110,
      y: 100
    },
    spacer: {
      x: 200,
      y: 50
    },
    desiccant: {
      x: 200,
      y: 100
    },
    inner: {
      x: 290,
      y: 100
    },
    seal: {
      x: 200,
      y: 165
    }
  };
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-5">
        Anatomía de la UVA (Unidad de Vidrio Aislante) — Haga clic en cualquier componente
      </p>

      <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-start">
        {/* SVG */}
        <div className="flex justify-center">
          <svg viewBox="0 0 400 220" className="w-full max-w-[400px]" xmlns="http://www.w3.org/2000/svg">
            {/* Background labels */}
            <text x="60" y="18" textAnchor="middle" className="fill-[#8B95A5] text-[9px]">EXTERIOR</text>
            <text x="340" y="18" textAnchor="middle" className="fill-[#8B95A5] text-[9px]">INTERIOR</text>

            {/* Outer glass pane */}
            <rect x="100" y="30" width="20" height="140" fill={active === 'outer' ? '#60A5FA' : '#A5F3FC'} fillOpacity={active === 'outer' ? '0.5' : '0.25'} stroke={active === 'outer' ? '#60A5FA' : '#64748B'} strokeWidth={active === 'outer' ? '2.5' : '1.5'} onClick={() => setActive('outer')} style={{
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} />

            {/* Gap/spacer area */}
            <rect x="120" y="30" width="160" height="140" fill="#1F2937" fillOpacity="0.1" />

            {/* Top spacer bar */}
            <rect x="120" y="30" width="160" height="18" fill={active === 'spacer' ? '#94A3B8' : '#64748B'} fillOpacity={active === 'spacer' ? '0.9' : '0.6'} stroke={active === 'spacer' ? '#F2F0ED' : '#8B95A5'} strokeWidth={active === 'spacer' ? '2' : '1'} onClick={() => setActive('spacer')} style={{
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} />
            {/* Bottom spacer bar */}
            <rect x="120" y="152" width="160" height="18" fill={active === 'spacer' ? '#94A3B8' : '#64748B'} fillOpacity={active === 'spacer' ? '0.9' : '0.6'} stroke={active === 'spacer' ? '#F2F0ED' : '#8B95A5'} strokeWidth={active === 'spacer' ? '2' : '1'} onClick={() => setActive('spacer')} style={{
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} />

            {/* Desiccant dots inside top spacer */}
            <g onClick={() => setActive('desiccant')} style={{
            cursor: 'pointer'
          }}>
              {[130, 145, 160, 175, 190, 205, 220, 235, 250, 265].map(x => <circle key={x} cx={x} cy="39" r={active === 'desiccant' ? '2.5' : '1.5'} fill={active === 'desiccant' ? '#FBBF24' : '#8B95A5'} style={{
              transition: 'all 0.2s'
            }} />)}
            </g>

            {/* Inner glass pane */}
            <rect x="280" y="30" width="20" height="140" fill={active === 'inner' ? '#A5F3FC' : '#A5F3FC'} fillOpacity={active === 'inner' ? '0.5' : '0.25'} stroke={active === 'inner' ? '#06B6D4' : '#64748B'} strokeWidth={active === 'inner' ? '2.5' : '1.5'} onClick={() => setActive('inner')} style={{
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} />

            {/* Dual seal — thin layers at edges */}
            <g onClick={() => setActive('seal')} style={{
            cursor: 'pointer'
          }}>
              {/* Primary seal (inner butyl) - black lines */}
              <line x1="120" y1="30" x2="120" y2="170" stroke={active === 'seal' ? '#F2F0ED' : '#1C1F26'} strokeWidth={active === 'seal' ? '3' : '2'} style={{
              transition: 'all 0.2s'
            }} />
              <line x1="280" y1="30" x2="280" y2="170" stroke={active === 'seal' ? '#F2F0ED' : '#1C1F26'} strokeWidth={active === 'seal' ? '3' : '2'} style={{
              transition: 'all 0.2s'
            }} />
              {/* Secondary seal (outer silicone) at top/bottom edges */}
              <rect x="100" y="170" width="200" height="10" fill={active === 'seal' ? '#EF4444' : '#DC2626'} fillOpacity={active === 'seal' ? '0.6' : '0.4'} style={{
              transition: 'all 0.2s'
            }} />
              <rect x="100" y="20" width="200" height="10" fill={active === 'seal' ? '#EF4444' : '#DC2626'} fillOpacity={active === 'seal' ? '0.6' : '0.4'} style={{
              transition: 'all 0.2s'
            }} />
            </g>

            {/* Low-E coating indicator (surface #2) */}
            <line x1="120" y1="48" x2="120" y2="152" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,2" opacity={active === 'outer' ? '0.8' : '0.3'} />

            {/* Callout labels on hover */}
            {parts.map(p => {
            const h = hotspots[p];
            const isActive = active === p;
            return <g key={p}>
                  {isActive && <>
                      <circle cx={h.x} cy={h.y} r="18" fill="none" stroke={info[p].color} strokeWidth="1.5" opacity="0.6" />
                      <circle cx={h.x} cy={h.y} r="4" fill={info[p].color} />
                    </>}
                </g>;
          })}

            {/* Argon gas label in middle */}
            <text x="200" y="105" textAnchor="middle" className="fill-[#8B95A5] text-[9px] italic">
              Cavidad de 12mm con relleno de argón
            </text>
            <text x="200" y="200" textAnchor="middle" className="fill-[#8B95A5] text-[9px]">
              Sección transversal (sin escala)
            </text>
          </svg>
        </div>

        {/* Part detail */}
        <div className="bg-[#1C1F26]/40 rounded-lg p-5 border" style={{
        borderColor: current.color + '50'
      }}>
          <h4 className="text-lg font-bold m-0 mb-3" style={{
          color: current.color
        }}>
            {current.title}
          </h4>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-wider text-[#8B95A5] font-medium mb-1.5">
              Function
            </p>
            <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{current.function}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1.5">
              Opciones y Notas de Especificación
            </p>
            <p className="text-sm text-[#F2F0ED]/90 leading-relaxed m-0">{current.options}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#3A4250]/30 justify-center">
        {parts.map(p => {
        const isActive = active === p;
        return <button key={p} onClick={() => setActive(p)} className={'px-3 py-1.5 rounded-full text-xs font-medium transition-all border ' + (isActive ? 'text-white' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40')} style={isActive ? {
          backgroundColor: info[p].color,
          borderColor: info[p].color
        } : {}}>
              {info[p].title}
            </button>;
      })}
      </div>
    </div>;
}