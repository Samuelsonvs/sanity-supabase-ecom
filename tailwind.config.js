const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#181813",
      secondary: "#ffb338",
      tertiary: "#f2f2f2",
      input: "#292929",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#181813",
      secondary: "#ffb338",
      tertiary: "#f2f2f2",
    }),
    extend: {
      screens: {
        "3xl": "1920px",
      },
      height: {
        ...defaultTheme.height,
        120: "1070px",
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              marginBottom: 0,
              marginTop: 0
            },
            h3: {
              marginBottom: 0,
              marginTop: 0
            },
            a: {
              textDecoration: 'none'
            },
            figure: {
              marginBottom: 0
            },
            ul: {
              listStyleType: 'none',
              li: {
                paddingLeft: 0,
                '&:before': {
                  backgroundColor: 'transparent',
                  width: 0,
                  heigh: 0,
                  top: 0,
                  left: 0
                }
              }
            },
          }
        },
        'lg': {
          css: {
            ul: {
              listStyleType: 'none',
              li: {
                paddingLeft: 0,
                '&:before': {
                  backgroundColor: 'transparent',
                  width: 0,
                  heigh: 0,
                  top: 0,
                  left: 0
                }
              }
            },
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
