defmodule GithubSearch.ServiceTest do
  use GithubSearch.DataCase

  alias GithubSearch.Service

  describe "repositories" do
    alias GithubSearch.Service.Repository

    @valid_attrs %{description: "some description", forks: 42, language: "some language", name: "some name", url: "some url", watchers: 42}
    @update_attrs %{description: "some updated description", forks: 43, language: "some updated language", name: "some updated name", url: "some updated url", watchers: 43}
    @invalid_attrs %{description: nil, forks: nil, language: nil, name: nil, url: nil, watchers: nil}

    def repository_fixture(attrs \\ %{}) do
      {:ok, repository} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Service.create_repository()

      repository
    end

    test "list_repositories/0 returns all repositories" do
      repository = repository_fixture()
      assert Service.list_repositories() == [repository]
    end

    test "get_repository!/1 returns the repository with given id" do
      repository = repository_fixture()
      assert Service.get_repository!(repository.id) == repository
    end

    test "create_repository/1 with valid data creates a repository" do
      assert {:ok, %Repository{} = repository} = Service.create_repository(@valid_attrs)
      assert repository.description == "some description"
      assert repository.forks == 42
      assert repository.language == "some language"
      assert repository.name == "some name"
      assert repository.url == "some url"
      assert repository.watchers == 42
    end

    test "create_repository/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Service.create_repository(@invalid_attrs)
    end

    test "update_repository/2 with valid data updates the repository" do
      repository = repository_fixture()
      assert {:ok, %Repository{} = repository} = Service.update_repository(repository, @update_attrs)
      assert repository.description == "some updated description"
      assert repository.forks == 43
      assert repository.language == "some updated language"
      assert repository.name == "some updated name"
      assert repository.url == "some updated url"
      assert repository.watchers == 43
    end

    test "update_repository/2 with invalid data returns error changeset" do
      repository = repository_fixture()
      assert {:error, %Ecto.Changeset{}} = Service.update_repository(repository, @invalid_attrs)
      assert repository == Service.get_repository!(repository.id)
    end

    test "delete_repository/1 deletes the repository" do
      repository = repository_fixture()
      assert {:ok, %Repository{}} = Service.delete_repository(repository)
      assert_raise Ecto.NoResultsError, fn -> Service.get_repository!(repository.id) end
    end

    test "change_repository/1 returns a repository changeset" do
      repository = repository_fixture()
      assert %Ecto.Changeset{} = Service.change_repository(repository)
    end
  end

  describe "searchs" do
    alias GithubSearch.Service.Search

    @valid_attrs %{language: "some language"}
    @update_attrs %{language: "some updated language"}
    @invalid_attrs %{language: nil}

    def search_fixture(attrs \\ %{}) do
      {:ok, search} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Service.create_search()

      search
    end

    test "list_searchs/0 returns all searchs" do
      search = search_fixture()
      assert Service.list_searchs() == [search]
    end

    test "get_search!/1 returns the search with given id" do
      search = search_fixture()
      assert Service.get_search!(search.id) == search
    end

    test "create_search/1 with valid data creates a search" do
      assert {:ok, %Search{} = search} = Service.create_search(@valid_attrs)
      assert search.language == "some language"
    end

    test "create_search/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Service.create_search(@invalid_attrs)
    end

    test "update_search/2 with valid data updates the search" do
      search = search_fixture()
      assert {:ok, %Search{} = search} = Service.update_search(search, @update_attrs)
      assert search.language == "some updated language"
    end

    test "update_search/2 with invalid data returns error changeset" do
      search = search_fixture()
      assert {:error, %Ecto.Changeset{}} = Service.update_search(search, @invalid_attrs)
      assert search == Service.get_search!(search.id)
    end

    test "delete_search/1 deletes the search" do
      search = search_fixture()
      assert {:ok, %Search{}} = Service.delete_search(search)
      assert_raise Ecto.NoResultsError, fn -> Service.get_search!(search.id) end
    end

    test "change_search/1 returns a search changeset" do
      search = search_fixture()
      assert %Ecto.Changeset{} = Service.change_search(search)
    end
  end
end
