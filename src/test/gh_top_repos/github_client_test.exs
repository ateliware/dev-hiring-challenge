defmodule GhTopRepos.GithubClientTest do

  use ExUnit.Case, async: true

  alias GhTopRepos.{GithubClient, GithubError}


  test "fetch repositories failed: bad query" do

    json = GithubClient.fetch_repos([text: ""])

    error = struct(GithubError, json)

    [e | _] = error.errors
    assert e.code == "missing"
    assert e.field == "q"
    assert error.message == "Validation Failed"
  end


  test "fetch repositories succeeded" do
    query = [text: "elixir", stars: 200]
    json = GithubClient.fetch_repos(query, 1, 2)

    assert length(json.items) == 2
  end
end
