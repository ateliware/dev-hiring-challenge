import { GithubRestApiModule } from '@app/github_rest_api';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

const LANGS = ['javascript', 'golang', 'java', 'c', 'python'];

const _mock_user_id = uuidv4();

describe('AppController', () => {
  let appController: AppController;
  let appPrismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [GithubRestApiModule],
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appPrismaService = app.get<PrismaService>(PrismaService);
  });

  describe('root', () => {
    it('should return language repositories, insert searched repositories and insert new user if dont exist', async () => {
      expect(
        await appController.getLanguageRepositories(
          LANGS[Math.floor(Math.random() * LANGS.length)],
          _mock_user_id,
        ),
      ).toHaveProperty('total_count');
    });

    it('should create new liked repository for user', async () => {
      const repositoryId = (await appPrismaService.repository.findFirst()).id;
      expect(
        (
          await appController.insertUserLikedRepository({
            userId: _mock_user_id,
            repositoryId,
          })
        )?.message,
      ).toEqual('success');
    });

    it('should return user liked repositories', async () => {
      expect(
        Array.isArray(
          await appController.getUserLikedRepositories(_mock_user_id),
        ),
      ).toBe(true);
    });

    it('should delete liked repository for user', async () => {
      const repositoryId = (await appPrismaService.repository.findFirst()).id;
      expect(
        (
          await appController.deleteUserLikedRepository(
            _mock_user_id,
            repositoryId,
          )
        ).message,
      ).toEqual('success');
    });
  });
});
