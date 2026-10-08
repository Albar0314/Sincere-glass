import { Metadata } from "next";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { products } from "@/lib/products";
import EnamelHero from "@/components/products/enameled/EnamelHero";
import WhatIsEnamel from "@/components/products/enameled/WhatIsEnamel";
import ColorPalette from "@/components/products/enameled/ColorPalette";
import PatternGallery from "@/components/products/enameled/PatternGallery";
import EnamelProcess from "@/components/products/enameled/EnamelProcess";
import SolarControl from "@/components/products/enameled/SolarControl";
import WhySincereEnamel from "@/components/products/enameled/WhySincereEnamel";
import EnamelSpecs from "@/components/products/enameled/EnamelSpecs";
import EnamelApps from "@/components/products/enameled/EnamelApps";
import EnamelFAQ from "@/components/products/enameled/EnamelFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export const metadata: Metadata = {
  title: "Enameled Glass Manufacturer China — Custom Colors & Patterns | Sincere Glass",
  description: "Custom enameled (ceramic frit) glass from China. RAL/Pantone color matching, custom patterns, acid & abrasion resistant. Permanent color that never fades. 3C certified.",
  openGraph: {
    title: "Enameled Glass Manufacturer — Sincere Glass",
    description: "Decorative ceramic frit glass with permanent color. Custom designs, solar control, 3C certified.",
    url: "https://sincereglass.com/products/enameled-glass",
    images: [{ url: "https://sincereglass.com/images/products/enameled.jpg" }],
  },
};

const faqItems = [
  { q: "What is enameled glass?", a: "Enameled glass (also called ceramic frit glass) is made by screen-printing inorganic ceramic enamel onto glass, then fusing it permanently through tempering or heat-strengthening. The result is a decorative, durable surface that will never fade, peel, or delaminate." },
  { q: "Can I get a custom color?", a: "Yes. We offer full RAL and Pantone color matching. If your project requires a specific brand color or a color to match other building materials, we can formulate and test it before production. Custom color development typically adds 5–7 days to lead time." },
  { q: "Can enameled glass be cut after processing?", a: "No. Like tempered glass, enameled glass cannot be cut or modified after the enamel is fused. All dimensions, holes, and edge work must be finalized before production. Accurate measurements are essential when ordering." },
  { q: "Which side should the enamel face?", a: "The enameled surface should NOT face the exterior weather side. Best practice is to position it inside the sealed cavity of an insulated glass unit, or on the interior face of a laminated panel. This protects the enamel and maximizes durability." },
  { q: "Does enameled glass provide energy savings?", a: "Yes. The ceramic enamel layer absorbs and reflects a significant portion of solar radiation, providing measurable shading. Coverage patterns (dots, lines) can be designed to optimize the balance between light transmission and solar control." },
  { q: "What patterns are available?", a: "We offer standard patterns including dots (various sizes and spacing), horizontal/vertical lines, diagonal lines, gradients, and checkerboards. Custom patterns can also be produced with a new screen — this requires a screen-making fee and additional lead time." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org", "@type": "Product",
  name: "Enameled Glass", description: "Decorative ceramic frit glass with permanent color. Custom RAL/Pantone matching.",
  image: "https://sincereglass.com/images/products/enameled.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" }, manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "enameled-glass");

export default function EnamelGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <EnamelHero />
        <WhatIsEnamel />
        <ColorPalette />
        <PatternGallery />
        <div className="py-10 bg-brand-dark"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Have a specific color or pattern in mind? Send us your design and we will match it." product="enameled" variant="dark" /></div></div>
        <EnamelProcess />
        <SolarControl />
        <WhySincereEnamel />
        <EnamelSpecs />
        <div className="bg-brand-lighter pb-8"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Ready to order? We respond with a detailed quote within 24 hours." product="enameled" /></div></div>
        <EnamelApps />
        <EnamelFAQ faqItems={faqItems} />
        <SocialProof />
        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Bring Your Design to Life in Glass</h2>
            <p className="mt-4 text-white/60 text-lg">Send us your color, pattern, and dimensions. We will produce a sample for your approval before full production.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">Get a Free Quote</button>
              <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Email Us Directly</a>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-brand-lighter">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8">Other Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => (
                <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden"><Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" /></div>
                  <div className="p-4"><h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3><p className="mt-1 text-xs text-brand-muted line-clamp-1">{p.tagline}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
