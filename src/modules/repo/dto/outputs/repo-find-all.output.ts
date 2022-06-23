import { Field, ObjectType } from '@nestjs/graphql'
import { Repo } from '../../entities/repo.entity'

@ObjectType()
class RepoFindAllOutput {
  @Field(() => String)
  language: string

  @Field(() => [Repo])
  repositories: Repo[]
}

export { RepoFindAllOutput }
