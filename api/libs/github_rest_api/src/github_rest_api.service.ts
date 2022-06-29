import {
  ExternalApiRequestParams,
  ExternalApiRequestService,
} from '@app/external-api-request';
import { Injectable } from '@nestjs/common';
import { GithubRepositorySearchResponse } from './dto';

@Injectable()
export class GithubRestApiService {
  constructor(private externalApiRequestService: ExternalApiRequestService) {}

  async searchRepositories(language: string) {
    return this.makeGithubApiRequest({
      method: 'get',
      url: `/search/repositories?q=language:${language}&sort=stars&order=desc`,
    });
  }

  private async makeGithubApiRequest({
    ...rest
  }: Omit<ExternalApiRequestParams, 'baseURL'>) {
    return this.externalApiRequestService.makeAxiosRequest<GithubRepositorySearchResponse>(
      {
        ...rest,
        baseURL: process.env.GITHUB_REST_API_ENDPOINT,
      },
    );
  }
}
