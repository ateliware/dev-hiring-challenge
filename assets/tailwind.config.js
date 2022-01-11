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
      'poppins': ['poppins', 'sans-serif'],
    },
    extend: {
      boxShadow: {'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)'},
      colors: {
        'primary': '#EF0044',
        'dimmed': 'rgba(0,0,0,0.4);'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
