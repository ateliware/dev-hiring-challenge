import { useEffect, useState } from "react";
import { Language, languageToLabel, stringToLanguage, useGithubRepositories } from "../../libs/github";
import { Repositorie } from "../../libs/repositorie";

const MAX_REPOSITORIES_TO_SHOW = 10

export const SearchGithub = (): JSX.Element => {
  const { repositories, paginator, updatePage, searchParams, searchRepositories, setSearchParams, isLoading } = useGithubRepositories({
    label: "",
    language: Language.PYTHON,
  });
  const [ lastPaginator, setLastPaginator ] = useState<number>(paginator.page);

  const updateTerm = (label: string) => {
    setSearchParams({ ...searchParams, label });
  }

  const updateLanguage = (language: Language) => {
    setSearchParams({ ...searchParams, language });
  }

  useEffect(() => {
    if (repositories.length > 0 && lastPaginator !== paginator.page) {
      searchRepositories(paginator);
      setLastPaginator(paginator.page);
    }
  }, [ paginator, lastPaginator, repositories, searchRepositories, setLastPaginator ]);

 return (
    <>
      <label htmlFor="term" className="w-full">
        Term:
      </label>
      <input
        type="text"
        name="term"
        id="term"
        onChange={(ev) => updateTerm(ev.target.value)}
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
          className="mb-5 border border-black p-1 w-9/12 flex-1"
        >
          {
            [Language.PYTHON, Language.HASKELL, Language.C, Language.RUST, Language.JAVASCRIPT]
              .map((lang: Language) => (
                <option value={lang} key={lang}>{languageToLabel(lang)}</option>
              ))
          }
        </select>
        <div className="btn btn-primary h-fit p-1 w-2/12 text-center ml-2" onClick={() => searchRepositories(paginator)}>
          Pesquisar
        </div>
      </div>
      <div className="w-full mb-1">Select the repositories you want to favorite:</div>
      <div className="card w-full bg-white p-1 relative overflow-scroll" style={{ height: "300px" }}>
        <table className="w-full">
          <thead>
            <tr>
              <td className="card p-1">Name</td>
              <td className="card p-1 w-1/2">Description</td>
              <td className="card p-1">Created at</td>
              <td className="card p-1">Fav</td>
            </tr>
          </thead>
          <tbody>
            {
              repositories.map((repositorie: Repositorie) => (
                <tr key={repositorie.id}>
                  <td className="p-1 bg-slate-100 align-top">{wrapText(repositorie.full_name, 120)}</td>
                  <td className="p-1 bg-slate-100 align-top">{wrapText(repositorie.description, 120)}</td>
                  <td className="p-1 bg-slate-100 align-top">{repositorie.created_at}</td>
                  <td className="p-1 text-center btn btn-primary text-yellow-300 text-2xl t-shadow">★</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <ul className="flex justify-center my-1">
          {
            Array(paginator.numPages % MAX_REPOSITORIES_TO_SHOW).fill(1).map((neutral, toAdd) => {
              const page = neutral + toAdd;
              return <li onClick={() => { updatePage(page); }} key={page} className={`p-2 mx-2 cursor-pointer ${getClsPageSelected(page === paginator.page)}`}>{page}</li>
            })
          }
        </ul>
        <div className={`${isLoading ? "block" : "hidden"} absolute w-full h-full bg-neutral-600 flex top-0 left-0`}>
          <div>Loading...</div>
        </div>
      </div>
    </>
  )
}

const wrapText = (value: string, trimIndex: number): string => (
  value.length < trimIndex ? value : `${value.slice(0, trimIndex)}...`
)

const getClsPageSelected = (isSelected: boolean): string => (
  !isSelected ? '' : 'bg-blue-900 text-white'
)
