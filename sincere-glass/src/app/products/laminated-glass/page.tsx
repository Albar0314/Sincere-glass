import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import LaminatedHero from "@/components/products/laminated/LaminatedHero";
import WhatIsLaminated from "@/components/products/laminated/WhatIsLaminated";
import LayerBuilder from "@/components/products/laminated/LayerBuilder";
import SoundReduction from "@/components/products/laminated/SoundReduction";
import SecurityTiers from "@/components/products/laminated/SecurityTiers";
import WhySincereLam from "@/components/products/laminated/WhySincereLam";
import LaminatedSpecs from "@/components/products/laminated/LaminatedSpecs";
import LaminatedApps from "@/components/products/laminated/LaminatedApps";
import LaminatedFAQ from "@/components/products/laminated/LaminatedFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export const metadata: Metadata = {
  title: "Laminated Glass Manufacturer China — PVB & SGP Interlayer | Sincere Glass",
  description: "Custom laminated safety glass from China. PVB and SGP interlayer options, 99% UV blocking, superior sound insulation. Autoclave up to 3m×15m. 3C certified.",
  openGraph: {
    title: "Laminated Glass Manufacturer — Sincere Glass",
    description: "Safety laminated glass with PVB/SGP interlayer. 99% UV block, sound insulation, anti-intrusion. 3C certified.",
    url: "https://sincereglass.com/products/laminated-glass",
    images: [{ url: "https://sincereglass.com/images/products/laminated.jpg" }],
  },
};

const faqItems = [
  { q: "What is laminated glass?", a: "Laminated glass consists of two or more glass panes bonded together with a tough plastic interlayer (typically PVB or SGP). When broken, the interlayer holds the fragments in place, preventing dangerous shards from falling and maintaining a barrier." },
  { q: "What is the difference between PVB and SGP interlayer?", a: "PVB (polyvinyl butyral) is the standard interlayer — flexible, good sound damping, excellent UV blocking. SGP (SentryGlas Plus) is 5× stiffer and 100× more tear-resistant, used for structural glazing where the glass must carry load even after breakage (glass floors, balustrades, hurricane glazing)." },
  { q: "How much UV does laminated glass block?", a: "Laminated glass with PVB interlayer blocks over 99% of ultraviolet radiation. This protects interior furnishings, artwork, and merchandise from fading. It also reduces infrared heat transmission." },
  { q: "Can laminated glass be used for soundproofing?", a: "Yes. Laminated glass is one of the most effective glazing options for sound reduction, particularly in the 1000–2000Hz range (speech, traffic, urban noise). A multilayer laminated unit can achieve 35–45dB reduction depending on configuration." },
  { q: "What sizes can you produce?", a: "Our high-pressure autoclaves can process laminated glass panels up to 3m × 15m. We produce both standard and jumbo laminated units for architectural applications including skylights, facades, and glass floors." },
  { q: "Is laminated glass bulletproof?", a: "Multi-layer laminated glass can be configured for ballistic resistance, but true bullet-resistant glass requires specific tested configurations (typically 3+ layers with SGP interlayer). We manufacture to order based on the required protection level." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org", "@type": "Product",
  name: "Laminated Glass", description: "Safety laminated glass with PVB/SGP interlayer. 99% UV blocking, superior sound insulation.",
  image: "https://sincereglass.com/images/products/laminated.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" },
  manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "laminated-glass");

export default function LaminatedGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <LaminatedHero />
        <WhatIsLaminated />
        <LayerBuilder />

        <div className="py-10 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Need a specific laminated glass configuration? Tell us your requirements." product="laminated" variant="dark" />
          </div>
        </div>

        <SoundReduction />
        <SecurityTiers />
        <WhySincereLam />
        <LaminatedSpecs />

        <div className="bg-white pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Ready to order? We respond with a detailed quote within 24 hours." product="laminated" />
          </div>
        </div>

        <LaminatedApps />
        <LaminatedFAQ faqItems={faqItems} />
        <SocialProof />

        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Need Laminated Glass for Your Project?</h2>
            <p className="mt-4 text-white/60 text-lg">Tell us your safety requirements and we will recommend the optimal laminated glass configuration.</p>
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
