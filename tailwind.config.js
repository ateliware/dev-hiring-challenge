module.exports = {
  purge: {
    content: ["./app/**/*.html.erb"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#fef6eb",
          200: "#f7c686",
          300: "#f4b35d",
          400: "#f2aa49",
          500: "#f1a035",
          600: "#d99030",
          700: "#c1802a",
          800: "#a97025",
          900: "#916020",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
