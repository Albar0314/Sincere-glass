import Link from "next/link";

const productLinks = [
  { label: "Tempered Glass", href: "/products/tempered-glass" },
  { label: "Insulated Glass", href: "/products/insulated-glass" },
  { label: "Laminated Glass", href: "/products/laminated-glass" },
  { label: "Low-E Glass", href: "/products/low-e-glass" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">
              Sincere Glass
            </h3>
            <p className="text-sm leading-relaxed">
              Professional glass manufacturer with 15+ years of experience.
              Tempered, insulated, laminated, and Low-E glass for global B2B
              buyers.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center">
          © {new Date().getFullYear()} Sincere Glass. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
