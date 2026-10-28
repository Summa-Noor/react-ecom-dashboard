/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: { brand: { 500: "#465fff", 600: "#3641f5" }, ink: { 800: "#1c2434", 900: "#111827" } },
      fontFamily: { sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
