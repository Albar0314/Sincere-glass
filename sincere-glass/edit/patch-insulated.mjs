#!/usr/bin/env node
/**
 * Sincere Glass — Premium Insulated Glass Page
 * 从项目根目录运行: node edit/patch-insulated.mjs
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
  console.log((existed ? "\u270F\uFE0F  \u8986\u76D6" : "\u2705  \u521B\u5EFA") + ": " + rel);
}

// ━━━ Insulated Glass page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/products/insulated-glass/page.tsx", `import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import InsulatedHero from "@/components/products/insulated/InsulatedHero";
import WhatIsIGU from "@/components/products/insulated/WhatIsIGU";
import IGUDiagram from "@/components/products/insulated/IGUDiagram";
import EnergyPerformance from "@/components/products/insulated/EnergyPerformance";
import GasFillComparison from "@/components/products/insulated/GasFillComparison";
import InsulatedSpecs from "@/components/products/insulated/InsulatedSpecs";
import WhySincereIGU from "@/components/products/insulated/WhySincereIGU";
import InsulatedApplications from "@/components/products/insulated/InsulatedApplications";
import InsulatedFAQ from "@/components/products/insulated/InsulatedFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export const metadata: Metadata = {
  title: "Insulated Glass Manufacturer China \u2014 Double & Triple Glazing | Sincere Glass",
  description: "Custom insulated glass units (IGUs) from China. Argon gas fill, Low-E coating options, spacers from 6-20mm. 1.5\u00D7 wind resistance, 3C certified. Factory-direct pricing.",
  openGraph: {
    title: "Insulated Glass (IGU) Manufacturer \u2014 Sincere Glass",
    description: "Energy-efficient insulated glass units with automated argon filling. Double-sealed, 3C certified.",
    url: "https://sincereglass.com/products/insulated-glass",
    images: [{ url: "https://sincereglass.com/images/products/insulated.jpg" }],
  },
};

const faqItems = [
  { q: "What is insulated glass (IGU)?", a: "An insulated glass unit consists of two or more glass panes separated by a sealed air or gas-filled space. The sealed gap acts as thermal and acoustic insulation, significantly reducing heat transfer and noise compared to single-pane glass." },
  { q: "What gas fills do you offer?", a: "We offer both air-filled and argon gas-filled IGUs. Our Honghu factory has an automated argon gas-filling production line that ensures consistent fill rates. Argon reduces heat transfer by about 30% compared to air-filled units." },
  { q: "What spacer widths are available?", a: "We manufacture IGUs with spacer widths of 6mm, 9mm, 12mm, 15mm, and 20mm. The optimal spacer width depends on your thermal and acoustic requirements \u2014 wider spacers generally provide better insulation up to a point." },
  { q: "Can insulated glass be combined with Low-E coating?", a: "Yes, and we recommend it for maximum energy efficiency. Low-E coated insulated glass can reduce solar heat gain by up to 70% while maintaining high visible light transmission. We offer both soft-coat and hard-coat Low-E options." },
  { q: "How long do insulated glass units last?", a: "With our dual-seal technology (PIB primary seal + structural silicone secondary seal), our IGUs are designed for 20+ years of service. The dual seal prevents moisture ingress and maintains the gas fill over the unit\u2019s lifetime." },
  { q: "What is the lead time for IGU orders?", a: "Standard IGU orders ship within 10-18 business days. Oversized units or those requiring special coatings may take 18-25 business days. Our automated production line handles high volumes efficiently." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Insulated Glass Unit (IGU)",
  description: "Energy-efficient insulated glass units with argon gas fill and dual-seal technology. 3C certified.",
  image: "https://sincereglass.com/images/products/insulated.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" },
  manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "insulated-glass");

export default function InsulatedGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <InsulatedHero />
        <WhatIsIGU />
        <IGUDiagram />

        <div className="py-10 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Planning an energy-efficient building? Get a quote for custom IGUs." product="insulated" variant="dark" />
          </div>
        </div>

        <EnergyPerformance />
        <GasFillComparison />
        <WhySincereIGU />
        <InsulatedSpecs />

        <div className="bg-brand-lighter pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Ready to specify? Send us your glazing schedule for a precise quote." product="insulated" />
          </div>
        </div>

        <InsulatedApplications />
        <InsulatedFAQ faqItems={faqItems} />
        <SocialProof />

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Need Insulated Glass for Your Project?</h2>
            <p className="mt-4 text-white/60 text-lg">Tell us your thermal performance targets and we will recommend the optimal IGU configuration.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors" onClick="document.querySelector('[data-quote-trigger]')?.click()">
                Get a Free Quote
              </button>
              <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Email Us Directly</a>
            </div>
          </div>
        </section>

        {/* Related */}
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

// ━━━ InsulatedHero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/InsulatedHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function InsulatedHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/insulated.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/70">Insulated Glass</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms ease-out 200ms" }}>
          Insulated Glass
        </h1>

        <p className="mt-4 md:mt-5 text-base md:text-xl text-white/70 max-w-2xl leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms ease-out 350ms" }}>
          Superior thermal and acoustic insulation. Dual-sealed spacer technology. Automated argon gas filling.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["6\u201320mm Spacer", "Air or Argon", "3C Certified", "1.5\u00D7 Wind Resistance"].map(tag => (
            <span key={tag} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs md:text-sm rounded-full">{tag}</span>
          ))}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <button onClick={() => openQuote("insulated")} className="px-6 md:px-7 py-3 md:py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm md:text-base">
            Get a Quote
          </button>
          <a href="#how-igu-works" className="px-6 md:px-7 py-3 md:py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm md:text-base text-center">
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhatIsIGU ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/WhatIsIGU.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIsIGU() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Insulated Glass?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
          <p>
            Insulated glass units (IGUs) \u2014 also called double glazing or triple glazing \u2014 consist of two or more
            glass panes separated by a sealed, gas-filled space. This dead air (or inert gas) layer acts as a thermal
            barrier, dramatically reducing heat transfer between interior and exterior environments.
          </p>
          <p>
            The result: <strong className="text-brand-dark font-medium">buildings stay cooler in summer and warmer in winter</strong>,
            cutting HVAC energy consumption by 30\u201350% compared to single-pane glazing. IGUs also significantly reduce
            outside noise \u2014 a critical consideration for urban commercial and residential projects.
          </p>
          <p>
            Our IGUs use <strong className="text-brand-dark font-medium">dual-seal spacer technology</strong> (PIB primary seal +
            structural silicone secondary seal) for maximum longevity. Wind pressure resistance is 1.5\u00D7 that of
            single-pane glass. Combined with Low-E coatings, our units deliver some of the lowest U-values available
            from a Chinese manufacturer.
          </p>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ IGUDiagram — SVG cross-section ━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/IGUDiagram.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function IGUDiagram() {
  const { ref, isInView } = useInView();

  return (
    <section id="how-igu-works" className="py-16 md:py-24 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <svg viewBox="0 0 320 300" className="w-full max-w-[320px] mx-auto" aria-label="Insulated glass unit cross-section diagram">
              {/* Outer pane */}
              <rect x="40" y="30" width="30" height="240" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1"/>
              <text x="55" y="158" textAnchor="middle" transform="rotate(-90, 55, 158)" className="fill-brand-dark text-[10px] font-medium">Outer pane</text>

              {/* Spacer bar */}
              <rect x="70" y="30" width="8" height="240" rx="1" fill="#DAA745" opacity="0.5" stroke="#DAA745" strokeWidth="0.5"/>
              <rect x="182" y="30" width="8" height="240" rx="1" fill="#DAA745" opacity="0.5" stroke="#DAA745" strokeWidth="0.5"/>

              {/* Gas fill area */}
              <rect x="78" y="30" width="104" height="240" fill="#4A9DB8" opacity="0.08"/>
              <text x="130" y="145" textAnchor="middle" className="fill-brand-secondary text-[11px]">Air or Argon</text>
              <text x="130" y="162" textAnchor="middle" className="fill-brand-secondary text-[9px] opacity-60">gas fill</text>

              {/* Inner pane */}
              <rect x="190" y="30" width="30" height="240" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1"/>
              <text x="205" y="158" textAnchor="middle" transform="rotate(-90, 205, 158)" className="fill-brand-dark text-[10px] font-medium">Inner pane</text>

              {/* Seal indicators */}
              <rect x="70" y="30" width="120" height="6" rx="1" fill="#DAA745" opacity="0.3"/>
              <rect x="70" y="264" width="120" height="6" rx="1" fill="#DAA745" opacity="0.3"/>
              <text x="130" y="24" textAnchor="middle" className="fill-brand-accent text-[9px]">Dual seal (PIB + silicone)</text>
              <text x="130" y="284" textAnchor="middle" className="fill-brand-accent text-[9px]">Dual seal (PIB + silicone)</text>

              {/* Low-E coating indicator */}
              <line x1="188" y1="50" x2="188" y2="250" stroke="#DAA745" strokeWidth="1.5" strokeDasharray="4 3"/>
              <text x="240" y="90" className="fill-brand-accent text-[9px]">Low-E</text>
              <text x="240" y="102" className="fill-brand-accent text-[9px]">coating</text>
              <line x1="222" y1="96" x2="190" y2="96" stroke="#DAA745" strokeWidth="0.5" strokeDasharray="2 2"/>

              {/* Dimension */}
              <line x1="70" y1="290" x2="190" y2="290" stroke="#8B95A5" strokeWidth="0.5"/>
              <line x1="70" y1="286" x2="70" y2="294" stroke="#8B95A5" strokeWidth="0.5"/>
              <line x1="190" y1="286" x2="190" y2="294" stroke="#8B95A5" strokeWidth="0.5"/>
              <text x="130" y="300" textAnchor="middle" className="fill-brand-muted text-[9px]">6\u201320mm spacer</text>
            </svg>
          </div>

          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">How an IGU Works</h3>
            <div className="mt-4 space-y-3 text-sm text-brand-muted leading-relaxed">
              <p>Two or more glass panes are separated by a spacer bar and hermetically sealed. The sealed cavity traps a layer of still air or inert gas (argon) that resists heat conduction and convection.</p>
              <p>The <span className="text-brand-accent font-medium">dual-seal system</span> uses a PIB (polyisobutylene) primary seal for gas retention and a structural silicone secondary seal for mechanical strength and moisture resistance.</p>
              <p>An optional <span className="text-brand-accent font-medium">Low-E coating</span> on surface #3 (inner face of the outer pane) reflects long-wave infrared radiation back into the room in winter and away from the building in summer.</p>
              <p>The result: U-values as low as <span className="text-brand-dark font-medium">1.4 W/m\u00B2\u00B7K</span> \u2014 a 60\u201370% improvement over single glazing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ EnergyPerformance — animated bars ━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/EnergyPerformance.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const configs = [
  { label: "Single pane", uValue: 5.8, bar: 100, color: "bg-red-400" },
  { label: "Double \u2014 air fill", uValue: 2.8, bar: 48, color: "bg-brand-secondary" },
  { label: "Double \u2014 argon fill", uValue: 2.3, bar: 40, color: "bg-blue-400" },
  { label: "Double \u2014 Low-E + argon", uValue: 1.6, bar: 28, color: "bg-brand-accent" },
  { label: "Triple \u2014 Low-E + argon", uValue: 1.0, bar: 17, color: "bg-green-500" },
];

export default function EnergyPerformance() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Energy Performance Comparison
          </h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">
            Lower U-value = less heat escapes = lower energy bills. See how different IGU configurations compare.
          </p>
        </div>

        <div className="space-y-4">
          {configs.map((c, i) => (
            <div key={c.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 100) + "ms" }}>
              <span className="text-sm text-brand-dark font-medium w-full sm:w-48 flex-shrink-0">{c.label}</span>
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-8 bg-white rounded-full overflow-hidden border border-brand-light">
                  <div className={c.color + " h-full rounded-full transition-all duration-1000 ease-out"}
                    style={{ width: isInView ? c.bar + "%" : "0%" }} />
                </div>
                <span className="text-sm font-bold text-brand-dark tabular-nums w-20 text-right">{c.uValue} W/m\u00B2K</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-brand-muted">
          * U-values are indicative and depend on glass thickness, spacer type, and coating specifications. Actual values calculated per project.
        </p>
      </div>
    </section>
  );
}
`);

// ━━━ GasFillComparison — auto-switching ━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/GasFillComparison.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";

const fills = [
  {
    name: "Air Fill",
    tag: "Standard",
    thermal: "Good",
    uValue: "~2.8 W/m\u00B2K",
    cost: "Base cost",
    best: "Budget-conscious projects, mild climates",
    detail: "Standard air-filled IGUs provide meaningful insulation improvement over single glazing. Suitable for projects where thermal performance is important but not the primary driver.",
    color: "bg-brand-secondary/10 border-brand-secondary/20",
  },
  {
    name: "Argon Fill",
    tag: "Recommended",
    thermal: "Excellent",
    uValue: "~2.3 W/m\u00B2K",
    cost: "+5\u201310%",
    best: "Commercial buildings, energy-rated projects",
    detail: "Argon is 34% less conductive than air. Our automated filling line ensures consistent 90%+ fill rates. The most popular choice for modern commercial and high-end residential projects.",
    color: "bg-brand-accent/10 border-brand-accent/20",
  },
];

export default function GasFillComparison() {
  const { ref, isInView } = useInView();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % fills.length), 4500);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(i: number) { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 8000); }

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Gas Fill Options</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">The gas between the panes makes a measurable difference in thermal performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fills.map((fill, i) => (
            <button key={fill.name} onClick={() => select(i)}
              className={"text-left p-6 rounded-xl border-2 transition-all duration-300 " +
                (active === i ? fill.color + " shadow-md" : "border-brand-light bg-brand-lighter hover:border-brand-secondary/20")}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (200 + i * 120) + "ms" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-bold text-brand-dark">{fill.name}</h3>
                <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + (i === 1 ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-secondary/10 text-brand-secondary")}>{fill.tag}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
                <div><span className="text-brand-muted">Thermal:</span> <span className="text-brand-dark font-medium">{fill.thermal}</span></div>
                <div><span className="text-brand-muted">U-value:</span> <span className="text-brand-dark font-medium">{fill.uValue}</span></div>
                <div><span className="text-brand-muted">Cost:</span> <span className="text-brand-dark font-medium">{fill.cost}</span></div>
                <div><span className="text-brand-muted">Best for:</span> <span className="text-brand-dark font-medium">{fill.best}</span></div>
              </div>
              <p className={"text-sm leading-relaxed transition-all duration-300 " + (active === i ? "text-brand-muted max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>{fill.detail}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhySincereIGU ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/WhySincereIGU.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  { icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    title: "Automated Argon Filling", stat: 90, suffix: "%+", statLabel: "consistent fill rate",
    desc: "Our Honghu factory has a fully automated gas-filling production line \u2014 no manual injection. This ensures consistent 90%+ argon fill rates across every unit, maximizing thermal performance." },
  { icon: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122",
    title: "Oversized IGU Capability", stat: 15, suffix: "m", statLabel: "max panel length",
    desc: "Most factories cap IGUs at 2.4m\u00D73.6m. Our oversized line produces units up to 3m\u00D715m \u2014 ideal for floor-to-ceiling curtain walls and feature glazing that demands uninterrupted views." },
  { icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Factory-Direct Pricing", stat: 25, suffix: "%", statLabel: "lower than trading companies",
    desc: "We produce everything in-house \u2014 cutting, coating, assembly, sealing \u2014 across two owned factories. No middlemen means you get manufacturer pricing on every unit." },
  { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Full Documentation", stat: 100, suffix: "%", statLabel: "3C certified",
    desc: "Every IGU ships with 3C certification, test reports, and compliance documentation. We handle the paperwork so your project passes inspection first time \u2014 no surprises at the building site." },
];

function StatCard({ adv, isActive, index }: { adv: typeof advantages[0]; isActive: boolean; index: number }) {
  const count = useCountUp(adv.stat, isActive);
  return (
    <div className="p-6 rounded-xl bg-white border border-brand-light hover:border-brand-accent/20 hover:shadow-md transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out", transitionDelay: (200 + index * 120) + "ms" }}>
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={adv.icon} />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
            <span className="font-display text-lg font-bold text-brand-accent">{adv.suffix}</span>
          </div>
          <p className="text-xs text-brand-muted mt-0.5">{adv.statLabel}</p>
          <h3 className="font-display text-base font-bold text-brand-dark mt-3">{adv.title}</h3>
          <p className="mt-2 text-sm text-brand-muted leading-relaxed">{adv.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhySincereIGU() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Why Source IGUs from Sincere Glass?</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg max-w-3xl">What sets our insulated glass apart from the hundreds of other Chinese IGU manufacturers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advantages.map((adv, i) => <StatCard key={adv.title} adv={adv} isActive={isInView} index={i} />)}
        </div>
        <div className="mt-8">
          <InlineQuoteCTA text="Ready to compare? Send us your glazing schedule and we will provide a competitive quote." product="insulated" />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ InsulatedSpecs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/InsulatedSpecs.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Spacer Options", value: "6, 9, 12, 15, 20mm", detail: "Aluminum or warm-edge spacer bars" },
  { label: "Glass Options", value: "Clear, Low-E, tinted, reflective", detail: "Any combination of pane types" },
  { label: "Gas Fill", value: "Air or Argon", detail: "Automated argon filling line (90%+ fill rate)" },
  { label: "Seal Type", value: "Dual seal (PIB + silicone)", detail: "Primary gas retention + structural secondary seal" },
  { label: "Wind Resistance", value: "1.5\u00D7 single pane", detail: "Per GB/T 11944-2012 testing" },
  { label: "U-Value Range", value: "1.4 \u2013 2.8 W/m\u00B2K", detail: "Depends on configuration and coating" },
  { label: "Sound Reduction", value: "Up to 35 dB", detail: "Significant improvement in urban environments" },
  { label: "Certification", value: "CCC (3C) Certified", detail: "Compliant with GB/T 11944-2012" },
];

export default function InsulatedSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((s, i) => (
            <div key={s.label} className="bg-brand-lighter rounded-xl p-5 border border-brand-light hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (100 + i * 60) + "ms" }}>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm font-semibold text-brand-accent text-right">{s.value}</span>
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

// ━━━ InsulatedApplications ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/InsulatedApplications.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const categories = [
  { title: "Commercial", items: ["Office towers", "Shopping malls", "Hotels"], icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" },
  { title: "Public Buildings", items: ["Hospitals", "Libraries", "Exhibition halls"], icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" },
  { title: "Residential", items: ["High-rise apartments", "Villas", "Sliding doors"], icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" },
  { title: "Controlled Environment", items: ["Computer rooms", "Clean rooms", "Laboratories"], icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" },
  { title: "Sun Control", items: ["West-facing facades", "Skylight glazing", "Sun rooms"], icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" },
  { title: "Industrial", items: ["Chemical plants", "Precision workshops", "Food processing"], icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" },
];

export default function InsulatedApplications() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-12 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Applications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <div key={cat.title} className="p-5 rounded-xl border border-brand-light bg-white hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (150 + i * 80) + "ms" }}>
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

// ━━━ InsulatedFAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/insulated/InsulatedFAQ.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

interface FAQItem { q: string; a: string; }

export default function InsulatedFAQ({ faqItems }: { faqItems: FAQItem[] }) {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={"rounded-xl border transition-all duration-300 " + (isOpen ? "border-brand-accent/30 bg-brand-lighter shadow-sm" : "border-brand-light bg-white hover:border-brand-secondary/20")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (150 + i * 60) + "ms" }}>
                <button onClick={() => setOpenIdx(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <h3 className="font-medium text-sm pr-4 text-brand-dark">{item.q}</h3>
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

console.log("");
console.log("\uD83C\uDF89 Insulated Glass premium page done! 10 files created.");
console.log("");
console.log("Sections (15 total):");
console.log("  Hero \u2192 WhatIs \u2192 IGU Diagram (SVG cross-section)");
console.log("  \u2192 Inline CTA \u2192 Energy Performance (animated U-value bars)");
console.log("  \u2192 Gas Fill Comparison (auto-switch Air vs Argon)");
console.log("  \u2192 Why Sincere IGU (4 competitive advantages + stats)");
console.log("  \u2192 Specs \u2192 Inline CTA \u2192 Applications");
console.log("  \u2192 FAQ (6 questions + Schema) \u2192 Social Proof \u2192 CTA \u2192 Related");
console.log("");
console.log("Visit: http://localhost:3000/products/insulated-glass");
