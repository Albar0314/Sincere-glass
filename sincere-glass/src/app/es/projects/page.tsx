import { Metadata } from "next";
import ProjectsClient from "@/_i18n/es/components/projects/ProjectsClient";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Casos de Proyectos — Más de 2.600 Proyectos de Referencia | Sincere Glass",
  description: "Vea nuestro vidrio en acción: Estación de Wuhan, Terminal T3 del Aeropuerto Tianhe, Centro de Exposiciones y más de 2.600 proyectos adicionales. Vidrio templado, vidrio aislante, vidrio laminado y vidrio esmaltado para los edificios emblemáticos de China.",
  openGraph: {
    title: "Casos de Proyectos de Ingeniería | Sincere Glass",
    description: "Más de 2.600 proyectos de vidrio en toda China. Vea nuestro trabajo en aeropuertos, hospitales, torres comerciales y desarrollos residenciales.",
    url: "https://sincereglass.com/projects"
  },
  alternates: makeAlternates("/projects")
};
export default function ProjectsPage() {
  return <ProjectsClient />;
}