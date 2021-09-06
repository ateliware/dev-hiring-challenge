defmodule GhTopRepos.GithubClientTest do

  use ExUnit.Case, async: true

  alias GhTopRepos.{GithubClient, GithubError}


  test "fetch repositories failed: bad query" do

    json = GithubClient.fetch_repos("")

    error = struct(GithubError, json)

    [e | _] = error.errors
    assert e.code == "missing"
    assert e.field == "q"
    assert error.message == "Validation Failed"
  end


  test "fetch repositories succeeded" do
    query = URI.encode "elixir stars:>=200&per_page=2"
    json = GithubClient.fetch_repos(query)

    assert true
  end
end
