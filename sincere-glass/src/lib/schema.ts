const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";

/**
 * Organization schema — 公司信息，让 Google 认识这家公司
 * 可能在搜索结果右侧显示知识面板（Knowledge Panel）
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Sincere Glass",
    alternateName: [
      "\u6b23\u57ce\u73bb\u7483",
      "\u6b66\u6c49\u6b23\u57ce\u73bb\u7483",
      "\u6e56\u5317\u6b23\u4e4b\u57ce\u73bb\u7483",
    ],
    url: SITE,
    logo: `${SITE}/images/logo.png`,
    image: `${SITE}/images/logo.png`,
    description:
      "Architectural glass manufacturer in China specializing in tempered, insulated, laminated, enameled and Low-E glass. Two factories, 20,000 m\u00b2, 3C certified, exporting worldwide.",
    foundingDate: "2010",
    industry: "Architectural Glass Manufacturing",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Wujin Industrial Park, Hannan District",
        addressLocality: "Wuhan",
        addressRegion: "Hubei",
        addressCountry: "CN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Xintan Town Industrial Park",
        addressLocality: "Honghu",
        addressRegion: "Hubei",
        addressCountry: "CN",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: "xcglass@sina.cn",
        availableLanguage: ["English", "Chinese"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: "1348767121@qq.com",
        availableLanguage: ["Chinese"],
        areaServed: "CN",
      },
    ],
    sameAs: [
      "https://www.youtube.com/@XinchenGlass",
      "https://www.facebook.com/people/SincereGlass/61594988708395/",
      "https://www.linkedin.com/in/%E5%9F%8E-%E6%9D%8E-3136a7441/",
    ],
    knowsAbout: [
      "Tempered Glass",
      "Insulated Glass",
      "Laminated Glass",
      "Enameled Glass",
      "Low-E Glass",
      "Architectural Glazing",
      "Curtain Wall Glass",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "China Compulsory Certification (3C/CCC)",
    },
  };
}

/**
 * WebSite schema — 让 Google 可能在搜索结果中显示站内搜索框
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Sincere Glass",
    description: "Architectural glass manufacturer in China",
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en",
  };
}
