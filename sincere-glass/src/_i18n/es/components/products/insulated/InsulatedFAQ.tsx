"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";
interface FAQItem {
  q: string;
  a: string;
}
export default function InsulatedFAQ({
  faqItems
}: {
  faqItems: FAQItem[];
}) {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.05
  });
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          Preguntas Frecuentes
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => {
          const isOpen = openIdx === i;
          return <div key={i} className={"rounded-xl border transition-all duration-300 " + (isOpen ? "border-brand-accent/30 bg-brand-lighter shadow-sm" : "border-brand-light bg-white hover:border-brand-secondary/20")} style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(12px)",
            transition: "all 500ms",
            transitionDelay: 150 + i * 60 + "ms"
          }}>
                <button onClick={() => setOpenIdx(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <h3 className="font-medium text-sm pr-4 text-brand-dark">{item.q}</h3>
                  <svg className={"w-5 h-5 flex-shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-180 text-brand-accent" : "text-brand-muted")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={"overflow-hidden transition-all duration-300 " + (isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                  <p className="px-5 pb-5 text-sm text-brand-muted leading-relaxed">{item.a}</p>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
}