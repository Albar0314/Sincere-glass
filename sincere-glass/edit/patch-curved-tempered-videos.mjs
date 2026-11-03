// patch-curved-tempered-videos.mjs
//
// Rewrites src/app/products/curved-tempered-glass/page.tsx to:
//   1. Embed 2 YouTube videos (furnace + warehouse) at semantically-aligned slots
//      (furnace after BendingProductionTimeline, warehouse after Why-Sincere, before FAQ)
//   2. Add 2 VideoSchema JSON-LD blocks alongside existing serviceSchema + faqSchema
//   3. Clean up PowerShell GBK re-encoding garbage ("鈥?" / "脳" / "卤" / "R鈧樶耽鈧?" /
//      "m虏" / "鈫?" / "掳" / "鈹€") inherited from an earlier Windows write
//   4. Correct the keywords[] array (Chinese entries were mangled)
//
// Full-file replace (page is 423 lines; manual regex fixes for the garbage
// would be fragile and the file was already damaged). Original is backed up
// to page.tsx.bak so a rollback is one copy away.
//
// Safety rails (per project SOP, memory):
//   - .bak backup
//   - idempotency: unique anchor "SG-CURVED-VIDEO-V1" (first line of patched file)
//   - preserves file EOL style (CRLF vs LF)
//   - no changes to src/_i18n/es/ mirror - run scripts/translate-all.mjs after
//
// Usage:  node edit\patch-curved-tempered-videos.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

const TARGET = path.join(
  ROOT,
  "src",
  "app",
  "products",
  "curved-tempered-glass",
  "page.tsx"
);
const TEMPLATE = path.join(EDIT_DIR, "curved-tempered-page.tsx.txt");

const ANCHOR_TAG = "SG-CURVED-VIDEO-V1";

// ---------- helpers ----------
function detectEOL(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}

function backup(file) {
  const bak = file + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log(`  backup -> ${path.relative(ROOT, bak)}`);
  } else {
    console.log(
      `  backup already exists, keeping original -> ${path.relative(ROOT, bak)}`
    );
  }
}

function writeFile(file, content, eol) {
  const normalized = content.replace(/\r?\n/g, eol);
  fs.writeFileSync(file, normalized, "utf8");
  console.log(
    `  wrote -> ${path.relative(ROOT, file)} (${normalized.length} bytes, ${eol === "\r\n" ? "CRLF" : "LF"})`
  );
}

// ---------- main ----------
console.log("=== patch-curved-tempered-videos.mjs ===");
console.log("CWD: " + ROOT);

try {
  if (!fs.existsSync(TARGET)) {
    console.error("[FATAL] target not found: " + TARGET);
    process.exit(1);
  }
  if (!fs.existsSync(TEMPLATE)) {
    console.error("[FATAL] template not found: " + TEMPLATE);
    console.error("Expected: " + path.relative(ROOT, TEMPLATE));
    process.exit(1);
  }

  const existing = fs.readFileSync(TARGET, "utf8");
  if (existing.includes(ANCHOR_TAG)) {
    console.log("file already patched (anchor found) -- skipping");
    process.exit(0);
  }

  const eol = detectEOL(existing);
  const template = fs.readFileSync(TEMPLATE, "utf8");
  const stamped = `// ${ANCHOR_TAG}\n` + template;

  backup(TARGET);
  writeFile(TARGET, stamped, eol);

  console.log("\n=== DONE ===");
  console.log("Next steps:");
  console.log("  1. npm run build        (verify compile)");
  console.log("  2. npm run dev          (visual check at /products/curved-tempered-glass)");
  console.log("  3. node scripts/translate-all.mjs    (sync ES mirror)");
  console.log("  4. git add + commit + push");
  console.log("");
  console.log("Rollback: copy page.tsx.bak over page.tsx");
} catch (err) {
  console.error("\n[PATCH FAILED]", err?.message || err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
}
