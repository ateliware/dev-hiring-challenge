import { Injectable } from '@nestjs/common'
import { GithubApiRoutes } from 'src/modules/shared/http/enums/github-api-routes.enum'
import { githubApi } from 'src/modules/shared/http/github-api.http'
import { RepoFindResponseInput } from '../dto/responses/repo-find-response.input'
import { Repo } from '../entities/repo.entity'

@Injectable()
class GithubApiRepository {
  public async findByName(repository_name: string): Promise<Repo> {
    const { data } = await githubApi.get<RepoFindResponseInput>(
      GithubApiRoutes.RepositorySearch,
      {
        params: {
          q: `${repository_name} in:name`,
          per_page: 1
        }
      }
    )

    const repository = data?.items[0]

    return repository
  }
  public async findAllRepos(language: string): Promise<RepoFindResponseInput> {
    const { data } = await githubApi.get<RepoFindResponseInput>(
      GithubApiRoutes.RepositorySearch,
      {
        params: {
          q: `language:${language}`,
          sort: 'stars',
          per_page: 5
        }
      }
    )

    return data
  }
}

export { GithubApiRepository }
