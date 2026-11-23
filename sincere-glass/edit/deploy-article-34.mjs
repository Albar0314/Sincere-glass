// edit/deploy-article-34.mjs
// Deploys Article #34 (W3-#14): /blog/low-iron-glass-cost
//
// Usage from project root (D:\Desktop\sincere-glass\sincere-glass\):
//   node edit\deploy-article-34.mjs
//   npm run build
//
// Safety guarantees:
// - CRLF-tolerant regex anchors & preserves detected EOL
// - Idempotent checks on registry + reciprocal patches
// - .bak backups written directly next to original files (never .tsx/.ts in edit/)
// - Safe purge of cannibalizing keyword 'is low iron glass worth it' from #24
//   WITHOUT commenting out the trailing comma on secondaryKeywords

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");
const SLUG = "low-iron-glass-cost";
const MARKER = "SG-ART34-RECIP-V1";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function backupOnce(absPath, raw) {
  const bak = absPath + ".bak";
  if (!fs.existsSync(bak)) {
    fs.writeFileSync(bak, raw, "utf8");
    console.log(`[bak]  ${path.relative(ROOT, bak)}`);
  }
}

function copyTemplate(srcName, destRel) {
  const srcAbs = path.join(EDIT, srcName);
  const destAbs = path.join(ROOT, destRel);
  if (!fs.existsSync(srcAbs)) {
    console.error(`[fatal] missing template: edit/${srcName}`);
    process.exit(1);
  }
  ensureDir(path.dirname(destAbs));
  const content = fs.readFileSync(srcAbs, "utf8");
  fs.writeFileSync(destAbs, content, "utf8");
  console.log(`[copy] edit/${srcName} -> ${destRel}`);
}

// 1. Copy 3 interactive components + article page
copyTemplate(
  "LowIronCostStackBuilder.tsx.txt",
  "src/components/blog/article-34/LowIronCostStackBuilder.tsx"
);
copyTemplate(
  "LowIronValueEngineeringLab.tsx.txt",
  "src/components/blog/article-34/LowIronValueEngineeringLab.tsx"
);
copyTemplate(
  "LowIronLandedCostModeler.tsx.txt",
  "src/components/blog/article-34/LowIronLandedCostModeler.tsx"
);
copyTemplate(
  "page-article-34-low-iron-glass-cost.tsx.txt",
  `src/app/blog/${SLUG}/page.tsx`
);

// 2. Update src/lib/blog-registry.ts (purge #24 cannib + append #34 entry)
const REGISTRY = path.join(ROOT, "src", "lib", "blog-registry.ts");
if (!fs.existsSync(REGISTRY)) {
  console.error("[fatal] src/lib/blog-registry.ts not found");
  process.exit(1);
}

let regRaw = fs.readFileSync(REGISTRY, "utf8");
const REG_EOL = regRaw.includes("\r\n") ? "\r\n" : "\n";
let regChanged = false;

// 2a. Purge 'is low iron glass worth it' from #24 low-iron-glass-complete-guide
// Safe regex: removes only the keyword string + optional trailing comma/whitespace,
// never touches the closing `],` of secondaryKeywords.
const cannibRe = /(['"])is low iron glass worth it\1\s*,?\s*/g;
if (cannibRe.test(regRaw)) {
  backupOnce(REGISTRY, regRaw);
  regRaw = regRaw.replace(cannibRe, "");
  regChanged = true;
  console.log("[purge] removed 'is low iron glass worth it' from #24 secondaryKeywords");
} else {
  console.log("[skip]  'is low iron glass worth it' not found in registry (already clean)");
}

// 2b. Append Article #34 entry (idempotent)
if (regRaw.includes(`slug: '${SLUG}'`) || regRaw.includes(`slug: "${SLUG}"`)) {
  console.log(`[skip]  registry already contains slug '${SLUG}'`);
} else {
  backupOnce(REGISTRY, regRaw);

  const ENTRY = [
    `  {`,
    `    slug: "${SLUG}",`,
    `    title: "Low Iron Glass Cost Breakdown (2026): Factory Pricing, Dilution Math & Budget Rules",`,
    `    excerpt: "2026 FOB Wuhan pricing for low iron vs. standard clear glass (6-19 mm). See how tempering, lamination, cutting yield, and ocean freight compress the real premium - plus a 1,200 m2 BOQ value-engineering model.",`,
    `    targetKeyword: "low iron glass cost",`,
    `    secondaryKeywords: [`,
    `      "low iron glass price per m2",`,
    `      "is low iron glass worth it",`,
    `      "ultra clear glass cost china",`,
    `      "low iron vs clear glass price difference",`,
    `    ],`,
    `    searchKeywords: [`,
    `      "low iron glass cost",`,
    `      "low iron glass price",`,
    `      "ultra clear glass price per sqm",`,
    `      "is low iron glass worth it",`,
    `      "low iron vs clear cost",`,
    `      "Fe2O3",`,
    `      "VLT",`,
    `      "IGU",`,
    `      "FOB",`,
    `      "HST",`,
    `      "\\u8d85\\u767d\\u73bb\\u7483\\u4ef7\\u683c",`,
    `      "\\u4f4e\\u94c1\\u73bb\\u7483\\u6210\\u672c",`,
    `    ],`,
    `    publishDate: "2026-11-22",`,
    `    updatedDate: "2026-11-22",`,
    `    category: "Buyer Guide" as const,`,
    `    tags: ["low iron glass", "pricing", "FOB China", "value engineering", "BOQ", "buyer guide"],`,
    `    heroImage: "/images/blog/low-iron-glass-cost-hero.webp",`,
    `    heroImageAlt: "Stepped cross-section comparison of standard clear float, low iron tempered, low iron laminated, and low iron insulated glass samples on a dark slate workbench",`,
    `    heroImagePrompt: "Macro architectural studio photograph showing a stepped comparison of four vertical glass cross-section samples standing upright on a dark matte slate workbench: 6mm clear float on the far left showing a subtle green edge, followed by 10mm low-iron tempered glass, 10+1.52+10 low-iron laminated glass, and a 6+12Ar+6 low-iron insulated glass unit with a grey warm-edge spacer. Raking warm amber rim light (#DAA745) illuminates the crisp, colorless polished edges of the low-iron samples. Muted dark navy-charcoal industrial workshop background (#1C1F26), shallow depth of field, 85mm macro lens, documentary engineering catalog aesthetic, 16:9 composition. No text, no numbers, no watermarks, no logos, no human hands or faces.",`,
    `    author: DEFAULT_AUTHOR,`,
    `    readingTime: 15,`,
    `    featured: false,`,
    `    reviewedBy: { name: "Albar", title: "Technical Lead" },`,
    `    articleType: "buyer-guide" as const,`,
    `    cluster: "buyer-guide",`,
    `    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass"],`,
    `    translations: {},`,
    `    changelog: [`,
    `      { date: "2026-11-22", note: "Initial publish - W3-#14 Low Iron Glass Cost Breakdown (SOP v2.3)" },`,
    `    ],`,
    `  },`,
  ].join(REG_EOL);

  // Prefer explicit Utility functions anchor; fallback to unique array-close anchor
  const primaryAnchorRe = /(^|\r?\n)(  \},?)(\r?\n)(\];)(\r?\n\r?\n\/\/ ---- Utility functions)/g;
  const fallbackAnchorRe = /(^|\r?\n)(  \},)(\r?\n)(\];)(\r?\n)/g;

  let matches = [...regRaw.matchAll(primaryAnchorRe)];
  if (matches.length !== 1) {
    matches = [...regRaw.matchAll(fallbackAnchorRe)];
  }
  if (matches.length !== 1) {
    console.error(`[fatal] expected 1 registry array-end anchor match, found ${matches.length}`);
    console.error("Tail 400 chars of blog-registry.ts:");
    console.error(regRaw.slice(-400));
    process.exit(2);
  }

  const m = matches[0];
  const [, lead, lastObjClose, nl1, arrEnd, tail] = m;
  const normalizedClose = lastObjClose.endsWith(",") ? lastObjClose : lastObjClose + ",";
  const replacement = `${lead}${normalizedClose}${nl1}${ENTRY}${nl1}${arrEnd}${tail}`;
  regRaw = regRaw.slice(0, m.index) + replacement + regRaw.slice(m.index + m[0].length);
  regChanged = true;
  console.log(`[reg]   appended '${SLUG}' to src/lib/blog-registry.ts`);
}

if (regChanged) {
  fs.writeFileSync(REGISTRY, regRaw, "utf8");
}

// 3. Inject reciprocal internal links into #24, #25, and #33 (anchor on <FAQ )
function patchReciprocal(relPath, calloutJsx) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn(`[warn]  skipped reciprocal patch (file not found): ${relPath}`);
    return;
  }
  const raw = fs.readFileSync(abs, "utf8");
  if (raw.includes(MARKER) || raw.includes(`/blog/${SLUG}`)) {
    console.log(`[skip]  reciprocal link already present in ${relPath}`);
    return;
  }
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const faqRe = /([ \t]*)(<FAQ\b)/;
  const m = raw.match(faqRe);
  if (!m) {
    console.warn(`[warn]  <FAQ anchor not found in ${relPath}; add reciprocal link manually`);
    return;
  }
  backupOnce(abs, raw);
  const indent = m[1];
  const block = [
    `${indent}{/* ${MARKER} */}`,
    `${indent}<div className="my-8 rounded-xl border border-[#DAA745]/30 bg-[#3A4250]/15 p-5 text-sm text-[#F2F0ED]">`,
    `${indent}  ${calloutJsx}`,
    `${indent}</div>`,
    ``,
    `${indent}${m[2]}`,
  ].join(eol);

  const updated = raw.replace(faqRe, block);
  fs.writeFileSync(abs, updated, "utf8");
  console.log(`[recip] injected link into ${relPath}`);
}

patchReciprocal(
  "src/app/blog/low-iron-glass-complete-guide/page.tsx",
  `<strong>Need line-by-line FOB Wuhan numbers?</strong> See our <a href="/blog/${SLUG}" className="text-[#DAA745] underline">2026 low iron glass cost breakdown by thickness and assembly</a>, including a 1,200 m2 BOQ value-engineering simulator.`
);

patchReciprocal(
  "src/app/blog/low-iron-glass-vs-clear-glass/page.tsx",
  `<strong>Planning a mixed-zone project budget?</strong> Review our <a href="/blog/${SLUG}" className="text-[#DAA745] underline">factory pricing and zone-split budget guide for low iron glass</a> to cut substrate uplift by 45% to 65%.`
);

patchReciprocal(
  "src/app/blog/starphire-vs-low-iron/page.tsx",
  `<strong>Looking beyond brand markup?</strong> Explore how cutting yield, MOQ, fabrication dilution, and ocean freight shape your final rate in our <a href="/blog/${SLUG}" className="text-[#DAA745] underline">full low iron glass cost stack (FOB vs. landed)</a>.`
);

console.log("\nDone. Next steps:");
console.log("  1. Generate hero image -> public/images/blog/low-iron-glass-cost-hero.webp (1600x900)");
console.log("  2. Run: npm run build");
console.log("  3. Verify /blog/low-iron-glass-cost locally (and with JS disabled for C21/C22)");
