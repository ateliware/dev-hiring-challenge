import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InsertUserLikedRepositoryDTO } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('repositories/:language/:userId')
  async getLanguageRepositories(
    @Param('language') language: string,
    @Param('userId') userId: string,
  ) {
    return await this.appService.getLanguageRepositories(language, userId);
  }

  @Get('liked-repositories/:userId')
  async getUserLikedRepositories(@Param('userId') userId: string) {
    return await this.appService.getUserLikedRepositories(userId);
  }

  @Post('liked-repository')
  async insertUserLikedRepository(
    @Body() insertLikedRepositoryDTO: InsertUserLikedRepositoryDTO,
  ) {
    return await this.appService.insertUserLikedRepository(
      insertLikedRepositoryDTO,
    );
  }

  @Delete('liked-repository/:userId/:repositoryId')
  async deleteUserLikedRepository(
    @Param('userId') userId: string,
    @Param('repositoryId') repositoryId: string,
  ) {
    return await this.appService.deleteUserLikedRepository(
      userId,
      repositoryId,
    );
  }
}
