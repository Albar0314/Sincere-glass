import { Metadata } from "next";
import EquipmentClient from "@/components/equipment/EquipmentClient";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Factory Equipment & Capabilities — Virtual Tour | Sincere Glass",
  description: "Tour our two factories: 4 CNC cutting lines, 4 edge polishing lines, 2 tempering furnaces (3m×15m), 2 insulated glass lines, 2 autoclaves. See our production capabilities.",
  openGraph: {
    title: "Equipment & Production Capabilities | Sincere Glass",
    description: "Complete glass processing equipment across 20,000㎡. CNC cutting, edge polishing, tempering, IGU assembly, laminating, enameling.",
    url: "https://sincereglass.com/equipment"
  },
  alternates: makeAlternates("/equipment")
};
export default function EquipmentPage() {
  return <EquipmentClient />;
}