module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'body': ['Montserrat'],
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
