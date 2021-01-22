defmodule FiveLanguages.SearchTest do
  use FiveLanguages.DataCase

  import Mox

  alias FiveLanguages.Search
  alias FiveLanguages.Git.Adapters.Mock
  alias FiveLanguages.DataCase

  describe "repositories" do
    test "list_main_repositories/1 retorna todos os repositórios após primeira consulta" do
      expect(Mock, :search_repositories, & DataCase.search_repositories_success/1)

      repositories = DataCase.get_repositories()

      assert Enum.empty?(repositories)

      {:ok, repositories} = Search.list_main_repositories(["teste"])

      assert Enum.count(repositories) == 1
    end

    test "list_main_repositories/1 erro na consulta no git na primeira consulta dos repositórios" do
      expect(Mock, :search_repositories, & DataCase.search_repositories_error/1)

      repositories = DataCase.get_repositories()

      assert Enum.empty?(repositories)

      assert {:error, []} == Search.list_main_repositories(["teste"])
    end

    test "list_main_repositories/1 retorna todos os repositórios após segunda consulta" do
      DataCase.insert_repositories()

      {:ok, repositories} = Search.list_main_repositories(["teste"])

      assert Enum.count(repositories) == 5
    end

    test "sync_main_repositories/1 retorna todos os repositórios" do
      expect(Mock, :search_repositories, & DataCase.search_repositories_success/1)

      {:ok, repositories} = Search.sync_main_repositories(["teste"])

      assert Enum.count(repositories) == 1
    end

    test "sync_main_repositories/1 erro na consulta de repositórios" do
      expect(Mock, :search_repositories, & DataCase.search_repositories_error/1)

      assert {:error, []} == Search.sync_main_repositories(["teste"])
    end

    test "get_repository/1 retorna o repositório de acordo com o id" do
      expect(Mock, :get_repository, & DataCase.get_repository_success/2)

      DataCase.insert_repositories()

      %{id: id} = Enum.at(DataCase.get_repositories(), 0)

      {:ok, repository} = Search.get_repository(id)

      assert is_map(repository)
    end

    test "get_repository/1 erro na consulta no git ao retornar o repositório" do
      expect(Mock, :get_repository, & DataCase.get_repository_error/2)

      DataCase.insert_repositories()

      %{id: id} = Enum.at(DataCase.get_repositories(), 0)

      assert {:error, :not_found} == Search.get_repository(id)
    end

    test "get_repository/1 erro na consulta no banco ao retornar o repositório" do
      {:error, :not_found} = Search.get_repository(1)
    end
  end
end
