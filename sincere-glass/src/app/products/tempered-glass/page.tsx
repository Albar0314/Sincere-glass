import { Metadata } from "next";
import TemperedHero from "@/components/products/tempered/TemperedHero";
import WhatIs from "@/components/products/tempered/WhatIs";
import StressDiagram from "@/components/products/tempered/StressDiagram";
import RequestSample from "@/components/products/tempered/RequestSample";
import ManufacturingProcess from "@/components/products/tempered/ManufacturingProcess";
import BreakageComparison from "@/components/products/tempered/BreakageComparison";
import TemperedAdvantages from "@/components/products/tempered/TemperedAdvantages";
import WhySincere from "@/components/products/tempered/WhySincere";
import TemperedSpecs from "@/components/products/tempered/TemperedSpecs";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import GlassComparison from "@/components/products/tempered/GlassComparison";
import TemperedApplications from "@/components/products/tempered/TemperedApplications";
import TemperedFAQ from "@/components/products/tempered/TemperedFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import TemperedCTA from "@/components/products/tempered/TemperedCTA";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tempered Glass Manufacturer China — Custom Sizes up to 3m×15m | Sincere Glass",
  description: "Custom tempered glass from China. 3.8-19mm, panels up to 3m×15m, 3C certified. 4-5× stronger than annealed glass. Factory-direct pricing, 7-15 day lead time.",
  openGraph: {
    title: "Tempered Glass Manufacturer — Sincere Glass",
    description: "Custom architectural tempered glass. Flat & bent, 3.8-19mm, max 3m×15m. 3C certified, factory direct.",
    url: "https://sincereglass.com/products/tempered-glass",
    images: [{ url: "https://sincereglass.com/images/products/tempered.jpg" }],
  },
};

const faqItems = [
  { q: "What is the difference between tempered glass and normal glass?", a: "Tempered glass is 4-5 times stronger than standard annealed glass. It is made by heating float glass to near its softening point (around 620°C) and then rapidly cooling it. When broken, it shatters into small, blunt granules instead of dangerous sharp shards." },
  { q: "Can tempered glass be cut after tempering?", a: "No. Once glass is tempered, it cannot be cut, drilled, or edge-worked. All fabrication must be completed before the tempering process. This is why precise measurements are critical when ordering." },
  { q: "What thickness of tempered glass do you manufacture?", a: "We manufacture tempered glass from 3.8mm to 19mm. Common architectural thicknesses are 6mm, 8mm, 10mm, and 12mm. Our furnaces handle panels up to 3m wide and 15m long." },
  { q: "Is your tempered glass certified?", a: "Yes, all our tempered glass carries China’s 3C (CCC) certification and complies with GB 15763.2-2005. We provide full test reports and compliance documentation." },
  { q: "What is the lead time for tempered glass orders?", a: "Standard orders: 7-15 business days. Oversized or special processing: 15-25 business days. Contact us with your specs for an accurate timeline." },
  { q: "Can tempered glass be used for structural applications?", a: "Yes — curtain walls, glass doors, skylights, balustrades, and canopies. For post-breakage integrity, we recommend laminated tempered glass." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tempered Glass",
  description: "Custom architectural tempered glass, 3.8-19mm, panels up to 3m×15m. 3C certified.",
  image: "https://sincereglass.com/images/products/tempered.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" },
  manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "tempered-glass");

export default function TemperedGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        {/* 1. Hero — first impression + CTA */}
        <TemperedHero />

        {/* 2. What is — educational hook */}
        <WhatIs />

        {/* 3. Stress diagram — visual science (NEW) */}
        <StressDiagram />

        {/* 4. Request sample — low-friction CTA (NEW, breaks up education) */}
        <RequestSample />

        {/* 5. Manufacturing — interactive process (auto-rotate) */}
        <ManufacturingProcess />

        {/* 6. Breakage — visual wow (auto-switch) */}
        <BreakageComparison />

        {/* 7. Advantages — numbers that matter */}
        <TemperedAdvantages />

        {/* 8. Why Sincere — competitive differentiators */}
        <WhySincere />

        {/* 9. Specs */}
        <TemperedSpecs />
        <div className="bg-brand-lighter pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Have your dimensions ready? Get a precise quote within 24 hours." product="tempered" />
          </div>
        </div>

        {/* 10. Glass comparison table */}
        <GlassComparison />

        {/* 11. Applications */}
        <TemperedApplications />

        {/* 12. FAQ */}
        <TemperedFAQ faqItems={faqItems} />

        {/* 13. Social proof bar (NEW) */}
        <SocialProof />

        {/* 14. Final CTA */}
        <TemperedCTA />

        {/* 15. Related products */}
        <section className="py-16 md:py-24 bg-brand-lighter">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8">Other Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => (
                <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3>
                    <p className="mt-1 text-xs text-brand-muted line-clamp-1">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
