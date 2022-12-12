/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    logs: false,
  },
  plugins: [require("daisyui")],
}
