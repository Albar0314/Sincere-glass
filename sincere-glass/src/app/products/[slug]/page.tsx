import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { products, getProduct } from "@/lib/products";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { makeAlternates } from "@/lib/i18n";
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
    alternates: makeAlternates(`/products/${params.slug}`)
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
