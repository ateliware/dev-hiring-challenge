defmodule Ateliware.GithubRepo do
  @moduledoc """
  Database access layer for `:github_repo` and `:language` schema
  """
  import Ecto.Query
  alias Ateliware.Schemas.Language
  alias Ateliware.Schemas.GithubRepo
  alias Ateliware.External.Github, as: GithubAPI
  alias Ateliware.Repo
  alias Ecto.Multi

  @spec get_languages_top_repos() :: [Language]
  @doc """
  Gets a list of stored programming languages and joins a list of top `%GithubRepo{}`
  fetched from the github api

  ### opts:
  `:update_repos` if true, refetches the github api and updates the stored data, defaults to `false`
  """
  def get_languages_top_repos(opts \\ []) do
    languages = Repo.all(from(l in Language, preload: :github_repos))

    if Keyword.get(opts, :update_repos, false) do
      update_repos(languages)
    else
      languages
    end
  end

  defp update_repos(languages) do
    Enum.map(languages, &fetch_repos/1)
  end

  defp fetch_repos(language) do
    case GithubAPI.get_repos(per_page: 4, language: language.name, order: :stars) do
      {:error, _} -> language
      {:ok, %{items: repos}} ->

        repos = Enum.map(repos, &(GithubRepo.apply_changeset_and_to_map(&1, language.id)))
        Task.start(fn -> update_repos_for_language(repos, language.id) end)
        Map.put(language, :github_repos, repos)
    end
  end

  defp update_repos_for_language(repos, language_id) do
        lang_repos = from(git_repo in GithubRepo, where: git_repo.language_id == ^language_id)

        {:ok, _} = Multi.new()
          |> Multi.delete_all(:detete_repos, lang_repos)
          |> Multi.insert_all(:insert_new_repos, GithubRepo, repos)
          |> Repo.transaction()
  end
end
