import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateRepoInput } from '../dto/create-repo.input'
import { Repo } from '../entities/repo.entity'
import {
  FindByNameInput,
  GithubApiRepository
} from '../repositories/github-api.repository'
import { REPO_REPOSITORY_PROVIDER } from '../repositories/repo.provider'
import { formatGithubRepositories } from '../utils/format-github-repositories.util'

@Injectable()
export class RepoService {
  constructor(
    @Inject(REPO_REPOSITORY_PROVIDER)
    private repoRepository: Repository<Repo>,
    private githubApiRepository: GithubApiRepository
  ) {}

  async create(createRepoInput: CreateRepoInput) {
    const repoAlreadyExists = await this.repoRepository.findOne({
      where: {
        id: createRepoInput.id
      }
    })

    if (!repoAlreadyExists) {
      const repo = this.repoRepository.create()

      Object.assign(repo, createRepoInput)

      const createdRepo = await this.repoRepository.save(repo)
      repo.is_storaged = true

      return createdRepo
    } else
      throw new HttpException(
        `This repo ${
          repoAlreadyExists?.full_name ||
          repoAlreadyExists.name ||
          repoAlreadyExists.id
        } is already saved, try another repo!`,
        HttpStatus.CONFLICT
      )
  }

  async findOne({ repository_full_name }: FindByNameInput) {
    const repository = await this.githubApiRepository.findByName({
      repository_full_name
    })

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
