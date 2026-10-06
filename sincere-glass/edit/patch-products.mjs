#!/usr/bin/env node
/**
 * Sincere Glass — Products Pages
 * 从项目根目录运行: node edit/patch-products.mjs
 */
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
const root = process.cwd();
function write(rel, content) {
  const p = join(root, rel);
  const dir = dirname(p);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const existed = existsSync(p);
  writeFileSync(p, content, "utf-8");
  console.log((existed ? "✏️  覆盖" : "✅  创建") + ": " + rel);
}

// ━━━ Shared product data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/lib/products.ts", `export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  image: string;
  specs: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  applications: string[];
  standard: string;
}

export const products: Product[] = [
  {
    slug: "tempered-glass",
    name: "Tempered Glass",
    tagline: "4-5× stronger than annealed glass with safe fragmentation",
    description: [
      "Tempered glass is a type of safety glass produced by heating high-quality float glass near its softening point, then rapidly cooling the surface. This creates compressive stress on the surface and tensile stress in the core — making it 4 to 5 times stronger than ordinary annealed glass.",
      "When broken, tempered glass shatters into small, blunt granules rather than sharp shards, significantly reducing the risk of injury. Its thermal resistance is also 3 times that of standard float glass of the same thickness.",
    ],
    image: "/images/products/tempered.jpg",
    specs: [
      { label: "Thickness", value: "3.8mm – 19mm" },
      { label: "Max Panel Size", value: "3,000mm × 15,000mm" },
      { label: "Strength", value: "4-5× ordinary glass" },
      { label: "Thermal Resistance", value: "3× ordinary float glass" },
      { label: "Processing", value: "Flat & bent tempering available" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Mechanical Strength", desc: "Impact resistance and bending strength 4-5 times that of ordinary glass." },
      { title: "Thermal Shock Resistance", desc: "Withstands large temperature differentials without cracking — 3× the resistance of standard float glass." },
      { title: "Safe Fragmentation", desc: "Breaks into small, blunt-edged particles that minimize risk of serious injury." },
      { title: "Oversized Panels", desc: "Our tempering furnace handles panels up to 3m × 15m — among the largest in Hubei province." },
    ],
    applications: [
      "Curtain walls and building facades",
      "Shower enclosures and bathroom partitions",
      "Glass doors and storefronts",
      "Balustrades and railings",
      "Skylight and canopy glazing",
      "Furniture and tabletops",
    ],
    standard: "GB 15763.2-2005 — Safety Glass for Buildings, Part 2: Tempered Glass",
  },
  {
    slug: "insulated-glass",
    name: "Insulated Glass",
    tagline: "Superior thermal and acoustic insulation for energy-efficient buildings",
    description: [
      "Insulated glass units (IGUs) consist of two or more glass panes separated by a sealed air or gas-filled space. This construction provides excellent thermal insulation, sound reduction, and can significantly reduce building energy costs.",
      "Our IGUs use double-seal spacer technology for long-term durability. Wind pressure resistance is 1.5 times that of single-pane glass of the same thickness. We offer both standard and oversized units with automated argon gas filling.",
    ],
    image: "/images/products/insulated.jpg",
    specs: [
      { label: "Spacer Options", value: "6mm, 9mm, 12mm, 15mm, 20mm" },
      { label: "Glass Options", value: "Clear, Low-E, tinted, reflective" },
      { label: "Gas Fill", value: "Air or Argon (automated filling line)" },
      { label: "Seal Type", value: "Dual-seal (PIB + structural silicone)" },
      { label: "Wind Resistance", value: "1.5× single pane glass" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Energy Savings", desc: "Shading coefficient of 0.22-0.49 reduces cooling loads. Heat transfer coefficient of 1.4-2.8 W/m²·K outperforms standard IGUs." },
      { title: "Indoor Comfort", desc: "Blocks solar radiation heat gain and reduces glare from afternoon sun, improving occupant comfort year-round." },
      { title: "Acoustic Insulation", desc: "Significant noise reduction for urban environments — ideal for offices, hospitals, and residential buildings near busy roads." },
      { title: "Design Flexibility", desc: "Available in multiple tints and coatings for both aesthetic and functional customization." },
    ],
    applications: [
      "Office towers and commercial buildings",
      "Exhibition halls and libraries",
      "Computer rooms and precision instrument facilities",
      "Chemical plants requiring constant temperature/humidity",
      "Residential windows and sliding doors",
      "Sun-shading and anti-glare installations",
    ],
    standard: "GB/T 11944-2012 — Insulated Glass (National Standard)",
  },
  {
    slug: "laminated-glass",
    name: "Laminated Glass",
    tagline: "Impact-resistant safety glass with superior sound and UV blocking",
    description: [
      "Laminated glass consists of two or more glass panes bonded together with a tough PVB (polyvinyl butyral) interlayer. When broken, the interlayer holds the fragments in place — preventing dangerous shards from falling and maintaining a barrier against intrusion.",
      "Beyond safety, laminated glass blocks over 99% of UV radiation and absorbs infrared heat. It also provides excellent sound insulation, filtering noise in the 1000Hz-2000Hz range that penetrates ordinary glass.",
    ],
    image: "/images/products/laminated.jpg",
    specs: [
      { label: "Configuration", value: "2-layer, multi-layer, or jumbo laminated" },
      { label: "Interlayer", value: "PVB (standard) or SGP (structural)" },
      { label: "UV Blocking", value: "> 99% ultraviolet radiation" },
      { label: "Sound Insulation", value: "Filters 1000Hz – 2000Hz noise" },
      { label: "Max Panel Size", value: "3,000mm × 15,000mm (autoclave)" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Safety & Security", desc: "Fragments remain bonded to the interlayer when broken. Provides anti-theft, bullet-resistant, and blast-resistant properties depending on configuration." },
      { title: "Sound Reduction", desc: "Blocks noise that passes through ordinary glass — measurably effective in the 1000-2000Hz range most common in urban environments." },
      { title: "UV Protection", desc: "Over 99% UV blocking protects interior furnishings, artwork, and merchandise from fading and degradation." },
      { title: "Structural Options", desc: "SGP interlayer available for structural glazing applications requiring higher load-bearing capacity." },
    ],
    applications: [
      "Overhead glazing and skylights",
      "Hurricane and storm-resistant windows",
      "Bank counters and security partitions",
      "Museum display cases",
      "Automotive windshields",
      "Floor glass and walkways",
    ],
    standard: "GB 15763.3-2009 — Safety Glass for Buildings, Part 3: Laminated Glass",
  },
  {
    slug: "enameled-glass",
    name: "Enameled Glass",
    tagline: "Decorative ceramic frit glass with permanent color and pattern",
    description: [
      "Enameled glass (also called ceramic frit glass) is produced by screen-printing inorganic ceramic enamel onto the glass surface, then drying and tempering or heat-strengthening it. The enamel permanently fuses to the glass — creating a surface that is abrasion-resistant, acid-resistant, and will never fade or peel.",
      "Available in virtually any color or pattern, enameled glass is widely used in curtain wall spandrel panels, decorative facades, and interior partitions. The enamel layer also absorbs and reflects solar energy, providing measurable shading benefits.",
    ],
    image: "/images/products/enameled.jpg",
    specs: [
      { label: "Colors", value: "Custom RAL / Pantone color matching" },
      { label: "Patterns", value: "Dots, lines, gradients, custom designs" },
      { label: "Durability", value: "Will not fade, peel, or delaminate" },
      { label: "Resistance", value: "Acid, alkali, and abrasion resistant" },
      { label: "Solar Control", value: "Absorbs & reflects partial solar energy" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Permanent Color", desc: "Inorganic ceramic enamel fused at tempering temperature — no fading, no peeling, no color shift over decades of exposure." },
      { title: "Design Freedom", desc: "Custom colors, gradients, and screen-printed patterns. Can complement or contrast with adjacent vision glass in curtain wall systems." },
      { title: "Energy Efficiency", desc: "The enamel layer absorbs and reflects a significant portion of solar radiation, reducing cooling loads and providing visible shading." },
      { title: "Versatile Combinations", desc: "Can be combined with tempering, laminating, or insulating for multi-functional panels that are both decorative and high-performance." },
    ],
    applications: [
      "Curtain wall spandrel panels",
      "Building facades and cladding",
      "Interior wall partitions",
      "Decorative columns and canopies",
      "Signage and branding elements",
      "Privacy screens",
    ],
    standard: "GB 15763.2-2005 — Safety Glass for Buildings, Part 2: Tempered Glass",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
`);

// ━━━ Products listing page ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/products/page.tsx", `import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Glass Products — Tempered, Insulated, Laminated & Enameled",
  description:
    "Explore Sincere Glass's full product range: tempered glass, insulated glass units, laminated safety glass, and enameled decorative glass. All 3C certified.",
  openGraph: {
    title: "Architectural Glass Products | Sincere Glass",
    description: "Full range of 3C-certified architectural glass from China.",
    url: "https://sincereglass.com/products",
  },
};

export default function ProductsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Our Products</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Architectural Glass Solutions
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl">
            Every product is manufactured in-house across our two Hubei factories and carries China's 3C certification.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 md:py-24 bg-brand-lighter">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={"/products/" + product.slug}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-brand-muted text-sm leading-relaxed">{product.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.specs.slice(0, 3).map((s) => (
                      <span key={s.label} className="px-2.5 py-1 bg-brand-lighter text-brand-muted text-xs rounded-full">
                        {s.label}: {s.value}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center mt-5 text-sm font-medium text-brand-accent group-hover:text-brand-accent-hover transition-colors">
                    View Details
                    <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Need a Custom Glass Solution?</h2>
          <p className="mt-3 text-white/60">We manufacture to your specifications — size, coating, color, and configuration.</p>
          <a href="/#quote" className="inline-flex items-center justify-center mt-6 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}
`);

// ━━━ Product detail dynamic page ━━━━━━━━━━━━━━━━━━━━━━━━
write("src/app/products/[slug]/page.tsx", `import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, getProduct } from "@/lib/products";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name + " Manufacturer — Sincere Glass",
    description: product.tagline + ". " + product.description[0].slice(0, 120) + "...",
    openGraph: {
      title: product.name + " | Sincere Glass",
      description: product.tagline,
      url: "https://sincereglass.com/products/" + product.slug,
      images: [{ url: "https://sincereglass.com" + product.image }],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const otherProducts = products.filter((p) => p.slug !== product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: "https://sincereglass.com" + product.image,
    brand: { "@type": "Brand", name: "Sincere Glass" },
    manufacturer: { "@id": "https://sincereglass.com/#organization" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        {/* Hero */}
        <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
              <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
              <span>/</span>
              <span className="text-white/70">{product.name}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-white/60 text-lg max-w-2xl">{product.tagline}</p>
          </div>
        </section>

        <ProductDetailClient product={product} otherProducts={otherProducts} />
      </main>
    </>
  );
}
`);

// ━━━ Product detail client component ━━━━━━━━━━━━━━━━━━━━
write("src/components/products/ProductDetailClient.tsx", `"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";
import type { Product } from "@/lib/products";

export default function ProductDetailClient({
  product,
  otherProducts,
}: {
  product: Product;
  otherProducts: Product[];
}) {
  const { ref: descRef, isInView: descVisible } = useInView();
  const { ref: specRef, isInView: specVisible } = useInView();
  const { ref: featRef, isInView: featVisible } = useInView();
  const { ref: appRef, isInView: appVisible } = useInView();
  const { ref: relRef, isInView: relVisible } = useInView();

  return (
    <>
      {/* Description + Image */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={descRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              style={{ opacity: descVisible ? 1 : 0, transform: descVisible ? "translateX(0)" : "translateX(-30px)", transition: "all 700ms ease-out" }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">
                What is {product.name}?
              </h2>
              <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
                {product.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-6 text-sm text-brand-secondary font-medium">
                Standard: {product.standard}
              </p>
            </div>
            <div
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              style={{ opacity: descVisible ? 1 : 0, transform: descVisible ? "translateX(0)" : "translateX(30px)", transition: "all 700ms ease-out 150ms" }}
            >
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section className="py-16 md:py-24 bg-white" ref={specRef}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2
            className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-10 transition-all duration-600"
            style={{ opacity: specVisible ? 1 : 0, transform: specVisible ? "translateY(0)" : "translateY(16px)" }}
          >
            Technical Specifications
          </h2>
          <div className="overflow-hidden rounded-xl border border-brand-light">
            {product.specs.map((s, i) => (
              <div
                key={s.label}
                className={"flex justify-between items-center px-6 py-4 " + (i % 2 === 0 ? "bg-brand-lighter" : "bg-white")}
                style={{
                  opacity: specVisible ? 1 : 0,
                  transform: specVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "all 400ms ease-out",
                  transitionDelay: (100 + i * 60) + "ms",
                }}
              >
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm text-brand-muted text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={featRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-10 transition-all duration-600"
            style={{ opacity: featVisible ? 1 : 0, transform: featVisible ? "translateY(0)" : "translateY(16px)" }}
          >
            Key Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((f, i) => (
              <div
                key={f.title}
                className="p-6 bg-white rounded-xl border border-brand-light"
                style={{
                  opacity: featVisible ? 1 : 0,
                  transform: featVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 500ms ease-out",
                  transitionDelay: (150 + i * 100) + "ms",
                }}
              >
                <h3 className="font-display font-semibold text-brand-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 md:py-24 bg-white" ref={appRef}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2
            className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-8 transition-all duration-600"
            style={{ opacity: appVisible ? 1 : 0, transform: appVisible ? "translateY(0)" : "translateY(16px)" }}
          >
            Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.applications.map((app, i) => (
              <div
                key={app}
                className="flex items-center gap-3 p-4 rounded-lg bg-brand-lighter"
                style={{
                  opacity: appVisible ? 1 : 0,
                  transform: appVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "all 400ms ease-out",
                  transitionDelay: (100 + i * 60) + "ms",
                }}
              >
                <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-brand-dark">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Need {product.name} for Your Project?
          </h2>
          <p className="mt-3 text-white/60">Tell us your specifications — our team will respond within 24 hours.</p>
          <a href="/#quote" className="inline-flex items-center justify-center mt-6 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Request a Quote
          </a>
        </div>
      </section>

      {/* Related products */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={relRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="font-display text-2xl font-bold text-brand-dark tracking-tight mb-8 transition-all duration-600"
            style={{ opacity: relVisible ? 1 : 0, transform: relVisible ? "translateY(0)" : "translateY(16px)" }}
          >
            Other Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProducts.map((p, i) => (
              <Link
                key={p.slug}
                href={"/products/" + p.slug}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                  opacity: relVisible ? 1 : 0,
                  transform: relVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 500ms ease-out",
                  transitionDelay: (150 + i * 100) + "ms",
                }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{p.name}</h3>
                  <p className="mt-1 text-xs text-brand-muted line-clamp-1">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
`);

console.log("");
console.log("🎉 Products 页面完成！共 5 个文件。");
console.log("");
console.log("  ✦ src/lib/products.ts — 4个产品数据（含技术参数、应用场景、标准）");
console.log("  ✦ src/app/products/page.tsx — 产品列表页（2×2 grid）");
console.log("  ✦ src/app/products/[slug]/page.tsx — 动态详情页（SSG）");
console.log("  ✦ src/components/products/ProductDetailClient.tsx — 详情页客户端组件");
console.log("");
console.log("访问:");
console.log("  http://localhost:3000/products");
console.log("  http://localhost:3000/products/tempered-glass");
console.log("  http://localhost:3000/products/insulated-glass");
console.log("  http://localhost:3000/products/laminated-glass");
console.log("  http://localhost:3000/products/enameled-glass");
