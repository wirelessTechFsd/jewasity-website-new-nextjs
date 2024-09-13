/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ["DM Sans"],
      },
      colors: {
        primary: "#FF3C00",
        secondary: "#560404",
        "white-1": "#F2F2F2",
        "white-2": "#FCFCFC",
        grey: "#37475B",
        "grey-dark": "#37475B",
      },
    },
    screens: {
      xs: { min: "320px", max: "640px" },
      sm: { min: "640px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "767px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1023px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1279px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
