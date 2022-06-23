import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateRepoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
