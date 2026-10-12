"use client";

import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { useT } from "@/lib/useT";

const productLinks = [
  { key: "tempered",  href: "/products/tempered-glass" },
  { key: "insulated", href: "/products/insulated-glass" },
  { key: "laminated", href: "/products/laminated-glass" },
  { key: "enameled",  href: "/products/enameled-glass" },
  { key: "lowE",      href: "/products/low-e-glass" },
];

const companyLinks = [
  { key: "aboutUs",   href: "/about",     labelKey: "footer.aboutUs" },
  { key: "projects",  href: "/projects",  labelKey: "nav.projects" },
  { key: "equipment", href: "/equipment", labelKey: "nav.equipment" },
  { key: "blog",      href: "/blog",      labelKey: "nav.blog" },
  { key: "contact",   href: "/contact",   labelKey: "nav.contact" },
];

export default function Footer() {
  const t = useT();

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
              {t("footer.companyDesc")}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t("footer.productsHeader")}</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {t(`product.${link.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t("footer.companyHeader")}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t("footer.contactHeader")}</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-brand-accent text-xs font-semibold uppercase tracking-wide mb-1">{t("footer.wuhanFactory")}</p>
                <p>{t("footer.wuhanAddress")}</p>
                <a href="mailto:xcglass@sina.cn" className="hover:text-white transition-colors">xcglass@sina.cn</a>
              </div>
              <div>
                <p className="text-brand-accent text-xs font-semibold uppercase tracking-wide mb-1">{t("footer.honghuFactory")}</p>
                <p>{t("footer.honghuAddress")}</p>
                <a href="mailto:1348767121@qq.com" className="hover:text-white transition-colors">1348767121@qq.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-sm text-center text-white/40">
          &copy; {new Date().getFullYear()} Sincere Glass. {t("footer.allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
