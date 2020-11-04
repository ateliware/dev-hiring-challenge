import axios, { AxiosResponse } from 'axios'

export class GitHubClient {
  constructor(private request = axios) {}

  public async fetchRepositories(language: string): Promise<AxiosResponse> {
    try {
      const response = await this.request.get(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=5`
      )
      return response.data.items
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
}
