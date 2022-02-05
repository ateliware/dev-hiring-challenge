import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
@Entity()
export class GitHubRepositoryCard {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
  
  @Column()
  owner: string;
  
  @Column()
  description: string;
  
  @Column({nullable: true})
  language: string;
  
  @Column()
  forks: string;

  @Column()
  open_issues: string;

  @Column()
  watchers: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;  

}