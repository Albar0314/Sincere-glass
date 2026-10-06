#!/usr/bin/env node
/**
 * Sincere Glass — Premium Laminated Glass Page
 * 从项目根目录运行: node edit/patch-laminated.mjs
 * 
 * Layout differentiation vs Tempered & Insulated:
 * - Hero: center-aligned + layered glass visual
 * - Layer Builder: interactive interlayer selector (PVB/SGP)
 * - Sound: horizontal noise reduction meter
 * - UV: circular percentage ring
 * - Security Tiers: vertical level cards
 * - Applications: horizontal scroll cards (not grid)
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

// ━━━ Page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/products/laminated-glass/page.tsx", `import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import LaminatedHero from "@/components/products/laminated/LaminatedHero";
import WhatIsLaminated from "@/components/products/laminated/WhatIsLaminated";
import LayerBuilder from "@/components/products/laminated/LayerBuilder";
import SoundReduction from "@/components/products/laminated/SoundReduction";
import SecurityTiers from "@/components/products/laminated/SecurityTiers";
import WhySincereLam from "@/components/products/laminated/WhySincereLam";
import LaminatedSpecs from "@/components/products/laminated/LaminatedSpecs";
import LaminatedApps from "@/components/products/laminated/LaminatedApps";
import LaminatedFAQ from "@/components/products/laminated/LaminatedFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export const metadata: Metadata = {
  title: "Laminated Glass Manufacturer China \u2014 PVB & SGP Interlayer | Sincere Glass",
  description: "Custom laminated safety glass from China. PVB and SGP interlayer options, 99% UV blocking, superior sound insulation. Autoclave up to 3m\u00D715m. 3C certified.",
  openGraph: {
    title: "Laminated Glass Manufacturer \u2014 Sincere Glass",
    description: "Safety laminated glass with PVB/SGP interlayer. 99% UV block, sound insulation, anti-intrusion. 3C certified.",
    url: "https://sincereglass.com/products/laminated-glass",
    images: [{ url: "https://sincereglass.com/images/products/laminated.jpg" }],
  },
};

const faqItems = [
  { q: "What is laminated glass?", a: "Laminated glass consists of two or more glass panes bonded together with a tough plastic interlayer (typically PVB or SGP). When broken, the interlayer holds the fragments in place, preventing dangerous shards from falling and maintaining a barrier." },
  { q: "What is the difference between PVB and SGP interlayer?", a: "PVB (polyvinyl butyral) is the standard interlayer \u2014 flexible, good sound damping, excellent UV blocking. SGP (SentryGlas Plus) is 5\u00D7 stiffer and 100\u00D7 more tear-resistant, used for structural glazing where the glass must carry load even after breakage (glass floors, balustrades, hurricane glazing)." },
  { q: "How much UV does laminated glass block?", a: "Laminated glass with PVB interlayer blocks over 99% of ultraviolet radiation. This protects interior furnishings, artwork, and merchandise from fading. It also reduces infrared heat transmission." },
  { q: "Can laminated glass be used for soundproofing?", a: "Yes. Laminated glass is one of the most effective glazing options for sound reduction, particularly in the 1000\u20132000Hz range (speech, traffic, urban noise). A multilayer laminated unit can achieve 35\u201345dB reduction depending on configuration." },
  { q: "What sizes can you produce?", a: "Our high-pressure autoclaves can process laminated glass panels up to 3m \u00D7 15m. We produce both standard and jumbo laminated units for architectural applications including skylights, facades, and glass floors." },
  { q: "Is laminated glass bulletproof?", a: "Multi-layer laminated glass can be configured for ballistic resistance, but true bullet-resistant glass requires specific tested configurations (typically 3+ layers with SGP interlayer). We manufacture to order based on the required protection level." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org", "@type": "Product",
  name: "Laminated Glass", description: "Safety laminated glass with PVB/SGP interlayer. 99% UV blocking, superior sound insulation.",
  image: "https://sincereglass.com/images/products/laminated.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" },
  manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "laminated-glass");

export default function LaminatedGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <LaminatedHero />
        <WhatIsLaminated />
        <LayerBuilder />

        <div className="py-10 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Need a specific laminated glass configuration? Tell us your requirements." product="laminated" variant="dark" />
          </div>
        </div>

        <SoundReduction />
        <SecurityTiers />
        <WhySincereLam />
        <LaminatedSpecs />

        <div className="bg-white pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Ready to order? We respond with a detailed quote within 24 hours." product="laminated" />
          </div>
        </div>

        <LaminatedApps />
        <LaminatedFAQ faqItems={faqItems} />
        <SocialProof />

        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Need Laminated Glass for Your Project?</h2>
            <p className="mt-4 text-white/60 text-lg">Tell us your safety requirements and we will recommend the optimal laminated glass configuration.</p>
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
                  <div className="p-4"><h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3><p className="mt-1 text-xs text-brand-muted line-clamp-1">{p.tagline}</p></div>
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

// ━━━ LaminatedHero — CENTER-ALIGNED (different from left-aligned tempered/insulated) ━━━
write("src/components/products/laminated/LaminatedHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function LaminatedHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/laminated.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-brand-dark/85" />

      {/* Center-aligned layout (different from left-aligned tempered/insulated) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full py-16 md:py-20 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/70">Laminated Glass</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms ease-out 200ms" }}>
          Laminated Glass
        </h1>

        <p className="mt-4 md:mt-5 text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms ease-out 350ms" }}>
          Holds together when broken. Blocks 99% UV. Reduces noise. Your safest glazing option.
        </p>

        {/* Layered glass visual indicator */}
        <div className="mt-8 flex justify-center gap-1 items-center" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          <div className="w-3 h-16 bg-white/20 rounded-sm" />
          <div className="w-2 h-14 bg-brand-accent/40 rounded-sm" />
          <div className="w-3 h-16 bg-white/20 rounded-sm" />
          <span className="ml-3 text-xs text-white/40">Glass + Interlayer + Glass</span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["PVB & SGP", "99% UV Block", "3C Certified", "Max 3m\u00D715m"].map(tag => (
            <span key={tag} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs md:text-sm rounded-full">{tag}</span>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <button onClick={() => openQuote("laminated")} className="px-6 md:px-7 py-3 md:py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm md:text-base">
            Get a Quote
          </button>
          <a href="#layer-builder" className="px-6 md:px-7 py-3 md:py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm md:text-base text-center">
            Build Your Configuration
          </a>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhatIsLaminated — FULL-WIDTH with 3-column highlight cards below ━━━
write("src/components/products/laminated/WhatIsLaminated.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const highlights = [
  { num: "99%", label: "UV blocked", desc: "Protects furnishings from fading" },
  { num: "5\u00D7", label: "SGP tear resistance", desc: "vs standard PVB interlayer" },
  { num: "35\u201345", label: "dB noise reduction", desc: "Effective at 1000\u20132000Hz" },
];

export default function WhatIsLaminated() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Laminated Glass?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg text-left md:text-center">
          <p>Laminated glass bonds two or more panes together with a tough plastic interlayer \u2014 typically <strong className="text-brand-dark font-medium">PVB</strong> (polyvinyl butyral) or <strong className="text-brand-dark font-medium">SGP</strong> (SentryGlas Plus). When impact shatters the glass, the interlayer holds every fragment in place.</p>
          <p>This \u201Cstay-in-frame\u201D behavior is what makes laminated glass the go-to choice for overhead glazing, hurricane zones, security applications, and anywhere falling glass shards would endanger people below.</p>
        </div>
      </div>

      {/* 3-column highlight cards */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h, i) => (
            <div key={h.label} className="bg-white rounded-xl p-6 text-center border border-brand-light"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (300 + i * 120) + "ms" }}>
              <span className="font-display text-3xl md:text-4xl font-bold text-brand-accent">{h.num}</span>
              <p className="text-sm font-medium text-brand-dark mt-1">{h.label}</p>
              <p className="text-xs text-brand-muted mt-1">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ LayerBuilder — INTERACTIVE interlayer selector (unique to laminated) ━━━
write("src/components/products/laminated/LayerBuilder.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

const interlayers = [
  { id: "pvb", name: "PVB Interlayer", color: "bg-blue-400/60", desc: "Standard safety interlayer. Excellent UV blocking (99%), good sound damping, flexible. The most common choice for architectural laminated glass.", best: "General safety glazing, skylights, facades, residential", thickness: "0.38mm, 0.76mm, 1.14mm, 1.52mm" },
  { id: "sgp", name: "SGP Interlayer", color: "bg-brand-accent/60", desc: "Structural interlayer. 5\u00D7 stiffer and 100\u00D7 more tear-resistant than PVB. The glass panel retains structural capacity even after breakage.", best: "Glass floors, balustrades, hurricane glazing, bullet-resistant", thickness: "0.89mm, 1.52mm, 2.28mm" },
];

export default function LayerBuilder() {
  const { ref, isInView } = useInView();
  const [selected, setSelected] = useState(0);
  const layer = interlayers[selected];

  return (
    <section id="layer-builder" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Choose Your Interlayer</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">The interlayer defines your laminated glass performance. Pick the right one for your project.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Detail panel (LEFT on desktop — reversed from tempered page) */}
          <div className="order-2 lg:order-1">
            <div className="bg-brand-lighter rounded-2xl p-6 md:p-8">
              <div key={selected} className="animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className={"w-4 h-4 rounded-sm " + layer.color} />
                  <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">{layer.name}</h3>
                </div>
                <p className="text-brand-muted leading-relaxed">{layer.desc}</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-brand-light">
                    <p className="text-xs text-brand-muted uppercase tracking-wider mb-1">Best for</p>
                    <p className="text-sm text-brand-dark font-medium">{layer.best}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-brand-light">
                    <p className="text-xs text-brand-muted uppercase tracking-wider mb-1">Available thickness</p>
                    <p className="text-sm text-brand-dark font-medium">{layer.thickness}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual selector (RIGHT on desktop) */}
          <div className="order-1 lg:order-2 flex flex-row lg:flex-col gap-3">
            {interlayers.map((il, i) => (
              <button key={il.id} onClick={() => setSelected(i)}
                className={"flex-1 lg:flex-none p-5 rounded-xl border-2 transition-all duration-300 text-center lg:text-left " +
                  (selected === i ? "border-brand-accent bg-brand-accent/5 shadow-md" : "border-brand-light bg-white hover:border-brand-secondary/30")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 100) + "ms" }}>
                {/* Layered glass mini visual */}
                <div className="flex justify-center lg:justify-start items-center gap-0.5 mb-3">
                  <div className="w-2.5 h-10 bg-brand-secondary/20 rounded-sm" />
                  <div className={"w-1.5 h-8 rounded-sm " + il.color} />
                  <div className="w-2.5 h-10 bg-brand-secondary/20 rounded-sm" />
                </div>
                <h4 className={"text-sm font-semibold " + (selected === i ? "text-brand-dark" : "text-brand-muted")}>{il.name}</h4>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ SoundReduction — HORIZONTAL noise meter (unique layout) ━━━━━━━━━━
write("src/components/products/laminated/SoundReduction.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";

const configs = [
  { label: "Single pane (6mm)", db: 28, desc: "Basic noise reduction" },
  { label: "Laminated (6.4mm PVB)", db: 35, desc: "Effective at speech frequencies" },
  { label: "Multi-layer laminated", db: 40, desc: "Significant urban noise reduction" },
  { label: "Laminated + insulated", db: 45, desc: "Maximum acoustic performance" },
];

export default function SoundReduction() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % configs.length), 3500);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(i: number) { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 8000); }

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: noise meter visualization */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <div className="bg-brand-dark rounded-2xl p-6 md:p-8">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-6">Sound reduction rating</p>

              {/* Big number */}
              <div className="text-center mb-6">
                <span className="font-display text-6xl md:text-7xl font-bold text-brand-accent tabular-nums">{configs[active].db}</span>
                <span className="font-display text-2xl text-brand-accent ml-1">dB</span>
                <p className="text-sm text-white/50 mt-2">{configs[active].desc}</p>
              </div>

              {/* Meter bars */}
              <div className="flex items-end justify-center gap-1 h-16">
                {Array.from({ length: 20 }).map((_, i) => {
                  const threshold = (configs[active].db / 50) * 20;
                  const isActive = i < threshold;
                  return (
                    <div key={i}
                      className={"w-2 rounded-t transition-all duration-300 " + (isActive ? (i < 10 ? "bg-green-400" : i < 15 ? "bg-brand-accent" : "bg-red-400") : "bg-white/10")}
                      style={{ height: (12 + i * 2.5) + "px", transitionDelay: i * 30 + "ms" }} />
                  );
                })}
              </div>
            </div>

            {/* Config selector */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {configs.map((c, i) => (
                <button key={c.label} onClick={() => select(i)}
                  className={"text-left p-3 rounded-lg border text-xs transition-all duration-200 " +
                    (active === i ? "border-brand-accent bg-brand-accent/5 text-brand-dark font-medium" : "border-brand-light bg-white text-brand-muted hover:border-brand-secondary/30")}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              Superior Sound Insulation
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>Laminated glass is one of the most effective glazing solutions for noise control. The PVB interlayer acts as a sound-dampening membrane, absorbing acoustic energy that would pass through ordinary glass.</p>
              <p>It is particularly effective in the <strong className="text-brand-dark font-medium">1,000\u20132,000Hz frequency range</strong> \u2014 the frequencies of speech, traffic noise, and common urban sounds that cause the most disturbance.</p>
              <p>For maximum acoustic performance, combine laminated glass with an insulated glass unit. The combination of interlayer damping + sealed air gap delivers the highest noise reduction available in architectural glazing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ SecurityTiers — VERTICAL level cards (unique layout) ━━━━━━━━━━━━
write("src/components/products/laminated/SecurityTiers.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const tiers = [
  { level: "Level 1", name: "Safety", config: "2-ply PVB (0.38mm)", protection: "Holds fragments on impact. Prevents fall-through.", use: "Skylights, overhead glazing, partitions", color: "border-l-green-500" },
  { level: "Level 2", name: "Security", config: "2-ply PVB (0.76\u20131.52mm)", protection: "Resists forced entry. Delays intruder by 60+ seconds.", use: "Storefronts, bank counters, ground-floor windows", color: "border-l-blue-500" },
  { level: "Level 3", name: "Hurricane", config: "Multi-ply SGP", protection: "Withstands windborne debris impact at hurricane speeds.", use: "Coastal buildings, storm-rated facades", color: "border-l-brand-accent" },
  { level: "Level 4", name: "Ballistic", config: "Multi-ply SGP (3+ layers)", protection: "Rated for specific ballistic threats. Tested per standards.", use: "Military, government buildings, VIP areas", color: "border-l-red-500" },
];

export default function SecurityTiers() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Security Levels</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Laminated glass can be configured from basic safety to ballistic protection. Choose the level your project requires.</p>
        </div>

        {/* Vertical tier cards with escalating left border */}
        <div className="space-y-4">
          {tiers.map((tier, i) => (
            <div key={tier.level}
              className={"bg-brand-lighter rounded-xl p-5 md:p-6 border-l-4 " + tier.color + " transition-all duration-300 hover:shadow-sm"}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 500ms", transitionDelay: (200 + i * 120) + "ms" }}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">{tier.level}</span>
                  <h3 className="font-display text-lg font-bold text-brand-dark">{tier.name}</h3>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5">Configuration</p>
                    <p className="text-brand-dark font-medium">{tier.config}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5">Protection</p>
                    <p className="text-brand-dark">{tier.protection}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5">Typical use</p>
                    <p className="text-brand-dark">{tier.use}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Not sure which security level you need? Describe your project and we will recommend." product="laminated" />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhySincereLam ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/laminated/WhySincereLam.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const advantages = [
  { stat: 15, suffix: "m", label: "Max autoclave length", desc: "Our high-pressure autoclave processes panels up to 3m \u00D7 15m \u2014 ideal for oversized skylights and feature walls that smaller manufacturers can\u2019t produce." },
  { stat: 2, suffix: "", label: "Autoclave units", desc: "Dual autoclaves mean we can run standard and oversized jobs simultaneously. No queue bottlenecks, consistent lead times even during peak season." },
  { stat: 25, suffix: "%", label: "Below trading company prices", desc: "We laminate in-house from raw materials. No outsourcing, no markup chain. You get manufacturer pricing on every panel." },
  { stat: 100, suffix: "%", label: "3C certified output", desc: "Full documentation for every batch: 3C certificates, test reports, compliance letters. Your project passes inspection first time." },
];

function Stat({ s, active, i }: { s: typeof advantages[0]; active: boolean; i: number }) {
  const count = useCountUp(s.stat, active);
  return (
    <div className="flex gap-5 items-start p-5 rounded-xl bg-brand-lighter border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300"
      style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(20px)", transition: "all 600ms", transitionDelay: (200 + i * 120) + "ms" }}>
      <div className="flex-shrink-0 w-16 text-right">
        <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
        <span className="font-display text-lg font-bold text-brand-accent">{s.suffix}</span>
      </div>
      <div>
        <h3 className="font-semibold text-brand-dark text-sm">{s.label}</h3>
        <p className="mt-1 text-xs text-brand-muted leading-relaxed">{s.desc}</p>
      </div>
    </div>
  );
}

export default function WhySincereLam() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Why Source Laminated Glass from Us?</h2>
        </div>
        {/* Single column stacked (different from 2-col grid in tempered/insulated) */}
        <div className="space-y-4">
          {advantages.map((s, i) => <Stat key={s.label} s={s} active={isInView} i={i} />)}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ LaminatedSpecs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/laminated/LaminatedSpecs.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Configuration", value: "2-layer, multi-layer, jumbo" },
  { label: "Interlayer Options", value: "PVB (standard), SGP (structural)" },
  { label: "UV Blocking", value: "> 99% ultraviolet radiation" },
  { label: "Sound Insulation", value: "1,000\u20132,000Hz effective range" },
  { label: "Max Panel Size", value: "3,000 \u00D7 15,000mm (autoclave)" },
  { label: "Standard", value: "GB 15763.3-2009" },
  { label: "Certification", value: "CCC (3C) Certified" },
];

export default function LaminatedSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>
        {/* Alternating row table (different from card grid) */}
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

// ━━━ LaminatedApps — HORIZONTAL scroll (different from grid) ━━━━━━━━━━
write("src/components/products/laminated/LaminatedApps.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const apps = [
  { name: "Overhead Glazing", desc: "Skylights, canopies, atriums \u2014 fragments stay bonded if broken", icon: "\u2600" },
  { name: "Hurricane Windows", desc: "Withstands windborne debris in coastal storm zones", icon: "\uD83C\uDF2A\uFE0F" },
  { name: "Security Glazing", desc: "Bank counters, jewelry stores, government buildings", icon: "\uD83D\uDD12" },
  { name: "Glass Floors", desc: "SGP interlayer maintains structural capacity after breakage", icon: "\uD83C\uDFDB\uFE0F" },
  { name: "Museum Cases", desc: "99% UV blocking protects artwork and artifacts", icon: "\uD83C\uDFE8" },
  { name: "Acoustic Barriers", desc: "Highways, airports, urban noise walls", icon: "\uD83D\uDD07" },
  { name: "Automotive", desc: "Windshields and sunroofs", icon: "\uD83D\uDE97" },
];

export default function LaminatedApps() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Applications</h2>
      </div>

      {/* Horizontal scroll (different from grid in tempered/insulated) */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 md:px-12 pb-4" style={{ minWidth: "max-content" }}>
          {apps.map((app, i) => (
            <div key={app.name}
              className="w-52 md:w-60 flex-shrink-0 bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (100 + i * 60) + "ms" }}>
              <span className="text-2xl">{app.icon}</span>
              <h3 className="mt-3 font-semibold text-brand-dark text-sm">{app.name}</h3>
              <p className="mt-1 text-xs text-brand-muted leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ LaminatedFAQ (reuse pattern) ━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/laminated/LaminatedFAQ.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

interface FAQItem { q: string; a: string; }

export default function LaminatedFAQ({ faqItems }: { faqItems: FAQItem[] }) {
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
console.log("\uD83C\uDF89 Laminated Glass premium page done! 11 files.");
console.log("");
console.log("Layout differences from Tempered & Insulated:");
console.log("  \u2022 Hero: CENTER-aligned (vs left-aligned) + layered glass visual");
console.log("  \u2022 Layer Builder: interactive PVB/SGP selector with reversed grid");
console.log("  \u2022 Sound Reduction: animated noise METER with dB bars (not a table)");
console.log("  \u2022 Security Tiers: VERTICAL escalating cards with colored left borders");
console.log("  \u2022 Why Us: single-column stacked (vs 2-col grid)");
console.log("  \u2022 Specs: alternating row table (vs card grid)");
console.log("  \u2022 Applications: HORIZONTAL scroll cards (vs static grid)");
console.log("");
console.log("Visit: http://localhost:3000/products/laminated-glass");
