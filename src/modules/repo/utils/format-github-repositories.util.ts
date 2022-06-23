import { RepoFindAllOutput } from '../dto/outputs/repo-find-all.output'
import { RepoFindResponseInput } from '../dto/responses/repo-find-response.input'

function formatGithubRepositories(
  apiResponse: RepoFindResponseInput
): RepoFindAllOutput {
  const repos = apiResponse.items.map(apiResponseItemData => ({
    id: apiResponseItemData.id,
    forks: apiResponseItemData.forks,
    full_name: apiResponseItemData.full_name,
    html_url: apiResponseItemData.html_url,
    language: apiResponseItemData.language,
    name: apiResponseItemData.name,
    open_issues: apiResponseItemData.open_issues,
    url: apiResponseItemData.url,
    owner: apiResponseItemData.owner,
    watchers: apiResponseItemData.watchers,
    watchers_count: apiResponseItemData.watchers_count,
    description: apiResponseItemData.description,
    stargazers_count: apiResponseItemData.stargazers_count
  }))

  const language = repos[0].language

  return {
    language,
    repositories: repos
  }
}

export { formatGithubRepositories }
