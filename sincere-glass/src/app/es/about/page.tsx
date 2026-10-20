import { Metadata } from "next";
import AboutHero from "@/_i18n/es/components/about/AboutHero";
import CompanyIntro from "@/_i18n/es/components/about/CompanyIntro";
import Timeline from "@/_i18n/es/components/about/Timeline";
import DualFactories from "@/_i18n/es/components/about/DualFactories";
import Leadership from "@/_i18n/es/components/about/Leadership";
import Certifications from "@/_i18n/es/components/about/Certifications";
import AboutCTA from "@/_i18n/es/components/about/AboutCTA";
import { makeAlternates } from "@/lib/i18n";
import FactoryBrollLoop from "@/_i18n/es/components/FactoryBrollLoop";
import VideoSchema from "@/_i18n/es/components/VideoSchema";
export const metadata: Metadata = {
  title: "Sobre Nosotros — Sincere Glass",
  description: "Fundada en 2005, Sincere Glass opera dos fábricas modernas en Hubei, China. 20.000 m² de superficie total, más de 120 empleados, certificación 3C. Conozca nuestra historia, liderazgo y capacidades.",
  openGraph: {
    title: "Sobre Sincere Glass — Dos Fábricas, Una Misión",
    description: "De un único taller en Wuhan a dos fábricas modernas en Hubei. Más de 15 años de excelencia en la fabricación de vidrio arquitectónico.",
    url: "https://sincereglass.com/about"
  },
  alternates: makeAlternates("/about", "es")
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://sincereglass.com/about#webpage",
  url: "https://sincereglass.com/about",
  name: "Acerca de Sincere Glass",
  isPartOf: {
    "@id": "https://sincereglass.com/#website"
  },
  about: {
    "@id": "https://sincereglass.com/#organization"
  }
};
export default function AboutPage() {
  return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd)
    }} />
      <VideoSchema contentUrl="https://sincereglass.com/videos/factory-broll.mp4" name="Sincere Glass Factory Walk-through" description="Un breve recorrido por las instalaciones de fabricación de vidrio arquitectónico de 20.000 m² de Sincere Glass en Wuhan, China. Muestra corte, templado, laminado y ensamblaje de vidrio aislante." uploadDate="2026-10-20" duration="PT12S" thumbnailUrl="https://sincereglass.com/images/factory-broll-poster.jpg" />
      <main>
        <AboutHero />

        {/* Factory b-roll — inserted between Hero and CompanyIntro */}
        <section className="py-20 bg-[#1C1F26]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-3">
                Ver las instalaciones
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-4">
                Dentro de nuestra fábrica de Wuhan
              </h2>
              <p className="text-[#8B95A5] max-w-2xl mx-auto leading-relaxed">
                Un breve recorrido por nuestra planta de producción de vidrio arquitectónico.
                Corte, templado, laminado y ensamblaje de vidrio aislante bajo un mismo techo.
              </p>
            </div>

            <FactoryBrollLoop overlayOpacity={0} className="rounded-xl aspect-[21/9] max-w-5xl mx-auto" />
          </div>
        </section>

        <CompanyIntro />
        <Timeline />
        <DualFactories />
        <Leadership />
        <Certifications />
        <AboutCTA />
      </main>
    </>;
}