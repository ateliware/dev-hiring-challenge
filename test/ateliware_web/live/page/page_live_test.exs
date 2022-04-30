defmodule AteliwareWeb.PageLiveTest do
  use AteliwareWeb.ConnCase
  import Phoenix.LiveViewTest
  import Mock
  alias Ateliware.GithubApi.GetRepos
  alias Ateliware.GitRepos

  test "load page elements", %{conn: conn} do
    items = items()

    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> items end do
      items |> hd |> GitRepos.create()
      {:ok, view, _html} = live(conn, Routes.page_path(conn, :index))

      assert has_element?(view, "[data-role=btn-language-select][data-id=elixir]", "Elixir")

      assert has_element?(
               view,
               "[data-role=btn-language-select][data-id=javascript]",
               "Javascript"
             )

      assert has_element?(view, "[data-role=btn-language-select][data-id=ruby]", "Ruby")
      assert has_element?(view, "[data-role=btn-language-select][data-id=python]", "Python")
      assert has_element?(view, "[data-role=btn-language-select][data-id=vue]", "Vue")
      assert has_element?(view, "##{items |> hd |> then(& &1.git_id)}")
    end
  end

  test "select pages", %{conn: conn} do
    items = items()

    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> items end do
      {:ok, view, _html} = live(conn, Routes.page_path(conn, :index))

      view
      |> element("[data-role=btn-language-select][data-id=vue]", "Vue")
      |> render_click()
      |> follow_redirect(conn, "/?language=vue")
    end
  end

  test "error message", %{conn: conn} do
    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> {:error, "test message"} end do
      {:ok, _view, html} = live(conn, Routes.page_path(conn, :index))

      assert html =~ "test message"
    end
  end

  test "test lload-repos-hook with hooks", %{conn: conn} do
    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> items() end do
      {:ok, view, _html} = live(conn, Routes.page_path(conn, :index))

      assert view
             |> element("#all-repos")
             |> render()
             |> Floki.parse_fragment!()
             |> Floki.find(".p-4")
             |> Enum.count() == 20

      view
      |> element("#load-repos")
      |> render_hook("load-repos", %{})

      assert view
             |> element("#all-repos")
             |> render()
             |> Floki.parse_fragment!()
             |> Floki.find(".p-4")
             |> Enum.count() == 30
    end
  end

  defp items do
    Enum.map(
      1..10,
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
    )
  end
end
