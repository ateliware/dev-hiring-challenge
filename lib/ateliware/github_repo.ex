defmodule Ateliware.GithubRepo do
  @moduledoc """
  Database access layer for `:github_repo` and `:language` schema
  """
  import Ecto.Query
  alias Ateliware.External.Github, as: GithubAPI
  alias Ateliware.Repo
  alias Ateliware.Schemas.GithubRepo
  alias Ateliware.Schemas.Language
  alias Ecto.Multi

  @doc """
  get all stored programming languages in the db
  """
  @spec get_languages() :: [Language.t()]
  def get_languages, do: Repo.all(Language)

  @spec get_language_top_repos(Language.t()) :: Language.t()
  def get_language_top_repos(language), do: Repo.preload(language, :github_repos)

  def update_repos do
    languages = Repo.all(from(l in Language, preload: :github_repos))
    Enum.map(languages, &fetch_repos/1)
  end

  defp fetch_repos(language) do
    case GithubAPI.get_repos(per_page: 5, language: language.name, order: :stars) do
      {:error, _} ->
        language

      {:ok, %{items: repos}} ->
        repos = Enum.map(repos, &GithubRepo.apply_changeset_and_to_map(&1, language.id))
        update_repos_for_language(repos, language.id)
        Map.put(language, :github_repos, repos)
    end
  end

  defp update_repos_for_language(repos, language_id) do
    lang_repos = from(git_repo in GithubRepo, where: git_repo.language_id == ^language_id)

    {:ok, _} =
      Multi.new()
      |> Multi.delete_all(:detete_repos, lang_repos)
      |> Multi.insert_all(:insert_new_repos, GithubRepo, repos)
      |> Repo.transaction()
  end
end
