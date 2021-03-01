interface Owner {
  avatar_url: string;
  login: string;
}

export default interface Repository {
  id: number;
  name: string;
  owner: Owner;
  description: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
  watchers: number;
}
