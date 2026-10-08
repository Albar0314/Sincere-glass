"use client";

import Link from "@/_i18n/es/components/LocalizedLink";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
const products = [{
  slug: "tempered-glass",
  name: "Vidrio templado",
  summary: "4-5× más resistente que el vidrio recocido. Se fragmenta en piezas pequeñas e inocuas. Espesor: 3.8–19mm.",
  image: "/images/products/tempered.jpg"
}, {
  slug: "insulated-glass",
  name: "Vidrio Aislante",
  summary: "Aislamiento térmico y acústico superior con tecnología de perfil separador de doble sellado. Resistencia a la presión del viento 1.5×.",
  image: "/images/products/insulated.jpg"
}, {
  slug: "laminated-glass",
  name: "Vidrio laminado",
  summary: "Resistente a impactos con lámina intermedia de PVB (polivinil butiral). Bloquea el 99% de la radiación UV y reduce el ruido en el rango de 1000–2000Hz.",
  image: "/images/products/laminated.jpg"
}, {
  slug: "enameled-glass",
  name: "Vidrio esmaltado",
  summary: "Frita cerámica fusionada permanentemente a la superficie del vidrio. Resistente a ácidos y a la abrasión. Colores y patrones personalizados.",
  image: "/images/products/enameled.jpg"
}];
export default function ProductsOverview() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-brand-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl transition-all duration-600 ease-out" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Soluciones de vidrio arquitectónico para cada proyecto
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Desde muros cortina en edificios de gran altura hasta particiones interiores — una sola fábrica, gama completa de productos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => <Link key={product.slug} href={`/products/${product.slug}`} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transitionProperty: "opacity, transform, box-shadow",
          transitionDuration: "600ms",
          transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
          transitionDelay: `${150 + i * 100}ms`
        }}>
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-brand-dark group-hover:text-brand-secondary transition-colors">{product.name}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed line-clamp-2">{product.summary}</p>
                <span className="inline-flex items-center mt-4 text-sm font-medium text-brand-secondary group-hover:text-brand-accent transition-colors">
                  Más información
                  <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>)}
        </div>

        <p className="mt-12 text-center text-brand-muted transition-all duration-600 delay-500" style={{
        opacity: isInView ? 1 : 0
      }}>
          ¿Necesita una solución de vidrio a medida?{" "}
          <a href="#quote" className="text-brand-secondary hover:text-brand-accent font-medium transition-colors">Cuéntenos sobre su proyecto</a>.
        </p>
      </div>
    </section>;
}