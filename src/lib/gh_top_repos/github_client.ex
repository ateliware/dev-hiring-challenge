defmodule GhTopRepos.GithubClient do

  @api_url "api.github.com"
  @repos_search_path "/search/repositories?q="


  alias GhTopRepos.HttpClient, as: Http


  def fetch_repos(query) do
    {:ok, conn} = Http.connect(@api_url, :https)
    {:ok, json} = Http.get_json(conn, @repos_search_path <> query)

    json
  end
end


defmodule GhTopRepos.GithubError do
  defstruct documentation_url: nil,
            errors: [],
            message: nil
end
