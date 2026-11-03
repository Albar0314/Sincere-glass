// Manually maintained video registry for the equipment gallery.
// Separate from equipment-gallery.ts (which is auto-generated from
// public/images/equipment-raw/ by edit/prepare-equipment-images.mjs);
// keep video data here so photo regeneration never clobbers it.
//
// `key` MUST match an EquipmentCategory.key in equipment-gallery.ts.
// A category with no entry here renders photos-only (no Video tab).

export interface EquipmentVideo {
  key: string;
  videoId: string;
  title: string;
  description: string;
  uploadDate: string; // YYYY-MM-DD, YouTube publish date
  deepLink: string; // Primary product/page this equipment produces
}

export const EQUIPMENT_VIDEOS: EquipmentVideo[] = [
  {
    key: "tempering",
    videoId: "expE_icthfo",
    title: "Tempering Furnace in Operation",
    description:
      "Oversized tempering furnace at Sincere Glass processing architectural panels up to 3.3 m x 15 m. Automated loading, heating above softening point, controlled high-velocity air quenching.",
    uploadDate: "2026-11-03",
    deepLink: "/products/tempered-glass",
  },
  {
    key: "cutting",
    videoId: "YLkfJbK1XpA",
    title: "Automated Glass Cutting Line",
    description:
      "CNC-optimised cutting line at Sincere Glass. Automatic scoring and breakout with nesting software; tolerance held at plus-minus 1 mm.",
    uploadDate: "2026-11-03",
    deepLink: "/products",
  },
  {
    key: "edging",
    videoId: "1XwGWynxkJE",
    title: "Glass Edge Grinding Line",
    description:
      "Straight-line edger at Sincere Glass producing ground, flat-polished, pencil-polished and beveled edge finishes. Edge quality is the single largest factor in tempered-glass in-furnace breakage.",
    uploadDate: "2026-11-03",
    deepLink: "/products",
  },
  {
    key: "laminating",
    videoId: "inNYYEAnWOo",
    title: "Laminated Glass High-Pressure Autoclave",
    description:
      "High-pressure autoclave at Sincere Glass processing PVB and SGP interlayer laminated glass at 140 C and 12 bar. Jumbo autoclave capacity 3.3 m x 15 m.",
    uploadDate: "2026-11-03",
    deepLink: "/products/laminated-glass",
  },
  {
    key: "insulating",
    videoId: "qcSV4WG8nL0",
    title: "Insulated Glass (IGU) Production Line",
    description:
      "Dual-seal IGU assembly line at Sincere Glass with automated spacer bending, desiccant filling, and argon gas injection at 90 percent plus fill rate consistency.",
    uploadDate: "2026-11-03",
    deepLink: "/products/insulated-glass",
  },
  // enameling: no video asset yet
];

export function getEquipmentVideo(key: string): EquipmentVideo | undefined {
  return EQUIPMENT_VIDEOS.find((v) => v.key === key);
}
