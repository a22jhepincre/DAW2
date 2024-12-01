/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: "#4E4A4B", // Una variante más clara de #231F20
          DEFAULT: "#231F20", // Color principal
          dark: "#0F0D0E", // Una variante más oscura de #231F20
        },
      },
    },
  },
  plugins: [],
};
