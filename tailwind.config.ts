import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E30613",
          "red-dark": "#B30510",
          "red-light": "#FF1F2E",
        },
        surface: {
          dark: "#0A0A0A",
          card: "#1A1A1A",
          elevated: "#242424",
          border: "#2E2E2E",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        display: "0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
