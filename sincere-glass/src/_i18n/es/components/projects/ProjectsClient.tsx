"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import { useQuote } from "@/lib/QuoteContext";
import { projects, projectCategories, type Project } from "@/lib/projects";
function StatBar() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.3
  });
  const projectCount = useCountUp(2600, isInView);
  const cityCount = useCountUp(15, isInView);
  const yearCount = useCountUp(15, isInView);
  return <div ref={ref} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-10">
      {[{
      count: projectCount,
      suffix: "+",
      label: "Projects Completed"
    }, {
      count: cityCount,
      suffix: "+",
      label: "Cities Served"
    }, {
      count: yearCount,
      suffix: "+",
      label: "Years Track Record"
    }].map(s => <div key={s.label} className="text-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
            {s.count.toLocaleString()}<span className="text-brand-accent">{s.suffix}</span>
          </span>
          <p className="text-xs text-white/40 mt-1">{s.label}</p>
        </div>)}
    </div>;
}
function ProjectCard({
  project,
  index
}: {
  project: Project;
  index: number;
}) {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.05
  });
  return <div ref={ref} className={"group rounded-xl overflow-hidden bg-white border border-brand-light hover:border-brand-accent/20 hover:shadow-lg transition-all duration-300 " + (project.featured ? "md:col-span-2 md:row-span-2" : "")} style={{
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translateY(0)" : "translateY(20px)",
    transition: "all 500ms",
    transitionDelay: index % 6 * 80 + "ms"
  }}>
      <div className={"relative overflow-hidden " + (project.featured ? "aspect-[16/10]" : "aspect-[16/9]")}>
        <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={project.featured ? "66vw" : "33vw"} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Glass type tags */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {project.glassTypes.map(gt => <span key={gt} className="px-2 py-0.5 bg-brand-accent/90 text-brand-dark text-[10px] md:text-xs font-medium rounded">{gt}</span>)}
        </div>

        {/* Featured badge */}
        {project.featured && <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium rounded-full border border-white/20">
            Featured
          </div>}
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-display text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-accent transition-colors">{project.name}</h3>
        <p className="text-xs text-brand-muted mt-0.5">{project.location}</p>
        {project.featured && <p className="text-sm text-brand-muted mt-3 leading-relaxed line-clamp-2">{project.description}</p>}
      </div>
    </div>;
}
export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const {
    openQuote
  } = useQuote();
  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);
  return <main>
      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Casos de Proyecto</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Elegido por Proyectos Emblemáticos
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Desde aeropuertos y estaciones de tren hasta hospitales y residencias de lujo — nuestro vidrio forma parte de los edificios más ambiciosos de China.
          </p>
          <StatBar />
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 md:py-20 bg-brand-lighter">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {projectCategories.map(cat => <button key={cat} onClick={() => setActiveFilter(cat)} className={"px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 " + (activeFilter === cat ? "bg-brand-accent text-brand-dark" : "bg-white text-brand-muted border border-brand-light hover:border-brand-secondary/30")}>
                {cat}
                {cat !== "All" && <span className="ml-1.5 text-xs opacity-60">({projects.filter(p => p.category === cat).length})</span>}
              </button>)}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
            {filtered.map((project, i) => <ProjectCard key={project.name} project={project} index={i} />)}
          </div>

          {/* More projects note */}
          <div className="mt-12 text-center">
            <p className="text-brand-muted text-sm">Showing {filtered.length} de más de 2.600 proyectos en total. Estas son muestras representativas de nuestro portafolio.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">¿Quiere que Su Proyecto Aparezca en Este Mural?</h2>
          <p className="mt-4 text-white/60 text-lg">Todo proyecto emblemático comenzó con una conversación. Cuéntenos qué está construyendo.</p>
          <button onClick={() => openQuote("")} className="mt-8 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Inicie Su Proyecto
          </button>
        </div>
      </section>
    </main>;
}