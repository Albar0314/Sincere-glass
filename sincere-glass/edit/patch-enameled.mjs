#!/usr/bin/env node
/**
 * Sincere Glass — Premium Enameled Glass Page
 * 从项目根目录运行: node edit/patch-enameled.mjs
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
write("src/app/products/enameled-glass/page.tsx", `import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import EnamelHero from "@/components/products/enameled/EnamelHero";
import WhatIsEnamel from "@/components/products/enameled/WhatIsEnamel";
import ColorPalette from "@/components/products/enameled/ColorPalette";
import PatternGallery from "@/components/products/enameled/PatternGallery";
import EnamelProcess from "@/components/products/enameled/EnamelProcess";
import SolarControl from "@/components/products/enameled/SolarControl";
import WhySincereEnamel from "@/components/products/enameled/WhySincereEnamel";
import EnamelSpecs from "@/components/products/enameled/EnamelSpecs";
import EnamelApps from "@/components/products/enameled/EnamelApps";
import EnamelFAQ from "@/components/products/enameled/EnamelFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export const metadata: Metadata = {
  title: "Enameled Glass Manufacturer China \u2014 Custom Colors & Patterns | Sincere Glass",
  description: "Custom enameled (ceramic frit) glass from China. RAL/Pantone color matching, custom patterns, acid & abrasion resistant. Permanent color that never fades. 3C certified.",
  openGraph: {
    title: "Enameled Glass Manufacturer \u2014 Sincere Glass",
    description: "Decorative ceramic frit glass with permanent color. Custom designs, solar control, 3C certified.",
    url: "https://sincereglass.com/products/enameled-glass",
    images: [{ url: "https://sincereglass.com/images/products/enameled.jpg" }],
  },
};

const faqItems = [
  { q: "What is enameled glass?", a: "Enameled glass (also called ceramic frit glass) is made by screen-printing inorganic ceramic enamel onto glass, then fusing it permanently through tempering or heat-strengthening. The result is a decorative, durable surface that will never fade, peel, or delaminate." },
  { q: "Can I get a custom color?", a: "Yes. We offer full RAL and Pantone color matching. If your project requires a specific brand color or a color to match other building materials, we can formulate and test it before production. Custom color development typically adds 5\u20137 days to lead time." },
  { q: "Can enameled glass be cut after processing?", a: "No. Like tempered glass, enameled glass cannot be cut or modified after the enamel is fused. All dimensions, holes, and edge work must be finalized before production. Accurate measurements are essential when ordering." },
  { q: "Which side should the enamel face?", a: "The enameled surface should NOT face the exterior weather side. Best practice is to position it inside the sealed cavity of an insulated glass unit, or on the interior face of a laminated panel. This protects the enamel and maximizes durability." },
  { q: "Does enameled glass provide energy savings?", a: "Yes. The ceramic enamel layer absorbs and reflects a significant portion of solar radiation, providing measurable shading. Coverage patterns (dots, lines) can be designed to optimize the balance between light transmission and solar control." },
  { q: "What patterns are available?", a: "We offer standard patterns including dots (various sizes and spacing), horizontal/vertical lines, diagonal lines, gradients, and checkerboards. Custom patterns can also be produced with a new screen \u2014 this requires a screen-making fee and additional lead time." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org", "@type": "Product",
  name: "Enameled Glass", description: "Decorative ceramic frit glass with permanent color. Custom RAL/Pantone matching.",
  image: "https://sincereglass.com/images/products/enameled.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" }, manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "enameled-glass");

export default function EnamelGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        <EnamelHero />
        <WhatIsEnamel />
        <ColorPalette />
        <PatternGallery />
        <div className="py-10 bg-brand-dark"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Have a specific color or pattern in mind? Send us your design and we will match it." product="enameled" variant="dark" /></div></div>
        <EnamelProcess />
        <SolarControl />
        <WhySincereEnamel />
        <EnamelSpecs />
        <div className="bg-brand-lighter pb-8"><div className="max-w-5xl mx-auto px-6 md:px-12"><InlineQuoteCTA text="Ready to order? We respond with a detailed quote within 24 hours." product="enameled" /></div></div>
        <EnamelApps />
        <EnamelFAQ faqItems={faqItems} />
        <SocialProof />
        <section className="py-20 md:py-28 bg-brand-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Bring Your Design to Life in Glass</h2>
            <p className="mt-4 text-white/60 text-lg">Send us your color, pattern, and dimensions. We will produce a sample for your approval before full production.</p>
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

// ━━━ EnamelHero — SPLIT-SCREEN (image right, text left) ━━━
write("src/components/products/enameled/EnamelHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function EnamelHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[55vh] md:min-h-[60vh]">
          {/* Text — LEFT */}
          <div className="py-16 md:py-20">
            <div className="flex items-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
              <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
              <span>/</span><span className="text-white/70">Enameled Glass</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight"
              style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms 200ms" }}>
              Enameled Glass
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/70 max-w-lg leading-relaxed"
              style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms 350ms" }}>
              Permanent ceramic frit color that never fades, peels, or delaminates. Custom colors and patterns for any architectural vision.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
              {["Custom RAL/Pantone", "Acid Resistant", "3C Certified", "Solar Control"].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-white/10 border border-white/10 text-white/80 text-xs rounded-full">{tag}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms 600ms" }}>
              <button onClick={() => openQuote("enameled")} className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm">Get a Quote</button>
              <a href="#colors" className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm text-center">View Colors</a>
            </div>
          </div>

          {/* Image — RIGHT (visible on desktop) */}
          <div className="hidden lg:block relative h-full min-h-[400px]"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(30px)", transition: "all 800ms 300ms" }}>
            <Image src="/images/products/enameled.jpg" alt="Enameled glass samples" fill className="object-cover rounded-l-2xl" sizes="50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhatIsEnamel — with inline color swatches ━━━━━━━━━━
write("src/components/products/enameled/WhatIsEnamel.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIsEnamel() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 items-start">
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Enameled Glass?</h2>
            <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
              <p>Enameled glass \u2014 also called <strong className="text-brand-dark font-medium">ceramic frit glass</strong> \u2014 is produced by screen-printing inorganic ceramic enamel onto the glass surface, then permanently fusing it at tempering temperature (around 620\u00B0C).</p>
              <p>The result is a decorative surface that is <strong className="text-brand-dark font-medium">abrasion-resistant, acid-resistant, alkali-resistant</strong>, and will never fade, peel, or change color \u2014 even after decades of sun exposure. The enamel becomes part of the glass itself.</p>
              <p>Beyond aesthetics, the enamel layer absorbs and reflects solar energy, providing measurable <strong className="text-brand-dark font-medium">shading and energy savings</strong>. In curtain wall systems, enameled spandrel panels hide floor slabs and structural elements while contributing to the building\u2019s thermal performance.</p>
            </div>
          </div>
          {/* Decorative color strip (RIGHT on desktop) */}
          <div className="hidden md:flex flex-col gap-2 pt-16" style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms 400ms" }}>
            {["#D94040","#E88C30","#DAA745","#4CAF50","#2196F3","#3F51B5","#1C1F26","#F5F5F5"].map((c, i) => (
              <div key={c} className="h-6 rounded-md shadow-sm transition-all duration-300 hover:scale-x-110 origin-left" style={{ backgroundColor: c, transitionDelay: (i * 60) + "ms" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ ColorPalette — INTERACTIVE color grid (unique to enameled) ━━━
write("src/components/products/enameled/ColorPalette.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";
import { useQuote } from "@/lib/QuoteContext";

const colors = [
  { name: "Signal Red", hex: "#D94040", ral: "RAL 3001" },
  { name: "Pure Orange", hex: "#E88C30", ral: "RAL 2004" },
  { name: "Golden Yellow", hex: "#DAA745", ral: "RAL 1004" },
  { name: "Grass Green", hex: "#4CAF50", ral: "RAL 6010" },
  { name: "Light Blue", hex: "#64B5F6", ral: "RAL 5012" },
  { name: "Signal Blue", hex: "#2196F3", ral: "RAL 5005" },
  { name: "Ultramarine", hex: "#3F51B5", ral: "RAL 5002" },
  { name: "Jet Black", hex: "#1C1F26", ral: "RAL 9005" },
  { name: "Anthracite", hex: "#4A4E54", ral: "RAL 7016" },
  { name: "Silver Grey", hex: "#8B95A5", ral: "RAL 7001" },
  { name: "Traffic White", hex: "#F5F5F5", ral: "RAL 9016" },
  { name: "Cream", hex: "#F5E6C8", ral: "RAL 9001" },
  { name: "Pastel Turquoise", hex: "#7ECDC0", ral: "RAL 6034" },
  { name: "Salmon Pink", hex: "#E8978C", ral: "RAL 3022" },
  { name: "Olive Green", hex: "#6B7F3E", ral: "RAL 6003" },
  { name: "Wine Red", hex: "#8C2A3C", ral: "RAL 3005" },
];

export default function ColorPalette() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selected, setSelected] = useState<number | null>(null);
  const { openQuote } = useQuote();

  return (
    <section id="colors" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Standard Color Palette</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Choose from our ready-to-produce colors, or send us any RAL / Pantone code for custom matching.</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 md:gap-3">
          {colors.map((c, i) => (
            <button key={c.hex} onClick={() => setSelected(selected === i ? null : i)}
              className={"aspect-square rounded-xl transition-all duration-300 border-2 " +
                (selected === i ? "border-brand-dark scale-110 shadow-lg z-10" : "border-transparent hover:scale-105 hover:shadow-md")}
              style={{ backgroundColor: c.hex, opacity: isInView ? 1 : 0, transform: isInView ? "scale(1)" : "scale(0.8)", transition: "all 0.4s ease-out", transitionDelay: (i * 30) + "ms" }}
              title={c.name + " (" + c.ral + ")"} />
          ))}
        </div>

        {/* Selected color detail */}
        {selected !== null && (
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-5 bg-brand-lighter rounded-xl border border-brand-light animate-fade-up">
            <div className="w-16 h-16 rounded-xl shadow-md flex-shrink-0" style={{ backgroundColor: colors[selected].hex }} />
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-semibold text-brand-dark">{colors[selected].name}</h3>
              <p className="text-sm text-brand-muted">{colors[selected].ral} \u2022 {colors[selected].hex}</p>
            </div>
            <button onClick={() => openQuote("enameled")} className="px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm flex-shrink-0">
              Quote This Color
            </button>
          </div>
        )}

        <p className="mt-6 text-xs text-brand-muted">Custom colors available with RAL or Pantone code. Custom formulation adds 5\u20137 days to lead time.</p>
      </div>
    </section>
  );
}
`);

// ━━━ PatternGallery — visual pattern grid (unique to enameled) ━━━
write("src/components/products/enameled/PatternGallery.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const patterns = [
  { name: "Small dots", svg: "M5 5h2v2H5zM13 5h2v2h-2zM5 13h2v2H5zM13 13h2v2h-2zM9 9h2v2H9z", desc: "Most popular for spandrel panels" },
  { name: "Large dots", svg: "M4 4h4v4H4zM12 4h4v4h-4zM4 12h4v4H4zM12 12h4v4h-4z", desc: "Higher opacity coverage" },
  { name: "Horizontal lines", svg: "M0 4h20M0 8h20M0 12h20M0 16h20", type: "line", desc: "Clean linear aesthetic" },
  { name: "Vertical lines", svg: "M4 0v20M8 0v20M12 0v20M16 0v20", type: "line", desc: "Emphasizes height" },
  { name: "Diagonal", svg: "M0 0L20 20M5 0L20 15M0 5L15 20", type: "line", desc: "Dynamic visual movement" },
  { name: "Gradient dots", svg: "M3 3h1v1H3zM7 3h1.5v1.5H7zM12 3h2v2h-2zM3 8h1v1H3zM7 8h1.5v1.5H7zM12 8h2v2h-2z", desc: "Fading transparency effect" },
  { name: "Checkerboard", svg: "M0 0h5v5H0zM5 5h5v5H5zM10 0h5v5h-5zM0 10h5v5H0zM10 10h5v5h-5z", desc: "Bold geometric statement" },
  { name: "Custom design", svg: "M10 2L18 18H2L10 2z", desc: "Your logo, brand, or artwork" },
];

export default function PatternGallery() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Screen-Print Patterns</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Standard patterns available from stock screens. Custom patterns require a new screen (additional cost and lead time).</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {patterns.map((p, i) => (
            <div key={p.name} className="bg-white rounded-xl p-4 border border-brand-light hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (150 + i * 60) + "ms" }}>
              <div className="aspect-square rounded-lg bg-brand-lighter border border-brand-light flex items-center justify-center mb-3 overflow-hidden">
                <svg viewBox="0 0 20 20" className="w-full h-full p-2 text-brand-primary/30 group-hover:text-brand-accent/50 transition-colors">
                  {p.type === "line"
                    ? <g stroke="currentColor" strokeWidth="0.8" fill="none"><path d={p.svg} /></g>
                    : <path d={p.svg} fill="currentColor" />
                  }
                </svg>
              </div>
              <h3 className="font-semibold text-brand-dark text-xs">{p.name}</h3>
              <p className="text-[10px] text-brand-muted mt-0.5">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ EnamelProcess — HORIZONTAL timeline (unique layout) ━━━
write("src/components/products/enameled/EnamelProcess.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const steps = [
  { num: "1", title: "Glass cutting", desc: "Cut to final size \u2014 cannot be modified after enameling" },
  { num: "2", title: "Screen printing", desc: "Ceramic enamel applied through a silk screen in the chosen pattern" },
  { num: "3", title: "Drying", desc: "Printed glass is dried to remove solvents from the enamel" },
  { num: "4", title: "Tempering / Heat-strengthening", desc: "Heated to ~620\u00B0C, permanently fusing enamel to glass" },
  { num: "5", title: "Quality inspection", desc: "Color accuracy, coverage uniformity, and strength testing" },
];

export default function EnamelProcess() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">How Enameled Glass Is Made</h2>
        </div>

        {/* Horizontal timeline on desktop, vertical on mobile */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-brand-light" />

          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center text-center flex-1 relative"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (200 + i * 120) + "ms" }}>
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 border-2 border-brand-accent text-brand-accent font-bold text-sm flex items-center justify-center relative z-10 bg-white">
                {s.num}
              </div>
              <h3 className="mt-3 font-semibold text-brand-dark text-sm px-2">{s.title}</h3>
              <p className="mt-1 text-xs text-brand-muted px-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-4 items-start"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-12px)", transition: "all 500ms", transitionDelay: (200 + i * 80) + "ms" }}>
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 border-2 border-brand-accent text-brand-accent font-bold text-xs flex items-center justify-center flex-shrink-0">{s.num}</div>
              <div>
                <h3 className="font-semibold text-brand-dark text-sm">{s.title}</h3>
                <p className="text-xs text-brand-muted mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ SolarControl — animated sun/glass diagram (unique) ━━━
write("src/components/products/enameled/SolarControl.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function SolarControl() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* SVG sun diagram — LEFT */}
          <div className="flex justify-center" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "scale(1)" : "scale(0.9)", transition: "all 700ms" }}>
            <svg viewBox="0 0 280 220" className="w-full max-w-[280px]" aria-label="Solar control diagram">
              {/* Sun */}
              <circle cx="60" cy="40" r="22" fill="#DAA745" opacity="0.8">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Sun rays */}
              {[0,45,90,135,180,225,270,315].map((angle, i) => (
                <line key={i} x1={60 + 28 * Math.cos(angle * Math.PI/180)} y1={40 + 28 * Math.sin(angle * Math.PI/180)}
                  x2={60 + 38 * Math.cos(angle * Math.PI/180)} y2={40 + 38 * Math.sin(angle * Math.PI/180)}
                  stroke="#DAA745" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin={(i * 0.25) + "s"} repeatCount="indefinite" />
                </line>
              ))}

              {/* Incoming rays */}
              <line x1="80" y1="55" x2="170" y2="110" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
              <line x1="75" y1="60" x2="170" y2="130" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
              <line x1="70" y1="65" x2="170" y2="150" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

              {/* Glass pane */}
              <rect x="170" y="80" width="12" height="120" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1" />
              {/* Enamel dots on glass */}
              {[90,105,120,135,150,165,180].map((y, i) => (
                <circle key={i} cx="176" cy={y} r="3" fill="#DAA745" opacity="0.5" />
              ))}

              {/* Reflected rays (bouncing back) */}
              <line x1="170" y1="115" x2="120" y2="90" stroke="#DAA745" strokeWidth="0.8" opacity="0.4" />
              <line x1="170" y1="135" x2="130" y2="160" stroke="#DAA745" strokeWidth="0.8" opacity="0.4" />
              <text x="110" y="80" className="text-[9px] fill-brand-accent" opacity="0.7">Reflected</text>

              {/* Transmitted (reduced) */}
              <line x1="182" y1="120" x2="240" y2="120" stroke="#8B95A5" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 3" />
              <text x="200" y="112" className="text-[9px] fill-white" opacity="0.4">Reduced</text>
              <text x="200" y="124" className="text-[9px] fill-white" opacity="0.4">transmission</text>

              {/* Labels */}
              <text x="45" y="85" className="text-[9px] fill-brand-accent">Solar</text>
              <text x="45" y="96" className="text-[9px] fill-brand-accent">radiation</text>
              <text x="190" y="210" className="text-[9px] fill-white" opacity="0.5">Enameled glass</text>
            </svg>
          </div>

          {/* Text — RIGHT */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">Built-In Solar Control</h2>
            <div className="mt-5 space-y-4 text-white/60 leading-relaxed">
              <p>The ceramic enamel layer does more than decorate \u2014 it absorbs and reflects a significant portion of incoming solar radiation, reducing heat gain inside the building.</p>
              <p>By adjusting the <span className="text-brand-accent font-medium">coverage pattern</span> (dot size, spacing, gradient density), architects can fine-tune the balance between natural light transmission and solar shading.</p>
              <p>Combined with Low-E coating on an insulated glass unit, enameled glass delivers both <span className="text-brand-accent font-medium">aesthetic impact and measurable energy savings</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ WhySincereEnamel — HORIZONTAL cards (unique layout) ━━━
write("src/components/products/enameled/WhySincereEnamel.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  { icon: "\uD83C\uDFA8", title: "Any Color You Need", desc: "Full RAL and Pantone matching. We formulate and test custom colors before production. Your brand, your building, your exact shade." },
  { icon: "\u2699\uFE0F", title: "Integrated Production", desc: "Cutting, screen printing, tempering, and quality testing all happen under one roof. No outsourcing delays, no quality handoff risks." },
  { icon: "\uD83D\uDCCF", title: "Oversized Panels", desc: "Our enameling and tempering lines handle panels up to 3m \u00D7 15m \u2014 reducing joints and creating cleaner facades on large projects." },
  { icon: "\uD83D\uDCC4", title: "Full Certification", desc: "3C certified with complete test reports. The enamel meets GB 15763.2-2005 for safety glass \u2014 your project passes inspection first time." },
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
          <InlineQuoteCTA text="Send us your color code and design \u2014 we will produce a sample for approval." product="enameled" />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ EnamelSpecs — ACCORDION style (unique) ━━━━━━━━━━━━━
write("src/components/products/enameled/EnamelSpecs.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Colors", value: "Custom RAL / Pantone color matching", detail: "Standard palette of 16 colors in stock. Custom formulation available with 5\u20137 day additional lead time. Color samples provided for approval before production." },
  { label: "Patterns", value: "Dots, lines, gradients, custom designs", detail: "Standard screen patterns: round dots (various sizes/spacing), horizontal lines, vertical lines, diagonal lines, gradients, checkerboard. Custom screens available (screen-making fee applies)." },
  { label: "Durability", value: "Will not fade, peel, or delaminate", detail: "Inorganic ceramic enamel is fused to the glass at tempering temperature. It becomes part of the glass surface \u2014 immune to UV degradation, weather, and aging." },
  { label: "Resistance", value: "Acid, alkali, and abrasion resistant", detail: "The fused ceramic surface withstands chemical cleaning agents, environmental pollutants, and physical abrasion without damage." },
  { label: "Solar Control", value: "Absorbs & reflects partial solar energy", detail: "Coverage density determines shading coefficient. Higher dot density = more solar rejection. Can be combined with Low-E for maximum performance." },
  { label: "Standard", value: "GB 15763.2-2005", detail: "Compliant with Safety Glass for Buildings standard. All output 3C (CCC) certified with full test documentation." },
];

export default function EnamelSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>

        <div className="space-y-2">
          {specs.map((s, i) => {
            const isOpen = openIdx === i;
            return (
              <button key={s.label} onClick={() => setOpenIdx(isOpen ? null : i)}
                className={"w-full text-left rounded-xl border transition-all duration-300 " +
                  (isOpen ? "border-brand-accent/30 bg-brand-lighter shadow-sm" : "border-brand-light bg-brand-lighter hover:border-brand-secondary/20")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (100 + i * 50) + "ms" }}>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-brand-accent font-medium hidden sm:block">{s.value}</span>
                    <svg className={"w-4 h-4 transition-transform duration-200 " + (isOpen ? "rotate-180 text-brand-accent" : "text-brand-muted")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className={"overflow-hidden transition-all duration-300 " + (isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-brand-accent font-medium mb-1 sm:hidden">{s.value}</p>
                    <p className="text-sm text-brand-muted leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ EnamelApps — MASONRY-style staggered grid (unique) ━━━
write("src/components/products/enameled/EnamelApps.tsx", `"use client";
import { useInView } from "@/lib/useInView";

const apps = [
  { name: "Curtain Wall Spandrels", desc: "Hide floor slabs and structure behind decorative panels", tall: true },
  { name: "Building Facades", desc: "Create bold exterior statements with permanent color" },
  { name: "Interior Partitions", desc: "Privacy and design in offices and retail" },
  { name: "Decorative Columns", desc: "Wrap structural elements in color" },
  { name: "Signage & Branding", desc: "Logos and brand colors fused permanently into glass", tall: true },
  { name: "Privacy Screens", desc: "Gradient patterns for controlled transparency" },
  { name: "Canopies", desc: "Colored overhead glazing with solar control" },
  { name: "Feature Walls", desc: "Statement pieces in lobbies and atriums" },
];

export default function EnamelApps() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Applications
        </h2>

        {/* Masonry-style staggered grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {apps.map((app, i) => (
            <div key={app.name}
              className={"bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300 break-inside-avoid " +
                (app.tall ? "pb-10" : "")}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (100 + i * 60) + "ms" }}>
              <h3 className="font-semibold text-brand-dark text-sm">{app.name}</h3>
              <p className="mt-1 text-xs text-brand-muted leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ EnamelFAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/enameled/EnamelFAQ.tsx", `"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

interface FAQItem { q: string; a: string; }

export default function EnamelFAQ({ faqItems }: { faqItems: FAQItem[] }) {
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
console.log("\uD83C\uDF89 Enameled Glass premium page done! 12 files.");
console.log("");
console.log("Layout differences from ALL other product pages:");
console.log("  \u2022 Hero: SPLIT-SCREEN (text left + image right)");
console.log("  \u2022 WhatIs: side color strip decoration");
console.log("  \u2022 Color Palette: INTERACTIVE 4x4 color grid with detail popup");
console.log("  \u2022 Pattern Gallery: 2x4 SVG pattern preview cards");
console.log("  \u2022 Process: HORIZONTAL numbered timeline (desktop)");
console.log("  \u2022 Solar Control: ANIMATED SVG sun/glass diagram with rays");
console.log("  \u2022 Why Us: HORIZONTAL scroll emoji cards");
console.log("  \u2022 Specs: ACCORDION with expandable details");
console.log("  \u2022 Applications: CSS COLUMNS masonry layout");
console.log("");
console.log("Visit: http://localhost:3000/products/enameled-glass");
