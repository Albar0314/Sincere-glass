// edit/patch-fix-re-exports.mjs
// Fix translation-lib.mjs to handle `export ... from 'X'` barrel re-exports.
// Previously these weren't followed in the import graph, so sibling modules
// weren't mirrored, causing build errors.
//
// Usage: node edit\patch-fix-re-exports.mjs

import fs from 'fs';
import path from 'path';

const libPath = path.resolve('scripts/translation-lib.mjs');
if (!fs.existsSync(libPath)) {
  console.error(`❌ Not found: ${libPath}`);
  process.exit(1);
}

let content = fs.readFileSync(libPath, 'utf-8');
const originalContent = content;

// ============================================================
// Patch 1: Add ExportNamed/ExportAll visitors to extractTranslatable
// ============================================================
const extractAnchor = `    ImportDeclaration(p) {
      const src = p.node.source.value;
      if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
        localImports.add(src);
      }
    },

    JSXText(p) {`;

const extractReplacement = `    ImportDeclaration(p) {
      const src = p.node.source.value;
      if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
        localImports.add(src);
      }
    },

    ExportNamedDeclaration(p) {
      // export { X } from 'Y' / export { default as X } from 'Y'
      if (p.node.source) {
        const src = p.node.source.value;
        if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
          localImports.add(src);
        }
      }
    },

    ExportAllDeclaration(p) {
      // export * from 'Y' / export * as X from 'Y'
      const src = p.node.source.value;
      if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
        localImports.add(src);
      }
    },

    JSXText(p) {`;

if (!content.includes(extractAnchor)) {
  console.error(`❌ Patch 1 anchor not found. translation-lib.mjs may have been modified or has an unexpected format.`);
  process.exit(1);
}
if (content.includes(`ExportNamedDeclaration(p) {\n      // export { X } from 'Y'`)) {
  console.warn(`⚠️  Patch 1 already applied, skipping`);
} else {
  content = content.replace(extractAnchor, extractReplacement);
  console.log(`✅ Patch 1: Added Export visitors to extractTranslatable()`);
}

// ============================================================
// Patch 2: Add ExportNamed/ExportAll to rewriteImportsInPlace
// ============================================================
const rewriteAnchor = `  traverse(ast, {
    ImportDeclaration(p) {
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },
  });
  return rewrites;
}`;

const rewriteReplacement = `  traverse(ast, {
    ImportDeclaration(p) {
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },

    ExportNamedDeclaration(p) {
      if (!p.node.source) return;
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },

    ExportAllDeclaration(p) {
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },
  });
  return rewrites;
}`;

if (!content.includes(rewriteAnchor)) {
  console.error(`❌ Patch 2 anchor not found.`);
  process.exit(1);
}
if (content.includes(`ExportNamedDeclaration(p) {\n      if (!p.node.source) return;`)) {
  console.warn(`⚠️  Patch 2 already applied, skipping`);
} else {
  content = content.replace(rewriteAnchor, rewriteReplacement);
  console.log(`✅ Patch 2: Added Export visitors to rewriteImportsInPlace()`);
}

if (content !== originalContent) {
  fs.writeFileSync(libPath, content, 'utf-8');
  console.log(`✅ Saved: scripts/translation-lib.mjs`);
} else {
  console.log(`ℹ️  No changes needed`);
}

console.log(`
${'='.repeat(60)}
修复完成。下一步:

1. 删除之前错误生成的 es 镜像（避免半成品干扰）:
     rmdir /s /q src\\app\\es
     rmdir /s /q src\\_i18n

2. 重新跑全量翻译（cache 保留，只翻译新发现的 barrel 子文件）:
     node scripts\\translate-all.mjs es

3. 本地验证构建:
     npm run build

4. 构建通过后推线上

如果 npm run build 仍有 import 错误，把错误信息贴给我。
${'='.repeat(60)}
`);
