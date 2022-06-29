import { GithubRestApiService } from '@app/github_rest_api';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InsertUserLikedRepositoryDTO } from './dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private githubRestApiService: GithubRestApiService,
  ) {}

  async getLanguageRepositories(language: string, userId: string) {
    try {
      const searchedRepositories =
        await this.githubRestApiService.searchRepositories(language);

      await this.prisma.repository.createMany({
        data: searchedRepositories.items.map((r) => ({
          id: String(r.id),
          dataObj: r,
        })),
        skipDuplicates: true,
      });
      await this.prisma.user.upsert({
        where: {
          id: userId,
        },
        update: {},
        create: { id: userId },
      });
      return searchedRepositories;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Algo deu errado ao tentar consultar os repositórios. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserLikedRepositories(userId: string) {
    try {
      return await this.prisma.repositoriesOnUsers.findMany({
        where: {
          userId,
        },
        include: {
          repository: true,
        },
      });
    } catch (e) {
      throw new HttpException(
        'Algo deu errado ao tentar consultar os repositórios favoritos deste usuário. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async insertUserLikedRepository(
    insertLikedRepositoryDTO: InsertUserLikedRepositoryDTO,
  ) {
    try {
      await this.prisma.repositoriesOnUsers.create({
        data: {
          repositoryId: insertLikedRepositoryDTO.repositoryId,
          userId: insertLikedRepositoryDTO.userId,
        },
      });
      return { message: 'success' };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Algo deu errado ao tentar consultar os repositórios. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUserLikedRepository(userId: string, repositoryId: string) {
    try {
      await this.prisma.repositoriesOnUsers.delete({
        where: { userId_repositoryId: { userId, repositoryId } },
      });
      return { message: 'success' };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Algo deu errado ao tentar remover o favorito. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
