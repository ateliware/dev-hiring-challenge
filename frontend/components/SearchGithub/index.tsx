import { useCallback, useEffect, useState } from "react";
import { Language, languageToLabel, selectors as githubSelectors, stringToLanguage, useGithubRepositories } from "../../libs/github";
import { usePaginator } from "../../libs/paginator";
import { RemoteDataState } from "../../libs/shared";
import { Loading } from "../Loading";
import { RepositorieTable } from "../RepositoriesTable";

const MAX_REPOSITORIES_TO_SHOW = 10

export const SearchGithub = (): JSX.Element => {
  const { paginator, updatePage, updatePaginator } = usePaginator();
  const [ lastPaginator, setLastPaginator ] = useState<number>(paginator.page);
  const githubRepos = useGithubRepositories({
    label: "",
    language: Language.RUST,
  });

  const updateTerm = (label: string) => {
    githubRepos.setSearchParams({ ...githubRepos.searchParams, label });
  }

  const updateLanguage = (language: Language) => {
    githubRepos.setSearchParams({ ...githubRepos.searchParams, language });
  }

  const searchRepositories = useCallback((): void => {
    githubRepos.searchRepositories(paginator, updatePaginator)
  }, [ paginator, updatePaginator, githubRepos ]);

  useEffect(() => {
    if (!githubSelectors.isWaiting(githubRepos) && paginator.page !== lastPaginator) {
      setLastPaginator(paginator.page);
      searchRepositories();
    }
  }, [ paginator, lastPaginator, searchRepositories, githubRepos ]);

 return (
    <>
      <label htmlFor="term" className="w-full">
        Search term:
      </label>
      <input
        type="text"
        name="term"
        id="term"
        onChange={(ev) => updateTerm(ev.target.value)}
        value={githubRepos.searchParams.label}
        className="mb-5 border border-black p-1 w-full"
      />
      <label htmlFor="language" className="w-full">
        Language:
      </label>
      <div className="flex w-full">
        <select
          name="language"
          id="language"
          onChange={(ev) => updateLanguage(stringToLanguage(ev.target.value))}
          value={githubRepos.searchParams.language}
          className="mb-5 border border-black p-1 w-9/12 flex-1"
        >
          {
            [Language.PYTHON, Language.HASKELL, Language.C, Language.RUST, Language.JAVASCRIPT]
              .map((lang: Language) => (
                <option value={lang} key={lang}>{languageToLabel(lang)}</option>
              ))
          }
        </select>
        <div className="btn btn-primary h-fit p-1 w-2/12 text-center ml-2" onClick={() => searchRepositories()}>
          Search
        </div>
      </div>
      <div className="w-full mb-1">Select the repositories you want to favorite:</div>
      <div className="card w-full bg-white p-1 relative overflow-scroll" style={{ height: "300px" }}>
        {
          githubRepos.repositories.state === RemoteDataState.LOADED
            ? <RepositorieTable repositories={githubRepos.repositories.data} withFavorite={true} />
            : <span>Repositories not loaded yet</span>
        }
        <ul className="flex justify-center my-1">
          {
            Array(paginator.numPages % MAX_REPOSITORIES_TO_SHOW).fill(1).map((start, toAdd) => {
              const page = start + toAdd;
              return (
                <li
                  onClick={() => { updatePage(page); }}
                  key={page}
                  className={`p-2 mx-2 cursor-pointer ${getClsPageSelected(page === paginator.page)}`}
                >{ page }</li>
              )
            })
          }
        </ul>
        <Loading isLoading={githubSelectors.isLoading(githubRepos)} />
      </div>
    </>
  )
}

const getClsPageSelected = (isSelected: boolean): string => (
  !isSelected ? '' : 'bg-blue-900 text-white'
)
