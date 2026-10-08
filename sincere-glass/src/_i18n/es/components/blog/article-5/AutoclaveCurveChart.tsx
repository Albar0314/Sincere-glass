'use client';

import { useState } from 'react';
interface Point {
  t: number; // time in minutes
  temp: number; // °C
  pressure: number; // bar
  label: string;
  state: string;
  color: string;
}
const points: Point[] = [{
  t: 0,
  temp: 25,
  pressure: 1,
  label: 'Load',
  state: "El sándwich de vidrio+PVB (polivinil butiral)+vidrio entra en el autoclave a temperatura ambiente y presión atmosférica. El PVB (polivinil butiral) es ligeramente adhesivo tras la etapa de preprensado (rodillo de compresión).",
  color: '#64748B'
}, {
  t: 20,
  temp: 70,
  pressure: 4,
  label: 'Pre-heat',
  state: "La cámara aumenta la temperatura lentamente para que todo el sándwich alcance una temperatura uniforme. La presión se incrementa para comprimir el aire atrapado y reabsorberlo antes de que pueda formar burbujas permanentes.",
  color: '#60A5FA'
}, {
  t: 45,
  temp: 110,
  pressure: 10,
  label: 'Softening',
  state: "El PVB (polivinil butiral) alcanza su punto de fluidez (~110 °C) y comienza a fluir hacia cada microcavidad entre las superficies del vidrio. La presión está cerca del máximo para evitar la desairificación.",
  color: '#FBBF24'
}, {
  t: 75,
  temp: 140,
  pressure: 12,
  label: 'Hold',
  state: "Permanencia total a 140 °C / 12 bar durante 30+ minutos. El PVB (polivinil butiral) se funde completamente con las superficies del vidrio — el enlace químico que confiere al vidrio laminado su resistencia se forma durante esta fase de mantenimiento.",
  color: '#F59E0B'
}, {
  t: 110,
  temp: 90,
  pressure: 10,
  label: 'Cool-down',
  state: "La temperatura desciende bajo presión mantenida. La presión debe mantenerse alta hasta que la temperatura esté muy por debajo del punto de fluidez del PVB (polivinil butiral), de lo contrario el aire atrapado puede reaparecer en forma de burbujas.",
  color: '#A78BFA'
}, {
  t: 140,
  temp: 40,
  pressure: 2,
  label: 'De-pressure',
  state: "La presión se libera gradualmente. El laminado es ahora permanente: el PVB (polivinil butiral) y el vidrio están unidos a nivel molecular.",
  color: '#34D399'
}, {
  t: 150,
  temp: 30,
  pressure: 1,
  label: 'Unload',
  state: "Los paneles de vidrio laminado terminados salen del autoclave. Los bordes se inspeccionan para verificar la calidad de la desairificación. La calidad óptica transparente requiere que no haya estrías ni inclusiones visibles en la lámina intermedia.",
  color: '#06B6D4'
}];
const TEMP_MAX = 160;
const PRESS_MAX = 14;
const TIME_MAX = 160;
export default function AutoclaveCurveChart() {
  const [active, setActive] = useState(3);
  const width = 720;
  const height = 340;
  const padL = 55;
  const padR = 55;
  const padT = 30;
  const padB = 55;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const toX = (t: number) => padL + t / TIME_MAX * plotW;
  const toYT = (temp: number) => padT + plotH - temp / TEMP_MAX * plotH;
  const toYP = (pressure: number) => padT + plotH - pressure / PRESS_MAX * plotH;
  const tempPath = points.map((p, i) => (i === 0 ? 'M' : 'L') + ' ' + toX(p.t) + ' ' + toYT(p.temp)).join(' ');
  const pressPath = points.map((p, i) => (i === 0 ? 'M' : 'L') + ' ' + toX(p.t) + ' ' + toYP(p.pressure)).join(' ');
  const current = points[active];
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
            Ciclo de temperatura y presión del autoclave
          </p>
          <p className="text-xs text-[#8B95A5]">Ciclo estándar de laminado con PVB (polivinil butiral), ~2,5 horas en total</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#EF4444]" />
            <span className="text-[#8B95A5]">Temperature</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#3B82F6]" />
            <span className="text-[#8B95A5]">Pressure</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={'0 0 ' + width + ' ' + height} className="w-full min-w-[500px]" xmlns="http://www.w3.org/2000/svg">
          {/* Grid */}
          {[0, 40, 80, 120, 160].map(t => <g key={t}>
              <line x1={padL} y1={toYT(t)} x2={width - padR} y2={toYT(t)} stroke="#3A4250" strokeWidth="0.5" opacity="0.4" strokeDasharray="3,3" />
              <text x={padL - 8} y={toYT(t) + 4} textAnchor="end" className="fill-[#EF4444] text-[10px] font-mono" opacity="0.7">
                {t}°C
              </text>
            </g>)}

          {/* Pressure labels on right */}
          {[0, 4, 8, 12].map(p => <text key={p} x={width - padR + 8} y={toYP(p) + 4} textAnchor="start" className="fill-[#3B82F6] text-[10px] font-mono" opacity="0.7">
              {p} bar
            </text>)}

          {/* Temperature curve */}
          <path d={tempPath} fill="none" stroke="#EF4444" strokeWidth="2.5" />
          {/* Pressure curve */}
          <path d={pressPath} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,2" />

          {/* Data points - temperature */}
          {points.map((p, i) => {
          const isActive = active === i;
          return <g key={'t' + i} onMouseEnter={() => setActive(i)} style={{
            cursor: 'pointer'
          }}>
                <circle cx={toX(p.t)} cy={toYT(p.temp)} r={isActive ? 7 : 4} fill="#EF4444" stroke="#1C1F26" strokeWidth="2" style={{
              transition: 'all 0.2s'
            }} />
                <circle cx={toX(p.t)} cy={toYP(p.pressure)} r={isActive ? 7 : 4} fill="#3B82F6" stroke="#1C1F26" strokeWidth="2" style={{
              transition: 'all 0.2s'
            }} />
                {isActive && <>
                    <line x1={toX(p.t)} y1={padT} x2={toX(p.t)} y2={height - padB} stroke={p.color} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                    <text x={toX(p.t)} y={padT - 10} textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-semibold">
                      {p.label}
                    </text>
                  </>}
                {!isActive && <text x={toX(p.t)} y={padT - 10} textAnchor="middle" className="fill-[#8B95A5] text-[9px]">
                    {p.label}
                  </text>}
              </g>;
        })}

          {/* X-axis label */}
          <text x={width / 2} y={height - 15} textAnchor="middle" className="fill-[#8B95A5] text-[10px]">
            Tiempo (minutos) — ciclo estándar ~2,5 horas
          </text>
        </svg>
      </div>

      <div className="mt-4 bg-[#1C1F26]/40 rounded-lg p-4 border" style={{
      borderColor: current.color + '50'
    }}>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <div className="w-3 h-3 rounded-full" style={{
          backgroundColor: current.color
        }} />
          <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">{current.label}</h4>
          <span className="text-xs font-mono text-[#8B95A5] ml-auto">
            t = {current.t} min · {current.temp}°C · {current.pressure} bar
          </span>
        </div>
        <p className="text-sm text-[#8B95A5] leading-relaxed m-0">{current.state}</p>
      </div>
    </div>;
}