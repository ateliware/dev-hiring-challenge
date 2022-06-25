import 'dotenv/config'

import { DataSource } from 'typeorm'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_URL } = process.env

const migrationPath = `${__dirname}/migrations/*.{ts,js}`
const entitiesPath = `${__dirname}/../**/entities/*.entity{.ts,.js}`

if (DB_URL && (DB_HOST || DB_PORT || DB_USERNAME || DB_PASSWORD || DB_DATABASE))
  throw new Error('DB_URL is allowed only on production server.')

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  url: DB_URL,
  database: DB_DATABASE,
  entities: [entitiesPath],
  migrations: [migrationPath],
  ssl: DB_URL
    ? {
        rejectUnauthorized: false
      }
    : false
})
