defmodule GithubMiner.Github do
  use Tesla

  # @token Application.get_env(:teste, :github_api_token)

  plug Tesla.Middleware.BaseUrl, "https://api.github.com"
  # plug Tesla.Middleware.Headers, [{"authorization", "token #{@token}"}]
  plug Tesla.Middleware.JSON

  @doc """
    Retorna o repositório de um usuário informado.
  """
  def user_repos(user) do
    get("/users/" <> user <> "/repos")
  end

  @doc """
    Retorna repositórios públicos
  """
  def search_all_repositories do
    get("/repositories")
  end

  def smart_search_repo(lang) do
    Tesla.build_url("https://api.github.com/search/repositories?q=language:#{lang}",
      sort: "stars",
      per_page: 5
    )
    |> Tesla.get()
  end
end
