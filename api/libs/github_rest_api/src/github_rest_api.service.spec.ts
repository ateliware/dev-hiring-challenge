import { ExternalApiRequestModule } from '@app/external-api-request';
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { GithubRestApiService } from './github_rest_api.service';

describe('GithubRestApiService', () => {
  let service: GithubRestApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ExternalApiRequestModule],
      providers: [GithubRestApiService],
    }).compile();

    service = module.get<GithubRestApiService>(GithubRestApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
