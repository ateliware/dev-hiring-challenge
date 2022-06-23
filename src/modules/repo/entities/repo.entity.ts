import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Owner } from './owner.entity'

@ObjectType()
export class Repo {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  full_name: string

  @Field(() => String)
  description?: string

  @Field(() => String)
  html_url: string

  @Field(() => String)
  url: string

  @Field(() => Int)
  stargazers_count?: number

  @Field(() => Int)
  watchers_count: number

  @Field(() => String)
  language: string

  @Field(() => Int)
  open_issues: number

  @Field(() => Int)
  forks: number

  @Field(() => Int)
  watchers: number

  @Field(() => Owner)
  owner: Owner
}
