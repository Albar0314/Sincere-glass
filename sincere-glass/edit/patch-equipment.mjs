#!/usr/bin/env node
/**
 * Sincere Glass — Equipment Page (Virtual Factory Tour)
 * 从项目根目录运行: node edit/patch-equipment.mjs
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

// ━━━ Equipment page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/equipment/page.tsx", `import { Metadata } from "next";
import EquipmentClient from "@/components/equipment/EquipmentClient";

export const metadata: Metadata = {
  title: "Factory Equipment & Capabilities \u2014 Virtual Tour | Sincere Glass",
  description: "Tour our two factories: 4 CNC cutting lines, 4 edge polishing lines, 2 tempering furnaces (3m\u00D715m), 2 insulated glass lines, 2 autoclaves. See our production capabilities.",
  openGraph: {
    title: "Equipment & Production Capabilities | Sincere Glass",
    description: "Complete glass processing equipment across 20,000\u33A1. CNC cutting, edge polishing, tempering, IGU assembly, laminating, enameling.",
    url: "https://sincereglass.com/equipment",
  },
};

export default function EquipmentPage() {
  return <EquipmentClient />;
}
`);

// ━━━ EquipmentClient ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/equipment/EquipmentClient.tsx", `"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import { useQuote } from "@/lib/QuoteContext";

// ── Production flow steps ────────────────────────────────
const flowSteps = [
  { id: "raw", label: "Raw Glass", icon: "\uD83D\uDFE6", color: "bg-blue-400" },
  { id: "cut", label: "Cutting", icon: "\u2702\uFE0F", color: "bg-brand-secondary" },
  { id: "edge", label: "Edging", icon: "\u2B50", color: "bg-purple-400" },
  { id: "process", label: "Processing", icon: "\uD83D\uDD25", color: "bg-red-400" },
  { id: "assembly", label: "Assembly", icon: "\uD83D\uDD27", color: "bg-brand-accent" },
  { id: "qc", label: "QC & Pack", icon: "\u2705", color: "bg-green-500" },
];

// ── Equipment data ───────────────────────────────────────
const equipmentData = [
  {
    category: "Cutting",
    flowId: "cut",
    items: [
      { name: "CNC Intelligent Cutting Lines", count: 4, detail: "Fully automated loading, optimized nesting software minimizes waste. Handles all standard float glass sizes.", capacity: "5,000 m\u00B2/day" },
    ],
  },
  {
    category: "Edge Polishing",
    flowId: "edge",
    items: [
      { name: "Double-Edge Grinding Lines", count: 2, detail: "Simultaneous grinding of both edges. Straight, pencil, beveled, OG profiles.", capacity: "3,000 m\u00B2/day" },
      { name: "Shape Edge Polishing Machine", count: 2, detail: "Irregular shapes and curved edges. CNC-controlled for precision.", capacity: "Custom shapes" },
    ],
  },
  {
    category: "Tempering",
    flowId: "process",
    items: [
      { name: "Flat Tempering Furnace", count: 1, detail: "Standard flat tempering for panels up to 2.4m \u00D7 4.2m. Consistent quality with automated temperature control.", capacity: "4,000 m\u00B2/day" },
      { name: "Oversized Tempering Furnace", count: 1, detail: "Maximum panel size 3m \u00D7 15m \u2014 among the largest in Hubei. Flat and bent tempering capability.", capacity: "3m \u00D7 15m max" },
    ],
  },
  {
    category: "Insulated Glass (IGU)",
    flowId: "assembly",
    items: [
      { name: "Standard IGU Assembly Line", count: 1, detail: "Automated spacer application, butyl sealing, and structural silicone. Double-seal for long-term performance.", capacity: "2,500 m\u00B2/day" },
      { name: "Oversized Auto Gas-Fill Line", count: 1, detail: "Automated argon gas filling with 90%+ fill rate consistency. Handles oversized units.", capacity: "Jumbo IGUs" },
    ],
  },
  {
    category: "Laminating",
    flowId: "assembly",
    items: [
      { name: "High-Pressure Autoclave (Standard)", count: 1, detail: "Standard-size laminated glass production. PVB and SGP interlayer processing.", capacity: "2,000 m\u00B2/day" },
      { name: "High-Pressure Autoclave (Oversized)", count: 1, detail: "3m \u00D7 15m capacity. One of the largest laminating autoclaves in central China.", capacity: "3m \u00D7 15m max" },
    ],
  },
  {
    category: "Enameling",
    flowId: "process",
    items: [
      { name: "Screen Printing Line", count: 1, detail: "Ceramic frit screen printing with precise registration. Custom patterns and RAL color matching.", capacity: "1,500 m\u00B2/day" },
    ],
  },
];

// ── Capacity stats ───────────────────────────────────────
const capacityStats = [
  { label: "Total Factory Area", value: 20000, suffix: " m\u00B2", icon: "\uD83C\uDFED" },
  { label: "Equipment Units", value: 28, suffix: "+", icon: "\u2699\uFE0F" },
  { label: "Daily Cutting Capacity", value: 5000, suffix: " m\u00B2", icon: "\u2702\uFE0F" },
  { label: "Daily Tempering Capacity", value: 4000, suffix: " m\u00B2", icon: "\uD83D\uDD25" },
  { label: "Max Panel Size", value: 15, suffix: "m length", icon: "\uD83D\uDCCF" },
  { label: "Production Lines", value: 12, suffix: "+", icon: "\uD83D\uDEE4\uFE0F" },
];

// ── Stat counter component ───────────────────────────────
function CapStat({ stat, active, i }: { stat: typeof capacityStats[0]; active: boolean; i: number }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
      style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (200 + i * 80) + "ms" }}>
      <span className="text-2xl">{stat.icon}</span>
      <div className="mt-2 font-display text-xl md:text-2xl font-bold text-white tabular-nums">
        {count.toLocaleString()}<span className="text-brand-accent text-base">{stat.suffix}</span>
      </div>
      <p className="text-[10px] md:text-xs text-white/40 mt-1">{stat.label}</p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────
export default function EquipmentClient() {
  const { openQuote } = useQuote();
  const { ref: heroRef, isInView: heroVisible } = useInView({ threshold: 0.1 });
  const { ref: flowRef, isInView: flowVisible } = useInView({ threshold: 0.1 });
  const { ref: capRef, isInView: capVisible } = useInView({ threshold: 0.1 });
  const [activeFlow, setActiveFlow] = useState(0);
  const [expandedCat, setExpandedCat] = useState<string | null>("Cutting");

  // Auto-advance flow
  useEffect(() => {
    if (!flowVisible) return;
    const t = setInterval(() => setActiveFlow(prev => (prev + 1) % flowSteps.length), 2500);
    return () => clearInterval(t);
  }, [flowVisible]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Virtual Factory Tour</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Equipment &amp; Capabilities
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Two modern factories, 20,000m\u00B2, 28+ equipment units. From raw glass sheet to finished, certified product \u2014 all under one roof.
          </p>
        </div>
      </section>

      {/* ── Production Flow Animation ── */}
      <section className="py-14 md:py-20 bg-brand-primary/10 border-y border-brand-light" ref={flowRef}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8" style={{ opacity: flowVisible ? 1 : 0, transition: "opacity 600ms" }}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-brand-dark">Production Flow</h2>
            <p className="text-sm text-brand-muted mt-1">Follow a glass panel through our production line</p>
          </div>

          {/* Flow pipeline */}
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-[8%] right-[8%] h-0.5 bg-brand-light -translate-y-1/2" />
            <div className="absolute top-1/2 left-[8%] h-0.5 bg-brand-accent -translate-y-1/2 transition-all duration-500"
              style={{ width: (activeFlow / (flowSteps.length - 1)) * 84 + "%" }} />

            {flowSteps.map((step, i) => (
              <button key={step.id}
                onClick={() => { setActiveFlow(i); setExpandedCat(equipmentData.find(e => e.flowId === step.id)?.category || null); }}
                className="relative z-10 flex flex-col items-center group"
                style={{ opacity: flowVisible ? 1 : 0, transform: flowVisible ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (i * 100) + "ms" }}>
                <div className={"w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl transition-all duration-300 border-2 " +
                  (i <= activeFlow ? "bg-brand-accent border-brand-accent scale-110 shadow-md" : "bg-white border-brand-light")}>
                  {step.icon}
                </div>
                <span className={"text-[10px] md:text-xs mt-2 font-medium transition-colors whitespace-nowrap " +
                  (i <= activeFlow ? "text-brand-dark" : "text-brand-muted")}>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Moving glass indicator */}
          <div className="mt-6 text-center">
            <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-medium rounded-full border border-brand-accent/20">
              \u25B6 Stage {activeFlow + 1}: {flowSteps[activeFlow].label}
            </span>
          </div>
        </div>
      </section>

      {/* ── Equipment Deep Dive ── */}
      <section className="py-16 md:py-24 bg-brand-lighter">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Equipment by Category</h2>
            <p className="mt-4 text-brand-muted text-base md:text-lg">Click a category to explore specifications and daily capacity.</p>
          </div>

          <div className="space-y-4">
            {equipmentData.map((cat, ci) => {
              const isOpen = expandedCat === cat.category;
              return (
                <div key={cat.category} className={"rounded-2xl border transition-all duration-400 overflow-hidden " +
                  (isOpen ? "border-brand-accent/30 bg-white shadow-md" : "border-brand-light bg-white hover:border-brand-secondary/20")}>
                  <button onClick={() => setExpandedCat(isOpen ? null : cat.category)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                    <div className="flex items-center gap-4">
                      <div className={"w-10 h-10 rounded-xl flex items-center justify-center text-lg " +
                        (isOpen ? "bg-brand-accent/10" : "bg-brand-lighter")}>
                        {flowSteps.find(f => f.id === cat.flowId)?.icon || "\u2699\uFE0F"}
                      </div>
                      <div>
                        <h3 className="font-display text-base md:text-lg font-bold text-brand-dark">{cat.category}</h3>
                        <p className="text-xs text-brand-muted">{cat.items.length} {cat.items.length === 1 ? "unit" : "units"} \u2022 {cat.items.reduce((a, b) => a + b.count, 0)} total</p>
                      </div>
                    </div>
                    <svg className={"w-5 h-5 transition-transform duration-200 " + (isOpen ? "rotate-180 text-brand-accent" : "text-brand-muted")}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={"transition-all duration-400 " + (isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-brand-lighter rounded-xl">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-brand-dark text-sm">{item.name}</h4>
                              <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded-full">\u00D7{item.count}</span>
                            </div>
                            <p className="text-xs text-brand-muted mt-1 leading-relaxed">{item.detail}</p>
                          </div>
                          <div className="flex-shrink-0 text-right sm:text-right">
                            <p className="text-xs text-brand-muted">Capacity</p>
                            <p className="text-sm font-bold text-brand-accent">{item.capacity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Capacity Dashboard ── */}
      <section className="py-16 md:py-24 bg-brand-dark" ref={capRef}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12" style={{ opacity: capVisible ? 1 : 0, transition: "opacity 600ms" }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Capacity at a Glance</h2>
            <p className="mt-4 text-white/50 text-base md:text-lg">Combined capacity across our Wuhan and Honghu factories.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {capacityStats.map((stat, i) => (
              <CapStat key={stat.label} stat={stat} active={capVisible} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Factory Comparison ── */}
      <section className="py-16 md:py-24 bg-brand-lighter">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10 text-center">Our Capacity vs. Typical Manufacturer</h2>

          <div className="space-y-6">
            {[
              { label: "Factory area", ours: "20,000 m\u00B2", typical: "3,000\u20135,000 m\u00B2", pctOurs: 100, pctTyp: 20 },
              { label: "Tempering max size", ours: "3m \u00D7 15m", typical: "2.4m \u00D7 4.5m", pctOurs: 100, pctTyp: 30 },
              { label: "Product types in-house", ours: "5 (full range)", typical: "1\u20132 types", pctOurs: 100, pctTyp: 35 },
              { label: "Autoclaves", ours: "2 (incl. oversized)", typical: "0\u20131 (standard)", pctOurs: 100, pctTyp: 40 },
              { label: "IGU gas filling", ours: "Automated 90%+", typical: "Manual or none", pctOurs: 95, pctTyp: 30 },
            ].map((row, i) => {
              const { ref, isInView } = useInView({ threshold: 0.3 });
              return (
                <div key={row.label} ref={ref} style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (i * 80) + "ms" }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-brand-dark">{row.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-brand-accent font-bold w-20 flex-shrink-0">Sincere</span>
                      <div className="flex-1 h-5 bg-white rounded-full overflow-hidden border border-brand-light">
                        <div className="h-full bg-brand-accent rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                          style={{ width: isInView ? row.pctOurs + "%" : "0%" }}>
                          <span className="text-[9px] text-brand-dark font-bold whitespace-nowrap">{row.ours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-brand-muted w-20 flex-shrink-0">Typical</span>
                      <div className="flex-1 h-5 bg-white rounded-full overflow-hidden border border-brand-light">
                        <div className="h-full bg-brand-secondary/30 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                          style={{ width: isInView ? row.pctTyp + "%" : "0%", transitionDelay: "200ms" }}>
                          <span className="text-[9px] text-brand-muted font-medium whitespace-nowrap">{row.typical}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">See Our Equipment in Action</h2>
          <p className="mt-4 text-white/60 text-lg">We welcome factory visits. Or send us your project specs and we will show you exactly how we would produce it.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openQuote("")} className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">Request a Quote</button>
            <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Schedule a Visit</a>
          </div>
        </div>
      </section>
    </main>
  );
}
`);

console.log("");
console.log("\uD83C\uDF89 Equipment page done! 2 files.");
console.log("");
console.log("Creative features:");
console.log("  \u2022 PRODUCTION FLOW ANIMATION \u2014 6-stage pipeline with auto-advancing");
console.log("    glass indicator (Raw \u2192 Cutting \u2192 Edging \u2192 Processing \u2192 Assembly \u2192 QC)");
console.log("    Click any stage to jump there + expand matching equipment category");
console.log("");
console.log("  \u2022 EQUIPMENT DEEP DIVE \u2014 Accordion by category, each item shows:");
console.log("    name, count badge (\u00D74), description, daily capacity");
console.log("");
console.log("  \u2022 CAPACITY DASHBOARD \u2014 6 animated stat cards with emoji icons");
console.log("    (20,000m\u00B2, 28+ units, 5,000m\u00B2/day cutting, 4,000m\u00B2/day tempering...)");
console.log("");
console.log("  \u2022 COMPETITIVE COMPARISON BARS \u2014 'Our Capacity vs Typical Manufacturer'");
console.log("    Side-by-side animated bars: factory area, max panel size, product range,");
console.log("    autoclaves, gas filling automation. Makes the advantage visceral.");
console.log("");
console.log("Visit: http://localhost:3000/equipment");
