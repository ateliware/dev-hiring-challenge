import 'dotenv/config'

import { DataSource } from 'typeorm'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DATABASE_URL } = process.env

const migrationPath = `${__dirname}/migrations/*.{ts,js}`
const entitiesPath = `${__dirname}/../**/entities/*.entity{.ts,.js}`

if (DATABASE_URL && (DB_HOST || DB_PORT || DB_USERNAME || DB_PASSWORD || DB_DATABASE))
  throw new Error('DATABASE_URL is allowed only on production server.')

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  url: DATABASE_URL,
  database: DB_DATABASE,
  entities: [entitiesPath],
  migrations: [migrationPath],
  ssl: DATABASE_URL
    ? {
        rejectUnauthorized: false
      }
    : false
})
