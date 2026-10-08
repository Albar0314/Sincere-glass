// scripts/translate-page.mjs
// V2 — recursive component-tree translation.
//
// Walks the import graph from the entry page, translates all reachable
// .tsx/.ts files (except React Context providers), and rewrites imports in
// the generated files to point at the translated mirrors.
//
// Usage from project root:
//   node scripts/translate-page.mjs <source-file> <locale> [--dry-run]
//
// Example:
//   node scripts/translate-page.mjs src/app/about/page.tsx es
//   node scripts/translate-page.mjs src/app/about/page.tsx es --dry-run
//
// Output locations:
//   src/app/<locale>/<rel-under-app>/     for app routes
//   src/_i18n/<locale>/components/<rel>   for components
// Report:
//   translation/reports/<locale>-<timestamp>.md

import fs from 'fs';
import path from 'path';
import {
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

const MAX_FILES = 100; // Safety: don't translate the whole codebase

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const positional = args.filter(a => !a.startsWith('--'));

if (positional.length < 2) {
  console.error('Usage: node scripts/translate-page.mjs <source-file> <locale> [--dry-run]');
  console.error('Example: node scripts/translate-page.mjs src/app/about/page.tsx es');
  process.exit(1);
}

const [sourceFile, locale] = positional;
const projectRoot = process.cwd();

async function main() {
  console.log('\n🌍 Translation Pipeline V2 (recursive component tree)');
  console.log('='.repeat(60));
  console.log(`Entry:   ${sourceFile}`);
  console.log(`Locale:  ${locale}`);
  console.log(`Mode:    ${dryRun ? 'DRY RUN (no files written)' : 'LIVE'}`);
  console.log('='.repeat(60));

  const entryPath = path.resolve(sourceFile);
  if (!fs.existsSync(entryPath)) {
    console.error(`❌ File not found: ${entryPath}`);
    process.exit(1);
  }

  const config = loadConfig();
  console.log(`✅ Config: primary=${config.primary.model}`);
  console.log(`   Endpoint: ${config.primary.baseURL || 'default'}`);

  const glossary = loadGlossary(locale);
  console.log(`✅ Glossary: ${Object.keys(glossary).length} terms`);

  const cache = new TranslationCache('translation/cache', locale);
  console.log(`✅ Cache: ${Object.keys(cache.data).length} prior entries\n`);

  // --------------------------------------------------------
  // Phase 1: Walk the import graph
  // --------------------------------------------------------
  console.log('🕸️  Walking import graph...');

  const visited = new Set();
  const queue = [entryPath];
  const parsedFiles = []; // { absPath, source, ast, items, localImports }
  const sharedContextFiles = new Set();
  const nonMirrorableFiles = new Set();
  const unresolvedImports = []; // { from, spec }

  while (queue.length > 0) {
    if (parsedFiles.length >= MAX_FILES) {
      console.warn(`⚠️  Reached MAX_FILES limit (${MAX_FILES}). Stopping walk.`);
      break;
    }
    const file = queue.shift();
    if (visited.has(file)) continue;
    visited.add(file);

    if (!/\.(tsx|ts)$/.test(file)) continue;

    const mirrorPath = getMirrorPath(file, locale, projectRoot);
    if (!mirrorPath) {
      nonMirrorableFiles.add(file);
      continue;
    }

    let source;
    try {
      source = fs.readFileSync(file, 'utf-8');
    } catch (_) {
      continue;
    }

    if (isSharedContextFile(source)) {
      sharedContextFiles.add(file);
      const rel = path.relative(projectRoot, file);
      console.log(`  🚫 Context provider (not mirrored): ${rel}`);
      continue;
    }

    let parsed;
    try {
      parsed = extractTranslatable(source);
    } catch (err) {
      console.warn(`  ⚠️  Parse error: ${path.relative(projectRoot, file)} — ${err.message?.slice(0, 80)}`);
      continue;
    }

    parsedFiles.push({ absPath: file, source, ...parsed });
    const rel = path.relative(projectRoot, file);
    const typeStr = parsed.items.length > 0 ? `${parsed.items.length} strings` : 'no text';
    console.log(`  📄 ${rel} (${typeStr}, ${parsed.localImports.length} imports)`);

    for (const spec of parsed.localImports) {
      if (!shouldFollowImport(spec)) continue;
      const target = resolveImport(spec, file, projectRoot);
      if (target) {
        if (!visited.has(target)) queue.push(target);
      } else {
        unresolvedImports.push({ from: file, spec });
      }
    }
  }

  const mirrorSet = new Set(parsedFiles.map(f => f.absPath));
  console.log(`\n📁 Files in mirror set: ${mirrorSet.size}`);
  console.log(`🚫 Shared contexts excluded: ${sharedContextFiles.size}`);
  if (unresolvedImports.length > 0) {
    console.log(`⚠️  Unresolved imports: ${unresolvedImports.length} (external packages or missing files)`);
  }

  // --------------------------------------------------------
  // Phase 2: Collect translatables across all files
  // --------------------------------------------------------
  const allItems = parsedFiles.flatMap(f => f.items);
  const uniqueTexts = [...new Set(allItems.map(i => i.text))];
  const dupCount = allItems.length - uniqueTexts.length;

  console.log(`\n📝 Translatable strings:`);
  console.log(`   Total items: ${allItems.length}`);
  console.log(`   Unique: ${uniqueTexts.length} (${dupCount} duplicates deduped)`);

  const toTranslate = [];
  const translations = {};
  for (const t of uniqueTexts) {
    const hit = cache.get(t);
    if (hit) translations[t] = hit;
    else toTranslate.push(t);
  }
  console.log(`   From cache: ${Object.keys(translations).length}`);
  console.log(`   Need API: ${toTranslate.length}`);

  // --------------------------------------------------------
  // Phase 3: Translate (batched)
  // --------------------------------------------------------
  if (toTranslate.length > 0) {
    const sysPrompt = buildGlossarySystemPrompt(locale, glossary);
    const translator = new Translator(config, sysPrompt);
    console.log(`\n🔄 Translating ${toTranslate.length} strings via Claude...`);
    const start = Date.now();
    const fresh = await translator.translateBatch(toTranslate);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`✅ Translation complete in ${elapsed}s`);

    Object.assign(translations, fresh);
    for (const [k, v] of Object.entries(fresh)) cache.set(k, v);
    cache.save();
    console.log(`   Cache saved: translation/cache/${locale}.json`);
  } else {
    console.log(`\n✅ All strings already cached — no API calls needed.`);
  }

  // --------------------------------------------------------
  // Phase 4: Apply + rewrite + write each file
  // --------------------------------------------------------
  console.log(`\n✍️  Writing ${mirrorSet.size} mirrored files...`);
  const writeLog = [];

  for (const f of parsedFiles) {
    applyTranslationsInPlace(f.items, translations);
    const rewrites = rewriteImportsInPlace(f.ast, locale, mirrorSet, f.absPath, projectRoot);
    const outputCode = generateCode(f.ast);
    const outPath = getMirrorPath(f.absPath, locale, projectRoot);
    const outRel = path.relative(projectRoot, outPath);

    if (!dryRun) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, outputCode, 'utf-8');
    }

    writeLog.push({
      source: path.relative(projectRoot, f.absPath),
      output: outRel,
      stringCount: f.items.length,
      importRewrites: rewrites.length,
    });

    const marker = dryRun ? '  (DRY)' : '  ✍️  ';
    console.log(`${marker}${outRel}  [${f.items.length} strings, ${rewrites.length} import rewrites]`);
  }

  // --------------------------------------------------------
  // Phase 5: Generate audit report
  // --------------------------------------------------------
  if (!fs.existsSync('translation/reports')) {
    fs.mkdirSync('translation/reports', { recursive: true });
  }
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const reportPath = `translation/reports/${locale}-${stamp}.md`;

  const lines = [];
  lines.push(`# Translation Report (V2 recursive)`);
  lines.push('');
  lines.push(`- **Entry**: \`${sourceFile}\``);
  lines.push(`- **Locale**: ${locale}`);
  lines.push(`- **Date**: ${new Date().toISOString()}`);
  lines.push(`- **Mode**: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  lines.push(`- **Model**: ${config.primary.model}`);
  lines.push('');
  lines.push(`## Summary`);
  lines.push(`- Files mirrored: ${mirrorSet.size}`);
  lines.push(`- Shared Context providers excluded: ${sharedContextFiles.size}`);
  lines.push(`- Translatable items found: ${allItems.length}`);
  lines.push(`- Unique strings: ${uniqueTexts.length}`);
  lines.push(`- From cache: ${uniqueTexts.length - toTranslate.length}`);
  lines.push(`- Newly translated: ${toTranslate.length}`);
  lines.push('');

  if (sharedContextFiles.size > 0) {
    lines.push(`## Shared Context Providers (English leak zone)`);
    lines.push(`These files use \`createContext\` and are NOT mirrored. Any user-facing text in them will show as English on the ES page.`);
    lines.push('');
    [...sharedContextFiles].forEach(f => lines.push(`- \`${path.relative(projectRoot, f)}\``));
    lines.push('');
  }

  if (unresolvedImports.length > 0) {
    lines.push(`## Unresolved local imports`);
    lines.push(`These imports could not be resolved to a file. Usually safe (type-only, external, or build artifact).`);
    lines.push('');
    unresolvedImports.slice(0, 30).forEach(u => {
      lines.push(`- \`${u.spec}\` in \`${path.relative(projectRoot, u.from)}\``);
    });
    if (unresolvedImports.length > 30) {
      lines.push(`- ... and ${unresolvedImports.length - 30} more`);
    }
    lines.push('');
  }

  lines.push(`## Mirrored files`);
  lines.push('');
  lines.push(`| Source | Output | Strings | Rewrites |`);
  lines.push(`|---|---|---|---|`);
  for (const w of writeLog) {
    lines.push(`| \`${w.source}\` | \`${w.output}\` | ${w.stringCount} | ${w.importRewrites} |`);
  }
  lines.push('');

  lines.push(`## All translations (review each for quality)`);
  lines.push('');
  for (const text of uniqueTexts) {
    const translation = translations[text] || '(MISSING!)';
    lines.push(`### EN`);
    lines.push('```');
    lines.push(text);
    lines.push('```');
    lines.push(`**${locale.toUpperCase()}**:`);
    lines.push('```');
    lines.push(translation);
    lines.push('```');
    lines.push('');
  }

  fs.writeFileSync(reportPath, lines.join('\n'), 'utf-8');
  console.log(`\n📊 Report: ${reportPath}`);

  // Compute the user-visible URL
  const appRel = path.relative(path.resolve('src/app'), entryPath).split(path.sep).join('/');
  const routeFromApp = appRel.replace(/\/?page\.tsx?$/i, '') || '';
  const visitUrl = routeFromApp
    ? `http://localhost:3000/${locale}/${routeFromApp}`
    : `http://localhost:3000/${locale}`;

  console.log('\n' + '='.repeat(60));
  console.log('完成。下一步:');
  console.log(`1. 启动开发服: npm run dev`);
  console.log(`2. 访问: ${visitUrl}`);
  console.log(`3. 审核报告: ${reportPath}`);
  console.log(`4. 术语有误 → 改 translation/glossary/${locale}.json`);
  console.log(`   删掉 translation/cache/${locale}.json 对应条目 → 重跑`);
  console.log('='.repeat(60) + '\n');
}

main().catch(err => {
  console.error(`\n❌ FATAL:`, err.stack || err);
  process.exit(1);
});
