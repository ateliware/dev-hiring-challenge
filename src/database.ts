import { Connection, createConnection } from 'typeorm'
import config from 'config'
import { User } from './models/user.model'

export async function databaseConnect(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    host: config.get('App.database.host') as string,
    port: config.get('App.database.port') as number,
    username: config.get('App.database.username') as string,
    password: config.get('App.database.password') as string,
    database: config.get('App.database.database') as string,
    entities: [User],
    synchronize: true,
    logging: false,
  })
}
