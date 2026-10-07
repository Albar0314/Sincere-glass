interface Crumb {
  name: string;
  url: string;
}

interface Props {
  crumbs: Crumb[];
  siteUrl?: string;
}

/**
 * Renders a BreadcrumbList JSON-LD block as a <script> tag.
 * Also optionally renders a visible breadcrumb trail — call <BreadcrumbTrail />
 * separately if you want visible breadcrumbs; this component is JSON-LD only.
 */
export default function BreadcrumbSchema({ crumbs, siteUrl = 'https://sincereglass.com' }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${siteUrl}${c.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Visible breadcrumb trail, same source. Use alongside the schema for best SEO. */
export function BreadcrumbTrail({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-2 flex-wrap list-none p-0 m-0">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[#DAA745]">{c.name}</span>
              ) : (
                <a href={c.url} className="text-[#8B95A5] hover:text-[#DAA745] transition-colors">
                  {c.name}
                </a>
              )}
              {!isLast && <span className="text-[#8B95A5]/40">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
