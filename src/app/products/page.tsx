import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/wordpress";
import type { WpProduct } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Glass Products",
  description:
    "Tempered glass, insulated glass, laminated glass, ceramic frit glass and more. Explore the full range from Sincere Glass.",
};

// ISR: revalidate every hour
export const revalidate = 3600;
export const dynamic = "force-dynamic";
// Glass type label mapping
const glassTypeLabels: Record<string, string> = {
  tempered: "Tempered",
  laminated: "Laminated",
  insulated: "Insulated",
  "low-e": "Low-E",
  enameled: "Enameled / Ceramic Frit",
};

function getGlassTypeLabel(value: string | null): string {
  if (!value) return "";
  return glassTypeLabels[value] || value;
}

export default async function ProductsPage() {
  let products: WpProduct[] = [];
  try {
    const productsData = await getProducts();
    products = productsData.nodes;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold mb-4">Our Glass Products</h1>
          <p className="text-brand-steel max-w-2xl">
            From standard tempered glass to high-performance Low-E coatings, we
            manufacture a full range of architectural and industrial glass
            products. All products are 3C certified and quality-inspected.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const specs = product.productSpecifications;
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-brand-sky hover:shadow-lg transition-all"
              >
                {/* Featured Image */}
                {product.featuredImage?.node && (
                  <div className="relative h-56 bg-brand-glass overflow-hidden">
                    <Image
                      src={product.featuredImage.node.sourceUrl}
                      alt={
                        product.featuredImage.node.altText || product.title
                      }
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Glass Type Badge */}
                  {specs?.glassType && (
                    <span className="inline-block text-xs font-medium text-brand-sky bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                      {getGlassTypeLabel(specs.glassType)}
                    </span>
                  )}

                  <h2 className="text-xl font-semibold mb-3 group-hover:text-brand-sky transition-colors">
                    {product.title}
                  </h2>

                  {/* Excerpt */}
                  {product.excerpt && (
                    <div
                      className="text-brand-steel text-sm leading-relaxed mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: product.excerpt }}
                    />
                  )}

                  {/* Quick Specs */}
                  <div className="space-y-1.5 text-sm text-brand-steel">
                    {specs?.thicknessRange && (
                      <div className="flex gap-2">
                        <span className="font-medium text-brand-navy w-24 shrink-0">
                          Thickness:
                        </span>
                        <span>{specs.thicknessRange}</span>
                      </div>
                    )}
                    {specs?.maxSize && (
                      <div className="flex gap-2">
                        <span className="font-medium text-brand-navy w-24 shrink-0">
                          Max Size:
                        </span>
                        <span>{specs.maxSize}</span>
                      </div>
                    )}
                    {specs?.applications && (
                      <div className="flex gap-2">
                        <span className="font-medium text-brand-navy w-24 shrink-0">
                          Applications:
                        </span>
                        <span className="line-clamp-1">
                          {specs.applications}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA hint */}
                  <div className="mt-4 text-brand-sky text-sm font-medium group-hover:underline">
                    View Details →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-brand-steel mb-4">
            Need a custom glass solution? We can manufacture to your exact
            specifications.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-navy text-white font-medium px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
