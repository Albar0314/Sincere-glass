// optimize-images.mjs
// Batch image optimizer for Sincere Glass public/images/ tree.
// Uses sharp (already in devDependencies) to:
//   1. Generate AVIF + WebP versions at ORIGINAL size (quality-tuned)
//   2. Generate responsive variants: 768w (mobile) + 1280w (tablet) + 1920w (desktop)
//      for any image whose original width > 1280px
//   3. Preserve originals as JPG/PNG fallback for ancient browsers (<Picture> sources)
//   4. Skip files already optimized (idempotent via timestamp check)
//   5. Report savings per file + total
//
// Run from project root:
//   node edit\optimize-images.mjs --dry       # see what would be processed
//   node edit\optimize-images.mjs             # convert all
//   node edit\optimize-images.mjs --force     # re-convert even if newer .avif/.webp exists
//   node edit\optimize-images.mjs --only=hero # only process files matching "hero" in path
//
// Output files sit alongside originals:
//   hero-factory.jpg
//   hero-factory.avif       (same width)
//   hero-factory.webp       (same width)
//   hero-factory-768.avif   (if original > 1280w)
//   hero-factory-768.webp
//   hero-factory-1280.avif
//   hero-factory-1280.webp
//   hero-factory-1920.avif
//   hero-factory-1920.webp
//
// Use in <picture>/<Image>:
//   <Image src="/images/hero-factory.jpg" ... priority />
//   Next.js's own loader will pick the right format via Accept header.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, "public", "images");
const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? onlyArg.split("=")[1] : null;

// Quality tuning per format (balanced for photography)
const AVIF_QUALITY = 55;   // AVIF is 30-40% smaller than WebP at equal quality
const WEBP_QUALITY = 78;   // sweet spot for photo-like content
const JPG_RECOMPRESS_QUALITY = 82;  // only if you want to recompress the fallback

// Responsive breakpoints (only generated if original width > 1280)
const BREAKPOINTS = [768, 1280, 1920];

// Skip these (SVG, GIFs, already-optimized variants, icons)
const SKIP_EXT = new Set([".svg", ".gif", ".ico", ".avif", ".webp"]);
const SKIP_DIRS = new Set(["equipment-raw"]); // raw source folder, don't touch

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

// Returns true if the output file exists AND is newer than source
function isFresh(src, out) {
  if (FORCE) return false;
  if (!fs.existsSync(out)) return false;
  const srcM = fs.statSync(src).mtimeMs;
  const outM = fs.statSync(out).mtimeMs;
  return outM >= srcM;
}

async function processOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (SKIP_EXT.has(ext)) return null;
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;
  if (ONLY && !file.toLowerCase().includes(ONLY.toLowerCase())) return null;

  const base = file.slice(0, -ext.length);
  const name = path.basename(file);
  const dir = path.dirname(file);

  let image;
  try {
    image = sharp(file);
  } catch (e) {
    return { file: rel(file), error: e.message };
  }

  const meta = await image.metadata();
  const origWidth = meta.width || 0;
  const origSize = fs.statSync(file).size;

  const outputs = [];

  // ---- Original-size AVIF + WebP ----
  const avifOut = `${base}.avif`;
  const webpOut = `${base}.webp`;

  if (!isFresh(file, avifOut)) {
    if (!DRY) await image.clone().avif({ quality: AVIF_QUALITY, effort: 5 }).toFile(avifOut);
    const size = DRY ? -1 : fs.statSync(avifOut).size;
    outputs.push({ format: "AVIF", path: rel(avifOut), width: origWidth, size });
  }
  if (!isFresh(file, webpOut)) {
    if (!DRY) await image.clone().webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(webpOut);
    const size = DRY ? -1 : fs.statSync(webpOut).size;
    outputs.push({ format: "WebP", path: rel(webpOut), width: origWidth, size });
  }

  // ---- Responsive variants (only if original is big enough) ----
  for (const w of BREAKPOINTS) {
    if (origWidth <= w) continue;
    const avifResp = `${base}-${w}.avif`;
    const webpResp = `${base}-${w}.webp`;
    if (!isFresh(file, avifResp)) {
      if (!DRY) {
        await image
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .avif({ quality: AVIF_QUALITY, effort: 5 })
          .toFile(avifResp);
      }
      const size = DRY ? -1 : fs.statSync(avifResp).size;
      outputs.push({ format: "AVIF", path: rel(avifResp), width: w, size });
    }
    if (!isFresh(file, webpResp)) {
      if (!DRY) {
        await image
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY, effort: 5 })
          .toFile(webpResp);
      }
      const size = DRY ? -1 : fs.statSync(webpResp).size;
      outputs.push({ format: "WebP", path: rel(webpResp), width: w, size });
    }
  }

  return { file: rel(file), origWidth, origSize, outputs };
}

function fmtKB(bytes) {
  if (bytes < 0) return "    -";
  return (bytes / 1024).toFixed(1).padStart(7) + " KB";
}

// ---- Driver ----
const allFiles = walk(IMG_DIR);
const candidates = allFiles.filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return [".jpg", ".jpeg", ".png"].includes(ext);
});

console.log("");
console.log(`=== Sincere Glass image optimizer ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");
console.log(`Image root: ${rel(IMG_DIR)}`);
console.log(`Candidates: ${candidates.length} JPG/PNG files`);
if (ONLY) console.log(`Filter: --only="${ONLY}"`);
if (FORCE) console.log(`Force: regenerating even if outputs are newer than sources`);
console.log("");

const results = [];
let processed = 0;
for (const f of candidates) {
  const res = await processOne(f);
  if (!res) continue;
  if (res.error) {
    console.log(`  [error] ${res.file}: ${res.error}`);
    continue;
  }
  results.push(res);
  processed++;

  // Compact one-line summary per processed file
  const skipped = res.outputs.length === 0;
  if (skipped) {
    console.log(`  [skip]  ${res.file}  (already up to date)`);
  } else {
    const smallestNew = res.outputs
      .filter((o) => o.width === res.origWidth)
      .reduce((min, o) => (o.size >= 0 && o.size < min ? o.size : min), Infinity);
    const saved = smallestNew < Infinity ? res.origSize - smallestNew : 0;
    const savedPct = res.origSize ? Math.round((saved / res.origSize) * 100) : 0;
    console.log(
      `  [done]  ${res.file}  ${res.origWidth}w  ${fmtKB(res.origSize)}  ->  ${res.outputs.length} outputs  (same-width saves ${savedPct}%)`
    );
  }
}

// ---- Totals ----
let totalOrigBytes = 0;
let totalOutputBytes = 0;
let newOutputs = 0;
for (const r of results) {
  if (r.outputs.length === 0) continue;
  totalOrigBytes += r.origSize;
  for (const o of r.outputs) {
    if (o.size >= 0) totalOutputBytes += o.size;
    newOutputs++;
  }
}

console.log("");
console.log(`=== Summary ===`);
console.log(`Files processed:  ${processed}`);
console.log(`New outputs:      ${newOutputs}`);
if (!DRY) {
  console.log(`Original bytes:   ${(totalOrigBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Output bytes:     ${(totalOutputBytes / 1024 / 1024).toFixed(2)} MB  (all variants combined)`);
}
console.log("");
console.log("Hero image status (if present):");
const hero = results.find((r) => /hero-factory/.test(r.file));
if (hero) {
  console.log(`  Original: ${fmtKB(hero.origSize)}  (${hero.origWidth}w)`);
  for (const o of hero.outputs) {
    console.log(`  ${o.format.padEnd(5)} ${String(o.width).padStart(5)}w  ${fmtKB(o.size)}  ${o.path}`);
  }
} else {
  console.log("  hero-factory not found in this run.");
}
console.log("");

if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to generate files.");
} else {
  console.log("Next: update HeroSection to use next/image with priority (patch coming after you share HeroSection.tsx + layout.tsx).");
}
