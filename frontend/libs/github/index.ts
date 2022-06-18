import React from "react"
import { Paginator } from "../paginator";
import { RemoteDataState, Repositorie, Repositories } from "../shared"

export enum Language {
  PYTHON=0,
  JAVASCRIPT,
  RUST,
  C,
  HASKELL
}

export interface GithubRepositoriesParams {
  label: string;
  language: Language;
}

export interface GithubRepositoriesResponse {
  incomplete_results: boolean;
  items: Repositorie[];
  total_count: number;
}

interface GithubRepositoriesHook {
  repositories: Repositories;
  searchParams: GithubRepositoriesParams;
  searchRepositories: (paginator: Paginator) => Promise<GithubRepositoriesResponse>;
  setSearchParams: React.Dispatch<React.SetStateAction<GithubRepositoriesParams>>;
}

export const useGithubRepositories = (initialSearchParams: GithubRepositoriesParams): GithubRepositoriesHook => {
  const [ repositories, setRepositories ] = React.useState<Repositories>({
    state: RemoteDataState.WAITING,
    items: []
  });
  const [ searchParams, setSearchParams ] = React.useState<GithubRepositoriesParams>(initialSearchParams);

  const setState = (state: RemoteDataState) => {
    setRepositories({
      ...repositories,
      state
    });
  }

  const searchRepositories = async (paginator: Paginator): Promise<GithubRepositoriesResponse> => {
    setState(RemoteDataState.LOADING);
    const repos = await requestGithubRepositories(searchParams, paginator)
    setRepositories({
      state: RemoteDataState.LOADED,
      items: repos.items,
    });
    return repos;
  }

  return {
    repositories,
    searchParams,
    searchRepositories,
    setSearchParams,
  }
}

export const selectors = {
  isLoading: (state: GithubRepositoriesHook): boolean => (
    state.repositories.state === RemoteDataState.LOADING
  ),

  isWaiting: (state: GithubRepositoriesHook): boolean => (
    state.repositories.state === RemoteDataState.WAITING
  ),
};

export const stringToLanguage = (value: string): Language => {
  const lang = ({
    '0': Language.PYTHON,
    '1': Language.JAVASCRIPT,
    '2': Language.RUST,
    '3': Language.C,
    '4': Language.HASKELL,
  })[value];

  return lang || Language.PYTHON;
}

export const languageToLabel = (lang: Language): string => {
  return ({
    [Language.PYTHON]: 'Python',
    [Language.JAVASCRIPT]: 'Javascript',
    [Language.RUST]: 'Rust',
    [Language.C]: 'C',
    [Language.HASKELL]: 'Haskell',
  })[lang];
}

const requestGithubRepositories = (params: GithubRepositoriesParams, paginator: Paginator): Promise<GithubRepositoriesResponse> => (
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/github/repositories/?label=${params.label}&language=${languageToLabel(params.language)}&page=${paginator.page}`)
    .then((res): Promise<GithubRepositoriesResponse> => res.json())
)

