"use client";

import { useSearch } from '@/components/SearchModal';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const products = [
  { name: "Tempered Glass", href: "/products/tempered-glass", desc: "4-5× stronger, safe fragmentation", image: "/images/products/tempered.jpg" },
  { name: "Insulated Glass", href: "/products/insulated-glass", desc: "Thermal & sound insulation", image: "/images/products/insulated.jpg" },
  { name: "Laminated Glass", href: "/products/laminated-glass", desc: "Impact-resistant PVB interlayer", image: "/images/products/laminated.jpg" },
  { name: "Enameled Glass", href: "/products/enameled-glass", desc: "Ceramic frit decorative finish", image: "/images/products/enameled.jpg" },
  { name: "Low-E Glass", href: "/products/low-e-glass", desc: "Energy-efficient coating", image: "/images/products/low-e.jpg" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Equipment", href: "/equipment" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { openSearch } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function megaEnter() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  }
  function megaLeave() {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 200);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-dark/95 backdrop-blur-md shadow-lg" : "bg-brand-dark/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Sincere Glass"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              priority
            />
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Sincere Glass
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products mega trigger */}
            <div
              className="relative"
              onMouseEnter={megaEnter}
              onMouseLeave={megaLeave}
              ref={megaRef}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                Products
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Mega dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top ${
                  megaOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
                onMouseEnter={megaEnter}
                onMouseLeave={megaLeave}
              >
                <div className="p-5">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">Our glass products</p>
                  <div className="grid grid-cols-2 gap-2">
                    {products.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        onClick={() => setMegaOpen(false)}
                      >
                        <div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                          <div className="w-full h-full bg-brand-primary/30" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white group-hover:text-brand-accent transition-colors">{p.name}</span>
                          <span className="block text-xs text-white/40 mt-0.5">{p.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link href="/products" className="text-xs text-brand-accent hover:text-brand-accent-hover transition-colors" onClick={() => setMegaOpen(false)}>
                      View all products &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Search icon (desktop) */}
            <button
              onClick={openSearch}
              className="ml-2 p-2 text-white/60 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              aria-label="Search"
              title="Search (Ctrl+K)"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            <LanguageSwitcher className="ml-1" />

            <a
              href="#quote"
              className="ml-2 px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark text-sm font-semibold rounded-md transition-colors"
            >
              Request Quote
            </a>
          </nav>

          {/* Mobile right side: search icon + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={openSearch}
              className="p-2 text-white/70 hover:text-white rounded-md"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button
              className="p-2 text-white"
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
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-5 border-t border-white/10 pt-3">
            <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-2 px-2">Products</p>
            <div className="grid grid-cols-2 gap-1 mb-3">
              {products.map((p) => (
                <Link key={p.href} href={p.href} className="block text-white/70 hover:text-white text-sm py-2 px-2 rounded hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                  {p.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/5 pt-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-white/70 hover:text-white py-2 px-2 text-sm rounded hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/5 pt-3 mt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
            <a href="#quote" className="block bg-brand-accent text-brand-dark text-center py-2.5 rounded-md font-semibold text-sm mt-3" onClick={() => setMobileOpen(false)}>
              Request Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}