import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Sincere Glass brand palette
        brand: {
          navy: "#0C2340",     // primary — trust, professionalism
          steel: "#4A6274",    // secondary text
          sky: "#5B9BD5",      // accent — links, CTAs
          glass: "#E8F0F8",    // light tint — backgrounds
          warm: "#D4A857",     // gold accent — premium feel
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
