#!/usr/bin/env node
/**
 * Sincere Glass — About Us Page
 * 放到 edit/ 目录下，从项目根目录运行：
 *   node edit/patch-about.mjs
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

// ━━━ About page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/about/page.tsx", `import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyIntro from "@/components/about/CompanyIntro";
import Timeline from "@/components/about/Timeline";
import DualFactories from "@/components/about/DualFactories";
import Leadership from "@/components/about/Leadership";
import Certifications from "@/components/about/Certifications";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us — Sincere Glass",
  description:
    "Founded in 2005, Sincere Glass operates two modern factories in Hubei, China. 20,000㎡ total area, 120+ employees, 3C certified. Learn about our story, leadership, and capabilities.",
  openGraph: {
    title: "About Sincere Glass — Two Factories, One Mission",
    description:
      "From a single workshop in Wuhan to two modern factories across Hubei. 15+ years of architectural glass manufacturing excellence.",
    url: "https://sincereglass.com/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://sincereglass.com/about#webpage",
  url: "https://sincereglass.com/about",
  name: "About Sincere Glass",
  isPartOf: { "@id": "https://sincereglass.com/#website" },
  about: { "@id": "https://sincereglass.com/#organization" },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <AboutHero />
        <CompanyIntro />
        <Timeline />
        <DualFactories />
        <Leadership />
        <Certifications />
        <AboutCTA />
      </main>
    </>
  );
}
`);

// ━━━ AboutHero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/AboutHero.tsx", `"use client";

import { useEffect, useState } from "react";

export default function AboutHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative h-[50vh] min-h-[360px] flex items-center bg-brand-dark overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out"
        style={{
          backgroundImage: "url('/images/factory-exterior.jpg')",
          transform: loaded ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div className="absolute inset-0 bg-brand-dark/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <p
          className={\`text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3 transition-all duration-600 \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}
        >
          About Us
        </p>
        <h1
          className={\`font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-100 \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
        >
          Two Factories, One Mission
        </h1>
        <p
          className={\`mt-4 text-lg text-white/70 max-w-xl transition-all duration-700 delay-200 \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
        >
          From a single workshop in Wuhan to two modern manufacturing facilities — 15+ years of building trust through glass.
        </p>
      </div>
    </section>
  );
}
`);

// ━━━ CompanyIntro ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/CompanyIntro.tsx", `"use client";

import { useInView } from "@/lib/useInView";

export default function CompanyIntro() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div
          className="transition-all duration-700"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Who We Are
          </h2>
          <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
            <p>
              Sincere Glass is a full-service architectural glass processing enterprise headquartered in Hubei, China.
              We integrate deep processing, quality control, and international trade under one roof — giving our clients
              a single point of contact from order to delivery.
            </p>
            <p>
              What started in 2005 as a glass processing workshop in Wuhan's Wujin Industrial Park has grown into a
              dual-factory operation spanning 20,000㎡. Our Wuhan facility (est. 2005) handles the core product lines,
              while our Honghu facility (est. 2019) in the Xintan Industrial Park houses expanded capacity for oversized
              panels and specialized products like Low-E and enameled glass.
            </p>
            <p>
              Every product we ship — tempered, insulated, laminated, or enameled — carries China's mandatory 3C
              certification and has passed national technical inspection. That's not a marketing line. It's the baseline
              we hold ourselves to, because our glass goes into hospitals, airports, and homes where quality is non-negotiable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ Timeline ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/Timeline.tsx", `"use client";

import { useInView } from "@/lib/useInView";

const milestones = [
  { year: "2005", title: "Founded in Wuhan", desc: "Established as a glass processing workshop in Wujin Industrial Park, Hannan District, Wuhan." },
  { year: "2008", title: "Industry Recognition", desc: "Became a council member of the Wuhan Glass Profession Association and earned 'Integrity Enterprise' honor." },
  { year: "2010", title: "Leadership Award", desc: "Chairman Li Chuanren recognized as one of Wuhan's Top 10 Outstanding Entrepreneurs (8th edition)." },
  { year: "2012", title: "Quality Milestones", desc: "Achieved 'Zero Safety Accident' certification and 'China Quality Well-Known Brand' recognition." },
  { year: "2016", title: "Capacity Expansion", desc: "Invested in new energy-efficient production lines. Expanded from single tempered glass to full product range." },
  { year: "2019", title: "Second Factory", desc: "Opened 20,000㎡ Honghu facility in Xintan Industrial Park with oversized tempering (3m×15m) and automated gas-filling IGU line." },
  { year: "2024", title: "Going Global", desc: "Launched international trade division. Building sincereglass.com to serve global B2B buyers directly." },
];

export default function Timeline() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div
          className="text-center mb-16 transition-all duration-600"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Our Journey</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-brand-light md:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className="relative flex items-start"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(20px)",
                    transition: "all 600ms ease-out",
                    transitionDelay: \`\${200 + i * 100}ms\`,
                  }}
                >
                  {/* Desktop: alternating sides */}
                  <div className={\`hidden md:flex w-full items-start \${isLeft ? "flex-row" : "flex-row-reverse"}\`}>
                    <div className={\`w-[calc(50%-2rem)] \${isLeft ? "text-right pr-8" : "text-left pl-8"}\`}>
                      <span className="text-brand-accent font-display font-bold text-2xl">{m.year}</span>
                      <h3 className="mt-1 font-semibold text-brand-dark text-lg">{m.title}</h3>
                      <p className="mt-2 text-brand-muted text-sm leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="relative flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-brand-accent border-4 border-white shadow-sm" />
                    </div>
                    <div className="w-[calc(50%-2rem)]" />
                  </div>

                  {/* Mobile: always left-aligned */}
                  <div className="md:hidden flex items-start">
                    <div className="relative flex-shrink-0 mr-5">
                      <div className="w-3 h-3 rounded-full bg-brand-accent border-3 border-white shadow-sm" />
                    </div>
                    <div>
                      <span className="text-brand-accent font-display font-bold text-xl">{m.year}</span>
                      <h3 className="mt-1 font-semibold text-brand-dark">{m.title}</h3>
                      <p className="mt-1 text-brand-muted text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ DualFactories ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/DualFactories.tsx", `"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";

const factories = [
  {
    name: "Wuhan Factory",
    label: "Est. 2005",
    location: "Wujin Industrial Park, Hannan District, Wuhan",
    area: "17,000㎡",
    image: "/images/hero-factory.jpg",
    features: [
      "Tempering furnaces, CNC cutting, edge polishing",
      "High-pressure autoclaves for laminated glass",
      "120+ employees, 10 technical engineers",
      "Serves Hubei province and surrounding regions",
    ],
  },
  {
    name: "Honghu Factory",
    label: "Est. 2019",
    location: "Xintan Town Industrial Park, Honghu, Hubei",
    area: "20,000㎡",
    image: "/images/factory-exterior.jpg",
    features: [
      "4 intelligent cutting lines, 4 edge polishing lines",
      "2 tempering furnaces (max 3m × 15m panels)",
      "Automated gas-filling insulated glass line",
      "2 high-pressure autoclaves (one at 3m × 15m)",
    ],
  },
];

export default function DualFactories() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="text-center mb-14 transition-all duration-600"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Our Facilities
          </h2>
          <p className="mt-4 text-brand-muted text-lg">Two factories, complete capabilities, one quality standard.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {factories.map((f, i) => (
            <div
              key={f.name}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(24px)",
                transition: "all 600ms ease-out",
                transitionDelay: \`\${200 + i * 150}ms\`,
              }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-accent/90 text-brand-dark text-xs font-semibold rounded-full">{f.label}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-brand-dark">{f.name}</h3>
                <p className="mt-1 text-sm text-brand-muted">{f.location}</p>
                <p className="mt-1 text-sm text-brand-accent font-medium">{f.area} total area</p>
                <ul className="mt-4 space-y-2">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-brand-muted">
                      <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ Leadership ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/Leadership.tsx", `"use client";

import { useInView } from "@/lib/useInView";

export default function Leadership() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div
          className="transition-all duration-700"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Leadership</h2>

          <div className="mt-10 p-8 bg-brand-lighter rounded-xl border border-brand-light">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-2xl font-bold text-brand-primary">李</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-brand-dark">Li Chuanren · 李传仁</h3>
                <p className="text-brand-accent text-sm font-medium mt-1">Chairman & Founder</p>
                <div className="mt-4 space-y-3 text-brand-muted leading-relaxed">
                  <p>
                    Under Chairman Li's leadership, Sincere Glass has grown from a single-product tempered glass
                    workshop into a multi-line manufacturing enterprise covering flat and bent tempered glass,
                    insulated glass, laminated glass, and enameled glass.
                  </p>
                  <p>
                    His philosophy — "pursue excellence, serve society" — has guided the company through 15+ years
                    of continuous investment in advanced equipment, quality systems, and talent development. In 2010,
                    he was honored as one of Wuhan's Top 10 Outstanding Entrepreneurs.
                  </p>
                  <p>
                    Today, the company partners with leading domestic float glass producers and maintains
                    comprehensive production process management and quality control systems across both factories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ Certifications ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/Certifications.tsx", `"use client";

import { useInView } from "@/lib/useInView";

const certs = [
  { name: "CCC (3C) Certification", desc: "China Compulsory Certification for tempered, insulated, and laminated glass", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { name: "National Technical Inspection", desc: "Approved by China's national technical supervision and inspection bureau", icon: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" },
  { name: "Contract & Credit Compliance", desc: "Recognized as a 'Contract-Honoring and Credit-Worthy Enterprise' by Wuhan authorities", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" },
  { name: "Wuhan Glass Association", desc: "Chairman unit of the Wuhan Glass Profession Association", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { name: "Zero Safety Accident Award", desc: "Awarded '100 Days Zero Safety Accident' certification by Wuhan Safety Production Association (2012)", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Hubei Energy Efficiency Member", desc: "Member of the Hubei Province Building Energy Efficiency Association", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
];

export default function Certifications() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="text-center mb-14 transition-all duration-600"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Certifications &amp; Recognition
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <div
              key={c.name}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-light hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(16px)",
                transition: "all 500ms ease-out",
                transitionDelay: \`\${150 + i * 80}ms\`,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-brand-dark">{c.name}</h3>
                <p className="mt-1 text-xs text-brand-muted leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ━━━ AboutCTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/components/about/AboutCTA.tsx", `"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

export default function AboutCTA() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div
        className="max-w-3xl mx-auto px-6 md:px-12 text-center transition-all duration-700"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)" }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
          Ready to Work With Us?
        </h2>
        <p className="mt-4 text-white/60 text-lg leading-relaxed">
          Whether you need a single product or a complete glass package for a landmark project, we're ready to talk.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#quote"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-base"
          >
            Get a Free Quote
          </a>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-base"
          >
            View Our Products
          </Link>
        </div>
      </div>
    </section>
  );
}
`);

console.log(`
🎉 About Us 页面完成！共 8 个文件。

Sections:
  ✦ AboutHero — 半屏 banner + 标题
  ✦ CompanyIntro — 公司简介（3段文字）
  ✦ Timeline — 发展历程时间轴（2005-2024，7个节点）
  ✦ DualFactories — 双工厂对比卡片
  ✦ Leadership — 董事长李传仁介绍
  ✦ Certifications — 6项认证资质
  ✦ AboutCTA — 底部行动号召

访问 http://localhost:3000/about 查看效果 🚀
`);
