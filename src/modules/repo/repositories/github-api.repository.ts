import { Injectable } from '@nestjs/common'
import { GithubApiRoutes } from '../../../modules/shared/http/enums/github-api-routes.enum'
import { githubApi } from '../../../modules/shared/http/github-api.http'
import { RepoFindResponseInput } from '../dto/responses/repo-find-response.input'
import { Repo } from '../entities/repo.entity'

export interface FindByNameInput {
  repository_full_name: string
}
@Injectable()
class GithubApiRepository {
  public async findByName({
    repository_full_name
  }: {
    repository_full_name: string
  }): Promise<Repo> {
    const { data } = await githubApi.get<RepoFindResponseInput>(
      GithubApiRoutes.RepositorySearch,
      {
        params: {
          q: `${repository_full_name} in:name`,
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
          order: 'desc',
          type: 'Repositories',
          per_page: 5
        }
      }
    )

    return data
  }
}

export { GithubApiRepository }
