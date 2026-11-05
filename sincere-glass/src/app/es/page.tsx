import { Metadata } from "next";
import HeroSection from "@/_i18n/es/components/home/HeroSection";
import TrustBar from "@/_i18n/es/components/home/TrustBar";
import ProductsOverview from "@/_i18n/es/components/home/ProductsOverview";
import WhyUs from "@/_i18n/es/components/home/WhyUs";
import CompanySnapshot from "@/_i18n/es/components/home/CompanySnapshot";
import ProjectCases from "@/_i18n/es/components/home/ProjectCases";
import HomepagePhotoStrip from "@/_i18n/es/components/HomepagePhotoStrip";
import QuoteForm from "@/_i18n/es/components/home/QuoteForm";
import BlogTeaserLive from "@/_i18n/es/components/BlogTeaserLive";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Sincere Glass | Fabricante de Vidrio Arquitectónico en China",
  description: "Sincere Glass fabrica vidrio templado, aislante, laminado y esmaltado para proyectos de construcción a nivel global. Dos fábricas, 20,000㎡, certificación 3C. Obtenga una cotización gratuita.",
  openGraph: {
    title: "Sincere Glass | Fabricante de Vidrio Arquitectónico en China",
    description: "Vidrio arquitectónico a medida desde China — templado, aislante, laminado y esmaltado. Dos fábricas modernas, más de 2,600 proyectos, certificación 3C.",
    url: "https://sincereglass.com",
    siteName: "Sincere Glass",
    type: "website"
  },
  alternates: makeAlternates("/", "es")
};

export default function HomePage() {
  return <>
      <main>
        <HeroSection />
        <TrustBar />
        <ProductsOverview />
        <WhyUs />
        <CompanySnapshot />
        <ProjectCases />
        <HomepagePhotoStrip />
        <QuoteForm />
        <BlogTeaserLive />
      </main>
    </>;
}