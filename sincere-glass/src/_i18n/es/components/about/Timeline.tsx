"use client";

import { useInView } from "@/lib/useInView";
const milestones = [{
  year: "2005",
  title: "Fundada en Wuhan",
  desc: "Establecida como taller de procesamiento de vidrio en el Parque Industrial Wujin, Distrito de Hannan, Wuhan."
}, {
  year: "2008",
  title: "Reconocimiento del Sector",
  desc: "Se convirtió en miembro del consejo de la Asociación de Vidrio de Wuhan y obtuvo el reconocimiento de 'Empresa de Integridad'."
}, {
  year: "2010",
  title: "Premio al Liderazgo",
  desc: "El presidente Li Chuanren fue reconocido como uno de los 10 Empresarios Destacados de Wuhan (8.ª edición)."
}, {
  year: "2012",
  title: "Hitos de Calidad",
  desc: "Obtuvo la certificación 'Cero Accidentes de Seguridad' y el reconocimiento 'Marca de Calidad Reconocida de China'."
}, {
  year: "2016",
  title: "Expansión de Capacidad",
  desc: "Inversión en nuevas líneas de producción de alta eficiencia energética. Ampliación desde vidrio templado individual hasta gama completa de productos."
}, {
  year: "2019",
  title: "Segunda Fábrica",
  desc: "Inauguración de la instalación de 20,000㎡ en Honghu, en el Parque Industrial Xintan, con capacidad de templado de gran formato (3m×15m) y línea automatizada de llenado de gas para UVA (Unidad de Vidrio Aislante)."
}, {
  year: "2024",
  title: "Expansión Internacional",
  desc: "Lanzamiento de la división de comercio exterior. Desarrollo de sincereglass.com para atender directamente a compradores B2B a nivel global."
}];
export default function Timeline() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.05
  });
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 transition-all duration-600" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Nuestra Trayectoria</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-brand-light md:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return <div key={m.year} className="relative flex items-start" style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 600ms ease-out",
              transitionDelay: `${200 + i * 100}ms`
            }}>
                  {/* Desktop: alternating sides */}
                  <div className={`hidden md:flex w-full items-start ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-[calc(50%-2rem)] ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
                      <span className="text-brand-accent font-display font-bold text-2xl">{m.year}</span>
                      <h3 className="mt-1 font-semibold text-brand-dark text-lg">{m.title}</h3>
                      <p className="mt-2 text-brand-muted text-sm leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="relative flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-brand-accent border-4 border-white shadow-sm" />
                    </div>
                    <div className="w-[calc(50%-2rem)]" />
                  </div>

                  {/* Mobile: always left-aligned */}
                  <div className="md:hidden flex items-start">
                    <div className="relative flex-shrink-0 mr-5">
                      <div className="w-3 h-3 rounded-full bg-brand-accent border-3 border-white shadow-sm" />
                    </div>
                    <div>
                      <span className="text-brand-accent font-display font-bold text-xl">{m.year}</span>
                      <h3 className="mt-1 font-semibold text-brand-dark">{m.title}</h3>
                      <p className="mt-1 text-brand-muted text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
    </section>;
}