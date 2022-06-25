import { Repo } from '../../entities/repo.entity'

class FakeRepoProvider {
  private repositories: Repo[] = []

  create(): Repo {
    return new Repo()
  }

  async find(): Promise<Repo[]> {
    return this.repositories
  }

  async findOne(name: string): Promise<Repo> {
    const repository = this.repositories.find(repository => repository.name === name)
    return repository
  }

  async save(entity: Repo): Promise<any> {
    this.repositories.push(entity as Repo)
    return entity
  }
}

export { FakeRepoProvider }
