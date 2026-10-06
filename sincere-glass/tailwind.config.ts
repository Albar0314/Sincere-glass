import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Smoke Glass B3 — Soft Amber
          dark: "#1C1F26",
          primary: "#3A4250",
          secondary: "#8B95A5",
          accent: "#DAA745",
          "accent-hover": "#C4963D",
          light: "#F2F0ED",
          lighter: "#FAFAF8",
          muted: "#6B7280",
          // Legacy aliases
          navy: "#1C1F26",
          sky: "#8B95A5",
          glass: "#F2F0ED",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
