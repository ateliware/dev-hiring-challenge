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
import { Owner } from './owner.entity'

@ObjectType()
@Entity(REPO_TABLE_NAME)
export class Repo {
  @Field(() => Int)
  @Column()
  @PrimaryGeneratedColumn()
  db_id?: number

  @Field(() => Int)
  @Column()
  id: number

  @Field(() => String)
  @Column()
  name?: string

  @Field(() => String)
  @Column()
  full_name?: string

  @Field(() => String)
  @Column()
  description?: string

  @Field(() => String)
  @Column()
  html_url?: string

  @Field(() => String)
  @Column()
  url?: string

  @Field(() => Int)
  @Column()
  stargazers_count?: number

  @Field(() => Int)
  @Column()
  watchers_count?: number

  @Field(() => String)
  @Column()
  language?: string

  @Field(() => Int)
  @Column()
  open_issues?: number

  @Field(() => Int)
  @Column()
  forks?: number

  @Field(() => Int)
  @Column()
  watchers?: number

  @Field(() => Owner)
  @Column()
  owner?: Owner

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
