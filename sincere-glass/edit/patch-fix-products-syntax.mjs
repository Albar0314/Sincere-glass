/**
 * patch-fix-products-syntax.mjs
 *
 * Fixes a syntax error introduced by patch-search-v2-fix.mjs:
 * searchKeywords lines were accidentally inserted inside the specs[] array
 * instead of at the end of each product entry.
 *
 * Strategy: use TypeScript's actual structure — walk the file and for each
 * product, (1) extract and remove any misplaced searchKeywords line,
 * (2) re-insert it right after the `standard:` line (which exists in the
 * tempered-glass entry per the error output).
 *
 * Run: node edit\patch-fix-products-syntax.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const p = join(SRC, 'lib', 'products.ts');

if (!existsSync(p)) {
  console.log('❌ products.ts not found');
  process.exit(1);
}

let c = readFileSync(p, 'utf-8');

// Step 1: extract all searchKeywords lines along with which product they belong to
// Pattern: `searchKeywords: [...],` — may be preceded by whitespace, may have broken formatting

// Approach: parse the file by splitting on product boundaries.
// Each product entry starts with `  {` and ends with `  },` (2-space indent).
// We'll find each product block, extract its slug + searchKeywords, strip the stray line,
// then rebuild the entry with searchKeywords placed before the closing `},`.

// Find all searchKeywords occurrences
const kwRegex = /\s*searchKeywords:\s*\[[^\]]*\],?/g;
const kwMatches = [...c.matchAll(kwRegex)];

if (kwMatches.length === 0) {
  console.log('⚠️  No searchKeywords found — nothing to fix');
  process.exit(0);
}

console.log(`Found ${kwMatches.length} searchKeywords entries to relocate`);

// For each match, extract the content and determine which product it belongs to
const extractedKws = [];
for (const m of kwMatches) {
  // Which product does this belong to? Find nearest preceding `slug: "..."` or `slug: '...'`
  const beforeMatch = c.slice(0, m.index);
  const slugMatches = [...beforeMatch.matchAll(/slug:\s*["']([a-z-]+)["']/g)];
  if (slugMatches.length === 0) {
    console.log(`⚠️  Could not determine product for match at index ${m.index}`);
    continue;
  }
  const slug = slugMatches[slugMatches.length - 1][1];
  // Extract just the `searchKeywords: [...]` without surrounding whitespace / trailing comma
  const kwLine = m[0].match(/searchKeywords:\s*\[[^\]]*\]/)[0];
  extractedKws.push({ slug, kwLine });
  console.log(`  Found: ${slug} → ${kwLine.slice(0, 60)}...`);
}

// Step 2: Remove ALL existing searchKeywords lines (clean slate)
c = c.replace(/,?\s*searchKeywords:\s*\[[^\]]*\],?/g, '');
console.log('✓ Removed all misplaced searchKeywords lines');

// Step 3: For each product, insert its searchKeywords line right before its closing `},`
// Find each product entry and insert properly.
for (const { slug, kwLine } of extractedKws) {
  const slugRegex = new RegExp(`slug:\\s*["']${slug}["']`);
  const slugMatch = c.match(slugRegex);
  if (!slugMatch) {
    console.log(`⚠️  Product ${slug} no longer findable (odd) — skipping`);
    continue;
  }
  const slugIdx = c.indexOf(slugMatch[0]);

  // Find the END of this product entry: look for the next line that is `  },` or `  }` at the start of a line
  // at 2-space indent (indicating end of a top-level array element).
  // Scan forward character by character tracking brace depth.
  let depth = 0;
  let i = slugIdx;
  // We're already inside the entry (slug is a field). Find the opening `{` before slug.
  // Simpler: find the matching close by scanning from slugIdx and tracking nesting.
  // When we hit the entry's closing `}`, that's our target.
  // The entry's opening `{` is right before `slug` — find it.
  const entryOpenIdx = c.lastIndexOf('{', slugIdx);
  if (entryOpenIdx === -1) {
    console.log(`⚠️  Could not find opening brace for ${slug}`);
    continue;
  }

  depth = 1;
  i = entryOpenIdx + 1;
  while (i < c.length && depth > 0) {
    const ch = c[i];
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') depth--;
    if (depth === 0) break;
    i++;
  }

  if (depth !== 0) {
    console.log(`⚠️  Could not find closing brace for ${slug}`);
    continue;
  }

  // i is now at the closing `}` of the entry.
  // Insert kwLine right before it, with proper indentation and leading comma.
  const beforeClose = c.slice(0, i);
  const afterClose = c.slice(i);

  // Trim trailing whitespace right before `}` to figure out whether we need a comma
  const trimmedBefore = beforeClose.trimEnd();
  const needsComma = !trimmedBefore.endsWith(',') && !trimmedBefore.endsWith('{');
  const insertion = `${needsComma ? ',' : ''}\n    ${kwLine},\n  `;

  c = trimmedBefore + insertion + afterClose.replace(/^\s*/, '');
  console.log(`  ✅ ${slug} — searchKeywords placed at correct position`);
}

writeFileSync(p, c);
console.log('');
console.log('✅ products.ts syntax fixed');
console.log('   Run: npm run build  to verify');
