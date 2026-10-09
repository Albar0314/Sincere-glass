import { Metadata } from "next";
import HeroSection from "@/_i18n/es/components/home/HeroSection";
import TrustBar from "@/_i18n/es/components/home/TrustBar";
import ProductsOverview from "@/_i18n/es/components/home/ProductsOverview";
import WhyUs from "@/_i18n/es/components/home/WhyUs";
import CompanySnapshot from "@/_i18n/es/components/home/CompanySnapshot";
import ProjectCases from "@/_i18n/es/components/home/ProjectCases";
import EquipmentGrid from "@/_i18n/es/components/home/EquipmentGrid";
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
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "Organization",
    "@id": "https://sincereglass.com/#organization",
    name: "Sincere Glass",
    alternateName: ["武汉欣城玻璃有限公司", "湖北欣之城玻璃有限公司"],
    url: "https://sincereglass.com",
    logo: "https://sincereglass.com/images/logo.svg",
    description: "Fabricante de vidrio arquitectónico en China especializado en vidrio templado, aislante, laminado y esmaltado.",
    foundingDate: "2005",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 120
    },
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+86-27-86338180",
      contactType: "sales",
      email: "xcglass@sina.cn"
    }]
  }, {
    "@type": "WebSite",
    "@id": "https://sincereglass.com/#website",
    url: "https://sincereglass.com",
    name: "Sincere Glass",
    publisher: {
      "@id": "https://sincereglass.com/#organization"
    }
  }, {
    "@type": "WebPage",
    "@id": "https://sincereglass.com/#webpage",
    url: "https://sincereglass.com",
    name: "Sincere Glass | Fabricante de Vidrio Arquitectónico en China",
    isPartOf: {
      "@id": "https://sincereglass.com/#website"
    },
    about: {
      "@id": "https://sincereglass.com/#organization"
    }
  }]
};
export default function HomePage() {
  return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd)
    }} />
      <main>
        <HeroSection />
        <TrustBar />
        <ProductsOverview />
        <WhyUs />
        <CompanySnapshot />
        <ProjectCases />
        <EquipmentGrid />
        <QuoteForm />
        <BlogTeaserLive />
      </main>
    </>;
}