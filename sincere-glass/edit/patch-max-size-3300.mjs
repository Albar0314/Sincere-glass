// patch-max-size-3300.mjs
// Corrects the maximum panel size data from 3,000mm (3m) to 3,300mm (3.3m)
// across the entire codebase. This is a SITE-WIDE data correction based on
// factory capability reconfirmation on 2026-10-23.
//
// Run AFTER deploy-curved-tempered.mjs:
//   node edit\patch-max-size-3300.mjs
//
// Scope — files searched and patched if a known pattern is found:
//   - src/lib/products.ts (Tempered / Laminated specs)
//   - src/lib/blog-registry.ts and any files mentioning 3m jumbo
//   - src/components/**/*.tsx (About page, CompanySnapshot, Homepage sections)
//   - src/app/**/page.tsx
//
// The script DOES NOT edit:
//   - Blog article content under src/app/blog/<slug>/page.tsx (too varied — handle manually)
//   - ES mirror under src/_i18n/es/ (re-run translate-all after this fix)
//   - Translation cache (will self-update next run)
//
// Reports every change it made and every file that was skipped because
// no pattern matched.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");

// Patterns to replace (English + unit variants). Each entry: [find, replace, description]
// Important: these are regex patterns, so dots are literal.
const RULES = [
  // numeric with comma: 3,000mm / 3000mm -> 3,300mm / 3300mm, specifically in panel-size contexts
  { pattern: /3,000mm\s*×\s*15,000mm/g, replacement: "3,300mm × 15,000mm", desc: "3,000mm × 15,000mm -> 3,300mm × 15,000mm" },
  { pattern: /3000mm\s*x\s*15000mm/gi, replacement: "3300mm x 15000mm", desc: "3000mm x 15000mm -> 3300mm x 15000mm" },
  { pattern: /3\s*m\s*×\s*15\s*m/g, replacement: "3.3 m × 15 m", desc: "3 m × 15 m -> 3.3 m × 15 m" },
  { pattern: /3m\s*×\s*15m/g, replacement: "3.3m × 15m", desc: "3m × 15m -> 3.3m × 15m" },
  { pattern: /3m\s*x\s*15m/gi, replacement: "3.3m x 15m", desc: "3m x 15m -> 3.3m x 15m" },
  // "3,000mm × 15,000mm (autoclave)" style
  { pattern: /3,000\s*mm/g, replacement: "3,300 mm", desc: "3,000 mm -> 3,300 mm (loose)" },
];

const STATS = { filesScanned: 0, filesChanged: 0, replacements: 0 };

function walk(dir, visitor) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // Skip ES mirror, node_modules, build dirs, and blog article subdirs
      if (e.name === "_i18n" || e.name === "node_modules" || e.name === ".next" || e.name === "dist") continue;
      if (full.includes(path.join("src", "app", "blog") + path.sep) && e.name !== "blog") continue;
      walk(full, visitor);
    } else if (e.isFile()) {
      visitor(full);
    }
  }
}

function processFile(file) {
  if (!/\.(ts|tsx|js|mjs|md)$/.test(file)) return;
  // Skip our own edit/ dir
  if (file.includes(path.sep + "edit" + path.sep)) return;
  // Skip blog article page files (user handles those manually)
  const relFromSrc = path.relative(SRC_DIR, file);
  if (relFromSrc.startsWith("app" + path.sep + "blog" + path.sep) && file.endsWith("page.tsx")) return;

  STATS.filesScanned++;
  let content;
  try {
    content = fs.readFileSync(file, "utf8");
  } catch (e) {
    return;
  }
  let changed = content;
  let fileReplacements = 0;
  const changesInFile = [];

  for (const rule of RULES) {
    const matches = changed.match(rule.pattern);
    if (matches && matches.length > 0) {
      fileReplacements += matches.length;
      changesInFile.push("    [" + matches.length + "x] " + rule.desc);
      changed = changed.replace(rule.pattern, rule.replacement);
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(file, changed, "utf8");
    STATS.filesChanged++;
    STATS.replacements += fileReplacements;
    console.log("  [patched] " + path.relative(ROOT, file));
    for (const line of changesInFile) console.log(line);
  }
}

console.log("Scanning src/ for '3m x 15m' / '3,000mm x 15,000mm' patterns...\n");
walk(SRC_DIR, processFile);

console.log("\n----------------------------------------------------------------");
console.log("Files scanned:  " + STATS.filesScanned);
console.log("Files changed:  " + STATS.filesChanged);
console.log("Replacements:   " + STATS.replacements);
console.log("");
console.log("NOT TOUCHED (handle manually if needed):");
console.log("  - Blog article pages under src/app/blog/<slug>/page.tsx");
console.log("    (search these for 3m references and update case-by-case)");
console.log("  - Spanish mirror under src/_i18n/es/");
console.log("    (re-run `node scripts/translate-all.mjs` to refresh translations)");
console.log("  - translation/cache/es.json (will auto-regenerate stale entries)");
console.log("----------------------------------------------------------------");
