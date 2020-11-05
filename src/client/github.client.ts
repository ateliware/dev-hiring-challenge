import { IGithubRepositoryInfo } from '@src/interfaces/IGithubRepository'
import axios, { AxiosResponse } from 'axios'
import _ from 'lodash'

export class GitHubClient {
  constructor(private request = axios) {}

  public async fetchRepositories(language: string): Promise<AxiosResponse> {
    try {
      const response = await this.request.get(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=5`
      )
      return response
    } catch (error) {
      if (!error.status && !error.response) {
        throw new Error(
          `Unexpected error when trying to communicate to GitHub API: ${error.message}`
        )
      }
      throw new Error(
        `Unexpected error returned by the GitHub API: ${error.response.data.message}`
      )
    }
  }

  public async formatResponse(
    languages: string[]
  ): Promise<IGithubRepositoryInfo[]> {
    const arrayRepos: IGithubRepositoryInfo[] = await Promise.all(
      languages.map(async (lang: string) => {
        const response = await this.fetchRepositories(lang)
        return response.data.items
      })
    )

    const response = _.flattenDeep(arrayRepos).map((element) => {
      return {
        id: element.id,
        name: element.name,
        full_name: element.full_name,
        description: element.description,
        url: element.url,
        stargazers_count: element.stargazers_count,
        language: element.language,
      }
    })

    return response
  }
}
