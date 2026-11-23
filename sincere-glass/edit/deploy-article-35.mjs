// deploy-article-35.mjs
// One-click deployment script for Article #35 (W4-#16): /blog/low-iron-glass-suppliers
// SOP v3.0 compliant: pure ASCII, CRLF-tolerant, .bak backups, auto hero WebP copy,
// comma-safe cannibalization purge, blog-clusters registration, reciprocal links.

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");
const SLUG = "low-iron-glass-suppliers";
const RECIP_MARKER = "SG-ART35-RECIP-V1";

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const bakPath = `${filePath}.bak`;
    fs.copyFileSync(filePath, bakPath);
    console.log(`[BACKUP] ${path.relative(ROOT, bakPath)}`);
  }
}

function copyTemplate(srcName, destRel, transformFn) {
  const srcPath = path.join(EDIT_DIR, srcName);
  const destPath = path.join(ROOT, destRel);
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing template file in edit/: ${srcName}`);
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  let content = fs.readFileSync(srcPath, "utf8");
  if (transformFn) {
    content = transformFn(content);
  }
  fs.writeFileSync(destPath, content, "utf8");
  console.log(`[WRITE]  ${destRel}`);
}

// Step 0: Detect QuoteContext path to prevent import mismatch
let quoteImportPath = "@/lib/QuoteContext";
if (
  !fs.existsSync(path.join(ROOT, "src/lib/QuoteContext.tsx")) &&
  fs.existsSync(path.join(ROOT, "src/components/QuoteContext.tsx"))
) {
  quoteImportPath = "@/components/QuoteContext";
  console.log(`[DETECT] QuoteContext found at src/components/QuoteContext.tsx`);
} else {
  console.log(`[DETECT] QuoteContext using default ${quoteImportPath}`);
}

// Step 1: Copy 3 interactive components + page.tsx
copyTemplate(
  "LowIronSupplierAuditScorecard.tsx.txt",
  "src/components/blog/article-35/LowIronSupplierAuditScorecard.tsx",
  (txt) => txt.replace("@/lib/QuoteContext", quoteImportPath)
);
copyTemplate(
  "LowIronTierComparator.tsx.txt",
  "src/components/blog/article-35/LowIronTierComparator.tsx"
);
copyTemplate(
  "LowIronRedFlagDiagnostic.tsx.txt",
  "src/components/blog/article-35/LowIronRedFlagDiagnostic.tsx"
);
copyTemplate(
  "page-article-35-low-iron-glass-suppliers.tsx.txt",
  `src/app/blog/${SLUG}/page.tsx`
);

// Step 2: Auto-copy Hero WebP if placed in edit/
const heroSrc = path.join(EDIT_DIR, `${SLUG}-hero.webp`);
const heroDest = path.join(ROOT, `public/images/blog/${SLUG}-hero.webp`);
if (fs.existsSync(heroSrc)) {
  fs.mkdirSync(path.dirname(heroDest), { recursive: true });
  fs.copyFileSync(heroSrc, heroDest);
  console.log(`[HERO]   Copied edit/${SLUG}-hero.webp -> public/images/blog/${SLUG}-hero.webp`);
} else {
  console.log(`[HERO]   Not found in edit/${SLUG}-hero.webp (convert downloaded Hero image to 1600x900 q85 WebP and place in edit/ or public/images/blog/)`);
}

// Step 3: Update src/lib/blog-registry.ts (add Article #35 + comma-safe purge on #24)
const registryPath = path.join(ROOT, "src/lib/blog-registry.ts");
backupFile(registryPath);
let regContent = fs.readFileSync(registryPath, "utf8");
const eol = regContent.includes("\r\n") ? "\r\n" : "\n";

function purgeKeywordsFromArticle(source, targetSlug, termsToRemove) {
  const slugPattern = new RegExp(`slug:\\s*['"]${targetSlug}['"]`);
  const slugMatch = slugPattern.exec(source);
  if (!slugMatch) return source;
  const startIdx = slugMatch.index;
  const nextSlugIdx = source.indexOf("slug:", startIdx + 10);
  const blockEnd = nextSlugIdx === -1 ? source.length : nextSlugIdx;
  let block = source.slice(startIdx, blockEnd);

  let changed = false;
  for (const term of termsToRemove) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const termRegex = new RegExp(`['"]${escaped}['"]\\s*,?\\s*`, "gi");
    if (termRegex.test(block)) {
      block = block.replace(termRegex, "");
      changed = true;
    }
  }
  if (changed) {
    block = block.replace(/,\s*,/g, ",").replace(/,\s*\]/g, "]");
    console.log(`[PURGE]  Stripped overlapping secondaryKeywords from ${targetSlug}`);
    return source.slice(0, startIdx) + block + source.slice(blockEnd);
  }
  return source;
}

regContent = purgeKeywordsFromArticle(regContent, "low-iron-glass-complete-guide", [
  "low iron glass suppliers",
  "low iron glass manufacturers",
  "ultra clear glass supplier",
]);

if (!regContent.includes(`slug: "${SLUG}"`) && !regContent.includes(`slug: '${SLUG}'`)) {
  const entryLines = [
    "  {",
    `    slug: "${SLUG}",`,
    `    title: "Low Iron Glass Suppliers: 2026 Buyer's Checklist & Factory Audit Guide",`,
    `    excerpt: "How to vet low iron glass suppliers and China fabricators: verify Fe2O3 <= 0.010% mill certificates, separate real factories from brokers, and lock batch color consistency.",`,
    `    targetKeyword: "low iron glass suppliers",`,
    `    secondaryKeywords: [`,
    `      "low iron glass manufacturers",`,
    `      "ultra clear glass supplier china",`,
    `      "how to vet low iron glass factory",`,
    `      "low iron float vs fabricator",`,
    `    ],`,
    `    searchKeywords: [`,
    `      "low iron glass suppliers",`,
    `      "low iron glass manufacturers",`,
    `      "ultra clear glass supplier china",`,
    `      "low iron glass factory checklist",`,
    `      "buy low iron glass wholesale",`,
    `      "architectural low iron fabricator",`,
    `      "Fe2O3",`,
    `      "VLT",`,
    `      "HST",`,
    `      "ISPM-15",`,
    `      "\\u8d85\\u767d\\u73bb\\u7483\\u4f9b\\u5e94\\u5546",`,
    `      "\\u4f4e\\u94c1\\u73bb\\u7483\\u5382\\u5bb6",`,
    `    ],`,
    `    publishDate: "2026-11-23",`,
    `    updatedDate: "2026-11-23",`,
    `    category: "Buyer Guide",`,
    `    articleType: "buyer-guide",`,
    `    cluster: "buyer-guide",`,
    `    readingTime: 13,`,
    `    tags: ["Low Iron Glass", "Supplier Vetting", "Buyer Guide", "Quality Control", "Export"],`,
    `    heroImage: "/images/blog/${SLUG}-hero.webp",`,
    `    heroImageAlt: "Jumbo ultra-clear low iron glass sheets on steel A-frame racks inside a modern architectural glass fabrication facility",`,
    `    heroImagePrompt: "Photorealistic documentary industrial photograph inside a modern architectural glass fabrication facility: jumbo sheets of ultra-clear low-iron architectural glass standing upright on heavy dark steel A-frame racks, with warm amber rim light illuminating their crisp colorless polished edges, alongside a dark matte steel inspection workbench holding stainless calipers and laminated low-iron glass corner samples. Muted dark navy-charcoal factory workshop background, shallow depth of field, 35mm architectural documentary lens. No text, no logos, no human faces.",`,
    `    author: DEFAULT_AUTHOR,`,
    `    reviewedBy: { name: "Albar", title: "Technical Lead" },`,
    `    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass"],`,
    `    changelog: [`,
    `      { date: "2026-11-23", note: "Initial publication under Blog SOP v3.0 with 100-point supplier scorecard and QuoteModal spec prefill." },`,
    `    ],`,
    "  },",
  ].join(eol);

  const utilAnchor = "// ---- Utility functions";
  const anchorIdx = regContent.indexOf(utilAnchor);
  if (anchorIdx !== -1) {
    const arrayCloseIdx = regContent.lastIndexOf("];", anchorIdx);
    if (arrayCloseIdx === -1) {
      throw new Error("Could not locate closing ]; before // ---- Utility functions in blog-registry.ts");
    }
    regContent =
      regContent.slice(0, arrayCloseIdx) +
      entryLines +
      eol +
      regContent.slice(arrayCloseIdx);
  } else {
    const lastCloseIdx = regContent.lastIndexOf("];");
    if (lastCloseIdx === -1) {
      throw new Error("Could not locate closing ]; in blog-registry.ts");
    }
    regContent =
      regContent.slice(0, lastCloseIdx) +
      entryLines +
      eol +
      regContent.slice(lastCloseIdx);
  }

  fs.writeFileSync(registryPath, regContent, "utf8");
  console.log(`[PATCH]  Registered ${SLUG} in src/lib/blog-registry.ts`);
} else {
  console.log(`[SKIP]   ${SLUG} already exists in src/lib/blog-registry.ts`);
}

// Step 4: Ensure slug is listed in src/lib/blog-clusters.ts under low-iron-glass-complete-guide
const clustersPath = path.join(ROOT, "src/lib/blog-clusters.ts");
if (fs.existsSync(clustersPath)) {
  let cTxt = fs.readFileSync(clustersPath, "utf8");
  if (!cTxt.includes(SLUG)) {
    const pillarMatch = cTxt.match(/['"]low-iron-glass-complete-guide['"]\s*:\s*\[/);
    if (pillarMatch && pillarMatch.index !== undefined) {
      backupFile(clustersPath);
      const listStart = pillarMatch.index + pillarMatch[0].length;
      const listEnd = cTxt.indexOf("]", listStart);
      if (listEnd !== -1) {
        const cEol = cTxt.includes("\r\n") ? "\r\n" : "\n";
        const beforeEnd = cTxt.slice(0, listEnd).trimEnd();
        const needsComma = !beforeEnd.endsWith(",") && !beforeEnd.endsWith("[");
        cTxt =
          beforeEnd +
          (needsComma ? "," : "") +
          cEol +
          `    "${SLUG}",` +
          cEol +
          "  " +
          cTxt.slice(listEnd);
        fs.writeFileSync(clustersPath, cTxt, "utf8");
        console.log(`[PATCH]  Added ${SLUG} to TOPIC_CLUSTERS in src/lib/blog-clusters.ts`);
      }
    }
  } else {
    console.log(`[SKIP]   ${SLUG} already present in src/lib/blog-clusters.ts`);
  }
}

// Step 5: Inject reciprocal internal links into #24, #33, and #34 (C18)
function injectReciprocalLink(relPath, calloutJsx) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[WARN]   Reciprocal target not found: ${relPath}`);
    return;
  }
  let src = fs.readFileSync(fullPath, "utf8");
  if (src.includes(RECIP_MARKER) || src.includes(`/blog/${SLUG}`)) {
    console.log(`[SKIP]   Reciprocal link already present in ${relPath}`);
    return;
  }
  backupFile(fullPath);
  const fEol = src.includes("\r\n") ? "\r\n" : "\n";
  const block = `${fEol}        {/* ${RECIP_MARKER} */}${fEol}        ${calloutJsx}${fEol}`;

  const anchors = [
    "<FAQ ",
    "<LeadMagnetCTA\n          variant=\"footer\"",
    "<LeadMagnetCTA\r\n          variant=\"footer\"",
    "<LeadMagnetCTA variant=\"footer\"",
    "<RelatedProductsCards",
  ];
  let inserted = false;
  for (const anc of anchors) {
    const idx = src.indexOf(anc);
    if (idx !== -1) {
      src = src.slice(0, idx) + block + "        " + src.slice(idx);
      inserted = true;
      break;
    }
  }
  if (inserted) {
    fs.writeFileSync(fullPath, src, "utf8");
    console.log(`[RECIP]  Injected link to /blog/${SLUG} into ${relPath}`);
  } else {
    console.log(`[WARN]   No insertion anchor found in ${relPath}; add manual link to /blog/${SLUG}`);
  }
}

injectReciprocalLink(
  "src/app/blog/low-iron-glass-complete-guide/page.tsx",
  `<p>Ready to shortlist factories? Use our <a href="/blog/${SLUG}">low iron glass suppliers buyer&apos;s checklist and 100-point audit scorecard</a> to verify mill Fe2O3 certificates, in-house furnace ownership, and ISPM-15 export crating before paying a deposit.</p>`
);

injectReciprocalLink(
  "src/app/blog/starphire-vs-low-iron/page.tsx",
  `<p>When evaluating Chinese Tier-1 low-iron fabricators against branded float distributors, follow our <a href="/blog/${SLUG}">low iron glass supplier verification checklist</a> to prevent semi-clear substitution and lock single-batch color consistency.</p>`
);

injectReciprocalLink(
  "src/app/blog/low-iron-glass-cost/page.tsx",
  `<p>Before locking in a factory quote that looks unusually cheap, run the vendor through our <a href="/blog/${SLUG}">low iron glass suppliers audit checklist</a> to confirm float mill provenance, HST kiln logs, and export crating standards.</p>`
);

console.log("\n[DONE] Article #35 deployment complete. Run `npm run build` to verify.");
