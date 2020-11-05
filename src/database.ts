import { Connection, createConnection } from 'typeorm'
import config from 'config'
import { User } from './models/user.model'
import logger from './logger'

export async function databaseConnect(): Promise<Connection> {
  try {
    const connection = await createConnection({
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
    logger.info('Connected to the database')
    return connection
  } catch (error) {
    logger.error(error.message)
    return error
  }
}
