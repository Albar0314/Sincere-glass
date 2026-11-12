// patch-header-fix.mjs
// Fixes two bugs in src/components/Header.tsx:
//   (1) Mega-dropdown product thumbnail renders a solid placeholder div instead
//       of the actual <Image>. Replaces the inner placeholder div with next/image.
//   (2) Curved Tempered Glass missing from the products array. Inserts it after
//       laminated so cluster ordering reads tempered -> insulated -> laminated ->
//       curved-tempered -> enameled -> low-E.
//
// Idempotent via marker SG-HEADER-FIX-V1. Writes Header.tsx.bak before changing.
//
// Usage from project root:
//   node patch-header-fix.mjs
//
// After success: npm run build.
//
// NOTE — i18n dict entries required for the new key `curvedTempered`:
//   product.curvedTempered.name   = "Curved Tempered Glass"
//   product.curvedTempered.desc   = "Single-axis, R_min 500mm at 6mm"
// This patch does NOT touch dict files (location varies). The script prints a
// grep hint at the end so you can add the entries in your dict files yourself.
//
// NOTE — the image `/images/products/curved-tempered.jpg` must exist in
// public/images/products/. Script checks and warns if missing.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const MARKER = 'SG-HEADER-FIX-V1';
const HEADER = 'src/components/Header.tsx';

function detectEOL(raw) { return raw.includes('\r\n') ? '\r\n' : '\n'; }
function stripBOM(s) { return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }
function log(msg) { console.log(msg); }

const abs = join(ROOT, HEADER);
if (!existsSync(abs)) { console.error(`MISSING: ${HEADER}`); process.exit(1); }

const raw = stripBOM(readFileSync(abs, 'utf8'));
const eol = detectEOL(raw);

if (raw.includes(MARKER)) {
  log(`SKIP: Header.tsx already has marker ${MARKER}`);
  process.exit(0);
}

let out = raw;

// ---- Fix 1: insert curvedTempered into products array ----
// Anchor: the laminated line (stable identifier within the array)
const lamRe = /([ \t]*)\{\s*key:\s*"laminated",\s*href:\s*"\/products\/laminated-glass",\s*image:\s*"\/images\/products\/laminated\.jpg"\s*\},?/;
const lamMatch = out.match(lamRe);
if (!lamMatch) {
  log('ERROR: laminated array entry not found, aborting');
  process.exit(1);
}

// Check idempotency on array content specifically
if (/key:\s*"curvedTempered"/.test(out)) {
  log('NOTE: curvedTempered already in products array (partial prior fix) - will still fix image bug');
} else {
  const indent = lamMatch[1];
  const curvedLine = `${indent}{ key: "curvedTempered", href: "/products/curved-tempered-glass", image: "/images/products/curved-tempered.jpg" },`;
  out = out.replace(lamRe, (m) => `${m}${eol}${curvedLine}`);
  log('OK fix 1: inserted curvedTempered into products array');
}

// ---- Fix 2: replace placeholder div with <Image> ----
// Anchor: the exact placeholder block
const phRe = /<div className="w-14 h-14 rounded-lg bg-white\/5 overflow-hidden flex-shrink-0 border border-white\/5">\s*<div className="w-full h-full bg-brand-primary\/30" \/>\s*<\/div>/;
if (!phRe.test(out)) {
  log('ERROR: thumbnail placeholder block not found, aborting');
  // Write what we have so far anyway? No — keep atomic. Restore.
  writeFileSync(abs, raw, 'utf8');
  process.exit(1);
}
const replacement =
  `<div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/5 relative">${eol}` +
  `                          <Image src={p.image} alt={t(\`product.\${p.key}.name\`)} fill sizes="56px" className="object-cover" />${eol}` +
  `                        </div>`;
out = out.replace(phRe, () => replacement);
log('OK fix 2: swapped placeholder div for <Image> (fill, 56px)');

// ---- Write ----
writeFileSync(abs + '.bak', raw, 'utf8');
log(`  wrote backup: ${HEADER}.bak`);
writeFileSync(abs, out, 'utf8');
log(`  wrote: ${HEADER}`);

// ---- Sanity: image file + dict hint ----
const imgRel = 'public/images/products/curved-tempered.jpg';
if (existsSync(join(ROOT, imgRel))) {
  log(`OK image exists: ${imgRel}`);
} else {
  log(`WARN image MISSING: ${imgRel} (header will show broken thumb until you add it)`);
}

log('');
log('NEXT:');
log('  1. Add dict entries for product.curvedTempered.name and .desc in your i18n dict files.');
log('     Grep where other products are defined:');
log('       findstr /s /n "product.tempered.name" src\\');
log('  2. Verify public/images/products/curved-tempered.jpg exists (see WARN above).');
log('  3. npm run build');

// Add marker to a trailing comment line so re-runs skip cleanly without
// altering any code semantics. Append once.
const markerLine = `${eol}// ${MARKER}${eol}`;
if (!out.endsWith(markerLine)) {
  writeFileSync(abs, out + markerLine, 'utf8');
}
