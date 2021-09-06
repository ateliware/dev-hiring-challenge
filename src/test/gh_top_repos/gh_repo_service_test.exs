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


  test "save method succeed, all ok" do
    repo_name = "Repo 1"
    repo = %{name: repo_name,
             html_url: "https://repo.url/html",
             url: "https://repo.url"}

    {:ok, result} = Service.save(repo)

    assert repo_name == result.name
  end
end

