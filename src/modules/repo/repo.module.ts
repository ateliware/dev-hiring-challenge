import { Module } from '@nestjs/common'
import { RepoResolver } from './resolvers/repo.resolver'
import { RepoService } from './services/repo.service'

@Module({
  providers: [RepoResolver, RepoService]
})
export class RepoModule {}
