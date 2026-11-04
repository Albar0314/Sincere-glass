// patch-hero-nextimage.mjs
// Replace HeroSection.tsx CSS background-image with next/image (priority),
// enabling automatic preload + responsive srcset + AVIF/WebP via Accept header.
//
// Preserves Ken Burns scale animation, overlay gradient, headline/CTA fade-ins,
// and scroll indicator intact. Only the background layer changes.
//
// Also patches ES mirror if present.
//
// Run from project root:
//   node edit\patch-hero-nextimage.mjs --dry
//   node edit\patch-hero-nextimage.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const EN_PATH = path.join(ROOT, "src", "components", "home", "HeroSection.tsx");
const ES_PATH = path.join(ROOT, "src", "_i18n", "es", "components", "home", "HeroSection.tsx");

// Preserve ES-translated strings when patching ES mirror by extracting them from
// the current ES file and re-injecting into the new template.
function buildNewContent(oldSrc, locale) {
  // Extract existing translated strings (headline, subhead, button labels, alt fallback)
  // via simple regex on the known structural landmarks.
  const extract = (re, fallback) => {
    const m = oldSrc.match(re);
    return m ? m[1] : fallback;
  };

  // Defaults (English)
  const d = {
    h1: "Your Trusted Architectural Glass Manufacturer in China",
    p: "Custom tempered, insulated, laminated & enameled glass for global construction projects.",
    cta1: "Get a Free Quote",
    cta2: "Explore Products",
    alt: "Sincere Glass architectural glass factory floor in Wuhan, China",
  };

  // Try to pull translations from old source
  const h1 = extract(/<h1[\s\S]*?>\s*([\s\S]*?)\s*<\/h1>/m, d.h1).replace(/\s+/g, " ").trim();
  // Grab first <p> text inside the max-w-2xl block
  const p = extract(/<p[^>]*>\s*([\s\S]*?)\s*<\/p>/m, d.p).replace(/\s+/g, " ").trim();
  // CTAs: first two <a> text contents
  const aMatches = [...oldSrc.matchAll(/<a\b[^>]*>\s*([\s\S]*?)\s*<\/a>/g)].map(m => m[1].replace(/\s+/g, " ").trim());
  const cta1 = aMatches[0] || d.cta1;
  const cta2 = aMatches[1] || d.cta2;
  // Alt: if the source already has alt=, grab it; else use default
  const alt = extract(/alt=["']([^"']+)["']/m, locale === "es"
    ? "Fabrica de vidrio arquitectonico Sincere Glass en Wuhan, China"
    : d.alt);

  return `"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-dark">
      {/* Background image: next/image with priority auto-preloads + serves AVIF/WebP + responsive srcset.
          Ken Burns scale lives on the wrapper so Image fill fits its parent. */}
      <div
        className={\`absolute inset-0 transition-transform duration-[12s] ease-out \${loaded ? "scale-105" : "scale-100"}\`}
      >
        <Image
          src="/images/hero-factory.jpg"
          alt="${alt.replace(/"/g, '\\"')}"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl">
          <h1
            className={\`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight transition-all duration-700 ease-out \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
          >
            ${h1}
          </h1>

          <p
            className={\`mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl transition-all duration-700 ease-out delay-200 \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
          >
            ${p}
          </p>

          <div
            className={\`mt-9 flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-[400ms] \${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}
          >
            <a href="#quote" className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors duration-300 text-base">
              ${cta1}
            </a>
            <a href="/products" className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-md transition-colors duration-300 text-base">
              ${cta2}
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
`;
}

function patch(filePath, locale) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (not found)`);
    return { skipped: true };
  }

  const old = fs.readFileSync(filePath, "utf8");

  // Idempotency: if file already imports next/image and uses <Image fill priority, skip.
  if (/from\s+["']next\/image["']/.test(old) && /<Image[\s\S]*?\bfill\b[\s\S]*?\bpriority\b/.test(old)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (already uses next/image with priority)`);
    return { skipped: true };
  }

  const next = buildNewContent(old, locale);

  if (DRY) {
    console.log(`  [would]  ${path.relative(ROOT, filePath)}  (${old.length} -> ${next.length} bytes)`);
    return { dry: true };
  }

  const bak = filePath + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, old, "utf8");
  // Write without BOM, UTF-8 — matches translation pipeline convention
  fs.writeFileSync(filePath, next, "utf8");
  console.log(`  [done]  ${path.relative(ROOT, filePath)}  (${old.length} -> ${next.length} bytes, .bak saved)`);
  return { done: true };
}

console.log("");
console.log(`=== Hero next/image patch ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");

patch(EN_PATH, "en");
patch(ES_PATH, "es");

console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next steps:");
  console.log("  1. npm run build       (verify compile)");
  console.log("  2. npm run dev         (local smoke test — hero should load fast)");
  console.log("  3. Commit + push       (then Vercel re-deploys)");
  console.log("  4. PageSpeed re-test   (LCP should drop from 9.1s to ~2-3s)");
}
