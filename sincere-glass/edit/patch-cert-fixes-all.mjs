// patch-cert-fixes-all.mjs
// SUPERSEDES patch-cert-fixes.mjs — do not run the older one.
// Comprehensive fix for /certifications orphan + GBK leftovers:
//
//   (1) Header navLinks: insert /certifications after /equipment.
//   (2) dict.ts: insert 'nav.certifications' in EN and ES blocks
//       (anchors on existing 'nav.equipment' line in each block).
//       Also fills in 'product.curvedTempered.name/desc' in ES block
//       if missing (EN already present).
//   (3) sitemap.ts: insert /certifications into staticPaths
//       (anchors on existing /equipment entry).
//   (4) page.tsx + CertificationsClient.tsx: replace known GBK-corruption
//       substrings with HTML entities (&middot; / &mdash;).
//
// Idempotent via marker SG-CERT-FIX-ALL-V1 and per-change containment checks.
// Writes <file>.bak next to each modified file before changing.
//
// Usage from project root:
//   node patch-cert-fixes-all.mjs
//
// Then: npm run build.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const MARKER = 'SG-CERT-FIX-ALL-V1';

function detectEOL(raw) { return raw.includes('\r\n') ? '\r\n' : '\n'; }
function stripBOM(s) { return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }
function log(msg) { console.log(msg); }

function readFile(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  return { abs, raw: stripBOM(readFileSync(abs, 'utf8')) };
}
function writeWithBackup(abs, originalRaw, newContent) {
  const bak = abs + '.bak';
  if (!existsSync(bak)) writeFileSync(bak, originalRaw, 'utf8');
  writeFileSync(abs, newContent, 'utf8');
}

// ---------- 1) Header navLinks ----------
function patchHeader() {
  log('\n> src/components/Header.tsx');
  const f = readFile('src/components/Header.tsx');
  if (!f) { log('  ERROR: not found'); return; }

  if (f.raw.includes(`key: "certifications"`)) {
    log('  SKIP: certifications already in navLinks');
    return;
  }
  const eol = detectEOL(f.raw);
  const anchor = /([ \t]*)\{\s*key:\s*"equipment",\s*href:\s*"\/equipment"\s*\},?/;
  const m = f.raw.match(anchor);
  if (!m) { log('  ERROR: equipment navLinks entry not found'); return; }

  const indent = m[1];
  const newLine = `${indent}{ key: "certifications", href: "/certifications" },`;
  const out = f.raw.replace(anchor, (full) => `${full}${eol}${newLine}`);
  writeWithBackup(f.abs, f.raw, out);
  log('  OK: inserted { key: "certifications", href: "/certifications" }');
}

// ---------- 2) dict.ts ----------
function patchDict() {
  log('\n> src/lib/dict.ts');
  const f = readFile('src/lib/dict.ts');
  if (!f) { log('  ERROR: not found'); return; }

  const eol = detectEOL(f.raw);
  let out = f.raw;
  let changes = 0;

  // EN nav.certifications after EN nav.equipment
  if (/'nav\.certifications':\s*'Certifications'/.test(out)) {
    log('  SKIP: EN nav.certifications already present');
  } else {
    // There are TWO `'nav.equipment': ...` lines (EN L15, ES L118). Replace
    // only the first via a one-shot replace (default .replace semantics).
    const enAnchor = /([ \t]*)'nav\.equipment':\s*'Equipment',/;
    if (enAnchor.test(out)) {
      out = out.replace(enAnchor, (full, indent) =>
        `${full}${eol}${indent}'nav.certifications': 'Certifications',`
      );
      changes++;
      log('  OK: inserted EN nav.certifications');
    } else {
      log('  WARN: EN nav.equipment anchor not found, skipping EN');
    }
  }

  // ES nav.certifications after ES nav.equipment (the OTHER 'nav.equipment' line)
  if (/'nav\.certifications':\s*'Certificaciones'/.test(out)) {
    log('  SKIP: ES nav.certifications already present');
  } else {
    const esAnchor = /([ \t]*)'nav\.equipment':\s*'Equipamiento',/;
    if (esAnchor.test(out)) {
      out = out.replace(esAnchor, (full, indent) =>
        `${full}${eol}${indent}'nav.certifications': 'Certificaciones',`
      );
      changes++;
      log('  OK: inserted ES nav.certifications');
    } else {
      log('  WARN: ES nav.equipment anchor not found, skipping ES');
    }
  }

  // ES product.curvedTempered.name/desc — fill if missing (EN already present per file inspection)
  // ES block: look for ES product.lowE.desc line, insert after it.
  if (/'product\.curvedTempered\.name':\s*'Vidrio[^']*'/.test(out)) {
    log('  SKIP: ES product.curvedTempered already present');
  } else {
    // Match the ES lowE.desc line (ES has Spanish strings — anchor on Spanish value if possible).
    // Fallback: match the SECOND occurrence of 'product.lowE.desc'. We rely on EN already
    // having a curvedTempered line so EN block won't match the "missing" pattern.
    // Use a global scan to find both lowE.desc lines and insert after the second one.
    const lowEDescRe = /([ \t]*)'product\.lowE\.desc':\s*'[^']*',/g;
    const matches = [...out.matchAll(lowEDescRe)];
    if (matches.length >= 2) {
      const second = matches[1];
      const indent = second[1];
      const insertion =
        `${eol}${indent}'product.curvedTempered.name': 'Vidrio Templado Curvado',` +
        `${eol}${indent}'product.curvedTempered.desc': 'Curvado de un eje, Rmin 500mm a 6mm',`;
      // Insert right after second match
      const idx = second.index + second[0].length;
      out = out.slice(0, idx) + insertion + out.slice(idx);
      changes++;
      log('  OK: inserted ES product.curvedTempered.name/desc after second lowE.desc');
    } else if (matches.length === 1) {
      log('  NOTE: only one product.lowE.desc found (EN only). ES block may have different structure - skipping ES curvedTempered; add manually if needed.');
    } else {
      log('  WARN: product.lowE.desc anchor not found, skipping ES curvedTempered');
    }
  }

  if (changes === 0) {
    log('  (no changes)');
    return;
  }
  writeWithBackup(f.abs, f.raw, out);
  log(`  OK: wrote dict.ts with ${changes} insertion(s)`);
}

// ---------- 3) sitemap.ts ----------
function patchSitemap() {
  log('\n> src/app/sitemap.ts');
  const f = readFile('src/app/sitemap.ts');
  if (!f) { log('  ERROR: not found'); return; }

  if (f.raw.includes(`path: "/certifications"`)) {
    log('  SKIP: /certifications already in sitemap staticPaths');
    return;
  }
  const eol = detectEOL(f.raw);
  // Anchor the exact equipment staticPaths line (full object literal form)
  const anchor = /([ \t]*)\{\s*path:\s*"\/equipment",\s*freq:\s*"monthly",\s*priority:\s*0\.6\s*\},/;
  const m = f.raw.match(anchor);
  if (!m) { log('  ERROR: equipment staticPaths entry not found (expected exact object form)'); return; }

  const indent = m[1];
  const newLine = `${indent}{ path: "/certifications", freq: "monthly", priority: 0.7 },`;
  const out = f.raw.replace(anchor, (full) => `${full}${eol}${newLine}`);
  writeWithBackup(f.abs, f.raw, out);
  log('  OK: inserted { path: "/certifications", freq: "monthly", priority: 0.7 }');
}

// ---------- 4) GBK corruption cleanup ----------
const KNOWN_FIXES = [
  { from: 'Independently Verified 路 Government-Sampled',
    to:   'Independently Verified &middot; Government-Sampled' },
  { from: 'China Compulsory Certification 路 National safety-glass regulatory requirement',
    to:   'China Compulsory Certification &middot; National safety-glass regulatory requirement' },
  { from: '01 鈥?Company Qualifications',
    to:   '01 &mdash; Company Qualifications' },
  { from: '02 鈥?3C Factory Reports',
    to:   '02 &mdash; 3C Factory Reports' },
];

function fixEncoding(relPath) {
  log(`\n> ${relPath}`);
  const f = readFile(relPath);
  if (!f) { log('  WARN: not found, skipping'); return; }

  let out = f.raw;
  let hits = 0;
  for (const { from, to } of KNOWN_FIXES) {
    if (out.includes(from)) {
      out = out.split(from).join(to);
      hits++;
      log(`  FIX: "${from.slice(0, 50)}..." -> clean`);
    }
  }

  const residual = [];
  if (out.includes('路')) residual.push('路');
  if (out.includes('鈥')) residual.push('鈥');
  if (out.includes('脳')) residual.push('脳');
  if (residual.length) {
    log(`  WARN unmatched residue (hand-edit): ${residual.join(', ')}`);
    log(`       grep:  findstr /n "路 鈥 脳" ${relPath.replace(/\//g, '\\')}`);
  }

  if (hits === 0) {
    if (residual.length === 0) log('  CLEAN');
    return;
  }
  writeWithBackup(f.abs, f.raw, out);
  log(`  OK: replaced ${hits} pattern(s)`);
}

// ---------- run ----------
log(`# patch-cert-fixes-all.mjs`);
log(`# marker: ${MARKER}`);
log(`# root:   ${ROOT}`);

patchHeader();
patchDict();
patchSitemap();
fixEncoding('src/app/certifications/page.tsx');
fixEncoding('src/components/certifications/CertificationsClient.tsx');

log(`\nDone.`);
log(`NEXT: npm run build && git add + commit + push`);
