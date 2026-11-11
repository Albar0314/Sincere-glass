// deploy-article-28.mjs
// Deploy script for W2-#7: argon-vs-krypton-gas-fill-igu
//
// Idempotent. CRLF-tolerant. Safe to re-run.
// - Writes 3 interactive components to src/components/blog/article-28/
// - Writes page.tsx to src/app/blog/argon-vs-krypton-gas-fill-igu/
// - Inserts registry entry into src/lib/blog-registry.ts (skip if slug present)
// - Pillar-spoke cannib purge: strips argon/krypton/gas-fill terms from
//   #26 (insulated-glass-complete-guide) secondaryKeywords
// - Minor cannib purge: strips 'argon fill IGU' from #5 how-is-insulated-glass-made secondaryKeywords
// - Reciprocal link patches: #26 Pillar + #27 double-pane-vs-triple-pane + #5 how-is-insulated-glass-made
//   (the #5 patch also pays down the W1-#4 debt by adding the #26 Pillar inbound link)
// - Every file touched is backed up to .bak before write
//
// Run from project root:  node deploy-article-28.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SLUG = "argon-vs-krypton-gas-fill-igu";
const COMPONENT_DIR = path.join(ROOT, "src", "components", "blog", "article-28");
const PAGE_DIR = path.join(ROOT, "src", "app", "blog", SLUG);
const REGISTRY_PATH = path.join(ROOT, "src", "lib", "blog-registry.ts");

const PILLAR_SLUG = "insulated-glass-complete-guide";
const SPOKE_27_SLUG = "double-pane-vs-triple-pane-glass";
const TECHNICAL_5_SLUG = "how-is-insulated-glass-made";
const W1_DEBT_PATCH_MARKER = "GROK-INSERT-V1:w1-4-pillar-link";
const SPOKE_27_PATCH_MARKER = "GROK-INSERT-V1:a28-gas-link";
const PILLAR_26_PATCH_MARKER = "GROK-INSERT-V1:a28-pillar-link";
const CANNIB_PURGE_MARKER_26 = "GROK-PURGE-V1:a28-gas-fill-26";
const CANNIB_PURGE_MARKER_5 = "GROK-PURGE-V1:a28-gas-fill-5";

// ----- Utilities -----

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function backup(filePath) {
  if (fs.existsSync(filePath)) {
    const bak = filePath + ".bak";
    fs.copyFileSync(filePath, bak);
  }
}

function writeUtf8(filePath, content) {
  // No BOM. UTF-8. Preserve existing EOL style if replacing a file.
  fs.writeFileSync(filePath, content, "utf8");
}

function detectEol(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}

function readIfExists(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

// ----- Step 1: write 3 components -----

function writeComponents() {
  ensureDir(COMPONENT_DIR);
  const files = [
    "GasConductivityComparator.tsx",
    "CavityWidthOptimizer.tsx",
    "GasCostROICalculator.tsx",
  ];
  for (const f of files) {
    const target = path.join(COMPONENT_DIR, f);
    const srcCopy = path.join(ROOT, "edit", `${f}.txt`);
    if (!fs.existsSync(srcCopy)) {
      throw new Error(`Missing source: ${srcCopy}`);
    }
    backup(target);
    fs.copyFileSync(srcCopy, target);
    console.log(`[components] wrote ${target}`);
  }
}

// ----- Step 2: write page.tsx -----

function writePage() {
  ensureDir(PAGE_DIR);
  const target = path.join(PAGE_DIR, "page.tsx");
  const srcCopy = path.join(ROOT, "edit", `page-article-28-${SLUG}.tsx.txt`);
  if (!fs.existsSync(srcCopy)) {
    throw new Error(`Missing source: ${srcCopy}`);
  }
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

  // CRLF-tolerant anchor: match the closing of blogArticles array before the utility functions.
  const anchor = /(\r?\n\s*\},)(\r?\n\];\s*\r?\n\s*\r?\n\/\/ ---- Utility functions)/;
  if (!anchor.test(raw)) {
    throw new Error(
      "[registry] anchor not found. Expected '  },\\n];\\n\\n// ---- Utility functions'. Inspect blog-registry.ts tail."
    );
  }

  const entryLines = [
    `  {`,
    `    slug: '${SLUG}',`,
    `    title: 'Argon vs Krypton Gas Fill for IGU: When the Premium Pays Back and When It Does Not',`,
    `    excerpt: "Argon wins 95% of IGU gas-fill decisions. Krypton earns its 10x premium only when the cavity must stay below 10mm. A factory breakdown of thermal conductivity, cavity width physics, leak rates, and the 25-year ROI math.",`,
    `    targetKeyword: 'argon gas windows',`,
    `    secondaryKeywords: [`,
    `      'krypton gas windows',`,
    `      'argon vs krypton',`,
    `      'igu gas fill',`,
    `      'gas filled windows',`,
    `      'argon filled double glazing',`,
    `    ],`,
    `    searchKeywords: [`,
    `      'argon gas windows', 'krypton gas windows', 'argon vs krypton',`,
    `      'IGU gas fill', 'gas filled IGU', 'argon filled double glazing',`,
    `      'krypton gas fill', 'IGU argon fill rate', 'noble gas fill IGU',`,
    `      'IGU', 'U-factor', 'EN 1279-3', 'EN 673', 'Low-E', 'warm edge spacer',`,
    `      'Passive House windows', 'thermal conductivity gas fill',`,
    `      '\\u6c29\\u6c14\\u4e2d\\u7a7a\\u73bb\\u7483', '\\u6c2a\\u6c14\\u4e2d\\u7a7a\\u73bb\\u7483', '\\u60f0\\u6027\\u6c14\\u4f53 \\u4e2d\\u7a7a',`,
    `    ],`,
    `    publishDate: '2026-11-11',`,
    `    category: 'Technical Guide' as const,`,
    `    tags: ['insulated glass', 'IGU', 'argon', 'krypton', 'gas fill', 'U-factor', 'EN 1279'],`,
    `    heroImage: '/images/blog/argon-vs-krypton-gas-fill-hero.webp',`,
    `    heroImageAlt: "Cutaway view of two IGU cross-sections side by side on dark polished concrete, one labeled with amber argon-fill gas glow and the other with cool emerald krypton-fill gas glow, showing aluminum spacer bars and Low-E coatings on the inner surfaces",`,
    `    heroImagePrompt: "Studio product photography: two architectural IGU cross-sections side by side on polished dark concrete. Left sample: a 4mm-12mm-4mm insulated glass unit with argon fill rendered as subtle amber glow inside the cavity, visible aluminum spacer bar with desiccant beads, dual seal black PIB primary and translucent silicone secondary, subtle gold Low-E coating on inner surface. Right sample: a 4mm-8mm-4mm insulated glass unit with krypton fill rendered as subtle emerald glow inside the cavity, narrower cavity width clearly visible, same spacer and seal construction, subtle gold Low-E coating. Both samples lit from above-left with warm amber accent lighting raking across the glass edges highlighting the spacer bars and desiccant beads. 25-degree slightly-elevated camera angle. Shallow depth of field focused precisely on both cross-sections simultaneously. Clean dark #1C1F26 background, no humans, no text, no brand logos. 16:9 cinematic composition. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.",`,
    `    author: DEFAULT_AUTHOR,`,
    `    readingTime: 13,`,
    `    featured: false,`,
    `    reviewedBy: { name: 'Albar', title: 'Technical Lead' },`,
    `    articleType: 'technical' as const,`,
    `    cluster: 'technical',`,
    `    relatedProductSlugs: ['insulated-glass', 'low-e-glass', 'laminated-glass'],`,
    `    translations: {},`,
    `    changelog: [`,
    `      { date: '2026-11-11', note: 'Initial publish - W2-#7 Insulated Glass cluster spoke' },`,
    `    ],`,
    `    tldr: [`,
    `      'Argon is the right fill for 95% of IGU orders. Spec 90% minimum at 12-16mm cavity width.',`,
    `      'Krypton is only worth the 10x premium when the cavity must stay below 10mm - a Passive House retrofit or slim-profile curtain wall.',`,
    `      'Krypton optimizes at 8-10mm; argon optimizes at 14-16mm. At 20mm both give the same U-value.',`,
    `      'Every IGU leaks. Dual-seal with PIB primary and silicone secondary hits 0.3-0.7% argon loss per year under EN 1279-3.',`,
    `      'Xenon is thermally superior and commercially irrelevant - price it against a better Low-E coating or an extra pane instead.',`,
    `    ],`,
    `    buyerFaq: [`,
    `      { q: 'What is your MOQ for krypton-filled IGU?', a: 'Minimum 50 m2 per spec per order for krypton fill, due to batch economics of noble gas handling. Argon has no krypton-related MOQ - it runs on our standard IGU line.' },`,
    `      { q: 'Do you provide EN 1279-3 test certificates?', a: 'Yes. Every IGU production lot at our Wuhan facility is tested per EN 1279-3 accelerated protocol; certificates travel with the shipment paperwork.' },`,
    `      { q: 'Lead time for argon vs krypton IGU?', a: 'Argon: 10-15 working days from order confirmation. Krypton: 15-20 working days, since we batch krypton runs once per week to minimize gas waste.' },`,
    `    ],`,
    "  },",
  ];

  const entry = entryLines.join(EOL);
  const updated = raw.replace(anchor, `$1${EOL}${entry}$2`);
  writeUtf8(REGISTRY_PATH, updated);
  console.log(`[registry] inserted entry for ${SLUG}`);
}

// ----- Step 4: Pillar-spoke cannib purge on #26 -----

function purgePillar26() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  if (raw.includes(CANNIB_PURGE_MARKER_26)) {
    console.log("[purge 26] already applied, skipping");
    return;
  }
  const EOL = detectEol(raw);

  // Locate the #26 entry
  const entryRe = new RegExp(
    `(slug:\\s*['\"]${PILLAR_SLUG}['\"][\\s\\S]*?secondaryKeywords:\\s*\\[)([\\s\\S]*?)(\\])`
  );
  const m = raw.match(entryRe);
  if (!m) {
    console.log(`[purge 26] entry for ${PILLAR_SLUG} not found - skipping (may not exist yet)`);
    return;
  }
  const [full, pre, body, post] = m;
  const forbidden = /'[^']*(argon|krypton|gas fill|gas-filled|igu gas)[^']*',?\s*/gi;
  const cleaned = body.replace(forbidden, "");
  if (cleaned === body) {
    console.log("[purge 26] no argon/krypton/gas-fill terms found in #26 secondaryKeywords");
    // Still write the marker so re-runs skip.
    const marked = raw.replace(entryRe, `$1$2$3${EOL}    // ${CANNIB_PURGE_MARKER_26}: scanned, no terms to purge`);
    backup(REGISTRY_PATH);
    writeUtf8(REGISTRY_PATH, marked);
    return;
  }
  backup(REGISTRY_PATH);
  const updated = raw.replace(entryRe, `$1${cleaned}$3${EOL}    // ${CANNIB_PURGE_MARKER_26}: purged argon/krypton/gas-fill terms (ownership moved to ${SLUG})`);
  writeUtf8(REGISTRY_PATH, updated);
  console.log("[purge 26] purged argon/krypton/gas-fill terms from Pillar #26 secondaryKeywords");
}

// ----- Step 5: Technical #5 cannib purge (strip 'argon fill IGU') -----

function purgeTechnical5() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  if (raw.includes(CANNIB_PURGE_MARKER_5)) {
    console.log("[purge 5] already applied, skipping");
    return;
  }
  const EOL = detectEol(raw);
  const entryRe = new RegExp(
    `(slug:\\s*['\"]${TECHNICAL_5_SLUG}['\"][\\s\\S]*?secondaryKeywords:\\s*\\[)([\\s\\S]*?)(\\])`
  );
  const m = raw.match(entryRe);
  if (!m) {
    console.log(`[purge 5] ${TECHNICAL_5_SLUG} entry not found, skipping`);
    return;
  }
  const [, pre, body, post] = m;
  // Only purge the specific overlapping term, leave 'warm edge spacer' etc. alone.
  const cleaned = body.replace(/'argon fill igu',?\s*/gi, "");
  if (cleaned === body) {
    console.log("[purge 5] no overlapping term found in #5 secondaryKeywords");
    const marked = raw.replace(entryRe, `$1$2$3${EOL}    // ${CANNIB_PURGE_MARKER_5}: scanned, no terms to purge`);
    backup(REGISTRY_PATH);
    writeUtf8(REGISTRY_PATH, marked);
    return;
  }
  backup(REGISTRY_PATH);
  const updated = raw.replace(entryRe, `$1${cleaned}$3${EOL}    // ${CANNIB_PURGE_MARKER_5}: purged 'argon fill IGU' (ownership moved to ${SLUG})`);
  writeUtf8(REGISTRY_PATH, updated);
  console.log("[purge 5] purged 'argon fill IGU' from #5 secondaryKeywords");
}

// ----- Step 6: Reciprocal link patches -----

/**
 * Insert a callout block just before the FAQ section of a target page.
 * Idempotent via the marker comment.
 */
function patchRecipLink({ pagePath, marker, calloutJsx }) {
  const raw = readIfExists(pagePath);
  if (raw == null) {
    console.log(`[patch] target page not found: ${pagePath}, skipping`);
    return;
  }
  if (raw.includes(marker)) {
    console.log(`[patch] marker ${marker} already present in ${pagePath}, skipping`);
    return;
  }
  const EOL = detectEol(raw);
  // Anchor: insert before <section id="faq"> (or the FAQ heading section)
  const anchor = /(\r?\n\s*<section\s+id=["']faq["']>)/;
  if (!anchor.test(raw)) {
    console.log(`[patch] FAQ anchor not found in ${pagePath}, skipping`);
    return;
  }
  backup(pagePath);
  const block = `${EOL}        {/* ${marker} */}${EOL}${calloutJsx}`;
  const updated = raw.replace(anchor, `${block}$1`);
  writeUtf8(pagePath, updated);
  console.log(`[patch] inserted callout into ${pagePath}`);
}

function patchReciprocals() {
  const pillar26Page = path.join(ROOT, "src", "app", "blog", PILLAR_SLUG, "page.tsx");
  const spoke27Page = path.join(ROOT, "src", "app", "blog", SPOKE_27_SLUG, "page.tsx");
  const tech5Page = path.join(ROOT, "src", "app", "blog", TECHNICAL_5_SLUG, "page.tsx");

  const calloutToA28 = [
    `        <aside className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">`,
    `          <div className="text-xs font-semibold uppercase tracking-wide text-amber-800">Related deep-dive</div>`,
    `          <p className="mt-2 text-sm text-slate-700">`,
    `            Choosing between argon and krypton for your IGU fill? Our full breakdown covers`,
    `            thermal conductivity, cavity width physics, EN 1279-3 leak rates, and when the`,
    `            krypton premium actually pays back.`,
    `          </p>`,
    `          <a href="/blog/argon-vs-krypton-gas-fill-igu" className="mt-3 inline-block text-sm font-semibold text-amber-900 underline">`,
    `            Read: Argon vs Krypton Gas Fill for IGU &rarr;`,
    `          </a>`,
    `        </aside>`,
  ].join("\n");

  // Patch Pillar #26: inbound link to this new spoke
  patchRecipLink({
    pagePath: pillar26Page,
    marker: PILLAR_26_PATCH_MARKER,
    calloutJsx: calloutToA28,
  });

  // Patch #27 (double-pane-vs-triple-pane): inbound link to this spoke
  patchRecipLink({
    pagePath: spoke27Page,
    marker: SPOKE_27_PATCH_MARKER,
    calloutJsx: calloutToA28,
  });

  // Patch #5 (how-is-insulated-glass-made):
  // 1) inbound link to this spoke (#28 gas-fill)
  // 2) inbound link to #26 Pillar (W1-#4 debt payment)
  patchRecipLink({
    pagePath: tech5Page,
    marker: SPOKE_27_PATCH_MARKER + "-5", // unique marker
    calloutJsx: calloutToA28,
  });

  const calloutToPillar26 = [
    `        <aside className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">`,
    `          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-800">The complete IGU picture</div>`,
    `          <p className="mt-2 text-sm text-slate-700">`,
    `            This article walks the manufacturing process. For the full buyer's guide to`,
    `            IGU selection - thermal, acoustic, specification, pricing - start at the pillar.`,
    `          </p>`,
    `          <a href="/blog/insulated-glass-complete-guide" className="mt-3 inline-block text-sm font-semibold text-emerald-900 underline">`,
    `            Read: The Complete Guide to Insulated Glass &rarr;`,
    `          </a>`,
    `        </aside>`,
  ].join("\n");

  patchRecipLink({
    pagePath: tech5Page,
    marker: W1_DEBT_PATCH_MARKER,
    calloutJsx: calloutToPillar26,
  });
}

// ----- Run -----

function main() {
  console.log(`Deploying article #28: ${SLUG}`);
  console.log(`Project root: ${ROOT}`);
  writeComponents();
  writePage();
  insertRegistry();
  purgePillar26();
  purgeTechnical5();
  patchReciprocals();
  console.log("");
  console.log("Deploy complete. Next steps:");
  console.log("  1) npm run build   # verify TypeScript + SWC compile");
  console.log("  2) Generate hero image from the prompt in blog-registry.ts entry");
  console.log("  3) Save hero to /public/images/blog/argon-vs-krypton-gas-fill-hero.webp");
  console.log("  4) git add + commit + push (Vercel auto-deploys)");
  console.log("  5) GSC URL inspection + request indexing");
}

main();
