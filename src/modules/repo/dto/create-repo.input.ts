import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateRepoInput {
  @Field(() => Number)
  id: number

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  full_name?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  html_url?: string

  @Field(() => String, { nullable: true })
  url?: string

  @Field(() => Int, { nullable: true })
  stargazers_count?: number

  @Field(() => Int, { nullable: true })
  watchers_count?: number

  @Field(() => String, { nullable: true })
  language?: string

  @Field(() => Int, { nullable: true })
  open_issues?: number

  @Field(() => Int, { nullable: true })
  forks?: number

  @Field(() => Int, { nullable: true })
  watchers?: number
}
