import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#F9F5EE",
          200: "#F2EBD9",
          DEFAULT: "#F5F0E8",
        },
        forest: {
          50: "#EAF0ED",
          100: "#C4D5CC",
          200: "#8FADA1",
          300: "#5A8574",
          DEFAULT: "#2D4A3E",
          700: "#1F3329",
          900: "#0F1A15",
        },
        bark: "#8B7355",
        sand: "#E8E0D0",
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
