// edit/patch-fix-jsx-escape.mjs
// Fix translation-lib.mjs so that JSXText with dangerous characters
// (< > { }) gets converted to JSXExpressionContainer before code generation.
// This prevents SWC from mis-parsing translated text that contains these chars.
//
// Usage: node edit\patch-fix-jsx-escape.mjs

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
// Patch 1: Add @babel/types import
// ============================================================
const importAnchor = `import generateModule from '@babel/generator';
import Anthropic from '@anthropic-ai/sdk';`;

const importReplacement = `import generateModule from '@babel/generator';
import typesModule from '@babel/types';
import Anthropic from '@anthropic-ai/sdk';`;

if (!content.includes(importAnchor)) {
  console.error(`❌ Patch 1 anchor not found. translation-lib.mjs may have been modified.`);
  process.exit(1);
}
if (content.includes(`import typesModule from '@babel/types';`)) {
  console.warn(`⚠️  Patch 1 already applied, skipping`);
} else {
  content = content.replace(importAnchor, importReplacement);
  console.log(`✅ Patch 1: Added @babel/types import`);
}

// ============================================================
// Patch 2: Initialize `t` variable alongside existing traverse/generate
// ============================================================
const tInitAnchor = `const traverse = traverseModule.default || traverseModule;
const generate = generateModule.default || generateModule;`;

const tInitReplacement = `const traverse = traverseModule.default || traverseModule;
const generate = generateModule.default || generateModule;
const t = typesModule.default || typesModule;`;

if (!content.includes(tInitAnchor)) {
  console.error(`❌ Patch 2 anchor not found.`);
  process.exit(1);
}
if (content.includes(`const t = typesModule.default || typesModule;`)) {
  console.warn(`⚠️  Patch 2 already applied, skipping`);
} else {
  content = content.replace(tInitAnchor, tInitReplacement);
  console.log(`✅ Patch 2: Added t (babel types) initialization`);
}

// ============================================================
// Patch 3: Replace generateCode to pre-process dangerous JSXText
// ============================================================
const genAnchor = `export function generateCode(ast) {
  return generate(ast, {
    retainLines: false,
    jsescOption: { minimal: true },
  }).code;
}`;

const genReplacement = `/**
 * Convert JSXText nodes containing dangerous characters (< > { })
 * into JSXExpressionContainer with a string literal, so Babel's code
 * generator produces output that SWC can parse without ambiguity.
 *
 * Example:
 *   <span>< 2 horas</span>  (invalid when generated as raw JSXText)
 * becomes:
 *   <span>{"< 2 horas"}</span>  (unambiguous expression container)
 */
function fixDangerousJSXText(ast) {
  traverse(ast, {
    JSXText(path) {
      const raw = path.node.value;
      if (!raw) return;
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (!/[<>{}]/.test(trimmed)) return;
      // Replace with { "trimmed" } expression container.
      // Surrounding whitespace is intentionally dropped — JSX would
      // collapse it anyway, and keeping it inside the string literal
      // would print as literal whitespace.
      path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(trimmed)));
    },
  });
}

export function generateCode(ast) {
  fixDangerousJSXText(ast);
  return generate(ast, {
    retainLines: false,
    jsescOption: { minimal: true },
  }).code;
}`;

if (!content.includes(genAnchor)) {
  console.error(`❌ Patch 3 anchor not found.`);
  process.exit(1);
}
if (content.includes(`function fixDangerousJSXText(ast) {`)) {
  console.warn(`⚠️  Patch 3 already applied, skipping`);
} else {
  content = content.replace(genAnchor, genReplacement);
  console.log(`✅ Patch 3: Added fixDangerousJSXText + hooked into generateCode`);
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

1. 重新生成所有 ES 文件（cache 保留，不会再调 API，只是把 AST 重新 generate 一遍）:
     rmdir /s /q src\\app\\es
     rmdir /s /q src\\_i18n
     node scripts\\translate-all.mjs es

2. 可选: 运行 Prettier 做最后一轮格式化:
     npx prettier --write "src/_i18n/es/**/*.{ts,tsx}" "src/app/es/**/*.{ts,tsx}"

3. 构建验证:
     npm run build

修复效果:
- 之前翻译结果里的 "< 2 horas" / "> 90%" / "{var}" 等含危险字符的文本
  会被包进 {"..."} 表达式，JSX 解析器就不会误解析了
- 这是通用修复, 不只针对 ContactClient, 所有页面都受益
${'='.repeat(60)}
`);
