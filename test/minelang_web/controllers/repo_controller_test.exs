defmodule MinelangWeb.RepoControllerTest do
  use MinelangWeb.ConnCase

  import Mock

  alias Minelang.{Repo, Repository}

  describe "GET /repo" do
    setup do
      Ecto.Adapters.SQL.Sandbox.mode(Repo, {:shared, self()})
    end

    test "list details about the repo", %{conn: conn} do
      {:ok, _} =
        Repo.insert(%Repository{
          name: "fake",
          org: "fake",
          description: "fake description",
          stargazers_count: 1,
          watchers_count: 2,
          open_issues: 3,
          forks: 4,
          license: "All free"
        })
      conn = get(conn, "/repo/fake")
      assert html_response(conn, 200) =~ "Welcome to Phoenix!"
    end
  end
end
