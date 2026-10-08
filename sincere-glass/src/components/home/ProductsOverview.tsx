"use client";

import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { useInView } from "@/lib/useInView";

const products = [
  { slug: "tempered-glass", name: "Tempered Glass", summary: "4-5× stronger than annealed glass. Shatters into small, safe fragments. Thickness: 3.8–19mm.", image: "/images/products/tempered.jpg" },
  { slug: "insulated-glass", name: "Insulated Glass", summary: "Superior thermal and sound insulation with double-sealed spacer technology. 1.5× wind pressure resistance.", image: "/images/products/insulated.jpg" },
  { slug: "laminated-glass", name: "Laminated Glass", summary: "Impact-resistant with PVB interlayer. Blocks 99% UV and reduces noise from 1000–2000Hz range.", image: "/images/products/laminated.jpg" },
  { slug: "enameled-glass", name: "Enameled Glass", summary: "Ceramic frit permanently fused to glass surface. Acid and abrasion resistant. Custom colors and patterns.", image: "/images/products/enameled.jpg" },
];

export default function ProductsOverview() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl transition-all duration-600 ease-out" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Architectural Glass Solutions for Every Project
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            From high-rise curtain walls to interior partitions — one factory, full product range.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transitionProperty: "opacity, transform, box-shadow", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)", transitionDelay: `${150 + i * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-brand-dark group-hover:text-brand-secondary transition-colors">{product.name}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed line-clamp-2">{product.summary}</p>
                <span className="inline-flex items-center mt-4 text-sm font-medium text-brand-secondary group-hover:text-brand-accent transition-colors">
                  Learn More
                  <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-brand-muted transition-all duration-600 delay-500" style={{ opacity: isInView ? 1 : 0 }}>
          Need a custom glass solution?{" "}
          <a href="#quote" className="text-brand-secondary hover:text-brand-accent font-medium transition-colors">Tell us about your project</a>.
        </p>
      </div>
    </section>
  );
}
