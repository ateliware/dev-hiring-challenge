import { ObjectType, Field, Int } from '@nestjs/graphql'
import { REPO_TABLE_NAME } from '../../shared/constants/database.constant'
import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity } from 'typeorm'

@ObjectType()
@Entity(REPO_TABLE_NAME)
export class Repo {
  @Column()
  @PrimaryGeneratedColumn()
  @Field(() => String, { nullable: true })
  db_id?: string

  @Column()
  @Field(() => Number)
  id: number

  @Column()
  @Field(() => String, { nullable: true })
  name?: string

  @Column()
  @Field(() => String, { nullable: true })
  full_name?: string

  @Column()
  @Field(() => String, { nullable: true })
  description?: string

  @Column()
  @Field(() => String, { nullable: true })
  html_url?: string

  @Column()
  @Field(() => String, { nullable: true })
  url?: string

  @Column()
  @Field(() => Int, { nullable: true })
  stargazers_count?: number

  @Column()
  @Field(() => Int, { nullable: true })
  watchers_count?: number

  @Column()
  @Field(() => String, { nullable: true })
  language?: string

  @Column()
  @Field(() => Int, { nullable: true })
  open_issues?: number

  @Column()
  @Field(() => Int, { nullable: true })
  forks?: number

  @Column()
  @Field(() => Int, { nullable: true })
  watchers?: number

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  is_stored?: boolean

  @Column()
  @Field(() => Date, { nullable: true })
  created_at?: Date

  @Field(() => Date, { nullable: true })
  updated_at?: Date

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  stored_at?: Date
}
