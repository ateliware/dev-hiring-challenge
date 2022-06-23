import { Repo } from '../../entities/repo.entity'

interface RepoFindAllResponseInput {
  total_count: number
  incomplete_results: boolean
  items: Repo[]
}

export { RepoFindAllResponseInput }
