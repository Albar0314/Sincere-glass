"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";
const steps = [{
  num: "01",
  title: "Corte y Fabricación",
  desc: "El vidrio se corta a las dimensiones finales, se realiza el pulido de bordes y se ejecuta el perforado necesario. Toda la fabricación debe completarse antes del templado — el vidrio templado no puede modificarse una vez procesado.",
  temp: "Room temp",
  color: "bg-brand-secondary/10 text-brand-secondary"
}, {
  num: "02",
  title: "Lavado e Inspección",
  desc: "Las piezas cortadas se lavan minuciosamente para eliminar contaminantes. Cada pieza se inspecciona en busca de astillas, rayaduras o inclusiones antes de entrar al horno.",
  temp: "Room temp",
  color: "bg-brand-secondary/10 text-brand-secondary"
}, {
  num: "03",
  title: "Heating",
  desc: "El vidrio entra en un horno de templado y se calienta de manera uniforme hasta aproximadamente 620 °C — justo por debajo de su punto de ablandamiento. La variación de temperatura debe mantenerse dentro de ±5 °C para evitar distorsión óptica.",
  temp: "~620°C",
  color: "bg-red-500/10 text-red-600"
}, {
  num: "04",
  title: "Quenching",
  desc: "Chorros de aire a alta presión enfrían rápidamente ambas superficies de forma simultánea. La superficie se solidifica primero mientras el interior aún está caliente, creando el equilibrio de tensiones de compresión y tracción que define el vidrio templado.",
  temp: "Rapid cool",
  color: "bg-blue-500/10 text-blue-600"
}, {
  num: "05",
  title: "Control de Calidad",
  desc: "Cada panel se somete a pruebas de fragmentación, medición de tensiones e inspección visual. Verificamos el cumplimiento de GB 15763.2-2005 antes de que cualquier producto sea despachado.",
  temp: "Room temp",
  color: "bg-green-500/10 text-green-600"
}];
export default function ManufacturingProcess() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.05
  });
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActiveStep(prev => (prev + 1) % steps.length), 4000);
    return () => clearInterval(t);
  }, [isInView, paused]);
  function selectStep(i: number) {
    setActiveStep(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }
  return <section id="how-its-made" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10 md:mb-14" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Cómo se Fabrica el Vidrio Templado</h2>
          <p className="mt-4 text-brand-muted text-lg">Cinco etapas de precisión controlada, desde la lámina en bruto hasta el vidrio de seguridad certificado.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 md:gap-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

          {/* Steps — horizontal scroll on mobile, vertical on desktop */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
            {steps.map((step, i) => <button key={step.num} onClick={() => selectStep(i)} className={"flex-shrink-0 min-w-[140px] lg:min-w-0 text-left p-3 lg:p-4 rounded-xl border transition-all duration-300 " + (activeStep === i ? "bg-brand-dark border-brand-dark shadow-lg" : "bg-white border-brand-light hover:border-brand-secondary/30")} style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(12px)",
            transition: "all 500ms",
            transitionDelay: 200 + i * 80 + "ms"
          }}>
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className={"text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap " + (activeStep === i ? "bg-brand-accent/20 text-brand-accent" : step.color)}>{step.num}</span>
                  <span className={"text-xs lg:text-sm font-medium whitespace-nowrap " + (activeStep === i ? "text-white" : "text-brand-dark")}>{step.title}</span>
                </div>
              </button>)}
          </div>

          {/* Detail panel */}
          <div className="bg-brand-lighter rounded-2xl p-6 md:p-10 min-h-[200px] md:min-h-[260px] flex flex-col justify-center">
            <div key={activeStep} className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={"text-xs md:text-sm font-bold px-3 py-1 rounded-full " + steps[activeStep].color}>Step {steps[activeStep].num}</span>
                <span className={"text-xs px-2.5 py-0.5 rounded-full " + steps[activeStep].color}>{steps[activeStep].temp}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">{steps[activeStep].title}</h3>
              <p className="mt-3 md:mt-4 text-brand-muted leading-relaxed text-base md:text-lg">{steps[activeStep].desc}</p>
            </div>
          </div>
        </div>

        {/* Progress dots (mobile) / bar (desktop) */}
        <div className="mt-6 md:mt-10 flex items-center gap-1.5 md:gap-1">
          {steps.map((_, i) => <button key={i} onClick={() => selectStep(i)} className={"h-1.5 md:h-1.5 rounded-full transition-all duration-300 cursor-pointer " + (i === activeStep ? "bg-brand-accent flex-[2]" : i < activeStep ? "bg-brand-accent/50 flex-1" : "bg-brand-light flex-1")} />)}
        </div>
      </div>
    </section>;
}