'use client';

import { useState } from 'react';
type Process = 'tempering' | 'lamination' | 'igu';
interface Node {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  type: 'raw' | 'process' | 'product';
  linkHref?: string;
}
const nodes: Node[] = [
// Raw material
{
  id: 'float',
  label: "Vidrio Flotado Recocido",
  sub: 'Raw material',
  x: 400,
  y: 40,
  type: 'raw'
},
// Processes
{
  id: 'tempering',
  label: 'Tempering',
  sub: '620°C + quench',
  x: 150,
  y: 170,
  type: 'process',
  linkHref: '/blog/how-is-tempered-glass-made'
}, {
  id: 'lamination',
  label: 'Lamination',
  sub: 'Autoclave 140°C / 12 bar',
  x: 400,
  y: 170,
  type: 'process',
  linkHref: '/blog/how-is-laminated-glass-made'
}, {
  id: 'igu',
  label: "Ensamblaje de UVA (Unidad de Vidrio Aislante)",
  sub: 'Dual-seal + argon fill',
  x: 650,
  y: 170,
  type: 'process',
  linkHref: '/blog/how-is-insulated-glass-made'
},
// Products
{
  id: 'tempered',
  label: 'Tempered',
  x: 80,
  y: 320,
  type: 'product',
  linkHref: '/products/tempered-glass'
}, {
  id: 'laminated',
  label: 'Laminated',
  x: 230,
  y: 320,
  type: 'product',
  linkHref: '/products/laminated-glass'
}, {
  id: 'insulated',
  label: "Aislante (UVA)",
  x: 400,
  y: 320,
  type: 'product',
  linkHref: '/products/insulated-glass'
}, {
  id: 'lowe',
  label: "UVA (Unidad de Vidrio Aislante) de baja emisividad (Low-E)",
  x: 570,
  y: 320,
  type: 'product',
  linkHref: '/products/low-e-glass'
}, {
  id: 'enameled',
  label: 'Enameled',
  x: 720,
  y: 320,
  type: 'product',
  linkHref: '/products/enameled-glass'
}];

// Which processes connect to which products
const connections = [{
  from: 'float',
  to: 'tempering'
}, {
  from: 'float',
  to: 'lamination'
}, {
  from: 'float',
  to: 'igu'
}, {
  from: 'tempering',
  to: 'tempered'
}, {
  from: 'tempering',
  to: 'enameled'
}, {
  from: 'tempering',
  to: 'laminated'
}, {
  from: 'tempering',
  to: 'insulated'
}, {
  from: 'lamination',
  to: 'laminated'
}, {
  from: 'lamination',
  to: 'insulated'
}, {
  from: 'igu',
  to: 'insulated'
}, {
  from: 'igu',
  to: 'lowe'
}];
const processHighlights: Record<Process, string[]> = {
  tempering: ['tempering', 'tempered', 'enameled', 'laminated', 'insulated', 'lowe', 'float'],
  lamination: ['lamination', 'laminated', 'insulated', 'float'],
  igu: ['igu', 'insulated', 'lowe', 'float']
};
const processColors: Record<Process, string> = {
  tempering: '#FBBF24',
  lamination: '#F59E0B',
  igu: '#60A5FA'
};
export default function ProcessFamilyMap() {
  const [active, setActive] = useState<Process | null>(null);
  function nodeOpacity(nodeId: string) {
    if (!active) return 1;
    return processHighlights[active].includes(nodeId) ? 1 : 0.2;
  }
  function connectionOpacity(from: string, to: string) {
    if (!active) return 0.5;
    const highlighted = processHighlights[active];
    return highlighted.includes(from) && highlighted.includes(to) ? 0.8 : 0.1;
  }
  function connectionColor(from: string, to: string) {
    if (!active) return '#3A4250';
    const highlighted = processHighlights[active];
    if (highlighted.includes(from) && highlighted.includes(to)) {
      return processColors[active];
    }
    return '#3A4250';
  }
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-4 text-center">
        Cómo 3 Procesos de Fabricación Crean 5 Familias de Productos
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {(['tempering', 'lamination', 'igu'] as Process[]).map(p => {
        const isActive = active === p;
        return <button key={p} onClick={() => setActive(isActive ? null : p)} className={'px-4 py-2 rounded-full text-xs font-semibold transition-all border ' + (isActive ? 'text-[#1C1F26]' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40')} style={isActive ? {
          backgroundColor: processColors[p],
          borderColor: processColors[p]
        } : {}}>
              Show {p.charAt(0).toUpperCase() + p.slice(1)} branch
            </button>;
      })}
        {active && <button onClick={() => setActive(null)} className="px-3 py-2 text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors">
            ↻ Restablecer
          </button>}
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 800 380" className="w-full min-w-[600px]" xmlns="http://www.w3.org/2000/svg">
          {/* Connections */}
          {connections.map((c, i) => {
          const from = nodes.find(n => n.id === c.from)!;
          const to = nodes.find(n => n.id === c.to)!;
          return <line key={i} x1={from.x} y1={from.y + (from.type === 'raw' ? 20 : from.type === 'process' ? 25 : -20)} x2={to.x} y2={to.y - (to.type === 'process' ? 25 : 20)} stroke={connectionColor(c.from, c.to)} strokeWidth="1.5" strokeDasharray="4,3" opacity={connectionOpacity(c.from, c.to)} style={{
            transition: 'all 0.3s'
          }} />;
        })}

          {/* Nodes */}
          {nodes.map(n => {
          const op = nodeOpacity(n.id);
          const isProcess = n.type === 'process';
          const isRaw = n.type === 'raw';
          const Component = n.linkHref ? 'a' : 'g';
          const props = n.linkHref ? {
            href: n.linkHref
          } : {};
          let fill, stroke;
          if (isRaw) {
            fill = '#64748B';
            stroke = '#64748B';
          } else if (isProcess) {
            fill = active === n.id ? processColors[n.id as Process] : '#3A4250';
            stroke = processColors[n.id as Process] || '#8B95A5';
          } else {
            fill = '#1C1F26';
            stroke = '#8B95A5';
          }
          return <Component key={n.id} {...props} style={{
            cursor: n.linkHref ? 'pointer' : 'default',
            transition: 'all 0.3s',
            opacity: op
          }}>
                {isProcess ? <rect x={n.x - 65} y={n.y - 25} width="130" height="50" rx="25" fill={fill} fillOpacity={active === n.id ? 0.4 : 0.15} stroke={stroke} strokeWidth="2" /> : <rect x={n.x - 55} y={n.y - 20} width="110" height="40" rx="6" fill={fill} fillOpacity="0.4" stroke={stroke} strokeWidth="1.5" />}
                <text x={n.x} y={n.y - (n.sub ? 2 : 4)} textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-semibold">
                  {n.label}
                </text>
                {n.sub && <text x={n.x} y={n.y + 12} textAnchor="middle" className="fill-[#8B95A5] text-[9px]">
                    {n.sub}
                  </text>}
              </Component>;
        })}

          {/* Section labels */}
          <text x="20" y="48" className="fill-[#8B95A5] text-[9px] font-medium uppercase tracking-wider">RAW</text>
          <text x="20" y="178" className="fill-[#8B95A5] text-[9px] font-medium uppercase tracking-wider">PROCESSES</text>
          <text x="20" y="328" className="fill-[#8B95A5] text-[9px] font-medium uppercase tracking-wider">PRODUCTS</text>
        </svg>
      </div>

      <p className="text-xs text-[#8B95A5] italic text-center mt-4">
        Haga clic en cualquier píldora de proceso para resaltar su rama de producto. Haga clic en cualquier nodo para acceder al artículo detallado o a la página de producto.
      </p>
    </div>;
}