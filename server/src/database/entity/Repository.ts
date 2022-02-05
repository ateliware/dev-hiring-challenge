import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

export interface TRepository {
  name?: string;
  url?: string;
  owner?: string;
  description?: string;
  language?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
}

@Entity()
export class Repository {

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
  
  @Column()
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