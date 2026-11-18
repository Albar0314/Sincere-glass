/**
 * Hard-coded product map keeps this component decoupled from products.ts shape.
 * Edit this map if product slugs or taglines change.
 * NOTE: image paths must match real files in /public/images/products/
 * (same files the product pages use — the old *-card.jpg paths never existed).
 */
const PRODUCT_MAP: Record<string, { title: string; tagline: string; image: string }> = {
  'tempered-glass': {
    title: 'Tempered Glass',
    tagline: '4–5× stronger than annealed. Jumbo panels up to 3m × 15m.',
    image: '/images/products/tempered.jpg',
  },
  'laminated-glass': {
    title: 'Laminated Glass',
    tagline: 'PVB or SGP interlayer. Fragment-retention safety glass.',
    image: '/images/products/laminated.jpg',
  },
  'insulated-glass': {
    title: 'Insulated Glass (IGU)',
    tagline: 'Low-E coated, argon-filled. Energy-efficient glazing.',
    image: '/images/products/insulated.jpg',
  },
  'low-e-glass': {
    title: 'Low-E Glass',
    tagline: 'Soft-coat and hard-coat options for thermal control.',
    image: '/images/products/insulated.jpg',
  },
  'enameled-glass': {
    title: 'Enameled Glass',
    tagline: 'Ceramic frit for color, pattern, and solar control.',
    image: '/images/products/enameled.jpg',
  },
};

interface Props {
  slugs: string[];
  heading?: string;
}

export default function RelatedProductsCards({
  slugs,
  heading = 'Products referenced in this article',
}: Props) {
  const products = slugs
    .map((slug) => (PRODUCT_MAP[slug] ? { slug, ...PRODUCT_MAP[slug] } : null))
    .filter(Boolean) as Array<{ slug: string; title: string; tagline: string; image: string }>;

  if (!products.length) return null;

  return (
    <section className="my-14">
      <h2 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mb-5 m-0">
        {heading}
      </h2>
      <div className={`grid gap-4 ${products.length === 1 ? 'sm:grid-cols-1' : products.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {products.map((p) => (
          <a
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group block rounded-xl overflow-hidden bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#3A4250]/40">
              <img
                src={p.image}
                alt={p.title}
                width={400}
                height={250}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-[#F2F0ED] mb-1 m-0 group-hover:text-[#DAA745] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{p.tagline}</p>
              <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">
                View product →
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
