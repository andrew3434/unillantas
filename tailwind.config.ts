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
          red: "#EC0127",
          "red-light": "#F42736",
          "red-dark": "#9A1522",
        },
        surface: {
          dark: "#1E1E1E",
          card: "#2A2A2A",
          elevated: "#363636",
          border: "#3A3A3A",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "Impact", "sans-serif"],
        mono: ["var(--font-montserrat)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        display: "0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
