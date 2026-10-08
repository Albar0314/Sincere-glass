"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/lib/useInView";
export default function QuoteForm() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up to Next.js API route or WP REST endpoint
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }
  return <section id="quote" className="py-20 md:py-28 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transition: "all 600ms ease-out"
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">¿Listo para Iniciar su Proyecto de Vidrio?</h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">Indíquenos sus requerimientos — nuestro equipo responde en 24 horas con una cotización gratuita y un cronograma de producción.</p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-brand-accent font-semibold text-sm tracking-wide uppercase">Fábrica de Wuhan</h3>
                <p className="mt-1 text-white/60 text-sm">Parque Industrial Wujin, Distrito Hannan, Wuhan</p>
                <a href="mailto:xcglass@sina.cn" className="text-white/80 hover:text-brand-accent text-sm transition-colors">xcglass@sina.cn</a>
              </div>
              <div>
                <h3 className="text-brand-accent font-semibold text-sm tracking-wide uppercase">Fábrica de Honghu</h3>
                <p className="mt-1 text-white/60 text-sm">Parque Industrial de Xintan Town, Honghu, Hubei</p>
                <a href="mailto:1348767121@qq.com" className="text-white/80 hover:text-brand-accent text-sm transition-colors">1348767121@qq.com</a>
              </div>
            </div>
          </div>

          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transition: "all 600ms ease-out 200ms"
        }}>
            {submitted ? <div className="bg-white/5 border border-white/10 rounded-lg p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">¡Gracias!</h3>
                <p className="mt-2 text-white/60">Nuestro equipo responderá en un plazo de 24 horas.</p>
              </div> : <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Nombre Completo <span className="text-brand-accent">*</span></label>
                    <input type="text" required className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="Su nombre" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Email <span className="text-brand-accent">*</span></label>
                    <input type="email" required className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Teléfono / WhatsApp</label>
                    <input type="tel" className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="Incluya el código de país" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Tipo de Vidrio Requerido</label>
                    <select className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white/70 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors">
                      <option value="">Seleccione el tipo</option>
                      <option value="tempered">Vidrio templado</option>
                      <option value="insulated">Vidrio Aislante</option>
                      <option value="laminated">Vidrio laminado</option>
                      <option value="enameled">Vidrio esmaltado</option>
                      <option value="low-e">Vidrio de baja emisividad (Low-E)</option>
                      <option value="other">Otro / Personalizado</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">Descripción del Proyecto</label>
                  <textarea rows={4} className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors resize-none" placeholder="Cuéntenos sobre su proyecto: dimensiones, cantidad, aplicación..." />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold rounded-md transition-colors duration-300">
                  {loading ? "Sending..." : "Get Your Free Quote"}
                </button>
              </form>}
          </div>
        </div>
      </div>
    </section>;
}