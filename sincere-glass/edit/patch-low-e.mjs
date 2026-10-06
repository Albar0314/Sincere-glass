#!/usr/bin/env node
/**
 * Sincere Glass — Low-E Glass Page + products.ts update
 * 从项目根目录运行: node edit/patch-low-e.mjs
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
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

// ━━━ 1. Update products.ts — add Low-E Glass ━━━━━━━━━━━━
const productsPath = join(root, "src/lib/products.ts");
const productsContent = readFileSync(productsPath, "utf-8");

if (!productsContent.includes("low-e-glass")) {
  const lowEEntry = `
  {
    slug: "low-e-glass",
    name: "Low-E Glass",
    tagline: "Energy-efficient coating that reflects heat while letting light through",
    description: [
      "Low-emissivity (Low-E) glass features a microscopically thin metallic coating that reflects infrared heat radiation while transmitting visible light. This allows natural daylight in while keeping unwanted heat out in summer and retaining indoor warmth in winter.",
      "Low-E coating is typically applied to one surface of a glass pane within an insulated glass unit, dramatically improving the unit's thermal performance. It can reduce building energy costs by 30-50% compared to uncoated glass.",
    ],
    image: "/images/products/insulated.jpg",
    specs: [
      { label: "Coating Type", value: "Soft-coat (sputtered) or Hard-coat (pyrolytic)" },
      { label: "Emissivity", value: "0.05 - 0.15 (vs 0.84 for uncoated glass)" },
      { label: "Visible Light Transmission", value: "60% - 80%" },
      { label: "Solar Heat Gain Coefficient", value: "0.22 - 0.49" },
      { label: "U-Value Improvement", value: "30-50% vs uncoated IGU" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Heat Reflection", desc: "Reflects long-wave infrared radiation, keeping heat on the side it originates from." },
      { title: "Light Transmission", desc: "Maintains high visible light transmission for natural daylighting." },
      { title: "Year-Round Performance", desc: "Keeps heat out in summer and retains warmth in winter." },
      { title: "Invisible Coating", desc: "The metallic coating is virtually invisible — no change to glass appearance." },
    ],
    applications: [
      "Commercial office towers",
      "Residential windows and doors",
      "Curtain wall facades",
      "Skylight glazing",
      "Passive house projects",
      "Green building certifications (LEED, BREEAM)",
    ],
    standard: "GB/T 18915-2013 — Coated Glass (National Standard)",
  },`;

  const insertPoint = productsContent.lastIndexOf("];");
  const updated = productsContent.slice(0, insertPoint) + lowEEntry + "\n" + productsContent.slice(insertPoint);
  writeFileSync(productsPath, updated, "utf-8");
  console.log("\u270F\uFE0F  \u8986\u76D6: src/lib/products.ts (added Low-E Glass)");
} else {
  console.log("\u2705  products.ts already has Low-E Glass");
}

// ━━━ 2. Low-E Page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/products/low-e-glass/page.tsx", `import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import LowEHero from "@/components/products/low-e/LowEHero";
import WhatIsLowE from "@/components/products/low-e/WhatIsLowE";
import HeatFlowDiagram from "@/components/products/low-e/HeatFlowDiagram";
import CoatingComparison from "@/components/products/low-e/CoatingComparison";
import SeasonalPerformance from "@/components/products/low-e/SeasonalPerformance";
import WhySincereLowE from "@/components/products/low-e/WhySincereLowE";
import LowESpecs from "@/components/products/low-e/LowESpecs";
import LowEApps from "@/components/products/low-e/LowEApps";
import LowEFAQ from "@/components/products/low-e/LowEFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export const metadata: Metadata = {
  title: "Low-E Glass Manufacturer China \u2014 Energy-Efficient Coated Glass | Sincere Glass",
  description: "Custom Low-E glass from China. Soft-coat and hard-coat options, 30-50% energy savings, high visible light transmission. Combined with IGUs for maximum thermal performance.",
  openGraph: {
    title: "Low-E Glass Manufacturer \u2014 Sincere Glass",
    description: "Energy-efficient Low-E coated glass. Reflects heat, transmits light. 3C certified, factory direct.",
    url: "https://sincereglass.com/products/low-e-glass",
  },
};

const faqItems = [
  { q: "What does Low-E mean?", a: "Low-E stands for low emissivity. Emissivity measures how much infrared heat radiation a surface emits. Uncoated glass has an emissivity of about 0.84 (it radiates 84% of heat it absorbs). Low-E coating reduces this to 0.05\u20130.15, meaning the glass reflects most heat radiation back instead of transmitting it." },
  { q: "What is the difference between soft-coat and hard-coat Low-E?", a: "Soft-coat (sputtered) Low-E is applied in a vacuum chamber after the glass is made. It offers better thermal performance but is more delicate \u2014 it must be placed inside a sealed IGU cavity. Hard-coat (pyrolytic) Low-E is applied during float glass manufacturing and is more durable \u2014 it can be used in single-pane applications but has slightly lower performance." },
  { q: "Can I see the Low-E coating?", a: "Low-E coating is virtually invisible. You may notice a very slight color tint (usually a faint blue or grey) depending on the coating type and viewing angle, but it does not significantly affect the glass appearance or visible light transmission." },
  { q: "Does Low-E glass block UV?", a: "Yes. Low-E glass blocks a significant portion of UV radiation (typically 75\u201395%), helping protect interior furnishings from fading. For maximum UV protection (99%+), combine Low-E glass with a laminated interlayer." },
  { q: "Can Low-E glass be tempered?", a: "Hard-coat Low-E can be tempered after coating. Soft-coat Low-E is typically applied to already-tempered or annealed glass and then assembled into an IGU. We handle the full process \u2014 coating, tempering, and IGU assembly \u2014 in our integrated production line." },
  { q: "How much energy does Low-E glass save?", a: "Low-E glass in an IGU typically reduces heating and cooling energy costs by 30\u201350% compared to single-pane uncoated glass. The exact savings depend on climate, building orientation, and the specific Low-E coating and IGU configuration used." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org", "@type": "Product",
  name: "Low-E Glass", description: "Energy-efficient low-emissivity coated glass. Reflects heat, transmits light.",
  image: "https://sincereglass.com/images/products/insulated.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" }, manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "low-e-glass").slice(0, 3);

export default function LowEGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <LowEHero />
        <WhatIsLowE />
        <HeatFlowDiagram />
        <div className="py-10 bg-brand-dark"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Building an energy-efficient project? Get a quote for Low-E glass." product="low-e" variant="dark" /></div></div>
        <CoatingComparison />
        <SeasonalPerformance />
        <WhySincereLowE />
        <LowESpecs />
        <div className="bg-white pb-8"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Tell us your thermal targets and we will recommend the right Low-E configuration." product="low-e" /></div></div>
        <LowEApps />
        <LowEFAQ faqItems={faqItems} />
        <SocialProof />
        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Need Low-E Glass for Your Project?</h2>
            <p className="mt-4 text-white/60 text-lg">Send us your energy performance requirements and we will specify the optimal Low-E configuration.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">Get a Free Quote</button>
              <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Email Us Directly</a>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-brand-lighter">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8">Other Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => (
                <Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden"><Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" /></div>
                  <div className="p-4"><h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3></div>
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

// ━━━ LowEHero — GRADIENT warm-to-cool overlay (unique) ━━━
write("src/components/products/low-e/LowEHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function LowEHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center overflow-hidden">
      {/* Warm-to-cool gradient background (unique to Low-E — represents heat reflection) */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-brand-dark to-blue-900/90" />
      <div className="absolute inset-0 bg-brand-dark/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
            <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
            <span>/</span><span className="text-white/70">Low-E Glass</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms 200ms" }}>
            Low-E Glass
          </h1>
          <p className="mt-4 text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms 350ms" }}>
            Reflects heat. Transmits light. Saves 30\u201350% on building energy costs.
          </p>

          {/* Warm | Cool visual divider */}
          <div className="mt-8 flex items-center justify-center gap-4" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-orange-400 to-red-400" />
              <span className="text-xs text-white/40">Heat reflected</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300" />
              <span className="text-xs text-white/40">Light transmitted</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
            {["Soft & Hard Coat", "0.05\u20130.15 Emissivity", "3C Certified", "IGU Compatible"].map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-white/10 border border-white/10 text-white/80 text-xs rounded-full">{tag}</span>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms 600ms" }}>
            <button onClick={() => openQuote("low-e")} className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm">Get a Quote</button>
            <a href="#how-low-e-works" className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm text-center">How It Works</a>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhatIsLowE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/low-e/WhatIsLowE.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIsLowE() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Low-E Glass?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
          <p><strong className="text-brand-dark font-medium">Low-E</strong> stands for <strong className="text-brand-dark font-medium">low emissivity</strong>. Emissivity is a measure of how much infrared heat a surface radiates. Uncoated glass has an emissivity of about 0.84 \u2014 meaning it radiates 84% of absorbed heat energy.</p>
          <p>A Low-E coating \u2014 a microscopically thin layer of metallic oxide \u2014 reduces that emissivity to just <strong className="text-brand-dark font-medium">0.05\u20130.15</strong>. The coated surface reflects infrared radiation back instead of transmitting it, while still allowing <strong className="text-brand-dark font-medium">60\u201380% of visible light</strong> to pass through.</p>
          <p>In practice: buildings glazed with Low-E glass stay cooler in summer (heat is reflected outward) and warmer in winter (indoor heat is reflected back in). Energy savings of <strong className="text-brand-dark font-medium">30\u201350%</strong> on HVAC costs are typical.</p>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ HeatFlowDiagram — animated SVG (unique) ━━━━━━━━━━━━
write("src/components/products/low-e/HeatFlowDiagram.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function HeatFlowDiagram() {
  const { ref, isInView } = useInView();

  return (
    <section id="how-low-e-works" className="py-16 md:py-24 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">How Low-E Coating Works</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">The coating acts as a selective filter \u2014 reflecting invisible heat while transmitting visible light.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without Low-E */}
          <div className="bg-brand-lighter rounded-2xl p-6 text-center" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <p className="text-xs text-brand-muted uppercase tracking-wider mb-4">Without Low-E coating</p>
            <svg viewBox="0 0 240 180" className="w-full max-w-[240px] mx-auto mb-4">
              <text x="20" y="15" className="text-[10px] fill-red-500">Outdoor heat</text>
              <text x="170" y="15" className="text-[10px] fill-blue-500">Indoor</text>
              {/* Glass */}
              <rect x="110" y="25" width="12" height="130" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1"/>
              {/* Heat arrows passing through */}
              {[50, 80, 110].map((y, i) => (
                <g key={i}>
                  <line x1="30" y1={y} x2="200" y2={y} stroke="#EF4444" strokeWidth="1.5" opacity="0.6" markerEnd="url(#arrowR)">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={(i * 0.4) + "s"} repeatCount="indefinite" />
                  </line>
                </g>
              ))}
              <text x="70" y="145" className="text-[9px] fill-red-400" textAnchor="middle">84% heat</text>
              <text x="70" y="157" className="text-[9px] fill-red-400" textAnchor="middle">passes through</text>
              <defs><marker id="arrowR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M2 2L8 5L2 8" fill="none" stroke="#EF4444" strokeWidth="1.5"/></marker></defs>
            </svg>
            <p className="text-sm text-brand-muted">Standard glass transmits most infrared heat \u2014 high cooling costs in summer.</p>
          </div>

          {/* With Low-E */}
          <div className="bg-brand-dark rounded-2xl p-6 text-center" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <p className="text-xs text-brand-accent uppercase tracking-wider mb-4">With Low-E coating</p>
            <svg viewBox="0 0 240 180" className="w-full max-w-[240px] mx-auto mb-4">
              <text x="20" y="15" className="text-[10px] fill-red-400">Outdoor heat</text>
              <text x="170" y="15" className="text-[10px] fill-blue-300">Indoor</text>
              {/* Glass with Low-E */}
              <rect x="110" y="25" width="12" height="130" rx="2" fill="#DAA745" opacity="0.3" stroke="#DAA745" strokeWidth="1"/>
              {/* Reflected arrows */}
              {[50, 80].map((y, i) => (
                <g key={i}>
                  <line x1="30" y1={y} x2="108" y2={y} stroke="#EF4444" strokeWidth="1.5" opacity="0.5"/>
                  <line x1="108" y1={y} x2="40" y2={y + (i === 0 ? 20 : -15)} stroke="#DAA745" strokeWidth="1" opacity="0.6" strokeDasharray="4 3">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={(i * 0.5) + "s"} repeatCount="indefinite" />
                  </line>
                </g>
              ))}
              {/* Light passing through */}
              <line x1="60" y1="110" x2="200" y2="110" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5" strokeDasharray="6 3">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
              </line>
              <text x="50" y="145" className="text-[9px] fill-brand-accent" textAnchor="middle">Heat reflected</text>
              <text x="180" y="125" className="text-[9px] fill-blue-300" textAnchor="middle">Light through</text>
            </svg>
            <p className="text-sm text-white/50">Low-E reflects infrared heat but transmits visible light \u2014 lower energy costs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ CoatingComparison — toggle soft vs hard coat ━━━━━━━━
write("src/components/products/low-e/CoatingComparison.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";

const coatings = [
  { name: "Soft-Coat (Sputtered)", tag: "Best Performance", emissivity: "0.05\u20130.10", vlt: "60\u201375%", durability: "Must be in sealed IGU cavity", process: "Vacuum deposition after glass is made", best: "High-performance facades, energy-rated buildings", performance: 95 },
  { name: "Hard-Coat (Pyrolytic)", tag: "Most Versatile", emissivity: "0.15\u20130.20", vlt: "70\u201380%", durability: "Can be exposed \u2014 single pane OK", process: "Applied during float glass manufacturing", best: "Renovations, single-pane upgrades, versatile use", performance: 70 },
];

export default function CoatingComparison() {
  const { ref, isInView } = useInView();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % 2), 5000);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(i: number) { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 10000); }

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Soft-Coat vs. Hard-Coat Low-E</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Two coating technologies, different trade-offs. Choose based on your project\u2019s needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coatings.map((c, i) => (
            <button key={c.name} onClick={() => select(i)}
              className={"text-left p-6 rounded-xl border-2 transition-all duration-300 " +
                (active === i ? "border-brand-accent bg-white shadow-md" : "border-brand-light bg-white hover:border-brand-secondary/30")}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (200 + i * 120) + "ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base md:text-lg font-bold text-brand-dark">{c.name}</h3>
                <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + (i === 0 ? "bg-brand-accent/15 text-brand-accent" : "bg-brand-secondary/10 text-brand-secondary")}>{c.tag}</span>
              </div>

              {/* Performance bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-brand-muted mb-1"><span>Thermal performance</span><span>{c.performance}%</span></div>
                <div className="h-2 bg-brand-lighter rounded-full overflow-hidden">
                  <div className={"h-full rounded-full transition-all duration-1000 " + (i === 0 ? "bg-brand-accent" : "bg-brand-secondary")}
                    style={{ width: isInView ? c.performance + "%" : "0%" }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-brand-muted">Emissivity</p><p className="text-brand-dark font-medium">{c.emissivity}</p></div>
                <div><p className="text-xs text-brand-muted">Light transmission</p><p className="text-brand-dark font-medium">{c.vlt}</p></div>
                <div><p className="text-xs text-brand-muted">Durability</p><p className="text-brand-dark font-medium">{c.durability}</p></div>
                <div><p className="text-xs text-brand-muted">Best for</p><p className="text-brand-dark font-medium">{c.best}</p></div>
              </div>

              <div className={"mt-4 overflow-hidden transition-all duration-300 " + (active === i ? "max-h-20 opacity-100" : "max-h-0 opacity-0")}>
                <p className="text-xs text-brand-muted pt-3 border-t border-brand-light">Process: {c.process}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ SeasonalPerformance — summer vs winter toggle (unique) ━━━
write("src/components/products/low-e/SeasonalPerformance.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";

export default function SeasonalPerformance() {
  const { ref, isInView } = useInView();
  const [isSummer, setIsSummer] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setIsSummer(prev => !prev), 4500);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(val: boolean) { setIsSummer(val); setPaused(true); setTimeout(() => setPaused(false), 10000); }

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Year-Round Performance</h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">Low-E glass works in both directions \u2014 keeping your building comfortable in every season.</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => select(true)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (isSummer ? "bg-orange-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            \u2600\uFE0F Summer
          </button>
          <button onClick={() => select(false)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (!isSummer ? "bg-blue-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            \u2744\uFE0F Winter
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl min-h-[280px] flex items-center justify-center p-8 md:p-12">
          {isSummer ? (
            <div key="summer" className="text-center animate-fade-up">
              <div className="text-5xl mb-4">\u2600\uFE0F</div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">Summer: Heat Stays Out</h3>
              <p className="mt-3 text-white/50 max-w-lg mx-auto leading-relaxed">The Low-E coating reflects solar infrared radiation back outside, reducing solar heat gain by up to 70%. Indoor spaces stay cooler with less air conditioning.</p>
              <div className="mt-6 flex justify-center gap-6">
                <div className="text-center"><span className="font-display text-2xl font-bold text-orange-400">70%</span><p className="text-xs text-white/40 mt-1">Heat rejected</p></div>
                <div className="text-center"><span className="font-display text-2xl font-bold text-blue-300">75%</span><p className="text-xs text-white/40 mt-1">Light transmitted</p></div>
              </div>
            </div>
          ) : (
            <div key="winter" className="text-center animate-fade-up">
              <div className="text-5xl mb-4">\u2744\uFE0F</div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">Winter: Warmth Stays In</h3>
              <p className="mt-3 text-white/50 max-w-lg mx-auto leading-relaxed">The same coating reflects indoor heating energy back into the room, reducing heat loss through windows. Less energy needed to maintain comfortable temperatures.</p>
              <div className="mt-6 flex justify-center gap-6">
                <div className="text-center"><span className="font-display text-2xl font-bold text-brand-accent">85%</span><p className="text-xs text-white/40 mt-1">Heat retained</p></div>
                <div className="text-center"><span className="font-display text-2xl font-bold text-blue-300">75%</span><p className="text-xs text-white/40 mt-1">Light transmitted</p></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <div className={"w-2 h-2 rounded-full transition-colors " + (isSummer ? "bg-orange-400" : "bg-white/20")} />
          <div className={"w-2 h-2 rounded-full transition-colors " + (!isSummer ? "bg-blue-400" : "bg-white/20")} />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhySincereLowE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/low-e/WhySincereLowE.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  { stat: 50, suffix: "%", label: "Energy savings potential", desc: "Low-E + argon IGU can cut HVAC costs in half compared to single-pane uncoated glass. We help you specify the right combination for your climate zone." },
  { stat: 2, suffix: "", label: "Coating options available", desc: "Both soft-coat (vacuum sputtered) and hard-coat (pyrolytic) Low-E. We match the coating type to your project requirements \u2014 performance vs versatility." },
  { stat: 15, suffix: "m", label: "Max IGU panel length", desc: "Low-E coating integrated into our oversized IGU production line. Panels up to 3m \u00D7 15m \u2014 fewer joints, cleaner facades." },
  { stat: 100, suffix: "%", label: "Integrated production", desc: "Coating, cutting, tempering, IGU assembly, and quality testing all happen in our factories. No outsourced steps \u2014 faster delivery and consistent quality." },
];

function Stat({ s, active, i }: { s: typeof advantages[0]; active: boolean; i: number }) {
  const count = useCountUp(s.stat, active);
  return (
    <div className="p-5 rounded-xl bg-brand-lighter border border-brand-light hover:border-brand-accent/20 transition-all duration-300"
      style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(20px)", transition: "all 600ms", transitionDelay: (200 + i * 120) + "ms" }}>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
        <span className="font-display text-lg font-bold text-brand-accent">{s.suffix}</span>
      </div>
      <h3 className="font-semibold text-brand-dark text-sm">{s.label}</h3>
      <p className="mt-1.5 text-xs text-brand-muted leading-relaxed">{s.desc}</p>
    </div>
  );
}

export default function WhySincereLowE() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Why Source Low-E Glass from Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((s, i) => <Stat key={s.label} s={s} active={isInView} i={i} />)}
        </div>
        <div className="mt-8"><InlineQuoteCTA text="Need help choosing the right Low-E configuration? Our team can recommend based on your climate and building orientation." product="low-e" /></div>
      </div>
    </section>
  );
}
`);

// ━━━ LowESpecs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/low-e/LowESpecs.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Coating Types", value: "Soft-coat (sputtered), Hard-coat (pyrolytic)" },
  { label: "Emissivity", value: "0.05 \u2013 0.15 (vs 0.84 uncoated)" },
  { label: "Visible Light Transmission", value: "60% \u2013 80%" },
  { label: "Solar Heat Gain Coefficient", value: "0.22 \u2013 0.49" },
  { label: "UV Blocking", value: "75% \u2013 95%" },
  { label: "U-Value (in IGU)", value: "1.4 \u2013 2.3 W/m\u00B2K" },
  { label: "Standard", value: "GB/T 18915-2013" },
  { label: "Certification", value: "CCC (3C) Certified" },
];

export default function LowESpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>Technical Specifications</h2>
        <div className="overflow-hidden rounded-xl border border-brand-light">
          {specs.map((s, i) => (
            <div key={s.label} className={"flex justify-between items-center px-6 py-4 " + (i % 2 === 0 ? "bg-brand-lighter" : "bg-white")}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (100 + i * 50) + "ms" }}>
              <span className="text-sm font-medium text-brand-dark">{s.label}</span>
              <span className="text-sm text-brand-accent font-medium text-right">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ LowEApps ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/low-e/LowEApps.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const apps = [
  { name: "Office Towers", desc: "Reduce HVAC costs across large glazed facades" },
  { name: "Residential Windows", desc: "Year-round comfort with lower energy bills" },
  { name: "Curtain Walls", desc: "High-performance facades with maximum light" },
  { name: "Skylights", desc: "Reduce overhead solar heat gain" },
  { name: "Passive House", desc: "Meet strict energy efficiency standards" },
  { name: "Green Certifications", desc: "LEED, BREEAM, and local energy codes" },
];

export default function LowEApps() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>Applications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {apps.map((a, i) => (
            <div key={a.name} className="bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300 text-center"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (150 + i * 60) + "ms" }}>
              <h3 className="font-semibold text-brand-dark text-sm">{a.name}</h3>
              <p className="mt-1 text-xs text-brand-muted">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ LowEFAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/low-e/LowEFAQ.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

interface FAQItem { q: string; a: string; }

export default function LowEFAQ({ faqItems }: { faqItems: FAQItem[] }) {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>Frequently Asked Questions</h2>
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
console.log("\uD83C\uDF89 Low-E Glass page done! 12 files + products.ts updated.");
console.log("");
console.log("Unique layout elements:");
console.log("  \u2022 Hero: WARM-TO-COOL GRADIENT background (orange \u2192 blue = heat reflection)");
console.log("  \u2022 Heat Flow: SIDE-BY-SIDE before/after SVG diagrams");
console.log("  \u2022 Coating Comparison: auto-switch cards with PERFORMANCE BARS");
console.log("  \u2022 Seasonal: SUMMER/WINTER toggle with emoji + animated stats");
console.log("  \u2022 Products.ts updated with Low-E data");
console.log("");
console.log("All 5 product pages complete:");
console.log("  /products/tempered-glass");
console.log("  /products/insulated-glass");
console.log("  /products/laminated-glass");
console.log("  /products/enameled-glass");
console.log("  /products/low-e-glass");
console.log("");
console.log("Visit: http://localhost:3000/products/low-e-glass");
