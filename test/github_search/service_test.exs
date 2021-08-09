defmodule GithubSearch.ServiceTest do
  use ExUnit.Case, async: true
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney
  use GithubSearch.DataCase

  alias GithubSearch.Service

  setup_all do
    HTTPoison.start()
    :ok
  end

  describe "repositories" do
    alias GithubSearch.Service.Repository

    @valid_attrs %{
      description: "some description",
      forks: 42,
      language: "some language",
      name: "some name",
      url: "some url",
      watchers: 42
    }
    @invalid_attrs %{
      description: nil,
      forks: nil,
      language: nil,
      name: nil,
      url: nil,
      watchers: nil
    }

    @valid_search_attrs %{language: "Elixir", keyword: "Haversine"}

    def repository_fixture(attrs \\ %{}) do
      search = search_fixture()

      valid_attrs = Map.put(@valid_attrs, :search_id, search.id)

      {:ok, repository} =
        attrs
        |> Enum.into(valid_attrs)
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
      search = search_fixture()

      valid_attrs = Map.put(@valid_attrs, :search_id, search.id)

      assert {:ok, %Repository{} = repository} = Service.create_repository(valid_attrs)
      assert repository.description == "some description"
      assert repository.forks == 42
      assert repository.language == "some language"
      assert repository.name == "some name"
      assert repository.url == "some url"
      assert repository.watchers == 42
      assert repository.search_id == search.id
    end

    test "create_repository/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Service.create_repository(@invalid_attrs)
    end
  end

  describe "searchs" do
    alias GithubSearch.Service.Search

    @valid_search_attrs %{language: "Elixir", keyword: "Haversine"}
    @invalid_attrs %{language: nil}

    def search_fixture(attrs \\ %{}) do
      {:ok, search} =
        attrs
        |> Enum.into(@valid_search_attrs)
        |> Service.create_search()

      search
    end

    test "list_searchs/0 returns all searchs" do
      search = search_fixture()
      assert Service.list_searchs() == [search]
    end

    test "get_search!/1 returns the search with given id" do
      search = search_fixture() |> Repo.preload(:repositories)
      assert Service.get_search!(search.id) == search
    end

    test "create_search/1 with valid data creates a search" do
      assert {:ok, %Search{} = search} = Service.create_search(@valid_search_attrs)
      assert search.language == "Elixir"
      assert search.keyword == "Haversine"
    end

    test "create_search/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Service.create_search(@invalid_attrs)
    end
  end

  test "change_search/1 returns a search changeset" do
    %{id: search_id} = search_fixture()

    use_cassette "github_api_get_repositories" do
      repositories = Service.search_for_repositories("Elixir", "Haversine", search_id)

      refute is_nil(repositories)
    end
  end
end
