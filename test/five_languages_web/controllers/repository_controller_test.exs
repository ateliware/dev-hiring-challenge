defmodule FiveLanguagesWeb.RepositoryControllerTest do
  use FiveLanguagesWeb.ConnCase

  import Mox

  alias FiveLanguages.Search
  alias FiveLanguages.Git.Adapters.Mock
  alias FiveLanguages.DataCase

  describe "index/1" do
    test "listar os repositórios", %{conn: conn} do
      stub(Mock, :search_repositories, & DataCase.search_repositories_success/1)

      languages = ["elixir", "python", "swift", "kotlin", "javascript"]

      conn = get(conn, Routes.repository_path(conn, :index, %{"languages"  => languages}))

      assert html_response(conn, 200)
    end

    test "erro ao listar os repositórios (menos de 5 linguagens como parâmetro)", %{conn: conn} do
      languages = ["elixir", "python", "swift", "kotlin"]

      conn = get(conn, Routes.repository_path(conn, :index, %{"languages"  => languages}))

      assert json_response(conn, 417) == %{"error" => "Parâmetros inválidos"}
    end

    test "erro ao listar os repositórios (repositórios não encontrados)", %{conn: conn} do
      stub(Mock, :search_repositories, & DataCase.search_repositories_error/1)

      languages = ["elixir", "python", "swift", "kotlin", "javascript"]

      conn = get(conn, Routes.repository_path(conn, :index, %{"languages"  => languages}))

      assert json_response(conn, 404) == %{"error" => "Sem registros"}
    end
  end

  describe "show/1" do
    test "consultar repositório", %{conn: conn} do
      expect(Mock, :get_repository, & DataCase.get_repository_success/2)

      DataCase.insert_repositories(1)

      [repository] = DataCase.get_repositories()

      conn = get(conn, Routes.repository_path(conn, :show, repository))

      assert html_response(conn, 200) =~ "Dados Gerais"
    end

    test "erro ao consultar repositório (repositório não encontrado)", %{conn: conn} do
      expect(Mock, :get_repository, & DataCase.get_repository_error/2)

      DataCase.insert_repositories(1)

      [repository] = DataCase.get_repositories()


      conn = get(conn, Routes.repository_path(conn, :show, repository))

      assert json_response(conn, 404) == %{"error" => "Sem registro"}
    end
  end
end
