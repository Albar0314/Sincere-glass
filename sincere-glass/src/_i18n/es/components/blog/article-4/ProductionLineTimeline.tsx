'use client';

import { useState } from 'react';
interface Phase {
  id: string;
  num: string;
  title: string;
  duration: string;
  temp: string;
  summary: string;
  details: string[];
  factoryNote?: string;
  color: string;
}
const phases: Phase[] = [{
  id: 'raw',
  num: '00',
  title: "Recepción de Materia Prima",
  duration: 'Pre-production',
  temp: 'Ambient',
  summary: "Las hojas de vidrio flotado recocido llegan de plantas flotadoras aguas arriba y se inspeccionan para detectar defectos ópticos.",
  details: ["Cada lote se verifica en cuanto a tolerancia de espesor (±0,2 mm para vidrio de 6 mm según GB 11614)", "Defectos superficiales clasificados conforme al Anexo A de GB 11614 — burbujas, inclusiones, rayaduras", "El vidrio con inclusiones de NiS (sulfuro de níquel) presenta riesgo durante el templado — puede causar rotura espontánea años después"],
  factoryNote: 'We source float glass from certified upstream mills and reject any lot with visible NiS indicators before it enters our production flow.',
  color: '#64748B'
}, {
  id: 'cut',
  num: '01',
  title: "Corte de Precisión",
  duration: '30-60 sec per sheet',
  temp: 'Ambient',
  summary: "Ruedas de carburo controladas por CNC marcan el vidrio hasta las dimensiones finales, que luego se separan por fractura controlada.",
  details: ["Las líneas modernas utilizan corte CNC con tolerancia de ±0,5 mm en hojas jumbo de 3m × 15m", "Todos los taladros, muescas y formas de borde deben realizarse en esta etapa — nada puede cortarse después del templado", "Los planos de especificación se finalizan antes de esta etapa; las modificaciones en obra después del templado son imposibles"],
  factoryNote: 'We run 4 intelligent cutting lines capable of handling jumbo panels up to 3m × 15m — the maximum our tempering furnace will accept.',
  color: '#60A5FA'
}, {
  id: 'edge',
  num: '02',
  title: "Acabado de Bordes",
  duration: '2-5 min per edge',
  temp: 'Ambient',
  summary: "Los bordes recién cortados se esmerilán, arizan o pulen para eliminar las microfisuras que iniciarían roturas durante el templado.",
  details: ["Los bordes de corte en bruto presentan microfisuras que concentran tensiones durante el choque térmico del templado", "Acabado mínimo: \"arizado\" (eliminación de aristas vivas); superior: \"esmerilado\" o \"pulido plano\"", "La calidad del borde es el principal predictor de roturas en el interior del horno"],
  factoryNote: 'Our 4 edge-grinding lines produce polished edges that meet the EN 12150 edge-strength requirement for structural glazing applications.',
  color: '#34D399'
}, {
  id: 'wash',
  num: '03',
  title: "Lavado y Secado",
  duration: '3-5 min per sheet',
  temp: 'Ambient',
  summary: "El vidrio pasa por una lavadora multicilos con agua desionizada y, a continuación, por un secado con cuchillas de aire antes de entrar al horno.",
  details: ["Cualquier residuo — aceite, huellas dactilares, fluido de corte — deja marcas permanentes al cocer a 620°C", "El agua desionizada previene manchas de minerales", "La inspección visual con luz rasante detecta la contaminación que la lavadora no eliminó"],
  color: '#06B6D4'
}, {
  id: 'heat',
  num: '04',
  title: "El Horno (Calentamiento)",
  duration: '2-4 min, depending on thickness',
  temp: 'Ramping to 620°C',
  summary: "El vidrio avanza a través de un horno horizontal de rodillos, calentado hasta su punto de ablandamiento mediante elementos radiantes superiores e inferiores.",
  details: ["Temperatura objetivo: ~620 °C (justo por debajo del punto de ablandamiento de 650-700 °C)", "El calentamiento debe ser uniforme — los puntos calientes causan distorsión, los puntos fríos provocan un templado fallido", "Los rodillos giran de forma continua; la detención genera la distorsión conocida como \"onda de rodillo\"", "La longitud del horno determina la capacidad de producción: nuestro horno procesa paneles de hasta 15 m de longitud"],
  factoryNote: 'We operate 2 tempering furnaces; the larger one accepts panels up to 3m × 15m — among the largest in Hubei province.',
  color: '#F59E0B'
}, {
  id: 'quench',
  num: '05',
  title: "Enfriamiento Rápido (El Paso Crítico)",
  duration: '60-90 seconds',
  temp: '620°C → 300°C in seconds',
  summary: "Inmediatamente después de salir del horno, chorros de aire a alta presión golpean ambas superficies de forma simultánea, congelando la superficie mientras el núcleo permanece caliente.",
  details: ["El enfriamiento rápido genera el perfil de tensiones: compresión superficial (~180 MPa), tensión en el núcleo", "Los chorros de aire deben impactar ambas superficies de forma simultánea y uniforme — un enfriamiento rápido asimétrico deforma el panel", "La presión del aire es de ~5000 Pa, con un caudal de ~100 000 m³/hora a través de matrices de toberas", "Este es el paso que convierte al vidrio templado en \"templado\" — todo lo anterior es preparación"],
  factoryNote: 'Our quenching sections use optimized nozzle geometry calibrated for each glass thickness, achieving the compressive stress required by GB 15763.2 (≥90 MPa).',
  color: '#EF4444'
}, {
  id: 'qc',
  num: '06',
  title: "Control de Calidad y Ensayo de Rotura",
  duration: 'Per lot',
  temp: 'Ambient',
  summary: "Los paneles terminados pasan por inspección óptica automatizada; muestras seleccionadas se someten a ensayos destructivos para verificar el patrón de fragmentación.",
  details: ["Por cada lote: una muestra se rompe intencionalmente y se cuenta el número de fragmentos en un cuadrado de 50 mm × 50 mm", "La norma exige ≥40 fragmentos por cuadrado (GB 15763.2 §6.6)", "El escaneado óptico automatizado verifica la ondulación de rodillos, la curvatura y la distorsión superficial", "Las piezas que superan la inspección se embalan en bastidores en A para su envío"],
  factoryNote: 'We maintain complete batch records per order so that any field issue can be traced back to a specific production run.',
  color: '#8B5CF6'
}];
export default function ProductionLineTimeline() {
  const [active, setActive] = useState<string>('heat');
  const current = phases.find(p => p.id === active)!;
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-6">
        Recorrido por la Línea de Producción
      </p>

      {/* Phase navigation */}
      <div className="grid grid-cols-7 gap-1 mb-8 relative">
        {/* Timeline connector */}
        <div className="absolute top-5 left-0 right-0 h-px bg-[#3A4250]/40 -z-0" />

        {phases.map(p => {
        const isActive = active === p.id;
        return <button key={p.id} onClick={() => setActive(p.id)} className="flex flex-col items-center group relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-all ${isActive ? 'scale-110 text-white' : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/60 hover:border-[#DAA745]/50'}`} style={isActive ? {
            backgroundColor: current.color,
            borderColor: current.color
          } : {}}>
                {p.num}
              </div>
              <span className={`text-[9px] mt-1.5 text-center leading-tight transition-colors hidden md:block ${isActive ? 'text-[#F2F0ED]' : 'text-[#8B95A5]'}`}>
                {p.title.split(' ')[0]}
              </span>
            </button>;
      })}
      </div>

      {/* Phase detail */}
      <div className="bg-[#1C1F26]/40 rounded-lg p-5 border border-[#3A4250]/20">
        <div className="flex items-start justify-between mb-3 gap-4">
          <div>
            <h3 className="text-xl font-bold m-0 mb-1" style={{
            color: current.color
          }}>
              Phase {current.num} · {current.title}
            </h3>
            <div className="flex gap-4 text-xs text-[#8B95A5]">
              <span>⏱ {current.duration}</span>
              <span>🌡 {current.temp}</span>
            </div>
          </div>
        </div>

        <p className="text-[#F2F0ED] leading-relaxed mb-4 text-sm">
          {current.summary}
        </p>

        <ul className="list-none pl-0 space-y-2 mb-4">
          {current.details.map((d, i) => <li key={i} className="text-xs text-[#8B95A5] flex gap-2">
              <span style={{
            color: current.color
          }}>▸</span>
              <span>{d}</span>
            </li>)}
        </ul>

        {current.factoryNote && <div className="mt-4 pt-4 border-t border-[#3A4250]/30">
            <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
              En nuestra instalación de Wuhan
            </p>
            <p className="text-xs text-[#F2F0ED]/90 italic leading-relaxed m-0">
              {current.factoryNote}
            </p>
          </div>}
      </div>
    </div>;
}