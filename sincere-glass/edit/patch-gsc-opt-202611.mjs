#!/usr/bin/env node
/**
 * Sincere Glass - 30-Day GSC Optimization Patch (Title/Meta + Internal Links + GSC FAQs)
 * Marker: SG-GSC-OPT-202611-V1
 * Usage:
 *   node edit/patch-gsc-opt-202611.mjs --dry-run
 *   node edit/patch-gsc-opt-202611.mjs
 *
 * Safety guarantees (SOP v3.0):
 * - Pure ASCII, no-BOM UTF-8
 * - CRLF/LF line-ending preservation
 * - Idempotent via marker SG-GSC-OPT-202611-V1
 * - Writes adjacent .bak backup before every file edit (never .ts/.tsx backups)
 */

import fs from "node:fs";
import path from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "SG-GSC-OPT-202611-V1";
const UPDATED_DATE = "2026-11-24";
const ROOT = process.cwd();

const stats = {
  registryUpdated: 0,
  linksInjected: 0,
  faqsAppended: 0,
  skipped: 0,
  warnings: [],
};

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function writeWithBackup(filePath, newContent) {
  if (DRY_RUN) {
    console.log(`[DRY-RUN] Would write: ${path.relative(ROOT, filePath)}`);
    return;
  }
  const bakPath = `${filePath}.bak`;
  if (!fs.existsSync(bakPath)) {
    fs.copyFileSync(filePath, bakPath);
  }
  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`[UPDATED] ${path.relative(ROOT, filePath)} (backup: ${path.basename(bakPath)})`);
}

// ---------------------------------------------------------------------------
// 1. Registry Title / Excerpt / updatedDate Upgrades (6 Priority GSC Pages)
// ---------------------------------------------------------------------------
const REGISTRY_PATCHES = [
  {
    slug: "architectural-glass-specification-guide",
    title: "Architectural Glass Specifications: 6-Step Spec Guide",
    excerpt:
      "Write airtight architectural glass specifications. Compare ASTM C1048 & EN 12150 tolerances, thickness limits up to 3.3x15m, and glazing schedule formats.",
  },
  {
    slug: "spandrel-glass-guide",
    title: "Spandrel Glass Guide: Ceramic Frit, ASTM C1048 & Specs",
    excerpt:
      "Prevent thermal breakage and color mismatch in facade spandrel glass. Compare ceramic frit vs. opacifier film, heat-strengthened specs, and fallout rules.",
  },
  {
    slug: "12mm-tempered-glass-specifications",
    title: "12mm Tempered Glass Specs: Weight, Max Size & Code Guide",
    excerpt:
      "Complete 12mm tempered glass specifications: 30 kg/m2 weight, ASTM C1048 & EN 12150 strength, max jumbo size (3.3x15m), and balustrade/door load limits.",
  },
  {
    slug: "insulated-glass-vs-laminated-glass",
    title: "Insulated vs. Laminated Glass: U-Value, STC & Hybrid IGUs",
    excerpt:
      "Insulated glass vs. laminated glass compared by U-value, acoustic STC rating, impact safety, and cost - plus when to specify a laminated IGU hybrid unit.",
  },
  {
    slug: "tempered-glass-vs-annealed-glass",
    title: "Annealed vs. Tempered Glass: Definition, Strength & Codes",
    excerpt:
      "What is annealed float glass vs. tempered safety glass? Compare 4-5x impact strength, breakage patterns, cutting rules, and IBC/EN code mandates side by side.",
  },
  {
    slug: "u-factor-and-shgc-explained",
    title: "U-Factor vs. SHGC (G-Value): Window Glass Climate Guide",
    excerpt:
      "What is SHGC vs. U-factor (U-value) and European g-value? Learn target glazing numbers by climate zone and how Low-E coatings tune solar heat gain.",
  },
];

function patchBlogRegistry() {
  const regPath = path.join(ROOT, "src", "lib", "blog-registry.ts");
  if (!fs.existsSync(regPath)) {
    stats.warnings.push(`Missing file: ${regPath}`);
    return;
  }

  let src = fs.readFileSync(regPath, "utf8");
  const eol = detectEol(src);
  let changed = false;

  for (const item of REGISTRY_PATCHES) {
    const slugRe = new RegExp(`slug:\\s*["']${item.slug}["']`);
    const slugMatch = slugRe.exec(src);
    if (!slugMatch) {
      stats.warnings.push(`Registry slug not found: ${item.slug}`);
      continue;
    }

    // Locate the enclosing object block boundaries
    const startIdx = src.lastIndexOf("{", slugMatch.index);
    const nextSlugIdx = src.indexOf("slug:", slugMatch.index + slugMatch[0].length);
    const endSearchLimit = nextSlugIdx === -1 ? src.length : nextSlugIdx;
    const blockEndRel = src.slice(startIdx, endSearchLimit).lastIndexOf("},");
    if (startIdx === -1 || blockEndRel === -1) {
      stats.warnings.push(`Could not bound registry object for: ${item.slug}`);
      continue;
    }
    const endIdx = startIdx + blockEndRel + 2;
    let block = src.slice(startIdx, endIdx);

    if (block.includes(`${MARKER}:${item.slug}`)) {
      console.log(`[SKIP] Registry already patched: ${item.slug}`);
      stats.skipped++;
      continue;
    }

    // Replace title field (single-line or multi-line string literal)
    const titleRe = /(title:\s*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/;
    if (!titleRe.test(block)) {
      stats.warnings.push(`title field not matched in registry for: ${item.slug}`);
      continue;
    }
    block = block.replace(titleRe, `$1"${item.title}"`);

    // Replace excerpt field (single-line or multi-line string literal)
    const excerptRe = /(excerpt:\s*)(?:\r?\n\s*)?(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/;
    if (!excerptRe.test(block)) {
      stats.warnings.push(`excerpt field not matched in registry for: ${item.slug}`);
      continue;
    }
    block = block.replace(excerptRe, `$1"${item.excerpt}"`);

    // Update or insert updatedDate right after publishDate
    const updatedRe = /(updatedDate:\s*)(?:"[^"]*"|'[^']*')/;
    if (updatedRe.test(block)) {
      block = block.replace(updatedRe, `$1"${UPDATED_DATE}"`);
    } else {
      const pubRe = /(publishDate:\s*(?:"[^"]*"|'[^']*'),?)(\r?\n)/;
      if (pubRe.test(block)) {
        block = block.replace(
          pubRe,
          `$1$2    updatedDate: "${UPDATED_DATE}", // ${MARKER}:${item.slug}$2`
        );
      }
    }

    // Ensure marker is present inside block even if updatedDate already existed
    if (!block.includes(`${MARKER}:${item.slug}`)) {
      block = block.replace(
        updatedRe,
        `$1"${UPDATED_DATE}" /* ${MARKER}:${item.slug} */`
      );
    }

    src = src.slice(0, startIdx) + block + src.slice(endIdx);
    changed = true;
    stats.registryUpdated++;
    console.log(`[PLAN] Registry metadata updated: ${item.slug}`);
  }

  if (changed) {
    // Normalize EOL just in case
    const finalSrc = eol === "\r\n" ? src.replace(/\r?\n/g, "\r\n") : src.replace(/\r\n/g, "\n");
    writeWithBackup(regPath, finalSrc);
  }
}

// ---------------------------------------------------------------------------
// 2. Strategic Inbound Internal Links (Strengthening 6 Target Pages)
// ---------------------------------------------------------------------------
const INTERNAL_LINK_PATCHES = [
  {
    sourceSlug: "tempered-glass-vs-laminated-glass",
    markerId: "link-to-12mm-from-art1",
    heading: "Specifying 12mm Monolithic Tempered Panels?",
    bodyBefore: "For frameless entrances, balustrades, and jumbo interior partitions, check our ",
    href: "/blog/12mm-tempered-glass-specifications",
    anchorText: "12mm tempered glass specifications (weight, max jumbo size, and ASTM/EN tolerances)",
    bodyAfter: " before locking hardware schedules.",
  },
  {
    sourceSlug: "balustrade-glass-specification",
    markerId: "link-to-12mm-from-balustrade",
    heading: "Comparing 12mm Monolithic vs. Laminated Guardrails?",
    bodyBefore: "When local codes permit monolithic safety glazing, review our ",
    href: "/blog/12mm-tempered-glass-specifications",
    anchorText: "12mm monolithic tempered glass load limits and specifications",
    bodyAfter: " for panel weight (30 kg/m2) and edge-clearance rules.",
  },
  {
    sourceSlug: "insulated-glass-complete-guide",
    markerId: "link-to-igu-vs-lam-and-ufactor-from-pillar26",
    heading: "Related Insulated Glass Deep Dives",
    multiLinks: [
      {
        bodyBefore: "Weighing acoustic and impact safety against thermal savings? See our ",
        href: "/blog/insulated-glass-vs-laminated-glass",
        anchorText: "insulated glass vs. laminated glass comparison (including laminated IGU hybrids)",
        bodyAfter: ".",
      },
      {
        bodyBefore: "Need exact thermal targets for your climate zone? Read our ",
        href: "/blog/u-factor-and-shgc-explained",
        anchorText: "U-factor vs. SHGC and European g-value climate selection guide",
        bodyAfter: ".",
      },
    ],
  },
  {
    sourceSlug: "architectural-glass-types-guide",
    markerId: "link-to-annealed-and-igulam-from-types-pillar",
    heading: "Key Decision Guides in This Cluster",
    multiLinks: [
      {
        bodyBefore: "Unsure where standard float glazing stops and safety codes begin? Start with our ",
        href: "/blog/tempered-glass-vs-annealed-glass",
        anchorText: "annealed float glass vs. tempered safety glass strength and code guide",
        bodyAfter: ".",
      },
      {
        bodyBefore: "Balancing energy code compliance with STC acoustic targets? Compare ",
        href: "/blog/insulated-glass-vs-laminated-glass",
        anchorText: "acoustic and thermal trade-offs between insulated and laminated glass",
        bodyAfter: ".",
      },
    ],
  },
  {
    sourceSlug: "how-is-tempered-glass-made",
    markerId: "link-to-annealed-from-art4",
    heading: "Annealed Float Substrate vs. Finished Tempered Glass",
    bodyBefore: "Every tempered lite begins as annealed float glass before entering the 620-650 C furnace. See ",
    href: "/blog/tempered-glass-vs-annealed-glass",
    anchorText: "how annealed float glass compares to finished tempered glass",
    bodyAfter: " across modulus of rupture, breakage pattern, and cutting rules.",
  },
  {
    sourceSlug: "double-pane-vs-triple-pane-glass",
    markerId: "link-to-ufactor-from-art27",
    heading: "Decoding U-Factor, SHGC, and G-Value Targets",
    bodyBefore: "Before deciding whether triple glazing pays back in your region, check ",
    href: "/blog/u-factor-and-shgc-explained",
    anchorText: "how U-factor and SHGC targets shift across climate zones",
    bodyAfter: ".",
  },
  {
    sourceSlug: "curtain-wall-glass-specification",
    markerId: "link-to-spandrel-and-spec-from-art8",
    heading: "Complete Your Facade Glazing Schedule",
    multiLinks: [
      {
        bodyBefore: "Detailing opaque slab-edge zones? Review our ",
        href: "/blog/spandrel-glass-guide",
        anchorText: "ceramic frit spandrel glass thermal-breakage and ASTM C1048 guide",
        bodyAfter: ".",
      },
      {
        bodyBefore: "For a complete end-to-end spec workflow, use our ",
        href: "/blog/architectural-glass-specification-guide",
        anchorText: "6-step architectural glass specification and glazing schedule guide",
        bodyAfter: ".",
      },
    ],
  },
];

function buildCalloutJsx(patch, useLinkTag, eol) {
  const Tag = useLinkTag ? "Link" : "a";
  const lines = [];
  lines.push(`      {/* ${MARKER}:${patch.markerId} */}`);
  lines.push(
    `      <div className="my-8 rounded-xl border border-amber-500/30 bg-slate-900/5 p-5 dark:bg-slate-800/40">`
  );
  lines.push(`        <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">`);
  lines.push(`          ${patch.heading}`);
  lines.push(`        </p>`);

  if (patch.multiLinks) {
    lines.push(`        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">`);
    for (const item of patch.multiLinks) {
      lines.push(
        `          <li>${item.bodyBefore}<${Tag} href="${item.href}" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-600 dark:text-amber-400">${item.anchorText}</${Tag}>${item.bodyAfter}</li>`
      );
    }
    lines.push(`        </ul>`);
  } else {
    lines.push(
      `        <p className="text-sm text-slate-700 dark:text-slate-300">${patch.bodyBefore}<${Tag} href="${patch.href}" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-600 dark:text-amber-400">${patch.anchorText}</${Tag}>${patch.bodyAfter}</p>`
    );
  }
  lines.push(`      </div>`);
  return lines.join(eol) + eol + eol;
}

function patchInternalLinks() {
  for (const patch of INTERNAL_LINK_PATCHES) {
    const pagePath = path.join(ROOT, "src", "app", "blog", patch.sourceSlug, "page.tsx");
    if (!fs.existsSync(pagePath)) {
      stats.warnings.push(`Source page not found for internal link: ${patch.sourceSlug}`);
      continue;
    }

    const src = fs.readFileSync(pagePath, "utf8");
    const eol = detectEol(src);
    const fullMarker = `${MARKER}:${patch.markerId}`;

    if (src.includes(fullMarker)) {
      console.log(`[SKIP] Internal link already present in: ${patch.sourceSlug}`);
      stats.skipped++;
      continue;
    }

    const hasLinkImport = /import\s+Link\s+from\s+["'][^"']+["']/.test(src);
    const callout = buildCalloutJsx(patch, hasLinkImport, eol);

    // Anchor priority: right before <FAQ ... /> or before </BlogArticleLayout>
    let anchorRe = /([ \t]*<FAQ\b)/;
    if (!anchorRe.test(src)) {
      anchorRe = /([ \t]*<\/BlogArticleLayout>)/;
    }
    if (!anchorRe.test(src)) {
      stats.warnings.push(
        `No <FAQ or </BlogArticleLayout> anchor in ${patch.sourceSlug}. Tail: ${src.slice(-400)}`
      );
      continue;
    }

    const updated = src.replace(anchorRe, `${callout}$1`);
    writeWithBackup(pagePath, updated);
    stats.linksInjected++;
  }
}

// ---------------------------------------------------------------------------
// 3. GSC Long-Tail FAQ Appends (Capturing Real High-Impression Queries)
// ---------------------------------------------------------------------------
const FAQ_PATCHES = [
  {
    slug: "tempered-glass-vs-annealed-glass",
    markerId: "faq-annealed-gsc",
    items: [
      {
        q: "What is annealed float glass and where is it still allowed by code?",
        a: "Annealed float glass is standard flat glass cooled slowly in an annealing lehr to relieve internal stress, allowing it to be cut, drilled, or edged after manufacture. Under IBC Section 2406 and EN 12600, annealed glass is permitted in non-hazardous locations such as upper-floor fixed windows above sill height, interior display cases, and mirror substrates, but is prohibited in doors, sidelites, shower enclosures, and low-level glazing.",
      },
      {
        q: "What is the difference between annealed glass and standard float glass?",
        a: "All standard float glass starts as annealed glass: float refers to the tin-bath forming method, while annealed refers to the slow-cooling heat treatment that leaves the sheet unstressed. Glass only ceases to be annealed when it undergoes secondary heat-strengthening or full tempering in a 620-650 C furnace.",
      },
    ],
  },
  {
    slug: "insulated-glass-vs-laminated-glass",
    markerId: "faq-igu-lam-gsc",
    items: [
      {
        q: "Can you combine laminated glass and insulated glass into one unit?",
        a: "Yes. A laminated insulated glass unit (laminated IGU) uses a laminated pane on one or both sides of the sealed air or argon cavity - for example, 6+1.52 PVB+6 laminated outer lite + 12A argon spacer + 6mm Low-E tempered inner lite. This hybrid delivers both low U-value thermal insulation and high STC acoustic damping plus overhead or hurricane safety compliance.",
      },
    ],
  },
  {
    slug: "u-factor-and-shgc-explained",
    markerId: "faq-shgc-gvalue-gsc",
    items: [
      {
        q: "What is the difference between SHGC and European g-value?",
        a: "SHGC (Solar Heat Gain Coefficient, NFRC 200) and European g-value (EN 410) measure the same property: the fraction of incident solar radiation admitted through glazing, expressed from 0 to 1. Because NFRC 200 and EN 410 use slightly different standard boundary temperatures and solar spectra, a unit's SHGC and g-value typically differ by 0.01 to 0.03.",
      },
    ],
  },
];

function patchFaqs() {
  for (const patch of FAQ_PATCHES) {
    const pagePath = path.join(ROOT, "src", "app", "blog", patch.slug, "page.tsx");
    if (!fs.existsSync(pagePath)) {
      stats.warnings.push(`Page not found for FAQ append: ${patch.slug}`);
      continue;
    }

    const src = fs.readFileSync(pagePath, "utf8");
    const eol = detectEol(src);
    const fullMarker = `${MARKER}:${patch.markerId}`;

    if (src.includes(fullMarker)) {
      console.log(`[SKIP] GSC FAQs already present in: ${patch.slug}`);
      stats.skipped++;
      continue;
    }

    // Match `const faqItems ... = [ ... ];`
    const faqStartRe = /const\s+faqItems(?:\s*:\s*[^=]+)?\s*=\s*\[/;
    const startMatch = faqStartRe.exec(src);
    if (!startMatch) {
      stats.warnings.push(`const faqItems not found in ${patch.slug}`);
      continue;
    }

    const arrayBodyStart = startMatch.index + startMatch[0].length;
    const closeIdx = src.indexOf("];", arrayBodyStart);
    if (closeIdx === -1) {
      stats.warnings.push(`Closing ]; for faqItems not found in ${patch.slug}`);
      continue;
    }

    const beforeClose = src.slice(0, closeIdx).trimEnd();
    const needsComma = !beforeClose.endsWith(",") && !beforeClose.endsWith("[");

    const newEntries = patch.items
      .map(
        (item) =>
          `  {${eol}    q: "${item.q}",${eol}    a: "${item.a}",${eol}  },`
      )
      .join(eol);

    const insertion = `${needsComma ? "," : ""}${eol}  // ${fullMarker}${eol}${newEntries}${eol}`;
    const updated = beforeClose + insertion + src.slice(closeIdx);

    writeWithBackup(pagePath, updated);
    stats.faqsAppended += patch.items.length;
  }
}

// ---------------------------------------------------------------------------
// Main Execution
// ---------------------------------------------------------------------------
console.log(`=== Sincere Glass GSC Optimization Patch (${MARKER}) ===`);
console.log(`Mode: ${DRY_RUN ? "DRY-RUN (no files modified)" : "APPLY"}`);
console.log("");

patchBlogRegistry();
patchInternalLinks();
patchFaqs();

console.log("");
console.log("=== Summary ===");
console.log(`Registry entries updated : ${stats.registryUpdated}`);
console.log(`Internal link blocks     : ${stats.linksInjected}`);
console.log(`GSC FAQ items appended   : ${stats.faqsAppended}`);
console.log(`Skipped (already patched): ${stats.skipped}`);
console.log(`Warnings                 : ${stats.warnings.length}`);
if (stats.warnings.length > 0) {
  for (const w of stats.warnings) {
    console.error(`  [WARN] ${w}`);
  }
}
if (!DRY_RUN) {
  console.log("");
  console.log("Next step: run `npm run build` immediately to verify zero TypeScript/SWC errors.");
}
