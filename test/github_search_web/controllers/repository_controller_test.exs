defmodule GithubSearchWeb.RepositoryControllerTest do
  use GithubSearchWeb.ConnCase

  alias GithubSearch.Service

  @create_search_attrs %{language: "some language", keyword: "keyword"}
  @create_attrs %{
    description: "some description",
    forks: 42,
    language: "some language",
    name: "some name",
    url: "some url",
    watchers: 42
  }

  def fixture(:repository) do
    {:ok, search} = Service.create_search(@create_search_attrs)

    create_attrs = @create_attrs |> Map.put(:search_id, search.id)

    {:ok, repository} = Service.create_repository(create_attrs)
    repository
  end

  describe "index" do
    test "lists all repositories", %{conn: conn} do
      conn = get(conn, Routes.repository_path(conn, :index))
      assert html_response(conn, 200) =~ "Repositories"
    end
  end
end
