import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'
import { Length } from 'class-validator'
import * as bcrypt from 'bcryptjs'

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(4, 20)
  username: string

  @Column({ select: false })
  @Length(4, 100)
  password: string

  @Column()
  @Length(4, 100)
  email: string

  @Column()
  @Length(4, 100)
  fullname: string

  @Column('simple-array', { default: '' })
  languages: string[]

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  async encryptPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  async validatePassword(unencryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(unencryptedPassword, this.password)
  }
}
