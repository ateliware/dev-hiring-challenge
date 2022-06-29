import { RepositoryDTO } from './RepositoryDTO';

export interface GithubRepositorySearchResponse {
  items: RepositoryDTO[];
  total_count: number;
}
