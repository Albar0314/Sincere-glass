import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductsOverview from "@/components/home/ProductsOverview";
import WhyUs from "@/components/home/WhyUs";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import ProjectCases from "@/components/home/ProjectCases";
import EquipmentGrid from "@/components/home/EquipmentGrid";
import QuoteForm from "@/components/home/QuoteForm";
import BlogTeaser from "@/components/home/BlogTeaser";

export const metadata: Metadata = {
  title: "Sincere Glass | Architectural Glass Manufacturer in China",
  description:
    "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000㎡, 3C certified. Get a free quote.",
  openGraph: {
    title: "Sincere Glass | Architectural Glass Manufacturer in China",
    description:
      "Custom architectural glass from China — tempered, insulated, laminated & enameled. Two modern factories, 2,600+ projects, 3C certified.",
    url: "https://sincereglass.com",
    siteName: "Sincere Glass",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sincereglass.com/#organization",
      name: "Sincere Glass",
      alternateName: ["武汉欣城玻璃有限公司", "湖北欣之城玻璃有限公司"],
      url: "https://sincereglass.com",
      logo: "https://sincereglass.com/images/logo.svg",
      description: "Architectural glass manufacturer in China specializing in tempered, insulated, laminated and enameled glass.",
      foundingDate: "2005",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 120 },
      contactPoint: [{ "@type": "ContactPoint", telephone: "+86-27-86338180", contactType: "sales", email: "xcglass@sina.cn" }],
    },
    { "@type": "WebSite", "@id": "https://sincereglass.com/#website", url: "https://sincereglass.com", name: "Sincere Glass", publisher: { "@id": "https://sincereglass.com/#organization" } },
    { "@type": "WebPage", "@id": "https://sincereglass.com/#webpage", url: "https://sincereglass.com", name: "Sincere Glass | Architectural Glass Manufacturer in China", isPartOf: { "@id": "https://sincereglass.com/#website" }, about: { "@id": "https://sincereglass.com/#organization" } },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
    </>
  );
}
