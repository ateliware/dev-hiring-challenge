require('dotenv').config()

const env_mode = process.env.NODE_ENV.toUpperCase()

const config = {
  name: 'default',
  type: 'postgres',
  host: process.env[env_mode + '_DB_HOST'],
  port: parseInt(process.env[env_mode + '_DB_PORT']),
  username: process.env[env_mode + '_DB_USER'],
  password: process.env[env_mode + '_DB_PASSWORD'],
  database: process.env[env_mode + '_DB_DATABASE'],
  schema: 'public',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  dropSchema: process.env.NODE_ENV === 'test',
  entities: [
    'build/database/entity/**/*.js'
  ],
  migrations: [
    'build/database/migration/**/*.js'
  ]
}

module.exports = config