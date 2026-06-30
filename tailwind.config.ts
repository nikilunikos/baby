import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ivory: "#f8f1e4",
        linen: "#efe1cf",
        ink: "#2f261f",
        cocoa: "#6e4f40",
        wine: "#8c3146",
        moss: "#5c7554",
        saffron: "#bd8133",
        porcelain: "#fffaf1"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(83, 53, 33, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
