import { Metadata } from "next";
import EquipmentClient from "@/_i18n/es/components/equipment/EquipmentClient";
export const metadata: Metadata = {
  title: "Equipamiento y Capacidades de Fábrica — Tour Virtual | Sincere Glass",
  description: "Recorra nuestras dos fábricas: 4 líneas de corte CNC, 4 líneas de pulido de bordes, 2 hornos de templado (3m×15m), 2 líneas de vidrio aislante, 2 autoclaves. Conozca nuestras capacidades de producción.",
  openGraph: {
    title: "Equipamiento y Capacidades de Producción | Sincere Glass",
    description: "Equipamiento completo de procesamiento de vidrio en 20,000㎡. Corte CNC, pulido de bordes, templado, ensamblaje de UVA (Unidad de Vidrio Aislante), laminado y esmaltado.",
    url: "https://sincereglass.com/equipment"
  }
};
export default function EquipmentPage() {
  return <EquipmentClient />;
}