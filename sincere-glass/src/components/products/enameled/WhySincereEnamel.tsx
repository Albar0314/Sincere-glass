"use client";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  { icon: "🎨", title: "Any Color You Need", desc: "Full RAL and Pantone matching. We formulate and test custom colors before production. Your brand, your building, your exact shade." },
  { icon: "⚙️", title: "Integrated Production", desc: "Cutting, screen printing, tempering, and quality testing all happen under one roof. No outsourcing delays, no quality handoff risks." },
  { icon: "📏", title: "Oversized Panels", desc: "Our enameling and tempering lines handle panels up to 3m × 15m — reducing joints and creating cleaner facades on large projects." },
  { icon: "📄", title: "Full Certification", desc: "3C certified with complete test reports. The enamel meets GB 15763.2-2005 for safety glass — your project passes inspection first time." },
];

export default function WhySincereEnamel() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Why Source Enameled Glass from Us?</h2>
        </div>

        {/* Horizontal scrolling cards on all viewports (unique layout) */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {advantages.map((a, i) => (
            <div key={a.title}
              className="flex-shrink-0 w-64 md:w-72 bg-white rounded-xl p-6 border border-brand-light hover:border-brand-accent/20 hover:shadow-md transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 500ms", transitionDelay: (200 + i * 100) + "ms" }}>
              <span className="text-3xl">{a.icon}</span>
              <h3 className="mt-4 font-display font-bold text-brand-dark">{a.title}</h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Send us your color code and design — we will produce a sample for approval." product="enameled" />
        </div>
      </div>
    </section>
  );
}
