import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Repo } from '../entities/repo.entity'
import { CreateRepoInput } from '../dto/create-repo.input'
import { RepoFindAllOutput } from '../dto/outputs/repo-find-all.output'
import { RepoService } from '../services/repo.service'

@Resolver(() => Repo)
export class RepoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Mutation(() => Repo)
  async createRepo(@Args('createRepoInput') createRepoInput: CreateRepoInput) {
    return this.repoService.create(createRepoInput)
  }

  @Query(() => [RepoFindAllOutput], { name: 'repoFindAll' })
  async findAll() {
    const repositories = await this.repoService.findAll()

    return repositories
  }
}
