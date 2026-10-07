/**
 * patch-fix-insulated-metadata.mjs
 *
 * Fix: insulated-glass/page.tsx exports both "use client" and metadata.
 * Solution: move metadata export to a layout.tsx in the same directory.
 *
 * Run from project root: node edit\patch-fix-insulated-metadata.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const DIR = join(ROOT, 'src', 'app', 'products', 'insulated-glass');
const pagePath = join(DIR, 'page.tsx');
const layoutPath = join(DIR, 'layout.tsx');

if (!existsSync(pagePath)) {
  console.log('⚠️  page.tsx not found at', pagePath);
  process.exit(1);
}

let page = readFileSync(pagePath, 'utf-8');

// 1. Extract the metadata block
// Match: export const metadata: Metadata = { ... };
// We need to capture the full object including nested braces
const metadataMatch = page.match(/export const metadata:\s*Metadata\s*=\s*\{/);
if (!metadataMatch) {
  console.log('⚠️  Could not find metadata export in page.tsx');
  process.exit(1);
}

const startIdx = metadataMatch.index;
// Find matching closing brace + semicolon
let braceCount = 0;
let endIdx = startIdx;
let foundOpen = false;
for (let i = startIdx; i < page.length; i++) {
  if (page[i] === '{') { braceCount++; foundOpen = true; }
  if (page[i] === '}') { braceCount--; }
  if (foundOpen && braceCount === 0) {
    // Find the semicolon after closing brace
    endIdx = page.indexOf(';', i) + 1;
    break;
  }
}

const metadataBlock = page.slice(startIdx, endIdx);

// 2. Remove metadata export and Metadata import from page.tsx
page = page.replace(metadataBlock, '');
// Clean up double blank lines left behind
page = page.replace(/\n{3,}/g, '\n\n');
// Remove Metadata from import if it's the only thing, or just remove it from the list
// Case: import type { Metadata } from 'next';
page = page.replace(/import\s+type\s*\{\s*Metadata\s*\}\s*from\s*['"]next['"];\s*\n?/, '');
// Case: import { Metadata, ... } or { ..., Metadata }
page = page.replace(/,\s*Metadata/g, '');
page = page.replace(/Metadata\s*,\s*/g, '');

writeFileSync(pagePath, page);
console.log('✅ page.tsx — removed metadata export');

// 3. Create layout.tsx with the metadata
const layout = `import type { Metadata } from 'next';

${metadataBlock}

export default function InsulatedGlassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
`;

writeFileSync(layoutPath, layout);
console.log('✅ layout.tsx — created with metadata export');
console.log('');
console.log('🔧 Fix applied: metadata moved from page.tsx (client component) to layout.tsx (server component)');
