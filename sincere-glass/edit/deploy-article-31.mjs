// deploy-article-31.mjs
// Deploy script for W3-#11 (overall article #31): low-iron-tempered-glass
//
// Idempotent. CRLF-tolerant. Safe to re-run.
// - Runtime cannibalization audit against the LIVE registry; HALTS on hard conflict.
// - Writes 3 interactive components to src/components/blog/article-31/
// - Writes page.tsx to src/app/blog/low-iron-tempered-glass/
// - Inserts registry entry (skip if slug present)
// - Purge: strips 'low iron tempered' / 'tempered low iron' terms from the
//   #24 Pillar and #25 secondaryKeywords (ownership moves to this spoke).
//   searchKeyword overlap is left alone (allowed).
// - Reciprocal links: #24 Pillar + #25 -> this spoke. Dual anchor
//   (<section id="faq"> OR <FAQ ...>); loud WARN (not silent) if not found.
// - Every file touched is backed up to <file>.bak before write.
//
// Run from project root:  node deploy-article-31.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SLUG = "low-iron-tempered-glass";
const COMPONENT_DIR = path.join(ROOT, "src", "components", "blog", "article-31");
const PAGE_DIR = path.join(ROOT, "src", "app", "blog", SLUG);
const REGISTRY_PATH = path.join(ROOT, "src", "lib", "blog-registry.ts");

const PILLAR_SLUG = "low-iron-glass-complete-guide"; // #24
const SIBLING_SLUG = "low-iron-glass-vs-clear-glass"; // #25

const NEW_TARGET = "low iron tempered glass";
const NEW_SECONDARIES = [
  "low iron toughened glass",
  "ultra clear tempered glass",
  "starphire tempered glass",
  "low iron safety glass",
  "tempered low iron glass",
];

const PURGE_MARKER_24 = "LIT-PURGE-V1:a31-litempered-24";
const PURGE_MARKER_25 = "LIT-PURGE-V1:a31-litempered-25";
const RECIP_MARKER_24 = "RECIP-W3-V1:a24-to-31";
const RECIP_MARKER_25 = "RECIP-W3-V1:a25-to-31";

// ----- Utilities -----

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}
function backup(fp) {
  if (fs.existsSync(fp)) fs.copyFileSync(fp, fp + ".bak");
}
function detectEol(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}
function readIfExists(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

// ----- Step 0: runtime cannibalization audit (HALT on hard conflict) -----

function auditCannibalization() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  const targets = [];
  const re = /targetKeyword:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(raw)) !== null) targets.push(m[1].toLowerCase());

  // (a) new target must not already exist as a targetKeyword
  if (targets.includes(NEW_TARGET.toLowerCase())) {
    throw new Error(
      `[audit] HARD CONFLICT: targetKeyword "${NEW_TARGET}" already exists in the registry. A duplicate article exists - do NOT deploy. Resolve by editing the existing article instead.`
    );
  }
  // (c) none of the new secondaries may equal an existing targetKeyword
  for (const s of NEW_SECONDARIES) {
    if (targets.includes(s.toLowerCase())) {
      throw new Error(
        `[audit] HARD CONFLICT: new secondaryKeyword "${s}" equals an existing targetKeyword. Remove it from NEW_SECONDARIES before deploying.`
      );
    }
  }
  // (b) informational: is the new target already sitting in someone's secondaryKeywords?
  if (new RegExp(NEW_TARGET.replace(/\s+/g, "\\s+"), "i").test(raw)) {
    console.log(
      `[audit] note: "${NEW_TARGET}" appears somewhere in the registry (likely #24/#25 searchKeywords). The purge step will strip it from secondaryKeywords; searchKeyword overlap is allowed.`
    );
  }
  console.log("[audit] cannibalization audit passed (no hard conflict).");
}

// ----- Step 1: write 3 components -----

function writeComponents() {
  ensureDir(COMPONENT_DIR);
  const files = [
    "TemperThicknessSelector.tsx",
    "LowIronTemperedClarityView.tsx",
    "LowIronTemperedPriceStack.tsx",
  ];
  for (const f of files) {
    const target = path.join(COMPONENT_DIR, f);
    const srcCopy = path.join(ROOT, "edit", `${f}.txt`);
    if (!fs.existsSync(srcCopy)) throw new Error(`Missing source: ${srcCopy}`);
    backup(target);
    fs.copyFileSync(srcCopy, target);
    console.log(`[components] wrote ${target}`);
  }
}

// ----- Step 2: write page.tsx -----

function writePage() {
  ensureDir(PAGE_DIR);
  const target = path.join(PAGE_DIR, "page.tsx");
  const srcCopy = path.join(ROOT, "edit", `page-article-31-${SLUG}.tsx.txt`);
  if (!fs.existsSync(srcCopy)) throw new Error(`Missing source: ${srcCopy}`);
  backup(target);
  fs.copyFileSync(srcCopy, target);
  console.log(`[page] wrote ${target}`);
}

// ----- Step 3: insert registry entry (idempotent) -----

function insertRegistry() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  if (raw.includes(`slug: '${SLUG}'`) || raw.includes(`slug: "${SLUG}"`)) {
    console.log("[registry] entry already present, skipping");
    return;
  }
  const EOL = detectEol(raw);
  backup(REGISTRY_PATH);

  const anchor = /(\r?\n\s*\},)(\r?\n\];\s*\r?\n\s*\r?\n\/\/ ---- Utility functions)/;
  if (!anchor.test(raw)) {
    throw new Error(
      "[registry] anchor not found. Expected '  },\\n];\\n\\n// ---- Utility functions'. Inspect blog-registry.ts tail."
    );
  }

  const entryLines = [
    `  {`,
    `    slug: '${SLUG}',`,
    `    title: "Low Iron Tempered Glass: Specification Guide",`,
    `    excerpt: "Low iron tempered glass is ultra-clear glass that has been toughened - same strength as standard tempered, far better clarity and no green tint. A factory guide to thickness, heat soak, clarity gains, cost premium and how to spec it.",`,
    `    targetKeyword: '${NEW_TARGET}',`,
    `    secondaryKeywords: [`,
    ...NEW_SECONDARIES.map((s) => `      '${s}',`),
    `    ],`,
    `    searchKeywords: [`,
    `      'low iron tempered glass', 'low iron toughened glass', 'ultra clear tempered glass',`,
    `      'starphire tempered glass', 'optiwhite tempered', 'low iron safety glass',`,
    `      'tempered low iron glass', 'ultra clear toughened glass', 'low iron glass',`,
    `      'tempered glass', 'EN 12150', 'EN 14179', 'ASTM C1048', 'heat soak test',`,
    `      '\\u8d85\\u767d\\u94a2\\u5316\\u73bb\\u7483', '\\u4f4e\\u94c1\\u94a2\\u5316\\u73bb\\u7483', '\\u8d85\\u767d\\u73bb\\u7483',`,
    `    ],`,
    `    publishDate: '2026-11-17',`,
    `    category: 'Product Knowledge' as const,`,
    `    tags: ['low iron glass', 'tempered glass', 'ultra clear', 'safety glass', 'specification'],`,
    `    heroImage: '/images/blog/low-iron-tempered-glass-hero.webp',`,
    `    heroImageAlt: "A thick low iron tempered glass fin standing upright on dark polished concrete beside a standard clear pane, the clear pane showing a green edge while the low iron pane stays colorless, raked warm side lighting across both edges",`,
    `    heroImagePrompt: "Studio product photography: two upright architectural glass fins side by side on polished dark concrete. Left fin is standard clear tempered glass showing a distinct green edge and faint green body tint. Right fin is low iron tempered glass, completely colorless with a near-clear edge. Both are thick 15mm panes with crisp polished edges, lit from above-left with warm amber raking light that catches the edges and reveals the color difference. 25-degree slightly elevated camera angle, shallow depth of field on the two edges. Clean dark #1C1F26 background, no humans, no text, no brand logos. 16:9 cinematic composition. 4K photorealistic, museum-exhibit quality, documentary industrial photography. Matches the #26/#27/#28/#29/#30 dark-concrete series.",`,
    `    author: DEFAULT_AUTHOR,`,
    `    readingTime: 11,`,
    `    featured: false,`,
    `    reviewedBy: { name: 'Albar', title: 'Technical Lead' },`,
    `    articleType: 'technical' as const,`,
    `    cluster: 'product',`,
    `    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass'],`,
    `    translations: {},`,
    `    changelog: [`,
    `      { date: '2026-11-17', note: "Initial publish - W3-#11 Low Iron cluster product spoke" },`,
    `    ],`,
    `    tldr: [`,
    `      "Low iron tempered glass is ultra-clear glass that has been toughened. Same strength as standard tempered, far better clarity and no green tint.",`,
    `      "The iron content has no effect on tempering. Any thickness from 4 to 19 mm that we temper in clear, we temper in low iron.",`,
    `      "The clarity gap grows with thickness - obvious on thick railings, floors and fins; optional on thin framed glass.",`,
    `      "Heat soak is driven by the application (railings, overhead, floors), not by choosing low iron.",`,
    `      "Budget about 20 to 25 percent over standard clear tempered for the glass, a smaller share once the whole job is priced.",`,
    `    ],`,
    `    buyerFaq: [`,
    `      { q: "Can you temper low iron at the thickness and size I need?", a: "We temper low iron from 4 to 19 mm on the same line as clear glass. Send the panel sizes and we will confirm oven capacity and practical limits before quoting." },`,
    `      { q: "Do you heat soak low iron tempered, and can you certify it?", a: "Yes. We heat soak to EN 14179 on request and it is standard on railings, overhead and floors. Certificates travel with the shipment." },`,
    `      { q: "What is the lead time on low iron tempered?", a: "Typically 10 to 15 working days for tempered-only, 15 to 20 with heat soak, from order confirmation at our Wuhan facility." },`,
    `    ],`,
    "  },",
  ];

  const entry = entryLines.join(EOL);
  const updated = raw.replace(anchor, `$1${EOL}${entry}$2`);
  fs.writeFileSync(REGISTRY_PATH, updated, "utf8");
  console.log(`[registry] inserted entry for ${SLUG}`);
}

// ----- Step 4: purge 'low iron tempered' terms from an entry's secondaryKeywords -----

function purgeEntry(slug, marker) {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  if (raw.includes(marker)) {
    console.log(`[purge ${slug}] already applied, skipping`);
    return;
  }
  const EOL = detectEol(raw);
  const entryRe = new RegExp(
    `(slug:\\s*['"]${slug}['"][\\s\\S]*?secondaryKeywords:\\s*\\[)([\\s\\S]*?)(\\])`
  );
  const match = raw.match(entryRe);
  if (!match) {
    console.log(`[purge ${slug}] entry or secondaryKeywords not found - skipping`);
    return;
  }
  const body = match[2];
  const forbidden = /["'][^"']*(low iron tempered|tempered low iron)[^"']*["'],?\s*/gi;
  const cleaned = body.replace(forbidden, "");
  backup(REGISTRY_PATH);
  if (cleaned === body) {
    console.log(`[purge ${slug}] no 'low iron tempered' term in secondaryKeywords`);
    const marked = raw.replace(entryRe, `$1$2$3${EOL}    // ${marker}: scanned, nothing to purge`);
    fs.writeFileSync(REGISTRY_PATH, marked, "utf8");
    return;
  }
  const updated = raw.replace(
    entryRe,
    `$1${cleaned}$3${EOL}    // ${marker}: purged low-iron-tempered terms (ownership -> ${SLUG})`
  );
  fs.writeFileSync(REGISTRY_PATH, updated, "utf8");
  console.log(`[purge ${slug}] purged low-iron-tempered terms from secondaryKeywords`);
}

// ----- Step 5: reciprocal links (dual anchor, loud WARN on miss) -----

const recipFailures = [];

function patchRecip(slug, marker, calloutLines) {
  const fp = path.join(ROOT, "src", "app", "blog", slug, "page.tsx");
  const raw = readIfExists(fp);
  if (raw == null) {
    recipFailures.push({ slug, fp, reason: "page.tsx not found" });
    return;
  }
  if (raw.includes(marker)) {
    console.log(`[recip ${slug}] marker present, skipping`);
    return;
  }
  const anchors = [
    /(\r?\n[ \t]*<section\s+id=["']faqs?["'][^>]*>)/i,
    /(\r?\n[ \t]*<FAQ[\s/>])/,
  ];
  const re = anchors.find((a) => a.test(raw));
  if (!re) {
    recipFailures.push({ slug, fp, reason: "no FAQ anchor" });
    return;
  }
  const EOL = detectEol(raw);
  const callout = calloutLines.join("\n").replace(/\n/g, EOL);
  const block = `${EOL}        {/* ${marker} */}${EOL}${callout}`;
  backup(fp);
  fs.writeFileSync(fp, raw.replace(re, `${block}$1`), "utf8");
  console.log(`[recip ${slug}] inserted callout`);
}

function patchReciprocals() {
  const calloutToSpoke = [
    '        <aside className="my-8 rounded-2xl border border-sky-200 bg-sky-50 p-5">',
    '          <div className="text-xs font-semibold uppercase tracking-wide text-sky-800">Related product guide</div>',
    '          <p className="mt-2 text-sm text-slate-700">',
    '            Need the ultra-clear glass toughened for a shower, railing or floor? Our',
    '            specification guide covers temperability, heat soak and the real cost premium.',
    '          </p>',
    '          <a href="/blog/low-iron-tempered-glass" className="mt-3 inline-block text-sm font-semibold text-sky-900 underline">',
    '            Read: Low Iron Tempered Glass Specification Guide &rarr;',
    '          </a>',
    '        </aside>',
  ];
  patchRecip(PILLAR_SLUG, RECIP_MARKER_24, calloutToSpoke);
  patchRecip(SIBLING_SLUG, RECIP_MARKER_25, calloutToSpoke);
}

// ----- Run -----

function main() {
  console.log(`Deploying article #31 (W3-#11): ${SLUG}`);
  console.log(`Project root: ${ROOT}`);
  auditCannibalization();
  writeComponents();
  writePage();
  insertRegistry();
  purgeEntry(PILLAR_SLUG, PURGE_MARKER_24);
  purgeEntry(SIBLING_SLUG, PURGE_MARKER_25);
  patchReciprocals();

  console.log("");
  if (recipFailures.length) {
    console.log("==== WARNING: reciprocal links NOT inserted on: ====");
    for (const f of recipFailures) {
      console.log(`  - ${f.slug} (${f.reason})  ${f.fp}`);
      if (fs.existsSync(f.fp)) {
        console.log("    file tail (last 400 chars):");
        console.log(fs.readFileSync(f.fp, "utf8").slice(-400));
      }
    }
    console.log("  The article itself deployed fine. Send Claude the FAQ region of the above page(s) for a precise patch, or add a <section id=\"faq\"> / <FAQ> anchor and re-run.");
    console.log("");
  }

  console.log("Deploy complete. Next steps:");
  console.log("  1) npm run build   # verify TypeScript + SWC compile");
  console.log("  2) Generate hero image from heroImagePrompt in the registry entry");
  console.log("  3) Save hero to /public/images/blog/low-iron-tempered-glass-hero.webp");
  console.log("  4) git add + commit + push (Vercel auto-deploys)");
  console.log("  5) GSC URL inspection + request indexing");
  console.log("  6) ES mirror: scripts/translate-all.mjs");
}

main();
