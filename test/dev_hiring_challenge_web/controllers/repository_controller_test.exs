defmodule DevHiringChallengeWeb.RepositoryControllerTest do
  use DevHiringChallengeWeb.ConnCase, async: true
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney
  use AssertHTML

  import DevHiringChallenge.Factory

  describe "GET repositories" do
    test "Show top 5 default repositories", %{conn: conn} do
      use_cassette "search_top_ruby_repos_successfully" do
        conn = get(conn, "/repositories")
        assert conn.status == 200

        html_response(conn, 200)
        |> assert_html("h2", "Top 5 Repositorios do GitHub")
        |> assert_html("h5", count: 5)
        |> assert_html(".button-active", count: 1, text: "Ruby")
      end
    end

    test "Show top 5 python repositories", %{conn: conn} do
      use_cassette "search_top_python_repos_successfully" do
        conn = get(conn, "/repositories", %{language: "Python"})
        assert conn.status == 200

        html_response(conn, 200)
        |> assert_html("h2", "Top 5 Repositorios do GitHub")
        |> assert_html("h5", count: 5)
        |> assert_html(".button-active", count: 1, text: "Python")
      end
    end
  end

  describe "GET favorites" do
    test "Show no favorite repository", %{conn: conn} do
      conn = get(conn, "/favorites")
      assert conn.status == 200

      html_response(conn, 200)
      |> assert_html("h2", "Favoritos")
      |> refute_html("h5")
    end

    test "Show a single favorite repository", %{conn: conn} do
      insert(:repository)
      conn = get(conn, "/favorites")
      assert conn.status == 200

      html_response(conn, 200)
      |> assert_html("h2", "Favoritos")
      |> assert_html("h5", count: 1, text: "repo")
    end
  end

  describe "CREATE repository" do
    test "Create a new repository and check favorites", %{conn: conn} do
      use_cassette "search_top_ruby_repos_successfully" do
        params = %{
          "name" => "Repo",
          "description" => "repo",
          "html_url" => "www.repo.com",
          "language" => "Ruby",
          "stargazers_count" => 123
        }

        conn = post(conn, "/repositories", repo: params)
        assert conn.status == 302

        assert redirected_to(conn) == "/repositories"

        conn = get(conn, "/repositories", language: "Ruby")

        html_response(conn, 200)
        |> assert_html("h2", "Top 5 Repositorios do GitHub")
        |> assert_html("h5", count: 5)
        |> assert_html(".button-active", count: 1, text: "Ruby")
        |> assert_html(".alert-info", "Repositorio Repo adicionado aos favoritos!")

        conn = get(conn, "/favorites")

        html_response(conn, 200)
        |> assert_html("h2", "Favoritos")
        |> assert_html("h5", count: 1, text: "repo")
      end
    end
  end

  describe "DELETE repository" do
    test "Delete a repository and check favorites", %{conn: conn} do
      insert(:repository, id: 1)

      conn = delete(conn, "/repositories/1")
      assert conn.status == 302

      assert redirected_to(conn) == "/favorites"

      conn = get(conn, "/favorites")

      html_response(conn, 200)
      |> assert_html("h2", "Favoritos")
      |> refute_html("h5")
      |> assert_html(".alert-info", "Repositorio Repo removido dos favoritos!")
    end
  end
end
