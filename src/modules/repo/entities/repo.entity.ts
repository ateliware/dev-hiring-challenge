import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Repo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
