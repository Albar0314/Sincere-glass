// patch-a11y-phase1-svg-backdrop.mjs
// Phase 1 accessibility fix for Sincere Glass:
//   1. Add aria-hidden="true" to all decorative <svg> that lack role/aria-*
//   2. Add aria-hidden="true" to the 5 modal backdrop <div onClick> overlays
//
// Run from project root: node edit\patch-a11y-phase1-svg-backdrop.mjs
// Then: npm run build   (verify immediately per project SOP)
//
// Safety: per-file .bak backup, CRLF preserved, ASCII-only insertions,
// idempotent (re-runs skip already-patched elements), dry-run supported.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DRY_RUN = process.argv.includes("--dry");

// ----- Walk -----
function walk(dir, exts = [".tsx", ".jsx"]) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/node_modules|\.next/.test(full)) continue;
      out.push(...walk(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

// ----- Transform 1: <svg> without role/aria-*  -->  add aria-hidden="true" -----
// Matches an <svg ...> opener where the attribute region contains no
// `role=`, `aria-label=`, `aria-labelledby=`, or `aria-hidden=`.
// [^>]* safely crosses newlines because [^>] matches \n.
// Edge case: an onClick arrow function on <svg> would contain `>` and break
// matching, but inline SVGs in this codebase never carry onClick on <svg>
// itself. If one is found later, patch it manually.
function patchSvgs(src) {
  let count = 0;
  const out = src.replace(/<svg\b([^>]*)>/g, (full, attrs) => {
    if (/\brole\s*=/.test(attrs)) return full;
    if (/\baria-label\s*=/.test(attrs)) return full;
    if (/\baria-labelledby\s*=/.test(attrs)) return full;
    if (/\baria-hidden\s*=/.test(attrs)) return full;

    count++;
    // Insert aria-hidden="true" right before the closing '>'.
    // Preserve whether the opener was self-closing ('/>' vs '>').
    // (We're matching `<svg ...>` only, not `<svg .../>` self-closing;
    // regex above stops at first '>', so if it was '/>', the '/' stays
    // attached to attrs. Handle both cleanly.)
    const trimmed = attrs.replace(/\s+$/, "");
    const endsWithSelfClose = trimmed.endsWith("/");
    if (endsWithSelfClose) {
      const body = trimmed.slice(0, -1).replace(/\s+$/, "");
      return `<svg${body} aria-hidden="true" />`;
    }
    return `<svg${trimmed} aria-hidden="true">`;
  });
  return { out, count };
}

// ----- Transform 2: the 5 modal-backdrop <div onClick> overlays -----
// These are NOT real interactive elements — they're convenience click-to-close
// layers behind modal content. Correct a11y treatment: aria-hidden="true"
// (modal keyboard escape handled separately by the modal itself).
//
// We target divs whose className contains both "absolute inset-0" or
// "fixed inset-0" AND "bg-black/" (the backdrop pattern used everywhere in
// this codebase). If className doesn't match the backdrop pattern we skip,
// to avoid accidentally hiding meaningful content.
function patchModalBackdrops(src) {
  let count = 0;
  const out = src.replace(
    /<div\b([^>]*?\bonClick=[^>]*?)>/g,
    (full, attrs) => {
      const isBackdrop =
        /className=["'`][^"'`]*\b(absolute|fixed)\s+inset-0\b[^"'`]*\bbg-black\//.test(
          attrs
        );
      if (!isBackdrop) return full;
      if (/\baria-hidden\s*=/.test(attrs)) return full;
      if (/\brole\s*=/.test(attrs)) return full;

      count++;
      const trimmed = attrs.replace(/\s+$/, "");
      return `<div${trimmed} aria-hidden="true">`;
    }
  );
  return { out, count };
}

// ----- Driver -----
const files = walk(SRC);

let totalSvg = 0;
let totalBackdrop = 0;
let filesTouched = 0;
const perFile = [];

for (const f of files) {
  const original = fs.readFileSync(f, "utf8");

  const r1 = patchSvgs(original);
  const r2 = patchModalBackdrops(r1.out);

  const touched = r1.count + r2.count;
  if (touched === 0) continue;

  filesTouched++;
  totalSvg += r1.count;
  totalBackdrop += r2.count;
  perFile.push({ file: rel(f), svg: r1.count, backdrop: r2.count });

  if (!DRY_RUN) {
    // Backup once per file (don't overwrite existing .bak from an earlier run)
    const bak = f + ".bak";
    if (!fs.existsSync(bak)) {
      fs.writeFileSync(bak, original, "utf8");
    }
    // Write new content. Preserve original line endings implicitly —
    // regex replacement doesn't add newlines, and original CR/LF bytes
    // outside matched region are untouched.
    fs.writeFileSync(f, r2.out, "utf8");
  }
}

// ----- Report -----
console.log("");
console.log(`=== Sincere Glass a11y Phase 1 patch ${DRY_RUN ? "(DRY RUN)" : ""} ===`);
console.log("");
console.log(`Files touched:          ${filesTouched}`);
console.log(`<svg> aria-hidden added: ${totalSvg}`);
console.log(`Modal backdrops hidden:  ${totalBackdrop}`);
console.log(`Total elements patched:  ${totalSvg + totalBackdrop}`);
console.log("");

// Top files by change count (useful for spotting hotspots)
const top = perFile.sort((a, b) => b.svg + b.backdrop - (a.svg + a.backdrop)).slice(0, 15);
console.log("Top 15 files by change count:");
for (const r of top) {
  console.log(
    `  ${String(r.svg + r.backdrop).padStart(3)}  ${r.file}  (svg:${r.svg}${
      r.backdrop ? ` backdrop:${r.backdrop}` : ""
    })`
  );
}
console.log("");

if (DRY_RUN) {
  console.log("DRY RUN complete. Re-run without --dry to apply changes.");
} else {
  console.log("Backups written as <file>.bak (first-run only; preserved across reruns).");
  console.log("");
  console.log("Next steps:");
  console.log("  1. npm run build        (verify no SWC/TS errors)");
  console.log("  2. If build fails, check error file against its .bak");
  console.log("  3. If build passes: git diff to review, then commit.");
  console.log("  4. Re-run a11y-audit.mjs to confirm <svg> count dropped from 133 to ~0");
  console.log("     and <div onClick> count dropped from 5 to 0.");
}

// To roll back: `Get-ChildItem -Recurse src\ -Filter *.bak |
//   ForEach-Object { Move-Item $_.FullName ($_.FullName -replace '\.bak$','') -Force }`
