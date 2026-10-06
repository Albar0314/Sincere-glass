#!/usr/bin/env node
/**
 * Sincere Glass — Config Patch Script
 *
 * 创建 tailwind.config.ts（品牌色+字体）
 * 更新 src/app/layout.tsx（加 Space Grotesk 字体）
 * 更新 src/app/globals.css（修正品牌色引用）
 * 升级 src/components/Header.tsx（Sticky + 新配色）
 * 升级 src/components/Footer.tsx（双工厂信息 + 新配色）
 *
 * 用法：node patch-config.mjs
 */

import { writeFileSync, existsSync } from "fs";
import { join } from "path";

const root = process.cwd();

function write(rel, content) {
  const p = join(root, rel);
  const existed = existsSync(p);
  writeFileSync(p, content, "utf-8");
  console.log(`${existed ? "✏️  覆盖" : "✅  创建"}: ${rel}`);
}

// ─── 1. tailwind.config.ts ────────────────────────────────
write("tailwind.config.ts", `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core palette
          primary: "#1B3A5C",
          secondary: "#2A6FA8",
          accent: "#E8A838",
          "accent-hover": "#D4962E",
          dark: "#0F2439",
          light: "#F7F9FC",
          muted: "#6B7280",
          // Legacy aliases (backward compat with existing components)
          navy: "#1B3A5C",
          sky: "#2A6FA8",
          glass: "#F0F6FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
`);

// ─── 2. src/app/layout.tsx ────────────────────────────────
write("src/app/layout.tsx", `import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Sincere Glass | Architectural Glass Manufacturer in China",
    template: "%s | Sincere Glass",
  },
  description:
    "Sincere Glass manufactures tempered, insulated, laminated & enameled glass for global construction projects. Two factories, 20,000㎡, 3C certified.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${spaceGrotesk.variable}\`}>
      <body className="font-sans text-brand-dark antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`);

// ─── 3. src/app/globals.css ───────────────────────────────
write("src/app/globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-brand-dark antialiased;
  }

  /* WordPress content rendering */
  .wp-content h2 {
    @apply text-2xl font-semibold mt-8 mb-4;
  }
  .wp-content h3 {
    @apply text-xl font-semibold mt-6 mb-3;
  }
  .wp-content p {
    @apply mb-4 leading-relaxed;
  }
  .wp-content ul {
    @apply list-disc pl-6 mb-4;
  }
  .wp-content ol {
    @apply list-decimal pl-6 mb-4;
  }
  .wp-content img {
    @apply max-w-full h-auto rounded-lg my-6;
  }
  .wp-content a {
    @apply text-brand-secondary underline hover:no-underline;
  }
  .wp-content table {
    @apply w-full border-collapse mb-6;
  }
  .wp-content th,
  .wp-content td {
    @apply border border-gray-200 px-4 py-2 text-left;
  }
  .wp-content th {
    @apply bg-brand-light font-semibold;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
`);

// ─── 4. src/components/Header.tsx ─────────────────────────
write("src/components/Header.tsx", `"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold text-white tracking-tight"
          >
            Sincere Glass
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#quote"
              className="ml-2 px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark text-sm font-semibold rounded-md transition-colors"
            >
              Request Quote
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-1 border-t border-white/10 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white/70 hover:text-white py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#quote"
              className="block bg-brand-accent text-brand-dark text-center py-2.5 rounded-md font-semibold text-sm mt-3"
              onClick={() => setMobileOpen(false)}
            >
              Request Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
`);

// ─── 5. src/components/Footer.tsx ─────────────────────────
write("src/components/Footer.tsx", `import Link from "next/link";

const productLinks = [
  { label: "Tempered Glass", href: "/products/tempered-glass" },
  { label: "Insulated Glass", href: "/products/insulated-glass" },
  { label: "Laminated Glass", href: "/products/laminated-glass" },
  { label: "Enameled Glass", href: "/products/enameled-glass" },
  { label: "Low-E Glass", href: "/products/low-e-glass" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Equipment", href: "/equipment" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-white text-lg font-bold mb-3">
              Sincere Glass
            </h3>
            <p className="text-sm leading-relaxed">
              Architectural glass manufacturer in China with 15+ years of
              experience. Custom tempered, insulated, laminated, and enameled
              glass for global construction projects.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-brand-accent text-xs font-semibold uppercase tracking-wide mb-1">Wuhan Factory</p>
                <p>Wujin Industrial Park, Hannan District</p>
                <a href="mailto:xcglass@sina.cn" className="hover:text-white transition-colors">xcglass@sina.cn</a>
              </div>
              <div>
                <p className="text-brand-accent text-xs font-semibold uppercase tracking-wide mb-1">Honghu Factory</p>
                <p>Xintan Town Industrial Park, Honghu</p>
                <a href="mailto:1348767121@qq.com" className="hover:text-white transition-colors">1348767121@qq.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-sm text-center text-white/40">
          &copy; {new Date().getFullYear()} Sincere Glass. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
`);

console.log(`\n🎉 配置 patch 完成！`);
console.log(`\n现在可以运行 npm run dev 看效果了。`);
console.log(`\n⚠️  还差占位图片 — 放到 public/images/ 下：`);
console.log(`   hero-factory.jpg, factory-exterior.jpg`);
console.log(`   products/tempered.jpg, insulated.jpg, laminated.jpg, enameled.jpg`);
console.log(`   cases/wuhan-station.jpg, tianhe-t3.jpg, guobo.jpg, haier.jpg,`);
console.log(`         biguiyuan.jpg, jiangxia-hospital.jpg, guanggu.jpg, baoli.jpg`);
