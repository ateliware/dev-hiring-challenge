import { faker } from '@faker-js/faker'
import { CreateRepoInput } from '../../dto/create-repo.input'
import { Repo } from '../../entities/repo.entity'

class FakeRepoProvider {
  private repositories: Repo[] = []

  create(repoInput: CreateRepoInput): Repo {
    const repo = new Repo()

    Object.assign(repo, repoInput)
    repo.id = faker.datatype.number({ precision: 0.01 })
    repo.db_id = faker.datatype.uuid()

    this.repositories.push(repo)

    return repo
  }

  async find(): Promise<Repo[]> {
    return this.repositories
  }

  async findOne(options: any): Promise<Repo> {
    const id = options.where.id

    const repository = this.repositories.find(repository => repository.id === id)

    return repository
  }

  async save(entity: Repo): Promise<any> {
    this.repositories.push(entity as Repo)

    return entity
  }

  async remove(repository: Repo) {
    const repositories = this.repositories.filter(repo => repo.db_id === repository.db_id)
    this.repositories = repositories

    repository.is_stored = false

    return repository
  }
}

export { FakeRepoProvider }
