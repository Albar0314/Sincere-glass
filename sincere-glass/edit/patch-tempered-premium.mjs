#!/usr/bin/env node
/**
 * Sincere Glass — Premium Tempered Glass Page
 * 从项目根目录运行: node edit/patch-tempered-premium.mjs
 */
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
const root = process.cwd();
function write(rel, content) {
  const p = join(root, rel);
  const dir = dirname(p);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const existed = existsSync(p);
  writeFileSync(p, content, "utf-8");
  console.log((existed ? "✏️  覆盖" : "✅  创建") + ": " + rel);
}

// ━━━ Override the tempered glass detail page ━━━━━━━━━━━━━
write("src/app/products/tempered-glass/page.tsx", `import { Metadata } from "next";
import TemperedHero from "@/components/products/tempered/TemperedHero";
import WhatIs from "@/components/products/tempered/WhatIs";
import ManufacturingProcess from "@/components/products/tempered/ManufacturingProcess";
import BreakageComparison from "@/components/products/tempered/BreakageComparison";
import TemperedSpecs from "@/components/products/tempered/TemperedSpecs";
import TemperedAdvantages from "@/components/products/tempered/TemperedAdvantages";
import GlassComparison from "@/components/products/tempered/GlassComparison";
import TemperedApplications from "@/components/products/tempered/TemperedApplications";
import TemperedFAQ from "@/components/products/tempered/TemperedFAQ";
import TemperedCTA from "@/components/products/tempered/TemperedCTA";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tempered Glass Manufacturer China — Custom Sizes up to 3m×15m | Sincere Glass",
  description:
    "Custom tempered glass from China's leading manufacturer. 3.8-19mm thickness, panels up to 3m×15m, 3C certified. 4-5× stronger than annealed glass. Free quote in 24h.",
  openGraph: {
    title: "Tempered Glass Manufacturer — Sincere Glass",
    description: "Custom architectural tempered glass. Flat & bent, 3.8-19mm, max 3m×15m. 3C certified, factory direct.",
    url: "https://sincereglass.com/products/tempered-glass",
    images: [{ url: "https://sincereglass.com/images/products/tempered.jpg" }],
  },
};

const faqItems = [
  { q: "What is the difference between tempered glass and normal glass?", a: "Tempered glass is 4-5 times stronger than standard annealed glass. It is made by heating float glass to near its softening point (around 620°C) and then rapidly cooling it. This process creates compressive stress on the surface, making it significantly more resistant to impact and thermal shock. When broken, tempered glass shatters into small, blunt granules instead of dangerous sharp shards." },
  { q: "Can tempered glass be cut after tempering?", a: "No. Once glass is tempered, it cannot be cut, drilled, or edge-worked. Any attempt to modify tempered glass will cause it to shatter completely. All cutting, drilling, edge polishing, and other fabrication must be completed before the tempering process. This is why precise measurements are critical when ordering tempered glass." },
  { q: "What thickness of tempered glass do you manufacture?", a: "We manufacture tempered glass in thicknesses ranging from 3.8mm to 19mm. The most common thicknesses for architectural applications are 6mm, 8mm, 10mm, and 12mm. Our tempering furnaces can handle panels up to 3 meters wide and 15 meters long — among the largest capacities in Hubei province." },
  { q: "Is your tempered glass certified?", a: "Yes, all our tempered glass products carry China's mandatory 3C (CCC) certification and comply with GB 15763.2-2005, the national standard for safety glass in buildings. Our products have also passed national technical supervision and inspection bureau review." },
  { q: "What is the lead time for tempered glass orders?", a: "Standard orders are typically fulfilled within 7-15 business days depending on quantity and specifications. For oversized panels (above 2.4m width) or special processing requirements like bent tempering, lead times may be 15-25 business days. Contact us with your specifications for an accurate timeline." },
  { q: "Can tempered glass be used for structural applications?", a: "Tempered glass is widely used in structural applications including curtain walls, glass doors, skylights, balustrades, and canopies. For applications requiring post-breakage integrity — where the glass must stay in place even after breaking — we recommend laminated tempered glass, which combines the strength of tempering with the holding power of a PVB interlayer." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tempered Glass",
  description: "Custom architectural tempered glass, 3.8-19mm thickness, panels up to 3m×15m. 3C certified safety glass.",
  image: "https://sincereglass.com/images/products/tempered.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" },
  manufacturer: { "@id": "https://sincereglass.com/#organization" },
  material: "Float glass",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Thickness Range", value: "3.8mm - 19mm" },
    { "@type": "PropertyValue", name: "Max Panel Size", value: "3000mm × 15000mm" },
    { "@type": "PropertyValue", name: "Certification", value: "CCC (3C)" },
    { "@type": "PropertyValue", name: "Standard", value: "GB 15763.2-2005" },
  ],
};

const otherProducts = products.filter(p => p.slug !== "tempered-glass");

export default function TemperedGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <TemperedHero />
        <WhatIs />
        <ManufacturingProcess />
        <BreakageComparison />
        <TemperedSpecs />
        <TemperedAdvantages />
        <GlassComparison />
        <TemperedApplications />
        <TemperedFAQ faqItems={faqItems} />
        <TemperedCTA />

        {/* Related products */}
        <section className="py-16 md:py-24 bg-brand-lighter">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8">Other Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => (
                <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3>
                    <p className="mt-1 text-xs text-brand-muted line-clamp-1">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
`);

// ━━━ TemperedHero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TemperedHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/tempered.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />

      {/* Glass texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-6" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/70">Tempered Glass</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms ease-out 200ms" }}>
          Tempered Glass
        </h1>

        <p className="mt-5 text-xl text-white/70 max-w-2xl leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms ease-out 350ms" }}>
          4-5× stronger than standard glass. Safe fragmentation. Panels up to 3m × 15m. 3C certified.
        </p>

        <div className="mt-8 flex flex-wrap gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["3.8–19mm", "Flat & Bent", "3C Certified", "Max 3m×15m"].map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <a href="/#quote" className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Get a Quote
          </a>
          <a href="#how-its-made" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors">
            How It's Made
          </a>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhatIs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/WhatIs.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIs() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms ease-out" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            What Is Tempered Glass?
          </h2>
          <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
            <p>
              Tempered glass — also called toughened glass — is a type of <strong className="text-brand-dark font-medium">safety glass</strong> produced
              by controlled thermal treatment. High-quality float glass is heated to approximately 620°C (near its softening point),
              then rapidly cooled by jets of air in a process called quenching.
            </p>
            <p>
              This creates a unique stress profile: <strong className="text-brand-dark font-medium">compressive stress</strong> on the surface
              and <strong className="text-brand-dark font-medium">tensile stress</strong> in the core. The balance of these opposing
              forces is what gives tempered glass its remarkable strength — 4 to 5 times greater than ordinary annealed glass
              of the same thickness.
            </p>
            <p>
              Perhaps most importantly, when tempered glass does break, it fractures into small, relatively blunt
              granular chunks rather than the jagged, knife-like shards produced by ordinary glass. This characteristic
              fragmentation pattern is why tempered glass is classified as safety glass under international building codes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ ManufacturingProcess ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/ManufacturingProcess.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

const steps = [
  {
    num: "01",
    title: "Cutting & Fabrication",
    desc: "Glass is cut to final dimensions, edges polished, and any holes drilled. All fabrication must be completed before tempering — tempered glass cannot be modified afterwards.",
    temp: "Room temp",
    color: "bg-brand-secondary/10 text-brand-secondary",
  },
  {
    num: "02",
    title: "Washing & Inspection",
    desc: "Cut pieces are thoroughly washed to remove contaminants that could cause optical defects. Each piece is inspected for chips, scratches, or inclusions before entering the furnace.",
    temp: "Room temp",
    color: "bg-brand-secondary/10 text-brand-secondary",
  },
  {
    num: "03",
    title: "Heating",
    desc: "Glass enters a tempering furnace and is uniformly heated to approximately 620°C — just below its softening point. Even heating is critical: temperature variation across the panel must stay within ±5°C to prevent optical distortion.",
    temp: "~620°C",
    color: "bg-red-500/10 text-red-600",
  },
  {
    num: "04",
    title: "Quenching",
    desc: "The heated glass moves to the quench section where high-pressure air jets rapidly cool both surfaces simultaneously. The surface solidifies first while the interior is still hot, creating the compressive-tensile stress balance that defines tempered glass.",
    temp: "Rapid cool",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    num: "05",
    title: "Quality Control",
    desc: "Every tempered panel undergoes fragmentation testing (sample basis), stress measurement, and visual inspection. We verify compliance with GB 15763.2-2005 before any product leaves the factory.",
    temp: "Room temp",
    color: "bg-green-500/10 text-green-600",
  },
];

export default function ManufacturingProcess() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-its-made" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            How Tempered Glass Is Made
          </h2>
          <p className="mt-4 text-brand-muted text-lg">Five precision-controlled stages from raw sheet to certified safety glass.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Step selector */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={"flex-shrink-0 text-left p-4 rounded-xl border transition-all duration-300 " +
                  (activeStep === i
                    ? "bg-brand-dark border-brand-dark shadow-lg"
                    : "bg-white border-brand-light hover:border-brand-secondary/30")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 80) + "ms" }}
              >
                <div className="flex items-center gap-3">
                  <span className={"text-xs font-bold px-2 py-0.5 rounded-full " + (activeStep === i ? "bg-brand-accent/20 text-brand-accent" : step.color)}>
                    {step.num}
                  </span>
                  <span className={"text-sm font-medium " + (activeStep === i ? "text-white" : "text-brand-dark")}>{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div className="bg-brand-lighter rounded-2xl p-8 md:p-10 min-h-[240px] flex flex-col justify-center transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className={"text-sm font-bold px-3 py-1 rounded-full " + steps[activeStep].color}>
                Step {steps[activeStep].num}
              </span>
              <span className={"text-xs px-2.5 py-0.5 rounded-full " + steps[activeStep].color}>
                {steps[activeStep].temp}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-brand-dark">{steps[activeStep].title}</h3>
            <p className="mt-4 text-brand-muted leading-relaxed text-lg">{steps[activeStep].desc}</p>
          </div>
        </div>

        {/* Process flow bar */}
        <div className="mt-10 flex items-center gap-1" style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStep(i)}
                className={"h-2 w-full rounded-full transition-all duration-500 cursor-pointer " +
                  (i <= activeStep ? "bg-brand-accent" : "bg-brand-light")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ BreakageComparison ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/BreakageComparison.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

export default function BreakageComparison() {
  const { ref, isInView } = useInView();
  const [showTempered, setShowTempered] = useState(true);

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why &quot;Safety Glass&quot; Matters
          </h2>
          <p className="mt-4 text-white/60 text-lg">See the difference in breakage pattern — it's why building codes require tempered glass.</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setShowTempered(true)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " +
              (showTempered ? "bg-brand-accent text-brand-dark" : "bg-white/10 text-white/70 hover:bg-white/15")}
          >
            Tempered Glass
          </button>
          <button
            onClick={() => setShowTempered(false)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " +
              (!showTempered ? "bg-red-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}
          >
            Ordinary Glass
          </button>
        </div>

        {/* Visual comparison */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
          <div className="transition-all duration-500" style={{ opacity: isInView ? 1 : 0 }}>
            {showTempered ? (
              <div>
                <div className="grid grid-cols-8 gap-1 max-w-md mx-auto mb-8">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm bg-brand-accent/40 transition-all duration-300"
                      style={{
                        animationDelay: (i * 15) + "ms",
                        transform: isInView ? "scale(1)" : "scale(0)",
                        transition: "transform 400ms ease-out " + (i * 15) + "ms",
                      }}
                    />
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold text-white">Small, blunt granules</h3>
                <p className="mt-2 text-white/50 text-sm max-w-md mx-auto">
                  Tempered glass shatters into hundreds of small, relatively harmless pieces. No sharp edges. Minimal injury risk.
                </p>
              </div>
            ) : (
              <div>
                <div className="relative max-w-md mx-auto mb-8 h-48 flex items-center justify-center">
                  {[
                    { w: "120px", h: "80px", r: "-15deg", x: "-30px", y: "-20px" },
                    { w: "90px", h: "60px", r: "25deg", x: "40px", y: "10px" },
                    { w: "70px", h: "100px", r: "-5deg", x: "-60px", y: "30px" },
                    { w: "110px", h: "40px", r: "45deg", x: "80px", y: "-30px" },
                    { w: "50px", h: "90px", r: "-35deg", x: "10px", y: "50px" },
                    { w: "80px", h: "30px", r: "60deg", x: "-80px", y: "-50px" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="absolute bg-red-500/20 border border-red-500/40"
                      style={{
                        width: s.w, height: s.h,
                        transform: "translate(" + s.x + "," + s.y + ") rotate(" + s.r + ")",
                        clipPath: "polygon(10% 0%, 100% 5%, 85% 100%, 0% 90%)",
                        transition: "all 500ms ease-out " + (i * 80) + "ms",
                      }}
                    />
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold text-white">Large, dangerous shards</h3>
                <p className="mt-2 text-white/50 text-sm max-w-md mx-auto">
                  Ordinary glass breaks into large, jagged shards with razor-sharp edges. Serious laceration risk. Not safe for architectural use.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ TemperedSpecs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedSpecs.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Thickness Range", value: "3.8mm – 19mm", detail: "Common: 5, 6, 8, 10, 12, 15, 19mm" },
  { label: "Max Panel Size", value: "3,000 × 15,000mm", detail: "Among the largest in Hubei province" },
  { label: "Impact Strength", value: "4-5× annealed glass", detail: "Per GB 15763.2-2005 testing" },
  { label: "Thermal Resistance", value: "3× standard float", detail: "Withstands 250°C temperature differential" },
  { label: "Edge Work", value: "Flat, beveled, pencil, OG", detail: "Must be completed before tempering" },
  { label: "Processing", value: "Flat & bent tempering", detail: "Custom curves per project requirements" },
  { label: "Surface Options", value: "Clear, tinted, Low-E, reflective", detail: "Can be combined with coating" },
  { label: "Certification", value: "CCC (3C) Certified", detail: "National technical inspection approved" },
];

export default function TemperedSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-5 border border-brand-light hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(16px)",
                transition: "all 500ms ease-out",
                transitionDelay: (100 + i * 60) + "ms",
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm font-semibold text-brand-accent">{s.value}</span>
              </div>
              <p className="mt-1.5 text-xs text-brand-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ TemperedAdvantages ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedAdvantages.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const advantages = [
  { stat: 5, suffix: "×", label: "Stronger", desc: "Impact resistance and bending strength compared to ordinary annealed glass." },
  { stat: 3, suffix: "×", label: "Thermal resistance", desc: "Withstands temperature differentials that would shatter standard float glass." },
  { stat: 250, suffix: "°C", label: "Temp differential", desc: "Maximum temperature difference tempered glass can withstand without cracking." },
  { stat: 15, suffix: "m", label: "Max length", desc: "Our furnace handles panels up to 3m wide × 15m long — oversized capacity." },
];

function AdvCard({ stat, suffix, label, desc, isActive, index }: {
  stat: number; suffix: string; label: string; desc: string; isActive: boolean; index: number;
}) {
  const count = useCountUp(stat, isActive);
  return (
    <div
      className="p-6 rounded-xl border border-brand-light bg-white hover:shadow-md transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out", transitionDelay: (200 + index * 120) + "ms" }}
    >
      <div className="font-display text-4xl font-bold text-brand-accent tabular-nums">
        {count}<span className="text-2xl">{suffix}</span>
      </div>
      <h3 className="mt-2 font-semibold text-brand-dark">{label}</h3>
      <p className="mt-1 text-sm text-brand-muted leading-relaxed">{desc}</p>
    </div>
  );
}

export default function TemperedAdvantages() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-12 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Key Performance Numbers
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((a, i) => (
            <AdvCard key={a.label} {...a} isActive={isInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ GlassComparison ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/GlassComparison.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const rows = [
  { property: "Strength", tempered: "4-5× annealed", laminated: "2× annealed (with interlayer)", annealed: "Baseline (1×)" },
  { property: "Breakage Pattern", tempered: "Small blunt granules", laminated: "Cracks but stays in frame", annealed: "Large sharp shards" },
  { property: "Post-Break Integrity", tempered: "Falls out of frame", laminated: "Holds together (PVB)", annealed: "Falls as shards" },
  { property: "Thermal Resistance", tempered: "250°C differential", laminated: "70°C differential", annealed: "80°C differential" },
  { property: "UV Blocking", tempered: "Minimal", laminated: "> 99%", annealed: "Minimal" },
  { property: "Sound Insulation", tempered: "Standard", laminated: "Superior (1000-2000Hz)", annealed: "Standard" },
  { property: "Can Be Cut After?", tempered: "No", laminated: "No", annealed: "Yes" },
  { property: "Cost", tempered: "Medium", laminated: "Higher", annealed: "Lowest" },
  { property: "Best For", tempered: "Doors, facades, showers", laminated: "Skylights, security, floors", annealed: "Interior windows (non-safety)" },
];

export default function GlassComparison() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Tempered vs. Laminated vs. Annealed Glass
          </h2>
          <p className="mt-4 text-brand-muted text-lg">
            Choosing the right glass type depends on your project requirements. Here is how the three main categories compare.
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-muted border-b border-brand-light">Property</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brand-accent border-b-2 border-brand-accent bg-brand-accent/5 rounded-t-lg">Tempered</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-dark border-b border-brand-light">Laminated</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-dark border-b border-brand-light">Annealed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.property}
                  className={i % 2 === 0 ? "bg-white" : "bg-brand-lighter"}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(8px)",
                    transition: "all 400ms ease-out",
                    transitionDelay: (200 + i * 50) + "ms",
                  }}
                >
                  <td className="py-3 px-4 text-sm font-medium text-brand-dark">{row.property}</td>
                  <td className="py-3 px-4 text-sm text-brand-dark bg-brand-accent/5 font-medium">{row.tempered}</td>
                  <td className="py-3 px-4 text-sm text-brand-muted">{row.laminated}</td>
                  <td className="py-3 px-4 text-sm text-brand-muted">{row.annealed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ TemperedApplications ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedApplications.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const categories = [
  {
    title: "Building Facades",
    items: ["Curtain walls", "Window glazing", "Storefronts"],
    icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z",
  },
  {
    title: "Interior",
    items: ["Shower enclosures", "Glass partitions", "Tabletops"],
    icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819",
  },
  {
    title: "Safety & Access",
    items: ["Glass doors", "Balustrades", "Railings"],
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "Overhead",
    items: ["Skylights", "Canopies", "Atriums"],
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  },
  {
    title: "Furniture",
    items: ["Conference tables", "Display cases", "Shelving"],
    icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
  {
    title: "Specialized",
    items: ["Clean rooms", "Laboratory equipment", "Oven doors"],
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  },
];

export default function TemperedApplications() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-12 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Applications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="p-5 rounded-xl border border-brand-light bg-brand-lighter hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (150 + i * 80) + "ms" }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-brand-dark text-sm">{cat.title}</h3>
              <ul className="mt-2 space-y-1">
                {cat.items.map(item => (
                  <li key={item} className="text-xs text-brand-muted flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-secondary/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ TemperedFAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedFAQ.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

interface FAQItem { q: string; a: string; }

export default function TemperedFAQ({ faqItems }: { faqItems: FAQItem[] }) {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={"rounded-xl border transition-all duration-300 " + (isOpen ? "border-brand-accent/30 bg-white shadow-sm" : "border-brand-light bg-white hover:border-brand-secondary/20")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (150 + i * 60) + "ms" }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <h3 className={"font-medium text-sm pr-4 " + (isOpen ? "text-brand-dark" : "text-brand-dark")}>{item.q}</h3>
                  <svg className={"w-5 h-5 flex-shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-180 text-brand-accent" : "text-brand-muted")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={"overflow-hidden transition-all duration-300 " + (isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                  <p className="px-5 pb-5 text-sm text-brand-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ TemperedCTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedCTA.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function TemperedCTA() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
          Need Tempered Glass for Your Project?
        </h2>
        <p className="mt-4 text-white/60 text-lg leading-relaxed">
          Tell us your specifications — thickness, size, quantity, edge work, and whether you need flat or bent tempering.
          Our team responds within 24 hours with a detailed quote and production timeline.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#quote" className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Get a Free Quote
          </a>
          <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors">
            Email Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}
`);

console.log("");
console.log("🎉 Premium Tempered Glass 页面完成！共 11 个文件。");
console.log("");
console.log("  ✦ 独立路由页面 src/app/products/tempered-glass/page.tsx");
console.log("  ✦ 10 个专属组件: Hero, WhatIs, ManufacturingProcess (交互式),");
console.log("    BreakageComparison (切换动画), Specs, Advantages (数字动画),");
console.log("    GlassComparison (三种玻璃对比表), Applications, FAQ (手风琴),");
console.log("    CTA + Related Products");
console.log("");
console.log("  ✦ SEO: FAQ Schema + Product Schema JSON-LD");
console.log("  ✦ 长尾关键词覆盖: tempered vs laminated, how tempered glass is made");
console.log("");
console.log("访问: http://localhost:3000/products/tempered-glass");
