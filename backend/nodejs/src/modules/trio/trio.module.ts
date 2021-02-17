/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteORM } from './entities';
import { FavoriteService } from './favorite/favorite.service';
import { TrioController } from './trio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteORM])],
  controllers: [TrioController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class TrioModule {}
