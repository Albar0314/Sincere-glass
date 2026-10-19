#!/usr/bin/env node
/**
 * Deploy Article #16 — Buyer-Guide Pillar
 *
 * Produces:
 *   - src/components/blog/article-16/SourcingLifecycleMap.tsx
 *   - src/components/blog/article-16/BuyerArchetypeSelector.tsx
 *   - src/components/blog/article-16/SourcingBudgetEstimator.tsx
 *   - src/app/blog/architectural-glass-china-buyer-guide/page.tsx
 *   - appends new registry entry to src/lib/blog-registry.ts
 *
 * Usage (from project root D:\桌面\sincere-glass\sincere-glass\):
 *   node edit\deploy-article-16-pillar.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is one level up from edit/
const PROJECT_ROOT = path.resolve(__dirname, "..");
const EDIT_DIR = __dirname;

const SLUG = "architectural-glass-china-buyer-guide";

// ---- file copy manifest ------------------------------------------------
const COPIES = [
  {
    template: "SourcingLifecycleMap.tsx.txt",
    target: path.join(PROJECT_ROOT, "src", "components", "blog", "article-16", "SourcingLifecycleMap.tsx"),
  },
  {
    template: "BuyerArchetypeSelector.tsx.txt",
    target: path.join(PROJECT_ROOT, "src", "components", "blog", "article-16", "BuyerArchetypeSelector.tsx"),
  },
  {
    template: "SourcingBudgetEstimator.tsx.txt",
    target: path.join(PROJECT_ROOT, "src", "components", "blog", "article-16", "SourcingBudgetEstimator.tsx"),
  },
  {
    template: "page-article-16-china-buyer-guide.tsx.txt",
    target: path.join(PROJECT_ROOT, "src", "app", "blog", SLUG, "page.tsx"),
  },
];

for (const { template, target } of COPIES) {
  const src = path.join(EDIT_DIR, template);
  if (!fs.existsSync(src)) {
    console.error(`[FAIL] Template missing: ${src}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const content = fs.readFileSync(src, "utf8");
  fs.writeFileSync(target, content, "utf8");
  console.log(`[OK]   ${path.relative(PROJECT_ROOT, target)}`);
}

// ---- registry append ---------------------------------------------------
const REGISTRY_PATH = path.join(PROJECT_ROOT, "src", "lib", "blog-registry.ts");
if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`[FAIL] Registry not found: ${REGISTRY_PATH}`);
  process.exit(1);
}

let registry = fs.readFileSync(REGISTRY_PATH, "utf8");

// Idempotence check — do not append twice
if (registry.includes(`slug: '${SLUG}'`) || registry.includes(`slug: "${SLUG}"`)) {
  console.log(`[SKIP] Registry already contains entry for ${SLUG}; not appending.`);
} else {
  // New entry — strings with English apostrophes are wrapped in double quotes
  // or backticks to avoid TS parse breakage (per project SOP v2.3 lesson).
  const newEntry = `
  {
    slug: '${SLUG}',
    title: "The China Architectural Glass Buyer Guide: Who, Why, and How to Source Right",
    excerpt: "A hub guide for buyers sourcing architectural glass from Chinese factories. Covers the 6-phase sourcing lifecycle, 4 buyer archetypes, honest landed-cost math, and the 5 risks first-time buyers underestimate. Links to the three deep-dive chapters on vetting, importing, and shipping.",
    targetKeyword: 'architectural glass china buyer guide',
    secondaryKeywords: [
      'buying architectural glass from china',
      'china glass sourcing guide',
      'how to buy glass from china manufacturer',
      'architectural glass procurement china',
      'china architectural glass sourcing',
    ],
    searchKeywords: [
      'architectural glass china buyer guide', 'china glass sourcing', 'buying glass from china',
      'how to source glass china', 'china architectural glass procurement',
      'buyer guide glass china', 'china glass factory buyer', 'importing glass china guide',
      'china glass supplier guide', 'glass sourcing hub china',
      '中国建筑玻璃采购', '从中国采购玻璃', '中国玻璃厂采购指南', '中国建筑玻璃供应商选择',
      'FOB', 'IGU', 'landed cost', 'HS code glass',
    ],
    publishDate: '2026-10-19',
    updatedDate: '2026-10-19',
    category: 'Buyer Guide',
    tags: ['pillar', 'buyer guide', 'china sourcing', 'architectural glass', 'sourcing lifecycle', 'landed cost', 'supplier vetting'],
    heroImage: '/images/blog/architectural-glass-china-buyer-guide-hero.webp',
    heroImageAlt: "A buyer's desk with an architectural glass sample, a shipping container drawing, a RFQ document, and a pen — overview of the China sourcing process",
    heroImagePrompt: "Professional editorial photography, overhead flat-lay on a dark wood desk. Composition includes: (1) a small rectangular architectural glass sample with visible Low-E coating sheen in the top-left, (2) a half-unfolded technical drawing of a 40-foot shipping container with glass crates stacked inside in the top-right, (3) a RFQ specification document with legible headings like 'Make-up', 'Standards', 'Lead time' in the center, (4) a dark fountain pen diagonally resting across the RFQ, (5) a small Chinese business card with a factory logo partially tucked under the drawing in the bottom-right. Warm amber desk lamp light from above-left casting soft long shadows. Rich dark wood texture with subtle grain. Shallow depth of field focused on the center RFQ document. Muted palette with warm amber accents. Documentary editorial aesthetic. No visible text other than the generic specification headings. 4K photorealistic.",
    author: DEFAULT_AUTHOR,
    readingTime: 20,
    featured: true,
    isPillar: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide',
    cluster: 'buyer-guide',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-19', note: 'Initial publish — Pillar Page for Buyer-Guide cluster (hub for #13 import, #14 shipping, #15 vetting)' },
    ],
  },
`;

  // Insertion point: just before the array-closing "];" that precedes the
  // "// ---- Utility functions ----" comment block. This anchor is unique.
  const anchor = /\]\s*;\s*\n\s*\n\s*\/\/ ---- Utility functions ----/;
  if (!anchor.test(registry)) {
    console.error(
      "[FAIL] Could not find registry anchor \"]; // ---- Utility functions ----\". " +
        "Please inspect src/lib/blog-registry.ts manually and append the new entry just before the closing \"];\" of the blogArticles array.",
    );
    process.exit(1);
  }

  registry = registry.replace(
    anchor,
    (match) => newEntry + match,
  );

  fs.writeFileSync(REGISTRY_PATH, registry, "utf8");
  console.log(`[OK]   src/lib/blog-registry.ts (appended entry for ${SLUG})`);
}

console.log("");
console.log("---- Done. Next steps ----");
console.log("1. Review changes:  git diff");
console.log("2. Build locally:   npm run build");
console.log("3. Commit + push:   via GitHub Desktop (triggers Vercel deploy)");
console.log("");
console.log("Post-publish checklist (SOP v2.3):");
console.log("  [ ] Load /blog/" + SLUG + " with JS disabled in DevTools; confirm each interactive has its SSR shadow paragraph.");
console.log("  [ ] Confirm the hub navigation <table> renders with its visible caption.");
console.log("  [ ] Request indexing in Google Search Console for /blog/" + SLUG);
console.log("  [ ] Generate hero image per heroImagePrompt and place at /public/images/blog/" + SLUG + "-hero.webp");
console.log("  [ ] Verify the Buyer's Guide cluster filter at /blog?cluster=buyer-guide shows the Pillar in the featured hero slot (per blog/page.tsx isPillar logic).");
console.log("");
