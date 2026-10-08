'use client';

import { useState } from 'react';
type Spec = 'basic' | 'lowe' | 'laminated-igu' | 'premium';
interface BuildUp {
  key: Spec;
  label: string;
  shortDesc: string;
  uValue: string;
  stc: string;
  cost: string;
  layers: Array<{
    name: string;
    thickness: number; // visual mm (for drawing)
    actualMm: string;
    fill: string;
    stroke: string;
    note?: string;
  }>;
}
const buildUps: Record<Spec, BuildUp> = {
  basic: {
    key: 'basic',
    label: "UVA (Unidad de Vidrio Aislante) Básica de Vidrio Templado",
    shortDesc: 'Entry-level commercial glazing, low-rise mild climates.',
    uValue: '2.6-2.8 W/m²·K',
    stc: 'STC 29',
    cost: '~$42-50/m²',
    layers: [{
      name: "Hoja exterior templada",
      thickness: 20,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Da al exterior"
    }, {
      name: "Cámara de aire",
      thickness: 60,
      actualMm: '12mm',
      fill: '#1F2937',
      stroke: '#64748B',
      note: "Aire seco"
    }, {
      name: "Hoja interior templada",
      thickness: 20,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Da al interior"
    }]
  },
  lowe: {
    key: 'lowe',
    label: "UVA (Unidad de Vidrio Aislante) de Vidrio Templado de Baja Emisividad (Low-E)",
    shortDesc: 'The modern commercial baseline. Low-E coating + argon.',
    uValue: '1.4-1.8 W/m²·K',
    stc: 'STC 30',
    cost: '~$55-68/m²',
    layers: [{
      name: "Hoja exterior templada",
      thickness: 20,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Recubrimiento de baja emisividad (Low-E) en la cara #2 (cara interior)"
    }, {
      name: "Cámara de argón",
      thickness: 60,
      actualMm: '12mm',
      fill: '#1F2937',
      stroke: '#F59E0B',
      note: "Relleno de argón ~90%"
    }, {
      name: "Hoja interior templada",
      thickness: 20,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA'
    }]
  },
  'laminated-igu': {
    key: 'laminated-igu',
    label: "UVA Laminada",
    shortDesc: 'Premium mid-rise facade. Safety + acoustic + thermal.',
    uValue: '1.4-1.6 W/m²·K',
    stc: 'STC 36',
    cost: '~$95-120/m²',
    layers: [{
      name: "Hoja exterior templada",
      thickness: 15,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Seguridad ante caídas"
    }, {
      name: "Lámina intermedia de PVB (polivinil butiral)",
      thickness: 4,
      actualMm: '1.52mm',
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      note: "Une las dos hojas exteriores"
    }, {
      name: "Hoja exterior templada",
      thickness: 15,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA'
    }, {
      name: "Cámara de argón",
      thickness: 60,
      actualMm: '12mm',
      fill: '#1F2937',
      stroke: '#F59E0B'
    }, {
      name: "Hoja interior templada de baja emisividad (Low-E)",
      thickness: 15,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Recubrimiento de baja emisividad (Low-E) en superficie n.º 5"
    }]
  },
  premium: {
    key: 'premium',
    label: "UVA (Unidad de Vidrio Aislante) laminada con SGP (SentryGlas Plus), con ensayo de choque térmico",
    shortDesc: 'Hurricane / high-rise premium. SGP interlayer, heat-soak tested.',
    uValue: '1.4-1.6 W/m²·K',
    stc: 'STC 38',
    cost: '~$140-180/m²',
    layers: [{
      name: "Hoja exterior templada HS",
      thickness: 15,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Con ensayo de choque térmico (HST)"
    }, {
      name: "Lámina intermedia de SGP (SentryGlas Plus)",
      thickness: 4,
      actualMm: '1.52mm',
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      note: "~100× más rígida que el PVB (polivinil butiral)"
    }, {
      name: "Hoja exterior templada HS",
      thickness: 15,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA'
    }, {
      name: "Cámara de argón",
      thickness: 60,
      actualMm: '12mm',
      fill: '#1F2937',
      stroke: '#F59E0B'
    }, {
      name: "Hoja interior templada HS de baja emisividad (Low-E)",
      thickness: 15,
      actualMm: '6mm',
      fill: '#A5F3FC',
      stroke: '#60A5FA',
      note: "Con ensayo de choque térmico"
    }]
  }
};
const specList: Spec[] = ['basic', 'lowe', 'laminated-igu', 'premium'];
export default function BuildupCrossSection() {
  const [active, setActive] = useState<Spec>('lowe');
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const current = buildUps[active];
  const totalThickness = current.layers.reduce((sum, l) => sum + l.thickness, 0);
  const svgWidth = 500;
  const svgHeight = 220;
  const paddingX = 50;
  const availableWidth = svgWidth - paddingX * 2;
  const scale = availableWidth / totalThickness;
  let currentX = paddingX;
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-5">
        Explorador de secciones transversales de composición
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {specList.map(k => {
        const isActive = active === k;
        return <button key={k} onClick={() => {
          setActive(k);
          setHoveredLayer(null);
        }} className={'px-4 py-2 rounded-full text-xs font-medium transition-all border ' + (isActive ? 'bg-[#DAA745] text-[#1C1F26] border-[#DAA745]' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40')}>
              {buildUps[k].label}
            </button>;
      })}
      </div>

      <div className="mb-4">
        <p className="text-sm text-[#F2F0ED] leading-relaxed mb-3">{current.shortDesc}</p>
        <div className="flex flex-wrap gap-4 text-xs text-[#8B95A5]">
          <span>
            <strong className="text-[#F2F0ED]">Valor U:</strong> {current.uValue}
          </span>
          <span>
            <strong className="text-[#F2F0ED]">Acústica:</strong> {current.stc}
          </span>
          <span>
            <strong className="text-[#F2F0ED]">Costo:</strong> {current.cost} FOB Wuhan
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={'0 0 ' + svgWidth + ' ' + svgHeight} className="w-full min-w-[400px]" xmlns="http://www.w3.org/2000/svg">
          {/* Exterior/interior labels */}
          <text x="30" y="30" className="fill-[#8B95A5] text-[9px] font-medium uppercase tracking-wider">
            EXTERIOR
          </text>
          <text x={svgWidth - 30} y="30" textAnchor="end" className="fill-[#8B95A5] text-[9px] font-medium uppercase tracking-wider">
            INTERIOR
          </text>

          {/* Arrows showing direction */}
          <line x1="30" y1="35" x2="60" y2="35" stroke="#8B95A5" strokeWidth="1" opacity="0.5" />
          <polygon points={svgWidth - 60 + ',30 ' + (svgWidth - 60) + ',40 ' + (svgWidth - 50) + ',35'} fill="#8B95A5" opacity="0.5" />

          {/* Layers */}
          {current.layers.map((layer, i) => {
          const w = layer.thickness * scale;
          const x = currentX;
          currentX += w;
          const isHovered = hoveredLayer === i;
          return <g key={i} onMouseEnter={() => setHoveredLayer(i)} onMouseLeave={() => setHoveredLayer(null)} style={{
            cursor: 'pointer'
          }}>
                <rect x={x} y="60" width={w} height="100" fill={layer.fill} fillOpacity={isHovered ? 0.6 : 0.35} stroke={layer.stroke} strokeWidth={isHovered ? '2.5' : '1.5'} style={{
              transition: 'all 0.2s'
            }} />
                {/* Layer label on top */}
                <text x={x + w / 2} y="55" textAnchor="middle" className={'text-[9px] ' + (isHovered ? 'fill-[#DAA745] font-semibold' : 'fill-[#8B95A5]')} style={{
              transition: 'all 0.2s'
            }}>
                  {layer.actualMm}
                </text>
                {/* Layer thickness label below */}
                <text x={x + w / 2} y="180" textAnchor="middle" className={'text-[9px] ' + (isHovered ? 'fill-[#F2F0ED]' : 'fill-[#8B95A5]')} style={{
              transition: 'all 0.2s',
              writingMode: 'horizontal-tb'
            }}>
                  {i + 1}
                </text>
              </g>;
        })}

          {/* Total thickness label */}
          <text x={svgWidth / 2} y="205" textAnchor="middle" className="fill-[#8B95A5] text-[10px] italic">
            Sección transversal (aproximadamente a escala)
          </text>
        </svg>
      </div>

      {/* Layer detail */}
      <div className="mt-4 min-h-[90px] bg-[#1C1F26]/40 rounded-lg p-4 border border-[#3A4250]/20">
        {hoveredLayer !== null ? <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded" style={{
            backgroundColor: current.layers[hoveredLayer].stroke
          }} />
              <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">
                Layer {hoveredLayer + 1}: {current.layers[hoveredLayer].name}
              </h4>
              <span className="text-xs font-mono text-[#8B95A5] ml-auto">
                {current.layers[hoveredLayer].actualMm}
              </span>
            </div>
            {current.layers[hoveredLayer].note && <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
                {current.layers[hoveredLayer].note}
              </p>}
          </> : <p className="text-sm text-[#8B95A5] italic text-center m-0">
            Pase el cursor sobre cada capa para ver su función
          </p>}
      </div>
    </div>;
}