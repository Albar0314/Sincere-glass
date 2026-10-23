// deploy-article-19-product-pillar.mjs
//
// Deploys Article #19 - Product Pillar: Architectural Glass Specification Guide.
//
// Steps:
//   1. Copy 3 interactive component templates to src/components/blog/pillar-product/
//   2. Copy page template to src/app/blog/architectural-glass-specification-guide/page.tsx
//   3. Append registry entry to src/lib/blog-registry.ts (before the Utility
//      functions comment that follows the array close).
//   4. Insert a reciprocal link paragraph before `<FAQ items={faqItems}` in each
//      of the three product-cluster article pages (#16, #17, #18). Idempotent:
//      skips a file that already contains the pillar slug.
//
// Usage:  node edit/deploy-article-19-product-pillar.mjs
//
// All string literals that could contain English apostrophes are wrapped in
// double quotes, per the project preference established after Article #12.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyTemplate(templateName, targetRelPath) {
  const srcPath = path.join(EDIT, templateName);
  if (!fs.existsSync(srcPath)) {
    throw new Error("Missing template: " + srcPath);
  }
  const targetPath = path.join(ROOT, targetRelPath);
  ensureDir(path.dirname(targetPath));
  const body = fs.readFileSync(srcPath, "utf8");
  fs.writeFileSync(targetPath, body, "utf8");
  console.log("  wrote  " + targetRelPath);
}

// ---------------------------------------------------------------------------
// 1. Copy 3 interactive component templates
// ---------------------------------------------------------------------------
console.log("\n[1/4] Copying interactive components...");
const componentDir = "src/components/blog/pillar-product";
ensureDir(path.join(ROOT, componentDir));
copyTemplate("SpecificationBuilder.tsx.txt",     componentDir + "/SpecificationBuilder.tsx");
copyTemplate("AttributeCascadeDiagram.tsx.txt",  componentDir + "/AttributeCascadeDiagram.tsx");
copyTemplate("CapabilityEnvelopeMatrix.tsx.txt", componentDir + "/CapabilityEnvelopeMatrix.tsx");

// ---------------------------------------------------------------------------
// 2. Copy page template
// ---------------------------------------------------------------------------
console.log("\n[2/4] Copying article page...");
copyTemplate(
  "page-article-19-architectural-glass-specification-guide.tsx.txt",
  "src/app/blog/architectural-glass-specification-guide/page.tsx"
);

// ---------------------------------------------------------------------------
// 3. Append registry entry
// ---------------------------------------------------------------------------
console.log("\n[3/4] Appending blog-registry.ts entry...");
const registryPath = path.join(ROOT, "src/lib/blog-registry.ts");
let registry = fs.readFileSync(registryPath, "utf8");

const SLUG = "architectural-glass-specification-guide";

if (registry.includes('slug: "' + SLUG + '"') || registry.includes("slug: '" + SLUG + "'")) {
  console.log("  skip   registry entry already present for " + SLUG);
} else {
  // Human-prose fields use double quotes so stray apostrophes are safe.
  const entry = [
    "",
    "  {",
    "    slug: \"" + SLUG + "\",",
    "    title: \"Architectural Glass Specification: The Complete 6-Attribute Decision Guide\",",
    "    excerpt: \"An architectural glass specification is six decisions, not one: substrate, processing, thickness, assembly, coating, and panel size. The pillar guide to writing specs that quote in one working day, with glass-code conventions, capability envelopes, and the five pitfalls that cost real money.\",",
    "    targetKeyword: \"architectural glass specification\",",
    "    secondaryKeywords: [",
    "      \"how to specify architectural glass\",",
    "      \"architectural glass spec sheet\",",
    "      \"glass specification guide\",",
    "      \"architectural glass specifications\",",
    "      \"custom architectural glass specification\",",
    "    ],",
    "    searchKeywords: [",
    "      \"architectural glass specification\",",
    "      \"architectural glass spec\",",
    "      \"how to specify glass\",",
    "      \"glass spec sheet\",",
    "      \"glass specification template\",",
    "      \"architectural glass RFQ\",",
    "      \"glass code\",",
    "      \"glass makeup code\",",
    "      \"glass stackup\",",
    "      \"specification pillar\",",
    "      \"6T+12A+6T Low-E\",",
    "      \"SGP PVB IGU specification\",",
    "      \"architectural glass tolerance\",",
    "      \"glass surface position\",",
    "      \"Low-E#2 Low-E#3\",",
    "      \"GB 15763 EN 12150 ASTM E1300\",",
    "      \"glass specification jurisdiction\",",
    "      \"glass specification capability envelope\",",
    "      \"custom architectural glass\",",
    "      \"architectural glass procurement\",",
    "      \"jumbo panel specification\",",
    "      \"glass specification pitfalls\",",
    "      \"glass specification checklist\",",
    "      \"glass takeoff schedule\",",
    "      \"glazing schedule\",",
    "      \"\\u5efa\\u7b51\\u73bb\\u7483 \\u89c4\\u683c\\u4e66\",",
    "      \"\\u73bb\\u7483 \\u89c4\\u683c \\u6307\\u5357\",",
    "      \"\\u73bb\\u7483 \\u89c4\\u683c \\u6a21\\u677f\",",
    "      \"\\u73bb\\u7483 \\u914d\\u7f6e \\u7f16\\u7801\",",
    "      \"\\u73bb\\u7483 \\u89c4\\u683c \\u8bbe\\u8ba1\",",
    "    ],",
    "    publishDate: \"2026-10-23\",",
    "    updatedDate: \"2026-10-23\",",
    "    category: \"Product Knowledge\",",
    "    tags: [",
    "      \"pillar\",",
    "      \"architectural glass\",",
    "      \"specification\",",
    "      \"glass codes\",",
    "      \"capability envelope\",",
    "      \"product deep dives\",",
    "      \"procurement\",",
    "    ],",
    "    heroImage: \"/images/blog/architectural-glass-specification-hero.webp\",",
    "    heroImageAlt: \"Flat-lay of a glass specification schedule document with DWG shop drawings and six physical glass samples arranged in a decision-tree layout, representing the six-attribute architectural glass specification framework\",",
    "    heroImagePrompt: \"Overhead flat-lay professional architectural photography on a polished dark concrete surface. Center: an open specification schedule document with a visible glass takeoff table showing codes like 6T+12A(Ar)+6T Low-E#2 printed in clean serif typography, partially covered by a translucent architect trace with handwritten revision marks in warm amber ink. Around the document, six physical architectural glass samples (approximately 100 x 150 mm each) arranged in a loose semicircle: clear annealed float, tempered with subtle optical distortion, laminated with visible PVB interlayer line, insulated glass unit cross-section with aluminum spacer visible, Low-E coated with faint iridescent sheen, ceramic frit enameled in warm bronze. Supporting props: a rolled DWG drawing, a wooden folding ruler extended to 1200 mm, a pair of brass drafting compasses, a cup of black coffee. Soft diffuse daylight from the top-left casting long gentle shadows at a 20-degree angle. Shallow depth of field focused on the central specification document. Neutral grey and dark concrete palette with the warm amber ink and the amber Low-E sheen as the only chromatic accents. No humans, no text other than the specification document itself. 4K photorealistic, museum catalog aesthetic, documentary architectural photography style.\",",
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 17,",
    "    featured: true,",
    "    isPillar: true,",
    "    reviewedBy: { name: \"Albar\", title: \"Technical Lead\" },",
    "    articleType: \"buyer-guide\",",
    "    cluster: \"product\",",
    "    relatedProductSlugs: [\"tempered-glass\", \"laminated-glass\", \"insulated-glass\", \"low-e-glass\", \"enameled-glass\"],",
    "    translations: {},",
    "    changelog: [",
    "      { date: \"2026-10-23\", note: \"Initial publish \\u2014 Pillar Page for Product Deep Dives cluster (activated at 3-article threshold with articles 16, 17, 18).\" },",
    "    ],",
    "  },",
    "",
  ].join("\n");

  // Prefer the stable anchor that follows the array close.
  // Fallback: last occurrence of `\n];` in the file.
  let insertAt = -1;

  const anchors = [
    "];\n\n// ---- Utility functions ----",
    "];\n\n// -----",
    "];\n\n/**",
  ];
  for (const a of anchors) {
    const i = registry.indexOf(a);
    if (i !== -1) {
      insertAt = i;
      break;
    }
  }
  if (insertAt === -1) {
    insertAt = registry.lastIndexOf("\n];");
    if (insertAt !== -1) insertAt += 1; // land before the `]` character
  }
  if (insertAt === -1) {
    throw new Error("Could not locate the blogArticles closing bracket in registry.ts. No changes written.");
  }

  registry = registry.slice(0, insertAt) + entry + registry.slice(insertAt);
  fs.writeFileSync(registryPath, registry, "utf8");
  console.log("  wrote  src/lib/blog-registry.ts (appended entry for " + SLUG + ")");
}

// ---------------------------------------------------------------------------
// 4. Insert reciprocal pillar link into product-cluster articles
// ---------------------------------------------------------------------------
console.log("\n[4/4] Adding reciprocal pillar links to product-cluster articles...");

const RECIP_MARKER = "architectural-glass-specification-guide";
// Snippet includes its own 8-space indent so it lines up with surrounding JSX.
const RECIP_SNIPPET =
  "        <p className=\"text-sm text-[#8B95A5] mt-6\">\n" +
  "          For the pillar view of how this product-level decision fits into a complete architectural glass specification, see our <a href=\"/blog/architectural-glass-specification-guide\" className=\"text-[#DAA745] hover:underline\">architectural glass specification guide</a>.\n" +
  "        </p>\n\n";

const productArticles = [
  "src/app/blog/12mm-tempered-glass-specifications/page.tsx",
  "src/app/blog/sgp-vs-pvb-interlayer-cost/page.tsx",
  "src/app/blog/jumbo-architectural-glass-panels/page.tsx",
];

for (const relPath of productArticles) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.log("  skip   not found: " + relPath);
    continue;
  }
  let src = fs.readFileSync(abs, "utf8");
  if (src.includes(RECIP_MARKER)) {
    console.log("  skip   link already present: " + relPath);
    continue;
  }
  const anchor = "<FAQ items={faqItems}";
  const idx = src.indexOf(anchor);
  if (idx === -1) {
    console.log("  warn   anchor <FAQ items={faqItems}> not found in: " + relPath);
    continue;
  }
  // Insert at the start of the anchor's own line, preserving indentation.
  const lineStart = src.lastIndexOf("\n", idx) + 1;
  src = src.slice(0, lineStart) + RECIP_SNIPPET + src.slice(lineStart);
  fs.writeFileSync(abs, src, "utf8");
  console.log("  wrote  " + relPath + "  (+ reciprocal pillar link)");
}

console.log("\nDone. Next steps:");
console.log("  1. Review 'git diff src/lib/blog-registry.ts' to confirm the new entry parses.");
console.log("  2. Review the three product-cluster article pages for the inserted link.");
console.log("  3. Run 'npm run build' locally to catch TS/parse errors before pushing.");
console.log("  4. Commit and push; Vercel auto-deploys from main.");
console.log("  5. Generate the hero image using the prompt in the new registry entry, save as /public/images/blog/architectural-glass-specification-hero.webp.");
console.log("  6. After deploy succeeds, submit the new URL to Google Search Console for indexing.");
