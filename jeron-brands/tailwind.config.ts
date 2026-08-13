import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // Warm paper/ink/coral/forest — deliberately distinct from TapCard's
        // dark violet/cyan SaaS palette. See frontend-design notes in README.
        paper: "#F7F4EC",
        surface: "#FFFFFF",
        "surface-warm": "#FCFAF4",
        ink: "#1A1815",
        "ink-muted": "#6B6558",
        "ink-faint": "#A39C8C",
        line: "#E7E1D3",
        "line-strong": "#D6CEBA",
        coral: {
          DEFAULT: "#FF4A32",
          foreground: "#FFFFFF",
        },
        forest: {
          DEFAULT: "#1F3D2E",
          foreground: "#F7F4EC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 0 rgba(26,24,21,0.04), 0 16px 40px -20px rgba(26,24,21,0.18)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 14s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
