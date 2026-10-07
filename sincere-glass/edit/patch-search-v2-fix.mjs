/**
 * patch-search-v2-fix.mjs — fixes two issues from the previous run:
 *   1. products.ts — populate searchKeywords (previous script missed the standard field due to quote style)
 *   2. SearchModal.tsx — create from scratch (was missing)
 *   3. Header.tsx — wire up search icon + mobile menu entry
 *   4. layout.tsx — wrap with SearchProvider
 *
 * Safe to re-run. Skips what's already done.
 *
 * Run: node edit\patch-search-v2-fix.mjs
 * Then: npm install (if fuse.js not yet installed)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const log = (msg) => console.log(msg);

function ensure(filePath, content) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, content, 'utf-8');
  log(`✅ ${filePath}`);
}

// ─── 1. Fix products.ts — populate searchKeywords for all 5 ─────────────────

function fixProducts() {
  const p = join(SRC, 'lib', 'products.ts');
  if (!existsSync(p)) { log('❌ products.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

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

  let addedCount = 0;

  for (const [slug, keywords] of Object.entries(keywordSets)) {
    // Match both "slug" and 'slug'
    const slugRegex = new RegExp(`slug:\\s*["']${slug.replace('-', '\\-')}["']`);
    const slugMatch = c.match(slugRegex);
    if (!slugMatch) {
      log(`⚠️  Product ${slug} not found — skipping`);
      continue;
    }

    const slugIdx = c.indexOf(slugMatch[0]);
    const entryEnd = c.indexOf('},', slugIdx);
    const entryBlock = c.slice(slugIdx, entryEnd);

    // Skip if already has searchKeywords
    if (entryBlock.includes('searchKeywords')) {
      log(`  ⚠️  ${slug} already has searchKeywords — skipping`);
      continue;
    }

    // Find `standard:` with ANY quote style: "...", '...', `...`
    const standardMatch = entryBlock.match(/standard:\s*(["'`])[^"'`]*\1,?/);
    if (!standardMatch) {
      log(`  ⚠️  ${slug} — could not find standard field; appending searchKeywords before closing brace`);
      // Fallback: insert before the closing }, of this entry
      const insertAt = entryEnd; // right before `},`
      const kwLine = `    searchKeywords: [${keywords.map(k => `"${k}"`).join(', ')}],\n  `;
      c = c.slice(0, insertAt) + kwLine + c.slice(insertAt);
      addedCount++;
      log(`  ✅ ${slug} — ${keywords.length} keywords added (via fallback)`);
      continue;
    }

    const absoluteStandardIdx = slugIdx + entryBlock.indexOf(standardMatch[0]);
    const standardEnd = absoluteStandardIdx + standardMatch[0].length;
    const kwLine = `\n    searchKeywords: [${keywords.map(k => `"${k}"`).join(', ')}],`;
    c = c.slice(0, standardEnd) + kwLine + c.slice(standardEnd);
    addedCount++;
    log(`  ✅ ${slug} — ${keywords.length} keywords added`);
  }

  writeFileSync(p, c);
  log(`✅ products.ts — ${addedCount}/5 products updated`);
}

// ─── 2. Create SearchModal.tsx (full file) ──────────────────────────────────

function createSearchModal() {
  const p = join(SRC, 'components', 'SearchModal.tsx');
  if (existsSync(p)) {
    log('⚠️  SearchModal.tsx already exists — skipping (delete manually if you want to overwrite)');
    return;
  }

  ensure(p, `'use client';

import { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { products } from '@/lib/products';
import { getAllArticles, CLUSTER_LABELS } from '@/lib/blog-registry';

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

  products.forEach((p) => {
    items.push({
      type: 'product',
      title: p.name,
      description: p.tagline,
      href: \`/products/\${p.slug}\`,
      searchKeywords: p.searchKeywords || [],
    });
  });

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

interface SearchContextType {
  openSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({ openSearch: () => {} });
export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

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

function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useMemo(() => {
    const items = buildIndex();
    return new Fuse(items, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'searchKeywords', weight: 2 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
      includeScore: true,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8).map((r) => r.item);
  }, [query, fuse]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

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
            placeholder="Search products, articles... (try 'soundproof', 'IGU', '隔音玻璃')"
            className="flex-1 bg-transparent text-[#F2F0ED] placeholder-[#8B95A5]/60 text-base outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] text-[#8B95A5]/50 border border-[#3A4250]/40 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-5 py-12 text-center text-[#8B95A5]">
              <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try a different term or contact us directly</p>
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
`);
}

// ─── 3. Patch Header.tsx — add search icon ──────────────────────────────────

function patchHeader() {
  const p = join(SRC, 'components', 'Header.tsx');
  if (!existsSync(p)) { log('❌ Header.tsx not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('useSearch')) {
    log('⚠️  Header.tsx already has search — skipping');
    return;
  }

  const firstImport = c.indexOf('import ');
  c = c.slice(0, firstImport) +
    `import { useSearch } from '@/components/SearchModal';\n` +
    c.slice(firstImport);

  const firstUseState = c.indexOf('const [mobileOpen');
  if (firstUseState !== -1) {
    c = c.slice(0, firstUseState) +
      `const { openSearch } = useSearch();\n  ` +
      c.slice(firstUseState);
  }

  // Desktop search button — insert before "Get a Quote"
  const quoteButtonDesktop = c.indexOf('Get a Quote');
  if (quoteButtonDesktop !== -1) {
    const before = c.slice(0, quoteButtonDesktop);
    const lastButtonStart = Math.max(
      before.lastIndexOf('<button'),
      before.lastIndexOf('<a'),
      before.lastIndexOf('<Link')
    );

    if (lastButtonStart !== -1) {
      const searchButton = `{/* Search */}
            <button
              onClick={openSearch}
              className="p-2 text-white/60 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              aria-label="Search"
              title="Search (Ctrl+K)"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            `;
      c = c.slice(0, lastButtonStart) + searchButton + c.slice(lastButtonStart);
    }
  }

  // Mobile search button
  const mobileSection = c.indexOf('mobileOpen');
  if (mobileSection !== -1) {
    const after = c.slice(mobileSection);
    const firstLinkIn = after.indexOf('<Link');
    if (firstLinkIn !== -1) {
      const insertAt = mobileSection + firstLinkIn;
      const mobileSearchBtn = `<button
                onClick={() => { setMobileOpen(false); openSearch(); }}
                className="flex items-center gap-3 px-3 py-3 text-white/70 hover:text-white transition-colors w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                Search
              </button>
              `;
      c = c.slice(0, insertAt) + mobileSearchBtn + c.slice(insertAt);
    }
  }

  writeFileSync(p, c);
  log('✅ Header.tsx — search icon added (desktop + mobile)');
}

// ─── 4. Patch layout.tsx — wrap with SearchProvider ─────────────────────────

function patchLayout() {
  const p = join(SRC, 'app', 'layout.tsx');
  if (!existsSync(p)) { log('❌ layout.tsx not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('SearchProvider')) {
    log('⚠️  layout.tsx already has SearchProvider — skipping');
    return;
  }

  const firstImport = c.indexOf('import ');
  c = c.slice(0, firstImport) +
    `import { SearchProvider } from '@/components/SearchModal';\n` +
    c.slice(firstImport);

  if (c.includes('<QuoteProvider>')) {
    c = c.replace('<QuoteProvider>', '<SearchProvider>\n          <QuoteProvider>');
    const lastQuoteClose = c.lastIndexOf('</QuoteProvider>');
    if (lastQuoteClose !== -1) {
      c = c.slice(0, lastQuoteClose + '</QuoteProvider>'.length) +
        '\n          </SearchProvider>' +
        c.slice(lastQuoteClose + '</QuoteProvider>'.length);
    }
  } else {
    const headerTag = c.indexOf('<Header');
    if (headerTag !== -1) {
      c = c.slice(0, headerTag) + '<SearchProvider>\n          ' + c.slice(headerTag);
      const footerClose = c.indexOf('</Footer>');
      if (footerClose !== -1) {
        c = c.slice(0, footerClose + '</Footer>'.length) +
          '\n          </SearchProvider>' +
          c.slice(footerClose + '</Footer>'.length);
      }
    }
  }

  writeFileSync(p, c);
  log('✅ layout.tsx — SearchProvider wrapper added');
}

// ─── Run ────────────────────────────────────────────────────────────────────

log('');
log('🔧 Patch: Search v2 FIX');
log('────────────────────────────────────────────────');
log('');

fixProducts();
log('');
createSearchModal();
log('');
patchHeader();
log('');
patchLayout();

log('');
log('────────────────────────────────────────────────');
log('✅ Done. Verify:');
log('  1. Open src/lib/products.ts → every product should have searchKeywords: [...]');
log('  2. npm install  (if not already)');
log('  3. npm run build  (confirms TypeScript happy)');
log('  4. npm run dev → press Ctrl+K → try "soundproof", "IGU", "隔音"');
log('');
