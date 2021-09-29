module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#181813",
      secondary: "#ffb338",
      tertiary: "#f2f2f2",
      input: "#292929"
    }),
    textColor: (theme) =>  ({
      ...theme("colors"),
      'primary': "#181813",
      'secondary': "#ffb338",
      'tertiary': "#f2f2f2",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
