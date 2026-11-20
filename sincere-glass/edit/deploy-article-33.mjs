// deploy-article-33.mjs  (W3-#13: starphire-vs-low-iron)
// Run from project root:  node edit\deploy-article-33.mjs  then  npm run build
//
// Safety design (per project lessons):
//  - HALTS if targetKeyword already live, or if slug entry already exists (idempotent).
//  - Registry insert uses a SPECIFIC anchor, never lastIndexOf('];').
//  - Keyword purge removes tokens at the SOURCE (no marker comment after `]`),
//    so the purge-comma build bug (#31/#32) cannot recur.
//  - Every file touched is backed up to <file>.bak-33 before writing.
//  - Reciprocal inbound links patched into #24 + #25 with a unique marker (idempotent);
//    if an anchor is missing it WARNS with the file tail and leaves the page intact.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");

const SLUG = "starphire-vs-low-iron";
const TARGET = "starphire vs low iron";
const RECIP_MARKER = "SG-RECIP-W3-13-V1";

const REGISTRY = path.join(ROOT, "src", "lib", "blog-registry.ts");
const COMP_DIR = path.join(ROOT, "src", "components", "blog", "article-33");
const PAGE_DIR = path.join(ROOT, "src", "app", "blog", SLUG);

const COMPONENTS = [
  "StarphireValueAdvisor",
  "BrandClarityComparator",
  "StarphirePremiumCalculator",
];

function backup(file) {
  if (fs.existsSync(file)) fs.copyFileSync(file, file + ".bak-33");
}
function readTxt(name) {
  return fs.readFileSync(path.join(EDIT, name), "utf8");
}
function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------- guards
let registrySrc = fs.readFileSync(REGISTRY, "utf8");

if (registrySrc.includes(`slug: '${SLUG}'`) || registrySrc.includes(`slug: "${SLUG}"`)) {
  console.error(`HALT: registry already has an entry for slug '${SLUG}'. Nothing changed.`);
  process.exit(1);
}
// targetKeyword collision = real cannibalization gate (can't see full live registry from the planning side)
const targetRe = new RegExp(`targetKeyword:\\s*['"]${esc(TARGET)}['"]`);
if (targetRe.test(registrySrc)) {
  console.error(`HALT: targetKeyword "${TARGET}" already exists on another article. Resolve cannibalization before deploying.`);
  process.exit(1);
}

// ---------------------------------------------------------------- registry entry
const ENTRY = `  {
    slug: '${SLUG}',
    title: 'Starphire vs Low Iron Glass: Is the Brand Worth It?',
    excerpt:
      'Starphire is a brand of low iron glass, not a clearer material. See how it compares with Optiwhite, Diamant and generic low-iron, what the brand premium costs, and when it is actually worth paying for.',
    targetKeyword: '${TARGET}',
    secondaryKeywords: [
      'starphire glass',
      'starphire vs optiwhite',
      'low iron glass brands',
      'ppg starphire glass',
      'is starphire glass worth it',
    ],
    searchKeywords: [
      'starphire vs low iron',
      'starphire glass',
      'starphire vs optiwhite',
      'starphire vs diamant',
      'low iron glass brands',
      'ultra clear glass brands',
      'ppg starphire',
      'vitro starphire',
      'is starphire worth it',
      'starphire glass price',
      'low iron glass vs starphire',
      'best low iron glass',
    ],
    publishDate: '2026-11-19',
    category: 'Buyer Guide',
    cluster: 'comparison',
    articleType: 'comparison',
    tags: ['low iron glass', 'starphire', 'ultra clear glass', 'glass comparison', 'buyer guide'],
    heroImage: '/images/blog/${SLUG}-hero.webp',
    heroImageAlt:
      'Two low iron glass panels edge-on next to a standard clear panel with a visible green edge, comparing brand clarity.',
    heroImagePrompt:
      'Studio product photography: three thick glass panels standing edge-on in a row on a dark matte surface, lit to reveal edge color. Two left panels are low iron with near-colorless polished edges; the right panel is standard clear float with a distinct green edge. Soft raking light, dark background, no text, no logos, no humans. 16:9 cinematic, 4K photorealistic, architectural digest quality. Matches the dark-material blog hero series.',
    author: DEFAULT_AUTHOR,
    reviewedBy: { name: 'Albar', title: 'Technical Reviewer' },
    readingTime: 9,
    tldr: [
      'Starphire is Vitro (ex-PPG) brand low-iron glass, not a separate glass type.',
      'Starphire, Optiwhite and Diamant share one optical class: ~0.01% Fe2O3, ~91% light transmittance.',
      'The brand premium is roughly 20-30% over generic low-iron, for consistency and paperwork, not clarity.',
      'The comparison that matters for most buyers is low-iron vs standard clear, not brand vs brand.',
    ],
    featured: false,
  },
`;

// insert before the array close — specific anchors only, never lastIndexOf('];')
const ANCHORS = [
  "  },\n];\n\n// ---- Utility functions",
  "  },\r\n];\r\n\r\n// ---- Utility functions",
  "\n];\n\n// ---- Utility functions",
];
let inserted = false;
for (const a of ANCHORS) {
  const idx = registrySrc.indexOf(a);
  if (idx !== -1) {
    const cut = registrySrc.indexOf("];", idx); // the array's closing bracket
    registrySrc = registrySrc.slice(0, cut) + ENTRY + registrySrc.slice(cut);
    inserted = true;
    break;
  }
}
if (!inserted) {
  // fallback: insert before the LAST `},\n];` (end of the last object in the array)
  const m = [...registrySrc.matchAll(/\n\s*},\r?\n\];/g)];
  if (m.length) {
    const last = m[m.length - 1];
    const pos = registrySrc.indexOf("];", last.index);
    registrySrc = registrySrc.slice(0, pos) + ENTRY + registrySrc.slice(pos);
    inserted = true;
  }
}
if (!inserted) {
  console.error("HALT: could not find a safe registry insertion anchor. Nothing changed. Send me the tail of blog-registry.ts.");
  process.exit(1);
}

// ---------------------------------------------------------------- reverse purge (source-level, no marker)
// Remove any comparison-form starphire-vs-low-iron token from OTHER entries' keyword arrays,
// so this new comparison article owns the intent. Application-scoped 'starphire shower glass' is left alone.
const PURGE = ["starphire vs low iron glass", "starphire vs low iron"];
const purgeLog = [];
for (const term of PURGE) {
  const q = new RegExp(`(,\\s*)?['"]${esc(term)}['"](\\s*,)?`, "g");
  registrySrc = registrySrc.replace(q, (match, lead, trail, offset) => {
    // never touch this article's own targetKeyword line
    const ctx = registrySrc.slice(Math.max(0, offset - 16), offset);
    if (ctx.includes("targetKeyword:")) return match;
    purgeLog.push(term);
    return lead && trail ? "," : "";
  });
}
// normalize any dangling comma artifacts (safe on well-formed source)
registrySrc = registrySrc
  .replace(/,(\s*[\]])/g, "$1")
  .replace(/([\[])\s*,/g, "$1")
  .replace(/,\s*,/g, ",");

backup(REGISTRY);
fs.writeFileSync(REGISTRY, registrySrc, "utf8");
console.log(`registry: entry inserted for ${SLUG}.`);
if (purgeLog.length) console.log(`registry: purged comparison tokens from other entries: ${[...new Set(purgeLog)].join(", ")}`);

// ---------------------------------------------------------------- components + page
fs.mkdirSync(COMP_DIR, { recursive: true });
for (const c of COMPONENTS) {
  const dest = path.join(COMP_DIR, c + ".tsx");
  backup(dest);
  fs.writeFileSync(dest, readTxt(c + ".tsx.txt"), "utf8");
  console.log(`component: ${c}.tsx written.`);
}

fs.mkdirSync(PAGE_DIR, { recursive: true });
const pageDest = path.join(PAGE_DIR, "page.tsx");
backup(pageDest);
fs.writeFileSync(pageDest, readTxt("page-article-33-starphire-vs-low-iron.tsx.txt"), "utf8");
console.log(`page: ${SLUG}/page.tsx written.`);

// ---------------------------------------------------------------- reciprocal inbound links (#24, #25)
const RECIPS = [
  {
    file: path.join(ROOT, "src", "app", "blog", "low-iron-glass-complete-guide", "page.tsx"),
    jsx: `        {/* ${RECIP_MARKER} */}\n        <p>\n          Choosing between brands of ultra-clear glass? See{" "}\n          <a href="/blog/${SLUG}">whether the Starphire name is worth paying for</a>{" "}\n          versus generic low-iron.\n        </p>\n`,
  },
  {
    file: path.join(ROOT, "src", "app", "blog", "low-iron-glass-vs-clear-glass", "page.tsx"),
    jsx: `        {/* ${RECIP_MARKER} */}\n        <p>\n          Already sold on low iron and now picking a brand? Compare{" "}\n          <a href="/blog/${SLUG}">Starphire against other low-iron options</a>.\n        </p>\n`,
  },
];

for (const r of RECIPS) {
  if (!fs.existsSync(r.file)) {
    console.warn(`WARN: reciprocal target not found: ${r.file} — skipped.`);
    continue;
  }
  let src = fs.readFileSync(r.file, "utf8");
  if (src.includes(RECIP_MARKER)) {
    console.log(`reciprocal: ${path.basename(path.dirname(r.file))} already linked (marker present) — skipped.`);
    continue;
  }
  const faqSection = src.indexOf('<section id="faq">');
  const anchorIdx = faqSection !== -1 ? faqSection : src.indexOf("<FAQ");
  if (anchorIdx === -1) {
    console.warn(`WARN: no <section id="faq"> or <FAQ anchor in ${r.file}. Tail follows; page left intact:`);
    console.warn(src.slice(-400));
    continue;
  }
  const lineStart = src.lastIndexOf("\n", anchorIdx) + 1;
  src = src.slice(0, lineStart) + r.jsx + src.slice(lineStart);
  backup(r.file);
  fs.writeFileSync(r.file, src, "utf8");
  console.log(`reciprocal: inbound link added to ${path.basename(path.dirname(r.file))} (${RECIP_MARKER}).`);
}

console.log("\nDONE. Next: npm run build  (then Ctrl+U sanity check on the SSR output).");
