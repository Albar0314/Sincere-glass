// deploy-article-25.mjs
// Deploys Low Iron Glass vs Clear Glass article (Article #25).
// Run from project root: node edit\deploy-article-25.mjs
//
// Safety rules applied:
//  - Uses specific registry anchor (not lastIndexOf("];"))
//  - Skips if the slug already exists in registry
//  - UTF-8 writes, no BOM
//  - Backs up blog-registry.ts before mutation

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SLUG = "low-iron-glass-vs-clear-glass";

// --- Source templates in edit/ ---
const EDIT_DIR = path.join(ROOT, "edit");
const T_PAGE = path.join(EDIT_DIR, "page-article-25-low-iron-vs-clear.tsx.txt");
const T_EDGE = path.join(EDIT_DIR, "EdgeColorViewer.tsx.txt");
const T_LTC = path.join(EDIT_DIR, "LightTransmittanceComparator.tsx.txt");
const T_CPC = path.join(EDIT_DIR, "CostPremiumCalculatorV2.tsx.txt");

// --- Target locations ---
const COMP_DIR = path.join(ROOT, "src", "components", "blog", "article-25");
const PAGE_DIR = path.join(ROOT, "src", "app", "blog", SLUG);
const PAGE_FILE = path.join(PAGE_DIR, "page.tsx");
const REGISTRY_FILE = path.join(ROOT, "src", "lib", "blog-registry.ts");

function readUtf8(p) {
  return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
}
function writeUtf8(p, content) {
  fs.writeFileSync(p, content, { encoding: "utf8" });
}
function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

// --- Guard: slug already in registry? ---
const registrySrc = readUtf8(REGISTRY_FILE);
if (registrySrc.includes(`slug: '${SLUG}'`) || registrySrc.includes(`slug: "${SLUG}"`)) {
  console.log(`[skip] slug "${SLUG}" already present in blog-registry.ts; aborting to prevent duplicate entry.`);
  process.exit(0);
}

// --- Backup registry ---
const BACKUP = REGISTRY_FILE + ".bak";
writeUtf8(BACKUP, registrySrc);
console.log(`[backup] wrote ${BACKUP}`);

// --- Copy component files ---
ensureDir(COMP_DIR);
writeUtf8(path.join(COMP_DIR, "EdgeColorViewer.tsx"), readUtf8(T_EDGE));
writeUtf8(path.join(COMP_DIR, "LightTransmittanceComparator.tsx"), readUtf8(T_LTC));
writeUtf8(path.join(COMP_DIR, "CostPremiumCalculatorV2.tsx"), readUtf8(T_CPC));
console.log(`[write] 3 components -> ${COMP_DIR}`);

// --- Copy page.tsx ---
ensureDir(PAGE_DIR);
writeUtf8(PAGE_FILE, readUtf8(T_PAGE));
console.log(`[write] page -> ${PAGE_FILE}`);

// --- Append registry entry via specific anchor ---
// Anchor is the end-of-array sentinel line that sits before utility functions.
const ANCHOR = "  },\n];\n\n// ---- Utility functions";
if (!registrySrc.includes(ANCHOR)) {
  throw new Error(
    `[fail] registry anchor not found. Expected literal:\n${ANCHOR}\n` +
      "Open src/lib/blog-registry.ts and confirm the array-end comment line is intact."
  );
}

const entry = `  },
  {
    slug: "low-iron-glass-vs-clear-glass",
    title: "Low Iron Glass vs Clear Glass: The Edge Test, the Numbers, and When It Is Worth the Premium",
    excerpt: "Clear float glass is not actually clear. See the green edge test, the 91% vs 83% VLT gap, the 15 to 40% price premium, and the four scenarios where low iron earns it from a Wuhan glass factory.",
    targetKeyword: "low iron glass vs clear glass",
    secondaryKeywords: [
      "low iron vs clear glass",
      "ultra clear glass vs clear glass",
      "starphire vs clear glass",
      "low iron glass premium",
      "when to use low iron glass",
    ],
    searchKeywords: [
      "low iron glass vs clear glass",
      "low iron vs clear",
      "ultra clear vs clear",
      "starphire vs standard clear",
      "optiwhite vs clear",
      "when to use low iron",
      "low iron glass premium cost",
      "iron oxide glass green edge",
      "VLT low iron vs clear",
      "CRI low iron",
      "architectural glass selection",
      "low iron glass",
      "ultra clear glass",
      "clear float glass",
      "Fe2O3 glass",
      "超白玻璃 对比",
      "超白 普白",
      "低铁玻璃 普通玻璃",
      "玻璃选型 超白",
    ],
    publishDate: "2026-11-03",
    updatedDate: "2026-11-03",
    category: "Buyer Guide",
    tags: ["low iron glass", "clear glass", "ultra clear", "glass comparison", "architectural glass", "glass selection"],
    heroImage: "/images/blog/low-iron-vs-clear-hero.webp",
    heroImageAlt: "Two architectural glass samples standing on edge side by side on a white surface: standard clear float with a visible green edge at 10 mm thickness, and low iron glass with a near-colorless edge at the same thickness",
    heroImagePrompt: "Studio product photography, two 10 mm architectural glass samples standing vertically on edge side by side on a clean white matte surface, viewed from a 20-degree elevated angle. Left sample: standard clear float glass showing a distinct bottle-green edge color visible through the full 10 mm thickness, slight optical distortion from edge polish. Right sample: low iron glass showing a near-colorless edge with only a very faint cool white tint, visibly more transparent than the left sample. Both samples are the same height (approximately 300 mm) and width (approximately 200 mm), with crisp polished edges. Soft diffused daylight from above-left, no harsh reflections on the glass faces, shallow depth of field focused on the edges of both samples. Small typed white labels at the base of each sample reading Clear and Low Iron. Clean neutral grey background behind the samples. No humans, no additional props, no text other than the two labels. 4K photorealistic, museum catalog aesthetic.",
    author: {
      name: "Li Cheng",
      url: "https://sincereglass.com/about",
      title: "CEO at Sincere Glass",
      bio: "CEO at Sincere Glass with 10+ years in architectural glass. Oversees production and quality at our 20,000 m2 Wuhan facility.",
      image: "/images/author-images.jpg",
    },
    readingTime: 13,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "comparison",
    cluster: "comparison",
    relatedProductSlugs: ["laminated-glass", "tempered-glass", "insulated-glass"],
    translations: {},
    changelog: [
      { date: "2026-11-03", note: "Initial publish - Low Iron cluster article #1 under Pillar /blog/low-iron-glass-complete-guide" },
    ],
`;

const patched = registrySrc.replace(ANCHOR, entry + ANCHOR);
if (patched === registrySrc) {
  throw new Error("[fail] registry replace did not change the file.");
}

writeUtf8(REGISTRY_FILE, patched);
console.log(`[write] registry entry appended -> ${REGISTRY_FILE}`);

console.log("\n[done] Article #25 deployed. Next steps:");
console.log("  1. Run: npm run build");
console.log("  2. Generate hero image using the prompt in article-25-delivery.md");
console.log("  3. Save hero to: public/images/blog/low-iron-vs-clear-hero.webp");
console.log("  4. git add . && git commit -m 'blog: Article #25 low iron vs clear glass'");
console.log("  5. git push");
