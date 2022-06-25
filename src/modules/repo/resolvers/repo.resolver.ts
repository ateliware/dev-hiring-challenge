import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Repo } from '../entities/repo.entity'
import { CreateRepoInput } from '../dto/create-repo.input'
import { RepoFindAllOutput } from '../dto/outputs/repo-find-all.output'
import { RepoService } from '../services/repo.service'

@Resolver(() => Repo)
export class RepoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Mutation(() => Repo)
  async createRepo(@Args('createRepoInput') createRepoInput: CreateRepoInput) {
    const repository = await this.repoService.create(createRepoInput)

    return repository
  }

  @Query(() => Repo, { name: 'repoFindOne' })
  async findOne(
    @Args('repository_full_name', { type: () => String })
    repository_full_name: string
  ) {
    const repository = await this.repoService.findOne({
      repository_full_name
    })

    return repository
  }

  @Query(() => [RepoFindAllOutput], { name: 'repoFindAll' })
  async findAll() {
    const repositories = await this.repoService.findAll()

    return repositories
  }
}
