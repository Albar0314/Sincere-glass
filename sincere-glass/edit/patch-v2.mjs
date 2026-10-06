#!/usr/bin/env node
/**
 * Sincere Glass — Patch v2
 * 
 * 1. tailwind.config.ts → Smoke Glass B3 palette
 * 2. Header.tsx → Mega Menu + sticky
 * 3. EquipmentGrid.tsx → 新组件
 * 4. BlogTeaser.tsx → 新组件
 * 5. WhatsAppFloat.tsx → 新组件
 * 6. layout.tsx → 引入 WhatsAppFloat
 * 7. page.tsx → 引入 EquipmentGrid + BlogTeaser
 * 8. globals.css → scrollbar-hide + Smoke Glass 调整
 *
 * 用法: node patch-v2.mjs
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
  console.log(`${existed ? "✏️  覆盖" : "✅  创建"}: ${rel}`);
}

// ━━━ 1. TAILWIND CONFIG ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("tailwind.config.ts", `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Smoke Glass B3 — Soft Amber
          dark: "#1C1F26",
          primary: "#3A4250",
          secondary: "#8B95A5",
          accent: "#DAA745",
          "accent-hover": "#C4963D",
          light: "#F2F0ED",
          lighter: "#FAFAF8",
          muted: "#6B7280",
          // Legacy aliases
          navy: "#1C1F26",
          sky: "#8B95A5",
          glass: "#F2F0ED",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
`);

// ━━━ 2. MEGA MENU HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/Header.tsx", `"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const products = [
  { name: "Tempered Glass", href: "/products/tempered-glass", desc: "4-5× stronger, safe fragmentation", image: "/images/products/tempered.jpg" },
  { name: "Insulated Glass", href: "/products/insulated-glass", desc: "Thermal & sound insulation", image: "/images/products/insulated.jpg" },
  { name: "Laminated Glass", href: "/products/laminated-glass", desc: "Impact-resistant PVB interlayer", image: "/images/products/laminated.jpg" },
  { name: "Enameled Glass", href: "/products/enameled-glass", desc: "Ceramic frit decorative finish", image: "/images/products/enameled.jpg" },
  { name: "Low-E Glass", href: "/products/low-e-glass", desc: "Energy-efficient coating", image: "/images/products/low-e.jpg" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Equipment", href: "/equipment" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function megaEnter() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  }
  function megaLeave() {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 200);
  }

  return (
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled ? "bg-brand-dark/95 backdrop-blur-md shadow-lg" : "bg-brand-dark/80 backdrop-blur-sm"
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="font-display text-xl font-bold text-white tracking-tight">
            Sincere Glass
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products mega trigger */}
            <div
              className="relative"
              onMouseEnter={megaEnter}
              onMouseLeave={megaLeave}
              ref={megaRef}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                Products
                <svg className={\`w-3.5 h-3.5 transition-transform duration-200 \${megaOpen ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Mega dropdown */}
              <div
                className={\`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top \${
                  megaOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }\`}
                onMouseEnter={megaEnter}
                onMouseLeave={megaLeave}
              >
                <div className="p-5">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">Our glass products</p>
                  <div className="grid grid-cols-2 gap-2">
                    {products.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        onClick={() => setMegaOpen(false)}
                      >
                        <div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                          <div className="w-full h-full bg-brand-primary/30" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white group-hover:text-brand-accent transition-colors">{p.name}</span>
                          <span className="block text-xs text-white/40 mt-0.5">{p.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link href="/products" className="text-xs text-brand-accent hover:text-brand-accent-hover transition-colors" onClick={() => setMegaOpen(false)}>
                      View all products &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="#quote"
              className="ml-3 px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark text-sm font-semibold rounded-md transition-colors"
            >
              Request Quote
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-5 border-t border-white/10 pt-3">
            <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-2 px-2">Products</p>
            <div className="grid grid-cols-2 gap-1 mb-3">
              {products.map((p) => (
                <Link key={p.href} href={p.href} className="block text-white/70 hover:text-white text-sm py-2 px-2 rounded hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                  {p.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/5 pt-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-white/70 hover:text-white py-2 px-2 text-sm rounded hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <a href="#quote" className="block bg-brand-accent text-brand-dark text-center py-2.5 rounded-md font-semibold text-sm mt-3" onClick={() => setMobileOpen(false)}>
              Request Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
`);

// ━━━ 3. EQUIPMENT GRID ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/home/EquipmentGrid.tsx", `"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";

const equipment = [
  {
    name: "Intelligent Cutting Lines",
    count: "4 lines",
    desc: "CNC-controlled precision cutting for flat glass up to jumbo sizes. Automated loading and optimization software minimizes waste.",
    icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15",
  },
  {
    name: "Edge Polishing Lines",
    count: "4 lines",
    desc: "Double-edge grinding and polishing machines for straight, beveled, and OG edges. Handles glass from 3mm to 25mm thick.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
  {
    name: "Tempering Furnaces",
    count: "2 furnaces",
    desc: "Flat and bent tempering. Maximum panel size 3m × 15m — one of the largest capacities in Hubei province.",
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.078A8.94 8.94 0 0012 3c-1.04 0-2.042.188-2.963.535",
  },
  {
    name: "Insulated Glass Lines",
    count: "2 lines",
    desc: "Including one oversized automated gas-filling production line. Double-sealed spacer technology for long-term performance.",
    icon: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122",
  },
  {
    name: "Laminating Autoclaves",
    count: "2 units",
    desc: "High-pressure autoclaves for PVB and SGP laminated glass. One unit rated at 3m × 15m for oversized architectural panels.",
    icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313",
  },
  {
    name: "Enameling / Screen Printing",
    count: "Full line",
    desc: "Ceramic frit screen printing with custom colors and patterns. Integrated with tempering furnace for permanent fusion.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
];

export default function EquipmentGrid() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="text-center max-w-2xl mx-auto transition-all duration-600"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Advanced Equipment, Reliable Production
          </h2>
          <p className="mt-4 text-brand-muted text-lg">
            Complete processing capabilities under one roof — from raw sheet to finished product.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((eq, i) => {
            const isOpen = openIdx === i;
            return (
              <button
                key={eq.name}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className={\`text-left p-5 rounded-xl border transition-all duration-300 \${
                  isOpen
                    ? "bg-brand-dark border-brand-dark shadow-lg"
                    : "bg-white border-brand-light hover:border-brand-secondary/30 hover:shadow-sm"
                }\`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: \`\${150 + i * 80}ms\`,
                  transitionProperty: "opacity, transform, background-color, border-color, box-shadow",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={\`w-10 h-10 rounded-lg flex items-center justify-center \${isOpen ? "bg-brand-accent/20" : "bg-brand-light"}\`}>
                      <svg className={\`w-5 h-5 \${isOpen ? "text-brand-accent" : "text-brand-primary"}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={eq.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className={\`font-semibold text-sm \${isOpen ? "text-white" : "text-brand-dark"}\`}>{eq.name}</h3>
                      <span className={\`text-xs \${isOpen ? "text-brand-accent" : "text-brand-muted"}\`}>{eq.count}</span>
                    </div>
                  </div>
                  <svg className={\`w-4 h-4 transition-transform duration-200 \${isOpen ? "rotate-180 text-white/40" : "text-brand-muted"}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={\`overflow-hidden transition-all duration-300 \${isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}\`}>
                  <p className={\`text-sm leading-relaxed \${isOpen ? "text-white/60" : "text-brand-muted"}\`}>{eq.desc}</p>
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

// ━━━ 4. BLOG TEASER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/home/BlogTeaser.tsx", `"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

// TODO: Replace with WPGraphQL fetch in production
const posts = [
  {
    slug: "tempered-vs-laminated-glass",
    title: "Tempered vs. Laminated Glass: Which Is Right for Your Project?",
    excerpt: "Both are safety glass — but they protect in different ways. Here's how to choose based on your building requirements.",
    date: "2026-09-15",
  },
  {
    slug: "low-e-glass-energy-savings",
    title: "How Low-E Glass Reduces Building Energy Costs by Up to 30%",
    excerpt: "Low-emissivity coatings reflect infrared heat while letting visible light through. We break down the science and the savings.",
    date: "2026-09-08",
  },
  {
    slug: "insulated-glass-unit-guide",
    title: "The Complete Guide to Insulated Glass Units (IGUs)",
    excerpt: "Spacer types, gas fills, seal longevity — everything architects and contractors need to know before specifying IGUs.",
    date: "2026-08-28",
  },
];

export default function BlogTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-600"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Glass Industry Insights</h2>
            <p className="mt-3 text-brand-muted text-lg">Technical guides and industry knowledge for informed decisions.</p>
          </div>
          <Link href="/blog" className="text-brand-accent hover:text-brand-accent-hover font-medium transition-colors whitespace-nowrap">
            All Articles
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={\`/blog/\${post.slug}\`}
              className="group block p-6 rounded-xl border border-brand-light hover:border-brand-secondary/30 hover:shadow-md transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: \`\${200 + i * 100}ms\`,
                transitionProperty: "opacity, transform, border-color, box-shadow",
              }}
            >
              <time className="text-xs text-brand-muted">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
              <h3 className="mt-2 font-display text-base font-semibold text-brand-dark group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
              <span className="inline-flex items-center mt-4 text-sm font-medium text-brand-secondary group-hover:text-brand-accent transition-colors">
                Read More
                <svg className="ml-1 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ 5. WHATSAPP FLOAT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/WhatsAppFloat.tsx", `"use client";

import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "8613487671210"; // TODO: confirm real number
const DEFAULT_MESSAGE = "Hi, I'm interested in your glass products. Could you send me a quote?";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 300); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const url = \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(DEFAULT_MESSAGE)}\`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={\`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg flex items-center justify-center transition-all duration-300 \${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }\`}
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
`);

// ━━━ 6. LAYOUT (add WhatsAppFloat) ━━━━━━━━━━━━━━━━━━━━━━
write("src/app/layout.tsx", `import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Sincere Glass | Architectural Glass Manufacturer in China",
    template: "%s | Sincere Glass",
  },
  description:
    "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000㎡, 3C certified.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${spaceGrotesk.variable}\`}>
      <body className="font-sans text-brand-dark antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
`);

// ━━━ 7. PAGE.TSX (add EquipmentGrid + BlogTeaser) ━━━━━━━
write("src/app/page.tsx", `import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductsOverview from "@/components/home/ProductsOverview";
import WhyUs from "@/components/home/WhyUs";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import ProjectCases from "@/components/home/ProjectCases";
import EquipmentGrid from "@/components/home/EquipmentGrid";
import QuoteForm from "@/components/home/QuoteForm";
import BlogTeaser from "@/components/home/BlogTeaser";

export const metadata: Metadata = {
  title: "Sincere Glass | Architectural Glass Manufacturer in China",
  description:
    "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000㎡, 3C certified. Get a free quote.",
  openGraph: {
    title: "Sincere Glass | Architectural Glass Manufacturer in China",
    description:
      "Custom architectural glass from China — tempered, insulated, laminated & enameled. Two modern factories, 2,600+ projects, 3C certified.",
    url: "https://sincereglass.com",
    siteName: "Sincere Glass",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sincereglass.com/#organization",
      name: "Sincere Glass",
      alternateName: ["武汉欣城玻璃有限公司", "湖北欣之城玻璃有限公司"],
      url: "https://sincereglass.com",
      logo: "https://sincereglass.com/images/logo.svg",
      description: "Architectural glass manufacturer in China specializing in tempered, insulated, laminated and enameled glass.",
      foundingDate: "2005",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 120 },
      contactPoint: [{ "@type": "ContactPoint", telephone: "+86-27-86338180", contactType: "sales", email: "xcglass@sina.cn" }],
    },
    { "@type": "WebSite", "@id": "https://sincereglass.com/#website", url: "https://sincereglass.com", name: "Sincere Glass", publisher: { "@id": "https://sincereglass.com/#organization" } },
    { "@type": "WebPage", "@id": "https://sincereglass.com/#webpage", url: "https://sincereglass.com", name: "Sincere Glass | Architectural Glass Manufacturer in China", isPartOf: { "@id": "https://sincereglass.com/#website" }, about: { "@id": "https://sincereglass.com/#organization" } },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <HeroSection />
        <TrustBar />
        <ProductsOverview />
        <WhyUs />
        <CompanySnapshot />
        <ProjectCases />
        <EquipmentGrid />
        <QuoteForm />
        <BlogTeaser />
      </main>
    </>
  );
}
`);

// ━━━ 8. GLOBALS CSS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
`);

console.log(`
🎉 Patch v2 完成！共更新 8 个文件。

变更清单:
  ✦ Smoke Glass B3 配色（#DAA745 soft amber accent）
  ✦ Mega Menu Header（Products 下拉 + 5个产品带描述）
  ✦ Equipment Grid（6类设备，手风琴展开）
  ✦ Blog Teaser（3篇文章卡片，后续接 WPGraphQL）
  ✦ WhatsApp 浮窗（右下角，滚动出现）
  ✦ Layout 引入 WhatsAppFloat
  ✦ page.tsx 引入全部 9 个 Section

运行 npm run dev 看效果 🚀
`);
