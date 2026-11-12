// patch-cert-fixes.mjs
// Three fixes for /certifications orphan + GBK leftovers:
//   (1) Add /certifications to Header navLinks (currently orphan page).
//   (2) Replace known GBK-corruption substrings in certifications/page.tsx
//       (路 / 鈥? -> HTML entities so encoding is never an issue again).
//   (3) Same corruption scan on CertificationsClient.tsx (built same session).
//
// Idempotent via marker SG-CERT-FIX-V1 (trailing comment).
// Writes <file>.bak next to each modified file before changing it.
//
// Usage from project root:
//   node patch-cert-fixes.mjs
//
// After success:
//   - npm run build
//   - ADD dict entries for nav.certifications (see printed hint).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const MARKER = 'SG-CERT-FIX-V1';

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

// ---------- Fix 1: Header navLinks ----------
function patchHeader() {
  log('\n> src/components/Header.tsx');
  const f = readFile('src/components/Header.tsx');
  if (!f) { log('  ERROR: Header.tsx not found'); return; }

  if (f.raw.includes(`key: "certifications"`)) {
    log('  SKIP: certifications already in navLinks');
    return;
  }

  // Anchor: equipment line in navLinks (stable identifier)
  const eol = detectEOL(f.raw);
  const anchor = /([ \t]*)\{\s*key:\s*"equipment",\s*href:\s*"\/equipment"\s*\},?/;
  const match = f.raw.match(anchor);
  if (!match) { log('  ERROR: equipment navLinks entry not found'); return; }

  const indent = match[1];
  const newLine = `${indent}{ key: "certifications", href: "/certifications" },`;
  const out = f.raw.replace(anchor, (m) => `${m}${eol}${newLine}`);

  writeWithBackup(f.abs, f.raw, out);
  log('  OK: inserted { key: "certifications", href: "/certifications" } after equipment');
  log('  REMINDER: add dict entries for nav.certifications (EN + ZH + ES if present)');
}

// ---------- Fix 2+3: GBK corruption cleanup ----------
// Known corruption patterns observed in certifications/page.tsx and likely to
// be present in CertificationsClient.tsx (both authored in the 10-30 session
// where PowerShell GBK re-encoding corrupted writeFileSync output).
//
// Use HTML entities on the clean side so the file is encoding-neutral going
// forward. Each pattern is anchored with surrounding English context to make
// false matches on legitimate Chinese text impossible.

const KNOWN_FIXES = [
  // Middle-dot (·) corruptions:
  { from: 'Independently Verified 路 Government-Sampled',
    to:   'Independently Verified &middot; Government-Sampled' },
  { from: 'China Compulsory Certification 路 National safety-glass regulatory requirement',
    to:   'China Compulsory Certification &middot; National safety-glass regulatory requirement' },
  // Em-dash (—) corruptions — "01 — Company" / "02 — 3C Factory":
  { from: '01 鈥?Company Qualifications',
    to:   '01 &mdash; Company Qualifications' },
  { from: '02 鈥?3C Factory Reports',
    to:   '02 &mdash; 3C Factory Reports' },
];

function fixEncoding(relPath) {
  log(`\n> ${relPath}`);
  const f = readFile(relPath);
  if (!f) { log('  WARN: file not found, skipping'); return; }

  let out = f.raw;
  let hits = 0;
  for (const { from, to } of KNOWN_FIXES) {
    if (out.includes(from)) {
      out = out.split(from).join(to);
      hits++;
      log(`  FIX: "${from.slice(0, 50)}..." -> clean`);
    }
  }

  // Report any remaining 路 or 鈥 that we did NOT auto-fix (user may need
  // to hand-edit — these are flagged to avoid silent partial fixes).
  const residual = [];
  if (out.includes('路')) residual.push('路 (middot corruption)');
  if (out.includes('鈥')) residual.push('鈥 (em-dash corruption)');
  if (out.includes('脳')) residual.push('脳 (times corruption)');
  if (residual.length) {
    log(`  WARN unmatched corruption residue (hand-edit required): ${residual.join(', ')}`);
    log(`       grep for context:  findstr /n "路 鈥 脳" ${relPath.replace(/\//g, '\\')}`);
  }

  if (hits === 0 && residual.length === 0) {
    log('  CLEAN: no known corruption patterns found');
    return;
  }
  if (hits === 0) return; // nothing to write

  writeWithBackup(f.abs, f.raw, out);
  log(`  OK: replaced ${hits} corruption pattern(s)`);
}

// ---------- run ----------
log(`# patch-cert-fixes.mjs`);
log(`# marker: ${MARKER}`);
log(`# root:   ${ROOT}`);

patchHeader();
fixEncoding('src/app/certifications/page.tsx');
fixEncoding('src/components/certifications/CertificationsClient.tsx');

log(`\nDone.`);
log(`NEXT:`);
log(`  1. Add dict entries for nav.certifications (EN/ZH[/ES]). Grep location:`);
log(`       findstr /s /n "nav.equipment" src\\`);
log(`     Suggested copy: EN "Certifications" / ZH "资质认证"`);
log(`  2. npm run build`);
log(`  3. git add + commit + push`);
