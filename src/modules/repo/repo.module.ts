import { Module } from '@nestjs/common'
import { GithubApiRepository } from './repositories/github-api.repository'
import { RepoResolver } from './resolvers/repo.resolver'
import { RepoService } from './services/repo.service'

@Module({
  providers: [RepoResolver, RepoService, GithubApiRepository]
})
export class RepoModule {}
