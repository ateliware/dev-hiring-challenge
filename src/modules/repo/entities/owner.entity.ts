import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Owner {
  @Field(() => Int)
  id: number

  @Field(() => String)
  login: string

  @Field(() => String)
  avatar_url: string

  @Field(() => String)
  url: string

  @Field(() => String)
  html_url: string

  @Field(() => String)
  repos_url: string

  @Field(() => String)
  type: 'Organization' | 'User'
}
