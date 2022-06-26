import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { githubApiErrorDecoder } from 'src/modules/shared/utils/github-api-error-decoder.util'
import { Repository } from 'typeorm'
import { CreateRepoInput } from '../dto/create-repo.input'
import { DestroyRepoInput } from '../dto/destroy-repo.input'
import { Repo } from '../entities/repo.entity'
import { FindByNameInput, GithubApiRepository } from '../repositories/github-api.repository'
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
      repo.is_stored = true

      const createdRepo = await this.repoRepository.save(repo)

      return createdRepo
    } else
      throw new HttpException(
        `This repo ${
          repoAlreadyExists?.full_name || repoAlreadyExists.name || repoAlreadyExists.id
        } is already saved, try another repo!`,
        HttpStatus.CONFLICT
      )
  }

  async findOne({ repository_full_name }: FindByNameInput) {
    let repository: Repo

    try {
      repository = await this.githubApiRepository.findByName({
        repository_full_name
      })
    } catch (error) {
      const { message, code } = githubApiErrorDecoder(error)

      throw new HttpException(message, code)
    }

    const formattedRepository = formatGithubRepositories({
      incomplete_results: false,
      items: [repository],
      total_count: 1
    }).repositories[0]

    const storagedRepository = await this.repoRepository.findOne({
      where: { id: repository.id }
    })

    if (storagedRepository) {
      formattedRepository.db_id = storagedRepository.db_id
      formattedRepository.is_stored = true
      formattedRepository.stored_at = storagedRepository.stored_at
    }

    return formattedRepository
  }

  async findAll() {
    try {
      const repositories = await Promise.all([
        this.githubApiRepository.findAllRepos('typescript'),
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
      const { message, code } = githubApiErrorDecoder(error)

      throw new HttpException(message, code)
    }
  }

  async destroyOne({ github_id }: DestroyRepoInput) {
    const repositoryExists = await this.repoRepository.findOne({ where: { id: github_id } })

    if (!repositoryExists)
      throw new HttpException('This repository is not storaged to be deleted', HttpStatus.NOT_FOUND)

    await this.repoRepository.remove(repositoryExists)
    repositoryExists.is_stored = false

    return repositoryExists
  }
}
