defmodule DevChallenge.RepositoriesTest do
  use DevChallenge.DataCase

  alias DevChallenge.Repositories

  describe "repositories" do
    alias DevChallenge.Repositories.Repository

    @valid_attrs %{avatar_url: "some avatar_url", description: "some description", language: "some language", name: "some name", owner_login: "some owner_login", stargazers_count: 42, url: "some url"}
    @update_attrs %{avatar_url: "some updated avatar_url", description: "some updated description", language: "some updated language", name: "some updated name", owner_login: "some updated owner_login", stargazers_count: 43, url: "some updated url"}
    @invalid_attrs %{avatar_url: nil, description: nil, language: nil, name: nil, owner_login: nil, stargazers_count: nil, url: nil}

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
      assert repository.description == "some description"
      assert repository.language == "some language"
      assert repository.name == "some name"
      assert repository.owner_login == "some owner_login"
      assert repository.stargazers_count == 42
      assert repository.url == "some url"
    end

    test "create_repository/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Repositories.create_repository(@invalid_attrs)
    end

    test "update_repository/2 with valid data updates the repository" do
      repository = repository_fixture()
      assert {:ok, %Repository{} = repository} = Repositories.update_repository(repository, @update_attrs)
      assert repository.avatar_url == "some updated avatar_url"
      assert repository.description == "some updated description"
      assert repository.language == "some updated language"
      assert repository.name == "some updated name"
      assert repository.owner_login == "some updated owner_login"
      assert repository.stargazers_count == 43
      assert repository.url == "some updated url"
    end

    test "update_repository/2 with invalid data returns error changeset" do
      repository = repository_fixture()
      assert {:error, %Ecto.Changeset{}} = Repositories.update_repository(repository, @invalid_attrs)
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
