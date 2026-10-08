"use client";

import Link from "@/components/LocalizedLink";
import { useInView } from "@/lib/useInView";

export default function AboutCTA() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div
        className="max-w-3xl mx-auto px-6 md:px-12 text-center transition-all duration-700"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)" }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
          Ready to Work With Us?
        </h2>
        <p className="mt-4 text-white/60 text-lg leading-relaxed">
          Whether you need a single product or a complete glass package for a landmark project, we're ready to talk.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#quote"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-base"
          >
            Get a Free Quote
          </a>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-base"
          >
            View Our Products
          </Link>
        </div>
      </div>
    </section>
  );
}
