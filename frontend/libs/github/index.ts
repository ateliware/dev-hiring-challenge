import React from "react"
import { Paginator } from "../paginator";
import { ApiResponse, FeedbackMessage, getApiFeedback, isApiLoaded, isApiLoading, isApiWaiting, RemoteDataState, Repositorie, setAsError, setLoaded, setLoading } from "../shared"
import { get } from "../shared/api";

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
  repositories: ApiResponse<Repositorie[]>;
  searchParams: GithubRepositoriesParams;
  searchRepositories: (paginator: Paginator, updatePaginator: (nextPaginator: Partial<Paginator>) => void) => Promise<void>;
  setSearchParams: React.Dispatch<React.SetStateAction<GithubRepositoriesParams>>;
}

export const useGithubRepositories = (initialSearchParams: GithubRepositoriesParams): GithubRepositoriesHook => {
  const [ repositories, setRepositories ] = React.useState<ApiResponse<Repositorie[]>>(initialRepositories);
  const [ searchParams, setSearchParams ] = React.useState<GithubRepositoriesParams>(initialSearchParams);

  const setReposLoading = setLoading(setRepositories);
  const setReposLoaded = setLoaded(setRepositories);
  const setReposAsError = setAsError(setRepositories);

  const searchRepositories = async (
    paginator: Paginator,
    updatePaginator: (nextPaginator: Partial<Paginator>) => void
  ): Promise<void> => {
    setReposLoading();
    const reposResponse = await requestGithubRepositories({
      ...searchParams,
      language: languageToLabel(searchParams.language).toLowerCase(),
      page: paginator.page.toString()
    });
    switch(reposResponse.state) {
      case(RemoteDataState.LOADED):
        setReposLoaded(reposResponse.data.items, "Repositories loaded.");
        updatePaginator({
          totalCount: reposResponse.data.total_count
        });
        break;
      case(RemoteDataState.ERROR):
        setReposAsError(reposResponse.detail);
        break;
    }
  }

  return {
    repositories,
    searchParams,
    searchRepositories,
    setSearchParams,
  }
}

export const selectors = {
  isLoading: (state?: GithubRepositoriesHook): boolean => isApiLoading(state?.repositories),
  isWaiting: (state?: GithubRepositoriesHook): boolean => isApiWaiting(state?.repositories),
  isLoaded: (state?: GithubRepositoriesHook): boolean => isApiLoaded(state?.repositories),
  getFeedback: (state?: GithubRepositoriesHook): FeedbackMessage | null => getApiFeedback(state?.repositories),
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

const requestGithubRepositories = get<GithubRepositoriesResponse>("/api/v1/github/repositories/");

const initialRepositories: ApiResponse<Repositorie[]> = {
  state: RemoteDataState.WAITING,
}
