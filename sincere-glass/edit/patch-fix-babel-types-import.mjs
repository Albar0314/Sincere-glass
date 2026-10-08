// edit/patch-fix-babel-types-import.mjs
// Fix @babel/types import to use namespace syntax (Node ESM strict CJS interop)

import fs from 'fs';
import path from 'path';

const libPath = path.resolve('scripts/translation-lib.mjs');
let content = fs.readFileSync(libPath, 'utf-8');
const originalContent = content;

// Replace the problematic default import with a namespace import
const bad = `import typesModule from '@babel/types';`;
const good = `import * as typesModule from '@babel/types';`;

if (!content.includes(bad)) {
  if (content.includes(good)) {
    console.log(`ℹ️  Already fixed`);
    process.exit(0);
  }
  console.error(`❌ Anchor not found. Check scripts/translation-lib.mjs for the @babel/types import line.`);
  process.exit(1);
}

content = content.replace(bad, good);

// Also need to adjust the destructuring since namespace import gives all exports
// at the top level. The existing line is:
//   const t = typesModule.default || typesModule;
// With namespace import, typesModule itself has all the methods (jsxExpressionContainer, etc.)
// as top-level properties. typesModule.default might also exist. The fallback pattern
// still works, but let's make it explicit:
const tInitBad = `const t = typesModule.default || typesModule;`;
const tInitGood = `const t = typesModule.default || typesModule; // handles both ESM default and CJS namespace`;

if (content.includes(tInitBad) && !content.includes(tInitGood)) {
  content = content.replace(tInitBad, tInitGood);
}

fs.writeFileSync(libPath, content, 'utf-8');
console.log(`✅ Fixed @babel/types import in scripts/translation-lib.mjs`);
console.log(`\n下一步: 重新跑翻译`);
console.log(`  rmdir /s /q src\\app\\es`);
console.log(`  rmdir /s /q src\\_i18n`);
console.log(`  node scripts\\translate-all.mjs es`);
