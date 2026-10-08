// edit/patch-page-hreflang.mjs
// Inject `alternates: { canonical, languages }` into each page's `export const metadata`
// so that Next.js emits <link rel="alternate" hreflang="..."> tags in the <head>.
//
// Also adds a `makeAlternates()` helper to src/lib/i18n.ts.
//
// Only handles static pages (not dynamic routes like products/[slug]).
// For dynamic routes, you add alternates manually in generateMetadata.
//
// Usage: node edit\patch-page-hreflang.mjs

import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';
import * as typesModule from '@babel/types';

const traverse = traverseModule.default || traverseModule;
const generate = generateModule.default || generateModule;
const t = typesModule.default || typesModule;

const root = process.cwd();

// ============================================================
// Step 1: Add makeAlternates helper to src/lib/i18n.ts
// ============================================================
const i18nPath = path.join(root, 'src/lib/i18n.ts');
if (!fs.existsSync(i18nPath)) {
  console.error(`❌ Not found: ${i18nPath}`);
  process.exit(1);
}

let i18nContent = fs.readFileSync(i18nPath, 'utf-8');
const helperCode = `

/**
 * Build Next.js metadata.alternates for a given canonical path.
 * Emits <link rel="alternate" hreflang="en|es|x-default"> in the <head>.
 */
export function makeAlternates(canonicalPath: string): {
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
    canonical: SITE_URL + canonicalPath,
    languages,
  };
}
`;

if (!i18nContent.includes('export function makeAlternates')) {
  i18nContent += helperCode;
  fs.writeFileSync(i18nPath, i18nContent, 'utf-8');
  console.log(`✅ Added makeAlternates helper to src/lib/i18n.ts`);
} else {
  console.log(`ℹ️  makeAlternates helper already in src/lib/i18n.ts`);
}

// ============================================================
// Step 2: Find all static page.tsx files under src/app (exclude es/, api/)
// ============================================================
function findPages() {
  const results = [];
  const appDir = path.join(root, 'src/app');
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = path.relative(appDir, full).split(path.sep);
      if (rel[0] === 'es' || rel[0] === 'api') continue;
      if (e.isDirectory()) walk(full);
      else if (e.name === 'page.tsx' || e.name === 'page.ts') results.push(full);
    }
  }
  walk(appDir);
  return results;
}

function fileToCanonical(file) {
  const rel = path.relative(path.join(root, 'src/app'), file).split(path.sep);
  rel.pop(); // remove 'page.tsx'
  if (rel.length === 0) return '/';
  return '/' + rel.join('/').replace(/\\/g, '/');
}

// ============================================================
// Step 3: Walk each page, inject alternates
// ============================================================
let modifiedCount = 0;
let noMetadataCount = 0;
let dynamicCount = 0;
let errorCount = 0;
const dynamicPages = [];

for (const pagePath of findPages()) {
  const canonical = fileToCanonical(pagePath);
  const relPath = path.relative(root, pagePath);

  // Skip dynamic routes — they need manual handling (template literals with params)
  if (canonical.includes('[')) {
    console.log(`  ⏭️  Dynamic route (manual fix): ${relPath} → ${canonical}`);
    dynamicCount++;
    dynamicPages.push({ path: relPath, canonical });
    continue;
  }

  const source = fs.readFileSync(pagePath, 'utf-8');
  let ast;
  try {
    ast = parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
      errorRecovery: true,
    });
  } catch (err) {
    console.warn(`  ❌ Parse error: ${relPath}: ${err.message?.slice(0, 60)}`);
    errorCount++;
    continue;
  }

  let hasMetadata = false;
  let hasImport = false;
  let existingI18nImport = null;

  traverse(ast, {
    ImportDeclaration(p) {
      if (p.node.source.value === '@/lib/i18n') {
        existingI18nImport = p.node;
        for (const spec of p.node.specifiers) {
          if (
            spec.type === 'ImportSpecifier' &&
            (spec.imported.name === 'makeAlternates' || spec.imported.value === 'makeAlternates')
          ) {
            hasImport = true;
          }
        }
      }
    },
    VariableDeclarator(p) {
      if (p.node.id?.name === 'metadata' && p.node.init?.type === 'ObjectExpression') {
        hasMetadata = true;

        // Build the alternates property value: makeAlternates('/path')
        const alternatesCall = t.callExpression(
          t.identifier('makeAlternates'),
          [t.stringLiteral(canonical)],
        );

        // Check if alternates property already exists
        let existingAlternates = null;
        for (const prop of p.node.init.properties) {
          if (prop.type !== 'ObjectProperty') continue;
          const keyName = prop.key.name ?? prop.key.value;
          if (keyName === 'alternates') {
            existingAlternates = prop;
            break;
          }
        }

        if (existingAlternates) {
          existingAlternates.value = alternatesCall;
        } else {
          p.node.init.properties.push(
            t.objectProperty(t.identifier('alternates'), alternatesCall),
          );
        }
      }
    },
  });

  if (!hasMetadata) {
    console.log(`  (no static metadata) ${relPath}`);
    noMetadataCount++;
    continue;
  }

  // Add makeAlternates import if needed
  if (!hasImport) {
    const newSpec = t.importSpecifier(t.identifier('makeAlternates'), t.identifier('makeAlternates'));
    if (existingI18nImport) {
      existingI18nImport.specifiers.push(newSpec);
    } else {
      // Insert after last ImportDeclaration
      let lastImportIdx = -1;
      for (let i = 0; i < ast.program.body.length; i++) {
        if (ast.program.body[i].type === 'ImportDeclaration') lastImportIdx = i;
      }
      const newImport = t.importDeclaration([newSpec], t.stringLiteral('@/lib/i18n'));
      ast.program.body.splice(lastImportIdx + 1, 0, newImport);
    }
  }

  const output = generate(ast, {
    retainLines: false,
    jsescOption: { minimal: true },
  }).code;

  fs.writeFileSync(pagePath, output, 'utf-8');
  modifiedCount++;
  console.log(`  ✅ ${relPath} → ${canonical}`);
}

console.log(`
${'='.repeat(60)}
统计:
  修改: ${modifiedCount} 个页面
  无 metadata: ${noMetadataCount}
  动态路由 (需手动修): ${dynamicCount}
  解析错误: ${errorCount}

${dynamicCount > 0 ? `
动态路由列表 (需要手动在 generateMetadata 里加):
${dynamicPages.map(d => `  - ${d.path}`).join('\n')}

示例修改 (以 products/[slug]/page.tsx 为例):

  import { makeAlternates } from '@/lib/i18n';

  export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const product = getProduct(params.slug);
    if (!product) return {};
    return {
      title: ...,
      description: ...,
      openGraph: ...,
      alternates: makeAlternates(\`/products/\${params.slug}\`),  // ← 加这一行
    };
  }
` : ''}
下一步:
1. 重新生成 ES 镜像 (ES 页面也要带 alternates):
     rmdir /s /q src\\app\\es
     rmdir /s /q src\\_i18n
     node scripts\\translate-all.mjs es

2. 可选格式化:
     npx prettier --write "src/app/**/*.tsx" "src/_i18n/**/*.tsx"

3. 构建验证:
     npm run build

4. 推 Vercel

5. 重新用 technicalseo.com 工具测:
   - HTML & HTTP HEADERS 标签页
   - 这次 hreflang Tags 应该显示找到 2 条 alternates (en + es) + x-default
${'='.repeat(60)}
`);
