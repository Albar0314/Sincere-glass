/**
 * Article #26 - Insulated Glass: The Complete Guide (Pillar)
 * Target: insulated glass (Vol 2,400 Intent=C / KD 30)
 * Cluster: product, isPillar: true, featured: true
 *
 * Idempotent: safe to re-run. Skips files that already exist and skips registry
 * append if the slug is already present.
 *
 * Usage (from project root):
 *   node edit\deploy-article-26.mjs
 * Then:
 *   npm run build
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SLUG = "insulated-glass-complete-guide";

// -------- Paths --------
const SRC_COMPONENTS_DIR = path.join(ROOT, "src", "components", "blog", "article-26");
const SRC_PAGE_DIR = path.join(ROOT, "src", "app", "blog", SLUG);
const REGISTRY_PATH = path.join(ROOT, "src", "lib", "blog-registry.ts");
const EDIT_DIR = __dirname;

// Source templates (in edit/)
const TEMPLATES = {
  "IGUConfigurator.tsx.txt": path.join(SRC_COMPONENTS_DIR, "IGUConfigurator.tsx"),
  "ThermalPerformanceChart.tsx.txt": path.join(SRC_COMPONENTS_DIR, "ThermalPerformanceChart.tsx"),
  "CondensationRiskSimulator.tsx.txt": path.join(SRC_COMPONENTS_DIR, "CondensationRiskSimulator.tsx"),
  "page-article-26-insulated-glass-pillar.tsx.txt": path.join(SRC_PAGE_DIR, "page.tsx"),
};

function readRaw(p) {
  // Strip UTF-8 BOM (U+FEFF) if present at file start
  const raw = fs.readFileSync(p, "utf8");
  return raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function log(msg) {
  console.log(`[deploy-article-26] ${msg}`);
}

function fail(msg) {
  console.error(`[deploy-article-26] FATAL: ${msg}`);
  process.exit(1);
}

// -------- 1. Verify templates exist --------
for (const src of Object.keys(TEMPLATES)) {
  const srcPath = path.join(EDIT_DIR, src);
  if (!fs.existsSync(srcPath)) {
    fail(`Template missing: ${srcPath}. Place all .tsx.txt files in edit\\ before running.`);
  }
}
log("All 4 templates found in edit\\.");

// -------- 2. Copy templates to final paths --------
ensureDir(SRC_COMPONENTS_DIR);
ensureDir(SRC_PAGE_DIR);

for (const [src, dest] of Object.entries(TEMPLATES)) {
  const srcPath = path.join(EDIT_DIR, src);
  const content = readRaw(srcPath);
  if (fs.existsSync(dest)) {
    const existing = readRaw(dest);
    if (existing === content) {
      log(`Unchanged, skipping: ${path.relative(ROOT, dest)}`);
      continue;
    }
  }
  fs.writeFileSync(dest, content, "utf8");
  log(`Wrote: ${path.relative(ROOT, dest)} (${content.length} bytes)`);
}

// -------- 3. Append registry entry --------
if (!fs.existsSync(REGISTRY_PATH)) {
  fail(`blog-registry.ts not found at ${REGISTRY_PATH}`);
}

const registryRaw = readRaw(REGISTRY_PATH);

// Idempotency check: skip if slug is already in the registry
if (registryRaw.includes(`slug: '${SLUG}'`) || registryRaw.includes(`slug: "${SLUG}"`)) {
  log(`Registry already contains slug ${SLUG}. Skipping registry append.`);
  log("Deploy complete. Next: run `npm run build`.");
  process.exit(0);
}

// Backup first
const backupPath = REGISTRY_PATH + ".bak";
fs.writeFileSync(backupPath, registryRaw, "utf8");
log(`Registry backup written: ${path.relative(ROOT, backupPath)}`);

// Detect EOL used by the file
const EOL = registryRaw.includes("\r\n") ? "\r\n" : "\n";
log(`Registry EOL detected: ${EOL === "\r\n" ? "CRLF" : "LF"}`);

// CRLF-tolerant anchor for the end of the blogArticles array
const anchorRegex = /(\r?\n {2}},)(\r?\n\];\r?\n\r?\n\/\/ ---- Utility functions)/;
const match = registryRaw.match(anchorRegex);
if (!match) {
  const tail = registryRaw.slice(-500);
  console.error("[deploy-article-26] Anchor not found. Last 500 chars of registry:");
  console.error("--- TAIL ---");
  console.error(tail);
  console.error("--- END TAIL ---");
  fail("Could not locate end-of-array anchor. Registry structure may have changed. Inspect tail above and update anchorRegex in this script.");
}

// Build the entry. Strings with apostrophes use double quotes.
const entry =
  `${EOL}` +
  `  // GROK-INSERT-V1:article-26-insulated-glass-pillar${EOL}` +
  `  {${EOL}` +
  `    slug: "${SLUG}",${EOL}` +
  `    title: "Insulated Glass: The Complete Guide to IGU Specification, Performance and Procurement",${EOL}` +
  `    excerpt: "Five components, four performance metrics, one 25-year sealed system. A specifier guide to IGU build-ups by climate, dew-point math, jumbo-size limits, and procurement reality from a Wuhan factory with dedicated jumbo IGU lines to 3.3m x 15m.",${EOL}` +
  `    targetKeyword: "insulated glass",${EOL}` +
  `    secondaryKeywords: [${EOL}` +
  `      "insulated glass units",${EOL}` +
  `      "insulated glass unit",${EOL}` +
  `      "insulated glass panels",${EOL}` +
  `      "insulated glazing",${EOL}` +
  `      "IGU specification",${EOL}` +
  `      "double pane glass",${EOL}` +
  `      "triple pane IGU",${EOL}` +
  `    ],${EOL}` +
  `    searchKeywords: [${EOL}` +
  `      "insulated glass", "insulated glass unit", "insulated glass units",${EOL}` +
  `      "insulated glazing", "insulated glass panels", "IGU", "DGU",${EOL}` +
  `      "double pane glass", "double glazed unit", "triple pane IGU",${EOL}` +
  `      "sealed glass unit", "argon filled glass", "warm edge spacer",${EOL}` +
  `      "U-value glass", "SHGC glass", "Low-E IGU",${EOL}` +
  `      "中空玻璃", "中空玻璃单元", "中空玻璃规格",${EOL}` +
  `      "双层中空", "三层中空", "氩气中空玻璃",${EOL}` +
  `    ],${EOL}` +
  `    publishDate: "2026-11-04",${EOL}` +
  `    updatedDate: "2026-11-04",${EOL}` +
  `    category: "Product Knowledge" as const,${EOL}` +
  `    tags: ["insulated glass", "IGU", "pillar", "U-value", "Low-E", "argon", "specification", "architectural glass"],${EOL}` +
  `    heroImage: "/images/blog/insulated-glass-pillar-hero.webp",${EOL}` +
  `    heroImageAlt: "Cross-section view of an insulated glass unit showing two glass lites, aluminum spacer bar with desiccant, PIB primary seal and silicone secondary seal, with argon gas filling the cavity",${EOL}` +
  `    heroImagePrompt: "Studio product photography, close-up cross-section of a modern architectural insulated glass unit (IGU) displayed on polished dark concrete surface. Two parallel clear glass lites (approximately 6mm each) separated by a visible aluminum spacer bar with small perforations showing the desiccant beads inside. Thin black PIB primary seal visible between glass and spacer. Wider grey silicone secondary seal visible around the outer perimeter. Subtle gold-blue tint on the inner surface of one lite indicating Low-E coating. Faint visualization of argon gas filling the cavity. 30-degree elevated camera angle showing edge detail, soft daylight from above-left, shallow depth of field focused on the seal construction. Clean neutral grey background, warm amber accent lighting, no humans, no text. 4K photorealistic, museum-exhibit quality, product catalog aesthetic.",${EOL}` +
  `    author: DEFAULT_AUTHOR,${EOL}` +
  `    readingTime: 18,${EOL}` +
  `    featured: true,${EOL}` +
  `    isPillar: true,${EOL}` +
  `    reviewedBy: { name: "Albar", title: "Technical Lead" },${EOL}` +
  `    articleType: "buyer-guide" as const,${EOL}` +
  `    cluster: "product",${EOL}` +
  `    relatedProductSlugs: ["insulated-glass", "low-e-glass", "laminated-glass"],${EOL}` +
  `    tldr: [${EOL}` +
  `      "An IGU is a sealed multi-pane assembly whose cavity is the functional part, not just two panes of glass.",${EOL}` +
  `      "Four specs decide selection: U-value, SHGC, VLT, STC. The right balance depends on climate, not a single best IGU.",${EOL}` +
  `      "25-year reliability is decided at the edge seal, not the glass. Insist on dual-seal (PIB + silicone) for architectural work.",${EOL}` +
  `      "Jumbo IGU above 3m x 6m needs dedicated production lines; our Wuhan facility runs to 3.3m x 15m.",${EOL}` +
  `    ],${EOL}` +
  `    translations: {},${EOL}` +
  `    changelog: [${EOL}` +
  `      { date: "2026-11-04", note: "Initial publish - Pillar Page for Insulated Glass cluster" },${EOL}` +
  `    ],${EOL}` +
  `  },`;

const replacement = match[1] + entry + match[2];
const newRegistry = registryRaw.replace(anchorRegex, replacement);

if (newRegistry === registryRaw) {
  fail("Replacement returned identical content. Insertion failed silently.");
}

fs.writeFileSync(REGISTRY_PATH, newRegistry, "utf8");
log(`Registry entry appended for ${SLUG}.`);

log("");
log("DEPLOY COMPLETE.");
log("Next steps:");
log("  1. npm run build");
log("  2. Verify: findstr /n \"insulated-glass-complete-guide\" src\\lib\\blog-registry.ts");
log("  3. git add . && git commit -m \"feat(blog): Article #26 Insulated Glass Pillar\" && git push");
log("  4. After Vercel deploy, submit URL to GSC: https://sincereglass.com/blog/insulated-glass-complete-guide");
log("");
log("If build fails, restore registry with: copy /Y src\\lib\\blog-registry.ts.bak src\\lib\\blog-registry.ts");
