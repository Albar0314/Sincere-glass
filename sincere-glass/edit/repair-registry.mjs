// repair-registry.mjs
// One-shot repair for src/lib/blog-registry.ts after the deploy script
// inserted article-20 entry into the wrong `];` anchor (ended up inside
// the auditKeyword function signature).
//
// What this does:
//   1. Reads the broken file and asserts the exact damage pattern we expect.
//   2. Removes the misplaced entry + broken `} {` artifact from the auditKeyword
//      return-type block, restoring the function signature.
//   3. Does NOT re-insert the article-20 entry into blogArticles, because an
//      earlier (2026-10-26) article-20 entry is already present at line 1121.
//      If you WANT the newer entry's wording instead, we handle that in a
//      separate step after the file compiles again.
//
// Run from project root:
//   node edit\repair-registry.mjs
//
// Backup is written next to the file as blog-registry.ts.pre-repair.bak

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const PATH = join(ROOT, 'src', 'lib', 'blog-registry.ts');
const BAK  = PATH + '.pre-repair.bak';

if (!existsSync(PATH)) {
  console.error('✗ src/lib/blog-registry.ts not found');
  process.exit(1);
}

const src = readFileSync(PATH, 'utf8');

// ─── Assertions on the known damage pattern ────────────────────────────
const brokenSignature = `export function auditKeyword(newKeyword: string): {
  conflict: boolean;
  conflictingArticles: BlogArticle[
  {
    slug: "curved-tempered-glass-vs-flat-tempered-glass",`;

if (!src.includes(brokenSignature)) {
  console.error('✗ Expected broken pattern not found. File may already be partially repaired or damaged differently.');
  console.error('   Expected head: "export function auditKeyword... BlogArticle[" immediately followed by "{ slug: curved-..." entry');
  console.error('   Aborting without changes.');
  process.exit(1);
}

// The entry ends with `  },\n];` followed by `} {\n  const normalized = ...`
// Find the first `} {` after the broken-signature position; that is the
// end of the misplaced block and the start of the real function body.
const brokenStart = src.indexOf(brokenSignature);
if (brokenStart < 0) {
  console.error('✗ Broken signature indexOf returned -1 after includes() returned true. Impossible.');
  process.exit(1);
}

const bodyStartMarker = '} {\n  const normalized = newKeyword.toLowerCase().trim();';
const bodyStart = src.indexOf(bodyStartMarker, brokenStart);
if (bodyStart < 0) {
  console.error('✗ Could not find `} {\\n  const normalized...` marker after the broken block.');
  console.error('   Aborting without changes.');
  process.exit(1);
}

// ─── Build the repaired file ───────────────────────────────────────────
// Everything before the broken signature stays as-is.
// Replace the broken-signature-through-body-start block with a clean signature.
const headSlice = src.slice(0, brokenStart);
const tailSlice = src.slice(bodyStart + bodyStartMarker.length);

const repairedSignature = `export function auditKeyword(newKeyword: string): {
  conflict: boolean;
  conflictingArticles: BlogArticle[];
} {
  const normalized = newKeyword.toLowerCase().trim();`;

const repaired = headSlice + repairedSignature + tailSlice;

// ─── Backup + write ────────────────────────────────────────────────────
writeFileSync(BAK, src, 'utf8');
console.log(`✓ Backup written: ${BAK}`);

writeFileSync(PATH, repaired, 'utf8');
console.log(`✓ Repaired ${PATH}`);
console.log('');
console.log('Removed:');
console.log('  - Misplaced article-20 entry (was inside auditKeyword return-type block)');
console.log('  - Residual `} {` artifact at end of broken block');
console.log('');
console.log('Preserved:');
console.log('  - The ORIGINAL article-20 entry at line ~1121 (publish date 2026-10-26)');
console.log('    stays intact in the blogArticles array.');
console.log('');
console.log('Next steps:');
console.log('  1. npm run build  — should now succeed');
console.log('  2. If you want the newer v2 entry’s content instead of the');
console.log('     2026-10-26 one, we overwrite that entry in a separate pass.');
console.log('');
console.log('If the build fails, restore:');
console.log(`  copy /Y ${BAK} ${PATH}`);
