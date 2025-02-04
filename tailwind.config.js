/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // For components directory
    "./app/**/*.{js,ts,jsx,tsx}", // If you're using the app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
