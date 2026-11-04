// append-insulated-complete-guide-registry.mjs
// Add the missing blog-registry entry for Article #26:
//   /blog/insulated-glass-complete-guide
//
// Page file src\app\blog\insulated-glass-complete-guide\page.tsx was deployed
// 2026-11-04 10:07 but its registry entry was never inserted (Article #25-style
// CRLF-anchor failure, see project preferences 2026-11-03 fix). Build fails in
// "Collecting page data" with: Cannot read properties of undefined (reading 'title')
//
// Run from project root: node edit\append-insulated-complete-guide-registry.mjs --dry
// Then (if dry looks right):
//   node edit\append-insulated-complete-guide-registry.mjs
//   npm run build
//
// Safety:
//  - .bak backup of blog-registry.ts
//  - CRLF-tolerant regex anchor matching `  },\r?\n];\r?\n` with exactly-once validation
//  - Idempotent: skips if slug already present
//  - Output line endings match file's detected EOL
//  - --dry prints the entry and target insertion point without writing

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "src", "lib", "blog-registry.ts");
const SLUG = "insulated-glass-complete-guide";
const DRY_RUN = process.argv.includes("--dry");

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`[fatal] registry not found: ${REGISTRY_PATH}`);
  process.exit(1);
}

const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
const EOL = raw.includes("\r\n") ? "\r\n" : "\n";

// --- Idempotency check ---
if (raw.includes(`slug: '${SLUG}'`) || raw.includes(`slug: "${SLUG}"`)) {
  console.log(`[skip] slug '${SLUG}' already present in registry. Nothing to do.`);
  process.exit(0);
}

// --- Entry content ---
// All text uses double quotes so apostrophes in English prose don't break parsing
// (per project preferences 2026-10-27 apostrophe escape rule).
// All single-quoted fields are ASCII-only, no apostrophes.
const ENTRY = [
  `  {`,
  `    slug: '${SLUG}',`,
  `    title: "Insulated Glass: The Complete Guide to IGU Specification, Performance, and 25-Year Life",`,
  `    excerpt: "A factory-perspective complete guide to Insulated Glass Units: anatomy, U-value and SHGC performance, build-up selection by climate, condensation control, standards, jumbo IGU limits, and procurement realities from a Wuhan manufacturer.",`,
  `    targetKeyword: 'insulated glass complete guide',`,
  `    secondaryKeywords: [`,
  `      'insulated glass unit guide',`,
  `      'igu specification',`,
  `      'double glazing complete guide',`,
  `      'insulated glass performance',`,
  `      'igu build up',`,
  `      'igu anatomy',`,
  `    ],`,
  `    searchKeywords: [`,
  `      'insulated glass', 'insulated glass unit', 'IGU', 'double glazed unit', 'DGU',`,
  `      'insulated glazing guide', 'igu specification guide', 'double pane glass guide',`,
  `      'triple pane igu', 'argon filled igu', 'low-e igu', 'igu u-value',`,
  `      'igu shgc', 'warm edge spacer', 'dual seal igu',`,
  `      'IGU', 'DGU', 'U-value', 'SHGC', 'STC',`,
  `      '\u4e2d\u7a7a\u73bb\u7483', '\u4e2d\u7a7a\u73bb\u7483\u89c4\u683c', '\u4e2d\u7a7a\u73bb\u7483\u5b8c\u6574\u6307\u5357'`,
  `    ],`,
  `    publishDate: '2026-11-04',`,
  `    updatedDate: '2026-11-04',`,
  `    category: 'Product Knowledge' as const,`,
  `    tags: ['insulated glass', 'IGU', 'specifications', 'performance', 'complete guide', 'product deep dive'],`,
  `    heroImage: '/images/blog/insulated-glass-complete-guide-hero.webp',`,
  `    heroImageAlt: 'Cross-section view of a dual-seal insulated glass unit with warm-edge spacer and low-e coating visible on the inner surface of the outer lite',`,
  `    heroImagePrompt: "Macro architectural photography of a vertical cross-section sample of a dual-sealed insulated glass unit mounted on a dark polished concrete plinth. Build-up visible edge-on: 6mm clear tempered outer lite, 12mm argon-filled cavity with grey warm-edge spacer bar, 6mm tempered inner lite with faint bluish Low-E coating sheen on surface 3. Dual seal clearly visible: inner PIB primary seal (thin black band) and outer silicone secondary seal (wider grey band). Soft overhead studio lighting with warm amber #DAA745 rim light raking across the top edge revealing the coating sheen. Dark #1C1F26 background, shallow depth of field focused on the seal zone. 16:9 cinematic composition, 20-degree slight-above camera angle. No humans, no text, no logos. 4K photorealistic, museum-exhibit quality, documentary industrial style.",`,
  `    author: DEFAULT_AUTHOR,`,
  `    readingTime: 18,`,
  `    featured: false,`,
  `    reviewedBy: { name: 'Albar', title: 'Technical Lead' },`,
  `    articleType: 'buyer-guide' as const,`,
  `    cluster: 'product',`,
  `    relatedProductSlugs: ['insulated-glass', 'low-e-glass', 'laminated-glass'],`,
  `    translations: {},`,
  `    changelog: [`,
  `      { date: '2026-11-04', note: 'Initial publish \u2014 complete guide for Insulated Glass in Product Deep Dives cluster' },`,
  `    ],`,
  `  },`,
].join(EOL);

// --- Anchor matching: find the array-closing pattern `  },\r?\n];\r?\n`
// This matches the final object closer `  },` followed by the array terminator `];`.
// Function signatures and type annotations don't produce this exact sequence
// (BlogArticle[] uses [], not ];, and type declarations don't precede with `  },`).
// Validate match count === 1 before proceeding.
const anchorRe = /(^|\r?\n)(  \},)(\r?\n)(\];)(\r?\n)/g;
const matches = [...raw.matchAll(anchorRe)];

if (matches.length === 0) {
  console.error("[fatal] no anchor match found for `  },\\n];\\n` pattern.");
  console.error("Tail 400 chars of registry for diagnosis:");
  console.error("---");
  console.error(raw.slice(-400));
  console.error("---");
  process.exit(2);
}

if (matches.length > 1) {
  console.error(`[fatal] expected exactly 1 anchor match, found ${matches.length}.`);
  console.error("All match contexts (60 chars before + match + 60 after):");
  for (const m of matches) {
    const i = m.index ?? 0;
    console.error("---");
    console.error(raw.slice(Math.max(0, i - 60), i + m[0].length + 60).replace(/\r?\n/g, " | "));
  }
  process.exit(3);
}

// --- Perform insertion ---
const match = matches[0];
const matchIndex = match.index;
const matchLen = match[0].length;
const [, lead, lastObjClose, nl1, arrEnd, nl2] = match;

// Construct replacement: keep `  },` and the newline, then insert new entry + `,`,
// then newline, then `];`, then newline.
// Insertion point: right AFTER the existing `  },` so we get:
//   ...last-existing-entry
//   },
//   {   <-- new entry starts
//     slug: '...',
//     ...
//   },
//   ];
const replacement = `${lead}${lastObjClose}${nl1}${ENTRY}${nl1}${arrEnd}${nl2}`;

const out =
  raw.slice(0, matchIndex) + replacement + raw.slice(matchIndex + matchLen);

// --- Line number estimate for anchor (for human sanity check) ---
const lineNumber = raw.slice(0, matchIndex + lead.length).split(/\r?\n/).length;

// --- Report ---
console.log("");
console.log(`=== Registry entry for '${SLUG}' ${DRY_RUN ? "(DRY RUN)" : ""} ===`);
console.log("");
console.log(`Registry file:        ${path.relative(ROOT, REGISTRY_PATH).replace(/\\/g, "/")}`);
console.log(`Line endings:         ${EOL === "\r\n" ? "CRLF" : "LF"}`);
console.log(`Anchor match count:   ${matches.length} (expect 1)`);
console.log(`Anchor at approx line: ${lineNumber}`);
console.log(`Entry lines to insert: ${ENTRY.split(EOL).length}`);
console.log(`New file size delta:  +${(out.length - raw.length)} bytes`);
console.log("");

if (DRY_RUN) {
  console.log("--- Entry preview (first 15 lines) ---");
  console.log(ENTRY.split(EOL).slice(0, 15).join(EOL));
  console.log("  ...");
  console.log("--- end preview ---");
  console.log("");
  console.log("DRY RUN complete. Re-run without --dry to apply.");
  process.exit(0);
}

// --- Write .bak and new file ---
const bak = REGISTRY_PATH + ".bak";
if (!fs.existsSync(bak)) {
  fs.writeFileSync(bak, raw, "utf8");
  console.log(`Backup written: ${path.relative(ROOT, bak).replace(/\\/g, "/")}`);
} else {
  console.log(`Backup already exists (preserved): ${path.relative(ROOT, bak).replace(/\\/g, "/")}`);
}

fs.writeFileSync(REGISTRY_PATH, out, "utf8");
console.log(`Registry updated. New entry inserted for '${SLUG}'.`);
console.log("");
console.log("Next: npm run build");
console.log("");
console.log("If build fails, roll back:");
console.log(`  Move-Item ${path.relative(ROOT, bak).replace(/\\/g, "\\")} ${path.relative(ROOT, REGISTRY_PATH).replace(/\\/g, "\\")} -Force`);
