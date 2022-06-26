import { Test, TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { FakeRepoProvider } from '../repositories/fakes/fake-repo.provider'
import { REPO_REPOSITORY_PROVIDER } from '../repositories/repo.provider'
import { RepoService } from './repo.service'
import { GithubApiRepository } from '../repositories/github-api.repository'
import { FakeGithubApiRepository } from '../repositories/fakes/fake-github-api.repository'
import { CreateRepoInput } from '../dto/create-repo.input'

describe('RepoService', () => {
  let service: RepoService
  const githubApiRepository = new FakeGithubApiRepository()
  const repositoryMock: CreateRepoInput = {
    id: 1,
    name: 'Test Repository',
    full_name: 'TestRepository/TestRepository',
    created_at: new Date(),
    updated_at: new Date()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepoService,
        {
          provide: REPO_REPOSITORY_PROVIDER,
          useValue: new FakeRepoProvider()
        },
        {
          provide: GithubApiRepository,
          useValue: githubApiRepository
        }
      ]
    }).compile()

    service = module.get<RepoService>(RepoService)

    await Promise.all([
      githubApiRepository.createRepo(repositoryMock),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.datatype.uuid()
      }),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.datatype.uuid()
      }),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.datatype.uuid()
      }),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.datatype.uuid()
      })
    ])
  })

  it('should be able to create a new repository', async () => {
    const repository = await service.create(repositoryMock)

    expect(repository.id).toBe(1)
    expect(repository.is_stored).toBe(true)
  })

  it('should be able to find one repository', async () => {
    const repository = await service.findOne({
      repository_full_name: repositoryMock.full_name
    })

    expect(repository.full_name).toBe(repositoryMock.full_name)
  })

  it('should be able to list all repositories', async () => {
    const repositories = await service.findAll()

    expect(repositories.length).toBeGreaterThan(1)
  })

  it('should be able to delete a repository', async () => {
    await service.create(repositoryMock)

    const repositoryExists = await service.findOne({
      repository_full_name: repositoryMock.full_name
    })
    expect(repositoryExists).toBeDefined()

    const deleted = await service.destroyOne({ github_id: repositoryMock.id })
    expect(deleted.is_stored).toBeFalsy()
  })
})
