import { Metadata } from "next";
import AboutHero from "@/_i18n/es/components/about/AboutHero";
import CompanyIntro from "@/_i18n/es/components/about/CompanyIntro";
import Timeline from "@/_i18n/es/components/about/Timeline";
import DualFactories from "@/_i18n/es/components/about/DualFactories";
import Leadership from "@/_i18n/es/components/about/Leadership";
import Certifications from "@/_i18n/es/components/about/Certifications";
import AboutCTA from "@/_i18n/es/components/about/AboutCTA";
export const metadata: Metadata = {
  title: "Sobre Nosotros — Sincere Glass",
  description: "Fundada en 2005, Sincere Glass opera dos fábricas modernas en Hubei, China. 20.000 m² de superficie total, más de 120 empleados, certificación 3C. Conozca nuestra historia, liderazgo y capacidades.",
  openGraph: {
    title: "Sobre Sincere Glass — Dos Fábricas, Una Misión",
    description: "De un único taller en Wuhan a dos fábricas modernas en Hubei. Más de 15 años de excelencia en la fabricación de vidrio arquitectónico.",
    url: "https://sincereglass.com/about"
  }
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
      <main>
        <AboutHero />
        <CompanyIntro />
        <Timeline />
        <DualFactories />
        <Leadership />
        <Certifications />
        <AboutCTA />
      </main>
    </>;
}