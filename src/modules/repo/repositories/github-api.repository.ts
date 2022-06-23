import { Injectable } from '@nestjs/common'
import { GithubApiRoutes } from 'src/modules/shared/http/enums/github-api-routes.enum'
import { githubApi } from 'src/modules/shared/http/github-api.http'
import { RepoFindAllResponseInput } from '../dto/responses/repo-find-all-response.input'

@Injectable()
class GithubApiRepository {
  public async findAllRepos(
    language: string
  ): Promise<RepoFindAllResponseInput> {
    const { data } = await githubApi.get(GithubApiRoutes.RepositorySearch, {
      params: {
        q: `language:${language}`,
        sort: 'stars',
        per_page: 5
      }
    })

    return data
  }
}

export { GithubApiRepository }
