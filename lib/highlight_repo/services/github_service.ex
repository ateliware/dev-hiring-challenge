defmodule HighlightRepo.Services.GithubService do
  @moduledoc """
  GithubService
  """
  @github_repos_api "https://api.github.com/search/repositories"

  defp call_github_api(language) do
    url = @github_repos_api <> "?q=language:#{language}&sort=stars&order=desc&page=1&per_page=10"

    {:ok, response} = HTTPoison.get(url)

    case response.status_code == 200 do
      true -> Jason.decode(response.body)
      false -> {:error, "Github api not available at the moment, please try again later"}
    end
  end

  @spec get_repos_by_language(any) :: any
  def get_repos_by_language(language) do
    case call_github_api(language) do
      {:ok, repos} ->
        {:ok, repos["items"]}

      {:error, message} ->
        {:error, message}
    end
  end
end
