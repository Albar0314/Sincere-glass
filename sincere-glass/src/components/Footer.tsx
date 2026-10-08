import Link from "@/components/LocalizedLink";
import Image from "next/image";

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
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/images/logo.png"
                alt="Sincere Glass"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h3 className="font-display text-white text-lg font-bold">
                Sincere Glass
              </h3>
            </div>
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
