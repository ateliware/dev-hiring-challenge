import { RepoFindResponseInput } from '../../dto/responses/repo-find-response.input'
import { Repo } from '../../entities/repo.entity'
import { FindByNameInput, GithubApiRepository } from '../github-api.repository'

class FakeGithubApiRepository implements GithubApiRepository {
  private repositories: Repo[] = []

  public async createRepo(repo: Repo) {
    this.repositories.push(repo)

    return repo
  }

  public async findByName({
    repository_full_name
  }: FindByNameInput): Promise<Repo> {
    const repo = this.repositories.find(
      repository => repository.full_name === repository_full_name
    )

    return repo
  }

  public async findAllRepos(language: string): Promise<RepoFindResponseInput> {
    return {
      incomplete_results: false,
      items: this.repositories,
      total_count: this.repositories.length
    }
  }
}

export { FakeGithubApiRepository }
