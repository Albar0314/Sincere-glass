#!/usr/bin/env node
/**
 * Sincere Glass — Homepage Setup Script
 * 
 * 用法：在项目根目录运行
 *   node setup-homepage.mjs
 * 
 * 它会自动：
 * 1. 创建所需目录
 * 2. 写入所有组件文件（已存在的会跳过，加 --force 强制覆盖）
 * 3. 提示你需要手动 merge 的配置项
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";

const FORCE = process.argv.includes("--force");

const files = {
  // ── Utility hooks ──────────────────────────────────────────
  "src/lib/useInView.ts": `"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView({
  threshold = 0.15,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
`,

  "src/lib/useCountUp.ts": `"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return count;
}
`,

  // ── Home components ────────────────────────────────────────
  "src/components/home/HeroSection.tsx": `"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-dark">
      {/* Background with Ken Burns */}
      <div
        className={\`absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out \${loaded ? "scale-105" : "scale-100"}\`}
        style={{ backgroundImage: "url('/images/hero-factory.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl">
          <h1
            className={\`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight transition-all duration-700 ease-out \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
          >
            Your Trusted Architectural Glass Manufacturer in China
          </h1>

          <p
            className={\`mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl transition-all duration-700 ease-out delay-200 \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
          >
            Custom tempered, insulated, laminated &amp; enameled glass for global construction projects.
          </p>

          <div
            className={\`mt-9 flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-[400ms] \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
          >
            <a href="#quote" className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors duration-300 text-base">
              Get a Free Quote
            </a>
            <a href="/products" className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-md transition-colors duration-300 text-base">
              Explore Products
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={\`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-[800ms] \${loaded ? "opacity-100" : "opacity-0"}\`}>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
`,

  "src/components/home/TrustBar.tsx": `"use client";

import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 20000, suffix: "㎡", label: "Factory Area" },
  { value: 2600, suffix: "+", label: "Projects Completed" },
  { value: 1500, suffix: "+", label: "Clients Served" },
];

function StatItem({ value, suffix, label, isActive, index }: {
  value: number; suffix: string; label: string; isActive: boolean; index: number;
}) {
  const count = useCountUp(value, isActive);
  return (
    <div
      className="flex flex-col items-center py-5 transition-all duration-500 ease-out"
      style={{ transitionDelay: \`\${index * 100}ms\`, opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(12px)" }}
    >
      <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
        {count.toLocaleString()}<span className="text-brand-accent">{suffix}</span>
      </span>
      <span className="mt-1 text-sm text-white/60 tracking-wide">{label}</span>
    </div>
  );
}

export default function TrustBar() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className="bg-brand-primary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} isActive={isInView} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
`,

  "src/components/home/ProductsOverview.tsx": `"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";

const products = [
  { slug: "tempered-glass", name: "Tempered Glass", summary: "4-5× stronger than annealed glass. Shatters into small, safe fragments. Thickness: 3.8–19mm.", image: "/images/products/tempered.jpg" },
  { slug: "insulated-glass", name: "Insulated Glass", summary: "Superior thermal and sound insulation with double-sealed spacer technology. 1.5× wind pressure resistance.", image: "/images/products/insulated.jpg" },
  { slug: "laminated-glass", name: "Laminated Glass", summary: "Impact-resistant with PVB interlayer. Blocks 99% UV and reduces noise from 1000–2000Hz range.", image: "/images/products/laminated.jpg" },
  { slug: "enameled-glass", name: "Enameled Glass", summary: "Ceramic frit permanently fused to glass surface. Acid and abrasion resistant. Custom colors and patterns.", image: "/images/products/enameled.jpg" },
];

export default function ProductsOverview() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl transition-all duration-600 ease-out" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Architectural Glass Solutions for Every Project
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            From high-rise curtain walls to interior partitions — one factory, full product range.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.slug}
              href={\`/products/\${product.slug}\`}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transitionProperty: "opacity, transform, box-shadow", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)", transitionDelay: \`\${150 + i * 100}ms\` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-brand-dark group-hover:text-brand-secondary transition-colors">{product.name}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed line-clamp-2">{product.summary}</p>
                <span className="inline-flex items-center mt-4 text-sm font-medium text-brand-secondary group-hover:text-brand-accent transition-colors">
                  Learn More
                  <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-brand-muted transition-all duration-600 delay-500" style={{ opacity: isInView ? 1 : 0 }}>
          Need a custom glass solution?{" "}
          <a href="#quote" className="text-brand-secondary hover:text-brand-accent font-medium transition-colors">Tell us about your project</a>.
        </p>
      </div>
    </section>
  );
}
`,

  "src/components/home/WhyUs.tsx": `"use client";

import { useInView } from "@/lib/useInView";

const advantages = [
  {
    icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>',
    title: "Two Modern Factories",
    badge: "Cost-Effective",
    description: "20,000㎡ across Wuhan and Honghu with complete production lines from cutting to final assembly. Dual-factory capacity keeps lead times short.",
  },
  {
    icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>',
    title: "Full Product Range",
    badge: "One-Stop",
    description: "Tempered, insulated, laminated, Low-E, enameled, and custom coated glass — all produced in-house. No middlemen, no coordination headaches.",
  },
  {
    icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>',
    title: "Certified Quality",
    badge: "Peace of Mind",
    description: "All products pass China's mandatory 3C certification and national technical inspection. Every batch tested before shipment.",
  },
  {
    icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>',
    title: "Oversized Glass Capability",
    badge: "Hard-to-Find",
    description: "Tempering furnace handles panels up to 3m × 15m. Extra-large insulated and laminated units most factories can't produce.",
  },
];

export default function WhyUs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto transition-all duration-600 ease-out" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Why Manufacturers &amp; Contractors Choose Sincere Glass
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {advantages.map((adv, i) => (
            <div
              key={adv.title}
              className="relative p-6 rounded-lg border border-gray-100 hover:border-brand-secondary/20 hover:shadow-md transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transitionProperty: "opacity, transform, border-color, box-shadow", transitionDuration: "600ms", transitionDelay: \`\${200 + i * 120}ms\` }}
            >
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 bg-brand-accent/10 text-brand-accent text-xs font-semibold rounded-full border border-brand-accent/20">
                {adv.badge}
              </span>
              <div className="w-12 h-12 rounded-lg bg-brand-light flex items-center justify-center text-brand-secondary" dangerouslySetInnerHTML={{ __html: adv.icon }} />
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-dark">{adv.title}</h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  "src/components/home/CompanySnapshot.tsx": `"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";

export default function CompanySnapshot() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section className="py-20 md:py-28 bg-brand-light overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-40px)", transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
          >
            <Image src="/images/factory-exterior.jpg" alt="Sincere Glass factory in Hubei, China" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
          </div>

          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(40px)", transition: "opacity 700ms ease-out 150ms, transform 700ms ease-out 150ms" }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              A Decade of Glass Manufacturing Excellence
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>Founded in 2005 in Wuhan and expanded in 2019 with a second factory in Honghu, Sincere Glass has grown into a full-service architectural glass processing enterprise covering deep processing and international trade.</p>
              <p>Our two facilities span 20,000㎡ and house 4 intelligent cutting lines, 4 edge polishing lines, 2 tempering furnaces (up to 3m×15m), 2 insulated glass lines including an automated gas-filling system, and 2 high-pressure autoclaves for laminated glass production.</p>
              <p>Under the leadership of Chairman Li Chuanren — recognized as one of Wuhan&apos;s Top 10 Outstanding Entrepreneurs — we&apos;ve built partnerships with domestic glass producers and served over 2,600 landmark projects.</p>
            </div>
            <Link href="/about" className="inline-flex items-center mt-8 text-brand-secondary hover:text-brand-accent font-medium transition-colors">
              About Us
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
`,

  "src/components/home/ProjectCases.tsx": `"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";

const projects = [
  { name: "Wuhan Railway Station", type: "Insulated Glass", image: "/images/cases/wuhan-station.jpg" },
  { name: "Tianhe Airport T3 Terminal", type: "Tempered + Laminated", image: "/images/cases/tianhe-t3.jpg" },
  { name: "Wuhan International Expo Center", type: "Insulated Glass", image: "/images/cases/guobo.jpg" },
  { name: "Haier International Plaza", type: "Low-E Glass", image: "/images/cases/haier.jpg" },
  { name: "Country Garden Phoenix City", type: "Tempered Glass", image: "/images/cases/biguiyuan.jpg" },
  { name: "Jiangxia People's Hospital", type: "Insulated Glass", image: "/images/cases/jiangxia-hospital.jpg" },
  { name: "Optics Valley World City", type: "Enameled Glass", image: "/images/cases/guanggu.jpg" },
  { name: "Poly Military Games Village", type: "Laminated Glass", image: "/images/cases/baoli.jpg" },
];

export default function ProjectCases() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-600 ease-out" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Trusted by Landmark Projects</h2>
            <p className="mt-3 text-brand-muted text-lg">2,600+ projects across China and growing internationally.</p>
          </div>
          <Link href="/projects" className="text-brand-secondary hover:text-brand-accent font-medium transition-colors whitespace-nowrap">View All Projects</Link>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-6 md:px-12 pb-4" style={{ minWidth: "max-content" }}>
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="relative w-72 md:w-80 flex-shrink-0 group rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transitionProperty: "opacity, transform, box-shadow", transitionDuration: "600ms", transitionDelay: \`\${100 + i * 80}ms\` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="320px" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm leading-snug">{project.name}</h3>
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-brand-accent/90 text-brand-dark text-xs font-medium rounded">{project.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  "src/components/home/QuoteForm.tsx": `"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/lib/useInView";

export default function QuoteForm() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up to Next.js API route or WP REST endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="quote" className="py-20 md:py-28 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out" }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Ready to Start Your Glass Project?</h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">Tell us what you need — our team responds within 24 hours with a free quote and production timeline.</p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-brand-accent font-semibold text-sm tracking-wide uppercase">Wuhan Factory</h3>
                <p className="mt-1 text-white/60 text-sm">Wujin Industrial Park, Hannan District, Wuhan</p>
                <a href="mailto:xcglass@sina.cn" className="text-white/80 hover:text-brand-accent text-sm transition-colors">xcglass@sina.cn</a>
              </div>
              <div>
                <h3 className="text-brand-accent font-semibold text-sm tracking-wide uppercase">Honghu Factory</h3>
                <p className="mt-1 text-white/60 text-sm">Xintan Town Industrial Park, Honghu, Hubei</p>
                <a href="mailto:1348767121@qq.com" className="text-white/80 hover:text-brand-accent text-sm transition-colors">1348767121@qq.com</a>
              </div>
            </div>
          </div>

          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out 200ms" }}>
            {submitted ? (
              <div className="bg-white/5 border border-white/10 rounded-lg p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Thank you!</h3>
                <p className="mt-2 text-white/60">Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Full Name <span className="text-brand-accent">*</span></label>
                    <input type="text" required className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Email <span className="text-brand-accent">*</span></label>
                    <input type="email" required className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Phone / WhatsApp</label>
                    <input type="tel" className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="Include country code" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Glass Type Needed</label>
                    <select className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white/70 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors">
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
                  <label className="block text-sm text-white/70 mb-1.5">Project Description</label>
                  <textarea rows={4} className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors resize-none" placeholder="Tell us about your project — dimensions, quantity, application..." />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold rounded-md transition-colors duration-300">
                  {loading ? "Sending..." : "Get Your Free Quote"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
`,

  // ── Page entry ─────────────────────────────────────────────
  "src/app/page.tsx": `import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductsOverview from "@/components/home/ProductsOverview";
import WhyUs from "@/components/home/WhyUs";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import ProjectCases from "@/components/home/ProjectCases";
import QuoteForm from "@/components/home/QuoteForm";

export const metadata: Metadata = {
  title: "Sincere Glass | Architectural Glass Manufacturer in China",
  description: "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000㎡, 3C certified. Get a free quote.",
  openGraph: {
    title: "Sincere Glass | Architectural Glass Manufacturer in China",
    description: "Custom architectural glass from China — tempered, insulated, laminated & enameled. Two modern factories, 2,600+ projects, 3C certified.",
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
      description: "Architectural glass manufacturer in China specializing in tempered, insulated, laminated and enameled glass for global construction projects.",
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
        <QuoteForm />
        {/* <BlogTeaser /> — TODO: wire to WPGraphQL */}
      </main>
    </>
  );
}
`,
};

// ── Tailwind brand tokens (instructions only — needs manual merge) ──
const tailwindPatch = `
// 👇 把这些加到你的 tailwind.config.ts → theme.extend 里：
//
// colors: {
//   brand: {
//     primary: "#1B3A5C",
//     secondary: "#2A6FA8",
//     accent: "#E8A838",
//     "accent-hover": "#D4962E",
//     dark: "#0F2439",
//     light: "#F7F9FC",
//     muted: "#6B7280",
//   },
// },
// fontFamily: {
//   sans: ["Inter", "system-ui", "sans-serif"],
//   display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
// },
`;

// ── Runner ───────────────────────────────────────────────────
let created = 0;
let skipped = 0;

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = join(process.cwd(), relativePath);
  const dir = dirname(fullPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  if (existsSync(fullPath) && !FORCE) {
    console.log(`⏭  跳过（已存在）: ${relativePath}  — 加 --force 覆盖`);
    skipped++;
    continue;
  }

  writeFileSync(fullPath, content, "utf-8");
  console.log(`✅  ${FORCE && existsSync(fullPath) ? "覆盖" : "创建"}: ${relativePath}`);
  created++;
}

console.log(`\n📦 完成！创建 ${created} 个文件，跳过 ${skipped} 个。`);
console.log(`\n⚠️  还需要手动操作：`);
console.log(`1. Tailwind 配置 — 把 brand 颜色和字体 merge 到你的 tailwind.config.ts：`);
console.log(tailwindPatch);
console.log(`2. Google Fonts — 在 app/layout.tsx 引入 Inter + Space Grotesk`);
console.log(`3. 占位图片 — 放到 public/images/ 下（hero-factory.jpg, products/*.jpg, cases/*.jpg 等）`);
console.log(`\n运行 npm run dev 看效果 🚀`);
