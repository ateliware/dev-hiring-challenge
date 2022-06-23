import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateRepoInput } from '../dto/create-repo.input'
import { GithubApiRepository } from '../repositories/github-api.repository'
import { formatGithubRepositories } from '../utils/format-github-repositories.util'

@Injectable()
export class RepoService {
  constructor(private githubApiRepository: GithubApiRepository) {}

  create(createRepoInput: CreateRepoInput) {
    return ''
  }

  async findOne(repository_full_name: string) {
    const repository = await this.githubApiRepository.findByName(
      repository_full_name
    )

    return repository
  }

  async findAll() {
    try {
      const repositories = await Promise.all([
        this.githubApiRepository.findAllRepos('javascript'),
        this.githubApiRepository.findAllRepos('python'),
        this.githubApiRepository.findAllRepos('c'),
        this.githubApiRepository.findAllRepos('ruby'),
        this.githubApiRepository.findAllRepos('elixir')
      ])

      const formattedRepositories = repositories.map(repository =>
        formatGithubRepositories(repository)
      )

      return formattedRepositories
    } catch (error) {
      throw new HttpException(
        `Error to connect with GitHub API =(`,
        HttpStatus.FAILED_DEPENDENCY
      )
    }
  }
}
