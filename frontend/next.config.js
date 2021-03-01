module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes packages that depend on fs/module module
      if (!isServer) {
        config.node = { fs: 'empty', module: 'empty' }
      }

      return config
    },
    env: {
      API_URL: process.env.API_URL,
    },
    images: {
      domains: ['avatars.githubusercontent.com'],
    }
}
