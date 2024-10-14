const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: { cardOverlay: "rgba(256,256,256,0.4)" } },
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
      MontserratLight: ["MontserratLight", "sans-serif"],
      MontserratMedium: ["MontserratMedium", "sans-serif"],
      MontserratBold: ["MontserratBold", "sans-serif"],
      UniRegular: ["UniRegular", "sans-serif"],
      UniBold: ["UniBold", "sans-serif"],
      UniBook: ["UniBook", "sans-serif"],
      UniHeavy: ["UniHeavy", "sans-serif"],
    },
  },
  plugins: [],
});
