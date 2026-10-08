import { Metadata } from "next";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { products } from "@/lib/products";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Glass Products — Tempered, Insulated, Laminated & Enameled",
  description: "Explore Sincere Glass's full product range: tempered glass, insulated glass units, laminated safety glass, and enameled decorative glass. All 3C certified.",
  openGraph: {
    title: "Architectural Glass Products | Sincere Glass",
    description: "Full range of 3C-certified architectural glass from China.",
    url: "https://sincereglass.com/products"
  },
  alternates: makeAlternates("/products")
};
export default function ProductsPage() {
  return <main>
      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Our Products</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Architectural Glass Solutions
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl">
            Every product is manufactured in-house across our two Hubei factories and carries China's 3C certification.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 md:py-24 bg-brand-lighter">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map(product => <Link key={product.slug} href={"/products/" + product.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-brand-muted text-sm leading-relaxed">{product.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.specs.slice(0, 3).map(s => <span key={s.label} className="px-2.5 py-1 bg-brand-lighter text-brand-muted text-xs rounded-full">
                        {s.label}: {s.value}
                      </span>)}
                  </div>
                  <span className="inline-flex items-center mt-5 text-sm font-medium text-brand-accent group-hover:text-brand-accent-hover transition-colors">
                    View Details
                    <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Need a Custom Glass Solution?</h2>
          <p className="mt-3 text-white/60">We manufacture to your specifications — size, coating, color, and configuration.</p>
          <a href="/#quote" className="inline-flex items-center justify-center mt-6 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Request a Quote
          </a>
        </div>
      </section>
    </main>;
}