defmodule ExHubWeb.LiveView.Test do
  use ExHubWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import Phoenix.ConnTest
  import Mox

  setup :verify_on_exit!

  @repository %{
    name: "ExHub",
    description: "GitHub Fetcher",
    stargazers_count: "999999",
    forks: "246524",
    watchers_count: "355313",
    open_issues: "12",
    html_url: "www.github.com/exhub",
    language: "Elixir",
    owner: %{avatar_url: "www.avatar.com"}
  }

  # Renders the DisplayComponent
  defp render_component(conn) do
    # Renders the SearchLive view
    {:ok, view, _html} = live(conn, "/")

    expect(ExHub.ServerMock, :request, fn _ ->
      {:ok,
       [
         %{
           name: @repository.name,
           description: @repository.description,
           stargazers_count: @repository.stargazers_count
         }
       ]}
    end)

    # Clicks the Search button so it renders the component
    {view, render_click(view, :search, %{"request" => %{"language" => "Elixir"}})}
  end

  describe "SearchLive and DisplayComponent '/' route" do
    test "connecting and mounting", %{conn: conn} do
      # Renders the SearchLive view
      {:ok, view, html} = live(conn, "/")

      assert html =~ "<h1>Select Language</h1>"
      assert view.module == ExHubWeb.SearchLive

      # Asserts that each language has been rendered
      Enum.each(ExHub.Request.languages(), fn language ->
        assert html =~ language
      end)
    end

    test "searching for repositories", %{conn: conn} do
      # Renders the DisplayComponent
      {_view, html} = render_component(conn)

      # Asserts that the component has been rendered
      assert html =~ "Elixir&#39;s repositories ranked by stars"
      assert html =~ "ExHub"
      assert html =~ "GitHub Fetcher"
      assert html =~ "999999"
    end

    test "redirecting to the main page when go back is clicked", %{conn: conn} do
      {view, _html} = render_component(conn)

      # Clicks the anchor tag
      assert view
             |> element("a", "Go Back")
             |> render_click()

      # Asserts that the view has been redirected
      assert_redirect(view, "/")
    end
  end

  describe "DisplayLive '/display' route" do
    test "display", %{conn: conn} do
      # Renders the DisplayLive view
      {:ok, view, html} = live(conn, Routes.live_path(conn, ExHubWeb.DisplayLive, @repository))

      # Asserts that the LiveView rendered the repository that has been passed as a param
      assert view.module == ExHubWeb.DisplayLive
      assert html =~ @repository.name
      assert html =~ @repository.description
      assert html =~ @repository.stargazers_count
      assert html =~ @repository.watchers_count
      assert html =~ @repository.open_issues
      assert html =~ @repository.language
      assert html =~ @repository.html_url
      assert html =~ @repository.owner.avatar_url
    end

    test "rerendering display component when go back is clicked", %{conn: conn} do
      # Renders the DisplayLive view
      {:ok, view, _html} = live(conn, Routes.live_path(conn, ExHubWeb.DisplayLive, @repository))

      # Clicks the anchor tag
      assert view
             |> element("a", "Go Back")
             |> render_click()

      # Asserts that the view has been patched
      assert_patch(view, "/?language=#{@repository.language}")
    end
  end
end
