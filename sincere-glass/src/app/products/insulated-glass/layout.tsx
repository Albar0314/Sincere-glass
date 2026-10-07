import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Insulated Glass Manufacturer China — Double & Triple Glazing | Sincere Glass",
  description: "Custom insulated glass units (IGUs) from China. Argon gas fill, Low-E coating options, spacers from 6-20mm. 1.5× wind resistance, 3C certified. Factory-direct pricing.",
  openGraph: {
    title: "Insulated Glass (IGU) Manufacturer — Sincere Glass",
    description: "Energy-efficient insulated glass units with automated argon filling. Double-sealed, 3C certified.",
    url: "https://sincereglass.com/products/insulated-glass",
    images: [{ url: "https://sincereglass.com/images/products/insulated.jpg" }],
  },
};

export default function InsulatedGlassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
