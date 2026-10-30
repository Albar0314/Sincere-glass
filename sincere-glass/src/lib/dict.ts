// Translation dictionary for shared UI chrome.
// Add new strings here, then use via useT() in Client Components.
// Keys use dot.separated.namespaces. Unknown keys fall back to EN, then to the key itself.

import type { Locale } from './i18n';

type Dict = Record<string, string>;

const en: Dict = {
  // ─── Navigation (Header) ────────────────────────────────────────────
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.products': 'Products',
  'nav.projects': 'Projects',
  'nav.equipment': 'Equipment',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'nav.requestQuote': 'Request Quote',
  'nav.certifications': 'Certifications',
  'nav.search': 'Search',
  'nav.toggleNav': 'Toggle navigation',
  'nav.ourGlassProducts': 'Our glass products',
  'nav.viewAllProducts': 'View all products →',

  // ─── Product names + descriptions (Header mega + Footer links) ──────
  'product.tempered.name': 'Tempered Glass',
  'product.tempered.desc': '4-5× stronger, safe fragmentation',
  'product.insulated.name': 'Insulated Glass',
  'product.insulated.desc': 'Thermal & sound insulation',
  'product.laminated.name': 'Laminated Glass',
  'product.laminated.desc': 'Impact-resistant PVB interlayer',
  'product.enameled.name': 'Enameled Glass',
  'product.enameled.desc': 'Ceramic frit decorative finish',
  'product.lowE.name': 'Low-E Glass',
  'product.lowE.desc': 'Energy-efficient coating',
  'product.curvedTempered.name': 'Curved Tempered Glass',
  'product.curvedTempered.desc': 'Single-axis bent, Rₘᵢₙ 500mm at 6mm',

  // ─── Footer ─────────────────────────────────────────────────────────
  'footer.productsHeader': 'Products',
  'footer.companyHeader': 'Company',
  'footer.contactHeader': 'Contact',
  'footer.aboutUs': 'About Us',
  'footer.wuhanFactory': 'Wuhan Factory',
  'footer.honghuFactory': 'Honghu Factory',
  'footer.wuhanAddress': 'Wujin Industrial Park, Hannan District',
  'footer.honghuAddress': 'Xintan Town Industrial Park, Honghu',
  'footer.companyDesc':
    'Architectural glass manufacturer in China with 15+ years of experience. Custom tempered, insulated, laminated, and enameled glass for global construction projects.',
  'footer.allRightsReserved': 'All rights reserved.',

  // ─── Quote Modal ────────────────────────────────────────────────────
  'quote.success.title': 'Quote Request Sent!',
  'quote.success.body':
    'Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.',
  'quote.success.close': 'Close',
  'quote.form.title': 'Request a Quote',
  'quote.form.subtitle': "Fill in your details and we'll get back to you within 24 hours.",
  'quote.form.fullName': 'Full Name',
  'quote.form.fullNamePlaceholder': 'John Smith',
  'quote.form.email': 'Email',
  'quote.form.emailPlaceholder': 'john@company.com',
  'quote.form.phone': 'Phone',
  'quote.form.phonePlaceholder': '+1 (555) 000-0000',
  'quote.form.company': 'Company',
  'quote.form.companyPlaceholder': 'Company name',
  'quote.form.product': 'Product',
  'quote.form.selectProduct': 'Select a product',
  'quote.form.productOther': 'Other / Custom',
  'quote.form.productCeramic': 'Ceramic Frit Glass (Enameled)',
  'quote.form.quantity': 'Estimated Quantity',
  'quote.form.quantityPlaceholder': 'e.g. 500 sqm, 200 panels',
  'quote.form.message': 'Additional Details',
  'quote.form.messagePlaceholder': 'Specifications, sizes, project details...',
  'quote.form.submit': 'Get Your Free Quote',
  'quote.form.submitting': 'Sending...',
  'quote.form.responseTime': 'We typically respond within 24 hours on business days.',
  'quote.form.error.generic': 'Something went wrong. Please try again.',
  'quote.form.error.submission': 'Submission failed',
  'quote.form.closeAria': 'Close',

  // ─── Blog listing + BlogCard ────────────────────────────────────────
  'blog.pillarGuide': '✦ Pillar Guide',
  'blog.featured': 'Featured',
  'blog.min': 'min',
  'blog.minRead': 'min read',
  'blog.hero.title': 'Insights & Resources',
  'blog.hero.subtitle':
    'Technical guides, industry analysis, and practical knowledge from 15+ years in architectural glass manufacturing.',
  'blog.allTab': 'All',
  'blog.emptyTitle': 'Articles coming soon',
  'blog.emptyBody':
    "We're preparing in-depth technical guides and industry insights. Check back shortly for new publications.",
  'blog.emptyInCluster': 'No articles in {cluster} yet',
  'blog.viewAll': '← View all articles',

  // ─── Topic clusters (BlogCard badge + ClusterTabs labels) ───────────
  'cluster.comparison': 'Glass Comparisons',
  'cluster.technical': 'Technical Guides',
  'cluster.application': 'Applications',
  'cluster.buyer-guide': "Buyer's Guide",
  'cluster.product': 'Product Deep Dives',

  // ─── Article categories (BlogCard badge) ────────────────────────────
  'category.Technical Guide': 'Technical Guide',
  'category.Industry News': 'Industry News',
  'category.Product Knowledge': 'Product Knowledge',
  'category.Project Case Study': 'Case Study',
  'category.Buyer Guide': "Buyer's Guide",
  'category.Manufacturing': 'Manufacturing',
};

const es: Dict = {
  // ─── Navigation ─────────────────────────────────────────────────────
  'nav.home': 'Inicio',
  'nav.about': 'Nosotros',
  'nav.products': 'Productos',
  'nav.projects': 'Proyectos',
  'nav.equipment': 'Equipamiento',
  'nav.blog': 'Blog',
  'nav.contact': 'Contacto',
  'nav.requestQuote': 'Solicitar Presupuesto',
  'nav.certifications': 'Certificaciones',
  'nav.search': 'Buscar',
  'nav.toggleNav': 'Alternar navegación',
  'nav.ourGlassProducts': 'Nuestros productos de vidrio',
  'nav.viewAllProducts': 'Ver todos los productos →',

  // ─── Products ───────────────────────────────────────────────────────
  'product.tempered.name': 'Vidrio templado',
  'product.tempered.desc': '4-5× más resistente, fragmentación segura',
  'product.insulated.name': 'Vidrio aislante',
  'product.insulated.desc': 'Aislamiento térmico y acústico',
  'product.laminated.name': 'Vidrio laminado',
  'product.laminated.desc': 'Interlámina PVB resistente a impactos',
  'product.enameled.name': 'Vidrio esmaltado',
  'product.enameled.desc': 'Acabado decorativo con esmalte cerámico',
  'product.lowE.name': 'Vidrio bajo emisivo (Low-E)',
  'product.lowE.desc': 'Recubrimiento de bajo consumo energético',
  'product.curvedTempered.name': 'Vidrio templado curvo',
  'product.curvedTempered.desc': 'Curvatura mono-axial, Rₘᵢₙ 500mm en 6mm',

  // ─── Footer ─────────────────────────────────────────────────────────
  'footer.productsHeader': 'Productos',
  'footer.companyHeader': 'Empresa',
  'footer.contactHeader': 'Contacto',
  'footer.aboutUs': 'Sobre nosotros',
  'footer.wuhanFactory': 'Fábrica de Wuhan',
  'footer.honghuFactory': 'Fábrica de Honghu',
  'footer.wuhanAddress': 'Parque Industrial Wujin, Distrito de Hannan',
  'footer.honghuAddress': 'Parque Industrial de Xintan, Honghu',
  'footer.companyDesc':
    'Fabricante de vidrio arquitectónico en China con más de 15 años de experiencia. Vidrio templado, aislante, laminado y esmaltado a medida para proyectos de construcción a nivel mundial.',
  'footer.allRightsReserved': 'Todos los derechos reservados.',

  // ─── Quote Modal ────────────────────────────────────────────────────
  'quote.success.title': '¡Solicitud de presupuesto enviada!',
  'quote.success.body':
    'Gracias por su interés. Nuestro equipo revisará sus requisitos y le responderá en un plazo de 24 horas.',
  'quote.success.close': 'Cerrar',
  'quote.form.title': 'Solicitar un presupuesto',
  'quote.form.subtitle': 'Complete sus datos y le responderemos en un plazo de 24 horas.',
  'quote.form.fullName': 'Nombre completo',
  'quote.form.fullNamePlaceholder': 'Juan Pérez',
  'quote.form.email': 'Correo electrónico',
  'quote.form.emailPlaceholder': 'juan@empresa.com',
  'quote.form.phone': 'Teléfono',
  'quote.form.phonePlaceholder': '+34 600 000 000',
  'quote.form.company': 'Empresa',
  'quote.form.companyPlaceholder': 'Nombre de la empresa',
  'quote.form.product': 'Producto',
  'quote.form.selectProduct': 'Seleccione un producto',
  'quote.form.productOther': 'Otro / Personalizado',
  'quote.form.productCeramic': 'Vidrio con esmalte cerámico (esmaltado)',
  'quote.form.quantity': 'Cantidad estimada',
  'quote.form.quantityPlaceholder': 'ej. 500 m², 200 paneles',
  'quote.form.message': 'Detalles adicionales',
  'quote.form.messagePlaceholder': 'Especificaciones, tamaños, detalles del proyecto...',
  'quote.form.submit': 'Obtenga su presupuesto gratuito',
  'quote.form.submitting': 'Enviando...',
  'quote.form.responseTime': 'Normalmente respondemos en 24 horas en días laborables.',
  'quote.form.error.generic': 'Algo salió mal. Por favor, inténtelo de nuevo.',
  'quote.form.error.submission': 'Error al enviar',
  'quote.form.closeAria': 'Cerrar',

  // ─── Blog listing + BlogCard ────────────────────────────────────────
  'blog.pillarGuide': '✦ Guía Pilar',
  'blog.featured': 'Destacado',
  'blog.min': 'min',
  'blog.minRead': 'min de lectura',
  'blog.hero.title': 'Perspectivas y Recursos',
  'blog.hero.subtitle':
    'Guías técnicas, análisis del sector y conocimiento práctico de más de 15 años en fabricación de vidrio arquitectónico.',
  'blog.allTab': 'Todos',
  'blog.emptyTitle': 'Próximamente artículos',
  'blog.emptyBody':
    'Estamos preparando guías técnicas detalladas y análisis del sector. Vuelva pronto para nuevas publicaciones.',
  'blog.emptyInCluster': 'Aún no hay artículos en {cluster}',
  'blog.viewAll': '← Ver todos los artículos',

  // ─── Clusters ───────────────────────────────────────────────────────
  'cluster.comparison': 'Comparaciones de vidrio',
  'cluster.technical': 'Guías técnicas',
  'cluster.application': 'Aplicaciones',
  'cluster.buyer-guide': 'Guía del comprador',
  'cluster.product': 'Análisis de productos',

  // ─── Categories ─────────────────────────────────────────────────────
  'category.Technical Guide': 'Guía técnica',
  'category.Industry News': 'Noticias del sector',
  'category.Product Knowledge': 'Conocimiento del producto',
  'category.Project Case Study': 'Caso de estudio',
  'category.Buyer Guide': 'Guía del comprador',
  'category.Manufacturing': 'Fabricación',
};

export const DICT: Record<Locale, Dict> = { en, es };

/**
 * Look up a translated string by key. Falls back to EN, then to the key itself.
 * Interpolate variables with {name} placeholders:
 *   translate('blog.emptyInCluster', 'es', { cluster: 'Comparaciones' })
 */
export function translate(
  key: string,
  locale: Locale,
  vars?: Record<string, string>,
): string {
  let s = DICT[locale]?.[key] ?? DICT.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return s;
}
