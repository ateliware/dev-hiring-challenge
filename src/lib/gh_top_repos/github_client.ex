defmodule GhTopRepos.GithubClient do

  @api_url "api.github.com"
  @repos_search_path "/search/repositories?"


  alias GhTopRepos.HttpClient, as: Http
  alias GhTopRepos.GithubError


  @doc """
  Performs a GET request to the Gihub API, returning repositories.

  Requests support pagination, according to parameters.

  The query parameter must contain at least the `:text` key.

  Query example (map or keyword list)
  %{
    text: "oauth lib",
    stars: 20,            # at least 20 stars
    forks: 10,            # at least 10 forks
    language: "haskell"
  }  

  It returns a tuple with either a Map or a GithubError struct.

  Returns `{:ok, %{
    items: []
    total_count: 0
  }}`
  
  """
  def fetch_repos(query, page \\ 1, per_page \\ 10) do
    query_pag = build_query(query) ++ [page: page, per_page: per_page]
    query_str = URI.encode_query(query_pag)

    {:ok, conn} = Http.connect(@api_url, :https)
    {:ok, json} = Http.get_json(conn, @repos_search_path <> query_str)

    if Map.has_key?(json, :errors) do
      {:error, struct(GithubError, json)}
    else  
      repos = Enum.map(json.items, fn item ->
        if Map.has_key?(item, :id) do
          Map.put(item, :github_id, item[:id])
        else
          item
        end
      end)

      {:ok, %{items: repos, total_count: json.total_count}}
    end
  end
  
  @doc """
  Parses the query map or keyword list into a Github query string.
  
  Returns `[q: query_str]`
  """
  defp build_query(q) do
    text = q[:text]

    gte = ">="
    # valid Github qualifiers to include in the search string,
    # this list of tuples may include an operator, in this case
    # gte or >=
    qualifiers = [{"stars", gte},
                  {"forks", gte}, {"language", ""}, {"followers", gte}]

    qual_str = Enum.reduce(qualifiers, "",
      fn qual, acc ->
        {k, op} = qual
        kw = String.to_atom(k)

        if Keyword.has_key?(q, kw) do
          acc <> " #{k}:#{op}#{q[kw]}"
        else
          acc
        end
      end)

    # returns a query keyword list with the full text query
    [q: text <> qual_str]
  end
end

defmodule GhTopRepos.GithubError do
  defstruct documentation_url: nil,
            errors: [],
            message: nil
end
