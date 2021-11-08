defmodule GithubMinerWeb.RepositoryControllerTest do
  use GithubMinerWeb.ConnCase

  alias GithubMiner.Repositories
  alias GithubMiner.Repositories.Repository

  @create_attrs %{
    avatar_url: "some avatar_url",
    forks: 42,
    full_name: "some full_name",
    language: "some language",
    login: "some login",
    repository_id: 42,
    stargazers_count: 42,
    type: "some type",
    watchers_count: 42
  }
  @update_attrs %{
    avatar_url: "some updated avatar_url",
    forks: 43,
    full_name: "some updated full_name",
    language: "some updated language",
    login: "some updated login",
    repository_id: 43,
    stargazers_count: 43,
    type: "some updated type",
    watchers_count: 43
  }
  @invalid_attrs %{
    avatar_url: nil,
    forks: nil,
    full_name: nil,
    language: nil,
    login: nil,
    repository_id: nil,
    stargazers_count: nil,
    type: nil,
    watchers_count: nil
  }

  def fixture(:repository) do
    {:ok, repository} = Repositories.create_repository(@create_attrs)
    repository
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all repositories", %{conn: conn} do
      conn = get(conn, Routes.repository_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create repository" do
    test "renders repository when data is valid", %{conn: conn} do
      conn = post(conn, Routes.repository_path(conn, :create), repository: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.repository_path(conn, :show, id))

      assert %{
               "id" => id,
               "avatar_url" => "some avatar_url",
               "forks" => 42,
               "full_name" => "some full_name",
               "language" => "some language",
               "login" => "some login",
               "repository_id" => 42,
               "stargazers_count" => 42,
               "type" => "some type",
               "watchers_count" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.repository_path(conn, :create), repository: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update repository" do
    setup [:create_repository]

    test "renders repository when data is valid", %{
      conn: conn,
      repository: %Repository{id: id} = repository
    } do
      conn =
        put(conn, Routes.repository_path(conn, :update, repository), repository: @update_attrs)

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.repository_path(conn, :show, id))

      assert %{
               "id" => id,
               "avatar_url" => "some updated avatar_url",
               "forks" => 43,
               "full_name" => "some updated full_name",
               "language" => "some updated language",
               "login" => "some updated login",
               "repository_id" => 43,
               "stargazers_count" => 43,
               "type" => "some updated type",
               "watchers_count" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, repository: repository} do
      conn =
        put(conn, Routes.repository_path(conn, :update, repository), repository: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete repository" do
    setup [:create_repository]

    test "deletes chosen repository", %{conn: conn, repository: repository} do
      conn = delete(conn, Routes.repository_path(conn, :delete, repository))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.repository_path(conn, :show, repository))
      end
    end
  end

  defp create_repository(_) do
    repository = fixture(:repository)
    %{repository: repository}
  end
end
