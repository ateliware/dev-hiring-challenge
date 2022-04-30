defmodule Ateliware.GitReposTest do
  use Ateliware.DataCase
  alias Ateliware.GitRepos

  test "create/1" do
    payload = create_repo()
    {:ok, result} = GitRepos.create(payload)

    assert result.git_id == payload.git_id
    assert result.avatar_url == payload.avatar_url
    assert result.full_name == payload.full_name
    assert result.watchers_count == payload.watchers_count
    assert result.forks == payload.forks
    assert result.description == payload.description
    assert result.name == payload.name
    assert result.open_issues == payload.open_issues
    assert result.language == payload.language
    assert result.url == payload.url
  end

  test "all/0" do
    assert [] = GitRepos.all()
  end

  test "get_saved_repos/0" do
    payload = create_repo()
    {:ok, result} = GitRepos.create(payload)

    assert result.git_id in GitRepos.get_saved_repos()
  end

  test "get_by_id/1" do
    payload = create_repo()
    GitRepos.create(payload)
    result = GitRepos.get_by_id(payload.git_id)

    assert result.git_id == payload.git_id
    assert result.avatar_url == payload.avatar_url
    assert result.full_name == payload.full_name
    assert result.watchers_count == payload.watchers_count
    assert result.forks == payload.forks
    assert result.description == payload.description
    assert result.name == payload.name
    assert result.open_issues == payload.open_issues
    assert result.language == payload.language
    assert result.url == payload.url
  end

  defp create_repo do
    %{
      git_id: 1212,
      avatar_url: "avatar_url",
      full_name: "full_name",
      watchers_count: 123,
      forks: 123,
      description: "description",
      name: "name",
      open_issues: 122,
      language: "language",
      url: "url"
    }
  end
end
