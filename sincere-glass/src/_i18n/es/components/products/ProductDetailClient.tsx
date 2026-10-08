"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";
import type { Product } from "@/lib/products";
export default function ProductDetailClient({
  product,
  otherProducts
}: {
  product: Product;
  otherProducts: Product[];
}) {
  const {
    ref: descRef,
    isInView: descVisible
  } = useInView();
  const {
    ref: specRef,
    isInView: specVisible
  } = useInView();
  const {
    ref: featRef,
    isInView: featVisible
  } = useInView();
  const {
    ref: appRef,
    isInView: appVisible
  } = useInView();
  const {
    ref: relRef,
    isInView: relVisible
  } = useInView();
  return <>
      {/* Description + Image */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={descRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{
            opacity: descVisible ? 1 : 0,
            transform: descVisible ? "translateX(0)" : "translateX(-30px)",
            transition: "all 700ms ease-out"
          }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">
                ¿Qué es {product.name}?
              </h2>
              <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
                {product.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <p className="mt-6 text-sm text-brand-secondary font-medium">
                Estándar: {product.standard}
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg" style={{
            opacity: descVisible ? 1 : 0,
            transform: descVisible ? "translateX(0)" : "translateX(30px)",
            transition: "all 700ms ease-out 150ms"
          }}>
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section className="py-16 md:py-24 bg-white" ref={specRef}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-10 transition-all duration-600" style={{
          opacity: specVisible ? 1 : 0,
          transform: specVisible ? "translateY(0)" : "translateY(16px)"
        }}>
            Especificaciones Técnicas
          </h2>
          <div className="overflow-hidden rounded-xl border border-brand-light">
            {product.specs.map((s, i) => <div key={s.label} className={"flex justify-between items-center px-6 py-4 " + (i % 2 === 0 ? "bg-brand-lighter" : "bg-white")} style={{
            opacity: specVisible ? 1 : 0,
            transform: specVisible ? "translateY(0)" : "translateY(12px)",
            transition: "all 400ms ease-out",
            transitionDelay: 100 + i * 60 + "ms"
          }}>
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm text-brand-muted text-right">{s.value}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={featRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-10 transition-all duration-600" style={{
          opacity: featVisible ? 1 : 0,
          transform: featVisible ? "translateY(0)" : "translateY(16px)"
        }}>
            Ventajas clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((f, i) => <div key={f.title} className="p-6 bg-white rounded-xl border border-brand-light" style={{
            opacity: featVisible ? 1 : 0,
            transform: featVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 500ms ease-out",
            transitionDelay: 150 + i * 100 + "ms"
          }}>
                <h3 className="font-display font-semibold text-brand-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{f.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 md:py-24 bg-white" ref={appRef}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-8 transition-all duration-600" style={{
          opacity: appVisible ? 1 : 0,
          transform: appVisible ? "translateY(0)" : "translateY(16px)"
        }}>
            Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.applications.map((app, i) => <div key={app} className="flex items-center gap-3 p-4 rounded-lg bg-brand-lighter" style={{
            opacity: appVisible ? 1 : 0,
            transform: appVisible ? "translateY(0)" : "translateY(12px)",
            transition: "all 400ms ease-out",
            transitionDelay: 100 + i * 60 + "ms"
          }}>
                <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-brand-dark">{app}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Need {product.name} ¿para Su Proyecto?
          </h2>
          <p className="mt-3 text-white/60">Compártanos sus especificaciones — nuestro equipo le responderá en 24 horas.</p>
          <a href="/#quote" className="inline-flex items-center justify-center mt-6 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Solicitar Cotización
          </a>
        </div>
      </section>

      {/* Related products */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={relRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8 transition-all duration-600" style={{
          opacity: relVisible ? 1 : 0,
          transform: relVisible ? "translateY(0)" : "translateY(16px)"
        }}>
            Otros Productos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProducts.map((p, i) => <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" style={{
            opacity: relVisible ? 1 : 0,
            transform: relVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 500ms ease-out",
            transitionDelay: 150 + i * 100 + "ms"
          }}>
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
    </>;
}