// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration
module.exports = {
  content: [
    './js/**/*.js',
    '../lib/*_web.ex',
    '../lib/*_web/**/*.*ex'
  ],
  theme: {
    fontFamily: {
      'roboto': ['roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#EF0044'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
