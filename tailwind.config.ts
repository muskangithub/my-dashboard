import type { Config } from "tailwindcss";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // if using App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
