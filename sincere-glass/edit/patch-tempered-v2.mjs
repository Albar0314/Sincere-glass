#!/usr/bin/env node
/**
 * Sincere Glass — Tempered Glass V2 Conversion Upgrade
 * 从项目根目录运行: node edit/patch-tempered-v2.mjs
 * 
 * 改动:
 * 1. QuoteModal — 全局询盘弹窗组件，所有CTA按钮触发
 * 2. QuoteContext — React Context 管理弹窗状态
 * 3. ManufacturingProcess — 自动轮播 + hover暂停
 * 4. BreakageComparison — 自动切换 + 固定高度
 * 5. WhySincere — 新增竞争差异化模块
 * 6. TemperedHero — CTA改为弹窗触发
 * 7. TemperedCTA — CTA改为弹窗触发
 * 8. page.tsx — 插入WhySincere + 各section穿插inline CTA
 * 9. layout.tsx — 引入QuoteContext + QuoteModal
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

// ━━━ 1. QuoteContext ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/lib/QuoteContext.tsx", `"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteCtx {
  isOpen: boolean;
  openQuote: (product?: string) => void;
  closeQuote: () => void;
  preselectedProduct: string;
}

const Ctx = createContext<QuoteCtx>({
  isOpen: false,
  openQuote: () => {},
  closeQuote: () => {},
  preselectedProduct: "",
});

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preselectedProduct, setProduct] = useState("");

  function openQuote(product?: string) {
    if (product) setProduct(product);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeQuote() {
    setOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <Ctx.Provider value={{ isOpen, openQuote, closeQuote, preselectedProduct }}>
      {children}
    </Ctx.Provider>
  );
}

export function useQuote() {
  return useContext(Ctx);
}
`);

// ━━━ 2. QuoteModal ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/QuoteModal.tsx", `"use client";
import { useState, FormEvent, useEffect } from "react";
import { useQuote } from "@/lib/QuoteContext";

export default function QuoteModal() {
  const { isOpen, closeQuote, preselectedProduct } = useQuote();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeQuote();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeQuote]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      className={"fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 " +
        (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeQuote} />

      {/* Modal */}
      <div
        className={"relative bg-brand-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg mx-4 transition-all duration-300 " +
          (isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4")}
      >
        {/* Close button */}
        <button onClick={closeQuote} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Quote request sent!</h3>
              <p className="mt-2 text-white/50 text-sm">Our team will respond within 24 hours.</p>
              <button onClick={closeQuote} className="mt-6 px-6 py-2 bg-brand-accent text-brand-dark font-semibold rounded-md text-sm">
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold text-white">Get a free quote</h2>
              <p className="mt-1 text-sm text-white/50">Fill in your requirements — we respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Full Name *</label>
                    <input type="text" required className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Email *</label>
                    <input type="email" required className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Phone / WhatsApp</label>
                    <input type="tel" className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30" placeholder="+country code" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Glass Type</label>
                    <select defaultValue={preselectedProduct} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white/70 focus:outline-none focus:border-brand-accent/50">
                      <option value="">Select type</option>
                      <option value="tempered">Tempered Glass</option>
                      <option value="insulated">Insulated Glass</option>
                      <option value="laminated">Laminated Glass</option>
                      <option value="enameled">Enameled Glass</option>
                      <option value="low-e">Low-E Glass</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Project Details</label>
                  <textarea rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 resize-none" placeholder="Dimensions, quantity, application, timeline..." />
                </div>
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold rounded-md transition-colors text-sm">
                  {loading ? "Sending..." : "Submit Quote Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
`);

// ━━━ 3. Updated layout.tsx (with QuoteProvider + QuoteModal) ━━━
write("src/app/layout.tsx", `import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import QuoteModal from "@/components/QuoteModal";
import { QuoteProvider } from "@/lib/QuoteContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "Sincere Glass | Architectural Glass Manufacturer in China", template: "%s | Sincere Glass" },
  description: "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000\\u33A1, 3C certified.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable + " " + spaceGrotesk.variable}>
      <body className="font-sans text-brand-dark antialiased flex flex-col min-h-screen">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <QuoteModal />
        </QuoteProvider>
      </body>
    </html>
  );
}
`);

// ━━━ 4. Inline CTA component (reusable) ━━━━━━━━━━━━━━━━━
write("src/components/products/InlineQuoteCTA.tsx", `"use client";
import { useQuote } from "@/lib/QuoteContext";

export default function InlineQuoteCTA({
  text = "Get a quote for this product",
  product = "",
  variant = "default",
}: {
  text?: string;
  product?: string;
  variant?: "default" | "dark" | "compact";
}) {
  const { openQuote } = useQuote();

  if (variant === "compact") {
    return (
      <button
        onClick={() => openQuote(product)}
        className="text-sm font-medium text-brand-accent hover:text-brand-accent-hover transition-colors inline-flex items-center gap-1"
      >
        {text}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  const bg = variant === "dark"
    ? "bg-white/5 border-white/10 hover:border-white/20"
    : "bg-brand-accent/5 border-brand-accent/15 hover:border-brand-accent/30";
  const textColor = variant === "dark" ? "text-white/80" : "text-brand-dark";
  const btnBg = "bg-brand-accent hover:bg-brand-accent-hover text-brand-dark";

  return (
    <div className={"flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border transition-all " + bg}>
      <p className={"text-sm font-medium " + textColor}>{text}</p>
      <button
        onClick={() => openQuote(product)}
        className={"flex-shrink-0 px-5 py-2 font-semibold text-sm rounded-md transition-colors " + btnBg}
      >
        Request Quote
      </button>
    </div>
  );
}
`);

// ━━━ 5. ManufacturingProcess V2 (auto-rotate) ━━━━━━━━━━━
write("src/components/products/tempered/ManufacturingProcess.tsx", `"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";

const steps = [
  { num: "01", title: "Cutting & Fabrication", desc: "Glass is cut to final dimensions, edges polished, and any holes drilled. All fabrication must be completed before tempering — tempered glass cannot be modified afterwards.", temp: "Room temp", color: "bg-brand-secondary/10 text-brand-secondary" },
  { num: "02", title: "Washing & Inspection", desc: "Cut pieces are thoroughly washed to remove contaminants that could cause optical defects. Each piece is inspected for chips, scratches, or inclusions before entering the furnace.", temp: "Room temp", color: "bg-brand-secondary/10 text-brand-secondary" },
  { num: "03", title: "Heating", desc: "Glass enters a tempering furnace and is uniformly heated to approximately 620\\u00B0C \\u2014 just below its softening point. Even heating is critical: temperature variation across the panel must stay within \\u00B15\\u00B0C to prevent optical distortion.", temp: "~620\\u00B0C", color: "bg-red-500/10 text-red-600" },
  { num: "04", title: "Quenching", desc: "The heated glass moves to the quench section where high-pressure air jets rapidly cool both surfaces simultaneously. The surface solidifies first while the interior is still hot, creating the compressive-tensile stress balance that defines tempered glass.", temp: "Rapid cool", color: "bg-blue-500/10 text-blue-600" },
  { num: "05", title: "Quality Control", desc: "Every tempered panel undergoes fragmentation testing (sample basis), stress measurement, and visual inspection. We verify compliance with GB 15763.2-2005 before any product leaves the factory.", temp: "Room temp", color: "bg-green-500/10 text-green-600" },
];

export default function ManufacturingProcess() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInView || paused) return;
    timerRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isInView, paused]);

  function selectStep(i: number) {
    setActiveStep(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }

  return (
    <section id="how-its-made" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">How Tempered Glass Is Made</h2>
          <p className="mt-4 text-brand-muted text-lg">Five precision-controlled stages from raw sheet to certified safety glass.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">
            {steps.map((step, i) => (
              <button key={step.num} onClick={() => selectStep(i)}
                className={"flex-shrink-0 text-left p-4 rounded-xl border transition-all duration-300 " +
                  (activeStep === i ? "bg-brand-dark border-brand-dark shadow-lg" : "bg-white border-brand-light hover:border-brand-secondary/30")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 80) + "ms" }}>
                <div className="flex items-center gap-3">
                  <span className={"text-xs font-bold px-2 py-0.5 rounded-full " + (activeStep === i ? "bg-brand-accent/20 text-brand-accent" : step.color)}>{step.num}</span>
                  <span className={"text-sm font-medium " + (activeStep === i ? "text-white" : "text-brand-dark")}>{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-brand-lighter rounded-2xl p-8 md:p-10 min-h-[260px] flex flex-col justify-center">
            <div key={activeStep} className="animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className={"text-sm font-bold px-3 py-1 rounded-full " + steps[activeStep].color}>Step {steps[activeStep].num}</span>
                <span className={"text-xs px-2.5 py-0.5 rounded-full " + steps[activeStep].color}>{steps[activeStep].temp}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-dark">{steps[activeStep].title}</h3>
              <p className="mt-4 text-brand-muted leading-relaxed text-lg">{steps[activeStep].desc}</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-10 flex items-center gap-1">
          {steps.map((_, i) => (
            <button key={i} onClick={() => selectStep(i)} className="flex-1 h-1.5 rounded-full overflow-hidden bg-brand-light cursor-pointer">
              <div className={"h-full rounded-full transition-all duration-300 " + (i < activeStep ? "bg-brand-accent w-full" : i === activeStep ? "bg-brand-accent" : "w-0")}
                style={i === activeStep ? { width: "100%", transition: paused ? "none" : "width 4s linear" } : {}} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 6. BreakageComparison V2 (auto-switch, fixed height) ━━━
write("src/components/products/tempered/BreakageComparison.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export default function BreakageComparison() {
  const { ref, isInView } = useInView();
  const [showTempered, setShowTempered] = useState(true);

  useEffect(() => {
    if (!isInView) return;
    const t = setInterval(() => setShowTempered(prev => !prev), 5000);
    return () => clearInterval(t);
  }, [isInView]);

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why &quot;Safety Glass&quot; Matters
          </h2>
          <p className="mt-4 text-white/60 text-lg">See the difference in breakage pattern \\u2014 it\\u2019s why building codes require tempered glass.</p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <button onClick={() => setShowTempered(true)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (showTempered ? "bg-brand-accent text-brand-dark" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            Tempered Glass
          </button>
          <button onClick={() => setShowTempered(false)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (!showTempered ? "bg-red-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            Ordinary Glass
          </button>
        </div>

        {/* Fixed height container */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center h-[340px] overflow-hidden">
          {/* Tempered view */}
          <div className={"absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 " + (showTempered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8")}>
            <div className="grid grid-cols-8 gap-1.5 max-w-xs mb-6">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-sm bg-brand-accent/40" style={{ animation: showTempered ? "fadeUp 0.4s ease-out " + (i * 12) + "ms both" : "none" }} />
              ))}
            </div>
            <h3 className="font-display text-xl font-bold text-white">Small, blunt granules</h3>
            <p className="mt-2 text-white/50 text-sm max-w-md">Shatters into hundreds of small, harmless pieces. No sharp edges. Minimal injury risk.</p>
          </div>

          {/* Ordinary view */}
          <div className={"absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 " + (!showTempered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")}>
            <div className="relative h-40 w-64 flex items-center justify-center mb-6">
              {[
                { w: 100, h: 65, r: -15, x: -25, y: -15 },
                { w: 75, h: 50, r: 25, x: 35, y: 8 },
                { w: 60, h: 85, r: -5, x: -50, y: 25 },
                { w: 90, h: 35, r: 45, x: 65, y: -25 },
                { w: 45, h: 75, r: -35, x: 8, y: 40 },
                { w: 70, h: 25, r: 60, x: -65, y: -40 },
              ].map((s, i) => (
                <div key={i} className="absolute bg-red-500/25 border border-red-500/50" style={{
                  width: s.w + "px", height: s.h + "px",
                  transform: "translate(" + s.x + "px," + s.y + "px) rotate(" + s.r + "deg)",
                  clipPath: "polygon(8% 0%, 100% 4%, 88% 100%, 0% 92%)",
                }} />
              ))}
            </div>
            <h3 className="font-display text-xl font-bold text-white">Large, dangerous shards</h3>
            <p className="mt-2 text-white/50 text-sm max-w-md">Breaks into large, jagged shards with razor-sharp edges. Serious laceration risk.</p>
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

// ━━━ 7. WhySincere (NEW — competitive advantages) ━━━━━━━
write("src/components/products/tempered/WhySincere.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  {
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Factory-Direct Pricing",
    stat: 30,
    suffix: "%",
    statLabel: "lower than trading companies",
    desc: "No middlemen. Our two factories run mature production lines that have been optimized over 15 years. High equipment utilization + bulk raw material purchasing = cost savings passed directly to you.",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    title: "7-15 Day Lead Time",
    stat: 15,
    suffix: " days",
    statLabel: "standard order turnaround",
    desc: "Dual-factory capacity means we rarely have backlogs. Standard orders ship within 7-15 business days. Even oversized panels (3m\\u00D715m) typically take 15-25 days \\u2014 faster than most single-factory competitors.",
  },
  {
    icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15",
    title: "Oversized Panel Capability",
    stat: 15,
    suffix: "m",
    statLabel: "max panel length",
    desc: "Most manufacturers cap at 2.4m\\u00D74.5m. Our Honghu factory\\u2019s furnace handles panels up to 3m\\u00D715m \\u2014 meaning your oversized curtain wall or skylight project doesn\\u2019t need to go elsewhere.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Zero Certification Risk",
    stat: 100,
    suffix: "%",
    statLabel: "products 3C certified",
    desc: "Every product carries China\\u2019s mandatory 3C certification and has passed national technical inspection. We provide full documentation \\u2014 test reports, certificates, compliance letters \\u2014 so your project passes inspection the first time.",
  },
];

function StatCard({ adv, isActive, index }: { adv: typeof advantages[0]; isActive: boolean; index: number }) {
  const count = useCountUp(adv.stat, isActive);
  return (
    <div
      className="p-6 rounded-xl bg-white border border-brand-light hover:border-brand-accent/20 hover:shadow-md transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out", transitionDelay: (200 + index * 120) + "ms" }}
    >
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

export default function WhySincere() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Why Source Tempered Glass from Sincere Glass?
          </h2>
          <p className="mt-4 text-brand-muted text-lg max-w-3xl">
            You have options. Here is what makes us different from the 600+ glass factories in China.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advantages.map((adv, i) => (
            <StatCard key={adv.title} adv={adv} isActive={isInView} index={i} />
          ))}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Ready to compare? Send us your specs and we will beat any like-for-like quote." product="tempered" />
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 8. TemperedHero V2 (quote modal trigger) ━━━━━━━━━━━
write("src/components/products/tempered/TemperedHero.tsx", `"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function TemperedHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/tempered.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" }} />

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
          4-5\\u00D7 stronger than standard glass. Safe fragmentation. Panels up to 3m \\u00D7 15m. 3C certified.
        </p>

        <div className="mt-8 flex flex-wrap gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["3.8\\u201319mm", "Flat & Bent", "3C Certified", "Max 3m\\u00D715m"].map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm rounded-full">{tag}</span>
          ))}
        </div>

        <div className="mt-10 flex gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <button onClick={() => openQuote("tempered")} className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Get a Quote
          </button>
          <a href="#how-its-made" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors">
            How It\\u2019s Made
          </a>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 9. TemperedCTA V2 (quote modal trigger) ━━━━━━━━━━━━
write("src/components/products/tempered/TemperedCTA.tsx", `"use client";
import { useInView } from "@/lib/useInView";
import { useQuote } from "@/lib/QuoteContext";

export default function TemperedCTA() {
  const { ref, isInView } = useInView();
  const { openQuote } = useQuote();

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Need Tempered Glass for Your Project?</h2>
        <p className="mt-4 text-white/60 text-lg leading-relaxed">
          Tell us your specifications \\u2014 thickness, size, quantity, edge work, flat or bent. Our team responds within 24 hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => openQuote("tempered")} className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Get a Free Quote
          </button>
          <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors">
            Email Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 10. Updated page.tsx (insert WhySincere + inline CTAs) ━━━
write("src/app/products/tempered-glass/page.tsx", `import { Metadata } from "next";
import TemperedHero from "@/components/products/tempered/TemperedHero";
import WhatIs from "@/components/products/tempered/WhatIs";
import ManufacturingProcess from "@/components/products/tempered/ManufacturingProcess";
import BreakageComparison from "@/components/products/tempered/BreakageComparison";
import TemperedSpecs from "@/components/products/tempered/TemperedSpecs";
import TemperedAdvantages from "@/components/products/tempered/TemperedAdvantages";
import WhySincere from "@/components/products/tempered/WhySincere";
import GlassComparison from "@/components/products/tempered/GlassComparison";
import TemperedApplications from "@/components/products/tempered/TemperedApplications";
import TemperedFAQ from "@/components/products/tempered/TemperedFAQ";
import TemperedCTA from "@/components/products/tempered/TemperedCTA";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tempered Glass Manufacturer China \\u2014 Custom Sizes up to 3m\\u00D715m | Sincere Glass",
  description: "Custom tempered glass from China. 3.8-19mm, panels up to 3m\\u00D715m, 3C certified. 4-5\\u00D7 stronger than annealed glass. Factory-direct pricing, 7-15 day lead time.",
  openGraph: {
    title: "Tempered Glass Manufacturer \\u2014 Sincere Glass",
    description: "Custom architectural tempered glass. Flat & bent, 3.8-19mm, max 3m\\u00D715m. 3C certified, factory direct.",
    url: "https://sincereglass.com/products/tempered-glass",
    images: [{ url: "https://sincereglass.com/images/products/tempered.jpg" }],
  },
};

const faqItems = [
  { q: "What is the difference between tempered glass and normal glass?", a: "Tempered glass is 4-5 times stronger than standard annealed glass. It is made by heating float glass to near its softening point (around 620\\u00B0C) and then rapidly cooling it. This process creates compressive stress on the surface, making it significantly more resistant to impact and thermal shock. When broken, tempered glass shatters into small, blunt granules instead of dangerous sharp shards." },
  { q: "Can tempered glass be cut after tempering?", a: "No. Once glass is tempered, it cannot be cut, drilled, or edge-worked. Any attempt to modify tempered glass will cause it to shatter completely. All cutting, drilling, edge polishing, and other fabrication must be completed before the tempering process." },
  { q: "What thickness of tempered glass do you manufacture?", a: "We manufacture tempered glass in thicknesses ranging from 3.8mm to 19mm. The most common thicknesses for architectural applications are 6mm, 8mm, 10mm, and 12mm. Our tempering furnaces can handle panels up to 3 meters wide and 15 meters long." },
  { q: "Is your tempered glass certified?", a: "Yes, all our tempered glass products carry China\\u2019s mandatory 3C (CCC) certification and comply with GB 15763.2-2005, the national standard for safety glass in buildings." },
  { q: "What is the lead time for tempered glass orders?", a: "Standard orders are typically fulfilled within 7-15 business days. For oversized panels or special processing, lead times may be 15-25 business days. Contact us with your specifications for an accurate timeline." },
  { q: "Can tempered glass be used for structural applications?", a: "Yes. Tempered glass is widely used in curtain walls, glass doors, skylights, balustrades, and canopies. For applications requiring post-breakage integrity, we recommend laminated tempered glass." },
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
  description: "Custom architectural tempered glass, 3.8-19mm thickness, panels up to 3m\\u00D715m. 3C certified safety glass.",
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
        <TemperedHero />
        <WhatIs />
        <ManufacturingProcess />
        <BreakageComparison />
        <TemperedAdvantages />

        {/* ---- WHY US (conversion-focused) ---- */}
        <WhySincere />

        <TemperedSpecs />

        {/* Inline CTA after specs */}
        <div className="bg-brand-lighter pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <InlineQuoteCTA text="Have your dimensions ready? Get a precise quote within 24 hours." product="tempered" />
          </div>
        </div>

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

console.log("");
console.log("🎉 Tempered Glass V2 Conversion Upgrade 完成！共 10 个文件。");
console.log("");
console.log("新增/改动:");
console.log("  ✦ QuoteModal — 全局询盘弹窗（ESC关闭，backdrop点击关闭）");
console.log("  ✦ QuoteContext — React Context 管理弹窗状态");
console.log("  ✦ InlineQuoteCTA — 可复用的穿插式转化条");
console.log("  ✦ ManufacturingProcess — 自动轮播4秒/步，hover暂停，进度条动画");
console.log("  ✦ BreakageComparison — 自动切换5秒/次，固定高度340px");
console.log("  ✦ WhySincere — 新增竞争差异化模块（性价比/交期/超大板/认证）");
console.log("  ✦ Hero/CTA — 所有Quote按钮改为弹窗触发");
console.log("  ✦ layout.tsx — 引入QuoteProvider包裹全局");
console.log("");
console.log("访问: http://localhost:3000/products/tempered-glass");
