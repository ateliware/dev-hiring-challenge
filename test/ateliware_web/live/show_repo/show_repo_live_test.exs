defmodule AteliwareWeb.ShowRepoLiveTest do
  use AteliwareWeb.ConnCase
  import Phoenix.LiveViewTest
  alias Ateliware.GitRepos

  test "load show repo", %{conn: conn} do
    item = create_item()
    {:ok, view, _html} = live(conn, Routes.show_repo_path(conn, :index, item.git_id))

    assert has_element?(view, "##{item.id}")
  end

  defp create_item do
    gen_payload =
      &%{
        git_id: :rand.uniform(10_000),
        avatar_url: "avatar_url - #{&1}",
        full_name: "full_name - #{&1}",
        watchers_count: 123,
        forks: 123,
        description: "description - #{&1}",
        name: "name - #{&1}",
        open_issues: 123,
        language: "language - #{&1}",
        url: "url - #{&1}"
      }

    {:ok, item} = GitRepos.create(gen_payload.(1))
    item
  end
end
