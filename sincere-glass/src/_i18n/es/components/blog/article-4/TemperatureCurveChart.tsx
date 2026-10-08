'use client';

import { useState } from 'react';
interface Point {
  t: number; // time in seconds (x-axis)
  temp: number; // temperature in °C
  label: string;
  state: string;
  color: string;
}
const points: Point[] = [{
  t: 0,
  temp: 25,
  label: 'Start',
  state: "Sólido, sin tensión — vidrio recocido en bruto",
  color: '#64748B'
}, {
  t: 60,
  temp: 300,
  label: 'Pre-heat',
  state: "Aún rígido, las moléculas comienzan a vibrar",
  color: '#60A5FA'
}, {
  t: 180,
  temp: 500,
  label: 'Heating',
  state: "Moléculas móviles, aún sin cambio de forma",
  color: '#FBBF24'
}, {
  t: 300,
  temp: 620,
  label: "Punto máximo (ablandamiento)",
  state: "Aproximándose al punto de ablandamiento — justo por debajo del flujo plástico",
  color: '#F59E0B'
}, {
  t: 305,
  temp: 580,
  label: "Salida del horno",
  state: "Núcleo y superficie a una temperatura elevada similar",
  color: '#EF4444'
}, {
  t: 320,
  temp: 300,
  label: "Enfriamiento rápido de la superficie",
  state: "Superficie congelada y rígida; el núcleo aún está caliente y tiende a contraerse",
  color: '#DC2626'
}, {
  t: 360,
  temp: 150,
  label: "Tensión bloqueada",
  state: "El núcleo termina de enfriarse y se contrae contra la superficie congelada → tensión de compresión incorporada",
  color: '#A78BFA'
}, {
  t: 420,
  temp: 25,
  label: 'Finished',
  state: "Totalmente templado: ~180 MPa de compresión superficial, resistencia 4-5×",
  color: '#34D399'
}];
const TEMP_MAX = 700;
const TIME_MAX = 420;
export default function TemperatureCurveChart() {
  const [active, setActive] = useState<number>(4); // start at "Exit furnace"

  const width = 700;
  const height = 320;
  const padL = 50;
  const padR = 20;
  const padT = 30;
  const padB = 50;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const toX = (t: number) => padL + t / TIME_MAX * plotW;
  const toY = (temp: number) => padT + plotH - temp / TEMP_MAX * plotH;

  // Build path through all points
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.t)} ${toY(p.temp)}`).join(' ');

  // Build area under curve (gradient fill)
  const areaPath = `${path} L ${toX(TIME_MAX)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;
  const currentPoint = points[active];
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
            Curva Temperatura-Tiempo
          </p>
          <p className="text-xs text-[#8B95A5]">Lo que experimenta el vidrio, momento a momento</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8B95A5]">Pase el cursor por cualquier punto</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]" xmlns="http://www.w3.org/2000/svg">
          {/* Gradient for area fill */}
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines - horizontal (temperature) */}
          {[0, 200, 400, 600].map(t => <g key={t}>
              <line x1={padL} y1={toY(t)} x2={width - padR} y2={toY(t)} stroke="#3A4250" strokeWidth="0.5" opacity="0.4" strokeDasharray="3,3" />
              <text x={padL - 8} y={toY(t) + 4} textAnchor="end" className="fill-[#8B95A5] text-[10px] font-mono">
                {t}°C
              </text>
            </g>)}

          {/* Softening point reference line */}
          <line x1={padL} y1={toY(620)} x2={width - padR} y2={toY(620)} stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,2" opacity="0.5" />
          <text x={width - padR - 5} y={toY(620) - 5} textAnchor="end" className="fill-[#F59E0B] text-[9px]">
            Punto de ablandamiento ~620°C
          </text>

          {/* Area under curve */}
          <path d={areaPath} fill="url(#tempGradient)" />

          {/* Main curve */}
          <path d={path} fill="none" stroke="#DAA745" strokeWidth="2.5" />

          {/* Data points */}
          {points.map((p, i) => {
          const isActive = active === i;
          return <g key={i} onMouseEnter={() => setActive(i)} style={{
            cursor: 'pointer'
          }}>
                <circle cx={toX(p.t)} cy={toY(p.temp)} r={isActive ? 8 : 5} fill={p.color} stroke="#1C1F26" strokeWidth="2" style={{
              transition: 'all 0.2s'
            }} />
                {isActive && <circle cx={toX(p.t)} cy={toY(p.temp)} r={14} fill="none" stroke={p.color} strokeWidth="1.5" opacity="0.5" />}
                <text x={toX(p.t)} y={toY(p.temp) - 14} textAnchor="middle" className={`text-[9px] font-medium ${isActive ? 'fill-[#F2F0ED]' : 'fill-[#8B95A5]'}`} style={{
              transition: 'all 0.2s'
            }}>
                  {p.label}
                </text>
              </g>;
        })}

          {/* X-axis label */}
          <text x={width / 2} y={height - 10} textAnchor="middle" className="fill-[#8B95A5] text-[10px]">
            Tiempo → (aprox. 7 minutos de principio a fin)
          </text>
        </svg>
      </div>

      {/* Active point detail */}
      <div className="mt-4 bg-[#1C1F26]/40 rounded-lg p-4 border" style={{
      borderColor: `${currentPoint.color}50`
    }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full" style={{
          backgroundColor: currentPoint.color
        }} />
          <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">
            {currentPoint.label}
          </h4>
          <span className="text-xs font-mono text-[#8B95A5] ml-auto">
            {currentPoint.temp}°C · t = {currentPoint.t}s
          </span>
        </div>
        <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
          {currentPoint.state}
        </p>
      </div>
    </div>;
}