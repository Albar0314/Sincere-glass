#!/usr/bin/env node
/**
 * Sincere Glass — Projects Page
 * 从项目根目录运行: node edit/patch-projects.mjs
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

// ━━━ Projects data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/lib/projects.ts", `export interface Project {
  name: string;
  location: string;
  category: string;
  glassTypes: string[];
  image: string;
  description: string;
  featured?: boolean;
}

export const projectCategories = [
  "All",
  "Transportation",
  "Commercial",
  "Residential",
  "Public",
  "Cultural",
];

export const projects: Project[] = [
  {
    name: "Wuhan Railway Station",
    location: "Wuhan, Hubei",
    category: "Transportation",
    glassTypes: ["Insulated Glass", "Tempered Glass"],
    image: "/images/cases/wuhan-station.jpg",
    description: "One of China's four major high-speed rail hubs. We supplied large-format insulated glass for the iconic arched roof structure and main hall facades.",
    featured: true,
  },
  {
    name: "Tianhe Airport T3 Terminal",
    location: "Wuhan, Hubei",
    category: "Transportation",
    glassTypes: ["Tempered Glass", "Laminated Glass"],
    image: "/images/cases/tianhe-t3.jpg",
    description: "Wuhan's newest international terminal. Our tempered and laminated glass was used for the terminal curtain wall and overhead canopy glazing.",
    featured: true,
  },
  {
    name: "Wuhan International Expo Center",
    location: "Wuhan, Hubei",
    category: "Cultural",
    glassTypes: ["Insulated Glass", "Low-E Glass"],
    image: "/images/cases/guobo.jpg",
    description: "A landmark exhibition venue on the Yangtze River waterfront. Low-E insulated glass provides energy efficiency across the massive facade area.",
    featured: true,
  },
  {
    name: "Haier International Plaza",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Low-E Glass", "Insulated Glass"],
    image: "/images/cases/haier.jpg",
    description: "A Grade-A commercial tower in Wuhan's CBD. Full curtain wall glazing with high-performance Low-E insulated glass units.",
  },
  {
    name: "Country Garden Phoenix City",
    location: "Wuhan, Hubei",
    category: "Residential",
    glassTypes: ["Tempered Glass"],
    image: "/images/cases/biguiyuan.jpg",
    description: "Large-scale residential development by one of China's top developers. Tempered glass supplied for windows, balustrades, and common areas.",
  },
  {
    name: "Jiangxia People's Hospital",
    location: "Wuhan, Hubei",
    category: "Public",
    glassTypes: ["Insulated Glass", "Tempered Glass"],
    image: "/images/cases/jiangxia-hospital.jpg",
    description: "A major district hospital serving over 1 million residents. Energy-efficient insulated glass for patient rooms and public areas.",
  },
  {
    name: "Optics Valley World City",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Enameled Glass", "Insulated Glass"],
    image: "/images/cases/guanggu.jpg",
    description: "A mixed-use commercial complex in Wuhan's tech corridor. Enameled glass spandrel panels create the distinctive facade pattern.",
  },
  {
    name: "Poly Military Games Village",
    location: "Wuhan, Hubei",
    category: "Residential",
    glassTypes: ["Laminated Glass", "Tempered Glass"],
    image: "/images/cases/baoli.jpg",
    description: "Built for the 2019 CISM Military World Games. Laminated and tempered glass for athlete residences and public facilities.",
    featured: true,
  },
  {
    name: "Wanjin International Plaza",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Tempered Glass", "Low-E Glass"],
    image: "/images/cases/haier.jpg",
    description: "A commercial high-rise with full-height glazed facade. Tempered Low-E glass maximizes views while controlling solar heat gain.",
  },
  {
    name: "Caidian Citizen's Home",
    location: "Wuhan, Hubei",
    category: "Public",
    glassTypes: ["Enameled Glass", "Tempered Glass"],
    image: "/images/cases/guanggu.jpg",
    description: "Government service center with a distinctive red enameled glass facade. Custom ceramic frit color matched to the city's branding.",
  },
  {
    name: "Aoshan Century City",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Insulated Glass", "Tempered Glass"],
    image: "/images/cases/biguiyuan.jpg",
    description: "Mixed-use tower complex combining retail and office space. Insulated glass curtain wall with thermal break framing.",
  },
  {
    name: "Xi'an Sky City",
    location: "Xi'an, Shaanxi",
    category: "Residential",
    glassTypes: ["Low-E Glass", "Insulated Glass"],
    image: "/images/cases/baoli.jpg",
    description: "Our first project outside Hubei province. Low-E insulated glass for a premium residential tower, demonstrating our growing national reach.",
  },
];
`);

// ━━━ Projects page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/projects/page.tsx", `import { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "Project Cases \u2014 2,600+ Landmark Projects | Sincere Glass",
  description: "See our glass in action: Wuhan Station, Tianhe Airport T3, Expo Center, and 2,600+ more. Tempered, insulated, laminated, and enameled glass for China's landmark buildings.",
  openGraph: {
    title: "Engineering Project Cases | Sincere Glass",
    description: "2,600+ glass projects across China. See our work in airports, hospitals, commercial towers, and residential developments.",
    url: "https://sincereglass.com/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
`);

// ━━━ ProjectsClient — filterable gallery ━━━━━━━━━━━━━━━━━
write("src/components/projects/ProjectsClient.tsx", `"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import { useQuote } from "@/lib/QuoteContext";
import { projects, projectCategories, type Project } from "@/lib/projects";

function StatBar() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const projectCount = useCountUp(2600, isInView);
  const cityCount = useCountUp(15, isInView);
  const yearCount = useCountUp(15, isInView);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-10">
      {[
        { count: projectCount, suffix: "+", label: "Projects Completed" },
        { count: cityCount, suffix: "+", label: "Cities Served" },
        { count: yearCount, suffix: "+", label: "Years Track Record" },
      ].map((s) => (
        <div key={s.label} className="text-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
            {s.count.toLocaleString()}<span className="text-brand-accent">{s.suffix}</span>
          </span>
          <p className="text-xs text-white/40 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <div ref={ref} className={"group rounded-xl overflow-hidden bg-white border border-brand-light hover:border-brand-accent/20 hover:shadow-lg transition-all duration-300 " + (project.featured ? "md:col-span-2 md:row-span-2" : "")}
      style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 500ms", transitionDelay: (index % 6) * 80 + "ms" }}>
      <div className={"relative overflow-hidden " + (project.featured ? "aspect-[16/10]" : "aspect-[16/9]")}>
        <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={project.featured ? "66vw" : "33vw"} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Glass type tags */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {project.glassTypes.map(gt => (
            <span key={gt} className="px-2 py-0.5 bg-brand-accent/90 text-brand-dark text-[10px] md:text-xs font-medium rounded">{gt}</span>
          ))}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium rounded-full border border-white/20">
            Featured
          </div>
        )}
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-display text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-accent transition-colors">{project.name}</h3>
        <p className="text-xs text-brand-muted mt-0.5">{project.location}</p>
        {project.featured && (
          <p className="text-sm text-brand-muted mt-3 leading-relaxed line-clamp-2">{project.description}</p>
        )}
      </div>
    </div>
  );
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openQuote } = useQuote();

  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Project Cases</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Trusted by Landmark Projects
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            From airports and train stations to hospitals and luxury residences \u2014 our glass is part of China's most ambitious buildings.
          </p>
          <StatBar />
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 md:py-20 bg-brand-lighter">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {projectCategories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={"px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 " +
                  (activeFilter === cat ? "bg-brand-accent text-brand-dark" : "bg-white text-brand-muted border border-brand-light hover:border-brand-secondary/30")}>
                {cat}
                {cat !== "All" && <span className="ml-1.5 text-xs opacity-60">({projects.filter(p => p.category === cat).length})</span>}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
            {filtered.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>

          {/* More projects note */}
          <div className="mt-12 text-center">
            <p className="text-brand-muted text-sm">Showing {filtered.length} of 2,600+ total projects. These are representative samples from our portfolio.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">Want Your Project on This Wall?</h2>
          <p className="mt-4 text-white/60 text-lg">Every landmark project started with a conversation. Let us know what you are building.</p>
          <button onClick={() => openQuote("")} className="mt-8 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Start Your Project
          </button>
        </div>
      </section>
    </main>
  );
}
`);

console.log("");
console.log("\uD83C\uDF89 Projects page done! 3 files.");
console.log("");
console.log("Features:");
console.log("  \u2022 Hero with animated counter stats (2600+ projects, 15+ cities, 15+ years)");
console.log("  \u2022 Filterable gallery: All / Transportation / Commercial / Residential / Public / Cultural");
console.log("  \u2022 12 project entries with real data from PDF");
console.log("  \u2022 Featured projects span 2 columns with descriptions");
console.log("  \u2022 Glass type tags on each project card");
console.log("  \u2022 CTA with quote modal trigger");
console.log("");
console.log("Visit: http://localhost:3000/projects");
