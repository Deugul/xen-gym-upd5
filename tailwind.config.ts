import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#0A0A0A",
          100: "#0A0A0A",
          200: "#161616",
          DEFAULT: "#0A0A0A",
        },
        forest: {
          50: "#FBF5E6",
          100: "#F0D99A",
          200: "#E0BA5F",
          300: "#D4A843",
          DEFAULT: "#C4963A",
          700: "#9B7220",
          900: "#6B4F10",
        },
        bark: "#7C5C10",
        sand: "#0A0A0A",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
