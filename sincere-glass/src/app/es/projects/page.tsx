import { Metadata } from "next";
import ProjectsClient from "@/_i18n/es/components/projects/ProjectsClient";
import { makeAlternates } from "@/lib/i18n";
import YouTubeEmbed from "@/_i18n/es/components/YouTubeEmbed";
export const metadata: Metadata = {
  title: "Casos de Proyectos — Más de 2.600 Proyectos de Referencia | Sincere Glass",
  description: "Vea nuestro vidrio en acción: Estación de Wuhan, Terminal T3 del Aeropuerto Tianhe, Centro de Exposiciones y más de 2.600 proyectos adicionales. Vidrio templado, vidrio aislante, vidrio laminado y vidrio esmaltado para los edificios emblemáticos de China.",
  openGraph: {
    title: "Casos de Proyectos de Ingeniería | Sincere Glass",
    description: "Más de 2.600 proyectos de vidrio en toda China. Vea nuestro trabajo en aeropuertos, hospitales, torres comerciales y desarrollos residenciales.",
    url: "https://sincereglass.com/projects"
  },
  alternates: makeAlternates("/projects", "es")
};
export default function ProjectsPage() {
  return <>
      <ProjectsClient />

      {/* Factory b-roll — closes the page with "the factory behind these projects" */}
      <section className="py-16 md:py-20 bg-brand-lighter border-t border-brand-light">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-3">
                La fábrica detrás de estos proyectos
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-3">
                Cada panel de esta página fue fabricado aquí
              </h2>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                Nuestra planta de Wuhan de 20.000 m² produce cada pieza de vidrio entregada en los proyectos anteriores. Corte, templado, laminado y ensamblaje de UVA (Unidad de Vidrio Aislante), todo en instalaciones propias.
              </p>
            </div>
            <YouTubeEmbed videoId="TDjYxiRUZOM" title="Dentro de Sincere Glass — fábrica de Wuhan" aspectRatio="16/9" />
          </div>
        </div>
      </section>
    </>;
}