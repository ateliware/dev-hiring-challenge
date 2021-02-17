import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { ApiResponseProperty } from '@nestjs/swagger';

@Entity('favorites')
export class FavoriteORM {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty()
  id: number;

  @Column({ unique: true })
  @ApiResponseProperty()
  repo_id: number;

  @Column({ nullable: false })
  language: string;

  @CreateDateColumn()
  @ApiResponseProperty()
  created_at?: Date;
}
