import { ObjectType, Field, Int } from '@nestjs/graphql'
import { OWNER_TABLE_NAME } from 'src/modules/shared/constantes/database.constant'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity(OWNER_TABLE_NAME)
export class Owner {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  db_id?: number

  @Field(() => Int)
  @Column()
  id: number

  @Column()
  @Field(() => String)
  login?: string

  @Column()
  @Field(() => String)
  avatar_url?: string

  @Column()
  @Field(() => String)
  url?: string

  @Column()
  @Field(() => String)
  html_url?: string

  @Column()
  @Field(() => String)
  repos_url?: string

  @Column()
  @Field(() => String)
  type?: 'Organization' | 'User'

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
