defmodule FiveLanguages.Git.Adapters.GitHubTest do
  use FiveLanguages.DataCase

  import Mox

  alias FiveLanguages.Git.Adapters.GitHub
  alias FiveLanguages.Git.Adapters.Mock
  alias FiveLanguages.DataCase

  describe "search_repositories/1" do
    test "retorna os repositórios" do
      result = GitHub.search_repositories([q: "language:elixir"])

      assert {:ok, %{items: items}} = result

      assert Enum.count(items) > 0
    end

    test "erro na consulta dos repositórios" do
      result = GitHub.search_repositories([])

      assert {:error, :unprocessable_entity} == result
    end
  end

  describe "get_repository/2" do
    test "retorna o repositório" do
      result = GitHub.get_repository(%{owner: "fernandomrs", name: "five_languages"})

      assert {:ok, %{owner: %{login: "fernandomrs"}}} = result
    end

    test "erro na consulta do repositório" do
      result = GitHub.get_repository(%{owner: "fernandomrs", name: "nunca_vou_ter_esse_repo"})

      assert {:error, :another_error} == result
    end
  end
end
