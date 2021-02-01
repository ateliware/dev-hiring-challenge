// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'devhiring',
      charset : 'utf8mb4'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'devhiring',
      charset : 'utf8mb4'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'testdevhiring',
      charset : 'utf8mb4'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }


};
