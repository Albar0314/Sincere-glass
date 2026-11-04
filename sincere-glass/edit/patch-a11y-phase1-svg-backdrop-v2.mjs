// patch-a11y-phase1-svg-backdrop-v2.mjs
// v2 fixes self-closing <div /> backdrop handling bug in v1.
//
// Phase 1 accessibility fix for Sincere Glass:
//   1. Add aria-hidden="true" to all decorative <svg> that lack role/aria-*
//   2. Add aria-hidden="true" to modal backdrop <div onClick> overlays
//      (both wrapping and self-closing forms)
//
// Run from project root: node edit\patch-a11y-phase1-svg-backdrop-v2.mjs
// Then: npm run build
//
// Safety: per-file .bak backup, CRLF preserved, ASCII-only insertions,
// idempotent, dry-run supported.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DRY_RUN = process.argv.includes("--dry");

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

// Shared helper: given a captured attrs region ending either normally
// (final char not '/') or self-closing (final non-whitespace char is '/'),
// and a tag name, emit a correctly re-formed opener with the new attribute
// inserted before the close.
function injectAttr(tag, attrs, newAttr) {
  const trimmed = attrs.replace(/\s+$/, "");
  const endsSelfClose = trimmed.endsWith("/");
  if (endsSelfClose) {
    const body = trimmed.slice(0, -1).replace(/\s+$/, "");
    return `<${tag}${body} ${newAttr} />`;
  }
  return `<${tag}${trimmed} ${newAttr}>`;
}

// ----- Transform 1: <svg> without role/aria-*  -->  add aria-hidden="true" -----
function patchSvgs(src) {
  let count = 0;
  const out = src.replace(/<svg\b([^>]*)>/g, (full, attrs) => {
    if (/\brole\s*=/.test(attrs)) return full;
    if (/\baria-label\s*=/.test(attrs)) return full;
    if (/\baria-labelledby\s*=/.test(attrs)) return full;
    if (/\baria-hidden\s*=/.test(attrs)) return full;
    count++;
    return injectAttr("svg", attrs, 'aria-hidden="true"');
  });
  return { out, count };
}

// ----- Transform 2: modal backdrop <div onClick> overlays -----
// Target divs whose className contains "(absolute|fixed) inset-0" AND
// "bg-black/" (the backdrop pattern used throughout this codebase).
// Handles both wrapping (<div ...>) and self-closing (<div ... />) forms.
function patchModalBackdrops(src) {
  let count = 0;
  const out = src.replace(
    /<div\b([^>]*?\bonClick=[^>]*?)\/?>/g,
    (full, attrs) => {
      const isBackdrop =
        /className=["'`][^"'`]*\b(absolute|fixed)\s+inset-0\b[^"'`]*\bbg-black\//.test(
          attrs
        );
      if (!isBackdrop) return full;
      if (/\baria-hidden\s*=/.test(attrs)) return full;
      if (/\brole\s*=/.test(attrs)) return full;
      count++;
      return injectAttr("div", attrs, 'aria-hidden="true"');
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
    const bak = f + ".bak";
    if (!fs.existsSync(bak)) fs.writeFileSync(bak, original, "utf8");
    fs.writeFileSync(f, r2.out, "utf8");
  }
}

// ----- Report -----
console.log("");
console.log(`=== Sincere Glass a11y Phase 1 patch v2 ${DRY_RUN ? "(DRY RUN)" : ""} ===`);
console.log("");
console.log(`Files touched:          ${filesTouched}`);
console.log(`<svg> aria-hidden added: ${totalSvg}`);
console.log(`Modal backdrops hidden:  ${totalBackdrop}`);
console.log(`Total elements patched:  ${totalSvg + totalBackdrop}`);
console.log("");

// Sanity: backdrop count should be 5 (matches audit)
if (!DRY_RUN && totalBackdrop !== 5) {
  console.log(`[warning] Expected 5 backdrops per audit, got ${totalBackdrop}. Review changes.`);
}

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

// Explicitly list every backdrop change so bugs like the v1 self-closing
// mishap can be spotted in the terminal immediately.
const backdropFiles = perFile.filter((p) => p.backdrop > 0);
if (backdropFiles.length) {
  console.log("Backdrop changes (verify these opened correctly):");
  for (const b of backdropFiles) {
    console.log(`  ${b.file}  backdrop:${b.backdrop}`);
  }
  console.log("");
}

if (DRY_RUN) {
  console.log("DRY RUN complete. Re-run without --dry to apply changes.");
} else {
  console.log("Backups written as <file>.bak (first-run only).");
  console.log("");
  console.log("Next: npm run build");
}
