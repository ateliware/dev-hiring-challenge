defmodule AteliwareWeb.RepoLiveTest do
  use AteliwareWeb.ConnCase
  import Phoenix.LiveViewTest
  alias Ateliware.GitRepos

  test "load repo elements", %{conn: conn} do
    items = items()
    {:ok, view, _html} = live(conn, Routes.repo_path(conn, :index))

    Enum.each(items, fn item ->
      assert has_element?(view, "##{item.git_id}")
    end)
  end

  defp items do
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

    Enum.map(
      1..5,
      fn n ->
        {:ok, item} = GitRepos.create(gen_payload.(n))
        item
      end
    )
  end
end
