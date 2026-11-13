// deploy-article-29.mjs  — Article #29: U-Factor and SHGC Explained (W2-#8)
//
// HOW TO RUN (from repo root):
//   1. Put this file + the 4 .tsx.txt source files together in one folder (e.g. the edit/ folder):
//        UFactorRValueConverter.tsx.txt
//        ShgcClimateAdvisor.tsx.txt
//        WindowLabelDecoder.tsx.txt
//        page-article-29-u-factor-and-shgc-explained.tsx.txt
//   2. cd D:\桌面\sincere-glass\sincere-glass
//   3. node edit\deploy-article-29.mjs
//   4. npm run build
//
// SAFE BY DESIGN:
//   - Reads the 4 source files from ITS OWN directory, writes to src/ under the repo root (cwd).
//   - Runs the keyword cannibalization audit against the REAL local blog-registry.ts at run time
//     (the project snapshot is stale). Hard rule 1 conflict -> exits WITHOUT writing anything.
//   - Idempotent: stops if the slug is already registered.
//   - Backs up every file it touches to <file>.bak before writing.
//   - CRLF-tolerant registry anchor (per 2026-11-03 Article #25 incident).
//   - Does NOT touch sibling article page.tsx files (reciprocal inbound links are a manual step;
//     those files are not read here, and the project rule is: Read before patch).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // folder holding the .tsx.txt sources
const ROOT = process.cwd(); // repo root
const SLUG = "u-factor-and-shgc-explained";
const TAG = "[deploy-29]";

function die(msg, code = 1) {
  console.error(TAG + " " + msg);
  process.exit(code);
}
function backup(file) {
  if (fs.existsSync(file)) {
    const b = file + ".bak";
    if (!fs.existsSync(b)) fs.copyFileSync(file, b);
  }
}
function detectEOL(s) {
  return s.includes("\r\n") ? "\r\n" : "\n";
}

const SRC_FILES = [
  { from: "UFactorRValueConverter.tsx.txt", to: ["src", "components", "blog", "UFactorRValueConverter.tsx"] },
  { from: "ShgcClimateAdvisor.tsx.txt", to: ["src", "components", "blog", "ShgcClimateAdvisor.tsx"] },
  { from: "WindowLabelDecoder.tsx.txt", to: ["src", "components", "blog", "WindowLabelDecoder.tsx"] },
  { from: "page-article-29-u-factor-and-shgc-explained.tsx.txt", to: ["src", "app", "blog", SLUG, "page.tsx"] },
];

// ---- 0. preflight ----
for (const f of SRC_FILES) {
  const sp = path.join(HERE, f.from);
  if (!fs.existsSync(sp)) die("missing source file: " + sp + " (put all 4 .tsx.txt next to this script)");
}
const REG = path.join(ROOT, "src", "lib", "blog-registry.ts");
if (!fs.existsSync(REG)) die("blog-registry.ts not found at " + REG + " - run from repo root");

let reg = fs.readFileSync(REG, "utf8");
const EOL = detectEOL(reg);

// ---- 1. idempotency ----
if (reg.includes("slug: '" + SLUG + "'") || reg.includes('slug: "' + SLUG + '"')) {
  die("registry already contains slug " + SLUG + " - idempotent stop (nothing written)", 0);
}

// ---- 2. cannibalization audit vs the REAL registry (read-only, fail-safe) ----
const NEW_TARGET = "u factor windows";
const NEW_SECONDARIES = ["shgc", "solar heat gain coefficient", "u factor vs shgc", "what is shgc", "u value windows"];
const CLAIMED = ["u factor windows", "u-factor windows", "shgc", "solar heat gain coefficient", "u value windows", "u factor vs shgc"];

const targets = [...reg.matchAll(/targetKeyword:\s*['"]([^'"]+)['"]/g)].map((m) => m[1].toLowerCase());
const secBlocks = [...reg.matchAll(/secondaryKeywords:\s*\[([\s\S]*?)\]/g)].map((m) => m[1]);
const secValues = [];
for (const b of secBlocks) for (const mm of b.matchAll(/['"]([^'"]+)['"]/g)) secValues.push(mm[1].toLowerCase());

const conflicts = [];
if (targets.includes(NEW_TARGET)) conflicts.push("new targetKeyword '" + NEW_TARGET + "' is already a targetKeyword elsewhere");
if (secValues.includes(NEW_TARGET)) conflicts.push("new targetKeyword '" + NEW_TARGET + "' already sits in some secondaryKeywords (hard rule 1)");
for (const s of NEW_SECONDARIES) if (targets.includes(s)) conflicts.push("my secondary '" + s + "' is an existing targetKeyword");

if (conflicts.length) {
  console.error(TAG + " CANNIBALIZATION CONFLICT - nothing written:");
  for (const c of conflicts) console.error("   - " + c);
  console.error(TAG + " Resolve first: purge the term from the older / lower-GSC article, or re-target #29, then re-run.");
  process.exit(2);
}

const dilute = CLAIMED.filter((t) => secValues.includes(t));
if (dilute.length) {
  console.warn(TAG + " WARNING: these #29 terms also appear in other entries' secondaryKeywords:");
  for (const d of dilute) console.warn("   - " + d + "  (consider removing from the sibling so #29 owns it cleanly)");
  console.warn(TAG + " Not fatal (secondary/searchKeyword overlap is allowed). Continuing.");
}
console.log(TAG + " cannibalization audit passed (" + targets.length + " existing targetKeywords scanned).");

// ---- 3. write components + page ----
for (const f of SRC_FILES) {
  const body = fs.readFileSync(path.join(HERE, f.from), "utf8").replace(/\r?\n/g, EOL);
  const dest = path.join(ROOT, ...f.to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  backup(dest);
  fs.writeFileSync(dest, body, "utf8");
  console.log(TAG + " wrote " + path.relative(ROOT, dest));
}

// ---- 4. insert registry entry (CRLF-tolerant anchor) ----
const entry = [
  "  {",
  "    slug: '" + SLUG + "',",
  '    title: "U-Factor and SHGC Explained: What the Two Numbers on a Window Label Actually Mean",',
  '    excerpt: "U-factor rates heat loss; SHGC rates solar heat gain. One decides your winter bill, the other decides summer overheating - and the Low-E coating sets them independently. A factory guide to the two numbers every energy code checks first.",',
  "    targetKeyword: 'u factor windows',",
  "    secondaryKeywords: [",
  "      'shgc',",
  "      'solar heat gain coefficient',",
  "      'u factor vs shgc',",
  "      'what is shgc',",
  "      'u value windows',",
  "    ],",
  "    searchKeywords: [",
  "      'u factor windows', 'what is u factor', 'u-factor', 'u factor vs shgc',",
  "      'shgc', 'solar heat gain coefficient', 'what is shgc', 'u value windows',",
  "      'r value windows', 'nfrc label', 'nfrc ratings', 'visible transmittance', 'VT',",
  "      'Low-E', 'IECC climate zone', 'window energy rating',",
  "      '\\u7A97\\u6237U\\u503C', '\\u592A\\u9633\\u5F97\\u70ED\\u7CFB\\u6570', 'SHGC \\u662F\\u4EC0\\u4E48', 'U\\u503C \\u7A97\\u6237',",
  "    ],",
  "    publishDate: '2026-11-12',",
  "    category: 'Technical Guide' as const,",
  "    tags: ['insulated glass', 'U-factor', 'SHGC', 'Low-E', 'window performance', 'energy code'],",
  "    heroImage: '/images/blog/u-factor-and-shgc-explained-hero.webp',",
  '    heroImageAlt: "A single architectural glass pane on dark polished concrete, left half raked by warm low sun to suggest solar heat gain, right half cool with a faint Low-E gold sheen to suggest heat retention",',
  '    heroImagePrompt: "Studio product photography: a single large architectural insulated glass pane standing upright on polished dark concrete, lit so that the left half is raked by warm amber low-angle sunlight suggesting solar heat gain through the glass, while the right half sits in cool blue shadow with a faint breath of condensation fog near the base suggesting heat held inside. A subtle gold Low-E coating sheen runs across the whole pane. Visible slim aluminum spacer bar and dual seal at the bottom edge showing it is an insulated glass unit. 25-degree slightly elevated camera angle, shallow depth of field on the glass surface, dramatic split warm and cool lighting. Clean dark #1C1F26 background, no humans, no text, no brand logos, no label graphics. 16:9 cinematic composition. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.",',
  "    author: DEFAULT_AUTHOR,",
  "    readingTime: 12,",
  "    featured: false,",
  "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
  "    articleType: 'technical' as const,",
  "    cluster: 'technical',",
  "    relatedProductSlugs: ['insulated-glass', 'low-e-glass', 'laminated-glass'],",
  "    translations: {},",
  "    changelog: [",
  "      { date: '2026-11-12', note: 'Initial publish - Insulated cluster technical spoke (W2-8): U-factor + SHGC' },",
  "    ],",
  "  },",
].join(EOL);

const anchor = /(\r?\n\s*\},)(\r?\n\];\s*\r?\n\s*\r?\n\/\/ ---- Utility functions)/;
if (!anchor.test(reg)) {
  console.error(TAG + " registry tail anchor NOT found. Last 400 chars of blog-registry.ts:");
  console.error(reg.slice(-400));
  die("cannot locate insertion point - inspect the file tail and fix the anchor");
}
backup(REG);
reg = reg.replace(anchor, (full, g1, g2) => g1 + EOL + entry + g2);
fs.writeFileSync(REG, reg, "utf8");
console.log(TAG + " inserted registry entry for " + SLUG);

console.log("");
console.log(TAG + " DONE. Next steps:");
console.log("  1) npm run build   (verify immediately, do not batch)");
console.log("  2) Generate hero image from the prompt in claude/article-29-delivery.md -> /public/images/blog/u-factor-and-shgc-explained-hero.webp (1600x900, WebP q85)");
console.log("  3) Add reciprocal inbound links in #26 / #27 / #28 (manual patch - see delivery doc section 5)");
console.log("  4) git add/commit/push, then GSC: Request Indexing");
