'use client';

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
      href: `/products/${p.slug}`,
      searchKeywords: p.searchKeywords || [],
    });
  });

  const articles = getAllArticles();
  articles.forEach((a) => {
    items.push({
      type: 'article',
      title: a.title,
      description: a.excerpt,
      href: `/blog/${a.slug}`,
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeIndex === idx ? 'bg-[#DAA745]/10 text-[#DAA745]' : 'text-[#F2F0ED] hover:bg-[#3A4250]/20'
                    }`}
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeIndex === idx ? 'bg-[#DAA745]/10 text-[#DAA745]' : 'text-[#F2F0ED] hover:bg-[#3A4250]/20'
                    }`}
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
