'use client';

import { useState } from 'react';
export default function IGUvsLamiCrossSection() {
  const [side, setSide] = useState<'igu' | 'lami'>('igu');
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      {/* Toggle */}
      <div className="flex gap-2 mb-6 justify-center">
        <button onClick={() => setSide('igu')} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${side === 'igu' ? 'bg-blue-500 text-white' : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'}`}>
          Sección Transversal de Vidrio Aislante
        </button>
        <button onClick={() => setSide('lami')} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${side === 'lami' ? 'bg-amber-500 text-[#1C1F26]' : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'}`}>
          Sección Transversal de Vidrio Laminado
        </button>
      </div>

      <div className="flex justify-center">
        {side === 'igu' ? <svg viewBox="0 0 500 240" className="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
            {/* Outer glass pane */}
            <rect x="80" y="40" width="30" height="160" fill="#A5F3FC" fillOpacity="0.5" stroke="#60A5FA" strokeWidth="2" />
            {/* Spacer */}
            <rect x="110" y="40" width="120" height="160" fill="#1F2937" fillOpacity="0.2" />
            <rect x="110" y="40" width="120" height="12" fill="#64748B" />
            <rect x="110" y="188" width="120" height="12" fill="#64748B" />
            {/* Low-E coating hint */}
            <line x1="112" y1="40" x2="112" y2="200" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4,2" />
            {/* Inner glass pane */}
            <rect x="230" y="40" width="30" height="160" fill="#A5F3FC" fillOpacity="0.5" stroke="#60A5FA" strokeWidth="2" />

            {/* Labels */}
            <text x="95" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Outer</text>
            <text x="95" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">6mm vidrio de baja emisividad (Low-E)</text>
            <text x="170" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Cámara con relleno de argón</text>
            <text x="170" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">12mm, perfil separador de borde cálido</text>
            <text x="245" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Inner</text>
            <text x="245" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">6mm transparente</text>

            {/* Arrows + annotations on the right */}
            <text x="300" y="60" className="fill-[#DAA745] text-[12px] font-medium">● Recubrimiento Low-E</text>
            <text x="310" y="78" className="fill-[#8B95A5] text-[10px]">Refleja el calor infrarrojo</text>

            <text x="300" y="110" className="fill-[#DAA745] text-[12px] font-medium">● Relleno de argón</text>
            <text x="310" y="128" className="fill-[#8B95A5] text-[10px]">Conductividad térmica ~⅔ del aire</text>

            <text x="300" y="160" className="fill-[#DAA745] text-[12px] font-medium">● Perfil separador de borde cálido</text>
            <text x="310" y="178" className="fill-[#8B95A5] text-[10px]">Previene la condensación en el borde</text>
          </svg> : <svg viewBox="0 0 500 240" className="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
            {/* Outer glass */}
            <rect x="100" y="40" width="30" height="160" fill="#FEF3C7" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="2" />
            {/* PVB interlayer */}
            <rect x="130" y="40" width="6" height="160" fill="#DC2626" fillOpacity="0.7" />
            {/* Inner glass */}
            <rect x="136" y="40" width="30" height="160" fill="#FEF3C7" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="2" />

            {/* Crack simulation on outer only */}
            <path d="M 115 80 L 108 100 M 115 80 L 122 95 M 115 80 L 118 110" stroke="#1F2937" strokeWidth="1" opacity="0.6" />

            {/* Labels */}
            <text x="115" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Outer</text>
            <text x="115" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">Vidrio de 5mm</text>
            <text x="133" y="30" textAnchor="middle" className="fill-[#DC2626] text-[10px] font-medium">PVB</text>
            <text x="133" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">0.76mm</text>
            <text x="151" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Inner</text>
            <text x="151" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">Vidrio de 5mm</text>

            {/* Arrows + annotations on the right */}
            <text x="220" y="60" className="fill-[#DAA745] text-[12px] font-medium">● Lámina intermedia de PVB (polivinil butiral)</text>
            <text x="230" y="78" className="fill-[#8B95A5] text-[10px]">Une el vidrio; absorbe vibración y sonido</text>

            <text x="220" y="110" className="fill-[#DAA745] text-[12px] font-medium">● Al impacto</text>
            <text x="230" y="128" className="fill-[#8B95A5] text-[10px]">El vidrio se rompe pero permanece adherido al PVB (polivinil butiral)</text>

            <text x="220" y="160" className="fill-[#DAA745] text-[12px] font-medium">● Bloquea el 99% de UV</text>
            <text x="230" y="178" className="fill-[#8B95A5] text-[10px]">El PVB (polivinil butiral) filtra UV de forma inherente</text>
          </svg>}
      </div>

      <p className="text-xs text-[#8B95A5] text-center mt-4 italic">
        {side === 'igu' ? 'Insulated Glass Unit (IGU) — two panes bonded around a sealed gas-filled cavity. Thermal performance is the engineered priority.' : 'Laminated Glass — two panes permanently bonded with a polymer interlayer. Safety and acoustic performance are the engineered priorities.'}
      </p>
    </div>;
}