import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sincere Glass — Professional Glass Manufacturer",
    template: "%s | Sincere Glass",
  },
  description:
    "Professional glass manufacturer with 15+ years of experience. Tempered, insulated, laminated, and Low-E glass for global B2B buyers.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
