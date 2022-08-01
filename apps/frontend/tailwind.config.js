/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "460px",
        xss: "300px",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#131517",
          "primary-content": "#fff",

          secondary: "#de3163",
          "secondary-content": "#fff",

          accent: "#3a86ff",
          "accent-content": "#fff",

          neutral: "#191D24",
          "neutral-content": "#fff",
          "neutral-dark": "131517",

          "base-100": "#f9f7ef",
          "base-200": "#FAC5FA",
          // "base-300": "#FFB7FF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
};
