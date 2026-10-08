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
 * Dropdown language switcher. Preserves the current page path when switching.
 * Drop it into the Header (desktop + mobile menu) when ready to activate.
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
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-dark hover:text-brand-accent transition-colors"
      >
        <span>{LOCALE_FLAGS[currentLocale]}</span>
        <span>{LOCALE_LABELS[currentLocale]}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-[150px] z-50">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => switchTo(loc)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                loc === currentLocale ? 'text-brand-accent font-semibold' : 'text-brand-dark'
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
