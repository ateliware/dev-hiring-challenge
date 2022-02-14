defmodule HighlightRepo.Services.RepoServiceTest do
  use HighlightRepo.DataCase
  alias HighlightRepo.{GitRepos, Services.RepoService}

  @language "elixir"

  test "repos_info/1 will store into database and return" do
    {:ok, resp} = RepoService.repos_info(@language)
    assert resp |> Enum.count() == 10
    assert GitRepos.list_repos() |> Enum.count() == 10
  end

  test "repos_info/1 will return github api response" do
    assert GitRepos.list_repos() |> Enum.count() == 0

    assert RepoService.repos_info("") ==
             {:error, "Github api not available at the moment, please try again later"}
  end

  test "get_repo/1 will return repo from database" do
    {:ok, resp} = RepoService.repos_info(@language)
    {:ok, repo} = RepoService.get_repo(@language)
    assert repo == GitRepos.get_git_repo!(List.first(resp).id)
  end

  test "get_repo/1 when invalid will return error" do
    assert RepoService.get_repo("") ==
             {:error, "This repo either does no exist or was not stored in our database yet."}
  end
end
