import { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote Within 24 Hours | Sincere Glass",
  description: "Contact Sincere Glass for custom architectural glass quotes. Two factories in Hubei, China. WhatsApp, email, phone — we respond within 24 hours.",
  openGraph: {
    title: "Contact Sincere Glass",
    description: "Get a free quote within 24 hours. Two factories in Wuhan and Honghu, Hubei.",
    url: "https://sincereglass.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
