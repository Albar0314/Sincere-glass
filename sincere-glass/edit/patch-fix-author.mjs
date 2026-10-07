/**
 * patch-fix-author.mjs
 *
 * Fixes article #1 registry entry: replaces hardcoded Yang Ruosong author
 * with DEFAULT_AUTHOR (which Patch 2a already set to Li Cheng).
 *
 * Run from project root: node edit\patch-fix-author.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const registryPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');

let content = readFileSync(registryPath, 'utf-8');

// Replace the hardcoded author object in the article entry with DEFAULT_AUTHOR reference
// Match any inline author object like: author: { name: 'Yang Ruosong', url: '...' }
// (could also match Li Cheng if someone manually changed the name but not the structure)
const oldAuthorPattern = /author:\s*\{\s*name:\s*'[^']+',\s*url:\s*'[^']+'\s*\}/;

if (oldAuthorPattern.test(content)) {
  content = content.replace(oldAuthorPattern, 'author: DEFAULT_AUTHOR');
  writeFileSync(registryPath, content);
  console.log('✅ blog-registry.ts — article #1 author changed to DEFAULT_AUTHOR (Li Cheng)');
} else if (content.includes('author: DEFAULT_AUTHOR')) {
  console.log('ℹ️  Already using DEFAULT_AUTHOR — no change needed');
} else {
  console.log('⚠️  Could not find author pattern in registry — check manually');
}

// Verify DEFAULT_AUTHOR is Li Cheng
if (content.includes("name: 'Li Cheng'")) {
  console.log('✅ DEFAULT_AUTHOR confirmed as Li Cheng');
} else {
  console.log('⚠️  DEFAULT_AUTHOR does not contain Li Cheng — check blog-registry.ts manually');
}
