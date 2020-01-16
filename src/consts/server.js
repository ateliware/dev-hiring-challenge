const serverConfig = {
    apiAddr: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://ateli-test.herokuapp.com/'
}

module.exports = {serverConfig}