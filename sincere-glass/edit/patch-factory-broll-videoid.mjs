// patch-factory-broll-videoid.mjs
//
// Two housekeeping changes to defuse mp4-related landmines after the switch
// to YouTube embeds:
//
//   1. src/components/FactoryBrollLoop.tsx
//      - Current component hard-codes src="/videos/factory-broll.mp4", which
//        does not exist (and never did; the referenced asset was never cut).
//        Any page that imports this component would silently fetch a 404.
//      - New component accepts `videoId` (preferred, YouTube) or `src` (legacy),
//        and renders a plain dark panel when neither is supplied so nothing
//        break while a video asset is being produced.
//
//   2. .gitignore
//      - Add `public/videos/*.mp4` (plus webm/mov) so that temporarily dropping
//        a local mp4 into public/videos/ for a dev test does not accidentally
//        commit a 100+ MB file to the repo again.
//
// Safety rails (per project SOP, memory):
//   - .bak backup for each file touched
//   - idempotency: unique anchor "SG-BROLL-VIDEOID-V1" in the component file;
//                  substring check in .gitignore
//   - preserves file EOL style (CRLF vs LF)
//   - no changes to src/_i18n/es/ mirror - run scripts/translate-all.mjs after
//
// Usage:  node edit\patch-factory-broll-videoid.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

const TARGETS = {
  broll: path.join(ROOT, "src", "components", "FactoryBrollLoop.tsx"),
  gitignore: path.join(ROOT, ".gitignore"),
};

const TEMPLATE_BROLL = path.join(EDIT_DIR, "FactoryBrollLoop.tsx.txt");

const ANCHOR_TAG = "SG-BROLL-VIDEOID-V1";

const GITIGNORE_BLOCK = [
  "",
  "# Local-only video assets (uploaded to YouTube; not committed to repo)",
  "public/videos/*.mp4",
  "public/videos/*.webm",
  "public/videos/*.mov",
  "",
].join("\n");

const GITIGNORE_MARKER = "public/videos/*.mp4";

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
  fs.writeFileSync(file, normalized, "utf8");
  console.log(`  wrote -> ${path.relative(ROOT, file)} (${normalized.length} bytes, ${eol === "\r\n" ? "CRLF" : "LF"})`);
}

// ---------- step 1: FactoryBrollLoop.tsx ----------
function stepBroll() {
  console.log("\n[1/2] src/components/FactoryBrollLoop.tsx");
  if (!fs.existsSync(TARGETS.broll)) {
    console.error("  [FATAL] target not found: " + TARGETS.broll);
    process.exit(1);
  }
  if (!fs.existsSync(TEMPLATE_BROLL)) {
    console.error("  [FATAL] template not found: " + TEMPLATE_BROLL);
    process.exit(1);
  }
  const existing = fs.readFileSync(TARGETS.broll, "utf8");
  if (existing.includes(ANCHOR_TAG)) {
    console.log("  file already patched (anchor found) -- skipping");
    return;
  }
  const eol = detectEOL(existing);
  const template = fs.readFileSync(TEMPLATE_BROLL, "utf8");
  const stamped = `// ${ANCHOR_TAG}\n` + template;
  backup(TARGETS.broll);
  writeFile(TARGETS.broll, stamped, eol);
}

// ---------- step 2: .gitignore ----------
function stepGitignore() {
  console.log("\n[2/2] .gitignore");
  let existing = "";
  let eol = "\r\n"; // Windows project default when file is new
  if (fs.existsSync(TARGETS.gitignore)) {
    existing = fs.readFileSync(TARGETS.gitignore, "utf8");
    eol = detectEOL(existing);
    if (existing.includes(GITIGNORE_MARKER)) {
      console.log("  .gitignore already covers public/videos/*.mp4 -- skipping");
      return;
    }
    backup(TARGETS.gitignore);
  } else {
    console.log("  .gitignore does not exist, creating");
  }
  const needsLeadingNewline = existing.length > 0 && !existing.endsWith("\n");
  const addition = (needsLeadingNewline ? "\n" : "") + GITIGNORE_BLOCK;
  const next = existing + addition;
  writeFile(TARGETS.gitignore, next, eol);
}

// ---------- main ----------
console.log("=== patch-factory-broll-videoid.mjs ===");
console.log("CWD: " + ROOT);

try {
  stepBroll();
  stepGitignore();

  console.log("\n=== DONE ===");
  console.log("Next steps:");
  console.log("  1. npm run build        (verify compile)");
  console.log("  2. git status           (confirm .gitignore change picked up)");
  console.log("  3. node scripts/translate-all.mjs    (sync ES mirror for FactoryBrollLoop)");
  console.log("  4. git add + commit + push");
} catch (err) {
  console.error("\n[PATCH FAILED]", err?.message || err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
}
