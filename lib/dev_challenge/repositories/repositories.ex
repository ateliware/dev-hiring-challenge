defmodule DevChallenge.Repositories.Featured do
  import Ecto.Query
  alias DevChallenge.Repositories.Repository
  alias DevChallenge.Services.GithubService
  alias DevChallenge.Repo
  alias DevChallenge.Helpers.MapHelper
  @languages ["Elixir", "Ruby", "Python", "JavaScript", "Rust"]
  def get_languages() do
    @languages
    |> Enum.map(&get_repos(&1, true))
  end

  def store_data(params) do
    in_database =
      Repository
      |> Repo.get_by(name: params["name"])

    case in_database do
      %Repository{} ->
        in_database
        |> Repository.changeset(params)
        |> Repo.insert_or_update()

      nil ->
        %Repository{}
        |> Repository.changeset(params)
        |> Repo.insert_or_update()
    end
  end

  def get_repos(language, only_db \\ false) do
    data =
      Repository
      |> where([repo], like(repo.language, ^"%#{language}%"))
      |> select([repo], repo)
      |> limit([repo], 2)
      |> Repo.all()

    case data do
      [] ->
        (!only_db && get_repos_from_api(language)) ||
          %{
            language: language,
            repos: []
          }

      repos ->
        cond do
          !only_db && length(repos) < 2 ->
            get_repos_from_api(language)

          true ->
            %{
              language: language,
              repos: Enum.map(repos, &Map.put(&1, :saved, true))
            }
        end
    end
  end

  def get_repos_from_api(language) do
    case GithubService.get_repositories(language, 2) do
      {:ok, repos} ->
        index = MapHelper.get_index(@languages, language)

        Enum.filter(get_languages(), fn i -> i.language != language end)
        |> List.insert_at(index, %{
          language: language,
          repos: repos
        })

      _error ->
        get_languages()
    end
  end

  def delete_repo(id) do
    Repository
    |> Repo.get!(id)
    |> Repo.delete()
  end

  def teste_env() do
    DevChallenge.get_env!("GITHUB_BASE_URL")
    |> IO.inspect()
  end
end
