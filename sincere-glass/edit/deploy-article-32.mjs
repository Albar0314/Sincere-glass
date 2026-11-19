// deploy-article-32.mjs
// Deploy script for W3-#12 (overall article #32): low-iron-glass-shower-door
//
// Idempotent. CRLF-tolerant. Safe to re-run.
// - Runtime cannibalization audit against the LIVE registry; HALTS on hard conflict.
//   (This is the real gate: it will HALT if a dedicated shower-door article already
//    exists as a targetKeyword, or if any new secondaryKeyword equals an existing target.)
// - Writes 3 interactive components to src/components/blog/article-32/
// - Writes page.tsx to src/app/blog/low-iron-glass-shower-door/
// - Inserts registry entry (skip if slug present)
// - Purge: strips any 'shower' term from the #24 Pillar, #25 and #31 secondaryKeywords
//   (ownership of all shower-door intent moves to this spoke).
//   searchKeyword overlap is left alone (allowed).
// - Reciprocal links: #24 Pillar + #31 -> this spoke. Dual anchor
//   (<section id="faq"> OR <FAQ ...>); loud WARN (not silent) if not found.
// - Every file touched is backed up to <file>.bak before write.
//
// Run from project root:  node deploy-article-32.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SLUG = "low-iron-glass-shower-door";
const COMPONENT_DIR = path.join(ROOT, "src", "components", "blog", "article-32");
const PAGE_DIR = path.join(ROOT, "src", "app", "blog", SLUG);
const REGISTRY_PATH = path.join(ROOT, "src", "lib", "blog-registry.ts");

const PILLAR_SLUG = "low-iron-glass-complete-guide"; // #24
const SIBLING_SLUG = "low-iron-glass-vs-clear-glass"; // #25
const TEMPERED_SLUG = "low-iron-tempered-glass"; // #31 (nearest neighbour, has a shower FAQ)

const NEW_TARGET = "low iron glass shower door";
const NEW_SECONDARIES = [
  "low iron shower glass",
  "ultra clear shower door",
  "starphire shower glass",
  "frameless low iron shower",
  "low iron shower screen",
];

const PURGE_MARKER_24 = "SHOWER-PURGE-V1:a32-shower-24";
const PURGE_MARKER_25 = "SHOWER-PURGE-V1:a32-shower-25";
const PURGE_MARKER_31 = "SHOWER-PURGE-V1:a32-shower-31";
const RECIP_MARKER_24 = "RECIP-W3-V1:a24-to-32";
const RECIP_MARKER_31 = "RECIP-W3-V1:a31-to-32";

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
      `[audit] HARD CONFLICT: targetKeyword "${NEW_TARGET}" already exists in the registry. A dedicated shower-door article exists - do NOT deploy. Resolve by editing the existing article instead.`
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
      `[audit] note: "${NEW_TARGET}" appears somewhere in the registry (likely #24/#31 searchKeywords). The purge step will strip shower terms from secondaryKeywords; searchKeyword overlap is allowed.`
    );
  }
  console.log("[audit] cannibalization audit passed (no hard conflict).");
}

// ----- Step 1: write 3 components -----

function writeComponents() {
  ensureDir(COMPONENT_DIR);
  const files = [
    "ShowerGlassWorthItAdvisor.tsx",
    "ShowerTintEdgeViewer.tsx",
    "ShowerGlassCostCalculator.tsx",
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
  const srcCopy = path.join(ROOT, "edit", `page-article-32-${SLUG}.tsx.txt`);
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
    `    title: "Low Iron Glass for Shower Doors: Is It Worth It?",`,
    `    excerpt: "A shower door is tempered safety glass either way - low iron just removes the green tint at the edge. A factory buyer guide to when it is worth the premium, which thickness, heat soak, coatings and the real cost on a shower job.",`,
    `    targetKeyword: '${NEW_TARGET}',`,
    `    secondaryKeywords: [`,
    ...NEW_SECONDARIES.map((s) => `      '${s}',`),
    `    ],`,
    `    searchKeywords: [`,
    `      'low iron glass shower door', 'low iron shower glass', 'ultra clear shower door',`,
    `      'starphire shower glass', 'frameless low iron shower', 'low iron shower screen',`,
    `      'low iron glass', 'frameless shower glass', 'shower glass green tint',`,
    `      'tempered shower glass', 'EN 12150', 'EN 14179', 'ASTM C1048',`,
    `      '\\u6dcb\\u6d74\\u623f\\u8d85\\u767d\\u73bb\\u7483', '\\u4f4e\\u94c1\\u6dcb\\u6d74\\u95e8', '\\u8d85\\u767d\\u6dcb\\u6d74\\u73bb\\u7483',`,
    `    ],`,
    `    publishDate: '2026-11-18',`,
    `    category: 'Buyer Guide' as const,`,
    `    tags: ['low iron glass', 'shower door', 'frameless shower', 'ultra clear', 'tempered glass'],`,
    `    heroImage: '/images/blog/low-iron-glass-shower-door-hero.webp',`,
    `    heroImageAlt: "A frameless walk-in shower with thick low iron glass panels showing a colorless polished edge, beside a standard clear glass panel with a visible green edge, warm bathroom lighting on dark stone tile",`,
    `    heroImagePrompt: "Interior architectural photography: a modern frameless walk-in shower enclosure built from thick 12mm glass panels on dark natural stone tile. The main panel is low iron glass with a completely colorless, crisp polished edge. A second panel at the left edge of frame is standard clear glass showing a distinct green edge for contrast. Warm diffused bathroom lighting rakes across the polished glass edges to reveal the color difference. Clean minimalist spa bathroom, no humans, no text, no brand logos, no visible fixtures clutter. 16:9 cinematic composition, 4K photorealistic, architectural digest quality. Matches the #26/#27/#28/#29/#30/#31 dark-material series.",`,
    `    author: DEFAULT_AUTHOR,`,
    `    readingTime: 10,`,
    `    featured: false,`,
    `    reviewedBy: { name: 'Albar', title: 'Technical Lead' },`,
    `    articleType: 'buyer-guide' as const,`,
    `    cluster: 'application',`,
    `    relatedProductSlugs: ['tempered-glass', 'laminated-glass'],`,
    `    translations: {},`,
    `    changelog: [`,
    `      { date: '2026-11-18', note: "Initial publish - W3-#12 Low Iron cluster application spoke" },`,
    `    ],`,
    `    tldr: [`,
    `      "Low iron shower glass is the ultra-clear version of a normal tempered shower panel - same strength, no green tint.",`,
    `      "Worth the premium on frameless 8-12 mm enclosures where the edge is exposed; optional on thin framed screens.",`,
    `      "The green of standard glass compounds with thickness, so thicker and more exposed panels make the strongest case.",`,
    `      "Heat soak is advised for frameless panels and is an application decision, not a low iron one.",`,
    `      "Budget about 20 to 25 percent over standard clear on the glass, a smaller share once hardware and install are counted.",`,
    `    ],`,
    `    buyerFaq: [`,
    `      { q: "Can you cut low iron shower panels to my hinge and handle cut-outs?", a: "Yes. Send the panel sizes with hinge and handle cut-out positions and we confirm temperability and edgework before quoting." },`,
    `      { q: "Do you heat soak and certify frameless shower panels?", a: "Yes, to EN 14179 on request, which we advise for frameless panels. Certificates travel with the shipment." },`,
    `      { q: "What is the lead time on low iron shower glass?", a: "Typically 10 to 15 working days tempered-only, 15 to 20 with heat soak or an easy-clean coating, from order confirmation at our Wuhan facility." },`,
    `    ],`,
    "  },",
  ];

  const entry = entryLines.join(EOL);
  const updated = raw.replace(anchor, `$1${EOL}${entry}$2`);
  fs.writeFileSync(REGISTRY_PATH, updated, "utf8");
  console.log(`[registry] inserted entry for ${SLUG}`);
}

// ----- Step 4: purge 'shower' terms from an entry's secondaryKeywords -----

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
  const forbidden = /["'][^"']*shower[^"']*["'],?\s*/gi;
  const cleaned = body.replace(forbidden, "");
  backup(REGISTRY_PATH);
  if (cleaned === body) {
    console.log(`[purge ${slug}] no 'shower' term in secondaryKeywords`);
    const marked = raw.replace(entryRe, `$1$2$3${EOL}    // ${marker}: scanned, nothing to purge`);
    fs.writeFileSync(REGISTRY_PATH, marked, "utf8");
    return;
  }
  const updated = raw.replace(
    entryRe,
    `$1${cleaned}$3${EOL}    // ${marker}: purged shower terms (ownership -> ${SLUG})`
  );
  fs.writeFileSync(REGISTRY_PATH, updated, "utf8");
  console.log(`[purge ${slug}] purged shower terms from secondaryKeywords`);
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
    '          <div className="text-xs font-semibold uppercase tracking-wide text-sky-800">Related buyer guide</div>',
    '          <p className="mt-2 text-sm text-slate-700">',
    '            Fitting out a frameless shower? Our buyer guide covers when ultra-clear glass',
    '            is worth the premium, the right thickness, heat soak and the real cost on a shower job.',
    '          </p>',
    '          <a href="/blog/low-iron-glass-shower-door" className="mt-3 inline-block text-sm font-semibold text-sky-900 underline">',
    '            Read: Low Iron Glass for Shower Doors - Is It Worth It? &rarr;',
    '          </a>',
    '        </aside>',
  ];
  patchRecip(PILLAR_SLUG, RECIP_MARKER_24, calloutToSpoke);
  patchRecip(TEMPERED_SLUG, RECIP_MARKER_31, calloutToSpoke);
}

// ----- Run -----

function main() {
  console.log(`Deploying article #32 (W3-#12): ${SLUG}`);
  console.log(`Project root: ${ROOT}`);
  auditCannibalization();
  writeComponents();
  writePage();
  insertRegistry();
  purgeEntry(PILLAR_SLUG, PURGE_MARKER_24);
  purgeEntry(SIBLING_SLUG, PURGE_MARKER_25);
  purgeEntry(TEMPERED_SLUG, PURGE_MARKER_31);
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
  console.log("  3) Save hero to /public/images/blog/low-iron-glass-shower-door-hero.webp");
  console.log("  4) git add + commit + push (Vercel auto-deploys)");
  console.log("  5) GSC URL inspection + request indexing");
  console.log("  6) ES mirror: scripts/translate-all.mjs");
}

main();
