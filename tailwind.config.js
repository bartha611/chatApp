module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        dashboard: "92%",
        navigation: "8%",
      }),
      width: (theme) => ({
        dashboard: "calc(100% - 288px)",
      }),
    },
  },
  variants: {
    extend: {
      appearance: ["responsive", "group-hover"],
      display: ["responsive", "group-hover"],
    },
  },
  plugins: [],
};
