/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { TrioModule } from '.';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      dropSchema: true,
    }),

    /* Modules */
    TrioModule,
  ],
})
export class AppModule {}
