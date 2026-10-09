// edit/patch-fix-canonical.mjs
// Fix: ES mirror pages' canonical URL was pointing at the EN version,
// which told Google "the EN page is authoritative" and prevented ES
// indexing. This patch makes each page's canonical point at itself.
//
// Two changes:
//   1. src/lib/i18n.ts    — makeAlternates accepts optional locale param
//   2. scripts/translate-all.mjs — auto-injects locale as 2nd arg in ES mirrors
//
// Usage: node edit\patch-fix-canonical.mjs

import fs from 'fs';
import path from 'path';

const root = process.cwd();

// ============================================================
// Part 1: Update makeAlternates in src/lib/i18n.ts
// ============================================================
const i18nPath = path.join(root, 'src/lib/i18n.ts');
let i18n = fs.readFileSync(i18nPath, 'utf-8');

// Match the existing makeAlternates function and replace it entirely
const oldFn = /export function makeAlternates\(canonicalPath: string\): \{[\s\S]*?\n\}/;

const newFn = `export function makeAlternates(
  canonicalPath: string,
  locale: Locale = DEFAULT_LOCALE,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    const hreflang = loc === DEFAULT_LOCALE ? 'en' : loc;
    languages[hreflang] = SITE_URL + localizedPath(canonicalPath, loc);
  }
  languages['x-default'] = SITE_URL + localizedPath(canonicalPath, DEFAULT_LOCALE);
  return {
    canonical: SITE_URL + localizedPath(canonicalPath, locale),
    languages,
  };
}`;

if (!oldFn.test(i18n)) {
  console.error('❌ Could not find existing makeAlternates in src/lib/i18n.ts');
  console.error('   The function signature may have been modified already.');
  process.exit(1);
}

if (i18n.includes('locale: Locale = DEFAULT_LOCALE')) {
  console.log('ℹ️  makeAlternates already accepts locale param, skipping Part 1');
} else {
  i18n = i18n.replace(oldFn, newFn);
  fs.writeFileSync(i18nPath, i18n, 'utf-8');
  console.log('✅ Part 1: Updated makeAlternates signature in src/lib/i18n.ts');
}

// ============================================================
// Part 2: Patch scripts/translate-all.mjs to inject locale arg
// ============================================================
const translateAllPath = path.join(root, 'scripts/translate-all.mjs');
let translateAll = fs.readFileSync(translateAllPath, 'utf-8');

// Add the import for @babel/types (if not already present)
if (!translateAll.includes("import * as typesModule from '@babel/types'")) {
  const importAnchor = `import {
  loadConfig,
  loadGlossary,
  buildGlossarySystemPrompt,
  TranslationCache,
  Translator,
  extractTranslatable,
  applyTranslationsInPlace,
  generateCode,
  resolveImport,
  shouldFollowImport,
  isSharedContextFile,
  getMirrorPath,
  rewriteImportsInPlace,
} from './translation-lib.mjs';`;

  const importReplacement = `import {
  loadConfig,
  loadGlossary,
  buildGlossarySystemPrompt,
  TranslationCache,
  Translator,
  extractTranslatable,
  applyTranslationsInPlace,
  generateCode,
  resolveImport,
  shouldFollowImport,
  isSharedContextFile,
  getMirrorPath,
  rewriteImportsInPlace,
} from './translation-lib.mjs';
import traverseModule from '@babel/traverse';
import * as typesModule from '@babel/types';
const _traverse = traverseModule.default || traverseModule;
const _t = typesModule.default || typesModule;

/**
 * In ES/other-locale mirrors, convert \`makeAlternates(path)\` calls to
 * \`makeAlternates(path, "<locale>")\` so each mirror produces a canonical
 * URL that points at itself (not the EN original).
 */
function injectLocaleIntoMakeAlternates(ast, targetLocale) {
  _traverse(ast, {
    CallExpression(p) {
      const callee = p.node.callee;
      if (callee.type !== 'Identifier' || callee.name !== 'makeAlternates') return;
      // Only touch calls that have exactly one argument (don't double-inject)
      if (p.node.arguments.length !== 1) return;
      p.node.arguments.push(_t.stringLiteral(targetLocale));
    },
  });
}`;

  if (!translateAll.includes(importAnchor)) {
    console.error('❌ Could not find translate-all.mjs import block to patch');
    console.error('   The file structure may have changed since it was generated.');
    process.exit(1);
  }
  translateAll = translateAll.replace(importAnchor, importReplacement);
  console.log('✅ Part 2a: Added @babel/types + injectLocaleIntoMakeAlternates helper');
} else {
  console.log('ℹ️  translate-all.mjs already has @babel/types import, skipping Part 2a');
}

// Add the injection call into the write loop
const writeAnchor = `  for (const parsedFile of parsedByPath.values()) {
    try {
      applyTranslationsInPlace(parsedFile.items, translations);
      rewriteImportsInPlace(parsedFile.ast, locale, mirrorSet, parsedFile.absPath, projectRoot);
      const output = generateCode(parsedFile.ast);`;

const writeReplacement = `  for (const parsedFile of parsedByPath.values()) {
    try {
      applyTranslationsInPlace(parsedFile.items, translations);
      rewriteImportsInPlace(parsedFile.ast, locale, mirrorSet, parsedFile.absPath, projectRoot);
      injectLocaleIntoMakeAlternates(parsedFile.ast, locale);
      const output = generateCode(parsedFile.ast);`;

if (translateAll.includes('injectLocaleIntoMakeAlternates(parsedFile.ast, locale);')) {
  console.log('ℹ️  Injection step already present, skipping Part 2b');
} else if (!translateAll.includes(writeAnchor)) {
  console.error('❌ Could not find write loop in translate-all.mjs');
  process.exit(1);
} else {
  translateAll = translateAll.replace(writeAnchor, writeReplacement);
  console.log('✅ Part 2b: Added injectLocaleIntoMakeAlternates call to write loop');
}

fs.writeFileSync(translateAllPath, translateAll, 'utf-8');

console.log(`
${'='.repeat(60)}
修复完成。下一步:

1. 重新生成 ES 镜像 (无 API 调用，几秒钟):
     node scripts\\translate-all.mjs es

2. 构建:
     npm run build

3. 验证 canonical 是对的:
     curl http://localhost:3000/es/about | findstr "canonical"
   应该看到: <link rel="canonical" href="https://sincereglass.com/es/about"/>

   不是 (之前): <link rel="canonical" href="https://sincereglass.com/about"/>

4. 推 Vercel

5. 再去 technicalseo.com/tools/hreflang/ 测:
   - 两边 (EN 和 ES) 都应该显示绿色 ✓, 没有 "not indexable" 错误

效果:
- 之前: ES 页面 canonical 指向 EN → Google 认为 EN 是权威版, 不单独收录 ES
- 修复后: 每个页面 canonical 指向自己 + hreflang 互相指向 → Google 认为是两个独立页面, 分别收录
${'='.repeat(60)}
`);
