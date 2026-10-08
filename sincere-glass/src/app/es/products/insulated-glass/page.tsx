'use client';

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import InsulatedHero from "@/_i18n/es/components/products/insulated/InsulatedHero";
import WhatIsIGU from "@/_i18n/es/components/products/insulated/WhatIsIGU";
import IGUDiagram from "@/_i18n/es/components/products/insulated/IGUDiagram";
import EnergyPerformance from "@/_i18n/es/components/products/insulated/EnergyPerformance";
import GasFillComparison from "@/_i18n/es/components/products/insulated/GasFillComparison";
import InsulatedSpecs from "@/_i18n/es/components/products/insulated/InsulatedSpecs";
import WhySincereIGU from "@/_i18n/es/components/products/insulated/WhySincereIGU";
import InsulatedApplications from "@/_i18n/es/components/products/insulated/InsulatedApplications";
import InsulatedFAQ from "@/_i18n/es/components/products/insulated/InsulatedFAQ";
import SocialProof from "@/_i18n/es/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/_i18n/es/components/products/InlineQuoteCTA";
const faqItems = [{
  q: "What is insulated glass (IGU)?",
  a: "An insulated glass unit consists of two or more glass panes separated by a sealed air or gas-filled space. The sealed gap acts as thermal and acoustic insulation, significantly reducing heat transfer and noise compared to single-pane glass."
}, {
  q: "What gas fills do you offer?",
  a: "We offer both air-filled and argon gas-filled IGUs. Our Honghu factory has an automated argon gas-filling production line that ensures consistent fill rates. Argon reduces heat transfer by about 30% compared to air-filled units."
}, {
  q: "What spacer widths are available?",
  a: "We manufacture IGUs with spacer widths of 6mm, 9mm, 12mm, 15mm, and 20mm. The optimal spacer width depends on your thermal and acoustic requirements — wider spacers generally provide better insulation up to a point."
}, {
  q: "Can insulated glass be combined with Low-E coating?",
  a: "Yes, and we recommend it for maximum energy efficiency. Low-E coated insulated glass can reduce solar heat gain by up to 70% while maintaining high visible light transmission. We offer both soft-coat and hard-coat Low-E options."
}, {
  q: "How long do insulated glass units last?",
  a: "With our dual-seal technology (PIB primary seal + structural silicone secondary seal), our IGUs are designed for 20+ years of service. The dual seal prevents moisture ingress and maintains the gas fill over the unit’s lifetime."
}, {
  q: "What is the lead time for IGU orders?",
  a: "Standard IGU orders ship within 10-18 business days. Oversized units or those requiring special coatings may take 18-25 business days. Our automated production line handles high volumes efficiently."
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
  name: "Unidad de Vidrio Aislante (UVA)",
  description: "Unidades de vidrio aislante de alta eficiencia energética con relleno de argón y tecnología de doble sello. Certificación 3C.",
  image: "https://sincereglass.com/images/products/insulated.jpg",
  brand: {
    "@type": "Brand",
    name: "Sincere Glass"
  },
  manufacturer: {
    "@id": "https://sincereglass.com/#organization"
  }
};
const otherProducts = products.filter(p => p.slug !== "insulated-glass");
export default function InsulatedGlassPage() {
  return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema)
    }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(productSchema)
    }} />
      <main>
        <InsulatedHero />
        <WhatIsIGU />
        <IGUDiagram />

        <div className="py-10 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Planning an energy-efficient building? Get a quote for custom IGUs." product="insulated" variant="dark" />
          </div>
        </div>

        <EnergyPerformance />
        <GasFillComparison />
        <WhySincereIGU />
        <InsulatedSpecs />

        <div className="bg-brand-lighter pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Ready to specify? Send us your glazing schedule for a precise quote." product="insulated" />
          </div>
        </div>

        <InsulatedApplications />
        <InsulatedFAQ faqItems={faqItems} />
        <SocialProof />

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">¿Necesita Vidrio Aislante para Su Proyecto?</h2>
            <p className="mt-4 text-white/60 text-lg">Indíquenos sus objetivos de rendimiento térmico y le recomendaremos la configuración óptima de UVA (Unidad de Vidrio Aislante).</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors" onClick={() => (document.querySelector('[data-quote-trigger]') as HTMLElement)?.click()}>
                Obtener Cotización Gratuita
              </button>
              <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Escríbanos Directamente</a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 md:py-24 bg-brand-lighter">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8">Otros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3>
                    <p className="mt-1 text-xs text-brand-muted line-clamp-1">{p.tagline}</p>
                  </div>
                </Link>)}
            </div>
          </div>
        </section>
      </main>
    </>;
}