#!/usr/bin/env node
/**
 * Sincere Glass - Deploy Article #36 (W4-#17): /blog/low-iron-glass-thickness
 * Completes Low Iron Cluster 8/8!
 * Marker: SG-ART36-RECIP-V1
 *
 * Actions:
 *   1. Copies 3 interactive components -> src/components/blog/article-36/
 *   2. Copies article page -> src/app/blog/low-iron-glass-thickness/page.tsx
 *   3. Auto-copies hero image if placed in edit/ (webp/jpg/jpeg)
 *   4. Appends Article #36 entry to src/lib/blog-registry.ts (idempotent)
 *   5. Injects reciprocal internal links into #24, #31, and #32 (idempotent, JSX-safe)
 *
 * Usage:
 *   node edit\deploy-article-36.mjs --dry-run
 *   node edit\deploy-article-36.mjs
 *   npm run build
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");
const DRY_RUN = process.argv.includes("--dry-run");
const SLUG = "low-iron-glass-thickness";
const MARKER = "SG-ART36-RECIP-V1";

function log(msg) {
  console.log((DRY_RUN ? "[DRY-RUN] " : "") + msg);
}

function ensureDir(dir) {
  if (!DRY_RUN && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function backupOnce(absPath, raw) {
  if (DRY_RUN) return;
  const bak = absPath + ".bak";
  if (!fs.existsSync(bak)) {
    fs.writeFileSync(bak, raw, "utf8");
    log("[bak]   " + path.relative(ROOT, bak));
  }
}

function copyTemplate(srcName, destRel) {
  const srcAbs = path.join(EDIT, srcName);
  const destAbs = path.join(ROOT, destRel);
  if (!fs.existsSync(srcAbs)) {
    console.error("[fatal] missing template: edit/" + srcName);
    process.exit(1);
  }
  ensureDir(path.dirname(destAbs));
  if (!DRY_RUN) {
    fs.writeFileSync(destAbs, fs.readFileSync(srcAbs, "utf8"), "utf8");
  }
  log("[copy]  edit/" + srcName + " -> " + destRel);
}

// 1. Copy 3 interactive components + article page
copyTemplate(
  "LowIronThicknessSelector.tsx.txt",
  "src/components/blog/article-36/LowIronThicknessSelector.tsx"
);
copyTemplate(
  "LowIronOpticalDecayChart.tsx.txt",
  "src/components/blog/article-36/LowIronOpticalDecayChart.tsx"
);
copyTemplate(
  "LowIronThicknessToleranceMatrix.tsx.txt",
  "src/components/blog/article-36/LowIronThicknessToleranceMatrix.tsx"
);
copyTemplate(
  "page-article-36-low-iron-glass-thickness.tsx.txt",
  "src/app/blog/" + SLUG + "/page.tsx"
);

// 2. Auto-copy hero image if present in edit/
const heroCandidates = [
  SLUG + "-hero.webp",
  SLUG + "-hero.jpg",
  SLUG + "-hero.jpeg",
];
let heroCopied = false;
for (const cand of heroCandidates) {
  const srcImg = path.join(EDIT, cand);
  if (fs.existsSync(srcImg)) {
    const destImg = path.join(ROOT, "public", "images", "blog", SLUG + "-hero.webp");
    ensureDir(path.dirname(destImg));
    if (!DRY_RUN) {
      fs.copyFileSync(srcImg, destImg);
    }
    log("[hero]  copied edit/" + cand + " -> public/images/blog/" + SLUG + "-hero.webp");
    heroCopied = true;
    break;
  }
}
if (!heroCopied) {
  log("[info]  no edit/" + SLUG + "-hero.webp found yet; save generated hero image to public/images/blog/" + SLUG + "-hero.webp before push.");
}

// 3. Append Article #36 to src/lib/blog-registry.ts
const REGISTRY = path.join(ROOT, "src", "lib", "blog-registry.ts");
if (!fs.existsSync(REGISTRY)) {
  console.error("[fatal] src/lib/blog-registry.ts not found");
  process.exit(1);
}

let regRaw = fs.readFileSync(REGISTRY, "utf8");
const REG_EOL = regRaw.includes("\r\n") ? "\r\n" : "\n";

if (regRaw.includes("slug: '" + SLUG + "'") || regRaw.includes('slug: "' + SLUG + '"')) {
  log("[skip]  registry already contains slug '" + SLUG + "'");
} else {
  const ENTRY = [
    '  {',
    '    slug: "' + SLUG + '",',
    '    title: "4mm, 5mm, 6mm, 10mm & 12mm Low Iron Glass: Complete Thickness Guide",',
    '    excerpt: "How to choose the right low iron glass thickness from 4mm to 19mm. Compare Beer-Lambert VLT gains, panel weights, ASTM/EN tolerances, Wuhan floor-stock MOQs, and laminated equivalents.",',
    '    targetKeyword: "low iron glass thickness",',
    '    secondaryKeywords: [',
    '      "4mm low iron glass",',
    '      "5mm low iron glass",',
    '      "6mm low iron glass",',
    '      "10mm low iron glass",',
    '      "12mm low iron glass",',
    '      "ultra clear glass thicknesses",',
    '    ],',
    '    searchKeywords: [',
    '      "low iron glass thickness",',
    '      "4mm low iron glass",',
    '      "5mm low iron glass",',
    '      "6mm low iron glass",',
    '      "10mm low iron glass",',
    '      "12mm low iron glass",',
    '      "19mm ultra clear glass",',
    '      "Fe2O3",',
    '      "VLT",',
    '      "IGU",',
    '      "SGP",',
    '      "HST",',
    '      "\\u8d85\\u767d\\u73bb\\u7483\\u539a\\u5ea6",',
    '      "\\u4f4e\\u94c1\\u73bb\\u7483\\u89c4\\u683c",',
    '    ],',
    '    publishDate: "2026-11-25",',
    '    updatedDate: "2026-11-25",',
    '    category: "Product Knowledge" as const,',
    '    tags: ["low iron glass", "thickness", "specifications", "VLT", "tempered", "laminated"],',
    '    heroImage: "/images/blog/low-iron-glass-thickness-hero.webp",',
    '    heroImageAlt: "Ascending lineup of seven ultra-clear low iron glass thickness samples from 4mm to 19mm showing colorless polished edges on dark slate",',
    '    heroImagePrompt: "Macro architectural studio photograph of seven vertical ultra-clear low-iron glass thickness samples arranged in an ascending staircase lineup from left to right (4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 19mm) standing upright on a dark matte charcoal slate workbench, showcasing crystal-clear colorless polished glass edges catching warm amber rim lighting against a sleek dark navy-charcoal industrial workshop background, shallow depth of field, 85mm macro lens, crisp specular reflections, documentary engineering catalog aesthetic, 16:9, no text, no numbers, no watermarks, no logos, no hands.",',
    '    author: DEFAULT_AUTHOR,',
    '    readingTime: 13,',
    '    featured: false,',
    '    reviewedBy: { name: "Albar", title: "Technical Lead" },',
    '    articleType: "technical" as const,',
    '    cluster: "product",',
    '    relatedProductSlugs: ["low-iron-glass", "tempered-glass", "laminated-glass", "insulated-glass"],',
    '    translations: {},',
    '    changelog: [',
    '      { date: "2026-11-25", note: "Initial publish - W4-#17 Low Iron Glass Thickness Guide (SOP v3.0, Low Iron Cluster 8/8 complete)" },',
    '    ],',
    '  },',
  ].join(REG_EOL);

  const primaryAnchorRe = /(^|\r?\n)(  \},?)(\r?\n)(\];)(\r?\n\r?\n\/\/ ---- Utility functions)/g;
  const fallbackAnchorRe = /(^|\r?\n)(  \},)(\r?\n)(\];)(\r?\n)/g;

  let matches = [...regRaw.matchAll(primaryAnchorRe)];
  if (matches.length !== 1) {
    matches = [...regRaw.matchAll(fallbackAnchorRe)];
  }
  if (matches.length !== 1) {
    console.error("[fatal] expected 1 registry array-end anchor match, found " + matches.length);
    process.exit(2);
  }

  const m = matches[0];
  const [, lead, lastObjClose, nl1, arrEnd, tail] = m;
  const normalizedClose = lastObjClose.endsWith(",") ? lastObjClose : lastObjClose + ",";
  const replacement = lead + normalizedClose + nl1 + ENTRY + nl1 + arrEnd + tail;
  const updatedReg = regRaw.slice(0, m.index) + replacement + regRaw.slice(m.index + m[0].length);

  backupOnce(REGISTRY, regRaw);
  if (!DRY_RUN) {
    fs.writeFileSync(REGISTRY, updatedReg, "utf8");
  }
  log("[reg]   appended '" + SLUG + "' to src/lib/blog-registry.ts");
}

// 4. Inject reciprocal internal links into #24, #31, and #32 (anchored on <FAQ, zero bare < or >)
function patchReciprocal(relPath, calloutJsx) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn("[warn]  skipped reciprocal patch (file not found): " + relPath);
    return;
  }
  const raw = fs.readFileSync(abs, "utf8");
  if (raw.includes(MARKER) || raw.includes("/blog/" + SLUG)) {
    log("[skip]  reciprocal link already present in " + relPath);
    return;
  }
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const faqRe = /([ \t]*)(<FAQ\b)/;
  const m = raw.match(faqRe);
  if (!m) {
    console.warn("[warn]  <FAQ anchor not found in " + relPath);
    return;
  }
  backupOnce(abs, raw);
  const indent = m[1];
  const block = [
    indent + "{/* " + MARKER + " */}",
    indent + '<div className="my-8 rounded-xl border border-[#DAA745]/30 bg-[#3A4250]/15 p-5 text-sm text-[#F2F0ED]">',
    indent + "  " + calloutJsx,
    indent + "</div>",
    "",
    indent + m[2],
  ].join(eol);

  if (!DRY_RUN) {
    fs.writeFileSync(abs, raw.replace(faqRe, block), "utf8");
  }
  log("[recip] injected link into " + relPath);
}

patchReciprocal(
  "src/app/blog/low-iron-glass-complete-guide/page.tsx",
  '<strong>Selecting between 4mm, 6mm, 10mm, 12mm, or 19mm?</strong> Use our <a href="/blog/' + SLUG + '" className="text-[#DAA745] underline">low iron glass thickness guide and interactive panel-weight calculator</a> to match span, VLT curve, and Wuhan stock availability.'
);

patchReciprocal(
  "src/app/blog/low-iron-tempered-glass/page.tsx",
  '<strong>Unsure whether your span needs 10mm, 12mm, or 15mm toughened low iron?</strong> Compare VLT retention, deflection tolerances, and laminated equivalents in our <a href="/blog/' + SLUG + '" className="text-[#DAA745] underline">4mm-19mm low iron glass thickness selection guide</a>.'
);

patchReciprocal(
  "src/app/blog/low-iron-glass-shower-door/page.tsx",
  '<strong>Weighing 8mm vs. 10mm vs. 12mm for frameless wet areas or partitions?</strong> Check hinge weight per square meter and code limits in our <a href="/blog/' + SLUG + '" className="text-[#DAA745] underline">complete low iron glass thickness chart (4mm to 19mm)</a>.'
);

log("=== Done! Run `npm run build` next to verify. ===");
