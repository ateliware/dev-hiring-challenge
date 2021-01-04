defmodule DevHiringChallengeWeb.RepositoryController do
  use DevHiringChallengeWeb, :controller

  alias DevHiringChallenge.GithubRepositories
  alias DevHiringChallenge.Repositories
  alias DevHiringChallenge.Repositories.Repository

  @default_count "5"
  @default_language "Ruby"

  def index(conn, params) do
    language = get_language(params)

    case GithubRepositories.Search.call(@default_count, language) do
      {:ok, repos} ->
        render(conn, "index.html", language: language, repos: repos)

      {:error, _error} ->
        conn
        |> put_flash(:error, "Ocorreu um erro :(")
        |> redirect(to: "/repositories")
    end
  end

  def create(conn, params) do
    case params["repo"] |> parse_repository() |> Repositories.create_repository() do
      {:ok, %Repository{name: name}} ->
        conn
        |> put_flash(:info, "Repositorio #{name} adicionado aos favoritos!")
        |> redirect(to: "/repositories")

      {:error, _error} ->
        conn
        |> put_flash(:error, "Ocorreu um erro :(")
        |> redirect(to: "/repositories")
    end
  end

  def delete(conn, params) do
    inspect(params)

    case Repositories.delete_repository(params["id"]) do
      {:ok, %Repository{name: name}} ->
        conn
        |> put_flash(:info, "Repositorio #{name} removido dos favoritos!")
        |> redirect(to: "/favorites")

      {:error, _error} ->
        conn
        |> put_flash(:error, "Ocorreu um erro :(")
        |> redirect(to: "/favorites")
    end
  end

  def favorites(conn, _params) do
    repos = Repositories.get_repositories()
    render(conn, "favorites.html", repos: decode_repositories(repos))
  end

  defp get_language(params), do: Map.get(params, "language") || @default_language

  defp parse_repository(params) do
    %{
      name: params["name"],
      description: params["description"],
      html_url: params["html_url"],
      language: params["language"],
      stargazers_count: params["stargazers_count"]
    }
  end

  defp decode_repositories(repos) do
    repos
    |> Enum.map(fn repo ->
      %{
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count
      }
    end)
  end
end
