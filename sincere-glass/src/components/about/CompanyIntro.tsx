"use client";

import { useInView } from "@/lib/useInView";

export default function CompanyIntro() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div
          className="transition-all duration-700"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Who We Are
          </h2>
          <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
            <p>
              Sincere Glass is a full-service architectural glass processing enterprise headquartered in Hubei, China.
              We integrate deep processing, quality control, and international trade under one roof — giving our clients
              a single point of contact from order to delivery.
            </p>
            <p>
              What started in 2005 as a glass processing workshop in Wuhan's Wujin Industrial Park has grown into a
              dual-factory operation spanning 20,000㎡. Our Wuhan facility (est. 2005) handles the core product lines,
              while our Honghu facility (est. 2019) in the Xintan Industrial Park houses expanded capacity for oversized
              panels and specialized products like Low-E and enameled glass.
            </p>
            <p>
              Every product we ship — tempered, insulated, laminated, or enameled — carries China's mandatory 3C
              certification and has passed national technical inspection. That's not a marketing line. It's the baseline
              we hold ourselves to, because our glass goes into hospitals, airports, and homes where quality is non-negotiable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
