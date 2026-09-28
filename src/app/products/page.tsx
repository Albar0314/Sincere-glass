import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Products",
  description:
    "Tempered glass, insulated glass, laminated glass, Low-E glass and more. Explore the full range from Sincere Glass.",
};

// TODO: Replace static data with WPGraphQL query once products CPT is configured
const products = [
  {
    slug: "tempered-glass",
    title: "Tempered Glass",
    description:
      "Heat-strengthened safety glass — 4 to 5 times stronger than standard annealed glass. Used in facades, shower enclosures, balustrades, and structural glazing.",
  },
  {
    slug: "insulated-glass",
    title: "Insulated Glass (IGU)",
    description:
      "Double and triple glazed units with argon or air fill. Provides superior thermal insulation and acoustic performance for commercial and residential buildings.",
  },
  {
    slug: "laminated-glass",
    title: "Laminated Glass",
    description:
      "Two or more glass layers bonded with PVB or SGP interlayer. Meets safety, security, and hurricane-resistance standards for demanding applications.",
  },
  {
    slug: "low-e-glass",
    title: "Low-E Coated Glass",
    description:
      "Energy-efficient glass with low-emissivity coating. Reduces heat transfer while allowing maximum natural light — ideal for green building projects.",
  },
  {
    slug: "decorative-glass",
    title: "Decorative Glass",
    description:
      "Patterned, frosted, tinted, and printed glass for interior design, partitions, and architectural accents.",
  },
];

export default function ProductsPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Our Glass Products</h1>
        <p className="text-brand-steel mb-12 max-w-2xl">
          From standard tempered glass to high-performance Low-E coatings, we
          manufacture a full range of architectural and industrial glass
          products.
        </p>

        <div className="grid gap-8">
          {products.map((product) => (
            <a
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block border border-gray-200 rounded-lg p-8 hover:border-brand-sky hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-semibold mb-3 group-hover:text-brand-sky transition-colors">
                {product.title}
              </h2>
              <p className="text-brand-steel leading-relaxed">
                {product.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
