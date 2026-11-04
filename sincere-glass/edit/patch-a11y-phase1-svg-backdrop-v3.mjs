// patch-a11y-phase1-svg-backdrop-v3.mjs
// v3 fixes the self-closing <div /> bug in v2:
//   v2's regex consumed the trailing '/' OUTSIDE the capture group, so
//   `injectAttr` never saw it and emitted an opening tag with no matching
//   closer. v3 lets `[^>]*?` include the '/' so injectAttr detects it
//   correctly — same mechanism the <svg> transform already uses.
//
// Phase 1 accessibility fix for Sincere Glass:
//   1. Add aria-hidden="true" to all decorative <svg> that lack role/aria-*
//   2. Add aria-hidden="true" to modal backdrop <div onClick> overlays
//      (both wrapping and self-closing forms)
//
// Run from project root: node edit\patch-a11y-phase1-svg-backdrop-v3.mjs
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

// attrs captured by the regex INCLUDES any trailing '/' from a self-closing
// tag (because [^>] matches '/'). This helper reads that signal and emits
// the corresponding well-formed opener.
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
// IMPORTANT: no `\/?` outside the capture group. Let attrs include the '/'
// naturally via [^>]*?, and let injectAttr decide the output form.
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
const backdropDetails = [];

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

  // For every backdrop change, capture the actual new line(s) so we can
  // print them for human sanity-check before build.
  if (r2.count > 0) {
    const re = /<div\b[^>]*?\baria-hidden="true"[^>]*?\/?>/g;
    const lines = r2.out.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (/aria-hidden="true"/.test(lines[i]) && /bg-black\//.test(lines[i])) {
        backdropDetails.push({ file: rel(f), line: i + 1, text: lines[i].trim() });
      }
    }
  }

  if (!DRY_RUN) {
    const bak = f + ".bak";
    if (!fs.existsSync(bak)) fs.writeFileSync(bak, original, "utf8");
    fs.writeFileSync(f, r2.out, "utf8");
  }
}

// ----- Report -----
console.log("");
console.log(`=== Sincere Glass a11y Phase 1 patch v3 ${DRY_RUN ? "(DRY RUN)" : ""} ===`);
console.log("");
console.log(`Files touched:          ${filesTouched}`);
console.log(`<svg> aria-hidden added: ${totalSvg}`);
console.log(`Modal backdrops hidden:  ${totalBackdrop}`);
console.log(`Total elements patched:  ${totalSvg + totalBackdrop}`);
console.log("");

if (!DRY_RUN && totalBackdrop !== 5) {
  console.log(`[warning] Expected 5 backdrops per audit, got ${totalBackdrop}. Review changes.`);
  console.log("");
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

// Print the actual transformed backdrop lines so you can eyeball them.
if (backdropDetails.length) {
  console.log("Backdrop change preview (verify each line is syntactically valid):");
  for (const d of backdropDetails) {
    const preview = d.text.length > 180 ? d.text.slice(0, 177) + "..." : d.text;
    console.log(`  ${d.file}:${d.line}`);
    console.log(`    ${preview}`);
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
