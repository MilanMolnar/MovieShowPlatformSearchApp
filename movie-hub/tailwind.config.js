/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rollDown: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "440px", opacity: "1" },
        },
        rollUp: {
          "0%": { maxHeight: "440px", opacity: "1" },
          "100%": { maxHeight: "0", opacity: "0" },
        },
      },
      animation: {
        rollDown: "rollDown 0.25s ease-out forwards",
        rollUp: "rollUp 0.25s ease-out forwards",
      },
      backdropBlur: {
        none: "0",
        blur: "blur(20px)",
        lg: "blur(40px)",
      },
      screens: {
        lm: "1450px", // Between md and lg
      },
    },
  },
  variants: {
    scrollbar: ["dark"],
  },
  plugins: [tailwindScrollbar()],
};