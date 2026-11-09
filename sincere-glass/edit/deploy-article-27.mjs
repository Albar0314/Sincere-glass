// deploy-article-27.mjs
// Deploys Article #27: Double Pane vs Triple Pane Glass
//
// Run from project root:  node edit\deploy-article-27.mjs
//
// This script:
//  1) copies 3 interactive components into src/components/blog/article-27/
//  2) copies the page.tsx into src/app/blog/double-pane-vs-triple-pane-glass/
//  3) appends the registry entry (CRLF-tolerant, with idempotency guard)
//  4) scans #26 insulated-glass-complete-guide secondaryKeywords for Pillar-spoke cannib risk
//     ('triple pane', 'double pane vs triple pane', 'triple pane windows'); auto-removes if present
//  5) patches RelatedProductsCards.tsx PRODUCT_MAP - no new slugs needed (reuses insulated-glass)
//  6) adds reciprocal inbound links in #26 insulated-glass-complete-guide/page.tsx and
//     insulated-glass-vs-laminated-glass/page.tsx (anchor on <FAQ items=; silent skip if missing)
//
// Idempotent: safe to re-run; prints what was done vs skipped.

import fs from "node:fs";
import path from "node:path";

const SLUG = "double-pane-vs-triple-pane-glass";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");
const SRC = path.join(ROOT, "src");
const COMPONENTS_DIR = path.join(SRC, "components", "blog", "article-27");
const APP_DIR = path.join(SRC, "app", "blog", SLUG);
const REGISTRY = path.join(SRC, "lib", "blog-registry.ts");
const RELATED_CARDS = path.join(SRC, "components", "blog", "RelatedProductsCards.tsx");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyIfMissing(srcName, destPath, label) {
  const srcPath = path.join(EDIT, srcName);
  if (!fs.existsSync(srcPath)) {
    console.error(`[!] source not found: ${srcPath}`);
    process.exit(1);
  }
  if (fs.existsSync(destPath)) {
    console.log(`[=] ${label} already exists, skipped`);
    return;
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`[+] ${label} -> ${path.relative(ROOT, destPath)}`);
}

function detectEOL(raw) {
  return raw.includes("\r\n") ? "\r\n" : "\n";
}

function readUtf8(p) {
  return fs.readFileSync(p, "utf8");
}

function writeUtf8(p, content) {
  fs.writeFileSync(p, content, "utf8");
}

// --- 1) components ---
ensureDir(COMPONENTS_DIR);
copyIfMissing("PaneConfigurationComparator.tsx",  path.join(COMPONENTS_DIR, "PaneConfigurationComparator.tsx"),  "PaneConfigurationComparator.tsx");
copyIfMissing("TriplePaneROICalculator.tsx",       path.join(COMPONENTS_DIR, "TriplePaneROICalculator.tsx"),       "TriplePaneROICalculator.tsx");
copyIfMissing("ClimateZoneDecisionMatrix.tsx",     path.join(COMPONENTS_DIR, "ClimateZoneDecisionMatrix.tsx"),     "ClimateZoneDecisionMatrix.tsx");

// --- 2) page.tsx ---
ensureDir(APP_DIR);
copyIfMissing("page-article-27-double-pane-vs-triple-pane.tsx", path.join(APP_DIR, "page.tsx"), "page.tsx");

// --- 3) registry entry (CRLF-tolerant, idempotent) ---
{
  const raw = readUtf8(REGISTRY);
  const EOL = detectEOL(raw);

  if (raw.includes(`slug: '${SLUG}'`)) {
    console.log(`[=] registry entry for ${SLUG} already present, skipped`);
  } else {
    const entry = [
      ``,
      `  {`,
      `    slug: '${SLUG}',`,
      `    title: "Double Pane vs Triple Pane Glass: Is the Upgrade Actually Worth It?",`,
      `    excerpt: "50% lower U-factor, 65% higher cost, 50% more weight. When triple pane pays back, when it does not, and the 7 trade-offs nobody puts in brochures. Climate-zone decision matrix from a Wuhan IGU line.",`,
      `    targetKeyword: 'triple pane windows',`,
      `    secondaryKeywords: [`,
      `      'double pane vs triple pane',`,
      `      'triple pane glass',`,
      `      'triple glazing vs double glazing',`,
      `      'triple glazed windows',`,
      `      'is triple pane worth it',`,
      `    ],`,
      `    searchKeywords: [`,
      `      'double pane vs triple pane', 'triple pane windows', 'triple glazing',`,
      `      'triple pane glass', 'triple glazed windows', 'triple pane IGU',`,
      `      'is triple pane worth it', 'triple pane cost',`,
      `      'IGU', 'U-factor', 'argon fill', 'Low-E coating', 'warm-edge spacer',`,
      `      'Passive House windows', 'IECC climate zone',`,
      `      '\\u4e09\\u5c42\\u4e2d\\u7a7a\\u73bb\\u7483', '\\u4e09\\u5c42\\u73bb\\u7483 \\u53cc\\u5c42\\u73bb\\u7483', '\\u4e09\\u5c42\\u4e2d\\u7a7a \\u53cc\\u5c42\\u4e2d\\u7a7a',`,
      `    ],`,
      `    publishDate: '2026-11-09',`,
      `    category: 'Buyer Guide' as const,`,
      `    tags: ['insulated glass', 'IGU', 'triple pane', 'double pane', 'U-factor', 'glass comparison', 'Passive House'],`,
      `    heroImage: '/images/blog/double-pane-vs-triple-pane-hero.webp',`,
      `    heroImageAlt: "Cross-section comparison of a double-pane IGU and a triple-pane IGU on polished dark concrete, showing spacers, Low-E coatings, and argon-filled cavities",`,
      `    heroImagePrompt: "Studio product photography: two architectural glass IGU cross-sections side by side on polished dark concrete. Left: double pane IGU (two 4mm clear glass lites separated by one 12mm aluminum spacer bar with visible desiccant, argon-filled cavity, subtle gold Low-E coating on surface 3). Right: triple pane IGU (three 4mm clear glass lites separated by two 12mm aluminum spacer bars, two argon cavities, subtle Low-E coatings on surfaces 2 and 5 giving double gold-tinted sheen). Both samples lit from above-left with warm amber accent lighting raking across the glass edges highlighting the spacer bars. 25-degree slightly-elevated camera angle. Shallow depth of field focused on both cross-sections simultaneously. Clean dark grey background, no humans, no text, no brand logos. 16:9 cinematic composition. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.",`,
      `    author: DEFAULT_AUTHOR,`,
      `    readingTime: 13,`,
      `    featured: false,`,
      `    reviewedBy: { name: 'Albar', title: 'Technical Lead' },`,
      `    articleType: 'comparison' as const,`,
      `    cluster: 'comparison',`,
      `    relatedProductSlugs: ['insulated-glass', 'low-e-glass', 'laminated-glass'],`,
      `    tldr: [`,
      `      "Triple pane cuts center-of-glass U-factor roughly in half (1.6 to 0.8 W/m2K) vs comparable double pane.",`,
      `      "Factory-gate premium 55-70%; installed premium 35-50%. Payback 8-12 years in cold climates, 20+ years in warm ones.",`,
      `      "IECC zone 5 and colder: specify triple. Zone 3 and below: stick with premium double pane.",`,
      `      "Triple pane is the wrong solution for noise - use laminated glass with dissimilar panes instead.",`,
      `      "Retrofit into existing double-pane sashes almost never works - plan for new frames.",`,
      `    ],`,
      `    translations: {},`,
      `    changelog: [`,
      `      { date: '2026-11-09', note: 'Initial publish - Insulated cluster spoke under Pillar #26' },`,
      `    ],`,
      `  },`,
    ].join(EOL);

    // Anchor: `  },\r\n];\r\n\r\n// ---- Utility functions` or LF equivalent, built with detected EOL
    const anchorRe = new RegExp(`(  \\},${EOL.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\r/g, '\\r')}\\];${EOL.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\r/g, '\\r')})`);
    // Simpler: find the last occurrence of `  },\r?\n\];` and inject before `]`
    const closeRe = /(\r?\n\s*\},)(\r?\n\];\s*\r?\n\s*\r?\n\/\/ ---- Utility functions)/;
    const m = closeRe.exec(raw);
    if (!m) {
      // dump tail for diagnosis
      console.error("[!] could not locate registry closing anchor. Tail 500 chars:");
      console.error(raw.slice(-500));
      process.exit(1);
    }
    const patched = raw.replace(closeRe, (_, pre, post) => pre + EOL + entry + post);
    writeUtf8(REGISTRY, patched);
    console.log(`[+] registry entry inserted for ${SLUG}`);
  }
}

// --- 4) Pillar-spoke cannib scan on #26 secondaryKeywords ---
{
  const raw = readUtf8(REGISTRY);
  const pillarSlug = "insulated-glass-complete-guide";
  const slugIdx = raw.indexOf(`slug: '${pillarSlug}'`);
  if (slugIdx === -1) {
    console.log(`[=] ${pillarSlug} not in registry - Pillar scan skipped (OK if Pillar is stub elsewhere)`);
  } else {
    // Find the next secondaryKeywords array after the slug
    const tail = raw.slice(slugIdx);
    const secKeyRe = /secondaryKeywords:\s*\[([^\]]*)\]/;
    const m = secKeyRe.exec(tail);
    if (!m) {
      console.log(`[=] ${pillarSlug} has no secondaryKeywords block - nothing to scan`);
    } else {
      const block = m[1];
      const CONFLICTS = [
        "'triple pane'",
        "'triple pane windows'",
        "'double pane vs triple pane'",
        "'triple glazing'",
        "'triple glazing vs double glazing'",
      ];
      const found = CONFLICTS.filter((c) => block.includes(c));
      if (found.length === 0) {
        console.log(`[OK] ${pillarSlug} secondaryKeywords clean - no Pillar-spoke conflict`);
      } else {
        let cleaned = block;
        for (const c of found) {
          // Remove entry, trailing comma, possible preceding/trailing whitespace line
          cleaned = cleaned.replace(new RegExp(`\\s*${c.replace(/'/g, "\\'")}\\s*,?`), "");
        }
        const absStart = slugIdx + m.index;
        const absEnd = absStart + m[0].length;
        const patched = raw.slice(0, absStart) + `secondaryKeywords: [${cleaned}]` + raw.slice(absEnd);
        writeUtf8(REGISTRY, patched);
        console.log(`[+] cleaned ${found.length} Pillar-spoke conflict(s) from ${pillarSlug} secondaryKeywords:`);
        found.forEach((c) => console.log(`    - ${c}`));
      }
    }
  }
}

// --- 5) RelatedProductsCards: no new product slug needed (insulated-glass already supported) ---
console.log(`[=] RelatedProductsCards PRODUCT_MAP unchanged (insulated-glass/low-e-glass/laminated-glass all pre-supported)`);

// --- 6) Reciprocal inbound links ---
function patchReciprocal(targetSlug, note) {
  const target = path.join(SRC, "app", "blog", targetSlug, "page.tsx");
  if (!fs.existsSync(target)) {
    console.log(`[=] reciprocal target not found: ${targetSlug} (skipped)`);
    return;
  }
  const marker = `GROK-INSERT-V1:triple-pane`;
  const raw = readUtf8(target);
  if (raw.includes(marker)) {
    console.log(`[=] reciprocal link to ${SLUG} already present in ${targetSlug}`);
    return;
  }
  // Anchor: <FAQ items={faqItems}  -- inject a paragraph just before it
  const anchorRe = /(\s*)<FAQ\s+items=\{faqItems\}/;
  if (!anchorRe.test(raw)) {
    console.log(`[=] <FAQ items={faqItems} anchor not found in ${targetSlug} (skipped)`);
    return;
  }
  const insertion =
    `\n        {/* ${marker} */}\n` +
    `        <p className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-slate-700">\n` +
    `          <strong>Related:</strong> ${note}{" "}\n` +
    `          <a href="/blog/${SLUG}" className="font-semibold text-amber-700 underline underline-offset-2">\n` +
    `            Double Pane vs Triple Pane Glass: Is the Upgrade Worth It?\n` +
    `          </a>\n` +
    `        </p>\n`;
  const patched = raw.replace(anchorRe, (match, lead) => `${insertion}${lead}<FAQ items={faqItems}`);
  writeUtf8(target, patched);
  console.log(`[+] reciprocal link inserted into ${targetSlug}`);
}

patchReciprocal(
  "insulated-glass-complete-guide",
  "Choosing between double and triple pane for your IGU spec? Full decision matrix, ROI calculator, and climate-zone guide:"
);
patchReciprocal(
  "insulated-glass-vs-laminated-glass",
  "For the related pane-count decision inside IGU specification, see:"
);

console.log("");
console.log("[DONE] Article #27 deploy complete. Run `npm run build` to verify, then commit + push.");
