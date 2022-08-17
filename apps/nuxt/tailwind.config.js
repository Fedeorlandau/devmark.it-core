/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js, vue, ts}",
    "./layouts/**/*.{js, vue, ts}",
    "./pages/**/*.vue",
    "./plugins/**/*.{js, vue, ts}",
    "./nuxt.config.{js, ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
