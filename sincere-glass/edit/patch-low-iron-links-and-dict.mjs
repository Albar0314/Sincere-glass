#!/usr/bin/env node
/**
 * Sincere Glass - Low Iron Product Link-Juice & Dict Sync Patch
 * Marker: SG-LOW-IRON-PROD-LINK-V1
 *
 * Actions:
 *   1. Adds product.lowIron.name & product.lowIron.desc to EN and ES blocks in src/lib/dict.ts
 *   2. Injects unique-anchor contextual internal links to /products/low-iron-glass
 *      into all 7 published Low Iron cluster articles (#24, #25, #31, #32, #33, #34, #35)
 *   3. Prepends "low-iron-glass" to <RelatedProductsCards slugs={[...]} /> in all 7 articles
 *
 * Usage:
 *   node edit\patch-low-iron-links-and-dict.mjs --dry-run
 *   node edit\patch-low-iron-links-and-dict.mjs
 *   npm run build
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "SG-LOW-IRON-PROD-LINK-V1";

function log(msg) {
  console.log((DRY_RUN ? "[DRY-RUN] " : "") + msg);
}

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function writeWithBackup(absPath, newContent) {
  if (DRY_RUN) {
    log("[WOULD WRITE] " + path.relative(ROOT, absPath));
    return;
  }
  const bak = absPath + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(absPath, bak);
    log("[BAK] " + path.relative(ROOT, bak));
  }
  fs.writeFileSync(absPath, newContent, "utf8");
  log("[UPDATED] " + path.relative(ROOT, absPath));
}

// ---------------------------------------------------------------------------
// 1. Patch src/lib/dict.ts (EN + ES blocks)
// ---------------------------------------------------------------------------
function patchDict() {
  const dictPath = path.join(ROOT, "src", "lib", "dict.ts");
  if (!fs.existsSync(dictPath)) {
    console.warn("[WARN] src/lib/dict.ts not found");
    return;
  }

  let src = fs.readFileSync(dictPath, "utf8");
  const eol = detectEol(src);

  if (src.includes("product.lowIron.name")) {
    log("[SKIP] src/lib/dict.ts already contains product.lowIron.*");
    return;
  }

  const enAnchor = /('product\.curvedTempered\.desc':\s*'Single-axis bent[^']*',)/;
  const esAnchor = /('product\.curvedTempered\.desc':\s*'Curvatura mono-axial[^']*',)/;

  if (!enAnchor.test(src) || !esAnchor.test(src)) {
    console.warn("[WARN] Expected curvedTempered anchors not found in src/lib/dict.ts");
    return;
  }

  const enInsert =
    "$1" +
    eol +
    "  'product.lowIron.name': 'Low Iron Glass'," +
    eol +
    "  'product.lowIron.desc': 'Ultra-clear float (<0.01% Fe2O3), up to 91.5% VLT',";

  const esInsert =
    "$1" +
    eol +
    "  'product.lowIron.name': 'Vidrio bajo en hierro'," +
    eol +
    "  'product.lowIron.desc': 'Vidrio flotado extraclaro (<0.01% Fe2O3), hasta 91.5% VLT',";

  src = src.replace(enAnchor, enInsert).replace(esAnchor, esInsert);
  writeWithBackup(dictPath, src);
}

// ---------------------------------------------------------------------------
// 2. Patch 7 Low Iron cluster articles
// ---------------------------------------------------------------------------
const ARTICLES = [
  {
    slug: "low-iron-glass-complete-guide",
    lead: "Ready to specify ultra-clear architectural glass?",
    anchor: "Sincere Glass low iron glass product specifications (4-19mm, up to 3.3m x 15m)",
    tail: "for Wuhan factory capabilities, VLT data, and container weight estimates.",
  },
  {
    slug: "low-iron-glass-vs-clear-glass",
    lead: "Decided on low iron over standard clear?",
    anchor: "custom low iron glass manufacturing in 4-19mm thicknesses",
    tail: "including interactive edge-color comparisons and direct FOB Wuhan quotes.",
  },
  {
    slug: "low-iron-tempered-glass",
    lead: "Sourcing toughened ultra-clear panels for your project?",
    anchor: "factory-direct low iron architectural glass (tempered, HST, laminated & IGU)",
    tail: "with in-house jumbo processing up to 3.3m x 15m.",
  },
  {
    slug: "low-iron-glass-shower-door",
    lead: "Ordering 10mm or 12mm ultra-clear shower enclosures in volume?",
    anchor: "low iron glass factory specifications and custom fabrication options",
    tail: "covering CNC cutouts, polished edges, and export crating from Wuhan.",
  },
  {
    slug: "starphire-vs-low-iron",
    lead: "Comparing Tier-1 ultra-clear float against branded imports?",
    anchor: "Sincere Glass ultra-clear low iron glass (<0.01% Fe2O3)",
    tail: "with full mill test certificates and 20%-40% substrate savings.",
  },
  {
    slug: "low-iron-glass-cost",
    lead: "Need an itemized factory quote for your glazing schedule?",
    anchor: "low iron glass product hub and build-up configurator",
    tail: "to estimate panel weight, 20'GP container count, and Wuhan lead times.",
  },
  {
    slug: "low-iron-glass-suppliers",
    lead: "Evaluating Chinese ultra-clear glass factories?",
    anchor: "Sincere Glass low iron glass manufacturing capabilities",
    tail: "for direct 20,000 m2 Wuhan plant specs, MOQ terms, and sample requests.",
  },
];

function patchArticles() {
  let linkInjected = 0;
  let rpcUpdated = 0;
  let skipped = 0;
  const warnings = [];

  for (const item of ARTICLES) {
    const pagePath = path.join(ROOT, "src", "app", "blog", item.slug, "page.tsx");
    if (!fs.existsSync(pagePath)) {
      warnings.push("Missing file: " + pagePath);
      continue;
    }

    let src = fs.readFileSync(pagePath, "utf8");
    const eol = detectEol(src);
    let changed = false;

    // 2a. Inject contextual link callout above <FAQ
    if (src.includes(MARKER) || src.includes("/products/low-iron-glass")) {
      log("[SKIP LINK] " + item.slug + " already links to /products/low-iron-glass");
      skipped++;
    } else {
      const faqRe = /([ \t]*)(<FAQ\b)/;
      const m = src.match(faqRe);
      if (!m) {
        warnings.push("<FAQ anchor not found in " + item.slug);
      } else {
        const indent = m[1];
        const hasLinkImport = /\bimport\s+Link\s+from\s+["']/.test(src);
        const linkEl = hasLinkImport
          ? `<Link href="/products/low-iron-glass" className="text-[#DAA745] underline">${item.anchor}</Link>`
          : `<a href="/products/low-iron-glass" className="text-[#DAA745] underline">${item.anchor}</a>`;

        const block = [
          `${indent}{/* ${MARKER} */}`,
          `${indent}<div className="my-8 rounded-xl border border-[#DAA745]/35 bg-[#3A4250]/15 p-5 text-sm text-[#F2F0ED]">`,
          `${indent}  <strong>${item.lead}</strong> Explore our ${linkEl} ${item.tail}`,
          `${indent}</div>`,
          ``,
          `${indent}${m[2]}`,
        ].join(eol);

        src = src.replace(faqRe, block);
        changed = true;
        linkInjected++;
      }
    }

    // 2b. Prepend "low-iron-glass" to <RelatedProductsCards slugs={[...]} />
    const rpcRe = /(<RelatedProductsCards\b[\s\S]*?\bslugs=\{\s*\[)([\s\S]*?)(\]\s*\})/;
    const rpcMatch = src.match(rpcRe);
    if (!rpcMatch) {
      warnings.push("<RelatedProductsCards slugs={[...]} /> not found in " + item.slug);
    } else if (rpcMatch[2].includes("low-iron-glass")) {
      log("[SKIP RPC]  " + item.slug + " already includes low-iron-glass card");
    } else {
      const inner = rpcMatch[2].trim();
      const quote = inner.includes("'") && !inner.includes('"') ? "'" : '"';
      const newInner = inner.length > 0 ? `${quote}low-iron-glass${quote}, ${inner}` : `${quote}low-iron-glass${quote}`;
      src = src.replace(rpcRe, `$1${newInner}$3`);
      changed = true;
      rpcUpdated++;
    }

    if (changed) {
      writeWithBackup(pagePath, src);
    }
  }

  console.log("");
  console.log("=== Summary ===");
  console.log("Contextual product links injected : " + linkInjected);
  console.log("RelatedProductsCards updated      : " + rpcUpdated);
  console.log("Skipped                           : " + skipped);
  console.log("Warnings                          : " + warnings.length);
  for (const w of warnings) {
    console.warn("  [WARN] " + w);
  }
}

log("=== Running " + MARKER + " ===");
patchDict();
patchArticles();
if (!DRY_RUN) {
  console.log("Next step: run `npm run build` and verify 4 matches in dict.ts with:");
  console.log('  findstr /n "lowIron" src\\lib\\dict.ts');
}
