defmodule GhTopRepos.GithubClientTest do

  use ExUnit.Case

  alias GhTopRepos.Repo
  alias GhTopRepos.GHRepoService, as: Service


  setup do
    # Explicitly get a connection before each test
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end


  test "save method failed, validation errors" do
    result = Service.save(%{})

    assert {"can't be blank", _} = result[:name]
  end


  test "save method succeed, validation ok" do
    repo_name = "Repo 1"
    repo = %{name: repo_name,
             html_url: "https://repo.url/html",
             url: "https://repo.url"}

    {:ok, result} = Service.save(repo)

    assert repo_name == result.name
  end


  test "save method succeed, extra properties" do
    repo_name = "Repo 1"
    dummy_url = "https://github.com/elixir-..."
    repo = %{name: repo_name,
             html_url: "https://repo.url/html",
             url: dummy_url,
             has_pages: false,
             clone_url: dummy_url,
             size: 1168,
             forks: 129,
             commits_url: dummy_url,
             stargazers_count: 1226,
             has_wiki: false,
             archive_url: "https://api.githuy/{archive_format}{/ref}",
             has_issues: true,
             git_commits_url: "https://apiallaby/git/commits{/sha}",
             watchers_count: 1226,
             description: "Concurrent browser tests with elixir",
             full_name: "elixir-wallaby/wallaby",
             open_issues_count: 28,
             merges_url: "https://api.github.com/repos/.../wallaby/merges",
             github_id: 52619134}

    {:ok, result} = Service.save(repo)

    assert repo_name == result.name
    assert 129 == result.forks
  end
end

