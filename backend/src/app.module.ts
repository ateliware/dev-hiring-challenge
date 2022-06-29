import { GithubRestApiModule } from '@app/github_rest_api';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [GithubRestApiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
