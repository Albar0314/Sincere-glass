"use client";

import { useInView } from "@/lib/useInView";

export default function Leadership() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div
          className="transition-all duration-700"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Leadership</h2>

          <div className="mt-10 p-8 bg-brand-lighter rounded-xl border border-brand-light">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-2xl font-bold text-brand-primary">李</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-brand-dark">Li Chuanren · 李传仁</h3>
                <p className="text-brand-accent text-sm font-medium mt-1">Chairman & Founder</p>
                <div className="mt-4 space-y-3 text-brand-muted leading-relaxed">
                  <p>
                    Under Chairman Li's leadership, Sincere Glass has grown from a single-product tempered glass
                    workshop into a multi-line manufacturing enterprise covering flat and bent tempered glass,
                    insulated glass, laminated glass, and enameled glass.
                  </p>
                  <p>
                    His philosophy — "pursue excellence, serve society" — has guided the company through 15+ years
                    of continuous investment in advanced equipment, quality systems, and talent development. In 2010,
                    he was honored as one of Wuhan's Top 10 Outstanding Entrepreneurs.
                  </p>
                  <p>
                    Today, the company partners with leading domestic float glass producers and maintains
                    comprehensive production process management and quality control systems across both factories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
