/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
  plugins: [require("tailwind-scrollbar")()],
};
