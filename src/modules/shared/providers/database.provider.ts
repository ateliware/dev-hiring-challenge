import { AppDataSource } from 'src/data-source'
import { DATASOURCE_PROVIDER } from '../constantes/database.constant'

const databaseProviders = [
  {
    provide: DATASOURCE_PROVIDER,
    useFactory: async () => {
      return await AppDataSource.initialize()
    }
  }
]

export { databaseProviders }
