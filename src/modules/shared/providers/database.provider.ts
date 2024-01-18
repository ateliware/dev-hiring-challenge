import { DATASOURCE_PROVIDER } from '../constants/database.constant'
import { AppDataSource } from '../data-source'

const databaseProviders = [
  {
    provide: DATASOURCE_PROVIDER,
    useFactory: async () => {
      return await AppDataSource.initialize()
    }
  }
]

export { databaseProviders }
