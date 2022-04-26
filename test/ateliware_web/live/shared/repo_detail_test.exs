defmodule AteliwareWeb.Shared.RepoDetailTest do
  use AteliwareWeb.ConnCase
  import Phoenix.LiveViewTest
  import Mock
  alias Ateliware.GithubApi.GetRepos
  alias Ateliware.GitRepos

  test "load page elements", %{conn: conn} do
    item = item()

    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> [item] end do
      {:ok, view, _html} = live(conn, Routes.page_path(conn, :index))

      assert has_element?(view, "##{item.git_id}")
      assert has_element?(view, "[data-role=name][data-id=#{item.git_id}]", item.name)

      assert has_element?(
               view,
               "[data-role=watcher][data-id=#{item.git_id}]",
               Integer.to_string(item.watchers_count)
             )

      assert has_element?(view, "[data-role=button-action][data-id=#{item.git_id}]")
      refute has_element?(view, "[data-role=show-message][data-id=#{item.git_id}]", "Repo added!")
    end
  end

  test "when click add repo show sucess message", %{conn: conn} do
    item = item()

    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> [item] end do
      {:ok, view, _html} = live(conn, Routes.page_path(conn, :index))

      refute has_element?(
               view,
               "[data-role=show-message][data-id=#{item.git_id}]",
               "Repositório adicionado!"
             )

      view |> element("[data-role=button-action][data-id=#{item.git_id}]") |> render_click()

      assert has_element?(
               view,
               "[data-role=show-message][data-id=#{item.git_id}]",
               "Repositório adicionado!"
             )
    end
  end

  test "when repo is added should redirect", %{conn: conn} do
    item = item()

    with_mock GetRepos, get_repos: fn _language, _page, _per_page -> [item] end do
      GitRepos.create(item)
      {:ok, view, _html} = live(conn, Routes.page_path(conn, :index))

      view
      |> element("[data-role=button-action][data-id=#{item.git_id}]")
      |> render_click()
      |> follow_redirect(conn, "/show_repo/#{item.git_id}")
    end
  end

  defp item do
    %{
      git_id: :rand.uniform(10_000),
      avatar_url: "avatar_url",
      full_name: "full_name",
      watchers_count: 500,
      forks: 123,
      description: "Lorem, ipsum",
      name: "Elixir",
      open_issues: 123,
      language: "Elixir",
      url: "url"
    }
  end
end
