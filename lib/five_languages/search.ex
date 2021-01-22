defmodule FiveLanguages.Search do
  @moduledoc """
  The Search context.
  """

  import Ecto.Query, warn: false
  alias FiveLanguages.Repo

  alias FiveLanguages.Search.Repository
  alias FiveLanguages.Git

  @doc """
  Retorna a listagem de repositórios com mais estrelas de cinco linguagens.

  ## Examples
      iex> list_main_repositories(["elixir", "python", "swift", "kotlin", "javascript"])
      {:ok, [%Repository{}, ...]}

  """
  def list_main_repositories(languages) when is_list(languages) do
    Repository
    |> Repo.all()
    |> case do
      result when length(result) >= 5 ->
        {:ok, result}

      _ ->
        sync_main_repositories(languages)
    end
  end

  @doc """
  Consulta e salva os repositórios com mais estrelas de cinco linguagens.

  ## Examples
      iex> sync_main_repositories(["elixir", "python", "swift", "kotlin", "javascript"])
      [%Repository{}, ...]

  """
  def sync_main_repositories(languages) do
    Repo.delete_all(Repository)

    languages
    |> Task.async_stream(fn language ->
      [
        q: "language:#{language}",
        per_page: 1,
        sort: "stars",
        order: "desc"
      ]
      |> search_repositories()
      |> case do
        {:ok, %{items: items}} ->
          items
          |> Enum.at(0)
          |> insert_repository()

        error ->
          error
      end
    end, timeout: 60_000 )
    |> Stream.into(%{})
    |> Enum.map(fn {:ok, item} -> item end)
    |> Enum.filter(& is_map/1)
    |> case do
      [] ->
        {:error, []}

      repositories ->
        {:ok, repositories}
    end
  end

  defp search_repositories(params) do
    params
    |> Git.search_repositories()
    |> case do
      {:ok, %{"items" => items}} ->
        {:ok, items}

      error ->
        error
    end
  end

  @doc """
  Gets a single repository.

  Raises `Ecto.NoResultsError` if the Repository does not exist.

  ## Examples

      iex> get_repository!(123)
      %Repository{}

      iex> get_repository!(456)
      ** (Ecto.NoResultsError)

  """
  def get_repository(id) do
    Repository
    |> where(id: ^id)
    |> Repo.one()
    |> case do
      nil ->
        {:error, :not_found}

      repository ->
        Git.get_repository(repository)
    end
  end

  defp insert_repository(repository) do
    repository =
      repository
      |> Map.update(:owner, "", & Map.get(&1, :login))
      |> Map.put(:git_id, Map.get(repository, :id))

    %Repository{}
    |> Repository.changeset(repository)
    |> Repo.insert!()
  end
end
