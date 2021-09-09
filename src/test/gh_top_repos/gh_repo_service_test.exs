defmodule GhTopRepos.GHRepoServiceTest do

  use ExUnit.Case

  alias GhTopRepos.Repo
  alias GhTopRepos.GHRepoService, as: Service

  def dummy_repo(repo_name, url, gh_id \\ 23871) do 
    %{name: repo_name,
      html_url: "https://repo.url/html",
      url: url,
      has_pages: false,
      clone_url: url,
      size: 1168,
      forks: 129,
      commits_url: url,
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
      github_id: gh_id}
  end

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
    repo_url = "https://github.com/elixir-..."

    {:ok, result} = Service.save(dummy_repo(repo_name, repo_url))

    assert repo_name == result.name
    assert 129 == result.forks
  end


  test "save search method succeeded: return repos" do
    repo_url = "https://github.com/elixir-..."
    search_result = %{items: [dummy_repo("Repo 1", repo_url),
                              dummy_repo("Repo 2", repo_url, 298192)], total_count: 2}

    result = Service.save_from_search(search_result)
    assert result.total_count == 2
  end


  test "list by ids returns repos correctly" do
    repo_url = "https://github.com/elixir-..."
    search_result = %{items: [dummy_repo("Repo 3", repo_url, 9902),
                              dummy_repo("Repo 4", repo_url, 18389)], total_count: 2}

    result = Service.save_from_search(search_result)
    
    repos = Service.list_ids_in([9902, 18389])

    assert length(repos) == 2
  end 
end

