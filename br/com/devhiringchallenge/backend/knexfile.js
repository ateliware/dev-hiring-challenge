// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'devhiring',
      user:     'root',
      password: 'root'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'devhiring',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }

};
