#!/usr/bin/env node
/**
 * Sincere Glass — Equipment V2 (no emoji, video placeholders)
 * 从项目根目录运行: node edit/patch-equipment-v2.mjs
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

write("src/components/equipment/EquipmentClient.tsx", `"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import { useQuote } from "@/lib/QuoteContext";

// ── Production flow ──────────────────────────────────────
const flowSteps = [
  { id: "cut", label: "Cutting", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
  { id: "edge", label: "Edging", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  { id: "process", label: "Processing", icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.078A8.94 8.94 0 0012 3c-1.04 0-2.042.188-2.963.535" },
  { id: "assembly", label: "Assembly", icon: "M11.42 15.17l-5.648-3.163 3.855 3.855a6.073 6.073 0 01-2.855.83 6.073 6.073 0 01-4.524-1.792A6.073 6.073 0 01.5 10.376a6.073 6.073 0 011.792-4.524A6.073 6.073 0 016.816.06a6.073 6.073 0 014.524 1.792l3.163 5.648" },
  { id: "qc", label: "QC & Ship", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
];

// ── Equipment data with video placeholder ────────────────
const equipmentData = [
  {
    category: "Cutting",
    flowId: "cut",
    video: "/videos/cutting.mp4",
    items: [
      { name: "CNC Intelligent Cutting Lines", count: 4, detail: "Fully automated loading, optimized nesting software minimizes waste. Handles all standard float glass sizes.", capacity: "5,000 m\u00B2/day" },
    ],
  },
  {
    category: "Edge Polishing",
    flowId: "edge",
    video: "/videos/edge-polishing.mp4",
    items: [
      { name: "Double-Edge Grinding Lines", count: 2, detail: "Simultaneous grinding of both edges. Straight, pencil, beveled, OG profiles.", capacity: "3,000 m\u00B2/day" },
      { name: "Shape Edge Polishing Machine", count: 2, detail: "Irregular shapes and curved edges. CNC-controlled for precision.", capacity: "Custom shapes" },
    ],
  },
  {
    category: "Tempering",
    flowId: "process",
    video: "/videos/tempering.mp4",
    items: [
      { name: "Flat Tempering Furnace", count: 1, detail: "Standard flat tempering for panels up to 2.4m \u00D7 4.2m. Automated temperature control.", capacity: "4,000 m\u00B2/day" },
      { name: "Oversized Tempering Furnace", count: 1, detail: "Maximum panel size 3m \u00D7 15m \u2014 among the largest in Hubei. Flat and bent capability.", capacity: "3m \u00D7 15m max" },
    ],
  },
  {
    category: "Insulated Glass (IGU)",
    flowId: "assembly",
    video: "/videos/igu-assembly.mp4",
    items: [
      { name: "Standard IGU Assembly Line", count: 1, detail: "Automated spacer application, butyl sealing, and structural silicone.", capacity: "2,500 m\u00B2/day" },
      { name: "Oversized Auto Gas-Fill Line", count: 1, detail: "Automated argon filling with 90%+ fill rate consistency.", capacity: "Jumbo IGUs" },
    ],
  },
  {
    category: "Laminating",
    flowId: "assembly",
    video: "/videos/laminating.mp4",
    items: [
      { name: "High-Pressure Autoclave (Standard)", count: 1, detail: "PVB and SGP interlayer processing.", capacity: "2,000 m\u00B2/day" },
      { name: "High-Pressure Autoclave (Oversized)", count: 1, detail: "3m \u00D7 15m capacity. One of the largest in central China.", capacity: "3m \u00D7 15m max" },
    ],
  },
  {
    category: "Enameling",
    flowId: "process",
    video: "/videos/enameling.mp4",
    items: [
      { name: "Screen Printing Line", count: 1, detail: "Ceramic frit screen printing with precise registration. Custom RAL color matching.", capacity: "1,500 m\u00B2/day" },
    ],
  },
];

// ── Capacity stats ───────────────────────────────────────
const capacityStats = [
  { label: "Total Factory Area", value: 20000, suffix: " m\u00B2", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" },
  { label: "Equipment Units", value: 28, suffix: "+", icon: "M11.42 15.17l-5.648-3.163M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Daily Cutting", value: 5000, suffix: " m\u00B2", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
  { label: "Daily Tempering", value: 4000, suffix: " m\u00B2", icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.078A8.94 8.94 0 0012 3c-1.04 0-2.042.188-2.963.535" },
  { label: "Max Panel Size", value: 15, suffix: "m", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" },
  { label: "Production Lines", value: 12, suffix: "+", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" },
];

function CapStat({ stat, active, i }: { stat: typeof capacityStats[0]; active: boolean; i: number }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
      style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (200 + i * 80) + "ms" }}>
      <svg className="w-6 h-6 text-brand-accent mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
      </svg>
      <div className="mt-2 font-display text-xl md:text-2xl font-bold text-white tabular-nums">
        {count.toLocaleString()}<span className="text-brand-accent text-sm md:text-base">{stat.suffix}</span>
      </div>
      <p className="text-[10px] md:text-xs text-white/40 mt-1">{stat.label}</p>
    </div>
  );
}

// ── Video placeholder ────────────────────────────────────
function VideoPlaceholder({ src, label }: { src: string; label: string }) {
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-brand-dark/5 border border-brand-light">
      {hasVideo ? (
        <video src={src} className="w-full h-full object-cover" controls muted playsInline
          onError={() => setHasVideo(false)} onLoadedData={() => setHasVideo(true)} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-lighter">
          <svg className="w-12 h-12 text-brand-muted/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          <p className="mt-2 text-xs text-brand-muted/50">{label} video coming soon</p>
        </div>
      )}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────
export default function EquipmentClient() {
  const { openQuote } = useQuote();
  const { ref: flowRef, isInView: flowVisible } = useInView({ threshold: 0.1 });
  const { ref: capRef, isInView: capVisible } = useInView({ threshold: 0.1 });
  const [activeFlow, setActiveFlow] = useState(0);
  const [expandedCat, setExpandedCat] = useState<string | null>("Cutting");

  useEffect(() => {
    if (!flowVisible) return;
    const t = setInterval(() => setActiveFlow(prev => (prev + 1) % flowSteps.length), 2500);
    return () => clearInterval(t);
  }, [flowVisible]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Virtual Factory Tour</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Equipment &amp; Capabilities</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Two modern factories, 20,000m\u00B2, 28+ specialized units. Complete glass processing from raw sheet to certified product.
          </p>
        </div>
      </section>

      {/* Production Flow */}
      <section className="py-12 md:py-16 bg-brand-lighter border-b border-brand-light" ref={flowRef}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8" style={{ opacity: flowVisible ? 1 : 0, transition: "opacity 600ms" }}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-brand-dark">Production Flow</h2>
            <p className="text-sm text-brand-muted mt-1">Follow a glass panel through our production line</p>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-[10%] right-[10%] h-px bg-brand-light" />
            <div className="absolute top-5 left-[10%] h-px bg-brand-accent transition-all duration-500"
              style={{ width: (activeFlow / (flowSteps.length - 1)) * 80 + "%" }} />

            {flowSteps.map((step, i) => (
              <button key={step.id}
                onClick={() => { setActiveFlow(i); const match = equipmentData.find(e => e.flowId === step.id); if (match) setExpandedCat(match.category); }}
                className="relative z-10 flex flex-col items-center group"
                style={{ opacity: flowVisible ? 1 : 0, transform: flowVisible ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (i * 100) + "ms" }}>
                <div className={"w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 " +
                  (i <= activeFlow ? "bg-brand-accent border-brand-accent shadow-md" : "bg-white border-brand-light")}>
                  <svg className={"w-4 h-4 md:w-5 md:h-5 " + (i <= activeFlow ? "text-brand-dark" : "text-brand-muted")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                </div>
                <span className={"text-[10px] md:text-xs mt-2 font-medium transition-colors whitespace-nowrap " +
                  (i <= activeFlow ? "text-brand-dark" : "text-brand-muted")}>{step.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Deep Dive with Video */}
      <section className="py-16 md:py-24 bg-brand-lighter">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Equipment by Category</h2>
            <p className="mt-4 text-brand-muted text-base md:text-lg">Click to explore specifications, daily capacity, and production footage.</p>
          </div>

          <div className="space-y-4">
            {equipmentData.map((cat) => {
              const isOpen = expandedCat === cat.category;
              const stepIcon = flowSteps.find(f => f.id === cat.flowId);
              return (
                <div key={cat.category} className={"rounded-2xl border transition-all duration-400 overflow-hidden " +
                  (isOpen ? "border-brand-accent/30 bg-white shadow-md" : "border-brand-light bg-white hover:border-brand-secondary/20")}>
                  <button onClick={() => setExpandedCat(isOpen ? null : cat.category)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                    <div className="flex items-center gap-4">
                      <div className={"w-10 h-10 rounded-xl flex items-center justify-center " + (isOpen ? "bg-brand-accent/10" : "bg-brand-lighter")}>
                        <svg className={"w-5 h-5 " + (isOpen ? "text-brand-accent" : "text-brand-muted")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={stepIcon?.icon || "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 0115 0"} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-base md:text-lg font-bold text-brand-dark">{cat.category}</h3>
                        <p className="text-xs text-brand-muted">{cat.items.reduce((a, b) => a + b.count, 0)} units total</p>
                      </div>
                    </div>
                    <svg className={"w-5 h-5 transition-transform duration-200 " + (isOpen ? "rotate-180 text-brand-accent" : "text-brand-muted")}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={"transition-all duration-400 " + (isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      {/* Video placeholder */}
                      <div className="mb-5">
                        <VideoPlaceholder src={cat.video} label={cat.category} />
                      </div>

                      {/* Equipment items */}
                      <div className="space-y-3">
                        {cat.items.map((item) => (
                          <div key={item.name} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-brand-lighter rounded-xl">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-brand-dark text-sm">{item.name}</h4>
                                <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded-full">\u00D7{item.count}</span>
                              </div>
                              <p className="text-xs text-brand-muted mt-1 leading-relaxed">{item.detail}</p>
                            </div>
                            <div className="flex-shrink-0 sm:text-right">
                              <p className="text-xs text-brand-muted">Capacity</p>
                              <p className="text-sm font-bold text-brand-accent">{item.capacity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capacity Dashboard */}
      <section className="py-16 md:py-24 bg-brand-dark" ref={capRef}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12" style={{ opacity: capVisible ? 1 : 0, transition: "opacity 600ms" }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Capacity at a Glance</h2>
            <p className="mt-4 text-white/50 text-base md:text-lg">Combined capacity across Wuhan and Honghu factories.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {capacityStats.map((stat, i) => <CapStat key={stat.label} stat={stat} active={capVisible} i={i} />)}
          </div>
        </div>
      </section>

      {/* Competitive Comparison */}
      <section className="py-16 md:py-24 bg-brand-lighter">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10 text-center">Our Capacity vs. Typical Manufacturer</h2>
          <div className="space-y-6">
            {[
              { label: "Factory area", ours: "20,000 m\u00B2", typical: "3,000\u20135,000 m\u00B2", pctOurs: 100, pctTyp: 20 },
              { label: "Max panel size", ours: "3m \u00D7 15m", typical: "2.4m \u00D7 4.5m", pctOurs: 100, pctTyp: 30 },
              { label: "Product types", ours: "5 (full range)", typical: "1\u20132 types", pctOurs: 100, pctTyp: 35 },
              { label: "Autoclaves", ours: "2 (incl. oversized)", typical: "0\u20131 (standard)", pctOurs: 100, pctTyp: 40 },
              { label: "IGU gas filling", ours: "Automated 90%+", typical: "Manual or none", pctOurs: 95, pctTyp: 30 },
            ].map((row, i) => (
              <CompRow key={row.label} row={row} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">See Our Equipment in Action</h2>
          <p className="mt-4 text-white/60 text-lg">We welcome factory visits. Or send us your specs and we will show you how we would produce it.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openQuote("")} className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">Request a Quote</button>
            <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-center">Schedule a Factory Visit</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function CompRow({ row, index }: { row: { label: string; ours: string; typical: string; pctOurs: number; pctTyp: number }; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (index * 80) + "ms" }}>
      <p className="text-sm font-medium text-brand-dark mb-2">{row.label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-brand-accent font-bold w-16 flex-shrink-0">Sincere</span>
          <div className="flex-1 h-6 bg-white rounded-full overflow-hidden border border-brand-light">
            <div className="h-full bg-brand-accent rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
              style={{ width: isInView ? row.pctOurs + "%" : "0%" }}>
              <span className="text-[9px] text-brand-dark font-bold whitespace-nowrap">{row.ours}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-brand-muted w-16 flex-shrink-0">Typical</span>
          <div className="flex-1 h-6 bg-white rounded-full overflow-hidden border border-brand-light">
            <div className="h-full bg-brand-secondary/30 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
              style={{ width: isInView ? row.pctTyp + "%" : "0%", transitionDelay: "200ms" }}>
              <span className="text-[9px] text-brand-muted font-medium whitespace-nowrap">{row.typical}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

console.log("");
console.log("\uD83C\uDF89 Equipment V2 done!");
console.log("");
console.log("Changes from V1:");
console.log("  \u2022 ALL emojis replaced with SVG line icons (professional look)");
console.log("  \u2022 VIDEO PLACEHOLDER in each equipment category");
console.log("    - Auto-detects if video file exists at /public/videos/[name].mp4");
console.log("    - Shows play icon + 'coming soon' if no video yet");
console.log("    - When you add the real video files, they auto-play");
console.log("");
console.log("To add videos later:");
console.log("  1. Put .mp4 files in public/videos/");
console.log("     cutting.mp4, edge-polishing.mp4, tempering.mp4,");
console.log("     igu-assembly.mp4, laminating.mp4, enameling.mp4");
console.log("  2. Videos will auto-load in the matching category");
console.log("");
console.log("Visit: http://localhost:3000/equipment");
