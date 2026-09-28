import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getProductBySlug,
  getAllProductSlugs,
  getProducts,
} from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";
import type { WpProduct, ProductSpecifications } from "@/types/wordpress";

// ISR: revalidate every hour
export const revalidate = 3600;

// ─── SSG: pre-render all product pages at build time ─────
export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ─── Dynamic metadata from Yoast SEO ────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return buildMetadata(product.seo, {
    title: product.title,
    description: `${product.title} — high quality architectural glass from Sincere Glass. View specifications, applications, and certifications.`,
  });
}

// ─── Spec display helper ─────────────────────────────────
interface SpecRowProps {
  label: string;
  value: string | null | undefined;
  icon?: string;
}

function SpecRow({ label, value, icon }: SpecRowProps) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
      {icon && <span className="text-lg shrink-0">{icon}</span>}
      <div>
        <dt className="text-xs font-medium text-brand-steel uppercase tracking-wide">
          {label}
        </dt>
        <dd className="text-brand-navy mt-0.5">{value}</dd>
      </div>
    </div>
  );
}

// Glass type label mapping
const glassTypeLabels: Record<string, string> = {
  tempered: "Tempered Glass",
  laminated: "Laminated Glass",
  insulated: "Insulated Glass (IGU)",
  "low-e": "Low-E Coated Glass",
  enameled: "Enameled / Ceramic Frit Glass",
};

// ─── Page Component ──────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const specs = product.productSpecifications;
  const glassTypeLabel = specs?.glassType
    ? glassTypeLabels[specs.glassType] || specs.glassType
    : null;

  // Fetch siblings for "Other Products" section
  const allProducts = await getProducts();
  const siblings = allProducts.nodes.filter(
    (p: WpProduct) => p.slug !== slug
  );

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-brand-glass border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-brand-steel">
          <Link href="/" className="hover:text-brand-sky">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-brand-sky">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-navy font-medium">{product.title}</span>
        </div>
      </nav>

      <article className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* ── Hero Section ────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-brand-glass rounded-lg overflow-hidden">
              {product.featuredImage?.node ? (
                <Image
                  src={product.featuredImage.node.sourceUrl}
                  alt={
                    product.featuredImage.node.altText || product.title
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-brand-steel">
                  <svg
                    className="w-16 h-16 opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {glassTypeLabel && (
                <span className="inline-block text-xs font-medium text-brand-sky bg-blue-50 px-2.5 py-1 rounded-full mb-4">
                  {glassTypeLabel}
                </span>
              )}

              <h1 className="text-3xl font-semibold mb-6">{product.title}</h1>

              {/* Specifications Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-sm font-semibold text-brand-navy uppercase tracking-wide mb-4">
                  Specifications
                </h2>
                <dl className="divide-y-0">
                  <SpecRow
                    label="Thickness Range"
                    value={specs?.thicknessRange}
                    icon="📏"
                  />
                  <SpecRow
                    label="Maximum Size"
                    value={specs?.maxSize}
                    icon="📐"
                  />
                  <SpecRow
                    label="Color Options"
                    value={specs?.colorOptions}
                    icon="🎨"
                  />
                  <SpecRow
                    label="Standards & Certifications"
                    value={specs?.certifications}
                    icon="✅"
                  />
                  <SpecRow
                    label="Processing Capabilities"
                    value={specs?.processing}
                    icon="⚙️"
                  />
                  <SpecRow
                    label="Applications"
                    value={specs?.applications}
                    icon="🏢"
                  />
                </dl>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="bg-brand-sky text-white font-medium px-6 py-3 rounded text-center hover:bg-blue-500 transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className="border border-gray-300 text-brand-navy font-medium px-6 py-3 rounded text-center hover:border-brand-sky hover:text-brand-sky transition-colors"
                >
                  ← All Products
                </Link>
              </div>
            </div>
          </div>

          {/* ── Product Description (WP content) ────────── */}
          {product.content && (
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">
                Product Description
              </h2>
              <div
                className="wp-content prose prose-brand max-w-none"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </section>
          )}

          {/* ── Other Products ──────────────────────────── */}
          {siblings.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-8">
                Other Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siblings.map((p: WpProduct) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-brand-sky hover:shadow-md transition-all"
                  >
                    {p.featuredImage?.node && (
                      <div className="relative h-40 bg-brand-glass overflow-hidden">
                        <Image
                          src={p.featuredImage.node.sourceUrl}
                          alt={p.featuredImage.node.altText || p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-brand-sky transition-colors">
                        {p.title}
                      </h3>
                      {p.productSpecifications?.thicknessRange && (
                        <p className="text-sm text-brand-steel mt-1">
                          {p.productSpecifications.thicknessRange}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
