import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductsOverview from "@/components/home/ProductsOverview";
import WhyUs from "@/components/home/WhyUs";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import ProjectCases from "@/components/home/ProjectCases";
import HomepagePhotoStrip from "@/components/HomepagePhotoStrip";
import QuoteForm from "@/components/home/QuoteForm";
import BlogTeaserLive from "@/components/BlogTeaserLive";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Sincere Glass | Architectural Glass Manufacturer in China",
  description: "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000㎡, 3C certified. Get a free quote.",
  openGraph: {
    title: "Sincere Glass | Architectural Glass Manufacturer in China",
    description: "Custom architectural glass from China — tempered, insulated, laminated & enameled. Two modern factories, 2,600+ projects, 3C certified.",
    url: "https://sincereglass.com",
    siteName: "Sincere Glass",
    type: "website"
  },
  alternates: makeAlternates("/")
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