import { ObjectType, Field, Int } from '@nestjs/graphql'
import { REPO_TABLE_NAME } from 'src/modules/shared/constantes/database.constant'
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity
} from 'typeorm'

@ObjectType()
@Entity(REPO_TABLE_NAME)
export class Repo {
  @Column()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  db_id?: number

  @Column()
  @Field(() => Int)
  id: number

  @Column()
  @Field(() => String)
  name?: string

  @Column()
  @Field(() => String)
  full_name?: string

  @Column()
  @Field(() => String)
  description?: string

  @Column()
  @Field(() => String)
  html_url?: string

  @Column()
  @Field(() => String)
  url?: string

  @Column()
  @Field(() => Int)
  stargazers_count?: number

  @Column()
  @Field(() => Int)
  watchers_count?: number

  @Column()
  @Field(() => String)
  language?: string

  @Column()
  @Field(() => Int)
  open_issues?: number

  @Column()
  @Field(() => Int)
  forks?: number

  @Column()
  @Field(() => Int)
  watchers?: number

  @CreateDateColumn()
  @Field(() => Date)
  created_at?: Date

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at?: Date

  @DeleteDateColumn()
  @Field(() => Date)
  deleted_at?: Date
}
