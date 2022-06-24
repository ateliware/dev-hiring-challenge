import { Module } from '@nestjs/common'
import { SharedModule } from '../shared/shared.module'
import { GithubApiRepository } from './repositories/github-api.repository'
import { RepoRepository } from './repositories/repo.provider'
import { RepoResolver } from './resolvers/repo.resolver'
import { RepoService } from './services/repo.service'

@Module({
  imports: [SharedModule],
  providers: [RepoResolver, RepoService, GithubApiRepository, ...RepoRepository]
})
export class RepoModule {}
