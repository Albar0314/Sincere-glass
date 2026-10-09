import { Metadata } from "next";
import ContactClient from "@/_i18n/es/components/contact/ContactClient";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Contáctenos — Obtenga Cotización en 24 Horas | Sincere Glass",
  description: "Contacte a Sincere Glass para cotizaciones de vidrio arquitectónico a medida. Dos fábricas en Hubei, China. WhatsApp, correo electrónico, teléfono — respondemos en 24 horas.",
  openGraph: {
    title: "Contáctenos — Sincere Glass",
    description: "Obtenga una cotización gratuita en 24 horas. Dos fábricas en Wuhan y Honghu, Hubei.",
    url: "https://sincereglass.com/contact"
  },
  alternates: makeAlternates("/contact", "es")
};
export default function ContactPage() {
  return <ContactClient />;
}