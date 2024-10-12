/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Noto Sans", "sans-serif"],
        playwrite: ["Allura", "cursive"],
      },
    },
  },
  plugins: [],
};
