// Deploy Article #30: Insulated Glass Spacer - Warm Edge vs Aluminum (W2-#10)
// Marker in files: none needed (new files). Idempotent via registry slug check.
// Runtime cannibalization audit against the LIVE registry; HALTS on hard-rule-1 violation.
// CRLF-tolerant registry insert. .bak backups. ASCII-only templates enforced.
// Run from project root:  node edit\deploy-article-30.mjs   then   npm run build
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const SLUG = "insulated-glass-spacer-warm-edge-vs-aluminum";
const NEW_TARGET = "insulated glass spacer";
const NEW_SECONDARIES = [
  "warm edge spacer",
  "aluminum spacer bar",
  "warm edge vs aluminum",
  "igu spacer bar",
  "spacer bar conductivity",
];

const REGISTRY = "src/lib/blog-registry.ts";
const PAGE_DIR = "src/app/blog/" + SLUG;
const PAGE = PAGE_DIR + "/page.tsx";
const COMP_DIR = "src/components/blog/article-30";
const COMPONENTS = ["SpacerConductivityComparator", "SpacerCondensationChecker", "SpacerSelectorMatrix"];
const PAGE_TEMPLATE = "page-article-30-" + SLUG + ".tsx.txt";

function fail(msg) {
  console.error("ABORT: " + msg);
  console.error("Nothing was written.");
  process.exit(1);
}

// ---- preconditions
if (!existsSync(REGISTRY)) fail("missing " + REGISTRY + " (run from project root)");

// load templates (ASCII check)
function loadTemplate(base) {
  const a = "edit/" + base;
  const b = base;
  const src = existsSync(a) ? a : existsSync(b) ? b : null;
  if (!src) fail("template not found: edit/" + base);
  const body = readFileSync(src, "utf8");
  if (/[^\x00-\x7F]/.test(body)) fail(src + " has non-ASCII characters");
  return body;
}
const compBodies = {};
for (const c of COMPONENTS) compBodies[c] = loadTemplate(c + ".tsx.txt");
const pageBody = loadTemplate(PAGE_TEMPLATE);

let reg = readFileSync(REGISTRY, "utf8");
const EOL = reg.includes("\r\n") ? "\r\n" : "\n";
const toEol = (s) => s.replace(/\r?\n/g, EOL);

// ---- idempotency
if (reg.includes("slug: '" + SLUG + "'") || reg.includes('slug: "' + SLUG + '"')) {
  console.log("Registry already has slug " + SLUG + " - skipping registry insert. Re-writing component/page files only.");
} else {
  // ---- runtime cannibalization audit (HARD RULE 1)
  const targets = [...reg.matchAll(/targetKeyword:\s*['"]([^'"]+)['"]/g)].map((m) => m[1].toLowerCase());
  const secBlocks = [...reg.matchAll(/secondaryKeywords:\s*\[([\s\S]*?)\]/g)];
  const allSecondaries = [];
  for (const b of secBlocks) for (const q of b[1].matchAll(/['"]([^'"]+)['"]/g)) allSecondaries.push(q[1].toLowerCase());

  const v1 = allSecondaries.includes(NEW_TARGET.toLowerCase());
  const v2 = NEW_SECONDARIES.filter((s) => targets.includes(s.toLowerCase()));
  if (v1) fail("HARD RULE 1: new targetKeyword '" + NEW_TARGET + "' already sits in another article's secondaryKeywords. Resolve before building.");
  if (v2.length) fail("HARD RULE 1: these new secondaryKeywords equal an existing targetKeyword: " + v2.join(", ") + ". Remove or re-scope them.");
  console.log("Cannibalization audit passed (" + targets.length + " targetKeywords, " + allSecondaries.length + " secondaryKeywords scanned).");

  // ---- build registry entry (apostrophe-safe: double quotes on prose)
  const entry = [
    "  {",
    "    slug: '" + SLUG + "',",
    '    title: "Insulated Glass Spacer: Warm Edge vs Aluminum, and When the Upgrade Pays",',
    '    excerpt: "The spacer sets how cold the glass edge gets. Warm edge lifts the edge a few degrees Celsius, cutting condensation and improving the whole-window U-factor. A factory guide to psi-values, the four warm edge families, and which to specify by climate.",',
    "    targetKeyword: '" + NEW_TARGET + "',",
    "    secondaryKeywords: [",
    ...NEW_SECONDARIES.map((s) => "      '" + s + "',"),
    "    ],",
    "    searchKeywords: [",
    "      'insulated glass spacer', 'warm edge spacer', 'aluminum spacer bar',",
    "      'warm edge vs aluminum', 'igu spacer', 'spacer bar',",
    "      'TGI spacer', 'TPS spacer', 'foam spacer', 'stainless steel spacer',",
    "      'psi value spacer', 'edge of glass temperature', 'warm edge condensation',",
    "      '\\u4e2d\\u7a7a\\u73bb\\u7483\\u95f4\\u9694\\u6761', '\\u6696\\u8fb9\\u95f4\\u9694\\u6761', '\\u94dd\\u95f4\\u9694\\u6761',",
    "    ],",
    "    publishDate: '2026-11-14',",
    "    category: 'Technical Guide' as const,",
    "    tags: ['insulated glass', 'IGU', 'spacer', 'warm edge', 'condensation', 'thermal bridge'],",
    "    heroImage: '/images/blog/insulated-glass-spacer-warm-edge-vs-aluminum-hero.webp',",
    '    heroImageAlt: "Macro cross-section of an insulated glass unit edge showing the spacer bar, desiccant and dual seal between two glass panes on a dark background",',
    "    cluster: 'technical' as const,",
    "    articleType: 'technical' as const,",
    "    readingTime: 11,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "  },",
  ].join(EOL);

  const anchorRe = /\r?\n\];\r?\n\r?\n\/\/ ---- Utility functions/;
  if (!anchorRe.test(reg)) {
    console.error("---- registry tail (last 400 chars) ----");
    console.error(reg.slice(-400));
    fail("registry array-close anchor not found (expected '];' then a blank line then '// ---- Utility functions').");
  }
  reg = reg.replace(anchorRe, (full) => EOL + entry + full);
  writeFileSync(REGISTRY + ".bak", readFileSync(REGISTRY, "utf8"), "utf8");
  writeFileSync(REGISTRY, reg, "utf8");
  console.log("Registry entry inserted (backup: blog-registry.ts.bak).");
}

// ---- write components + page
if (!existsSync(COMP_DIR)) mkdirSync(COMP_DIR, { recursive: true });
for (const c of COMPONENTS) {
  const dest = COMP_DIR + "/" + c + ".tsx";
  const body = toEol(compBodies[c]);
  if (existsSync(dest) && readFileSync(dest, "utf8") === body) console.log("SKIP " + dest + " (identical)");
  else { writeFileSync(dest, body, "utf8"); console.log("WROTE " + dest); }
}
if (!existsSync(PAGE_DIR)) mkdirSync(PAGE_DIR, { recursive: true });
{
  const body = toEol(pageBody);
  if (existsSync(PAGE) && readFileSync(PAGE, "utf8") === body) console.log("SKIP " + PAGE + " (identical)");
  else { writeFileSync(PAGE, body, "utf8"); console.log("WROTE " + PAGE); }
}
console.log("\nDone. Now run: npm run build");
console.log("Reciprocal inbound links (#26/#27/#28/#29/how-made -> #30) are NOT auto-patched - see delivery doc section 5.");
