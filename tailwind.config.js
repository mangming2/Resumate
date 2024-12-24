
import defaultTheme from "tailwindcss/defaultTheme";

import plugin from "tailwindcss/plugin";

const spacing = [...[...Array(1001).keys()]];

const convertSpacing = (spacing) =>
  [...new Set(spacing)].reduce((res, space) => {
    res[space] = `${space}px`;
    return res;
  }, {});
const convertSpacingWithoutPx = (spacing) =>
  [...new Set(spacing)].reduce((res, space) => {
    res[space] = `${space}`;
    return res;
  }, {});

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "0px",
      md: "768px",
      lg: "1280px",
    },

    extend: {
      colors: {
        ...defaultTheme.colors,

        white: "#ffffff",

        black: "#111111",

        gray: {
          100: "#E7E7E7",
          200: "#CFCFCF",
        
          400: "#A0A0A0",
          500: "#888888",
      
          700: "#585858",
          800: "#414141",
          900: "#292929",
        },

        orange: "#FF5E00",
        green: "#59BC12",
        yellow: "#F3A216",
        red: "#FF5454",
        blue: "#3476E6",
        divider: "#EBEBED",
        border: "#F4F4F5",
      },

      fontFamily: {
        sans: ["Spoqa Han Sans Neo", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        ...convertSpacing([...Array(101).keys()]),
      },

      fontWeight: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },

      spacing: {
        ...defaultTheme.spacing,
        ...convertSpacing(spacing),
      },

      width: (theme) => ({ ...defaultTheme.width, ...theme("spacing") }),
      height: (theme) => ({ ...defaultTheme.height, ...theme("spacing") }),
      minWidth: (theme) => ({ ...defaultTheme.minWidth, ...theme("spacing") }),
      maxWidth: (theme) => ({ ...defaultTheme.maxWidth, ...theme("spacing") }),

      minHeight: (theme) => ({
        ...defaultTheme.minHeight,
        ...theme("spacing"),
      }),
      maxHeight: (theme) => ({
        ...defaultTheme.maxHeight,
        ...theme("spacing"),
      }),

      lineHeight: (theme) => ({
        ...defaultTheme.lineHeight,
        ...convertSpacing([...Array(101).keys()]),
      }),

      borderRadius: (theme) => ({
        ...defaultTheme.lineHeight,
        ...convertSpacing([...Array(101).keys()]),
      }),
      borderWidth: (theme) => ({
        ...defaultTheme.borderWidth,
        ...convertSpacing([...Array(21).keys()]),
      }),

      animation: (theme) => ({
        ...defaultTheme.animation,
      }),
      keyframes: (theme) => ({
        ...defaultTheme.keyframes,
      }),

      boxShadow: (theme) => ({
        ...defaultTheme.boxShadow,
      }),

      zIndex: (theme) => ({
        ...defaultTheme.zIndex,
        ...convertSpacingWithoutPx([...Array(101).keys()]),
      }),
    },
  },
  truncate: {
    lines: { 2: "2", 3: "3", 4: "4" },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled", "active"],
      borderColor: ["disabled", "active"],
      textColor: ["disabled", "active"],
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".absolute-center": {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        ".absolute-center-x": {
          left: "50%",
          transform: "translateX(-50%)",
        },
        ".absolute-center-y": {
          top: "50%",
          transform: "translateY(-50%)",
        },

        ".clickable": {
          cursor: "pointer",
        },
        ".non-clickable": {
          cursor: "not-allowed",
          userSelect: "none",
        },

        ".transition-color": {
          transitionProperty: "background-color,border-color,color,fill,stroke",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "150ms",
        },

        "text-gradient-blue-left": {
          background: "linear-gradient(180deg, #A9DFFC 0%, #A9DFFC 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },

        ".font-10-r": {
          fontSize: "10px",
          lineHeight: "15px",
          fontWeight: 400,
        },
        ".font-10-m": {
          fontSize: "10px",
          lineHeight: "15px",
          fontWeight: 500,
        },
        ".font-10-sb": {
          fontSize: "10px",
          lineHeight: "15px",
          fontWeight: 600,
        },
        ".font-12-r": {
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: 400,
        },
        ".font-12-m": {
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: 500,
        },
        ".font-12-sb": {
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: 600,
        },
        ".font-14-r": {
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: 400,
        },
        ".font-14-m": {
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: 500,
        },
        ".font-14-sb": {
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: 600,
        },
        ".font-16-r": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 400,
        },
        ".font-16-m": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 500,
        },
        ".font-16-sb": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 600,
        },
        ".font-18-r": {
          fontSize: "18px",
          lineHeight: "27px",
          fontWeight: 400,
        },
        ".font-18-m": {
          fontSize: "18px",
          lineHeight: "27px",
          fontWeight: 500,
        },
        ".font-18-sb": {
          fontSize: "18px",
          lineHeight: "27px",
          fontWeight: 600,
        },
        ".font-20-r": {
          fontSize: "20px",
          lineHeight: "30px",
          fontWeight: 400,
        },
        ".font-20-m": {
          fontSize: "20px",
          lineHeight: "30px",
          fontWeight: 500,
        },
        ".font-20-sb": {
          fontSize: "20px",
          lineHeight: "30px",
          fontWeight: 600,
        },
        ".font-22-r": {
          fontSize: "22px",
          lineHeight: "33px",
          fontWeight: 400,
        },
        ".font-22-m": {
          fontSize: "22px",
          lineHeight: "33px",
          fontWeight: 500,
        },
        ".font-22-sb": {
          fontSize: "22px",
          lineHeight: "33px",
          fontWeight: 600,
        },
        ".font-26-sb": {
          fontSize: "26px",
          lineHeight: "39px",
          fontWeight: 600,
        },
      });

      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
