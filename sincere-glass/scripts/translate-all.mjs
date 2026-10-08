// scripts/translate-all.mjs
// Translate every page.tsx under src/app/ (except api/, locale mirrors)
// into the target locale, sharing cache and translator across all pages.
//
// Usage from project root:
//   node scripts/translate-all.mjs <locale> [--dry-run]
//
// Example:
//   node scripts/translate-all.mjs es
//   node scripts/translate-all.mjs es --dry-run
//
// Progress is saved to cache every CHUNK_SIZE strings, so if the run is
// interrupted, a re-run picks up where it left off (cache hits).

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

const MAX_FILES = 500;
const CHUNK_SIZE = 60; // strings per cache-save cycle

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const positional = args.filter(a => !a.startsWith('--'));

if (positional.length < 1) {
  console.error('Usage: node scripts/translate-all.mjs <locale> [--dry-run]');
  console.error('Example: node scripts/translate-all.mjs es');
  process.exit(1);
}

const [locale] = positional;
const projectRoot = process.cwd();

// -------- Discover entry pages --------
function findEntryPages(appDir, locale) {
  const results = [];
  const walk = (dir) => {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const relFromApp = path.relative(appDir, full).split(path.sep);
      const firstSeg = relFromApp[0];
      // Skip the locale's existing mirror directory + special dirs
      if (firstSeg === locale) continue;
      if (e.isDirectory()) {
        if (e.name === 'api') continue;
        if (e.name.startsWith('_')) continue;
        if (e.name.startsWith('.')) continue;
        if (e.name === 'node_modules') continue;
        walk(full);
      } else if (/^page\.(tsx|ts)$/.test(e.name)) {
        results.push(full);
      }
    }
  };
  walk(appDir);
  return results;
}

async function main() {
  console.log('\n🌍 Translation Pipeline — ALL PAGES');
  console.log('='.repeat(60));
  console.log(`Locale: ${locale}`);
  console.log(`Mode:   ${dryRun ? 'DRY RUN (no files written)' : 'LIVE'}`);
  console.log('='.repeat(60));

  const config = loadConfig();
  console.log(`✅ Config: ${config.primary.model} @ ${config.primary.baseURL || 'default'}`);
  const glossary = loadGlossary(locale);
  console.log(`✅ Glossary: ${Object.keys(glossary).length} terms`);
  const cache = new TranslationCache('translation/cache', locale);
  console.log(`✅ Cache: ${Object.keys(cache.data).length} prior entries\n`);

  // ---- Discover ----
  const appDir = path.resolve(projectRoot, 'src/app');
  const entries = findEntryPages(appDir, locale);
  console.log(`📑 Discovered ${entries.length} entry pages:`);
  for (const p of entries) {
    console.log(`   - ${path.relative(projectRoot, p)}`);
  }

  // ---- Walk graph from all entries ----
  console.log(`\n🕸️  Walking import graphs...`);
  const visited = new Set();
  const sharedContextFiles = new Set();
  const unresolvedImports = [];
  const parsedByPath = new Map();
  const queue = [...entries];

  while (queue.length > 0) {
    if (parsedByPath.size >= MAX_FILES) {
      console.warn(`⚠️  MAX_FILES (${MAX_FILES}) reached, halting graph walk.`);
      break;
    }
    const file = queue.shift();
    if (visited.has(file)) continue;
    visited.add(file);
    if (!/\.(tsx|ts)$/.test(file)) continue;

    const mirrorPath = getMirrorPath(file, locale, projectRoot);
    if (!mirrorPath) continue;

    let source;
    try { source = fs.readFileSync(file, 'utf-8'); } catch { continue; }

    if (isSharedContextFile(source)) {
      sharedContextFiles.add(file);
      continue;
    }

    let parsed;
    try {
      parsed = extractTranslatable(source);
    } catch (err) {
      console.warn(`  ⚠️  Parse error: ${path.relative(projectRoot, file)}: ${err.message?.slice(0, 60)}`);
      continue;
    }

    parsedByPath.set(file, { absPath: file, ...parsed });

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

  console.log(`   📁 Mirror set: ${parsedByPath.size} files`);
  console.log(`   🚫 Shared Context providers excluded: ${sharedContextFiles.size}`);
  if (sharedContextFiles.size > 0) {
    [...sharedContextFiles].forEach(f => console.log(`      ${path.relative(projectRoot, f)}`));
  }
  console.log(`   ⚠️  Unresolved imports: ${unresolvedImports.length}`);

  // ---- Collect translatables ----
  const mirrorSet = new Set(parsedByPath.keys());
  const allItems = [];
  for (const p of parsedByPath.values()) allItems.push(...p.items);
  const uniqueTexts = [...new Set(allItems.map(i => i.text))];
  const toTranslate = [];
  const translations = {};
  for (const t of uniqueTexts) {
    const hit = cache.get(t);
    if (hit) translations[t] = hit;
    else toTranslate.push(t);
  }

  console.log(`\n📝 Translatable strings:`);
  console.log(`   Total items: ${allItems.length}`);
  console.log(`   Unique: ${uniqueTexts.length} (${allItems.length - uniqueTexts.length} duplicates deduped)`);
  console.log(`   Already cached: ${Object.keys(translations).length}`);
  console.log(`   Need API: ${toTranslate.length}`);

  // ---- Translate in chunks (saves cache per chunk for crash resilience) ----
  if (toTranslate.length > 0) {
    const sysPrompt = buildGlossarySystemPrompt(locale, glossary);
    const translator = new Translator(config, sysPrompt);
    const totalChunks = Math.ceil(toTranslate.length / CHUNK_SIZE);

    console.log(`\n🔄 Translating ${toTranslate.length} strings in ${totalChunks} chunks of ${CHUNK_SIZE}...`);
    const start = Date.now();

    for (let i = 0; i < toTranslate.length; i += CHUNK_SIZE) {
      const chunk = toTranslate.slice(i, i + CHUNK_SIZE);
      const chunkIdx = Math.floor(i / CHUNK_SIZE) + 1;
      console.log(`\n--- Chunk ${chunkIdx}/${totalChunks} (${chunk.length} strings) ---`);

      let fresh;
      try {
        fresh = await translator.translateBatch(chunk);
      } catch (err) {
        console.error(`❌ Chunk ${chunkIdx} failed: ${err.message}`);
        console.log(`💾 Saving cache (${Object.keys(cache.data).length} entries) before exiting...`);
        cache.save();
        throw err;
      }

      Object.assign(translations, fresh);
      for (const [k, v] of Object.entries(fresh)) cache.set(k, v);
      cache.save();
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const done = Math.min(i + CHUNK_SIZE, toTranslate.length);
      console.log(`💾 Progress: ${done}/${toTranslate.length} translated (${elapsed}s elapsed)`);
    }

    const totalElapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n✅ All ${toTranslate.length} strings translated in ${totalElapsed}s`);
  } else {
    console.log(`\n✅ All strings already cached — no API calls needed`);
  }

  // ---- Apply + rewrite + write all mirrors ----
  console.log(`\n✍️  Writing ${parsedByPath.size} mirrored files${dryRun ? ' (DRY RUN)' : ''}...`);
  let writeCount = 0;
  let errorCount = 0;
  for (const parsedFile of parsedByPath.values()) {
    try {
      applyTranslationsInPlace(parsedFile.items, translations);
      rewriteImportsInPlace(parsedFile.ast, locale, mirrorSet, parsedFile.absPath, projectRoot);
      const output = generateCode(parsedFile.ast);
      const outPath = getMirrorPath(parsedFile.absPath, locale, projectRoot);
      if (!dryRun) {
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, output, 'utf-8');
      }
      writeCount++;
    } catch (err) {
      errorCount++;
      console.error(`  ❌ Failed on ${path.relative(projectRoot, parsedFile.absPath)}: ${err.message?.slice(0, 100)}`);
    }
  }
  console.log(`   ${dryRun ? '(DRY) ' : ''}${writeCount} files written, ${errorCount} failed`);

  // ---- Report ----
  if (!fs.existsSync('translation/reports')) fs.mkdirSync('translation/reports', { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const reportPath = `translation/reports/${locale}-all-${stamp}.md`;

  const lines = [];
  lines.push(`# Full-Site Translation Report (${locale})`);
  lines.push('');
  lines.push(`- Date: ${new Date().toISOString()}`);
  lines.push(`- Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  lines.push(`- Model: ${config.primary.model}`);
  lines.push('');
  lines.push(`## Summary`);
  lines.push(`- Entry pages: ${entries.length}`);
  lines.push(`- Files mirrored: ${parsedByPath.size}`);
  lines.push(`- Files failed: ${errorCount}`);
  lines.push(`- Shared Context providers excluded: ${sharedContextFiles.size}`);
  lines.push(`- Total translatable items: ${allItems.length}`);
  lines.push(`- Unique strings: ${uniqueTexts.length}`);
  lines.push(`- Newly translated: ${toTranslate.length}`);
  lines.push(`- From cache: ${uniqueTexts.length - toTranslate.length}`);
  lines.push('');

  if (sharedContextFiles.size > 0) {
    lines.push(`## Shared Context Providers (English leak zone)`);
    lines.push(`These files use \`createContext\`. Any user-facing text in them shows English on ES pages.`);
    lines.push('');
    [...sharedContextFiles].forEach(f => lines.push(`- \`${path.relative(projectRoot, f)}\``));
    lines.push('');
  }

  lines.push(`## Entry pages discovered`);
  for (const p of entries) {
    lines.push(`- \`${path.relative(projectRoot, p)}\``);
  }
  lines.push('');

  fs.writeFileSync(reportPath, lines.join('\n'));
  console.log(`\n📊 Report: ${reportPath}`);

  console.log('\n' + '='.repeat(60));
  console.log(`完成。下一步:`);
  console.log(`1. npm run build (验证所有 ES 页面都能编译)`);
  console.log(`2. npm run dev → 抽查几个页面:`);
  console.log(`   - http://localhost:3000/es/`);
  console.log(`   - http://localhost:3000/es/products/tempered-glass`);
  console.log(`   - http://localhost:3000/es/blog/tempered-glass-vs-laminated-glass`);
  console.log(`3. 问题随时反馈，然后处理 hreflang + sitemap`);
  console.log('='.repeat(60) + '\n');
}

main().catch(err => {
  console.error(`\n❌ FATAL:`, err.stack || err);
  process.exit(1);
});
