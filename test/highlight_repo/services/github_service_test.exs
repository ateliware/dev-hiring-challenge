defmodule HighlightRepo.Services.GithubServiceTest do
  use HighlightRepo.DataCase
  alias HighlightRepo.Services.GithubService

  @language "elixir"

  test "get_repos_by_language/1 will return github api response" do
    {:ok, resp} = GithubService.get_repos_by_language(@language)
    assert resp |> Enum.count() == 10
  end

  test "get_repos_by_language/1 will return github api with error" do
    repo = GithubService.get_repos_by_language("")

    assert repo == {:error, "Github api not available at the moment, please try again later"}
  end
end
