import React from "react"
import { Repositorie } from "../repositorie"

export interface GithubRepositoriesParams {
  label: string
  language: string
  page: number
}

export interface GithubRepositoriesResponse {
  incomplete_results: boolean
  items: Repositorie[]
  total_count: number
}

export const requestGithubRepositories = (params: GithubRepositoriesParams): Promise<GithubRepositoriesResponse> => (
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/github/repositories/?label=${params.label}&language=${params.language}&page=${params.page}`)
    .then((res): Promise<GithubRepositoriesResponse> => res.json())
)

export const useGithubRepositories = (initialSearchParams: GithubRepositoriesParams) => {
  const [ repositories, setRepositories ] = React.useState<GithubRepositoriesResponse>()
  const [ searchParams, setSearchParams ] = React.useState<GithubRepositoriesParams>()

  const searchRepositories = () => {
    requestGithubRepositories(searchParams || initialSearchParams)
      .then((repos) => setRepositories(repos))
  }

  return { repositories, searchParams, searchRepositories, setSearchParams }
}

