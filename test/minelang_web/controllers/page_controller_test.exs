defmodule MinelangWeb.PageControllerTest do
  use MinelangWeb.ConnCase

  import Mock

  alias Minelang.{Repo, Repository}

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end


  describe "POST /" do
    setup do
      Ecto.Adapters.SQL.Sandbox.mode(Repo, {:shared, self()})
    end

    test "inserts one or more repos and mine", %{conn: conn} do
      assert [] == Repo.all(Repository)
      body = body()
      with_mocks([
        {HTTPoison, [], [get: fn _ -> {:ok, %{body: body, status_code: 200}} end]},
        {Poison, [], [decode!: fn _ -> [body] end]}
      ]) do
        post conn, "/", %{"orgs" => "fake"}
        Process.sleep(2000)
        [repo] = Repo.all(Repository)
        assert body["name"] == repo.name
        assert body["description"] == repo.description
        assert body["stargazers_count"] == repo.stargazers_count
        assert body["watchers_count"] == repo.watchers_count
        assert body["open_issues"] == repo.open_issues
        assert body["forks"] == repo.forks
        assert body["license"]["name"] == repo.license
      end
    end
  end

  defp body do
    %{
      "name" => "fake",
      "description" => "fake description",
      "stargazers_count" => 1,
      "watchers_count" => 2,
      "open_issues" => 3,
      "forks" => 4,
      "license" => %{"name" => "All free"}
    }
  end
end
