defmodule DevHiringChallenge.RepositoriesTest do
  use DevHiringChallenge.DataCase, async: true
  import DevHiringChallenge.Factory

  alias DevHiringChallenge.Repositories
  alias DevHiringChallenge.Repositories.Repository

  describe "create_repository/1" do
    test "with full params returns sucessfully" do
      assert {:ok, %Repository{name: "Repo"}} =
               Repositories.create_repository(%{
                 name: "Repo",
                 description: "repo",
                 html_url: "www.repo.com",
                 language: "Ruby",
                 stargazers_count: 1234
               })
    end

    test "with missing params returns error" do
      assert {:error, _} = Repositories.create_repository(%{name: "Repo"})
    end
  end

  describe "get_repositories/0" do
    test "returns all repositories" do
      insert(:repository)
      assert [%Repository{name: "Repo"}] = Repositories.get_repositories()
    end
  end

  describe "delete_repository/1" do
    test "deletes an existent repository" do
      insert(:repository, id: 1)
      assert [%Repository{name: "Repo"}] = Repositories.get_repositories()
      assert {:ok, _} = Repositories.delete_repository(1)
      assert [] == Repositories.get_repositories()
    end

    test "deletes a non existent repository" do
      assert {:error, "Repository not found"} == Repositories.delete_repository(1)
    end
  end
end
