import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FavoriteArgs {
  @ApiProperty({ required: true })
  @IsNumber()
  repo_id: number;

  @ApiProperty({ required: true })
  @IsString()
  language: string;
}

export class UnfavoriteArgs {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;
}
