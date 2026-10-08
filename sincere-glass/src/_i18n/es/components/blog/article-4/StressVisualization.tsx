'use client';

import { useState } from 'react';
type Mode = 'annealed' | 'tempered';
export default function StressVisualization() {
  const [mode, setMode] = useState<Mode>('annealed');

  // Dimensions
  const width = 500;
  const height = 240;
  const glassY = 60;
  const glassH = 120;
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex gap-2 mb-6 justify-center">
        <button onClick={() => setMode('annealed')} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${mode === 'annealed' ? 'bg-slate-500 text-white' : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'}`}>
          Vidrio recocido (Sin Tensión)
        </button>
        <button onClick={() => setMode('tempered')} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${mode === 'tempered' ? 'bg-amber-500 text-[#1C1F26]' : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'}`}>
          Vidrio templado (Tensión Bloqueada)
        </button>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
          {/* Glass cross-section */}
          <rect x="80" y={glassY} width={width - 160} height={glassH} fill={mode === 'tempered' ? '#FEF3C7' : '#E2E8F0'} fillOpacity="0.15" stroke={mode === 'tempered' ? '#FBBF24' : '#64748B'} strokeWidth="2" />

          {/* Surface compression arrows (tempered only) */}
          {mode === 'tempered' && <g>
              {/* Top surface — arrows pushing inward (←→ compressed) */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const x = 100 + i * 42;
            return <g key={`top-${i}`}>
                    <path d={`M ${x - 8} ${glassY + 8} L ${x} ${glassY + 8} L ${x - 3} ${glassY + 5} M ${x} ${glassY + 8} L ${x - 3} ${glassY + 11}`} stroke="#EF4444" strokeWidth="1.5" fill="none" />
                    <path d={`M ${x + 8} ${glassY + 8} L ${x} ${glassY + 8} L ${x + 3} ${glassY + 5} M ${x} ${glassY + 8} L ${x + 3} ${glassY + 11}`} stroke="#EF4444" strokeWidth="1.5" fill="none" />
                  </g>;
          })}
              {/* Bottom surface — same, compressing */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const x = 100 + i * 42;
            return <g key={`bot-${i}`}>
                    <path d={`M ${x - 8} ${glassY + glassH - 8} L ${x} ${glassY + glassH - 8}`} stroke="#EF4444" strokeWidth="1.5" fill="none" markerEnd="url(#arrowEnd)" />
                    <path d={`M ${x + 8} ${glassY + glassH - 8} L ${x} ${glassY + glassH - 8}`} stroke="#EF4444" strokeWidth="1.5" fill="none" />
                  </g>;
          })}
              {/* Core tension arrows — pulling outward (←  →) */}
              <g>
                {[0, 1, 2, 3].map(i => {
              const x = 150 + i * 60;
              const y = glassY + glassH / 2;
              return <g key={`core-${i}`}>
                      <path d={`M ${x - 20} ${y} L ${x - 8} ${y}`} stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2,2" />
                      <path d={`M ${x + 20} ${y} L ${x + 8} ${y}`} stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2,2" />
                    </g>;
            })}
              </g>
            </g>}

          {/* Annealed state — just random dots representing uniform molecular distribution */}
          {mode === 'annealed' && <g fill="#94A3B8" opacity="0.6">
              {Array.from({
            length: 40
          }).map((_, i) => {
            const x = 90 + i * 37 % (width - 180);
            const y = glassY + 10 + i * 23 % (glassH - 20);
            return <circle key={i} cx={x} cy={y} r="2" />;
          })}
            </g>}

          {/* Labels */}
          <text x={width / 2} y={glassY - 20} textAnchor="middle" className="fill-[#F2F0ED] text-[12px] font-semibold">
            Sección transversal del vidrio (vista lateral)
          </text>

          {mode === 'tempered' && <>
              <text x={70} y={glassY + 8} textAnchor="end" className="fill-[#EF4444] text-[10px] font-medium">
                Compressed
              </text>
              <text x={70} y={glassY + 20} textAnchor="end" className="fill-[#EF4444] text-[9px]">
                surface
              </text>
              <text x={70} y={glassY + glassH / 2 + 4} textAnchor="end" className="fill-[#3B82F6] text-[10px] font-medium">
                Tensioned
              </text>
              <text x={70} y={glassY + glassH / 2 + 16} textAnchor="end" className="fill-[#3B82F6] text-[9px]">
                core
              </text>
              <text x={70} y={glassY + glassH - 8} textAnchor="end" className="fill-[#EF4444] text-[10px] font-medium">
                Compressed
              </text>
            </>}

          {mode === 'annealed' && <text x={70} y={glassY + glassH / 2 + 4} textAnchor="end" className="fill-[#8B95A5] text-[10px]">
              Uniform
            </text>}
        </svg>
      </div>

      <div className="mt-6 bg-[#1C1F26]/40 rounded-lg p-4 border border-[#3A4250]/20">
        {mode === 'annealed' ? <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
            <strong className="text-[#F2F0ED]">El vidrio recocido</strong> tiene una tensión residual esencialmente nula. El enfriamiento lento del horno de recocido permite que cada molécula se asiente en su posición de menor energía. El vidrio es uniforme en toda su sección. Tensión de rotura ~40 MPa — simplemente la resistencia inherente de los enlaces.
          </p> : <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
            <strong className="text-[#F2F0ED]">El vidrio templado</strong> tiene un <strong style={{
          color: '#EF4444'
        }}>capa exterior comprimida</strong> y un <strong style={{
          color: '#3B82F6'
        }}>núcleo interior en tensión</strong>. El enfriamiento rápido congeló la superficie antes de que el núcleo terminara de contraerse; ahora la superficie empuja permanentemente hacia adentro contra un núcleo que tiende a expandirse hacia afuera. Cualquier fuerza externa debe primero superar ~180 MPa de compresión superficial antes de que el vidrio pueda fallar — 4-5× más resistente que el vidrio recocido. Romper la superficie libera explosivamente la tensión del núcleo, razón por la cual el vidrio templado se fragmenta en gránulos.
          </p>}
      </div>
    </div>;
}