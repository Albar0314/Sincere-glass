// edit/patch-add-language-switcher.mjs
// Adds LanguageSwitcher to Header (desktop + mobile) and rewrites the
// LanguageSwitcher component with dark-theme styling matching the Header.
//
// Usage: node edit\patch-add-language-switcher.mjs

import fs from 'fs';
import path from 'path';

const root = process.cwd();

// ============================================================
// Step 1: Overwrite LanguageSwitcher.tsx with dark-theme version
// ============================================================
const languageSwitcherContent = `"use client";

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
    <div ref={ref} className={\`relative \${className}\`}>
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
        <svg className={\`w-3 h-3 transition-transform duration-200 \${open ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[160px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => switchTo(loc)}
              className={\`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors \${
                loc === currentLocale
                  ? 'bg-white/5 text-brand-accent font-medium'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }\`}
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
`;

const switcherPath = path.resolve(root, 'src/components/LanguageSwitcher.tsx');
fs.writeFileSync(switcherPath, languageSwitcherContent, 'utf-8');
console.log(`✅ Rewrote: src/components/LanguageSwitcher.tsx (dark theme)`);

// ============================================================
// Step 2: Patch Header.tsx
// ============================================================
const headerPath = path.resolve(root, 'src/components/Header.tsx');
let header = fs.readFileSync(headerPath, 'utf-8');
const originalHeader = header;

// Normalize line endings in-memory for consistent matching
header = header.replace(/\r\n/g, '\n');

// 2a. Add import after the last React import
const importAnchor = 'import { useState, useEffect, useRef } from "react";';
if (!header.includes(importAnchor)) {
  console.error(`❌ Import anchor not found: ${importAnchor}`);
  process.exit(1);
}
if (header.includes('import LanguageSwitcher')) {
  console.warn(`⚠️  LanguageSwitcher import already present, skipping`);
} else {
  header = header.replace(
    importAnchor,
    importAnchor + '\nimport LanguageSwitcher from "@/components/LanguageSwitcher";'
  );
  console.log(`✅ Added import to Header.tsx`);
}

// 2b. Insert LanguageSwitcher in desktop nav (between Search and Request Quote)
const desktopAnchor = `            </button>

            <a
              href="#quote"`;
const desktopReplacement = `            </button>

            <LanguageSwitcher className="ml-1" />

            <a
              href="#quote"`;

if (!header.includes(desktopAnchor)) {
  console.error(`❌ Desktop anchor not found. Header structure may have changed.`);
  console.error(`   Looking for:\n${desktopAnchor}`);
  process.exit(1);
}
if (header.includes('<LanguageSwitcher className="ml-1" />')) {
  console.warn(`⚠️  Desktop LanguageSwitcher already present, skipping`);
} else {
  header = header.replace(desktopAnchor, desktopReplacement);
  console.log(`✅ Inserted LanguageSwitcher in desktop nav`);
}

// 2c. Insert LanguageSwitcher in mobile menu (before Request Quote CTA)
const mobileAnchor = `            </div>
            <a href="#quote" className="block bg-brand-accent`;
const mobileReplacement = `            </div>
            <div className="border-t border-white/5 pt-3 mt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
            <a href="#quote" className="block bg-brand-accent`;

if (!header.includes(mobileAnchor)) {
  console.error(`❌ Mobile anchor not found. Header structure may have changed.`);
  process.exit(1);
}
// Guard: if the replacement is already there, skip
if (header.includes('<div className="border-t border-white/5 pt-3 mt-2 flex justify-center">')) {
  console.warn(`⚠️  Mobile LanguageSwitcher already present, skipping`);
} else {
  header = header.replace(mobileAnchor, mobileReplacement);
  console.log(`✅ Inserted LanguageSwitcher in mobile menu`);
}

// Write back only if content changed
if (header !== originalHeader) {
  fs.writeFileSync(headerPath, header, 'utf-8');
  console.log(`✅ Saved: src/components/Header.tsx`);
} else {
  console.log(`ℹ️  No changes needed in Header.tsx`);
}

// ============================================================
// Also mirror the updated LanguageSwitcher to the ES mirror directory
// so the ES tree uses the same dark-themed component.
// ============================================================
const esSwitcherPath = path.resolve(root, 'src/_i18n/es/components/LanguageSwitcher.tsx');
if (fs.existsSync(path.dirname(esSwitcherPath))) {
  fs.writeFileSync(esSwitcherPath, languageSwitcherContent, 'utf-8');
  console.log(`✅ Also mirrored to: src/_i18n/es/components/LanguageSwitcher.tsx`);
}

console.log(`
${'='.repeat(60)}
完成。下一步:
1. 启动服务: npm run dev
2. 访问 http://localhost:3000/ 和 http://localhost:3000/es/about
3. 验证:
   - Header 右侧出现 🌐 EN / 🌐 ES 按钮
   - 点击弹出下拉，选择另一种语言
   - URL 从 /about 切换到 /es/about（反之亦然），内容也跟着切换
   - 移动端打开菜单，底部有切换按钮
4. 推 GitHub → Vercel 自动部署

如果有问题（比如移动端下拉遮挡其他元素，或者 Header 没显示按钮）,
把截图发给我。
${'='.repeat(60)}
`);
