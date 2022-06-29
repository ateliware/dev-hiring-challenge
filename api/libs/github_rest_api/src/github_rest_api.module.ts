import { ExternalApiRequestModule } from '@app/external-api-request';
import { Module } from '@nestjs/common';
import { GithubRestApiService } from './github_rest_api.service';

@Module({
  imports: [ExternalApiRequestModule],
  providers: [GithubRestApiService],
  exports: [GithubRestApiService],
})
export class GithubRestApiModule {}
