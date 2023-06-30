/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "palepink": {
          "50": "#ffffff",
          "100": "#ffffff",
          "200": "#fffffd",
          "300": "#fffff3",
          "400": "#fff5e9",
          "500": "#f9ebdf",
          "600": "#efe1d5",
          "700": "#e5d7cb",
          "800": "#dbcdc1",
          "900": "#d1c3b7"
        },
        "palered": {
          "50": "#ffffff",
          "100": "#fffffe",
          "200": "#fff6f4",
          "300": "#ffecea",
          "400": "#ffe2e0",
          "500": "#f9d8d6",
          "600": "#efcecc",
          "700": "#e5c4c2",
          "800": "#dbbab8",
          "900": "#d1b0ae"
        },
        "palepurple": {
          "50": "#ffffff",
          "100": "#fef5ff",
          "200": "#f4ebff",
          "300": "#eae1fe",
          "400": "#e0d7f4",
          "500": "#d6cdea",
          "600": "#ccc3e0",
          "700": "#c2b9d6",
          "800": "#b8afcc",
          "900": "#aea5c2"
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
