import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Repo } from '../entities/repo.entity'
import { CreateRepoInput } from '../dto/create-repo.input'
import { UpdateRepoInput } from '../dto/update-repo.input'
import { RepoService } from '../services/repo.service'

@Resolver(() => Repo)
export class RepoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Mutation(() => Repo)
  createRepo(@Args('createRepoInput') createRepoInput: CreateRepoInput) {
    return this.repoService.create(createRepoInput)
  }

  @Query(() => [Repo], { name: 'repo' })
  findAll() {
    return this.repoService.findAll()
  }

  @Query(() => Repo, { name: 'repo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.repoService.findOne(id)
  }

  @Mutation(() => Repo)
  updateRepo(@Args('updateRepoInput') updateRepoInput: UpdateRepoInput) {
    return this.repoService.update(updateRepoInput.id, updateRepoInput)
  }

  @Mutation(() => Repo)
  removeRepo(@Args('id', { type: () => Int }) id: number) {
    return this.repoService.remove(id)
  }
}
