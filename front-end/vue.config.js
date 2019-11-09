// vue.config.js
module.exports = {
  // proxy all webpack dev-server requests starting with /api
  // to our Spring Boot backend (localhost:8081) using http-proxy-middleware
  // see https://cli.vuejs.org/config/#devserver-proxy
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8081', // this configuration needs to correspond to the Spring Boot backends' server.port
        ws: true,
        changeOrigin: true
      }
    }
  },
  // Change build paths to make them Maven compatible
  // see https://cli.vuejs.org/config/
  outputDir: 'target/dist',
  assetsDir: 'static'
};
