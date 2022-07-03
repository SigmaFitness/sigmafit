/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
 

  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#131517",
          "primary-content": "#fff",

          "secondary": "#de3163",

          "accent": "#1FB2A6",

          "neutral": "#191D24",
          "neutral-content": "#fff",
          "neutral-dark": "131517",

          "base-100": "#f9f7ef",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#FBBD23",

          "error": "#F87272",
        },
      },
    ],
  },
}
