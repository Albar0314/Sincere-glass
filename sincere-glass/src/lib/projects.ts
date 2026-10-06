export interface Project {
  name: string;
  location: string;
  category: string;
  glassTypes: string[];
  image: string;
  description: string;
  featured?: boolean;
}

export const projectCategories = [
  "All",
  "Transportation",
  "Commercial",
  "Residential",
  "Public",
  "Cultural",
];

export const projects: Project[] = [
  {
    name: "Wuhan Railway Station",
    location: "Wuhan, Hubei",
    category: "Transportation",
    glassTypes: ["Insulated Glass", "Tempered Glass"],
    image: "/images/cases/wuhan-station.jpg",
    description: "One of China's four major high-speed rail hubs. We supplied large-format insulated glass for the iconic arched roof structure and main hall facades.",
    featured: true,
  },
  {
    name: "Tianhe Airport T3 Terminal",
    location: "Wuhan, Hubei",
    category: "Transportation",
    glassTypes: ["Tempered Glass", "Laminated Glass"],
    image: "/images/cases/tianhe-t3.jpg",
    description: "Wuhan's newest international terminal. Our tempered and laminated glass was used for the terminal curtain wall and overhead canopy glazing.",
    featured: true,
  },
  {
    name: "Wuhan International Expo Center",
    location: "Wuhan, Hubei",
    category: "Cultural",
    glassTypes: ["Insulated Glass", "Low-E Glass"],
    image: "/images/cases/guobo.jpg",
    description: "A landmark exhibition venue on the Yangtze River waterfront. Low-E insulated glass provides energy efficiency across the massive facade area.",
    featured: true,
  },
  {
    name: "Haier International Plaza",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Low-E Glass", "Insulated Glass"],
    image: "/images/cases/haier.jpg",
    description: "A Grade-A commercial tower in Wuhan's CBD. Full curtain wall glazing with high-performance Low-E insulated glass units.",
  },
  {
    name: "Country Garden Phoenix City",
    location: "Wuhan, Hubei",
    category: "Residential",
    glassTypes: ["Tempered Glass"],
    image: "/images/cases/biguiyuan.jpg",
    description: "Large-scale residential development by one of China's top developers. Tempered glass supplied for windows, balustrades, and common areas.",
  },
  {
    name: "Jiangxia People's Hospital",
    location: "Wuhan, Hubei",
    category: "Public",
    glassTypes: ["Insulated Glass", "Tempered Glass"],
    image: "/images/cases/jiangxia-hospital.jpg",
    description: "A major district hospital serving over 1 million residents. Energy-efficient insulated glass for patient rooms and public areas.",
  },
  {
    name: "Optics Valley World City",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Enameled Glass", "Insulated Glass"],
    image: "/images/cases/guanggu.jpg",
    description: "A mixed-use commercial complex in Wuhan's tech corridor. Enameled glass spandrel panels create the distinctive facade pattern.",
  },
  {
    name: "Poly Military Games Village",
    location: "Wuhan, Hubei",
    category: "Residential",
    glassTypes: ["Laminated Glass", "Tempered Glass"],
    image: "/images/cases/baoli.jpg",
    description: "Built for the 2019 CISM Military World Games. Laminated and tempered glass for athlete residences and public facilities.",
    featured: true,
  },
  {
    name: "Wanjin International Plaza",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Tempered Glass", "Low-E Glass"],
    image: "/images/cases/haier.jpg",
    description: "A commercial high-rise with full-height glazed facade. Tempered Low-E glass maximizes views while controlling solar heat gain.",
  },
  {
    name: "Caidian Citizen's Home",
    location: "Wuhan, Hubei",
    category: "Public",
    glassTypes: ["Enameled Glass", "Tempered Glass"],
    image: "/images/cases/guanggu.jpg",
    description: "Government service center with a distinctive red enameled glass facade. Custom ceramic frit color matched to the city's branding.",
  },
  {
    name: "Aoshan Century City",
    location: "Wuhan, Hubei",
    category: "Commercial",
    glassTypes: ["Insulated Glass", "Tempered Glass"],
    image: "/images/cases/biguiyuan.jpg",
    description: "Mixed-use tower complex combining retail and office space. Insulated glass curtain wall with thermal break framing.",
  },
  {
    name: "Xi'an Sky City",
    location: "Xi'an, Shaanxi",
    category: "Residential",
    glassTypes: ["Low-E Glass", "Insulated Glass"],
    image: "/images/cases/baoli.jpg",
    description: "Our first project outside Hubei province. Low-E insulated glass for a premium residential tower, demonstrating our growing national reach.",
  },
];
