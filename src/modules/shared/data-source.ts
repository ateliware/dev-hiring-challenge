import 'dotenv/config'

import { DataSource } from 'typeorm'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env

const isTypeOrmCliExec = NODE_ENV === 'typeorm'
const migrationPath = `${
  isTypeOrmCliExec ? 'src' : '.'
}/modules/shared/migrations/*.{ts,js}`

const entitiesPath = `${
  isTypeOrmCliExec ? '.' : __dirname
}/modules/**/entities/*.entity{.ts,.js}`

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [entitiesPath],
  migrations: [migrationPath]
})
