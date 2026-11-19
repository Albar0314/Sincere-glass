// deploy-tool-container-load.mjs
// Deploys the /tools logistics calculator: glass-container-load-calculator
//
// Idempotent. CRLF-tolerant. .bak backups. Safe to re-run.
// - Writes ContainerLoadTool.tsx to src/components/tools/
// - Writes page.tsx to src/app/tools/glass-container-load-calculator/
// - Patches src/lib/tools-registry.ts:
//     (a) adds "ContainerLoad" to the ToolComponent union (idempotent)
//     (b) inserts the Tool entry before the tools array close (skip if slug present)
// - Runtime tool-cannibalization note against existing tool targetKeywords.
//
// NOT auto-patched (needs the current file contents - see delivery doc):
//   - src/app/sitemap.ts            (add the new tool URL + hreflang)
//   - src/components/SearchModal.tsx (add the tool to the Cmd+K index)
// The /tools hub lists from the registry, so the new tool auto-appears there.
//
// Run from project root:  node deploy-tool-container-load.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SLUG = "glass-container-load-calculator";
const COMPONENT_PATH = path.join(ROOT, "src", "components", "tools", "ContainerLoadTool.tsx");
const PAGE_DIR = path.join(ROOT, "src", "app", "tools", SLUG);
const REGISTRY_PATH = path.join(ROOT, "src", "lib", "tools-registry.ts");

const NEW_TARGET = "glass container load calculator";
const NEW_SECONDARIES = [
  "container loading calculator",
  "how much glass fits in a container",
  "glass shipping weight calculator",
  "40hq glass capacity",
];

function detectEol(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}
function backup(fp) {
  if (fs.existsSync(fp)) fs.copyFileSync(fp, fp + ".bak");
}
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// ----- preflight -----
if (!fs.existsSync(REGISTRY_PATH)) {
  console.error("ABORT: tools-registry.ts not found - run from project root.");
  process.exit(1);
}

// ----- Step 0: tool cannibalization note (informational) -----
function auditToolKeyword() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  const targets = [...raw.matchAll(/targetKeyword:\s*["']([^"']+)["']/g)].map((m) => m[1].toLowerCase());
  if (targets.includes(NEW_TARGET.toLowerCase())) {
    console.error(`ABORT: targetKeyword "${NEW_TARGET}" already exists in tools-registry. A duplicate tool exists.`);
    process.exit(1);
  }
  for (const s of NEW_SECONDARIES) {
    if (targets.includes(s.toLowerCase())) {
      console.error(`ABORT: new secondaryKeyword "${s}" equals an existing tool targetKeyword. Adjust NEW_SECONDARIES.`);
      process.exit(1);
    }
  }
  console.log("[audit] tool keyword audit passed (no hard conflict vs existing tools).");
  console.log("[audit] note: blog #14 target 'glass container shipping' is a GUIDE intent; this tool targets the CALCULATOR intent - distinct.");
}

// ----- Step 1: write component -----
function writeComponent() {
  const srcCopy = path.join(ROOT, "edit", "ContainerLoadTool.tsx.txt");
  if (!fs.existsSync(srcCopy)) throw new Error(`Missing source: ${srcCopy}`);
  ensureDir(path.dirname(COMPONENT_PATH));
  backup(COMPONENT_PATH);
  fs.copyFileSync(srcCopy, COMPONENT_PATH);
  console.log(`[component] wrote ${COMPONENT_PATH}`);
}

// ----- Step 2: write page -----
function writePage() {
  const srcCopy = path.join(ROOT, "edit", "page-tool-container-load.tsx.txt");
  if (!fs.existsSync(srcCopy)) throw new Error(`Missing source: ${srcCopy}`);
  ensureDir(PAGE_DIR);
  const target = path.join(PAGE_DIR, "page.tsx");
  backup(target);
  fs.copyFileSync(srcCopy, target);
  console.log(`[page] wrote ${target}`);
}

// ----- Step 3a: add "ContainerLoad" to the ToolComponent union -----
function patchUnion() {
  let raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  if (raw.includes('"ContainerLoad"')) {
    console.log('[union] "ContainerLoad" already present, skipping');
    return;
  }
  const EOL = detectEol(raw);
  const needle = '| "TriplePaneROI";';
  if (!raw.includes(needle)) {
    throw new Error('[union] could not find \'| "TriplePaneROI";\' to extend the ToolComponent union. Inspect tools-registry.ts.');
  }
  backup(REGISTRY_PATH);
  raw = raw.replace(needle, `| "TriplePaneROI"${EOL}  | "ContainerLoad";`);
  fs.writeFileSync(REGISTRY_PATH, raw, "utf8");
  console.log('[union] added "ContainerLoad" to ToolComponent');
}

// ----- Step 3b: insert the Tool entry (idempotent) -----
function insertEntry() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  if (raw.includes(`slug: "${SLUG}"`) || raw.includes(`slug: '${SLUG}'`)) {
    console.log("[registry] entry already present, skipping");
    return;
  }
  const EOL = detectEol(raw);
  const anchor = /(\r?\n  \},)(\r?\n\];\s*\r?\n\s*\r?\n\/\/ ---- Utility functions ----)/;
  if (!anchor.test(raw)) {
    throw new Error("[registry] anchor not found. Expected '  },\\n];\\n\\n// ---- Utility functions ----'. Inspect the tools array tail.");
  }

  const entryLines = [
    `  {`,
    `    slug: "${SLUG}",`,
    `    title:`,
    `      "Glass Container Loading Calculator: How Much Glass Fits in a Container | Sincere Glass",`,
    `    shortTitle: "Container Loading Calculator",`,
    `    description:`,
    `      "Estimate how many square meters of architectural glass fit in a 20ft or 40ft container, the loaded weight, and whether the load is weight-limited or volume-limited, by glass thickness and crate strategy.",`,
    `    metaDescription:`,
    `      "Free glass container loading calculator. Enter container type, glass thickness and crate strategy to estimate m2 per container, loaded weight in tonnes, and the limiting factor for your sea freight.",`,
    `    targetKeyword: "${NEW_TARGET}",`,
    `    secondaryKeywords: [`,
    ...NEW_SECONDARIES.map((s) => `      "${s}",`),
    `    ],`,
    `    searchKeywords: [`,
    `      "glass container load",`,
    `      "container loading calculator",`,
    `      "how much glass per container",`,
    `      "glass shipping weight",`,
    `      "40hq glass capacity",`,
    `      "20ft container glass",`,
    `      "glass m2 per container",`,
    `      "FCL glass load",`,
    `      "container payload glass",`,
    `      "\\u73bb\\u7483\\u88c5\\u67dc\\u8ba1\\u7b97",`,
    `      "\\u4e00\\u4e2a\\u67dc\\u88c5\\u591a\\u5c11\\u73bb\\u7483",`,
    `      "\\u73bb\\u7483\\u6d77\\u8fd0\\u91cd\\u91cf",`,
    `    ],`,
    `    category: "logistics",`,
    `    component: "ContainerLoad",`,
    `    howToName: "How to estimate a glass container load",`,
    `    howToSteps: [`,
    `      {`,
    `        name: "Pick the container type",`,
    `        text:`,
    `          "Choose the container you plan to ship in: 20ft dry, 40ft high-cube, or 40ft open-top. Each has a different payload limit, which is usually what caps a glass load.",`,
    `      },`,
    `      {`,
    `        name: "Pick the glass thickness or build-up",`,
    `        text:`,
    `          "Select the product: 6 to 12 mm monolithic, an insulated glass unit, or a laminated build-up. This sets the weight per square meter, from about 15 to 36 kg/m2.",`,
    `      },`,
    `      {`,
    `        name: "Pick the crate strategy",`,
    `        text:`,
    `          "Choose A-frame crates, L-type crates, or fumigated wooden boxes. The crate strategy sets both the usable packing density and the share of payload taken by the crates themselves.",`,
    `      },`,
    `      {`,
    `        name: "Read the capacity, weight and limiting factor",`,
    `        text:`,
    `          "The calculator returns indicative square meters per container, the loaded weight in tonnes, and whether the load is weight-limited or volume-limited, plus a damage-risk note for the combination.",`,
    `      },`,
    `      {`,
    `        name: "Confirm against a real packing list",`,
    `        text:`,
    `          "Figures use industry-default packing assumptions. Send your exact panel sizes and quantities so we can confirm real capacity, crate count and freight before you book.",`,
    `      },`,
    `    ],`,
    `    faq: [`,
    `      {`,
    `        q: "How many square meters of glass fit in a 40ft container?",`,
    `        a: "It depends on thickness. A 40ft high-cube typically carries roughly 800 to 1,900 m2 of glass depending on whether it is thin monolithic or heavy IGU/laminated, because glass fills on weight before volume. Use the calculator for your exact build-up.",`,
    `      },`,
    `      {`,
    `        q: "Is a glass container load limited by weight or by volume?",`,
    `        a: "Almost always weight. Glass is dense (2,500 kg/m3), so a container usually hits its payload limit well before the floor is full. The calculator shows which limit is reached first for your configuration.",`,
    `      },`,
    `      {`,
    `        q: "Does the estimate include the weight of the crates?",`,
    `        a: "Yes. The loaded weight adds the crate weight back on top of the glass, using a 12 to 28 percent crate share depending on the crate strategy. The payload check is against the full crated weight.",`,
    `      },`,
    `      {`,
    `        q: "Is this calculator a formal quote?",`,
    `        a: "No. It uses industry-default packing assumptions, not your exact panel sizes or our live crate specs. It is for planning. Use the quote button to have us confirm real capacity, crate count and freight.",`,
    `      },`,
    `    ],`,
    `    relatedProductSlugs: ["insulated-glass", "laminated-glass", "tempered-glass"],`,
    `    relatedArticleSlugs: [`,
    `      "glass-shipping-container-loading-guide",`,
    `      "how-to-import-glass-from-china",`,
    `    ],`,
    `    publishDate: "2026-11-18",`,
    `    featured: true,`,
    `  },`,
  ];

  const entry = entryLines.join(EOL);
  backup(REGISTRY_PATH);
  const updated = raw.replace(anchor, `$1${EOL}${entry}$2`);
  fs.writeFileSync(REGISTRY_PATH, updated, "utf8");
  console.log(`[registry] inserted entry for ${SLUG}`);
}

// ----- run -----
function main() {
  console.log(`Deploying tool: ${SLUG}`);
  auditToolKeyword();
  writeComponent();
  writePage();
  patchUnion();
  insertEntry();

  console.log("");
  console.log("Deploy complete. Next steps:");
  console.log("  1) npm run build   # verify TypeScript + SWC compile");
  console.log("  2) The /tools hub auto-lists this tool (it reads the registry).");
  console.log("  3) Integration still needed (paste the two files to Claude for precise patches):");
  console.log("       - src/app/sitemap.ts            (add /tools/glass-container-load-calculator + hreflang)");
  console.log("       - src/components/SearchModal.tsx (add the tool to the Cmd+K index)");
  console.log("  4) git add + commit + push (Vercel auto-deploys)");
  console.log("  5) GSC URL Inspection -> Request Indexing for /tools/glass-container-load-calculator");
  console.log("  6) ES mirror: scripts/translate-all.mjs");
}

main();
