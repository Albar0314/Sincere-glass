/**
 * patch-search-v2.mjs
 *
 * Upgrades site-wide search:
 *   1. products.ts — adds required `searchKeywords: string[]` to Product interface
 *      + populates all 5 products with EN/CN synonym lists
 *   2. blog-registry.ts — adds required `searchKeywords: string[]` to BlogArticle
 *      + populates Article #1
 *   3. SearchModal.tsx — rewritten to:
 *      - Import products from @/lib/products (no more hardcoding)
 *      - Use Fuse.js for fuzzy matching + weighted scoring
 *      - Support typos, synonyms, multi-language (via searchKeywords)
 *   4. package.json — adds fuse.js dependency
 *
 * Run: node edit\patch-search-v2.mjs
 * Then: npm install
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const log = (msg) => console.log(msg);

// ─── 1. Patch products.ts ───────────────────────────────────────────────────

function patchProducts() {
  const p = join(SRC, 'lib', 'products.ts');
  if (!existsSync(p)) { log('❌ products.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('searchKeywords')) {
    log('⚠️  products.ts already has searchKeywords — skipping');
    return;
  }

  // 1a. Add searchKeywords: string[] to Product interface
  // Insert after `standard: string;` which is the last field in interface
  const standardLine = /standard:\s*string;/;
  if (standardLine.test(c)) {
    c = c.replace(
      standardLine,
      `standard: string;
  /** Synonyms, abbreviations, industry terms, and CN translations for search */
  searchKeywords: string[];`
    );
  } else {
    log('⚠️  Could not locate Product interface — add searchKeywords manually');
    return;
  }

  // 1b. Populate searchKeywords for all 5 products
  // Insert searchKeywords right after the `standard:` line in each product entry
  const keywordSets = {
    'tempered-glass': [
      'tempered', 'toughened', 'safety glass', 'strengthened glass',
      'heat strengthened', 'thermally toughened', '3C certified', 'CCC',
      'curtain wall', 'shower', 'balustrade', 'railing', 'skylight',
      '钢化玻璃', '钢化', '安全玻璃', '强化玻璃',
    ],
    'insulated-glass': [
      'insulated', 'insulating', 'IGU', 'double glazing', 'triple glazing',
      'DGU', 'double pane', 'thermal', 'energy efficient', 'U-value',
      'argon filled', 'warm edge', 'spacer', 'sealed unit',
      '中空玻璃', '中空', '双层玻璃', '节能玻璃',
    ],
    'laminated-glass': [
      'laminated', 'lami', 'PVB', 'SGP', 'SentryGlas', 'safety glass',
      'security glass', 'soundproof', 'acoustic', 'sound reduction',
      'noise reduction', 'STC', 'hurricane', 'impact resistant',
      'burglar proof', 'bullet resistant', 'bomb blast',
      '夹胶玻璃', '夹层玻璃', '夹胶', '隔音玻璃', '安全玻璃',
    ],
    'enameled-glass': [
      'enameled', 'enamelled', 'ceramic frit', 'frit', 'spandrel',
      'back painted', 'colored glass', 'decorative glass', 'silkscreen',
      'ceramic ink', 'opaque glass', 'spandrel panel',
      '彩釉玻璃', '彩釉', '釉面玻璃', '装饰玻璃', '丝印玻璃',
    ],
    'low-e-glass': [
      'low-e', 'low emissivity', 'lowe', 'low e', 'coated glass',
      'soft coat', 'hard coat', 'pyrolytic', 'sputtered', 'magnetron',
      'solar control', 'SHGC', 'heat reflective', 'energy saving',
      'LEED', 'passive house', 'green building',
      'Low-E玻璃', '低辐射玻璃', '镀膜玻璃', '节能玻璃',
    ],
  };

  // For each product slug, inject searchKeywords: [...] right after its standard: line
  for (const [slug, keywords] of Object.entries(keywordSets)) {
    const slugMarker = `slug: "${slug}"`;
    const slugIdx = c.indexOf(slugMarker);
    if (slugIdx === -1) {
      log(`⚠️  Product ${slug} not found in products.ts — skipping its keywords`);
      continue;
    }

    // Find the next `standard: "..."` line after this slug
    const entryEnd = c.indexOf('},', slugIdx);
    const entryBlock = c.slice(slugIdx, entryEnd);
    const standardMatch = entryBlock.match(/standard:\s*"[^"]*",?/);
    if (!standardMatch) {
      log(`⚠️  Could not find standard field for ${slug}`);
      continue;
    }

    const absoluteStandardIdx = slugIdx + entryBlock.indexOf(standardMatch[0]);
    const standardEnd = absoluteStandardIdx + standardMatch[0].length;
    const keywordsLine = `\n    searchKeywords: [${keywords.map(k => `"${k}"`).join(', ')}],`;
    c = c.slice(0, standardEnd) + keywordsLine + c.slice(standardEnd);
    log(`  ✅ ${slug} — ${keywords.length} search keywords added`);
  }

  writeFileSync(p, c);
  log('✅ products.ts — searchKeywords field added + all 5 products populated');
}

// ─── 2. Patch blog-registry.ts ──────────────────────────────────────────────

function patchBlogRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('searchKeywords')) {
    log('⚠️  blog-registry.ts already has searchKeywords — skipping');
    return;
  }

  // 2a. Add searchKeywords: string[] to BlogArticle interface
  // Insert after secondaryKeywords?: string[]; or after targetKeyword: string;
  if (c.includes('secondaryKeywords?: string[];')) {
    c = c.replace(
      'secondaryKeywords?: string[];',
      `secondaryKeywords?: string[];
  /** Synonyms, abbreviations, CN translations — powers fuzzy search */
  searchKeywords: string[];`
    );
  } else {
    c = c.replace(
      /targetKeyword:\s*string;/,
      `targetKeyword: string;
  /** Synonyms, abbreviations, CN translations — powers fuzzy search */
  searchKeywords: string[];`
    );
  }

  // 2b. Add searchKeywords to Article #1 (tempered-glass-vs-laminated-glass)
  const article1Marker = `slug: 'tempered-glass-vs-laminated-glass'`;
  if (c.includes(article1Marker)) {
    const entryStart = c.indexOf(article1Marker);
    const entryEnd = c.indexOf('},', entryStart);
    const entryBlock = c.slice(entryStart, entryEnd);

    if (!entryBlock.includes('searchKeywords')) {
      const keywords = [
        'tempered vs laminated', 'tempered or laminated',
        'safety glass comparison', 'laminated vs tempered',
        'glass selection', 'glass types', 'PVB vs tempered',
        'breakage pattern', 'safety glazing', 'facade glass',
        '钢化 夹胶', '安全玻璃 对比', '钢化玻璃 夹胶玻璃', '玻璃选型',
      ];
      // Insert after targetKeyword line
      const targetKwLine = entryBlock.match(/targetKeyword:\s*'[^']+',?/);
      if (targetKwLine) {
        const insertionPoint = entryStart + entryBlock.indexOf(targetKwLine[0]) + targetKwLine[0].length;
        const searchKwLine = `\n    searchKeywords: [${keywords.map(k => `'${k}'`).join(', ')}],`;
        c = c.slice(0, insertionPoint) + searchKwLine + c.slice(insertionPoint);
        log('  ✅ Article #1 — 14 search keywords added');
      }
    }
  }

  writeFileSync(p, c);
  log('✅ blog-registry.ts — searchKeywords field added');
}

// ─── 3. Rewrite SearchModal.tsx with Fuse.js ────────────────────────────────

function rewriteSearchModal() {
  const p = join(SRC, 'components', 'SearchModal.tsx');
  if (!existsSync(p)) { log('❌ SearchModal.tsx not found'); return; }

  const newContent = `'use client';

import { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { products } from '@/lib/products';
import { getAllArticles, CLUSTER_LABELS } from '@/lib/blog-registry';

// ── Search index ────────────────────────────────────────────────────────────

interface SearchItem {
  type: 'product' | 'article';
  title: string;
  description: string;
  href: string;
  tag?: string;
  searchKeywords: string[];
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Products — pulled from src/lib/products.ts (single source of truth)
  products.forEach((p) => {
    items.push({
      type: 'product',
      title: p.name,
      description: p.tagline,
      href: \`/products/\${p.slug}\`,
      searchKeywords: p.searchKeywords,
    });
  });

  // Blog articles — pulled from registry
  const articles = getAllArticles();
  articles.forEach((a) => {
    items.push({
      type: 'article',
      title: a.title,
      description: a.excerpt,
      href: \`/blog/\${a.slug}\`,
      tag: a.cluster ? CLUSTER_LABELS[a.cluster] : a.category,
      searchKeywords: [
        a.targetKeyword,
        ...(a.secondaryKeywords || []),
        ...(a.searchKeywords || []),
        ...a.tags,
      ],
    });
  });

  return items;
}

// ── Context (so Header can open the modal) ──────────────────────────────────

interface SearchContextType {
  openSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({ openSearch: () => {} });
export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ openSearch: () => setIsOpen(true) }}>
      {children}
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </SearchContext.Provider>
  );
}

// ── Modal ───────────────────────────────────────────────────────────────────

function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Build index + Fuse instance once per modal lifecycle
  const fuse = useMemo(() => {
    const items = buildIndex();
    return new Fuse(items, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'searchKeywords', weight: 2 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.4,         // 0 = exact, 1 = anything; 0.4 = reasonable typo tolerance
      ignoreLocation: true,   // match anywhere in the field
      minMatchCharLength: 2,
      includeScore: true,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8).map((r) => r.item);
  }, [query, fuse]);

  // Handle Escape (keyboard shortcut Ctrl+K is in SearchProvider)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const onInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault();
      router.push(results[activeIndex].href);
      onClose();
    }
  }, [results, activeIndex, router, onClose]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!isOpen) return null;

  const productResults = results.filter((r) => r.type === 'product');
  const articleResults = results.filter((r) => r.type === 'article');
  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-w-xl mx-auto mt-[15vh] bg-[#1C1F26] border border-[#3A4250]/50 rounded-xl shadow-2xl overflow-hidden mx-4">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#3A4250]/30">
          <svg className="w-5 h-5 text-[#8B95A5] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search products, articles... (try '隔音玻璃', 'IGU', 'soundproof')"
            className="flex-1 bg-transparent text-[#F2F0ED] placeholder-[#8B95A5]/60 text-base outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] text-[#8B95A5]/50 border border-[#3A4250]/40 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-5 py-12 text-center text-[#8B95A5]">
              <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try a different term or ask us directly</p>
            </div>
          )}

          {!query && (
            <div className="px-5 py-8 text-center text-[#8B95A5]">
              <p className="text-sm">Type to search across products and articles</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs">
                {['tempered', 'IGU', 'soundproof', 'Low-E', '夹胶玻璃', 'curtain wall'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-full border border-[#3A4250]/40 text-[#8B95A5] hover:text-[#DAA745] hover:border-[#DAA745]/30 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productResults.length > 0 && (
            <div className="px-3 pt-3 pb-1">
              <p className="px-2 text-[10px] font-medium text-[#8B95A5]/50 uppercase tracking-wider mb-1">Products</p>
              {productResults.map((r) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <a
                    key={r.href}
                    href={r.href}
                    onClick={(e) => { e.preventDefault(); router.push(r.href); onClose(); }}
                    className={\`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors \${
                      activeIndex === idx ? 'bg-[#DAA745]/10 text-[#DAA745]' : 'text-[#F2F0ED] hover:bg-[#3A4250]/20'
                    }\`}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <div className="w-8 h-8 rounded bg-[#3A4250]/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#8B95A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{r.title}</p>
                      <p className="text-xs text-[#8B95A5] truncate">{r.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {articleResults.length > 0 && (
            <div className="px-3 pt-3 pb-3">
              <p className="px-2 text-[10px] font-medium text-[#8B95A5]/50 uppercase tracking-wider mb-1">Articles</p>
              {articleResults.map((r) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <a
                    key={r.href}
                    href={r.href}
                    onClick={(e) => { e.preventDefault(); router.push(r.href); onClose(); }}
                    className={\`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors \${
                      activeIndex === idx ? 'bg-[#DAA745]/10 text-[#DAA745]' : 'text-[#F2F0ED] hover:bg-[#3A4250]/20'
                    }\`}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <div className="w-8 h-8 rounded bg-[#3A4250]/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#8B95A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{r.title}</p>
                      <p className="text-xs text-[#8B95A5] truncate">{r.description}</p>
                    </div>
                    {r.tag && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3A4250]/30 text-[#8B95A5] shrink-0 hidden sm:inline">
                        {r.tag}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-5 py-2.5 border-t border-[#3A4250]/30 flex items-center justify-between text-[10px] text-[#8B95A5]/40">
            <span>↑↓ navigate · ↵ open · esc close</span>
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchModal;
`;

  writeFileSync(p, newContent);
  log('✅ SearchModal.tsx — full rewrite with Fuse.js + imports from products.ts');
}

// ─── 4. Add fuse.js to package.json ─────────────────────────────────────────

function patchPackageJson() {
  const p = join(ROOT, 'package.json');
  if (!existsSync(p)) { log('❌ package.json not found'); return; }
  const pkg = JSON.parse(readFileSync(p, 'utf-8'));

  if (pkg.dependencies && pkg.dependencies['fuse.js']) {
    log('⚠️  fuse.js already in dependencies — skipping');
    return;
  }

  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies['fuse.js'] = '^7.0.0';

  writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
  log('✅ package.json — fuse.js ^7.0.0 added to dependencies');
}

// ─── Run ────────────────────────────────────────────────────────────────────

log('');
log('🔍 Patch: Search v2 — Fuzzy matching + synonyms + CN support');
log('────────────────────────────────────────────────');
log('');

patchProducts();
log('');
patchBlogRegistry();
log('');
rewriteSearchModal();
log('');
patchPackageJson();

log('');
log('────────────────────────────────────────────────');
log('✅ Done. Next steps:');
log('');
log('  1. npm install           (installs fuse.js)');
log('  2. npm run dev           (test locally)');
log('  3. Try these searches:');
log('     • "temperd"      → typo → still finds Tempered Glass');
log('     • "soundproof"   → synonym → finds Laminated Glass');
log('     • "IGU"          → abbrev → finds Insulated Glass');
log('     • "隔音玻璃"      → CN → finds Laminated Glass');
log('     • "低辐射"        → CN → finds Low-E Glass');
log('');
log('  4. git push → Vercel deploys');
log('');
log('⚠️  New rule (SOP v2.2 — add C20): every new product and blog article');
log('   MUST include searchKeywords: string[] with EN synonyms + abbrevs + CN terms.');
log('   TypeScript will fail the build if omitted.');
log('');
