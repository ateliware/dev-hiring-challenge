import { CreateRepoInput } from './create-repo.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateRepoInput extends PartialType(CreateRepoInput) {
  @Field(() => Int)
  id: number
}
