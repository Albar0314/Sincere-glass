import { Metadata } from "next";
import Link from "@/_i18n/es/components/LocalizedLink";
import Image from "next/image";
import { products } from "@/lib/products";
import LowEHero from "@/_i18n/es/components/products/low-e/LowEHero";
import WhatIsLowE from "@/_i18n/es/components/products/low-e/WhatIsLowE";
import HeatFlowDiagram from "@/_i18n/es/components/products/low-e/HeatFlowDiagram";
import CoatingComparison from "@/_i18n/es/components/products/low-e/CoatingComparison";
import SeasonalPerformance from "@/_i18n/es/components/products/low-e/SeasonalPerformance";
import WhySincereLowE from "@/_i18n/es/components/products/low-e/WhySincereLowE";
import LowESpecs from "@/_i18n/es/components/products/low-e/LowESpecs";
import LowEApps from "@/_i18n/es/components/products/low-e/LowEApps";
import LowEFAQ from "@/_i18n/es/components/products/low-e/LowEFAQ";
import SocialProof from "@/_i18n/es/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/_i18n/es/components/products/InlineQuoteCTA";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Fabricante de Vidrio de Baja Emisividad (Low-E) en China — Vidrio con Recubrimiento Energéticamente Eficiente | Sincere Glass",
  description: "Vidrio de baja emisividad (Low-E) personalizado desde China. Opciones de capa blanda y capa dura, ahorro energético del 30–50%, alta transmitancia visible. Combinado con UVA (Unidad de Vidrio Aislante) para un rendimiento térmico máximo.",
  openGraph: {
    title: "Fabricante de Vidrio de Baja Emisividad (Low-E) — Sincere Glass",
    description: "Vidrio con recubrimiento de baja emisividad (Low-E) energéticamente eficiente. Refleja el calor, transmite la luz. Certificación 3C, directo de fábrica.",
    url: "https://sincereglass.com/products/low-e-glass"
  },
  alternates: makeAlternates("/products/low-e-glass")
};
const faqItems = [{
  q: "What does Low-E mean?",
  a: "Low-E stands for low emissivity. Emissivity measures how much infrared heat radiation a surface emits. Uncoated glass has an emissivity of about 0.84 (it radiates 84% of heat it absorbs). Low-E coating reduces this to 0.05–0.15, meaning the glass reflects most heat radiation back instead of transmitting it."
}, {
  q: "What is the difference between soft-coat and hard-coat Low-E?",
  a: "Soft-coat (sputtered) Low-E is applied in a vacuum chamber after the glass is made. It offers better thermal performance but is more delicate — it must be placed inside a sealed IGU cavity. Hard-coat (pyrolytic) Low-E is applied during float glass manufacturing and is more durable — it can be used in single-pane applications but has slightly lower performance."
}, {
  q: "Can I see the Low-E coating?",
  a: "Low-E coating is virtually invisible. You may notice a very slight color tint (usually a faint blue or grey) depending on the coating type and viewing angle, but it does not significantly affect the glass appearance or visible light transmission."
}, {
  q: "Does Low-E glass block UV?",
  a: "Yes. Low-E glass blocks a significant portion of UV radiation (typically 75–95%), helping protect interior furnishings from fading. For maximum UV protection (99%+), combine Low-E glass with a laminated interlayer."
}, {
  q: "Can Low-E glass be tempered?",
  a: "Hard-coat Low-E can be tempered after coating. Soft-coat Low-E is typically applied to already-tempered or annealed glass and then assembled into an IGU. We handle the full process — coating, tempering, and IGU assembly — in our integrated production line."
}, {
  q: "How much energy does Low-E glass save?",
  a: "Low-E glass in an IGU typically reduces heating and cooling energy costs by 30–50% compared to single-pane uncoated glass. The exact savings depend on climate, building orientation, and the specific Low-E coating and IGU configuration used."
}];
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a
    }
  }))
};
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Vidrio de baja emisividad (Low-E)",
  description: "Vidrio con recubrimiento de baja emisividad energéticamente eficiente. Refleja el calor, transmite la luz.",
  image: "https://sincereglass.com/images/products/insulated.jpg",
  brand: {
    "@type": "Brand",
    name: "Sincere Glass"
  },
  manufacturer: {
    "@id": "https://sincereglass.com/#organization"
  }
};
const otherProducts = products.filter(p => p.slug !== "low-e-glass").slice(0, 3);
export default function LowEGlassPage() {
  return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema)
    }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(productSchema)
    }} />
      <main>
        <LowEHero />
        <WhatIsLowE />
        <HeatFlowDiagram />
        <div className="py-10 bg-brand-dark"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Building an energy-efficient project? Get a quote for Low-E glass." product="low-e" variant="dark" /></div></div>
        <CoatingComparison />
        <SeasonalPerformance />
        <WhySincereLowE />
        <LowESpecs />
        <div className="bg-white pb-8"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Tell us your thermal targets and we will recommend the right Low-E configuration." product="low-e" /></div></div>
        <LowEApps />
        <LowEFAQ faqItems={faqItems} />
        <SocialProof />
        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">¿Necesita Vidrio de Baja Emisividad (Low-E) para su Proyecto?</h2>
            <p className="mt-4 text-white/60 text-lg">Envíenos sus requisitos de rendimiento energético y especificaremos la configuración óptima de vidrio de baja emisividad (Low-E).</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">Obtener Cotización Gratuita</button>
              <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Escríbanos Directamente</a>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-brand-lighter">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8">Otros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden"><Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" /></div>
                  <div className="p-4"><h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3></div>
                </Link>)}
            </div>
          </div>
        </section>
      </main>
    </>;
}