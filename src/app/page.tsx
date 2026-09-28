import Link from "next/link";

const productCategories = [
  {
    title: "Tempered Glass",
    description:
      "Heat-strengthened safety glass for facades, shower enclosures, and structural applications.",
    href: "/products/tempered-glass",
  },
  {
    title: "Insulated Glass",
    description:
      "Double and triple glazed units for thermal and acoustic insulation in commercial buildings.",
    href: "/products/insulated-glass",
  },
  {
    title: "Laminated Glass",
    description:
      "PVB and SGP interlayer glass for safety, security, and hurricane-resistant glazing.",
    href: "/products/laminated-glass",
  },
  {
    title: "Low-E Glass",
    description:
      "Energy-efficient coated glass that reduces heat transfer while maximizing natural light.",
    href: "/products/low-e-glass",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Architectural Glass, Manufactured with Precision
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            15+ years of glass manufacturing expertise. From tempered to Low-E,
            we deliver quality glazing products to construction projects
            worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-sky text-white font-medium px-8 py-3 rounded hover:bg-blue-500 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="border border-gray-500 text-gray-300 font-medium px-8 py-3 rounded hover:border-white hover:text-white transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Our Glass Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productCategories.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group block border border-gray-200 rounded-lg p-8 hover:border-brand-sky hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-sky transition-colors">
                  {product.title}
                </h3>
                <p className="text-brand-steel leading-relaxed">
                  {product.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-brand-glass py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Work With Sincere Glass
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "15+ Years Experience",
                text: "Established manufacturer with proven track record in the Chinese glass industry.",
              },
              {
                title: "Full Production Line",
                text: "Complete processing capabilities — cutting, edging, tempering, laminating, insulating, and coating.",
              },
              {
                title: "Global Shipping",
                text: "Export-ready packaging and logistics support for international B2B buyers.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-brand-steel">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-brand-steel mb-8">
            Tell us about your glass requirements. We respond to all inquiries
            within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-navy text-white font-medium px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
