import React from "react"
import { Repositorie } from "../repositorie"

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

export interface Paginator {
  totalCount: number;
  numPages: number;
  page: number;
}

interface GithubRepositoriesHook {
  repositories: Repositorie[];
  searchParams: GithubRepositoriesParams;
  searchRepositories: (paginator: Paginator) => void;
  setSearchParams: React.Dispatch<React.SetStateAction<GithubRepositoriesParams>>;
  isLoading: boolean;
  updatePage: (pageTo: number) => void;
  paginator: Paginator;
}

export const requestGithubRepositories = (params: GithubRepositoriesParams, paginator: Paginator): Promise<GithubRepositoriesResponse> => (
  console.log('OIOI', paginator.page),
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/github/repositories/?label=${params.label}&language=${languageToLabel(params.language)}&page=${paginator.page}`)
    .then((res): Promise<GithubRepositoriesResponse> => res.json())
)

export const useGithubRepositories = (initialSearchParams: GithubRepositoriesParams): GithubRepositoriesHook => {
  const [ repositories, setRepositories ] = React.useState<Repositorie[]>([]);
  const [ searchParams, setSearchParams ] = React.useState<GithubRepositoriesParams>(initialSearchParams);
  const [ isLoading, setLoading ] = React.useState<boolean>(false);
  const [ paginator, setPaginator ] = React.useState<Paginator>({
    page: 1,
    numPages: 0,
    totalCount: 0
  });

  const searchRepositories = (paginator: Paginator) => {
    setLoading(true);
    requestGithubRepositories(searchParams, paginator)
      .then((repos) => {
        setRepositories(repos.items);
        setPaginator({
          page: paginator.page,
          numPages: calcNumPages(repos.total_count),
          totalCount: repos.total_count,
        });
        setLoading(false);
      });
  }

  const updatePage = (page: number): void => {
    setPaginator({
      ...paginator,
      page,
    });
  }

  return { repositories, searchParams, searchRepositories, setSearchParams, isLoading, updatePage, paginator }
}

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

const calcNumPages = (totalItems: number): number => (
  Math.ceil(totalItems / 5)
)

