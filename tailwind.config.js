module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        120: "32rem",
        128: "40rem",
        132: "44rem",
        136: "48rem",
        144: "56rem",
        156: "64rem",
      },
      fontFamily: {
        sans: ["Limelight", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      screens: {
        xs: { max: 740 },
      },
    },
  },
  plugins: [],
};
