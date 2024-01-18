import { Repo } from '../../entities/repo.entity'

interface RepoFindResponseInput {
  total_count: number
  incomplete_results: boolean
  items: Repo[]
}

export { RepoFindResponseInput }
