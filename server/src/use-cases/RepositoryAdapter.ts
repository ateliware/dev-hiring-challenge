import { GitHubRepository, GitHubRepositoryPayload } from "../interfaces/GitHubRepository";
import { TGitHubRepositoryCard } from "../interfaces/Repository";

export class GitHubToRepositoryEntityAdapter {

  formatRepository  (ghRepository: GitHubRepository) {
    const repository: TGitHubRepositoryCard = {
      name: ghRepository.name,
      url: ghRepository.html_url,
      owner: ghRepository.owner.login,
      description: ghRepository.description,
      language: ghRepository.language,
      forks: ghRepository.forks,
      open_issues: ghRepository.open_issues,
      watchers: ghRepository.watchers
    }

    return repository
  }

  formatRepositoryPayload (ghPayload: GitHubRepositoryPayload) {

    let repositories: TGitHubRepositoryCard[] = []

    for (let ghRepository of ghPayload.items) {
      repositories.push(this.formatRepository(ghRepository))
    }

    return repositories
  }

}