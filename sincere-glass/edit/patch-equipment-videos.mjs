// patch-equipment-videos.mjs
//
// Wires YouTube equipment videos into the Equipment gallery:
//   1. Creates src/lib/equipment-videos.ts (manual registry; auto-regen safe)
//   2. Rewrites src/components/EquipmentGallery.tsx with Video/Photos tabs
//   3. Injects 5 x <VideoSchema /> JSON-LD into EquipmentGallerySection.tsx
//      (so Google sees every video, not just the active tab)
//
// Safety rails (per project SOP, memory):
//   - .bak backup for every file touched
//   - idempotency: unique anchor "SG-EQUIP-VIDEO-V1" guards against re-insert
//   - CRLF-tolerant anchor matching (/\r?\n/)
//   - preserves file EOL style (CRLF vs LF) on write
//   - prints file tail on failure for remote debugging
//   - does NOT touch src/_i18n/es/ mirror — run scripts/translate-all.mjs after
//
// Usage:  node edit\patch-equipment-videos.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

const TARGETS = {
  videosLib: path.join(ROOT, "src", "lib", "equipment-videos.ts"),
  gallery: path.join(ROOT, "src", "components", "EquipmentGallery.tsx"),
  section: path.join(ROOT, "src", "components", "EquipmentGallerySection.tsx"),
};

const TEMPLATES = {
  videosLib: path.join(EDIT_DIR, "equipment-videos.ts.txt"),
  gallery: path.join(EDIT_DIR, "EquipmentGallery.tsx.txt"),
};

const ANCHOR_TAG = "SG-EQUIP-VIDEO-V1";

// ---------- helpers ----------
function detectEOL(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}
function backup(file) {
  if (!fs.existsSync(file)) return;
  const bak = file + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log(`  backup -> ${path.relative(ROOT, bak)}`);
  } else {
    console.log(`  backup already exists, keeping original -> ${path.relative(ROOT, bak)}`);
  }
}
function writeFile(file, content, eol) {
  const normalized = content.replace(/\r?\n/g, eol);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, normalized, "utf8");
  console.log(`  wrote -> ${path.relative(ROOT, file)} (${normalized.length} bytes, ${eol === "\r\n" ? "CRLF" : "LF"})`);
}
function requireTemplate(p) {
  if (!fs.existsSync(p)) {
    console.error(`\n[FATAL] Template not found: ${p}`);
    console.error(`Expected template files alongside this script in edit/:`);
    Object.values(TEMPLATES).forEach((t) => console.error("  - " + path.relative(ROOT, t)));
    process.exit(1);
  }
  return fs.readFileSync(p, "utf8");
}
function printTail(file, label) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8");
  const tail = content.slice(-400);
  console.error(`\n--- tail of ${label} (last 400 chars) ---\n${tail}\n--- end tail ---\n`);
}

// ---------- step 1: equipment-videos.ts (new file; copy template) ----------
function stepVideosLib() {
  console.log("\n[1/3] src/lib/equipment-videos.ts");
  const template = requireTemplate(TEMPLATES.videosLib);
  const existingEOL = fs.existsSync(TARGETS.videosLib)
    ? detectEOL(fs.readFileSync(TARGETS.videosLib, "utf8"))
    : "\r\n"; // Windows project default
  if (fs.existsSync(TARGETS.videosLib)) {
    const existing = fs.readFileSync(TARGETS.videosLib, "utf8");
    if (existing.includes(ANCHOR_TAG) || existing.includes("EQUIPMENT_VIDEOS")) {
      console.log("  file already has equipment-videos registry — skipping to avoid clobbering manual edits");
      return;
    }
    backup(TARGETS.videosLib);
  }
  writeFile(TARGETS.videosLib, template, existingEOL);
}

// ---------- step 2: EquipmentGallery.tsx (full replace; template-driven) ----------
function stepGallery() {
  console.log("\n[2/3] src/components/EquipmentGallery.tsx");
  if (!fs.existsSync(TARGETS.gallery)) {
    console.error("  [FATAL] target not found: " + TARGETS.gallery);
    process.exit(1);
  }
  const existing = fs.readFileSync(TARGETS.gallery, "utf8");
  if (existing.includes(ANCHOR_TAG)) {
    console.log("  file already patched (anchor found) — skipping");
    return;
  }
  const eol = detectEOL(existing);
  const template = requireTemplate(TEMPLATES.gallery);
  // Insert a hidden anchor comment at top so we can detect prior patch
  const stamped = `// ${ANCHOR_TAG}\n` + template;
  backup(TARGETS.gallery);
  writeFile(TARGETS.gallery, stamped, eol);
}

// ---------- step 3: EquipmentGallerySection.tsx (surgical: add JSON-LD) ----------
function stepSection() {
  console.log("\n[3/3] src/components/EquipmentGallerySection.tsx");
  if (!fs.existsSync(TARGETS.section)) {
    console.error("  [FATAL] target not found: " + TARGETS.section);
    process.exit(1);
  }
  let src = fs.readFileSync(TARGETS.section, "utf8");
  if (src.includes(ANCHOR_TAG)) {
    console.log("  file already patched (anchor found) — skipping");
    return;
  }
  const eol = detectEOL(src);

  // --- insert import for EQUIPMENT_VIDEOS + VideoSchema ---
  // Anchor: existing EQUIPMENT_CATEGORIES import line
  const importAnchorRE = /import\s+\{\s*EQUIPMENT_CATEGORIES\s*\}\s+from\s+["']@\/lib\/equipment-gallery["'];?/;
  if (!importAnchorRE.test(src)) {
    console.error("  [FATAL] cannot find EQUIPMENT_CATEGORIES import anchor");
    printTail(TARGETS.section, "EquipmentGallerySection.tsx");
    process.exit(1);
  }
  const importAddition =
    `import { EQUIPMENT_VIDEOS } from "@/lib/equipment-videos";` + eol +
    `import VideoSchema from "@/components/VideoSchema";`;
  src = src.replace(importAnchorRE, (m) => m + eol + importAddition);

  // --- insert <VideoSchema /> block at top of returned <section> ---
  // Anchor: `return (` followed by `<section` (component is `return (<section ...>`)
  // The current file uses: `  return (` then newline then `    <section ...>`
  // We want to inject the schemas as a React fragment wrapping the <section>.
  // Approach: replace the single `<section ...>` outer tag with a Fragment
  // that first emits <VideoSchema /> for every registered video, then <section>.

  // Match: return (\n<whitespace><section ...className="py-16 md:py-24 bg-brand-lighter">
  const sectionOpenRE = /(return\s*\(\s*)(<section\s+className="py-16 md:py-24 bg-brand-lighter">)/;
  if (!sectionOpenRE.test(src)) {
    console.error("  [FATAL] cannot find `return ( <section ...>` anchor");
    printTail(TARGETS.section, "EquipmentGallerySection.tsx");
    process.exit(1);
  }

  // Find the matching </section> that closes the component return and wrap in <>...</>
  // Simpler: wrap the single top-level <section>...</section> with React Fragment.
  // Since the component's return is a single <section>, we can replace open+close.

  // Insert fragment open and schemas BEFORE <section>
  const fragmentOpen =
    `<>` + eol +
    `      {/* ${ANCHOR_TAG}: emit VideoObject JSON-LD for every registered equipment video so Google sees them all, not just the active tab */}` + eol +
    `      {EQUIPMENT_VIDEOS.map((v) => (` + eol +
    `        <VideoSchema` + eol +
    `          key={v.videoId}` + eol +
    `          videoId={v.videoId}` + eol +
    `          name={v.title}` + eol +
    `          description={v.description}` + eol +
    `          uploadDate={v.uploadDate}` + eol +
    `        />` + eol +
    `      ))}` + eol +
    `      `;

  src = src.replace(sectionOpenRE, `$1${fragmentOpen}$2`);

  // Append `</>` after the final `</section>` + the closing `);` of return
  // The file ends with:   </section>\n  );\n}\n
  const closingRE = /(<\/section>)(\s*\)\s*;\s*\})/;
  if (!closingRE.test(src)) {
    console.error("  [FATAL] cannot find closing `</section> );` anchor");
    printTail(TARGETS.section, "EquipmentGallerySection.tsx");
    process.exit(1);
  }
  src = src.replace(closingRE, `$1${eol}    </>$2`);

  backup(TARGETS.section);
  writeFile(TARGETS.section, src, eol);
}

// ---------- main ----------
console.log("=== patch-equipment-videos.mjs ===");
console.log("CWD: " + ROOT);

try {
  stepVideosLib();
  stepGallery();
  stepSection();

  console.log("\n=== DONE ===");
  console.log("Next steps:");
  console.log("  1. npm run build       (verify compile)");
  console.log("  2. npm run dev         (visual check at /equipment)");
  console.log("  3. node scripts/translate-all.mjs    (sync ES mirror)");
  console.log("  4. git add + commit + push");
} catch (err) {
  console.error("\n[PATCH FAILED]", err?.message || err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
}
