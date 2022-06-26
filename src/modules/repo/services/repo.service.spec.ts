import { Test, TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { FakeRepoProvider } from '../repositories/fakes/fake-repo.provider'
import { REPO_REPOSITORY_PROVIDER } from '../repositories/repo.provider'
import { RepoService } from './repo.service'
import { GithubApiRepository } from '../repositories/github-api.repository'
import { FakeGithubApiRepository } from '../repositories/fakes/fake-github-api.repository'

describe('RepoService', () => {
  let service: RepoService
  const githubApiRepository = new FakeGithubApiRepository()
  const findOneRepositoryName = 'find-one-repository'

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
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.commerce.productName()
      }),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.commerce.productName()
      }),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: faker.commerce.productName()
      }),
      githubApiRepository.createRepo({
        id: faker.datatype.number(),
        full_name: findOneRepositoryName
      })
    ])
  })

  it('should be able to create a new Repo', async () => {
    const repository = await service.create({
      id: 1,
      name: 'Test Repository',
      created_at: new Date(),
      updated_at: new Date()
    })

    expect(repository.id).toBe(1)
    expect(repository.is_stored).toBe(true)
  })

  it('should be able to find one repository', async () => {
    const repository = await service.findOne({
      repository_full_name: findOneRepositoryName
    })

    expect(repository.full_name).toBe(findOneRepositoryName)
  })

  it('should be able to list all Repositories', async () => {
    const repositories = await service.findAll()

    expect(repositories.length).toBeGreaterThan(1)
  })
})
