import { DATASOURCE_PROVIDER } from '../../shared/constants/database.constant'
import { DataSource } from 'typeorm'
import { Repo } from '../entities/repo.entity'

export const REPO_REPOSITORY_PROVIDER = 'REPO_REPOSITORY'

export const RepoRepository = [
  {
    provide: REPO_REPOSITORY_PROVIDER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Repo),
    inject: [DATASOURCE_PROVIDER]
  }
]
