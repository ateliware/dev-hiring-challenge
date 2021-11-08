defmodule GithubMiner.RepositoriesTest do
  use GithubMiner.DataCase

  alias GithubMiner.Repositories

  describe "repositories" do
    alias GithubMiner.Repositories.Repository

    @valid_attrs %{
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

    def repository_fixture(attrs \\ %{}) do
      {:ok, repository} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Repositories.create_repository()

      repository
    end

    test "list_repositories/0 returns all repositories" do
      repository = repository_fixture()
      assert Repositories.list_repositories() == [repository]
    end

    test "get_repository!/1 returns the repository with given id" do
      repository = repository_fixture()
      assert Repositories.get_repository!(repository.id) == repository
    end

    test "create_repository/1 with valid data creates a repository" do
      assert {:ok, %Repository{} = repository} = Repositories.create_repository(@valid_attrs)
      assert repository.avatar_url == "some avatar_url"
      assert repository.forks == 42
      assert repository.full_name == "some full_name"
      assert repository.language == "some language"
      assert repository.login == "some login"
      assert repository.repository_id == 42
      assert repository.stargazers_count == 42
      assert repository.type == "some type"
      assert repository.watchers_count == 42
    end

    test "create_repository/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Repositories.create_repository(@invalid_attrs)
    end

    test "update_repository/2 with valid data updates the repository" do
      repository = repository_fixture()

      assert {:ok, %Repository{} = repository} =
               Repositories.update_repository(repository, @update_attrs)

      assert repository.avatar_url == "some updated avatar_url"
      assert repository.forks == 43
      assert repository.full_name == "some updated full_name"
      assert repository.language == "some updated language"
      assert repository.login == "some updated login"
      assert repository.repository_id == 43
      assert repository.stargazers_count == 43
      assert repository.type == "some updated type"
      assert repository.watchers_count == 43
    end

    test "update_repository/2 with invalid data returns error changeset" do
      repository = repository_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Repositories.update_repository(repository, @invalid_attrs)

      assert repository == Repositories.get_repository!(repository.id)
    end

    test "delete_repository/1 deletes the repository" do
      repository = repository_fixture()
      assert {:ok, %Repository{}} = Repositories.delete_repository(repository)
      assert_raise Ecto.NoResultsError, fn -> Repositories.get_repository!(repository.id) end
    end

    test "change_repository/1 returns a repository changeset" do
      repository = repository_fixture()
      assert %Ecto.Changeset{} = Repositories.change_repository(repository)
    end
  end
end
