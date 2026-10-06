#!/usr/bin/env node
/**
 * Sincere Glass — Tempered V3
 * Bug fixes + mobile + new conversion modules
 * 从项目根目录运行: node edit/patch-tempered-v3.mjs
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

// ━━━ 1. globals.css — add fadeUp + fadeSlide animations ━━━
write("src/app/globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-brand-dark antialiased;
  }
  .wp-content h2 { @apply text-2xl font-semibold mt-8 mb-4; }
  .wp-content h3 { @apply text-xl font-semibold mt-6 mb-3; }
  .wp-content p { @apply mb-4 leading-relaxed; }
  .wp-content ul { @apply list-disc pl-6 mb-4; }
  .wp-content ol { @apply list-decimal pl-6 mb-4; }
  .wp-content img { @apply max-w-full h-auto rounded-lg my-6; }
  .wp-content a { @apply text-brand-accent underline hover:no-underline; }
  .wp-content table { @apply w-full border-collapse mb-6; }
  .wp-content th, .wp-content td { @apply border border-gray-200 px-4 py-2 text-left; }
  .wp-content th { @apply bg-brand-light font-semibold; }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-up { animation: fadeUp 0.5s ease-out both; }
.animate-fade-in { animation: fadeIn 0.5s ease-out both; }
.animate-scale-in { animation: scaleIn 0.4s ease-out both; }
`);

// ━━━ 2. BreakageComparison — fix unicode + animation ━━━━
write("src/components/products/tempered/BreakageComparison.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export default function BreakageComparison() {
  const { ref, isInView } = useInView();
  const [showTempered, setShowTempered] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setShowTempered(prev => !prev), 5000);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(val: boolean) {
    setShowTempered(val);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why &quot;Safety Glass&quot; Matters
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            See the difference in breakage pattern \u2014 it\u2019s why building codes require tempered glass.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => select(true)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (showTempered ? "bg-brand-accent text-brand-dark" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            Tempered Glass
          </button>
          <button onClick={() => select(false)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (!showTempered ? "bg-red-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            Ordinary Glass
          </button>
        </div>

        {/* Fixed height container */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl h-[320px] md:h-[340px] overflow-hidden">
          {/* Tempered view */}
          <div className={"absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 " + (showTempered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none")}>
            <div className="grid grid-cols-8 gap-1 sm:gap-1.5 max-w-[240px] sm:max-w-xs mb-6">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-sm bg-brand-accent/40 animate-scale-in" style={{ animationDelay: (i * 12) + "ms" }} />
              ))}
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold text-white">Small, blunt granules</h3>
            <p className="mt-2 text-white/50 text-xs sm:text-sm max-w-md text-center">
              Shatters into hundreds of small, harmless pieces. No sharp edges. Minimal injury risk.
            </p>
          </div>

          {/* Ordinary view */}
          <div className={"absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 " + (!showTempered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none")}>
            <div className="relative h-36 md:h-40 w-56 md:w-64 flex items-center justify-center mb-6">
              {[
                { w: 90, h: 60, r: -15, x: -22, y: -12 },
                { w: 70, h: 45, r: 25, x: 30, y: 8 },
                { w: 55, h: 75, r: -5, x: -45, y: 22 },
                { w: 80, h: 30, r: 45, x: 55, y: -22 },
                { w: 40, h: 65, r: -35, x: 6, y: 35 },
                { w: 65, h: 22, r: 60, x: -60, y: -35 },
              ].map((s, i) => (
                <div key={i} className="absolute bg-red-500/25 border border-red-500/50 animate-fade-in"
                  style={{
                    width: s.w + "px", height: s.h + "px",
                    transform: "translate(" + s.x + "px," + s.y + "px) rotate(" + s.r + "deg)",
                    clipPath: "polygon(8% 0%, 100% 4%, 88% 100%, 0% 92%)",
                    animationDelay: (i * 80) + "ms",
                  }} />
              ))}
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold text-white">Large, dangerous shards</h3>
            <p className="mt-2 text-white/50 text-xs sm:text-sm max-w-md text-center">
              Breaks into large, jagged shards with razor-sharp edges. Serious laceration risk.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Need safety glass for your project? Our tempered glass is 3C certified." product="tempered" variant="dark" />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 3. ManufacturingProcess — fix mobile ━━━━━━━━━━━━━━━
write("src/components/products/tempered/ManufacturingProcess.tsx", `"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";

const steps = [
  { num: "01", title: "Cutting & Fabrication", desc: "Glass is cut to final dimensions, edges polished, and any holes drilled. All fabrication must be completed before tempering \u2014 tempered glass cannot be modified afterwards.", temp: "Room temp", color: "bg-brand-secondary/10 text-brand-secondary" },
  { num: "02", title: "Washing & Inspection", desc: "Cut pieces are thoroughly washed to remove contaminants. Each piece is inspected for chips, scratches, or inclusions before entering the furnace.", temp: "Room temp", color: "bg-brand-secondary/10 text-brand-secondary" },
  { num: "03", title: "Heating", desc: "Glass enters a tempering furnace and is uniformly heated to approximately 620\u00B0C \u2014 just below its softening point. Temperature variation must stay within \u00B15\u00B0C to prevent optical distortion.", temp: "~620\u00B0C", color: "bg-red-500/10 text-red-600" },
  { num: "04", title: "Quenching", desc: "High-pressure air jets rapidly cool both surfaces simultaneously. The surface solidifies first while the interior is still hot, creating the compressive-tensile stress balance that defines tempered glass.", temp: "Rapid cool", color: "bg-blue-500/10 text-blue-600" },
  { num: "05", title: "Quality Control", desc: "Every panel undergoes fragmentation testing, stress measurement, and visual inspection. We verify compliance with GB 15763.2-2005 before any product ships.", temp: "Room temp", color: "bg-green-500/10 text-green-600" },
];

export default function ManufacturingProcess() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActiveStep(prev => (prev + 1) % steps.length), 4000);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function selectStep(i: number) {
    setActiveStep(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }

  return (
    <section id="how-its-made" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10 md:mb-14" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">How Tempered Glass Is Made</h2>
          <p className="mt-4 text-brand-muted text-lg">Five precision-controlled stages from raw sheet to certified safety glass.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 md:gap-8"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

          {/* Steps — horizontal scroll on mobile, vertical on desktop */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
            {steps.map((step, i) => (
              <button key={step.num} onClick={() => selectStep(i)}
                className={"flex-shrink-0 min-w-[140px] lg:min-w-0 text-left p-3 lg:p-4 rounded-xl border transition-all duration-300 " +
                  (activeStep === i ? "bg-brand-dark border-brand-dark shadow-lg" : "bg-white border-brand-light hover:border-brand-secondary/30")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 80) + "ms" }}>
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className={"text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap " + (activeStep === i ? "bg-brand-accent/20 text-brand-accent" : step.color)}>{step.num}</span>
                  <span className={"text-xs lg:text-sm font-medium whitespace-nowrap " + (activeStep === i ? "text-white" : "text-brand-dark")}>{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="bg-brand-lighter rounded-2xl p-6 md:p-10 min-h-[200px] md:min-h-[260px] flex flex-col justify-center">
            <div key={activeStep} className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={"text-xs md:text-sm font-bold px-3 py-1 rounded-full " + steps[activeStep].color}>Step {steps[activeStep].num}</span>
                <span className={"text-xs px-2.5 py-0.5 rounded-full " + steps[activeStep].color}>{steps[activeStep].temp}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">{steps[activeStep].title}</h3>
              <p className="mt-3 md:mt-4 text-brand-muted leading-relaxed text-base md:text-lg">{steps[activeStep].desc}</p>
            </div>
          </div>
        </div>

        {/* Progress dots (mobile) / bar (desktop) */}
        <div className="mt-6 md:mt-10 flex items-center gap-1.5 md:gap-1">
          {steps.map((_, i) => (
            <button key={i} onClick={() => selectStep(i)}
              className={"h-1.5 md:h-1.5 rounded-full transition-all duration-300 cursor-pointer " +
                (i === activeStep ? "bg-brand-accent flex-[2]" : i < activeStep ? "bg-brand-accent/50 flex-1" : "bg-brand-light flex-1")} />
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 4. GlassComparison — mobile responsive table ━━━━━━━
write("src/components/products/tempered/GlassComparison.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const rows = [
  { property: "Strength", tempered: "4-5\u00D7 annealed", laminated: "2\u00D7 annealed", annealed: "1\u00D7 (baseline)" },
  { property: "Breakage", tempered: "Blunt granules", laminated: "Cracks, stays in frame", annealed: "Sharp shards" },
  { property: "Post-Break", tempered: "Falls out", laminated: "Holds together", annealed: "Falls as shards" },
  { property: "Thermal", tempered: "250\u00B0C diff.", laminated: "70\u00B0C diff.", annealed: "80\u00B0C diff." },
  { property: "UV Block", tempered: "Minimal", laminated: "> 99%", annealed: "Minimal" },
  { property: "Sound", tempered: "Standard", laminated: "Superior", annealed: "Standard" },
  { property: "Cut After?", tempered: "No", laminated: "No", annealed: "Yes" },
  { property: "Cost", tempered: "Medium", laminated: "Higher", annealed: "Lowest" },
  { property: "Best For", tempered: "Doors, facades", laminated: "Skylights, security", annealed: "Interior (non-safety)" },
];

export default function GlassComparison() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Tempered vs. Laminated vs. Annealed
          </h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">
            Choosing the right glass depends on your project. Here is how they compare.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-muted border-b border-brand-light w-[140px]">Property</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brand-accent border-b-2 border-brand-accent bg-brand-accent/5">Tempered</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-dark border-b border-brand-light">Laminated</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-dark border-b border-brand-light">Annealed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-brand-lighter"}
                  style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (200 + i * 50) + "ms" }}>
                  <td className="py-3 px-4 text-sm font-medium text-brand-dark">{row.property}</td>
                  <td className="py-3 px-4 text-sm text-brand-dark bg-brand-accent/5 font-medium">{row.tempered}</td>
                  <td className="py-3 px-4 text-sm text-brand-muted">{row.laminated}</td>
                  <td className="py-3 px-4 text-sm text-brand-muted">{row.annealed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-3">
          {rows.map((row, i) => (
            <div key={row.property} className="bg-white rounded-xl p-4 border border-brand-light"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (100 + i * 40) + "ms" }}>
              <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">{row.property}</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-brand-accent/5 rounded-lg p-2 border border-brand-accent/20">
                  <p className="text-[10px] text-brand-accent font-bold mb-0.5">Tempered</p>
                  <p className="text-brand-dark font-medium">{row.tempered}</p>
                </div>
                <div className="bg-brand-lighter rounded-lg p-2">
                  <p className="text-[10px] text-brand-muted font-bold mb-0.5">Laminated</p>
                  <p className="text-brand-muted">{row.laminated}</p>
                </div>
                <div className="bg-brand-lighter rounded-lg p-2">
                  <p className="text-[10px] text-brand-muted font-bold mb-0.5">Annealed</p>
                  <p className="text-brand-muted">{row.annealed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Not sure which glass type you need? Tell us your project and we will recommend." product="" />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 5. StressDiagram (NEW — SVG cross-section) ━━━━━━━━━
write("src/components/products/tempered/StressDiagram.tsx", `"use client";
import { useInView } from "@/lib/useInView";

export default function StressDiagram() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* SVG Diagram */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <svg viewBox="0 0 300 260" className="w-full max-w-[300px] mx-auto" aria-label="Tempered glass stress distribution cross-section">
              {/* Glass cross-section */}
              <rect x="50" y="40" width="200" height="160" rx="4" fill="#3A4250" opacity="0.1" stroke="#3A4250" strokeWidth="1"/>

              {/* Compression zones (top and bottom) */}
              <rect x="50" y="40" width="200" height="35" rx="4" fill="#DAA745" opacity="0.25"/>
              <rect x="50" y="165" width="200" height="35" rx="4" fill="#DAA745" opacity="0.25"/>

              {/* Tension zone (center) */}
              <rect x="50" y="85" width="200" height="70" fill="#8B95A5" opacity="0.15"/>

              {/* Arrows — compression (inward) */}
              <line x1="30" y1="57" x2="48" y2="57" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>
              <line x1="270" y1="57" x2="252" y2="57" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>
              <line x1="30" y1="183" x2="48" y2="183" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>
              <line x1="270" y1="183" x2="252" y2="183" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>

              {/* Arrows — tension (outward) */}
              <line x1="148" y1="120" x2="130" y2="120" stroke="#8B95A5" strokeWidth="1.5" markerEnd="url(#arrowT)"/>
              <line x1="152" y1="120" x2="170" y2="120" stroke="#8B95A5" strokeWidth="1.5" markerEnd="url(#arrowT)"/>

              {/* Labels */}
              <text x="150" y="62" textAnchor="middle" className="fill-brand-accent text-[11px] font-medium">Compressive stress</text>
              <text x="150" y="124" textAnchor="middle" className="fill-brand-muted text-[10px]">Tensile stress</text>
              <text x="150" y="190" textAnchor="middle" className="fill-brand-accent text-[11px] font-medium">Compressive stress</text>

              {/* Dimension labels */}
              <text x="150" y="230" textAnchor="middle" className="fill-brand-muted text-[10px]">Glass cross-section</text>
              <text x="150" y="245" textAnchor="middle" className="fill-brand-muted text-[9px]">3.8mm \u2013 19mm thickness</text>

              {/* Arrow markers */}
              <defs>
                <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 2L8 5L2 8" fill="none" stroke="#DAA745" strokeWidth="1.5" strokeLinecap="round"/>
                </marker>
                <marker id="arrowT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 2L8 5L2 8" fill="none" stroke="#8B95A5" strokeWidth="1.5" strokeLinecap="round"/>
                </marker>
              </defs>
            </svg>
          </div>

          {/* Explanation */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">The Science Behind the Strength</h3>
            <div className="mt-4 space-y-3 text-sm text-brand-muted leading-relaxed">
              <p>
                Rapid quenching creates <span className="text-brand-accent font-medium">compressive stress</span> on
                both surfaces of the glass, while the core retains <span className="text-brand-secondary font-medium">tensile stress</span>.
              </p>
              <p>
                These opposing forces are perfectly balanced. Any external impact must first overcome the compressive
                layer before the glass can break \u2014 which is why tempered glass withstands 4-5\u00D7 more force than
                untreated glass.
              </p>
              <p>
                When that threshold is exceeded, the stored energy releases all at once \u2014 shattering the entire
                panel into small, blunt granules instead of a few lethal shards. This is by design: it is the safest
                possible failure mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 6. RequestSample (NEW — low-friction CTA) ━━━━━━━━━━
write("src/components/products/tempered/RequestSample.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useQuote } from "@/lib/QuoteContext";

export default function RequestSample() {
  const { ref, isInView } = useInView();
  const { openQuote } = useQuote();

  return (
    <section className="py-14 md:py-20 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 700ms" }}>

          {/* Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">Request a Free Sample</h3>
            <p className="mt-2 text-white/50 text-sm md:text-base leading-relaxed">
              Need to show your client or architect? We ship tempered glass samples at no cost \u2014 choose your
              thickness and see the quality before you commit to a full order.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 flex-shrink-0">
            <button onClick={() => openQuote("tempered")}
              className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm whitespace-nowrap">
              Request Sample
            </button>
            <p className="text-white/30 text-xs text-center">Free shipping \u2022 No commitment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 7. SocialProof (NEW — trust near CTA) ━━━━━━━━━━━━━━
write("src/components/products/tempered/SocialProof.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const stats = [
  { value: 2600, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: " yrs", label: "Industry experience" },
  { value: 1500, suffix: "+", label: "Clients served" },
  { value: 100, suffix: "%", label: "3C certified" },
];

const projects = [
  "Wuhan Station", "Tianhe Airport T3", "Haier International Plaza",
  "Poly Military Games Village", "Optics Valley World City",
];

export default function SocialProof() {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="bg-brand-dark/50 border-y border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms" }}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} isActive={isInView} index={i} />
            ))}
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-xs text-white/30 mb-1">Featured projects</p>
            <p className="text-xs text-white/50">{projects.join(" \u2022 ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, suffix, label, isActive, index }: {
  value: number; suffix: string; label: string; isActive: boolean; index: number;
}) {
  const count = useCountUp(value, isActive);
  return (
    <div className="text-center" style={{ transitionDelay: (index * 100) + "ms" }}>
      <span className="font-display text-xl md:text-2xl font-bold text-white tabular-nums">
        {count.toLocaleString()}<span className="text-brand-accent">{suffix}</span>
      </span>
      <p className="text-[10px] md:text-xs text-white/40 mt-0.5">{label}</p>
    </div>
  );
}
`);

// ━━━ 8. Updated page.tsx — restructured flow ━━━━━━━━━━━━
write("src/app/products/tempered-glass/page.tsx", `import { Metadata } from "next";
import TemperedHero from "@/components/products/tempered/TemperedHero";
import WhatIs from "@/components/products/tempered/WhatIs";
import StressDiagram from "@/components/products/tempered/StressDiagram";
import RequestSample from "@/components/products/tempered/RequestSample";
import ManufacturingProcess from "@/components/products/tempered/ManufacturingProcess";
import BreakageComparison from "@/components/products/tempered/BreakageComparison";
import TemperedAdvantages from "@/components/products/tempered/TemperedAdvantages";
import WhySincere from "@/components/products/tempered/WhySincere";
import TemperedSpecs from "@/components/products/tempered/TemperedSpecs";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import GlassComparison from "@/components/products/tempered/GlassComparison";
import TemperedApplications from "@/components/products/tempered/TemperedApplications";
import TemperedFAQ from "@/components/products/tempered/TemperedFAQ";
import SocialProof from "@/components/products/tempered/SocialProof";
import TemperedCTA from "@/components/products/tempered/TemperedCTA";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tempered Glass Manufacturer China \u2014 Custom Sizes up to 3m\u00D715m | Sincere Glass",
  description: "Custom tempered glass from China. 3.8-19mm, panels up to 3m\u00D715m, 3C certified. 4-5\u00D7 stronger than annealed glass. Factory-direct pricing, 7-15 day lead time.",
  openGraph: {
    title: "Tempered Glass Manufacturer \u2014 Sincere Glass",
    description: "Custom architectural tempered glass. Flat & bent, 3.8-19mm, max 3m\u00D715m. 3C certified, factory direct.",
    url: "https://sincereglass.com/products/tempered-glass",
    images: [{ url: "https://sincereglass.com/images/products/tempered.jpg" }],
  },
};

const faqItems = [
  { q: "What is the difference between tempered glass and normal glass?", a: "Tempered glass is 4-5 times stronger than standard annealed glass. It is made by heating float glass to near its softening point (around 620\u00B0C) and then rapidly cooling it. When broken, it shatters into small, blunt granules instead of dangerous sharp shards." },
  { q: "Can tempered glass be cut after tempering?", a: "No. Once glass is tempered, it cannot be cut, drilled, or edge-worked. All fabrication must be completed before the tempering process. This is why precise measurements are critical when ordering." },
  { q: "What thickness of tempered glass do you manufacture?", a: "We manufacture tempered glass from 3.8mm to 19mm. Common architectural thicknesses are 6mm, 8mm, 10mm, and 12mm. Our furnaces handle panels up to 3m wide and 15m long." },
  { q: "Is your tempered glass certified?", a: "Yes, all our tempered glass carries China\u2019s 3C (CCC) certification and complies with GB 15763.2-2005. We provide full test reports and compliance documentation." },
  { q: "What is the lead time for tempered glass orders?", a: "Standard orders: 7-15 business days. Oversized or special processing: 15-25 business days. Contact us with your specs for an accurate timeline." },
  { q: "Can tempered glass be used for structural applications?", a: "Yes \u2014 curtain walls, glass doors, skylights, balustrades, and canopies. For post-breakage integrity, we recommend laminated tempered glass." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tempered Glass",
  description: "Custom architectural tempered glass, 3.8-19mm, panels up to 3m\u00D715m. 3C certified.",
  image: "https://sincereglass.com/images/products/tempered.jpg",
  brand: { "@type": "Brand", name: "Sincere Glass" },
  manufacturer: { "@id": "https://sincereglass.com/#organization" },
};

const otherProducts = products.filter(p => p.slug !== "tempered-glass");

export default function TemperedGlassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main>
        {/* 1. Hero — first impression + CTA */}
        <TemperedHero />

        {/* 2. What is — educational hook */}
        <WhatIs />

        {/* 3. Stress diagram — visual science (NEW) */}
        <StressDiagram />

        {/* 4. Request sample — low-friction CTA (NEW, breaks up education) */}
        <RequestSample />

        {/* 5. Manufacturing — interactive process (auto-rotate) */}
        <ManufacturingProcess />

        {/* 6. Breakage — visual wow (auto-switch) */}
        <BreakageComparison />

        {/* 7. Advantages — numbers that matter */}
        <TemperedAdvantages />

        {/* 8. Why Sincere — competitive differentiators */}
        <WhySincere />

        {/* 9. Specs */}
        <TemperedSpecs />
        <div className="bg-brand-lighter pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Have your dimensions ready? Get a precise quote within 24 hours." product="tempered" />
          </div>
        </div>

        {/* 10. Glass comparison table */}
        <GlassComparison />

        {/* 11. Applications */}
        <TemperedApplications />

        {/* 12. FAQ */}
        <TemperedFAQ faqItems={faqItems} />

        {/* 13. Social proof bar (NEW) */}
        <SocialProof />

        {/* 14. Final CTA */}
        <TemperedCTA />

        {/* 15. Related products */}
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

// ━━━ 9. TemperedHero — fix unicode ━━━━━━━━━━━━━━━━━━━━━━
write("src/components/products/tempered/TemperedHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function TemperedHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/tempered.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/70">Tempered Glass</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms ease-out 200ms" }}>
          Tempered Glass
        </h1>

        <p className="mt-4 md:mt-5 text-base md:text-xl text-white/70 max-w-2xl leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms ease-out 350ms" }}>
          4\u20135\u00D7 stronger than standard glass. Safe fragmentation. Panels up to 3m \u00D7 15m. 3C certified.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["3.8\u201319mm", "Flat & Bent", "3C Certified", "Max 3m\u00D715m"].map(tag => (
            <span key={tag} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs md:text-sm rounded-full">{tag}</span>
          ))}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <button onClick={() => openQuote("tempered")} className="px-6 md:px-7 py-3 md:py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm md:text-base">
            Get a Quote
          </button>
          <a href="#how-its-made" className="px-6 md:px-7 py-3 md:py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm md:text-base text-center">
            How It\u2019s Made
          </a>
        </div>
      </div>
    </section>
  );
}
`);

console.log("");
console.log("\uD83C\uDF89 Tempered Glass V3 \u5B8C\u6210\uFF01\u5171 9 \u4E2A\u6587\u4EF6\u3002");
console.log("");
console.log("Bug fixes:");
console.log("  \u2022 fadeUp/scaleIn animations added to globals.css");
console.log("  \u2022 Unicode escapes fixed (no more \\u2014 showing as text)");
console.log("  \u2022 BreakageComparison fixed height + smooth slide transitions");
console.log("");
console.log("Mobile:");
console.log("  \u2022 ManufacturingProcess: horizontal scroll on mobile, vertical on desktop");
console.log("  \u2022 GlassComparison: card layout on mobile, table on desktop");
console.log("  \u2022 All sections responsive padding/font sizes");
console.log("");
console.log("New modules:");
console.log("  \u2022 StressDiagram: SVG cross-section showing compressive/tensile stress");
console.log("  \u2022 RequestSample: low-friction CTA (free sample, no commitment)");
console.log("  \u2022 SocialProof: stats bar near final CTA (2600+ projects, 15 yrs...)");
console.log("");
console.log("Restructured flow:");
console.log("  Hero \u2192 WhatIs \u2192 StressDiagram \u2192 \u26A1RequestSample\u26A1 \u2192 Manufacturing");
console.log("  \u2192 Breakage \u2192 Advantages \u2192 WhySincere \u2192 Specs+CTA \u2192 Comparison");
console.log("  \u2192 Applications \u2192 FAQ \u2192 SocialProof \u2192 FinalCTA \u2192 Related");
console.log("");
console.log("\u8BBF\u95EE: http://localhost:3000/products/tempered-glass");
