import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyIntro from "@/components/about/CompanyIntro";
import Timeline from "@/components/about/Timeline";
import DualFactories from "@/components/about/DualFactories";
import Leadership from "@/components/about/Leadership";
import Certifications from "@/components/about/Certifications";
import AboutCTA from "@/components/about/AboutCTA";
import { makeAlternates } from "@/lib/i18n";
import FactoryBrollLoop from "@/components/FactoryBrollLoop";
import VideoSchema from "@/components/VideoSchema";

export const metadata: Metadata = {
  title: "About Us — Sincere Glass",
  description: "Founded in 2005, Sincere Glass operates two modern factories in Hubei, China. 20,000㎡ total area, 120+ employees, 3C certified. Learn about our story, leadership, and capabilities.",
  openGraph: {
    title: "About Sincere Glass — Two Factories, One Mission",
    description: "From a single workshop in Wuhan to two modern factories across Hubei. 15+ years of architectural glass manufacturing excellence.",
    url: "https://sincereglass.com/about"
  },
  alternates: makeAlternates("/about")
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://sincereglass.com/about#webpage",
  url: "https://sincereglass.com/about",
  name: "About Sincere Glass",
  isPartOf: { "@id": "https://sincereglass.com/#website" },
  about: { "@id": "https://sincereglass.com/#organization" }
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoSchema
        contentUrl="https://sincereglass.com/videos/factory-broll.mp4"
        name="Sincere Glass Factory Walk-through"
        description="A short walk through Sincere Glass's 20,000 m² architectural glass manufacturing facility in Wuhan, China. Shows cutting, tempering, lamination, and insulated glass assembly."
        uploadDate="2026-10-20"
        duration="PT12S"
        thumbnailUrl="https://sincereglass.com/images/factory-broll-poster.jpg"
      />
      <main>
        <AboutHero />

        {/* Factory b-roll — inserted between Hero and CompanyIntro */}
        <section className="py-20 bg-[#1C1F26]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-3">
                See the facility
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-4">
                Inside our Wuhan factory
              </h2>
              <p className="text-[#8B95A5] max-w-2xl mx-auto leading-relaxed">
                A short walk through our architectural glass production floor.
                Cutting, tempering, lamination, and insulated glass assembly under one roof.
              </p>
            </div>

            <FactoryBrollLoop
              overlayOpacity={0}
              className="rounded-xl aspect-[21/9] max-w-5xl mx-auto"
            />
          </div>
        </section>

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