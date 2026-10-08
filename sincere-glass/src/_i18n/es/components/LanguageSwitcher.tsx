"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_FLAGS,
  getLocaleFromPath,
  localizedPath,
  stripLocale,
  type Locale,
} from '@/lib/i18n';

/**
 * Language switcher dropdown — dark theme to match the Header.
 * Preserves the current page path when switching locales.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const switchTo = (loc: Locale) => {
    const basePath = stripLocale(pathname);
    const newPath = localizedPath(basePath, loc);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
      >
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
        <span className="uppercase font-medium tracking-wide">{currentLocale}</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[160px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => switchTo(loc)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                loc === currentLocale
                  ? 'bg-white/5 text-brand-accent font-medium'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
