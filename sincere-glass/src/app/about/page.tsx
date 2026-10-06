import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyIntro from "@/components/about/CompanyIntro";
import Timeline from "@/components/about/Timeline";
import DualFactories from "@/components/about/DualFactories";
import Leadership from "@/components/about/Leadership";
import Certifications from "@/components/about/Certifications";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us — Sincere Glass",
  description:
    "Founded in 2005, Sincere Glass operates two modern factories in Hubei, China. 20,000㎡ total area, 120+ employees, 3C certified. Learn about our story, leadership, and capabilities.",
  openGraph: {
    title: "About Sincere Glass — Two Factories, One Mission",
    description:
      "From a single workshop in Wuhan to two modern factories across Hubei. 15+ years of architectural glass manufacturing excellence.",
    url: "https://sincereglass.com/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://sincereglass.com/about#webpage",
  url: "https://sincereglass.com/about",
  name: "About Sincere Glass",
  isPartOf: { "@id": "https://sincereglass.com/#website" },
  about: { "@id": "https://sincereglass.com/#organization" },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <AboutHero />
        <CompanyIntro />
        <Timeline />
        <DualFactories />
        <Leadership />
        <Certifications />
        <AboutCTA />
      </main>
    </>
  );
}
