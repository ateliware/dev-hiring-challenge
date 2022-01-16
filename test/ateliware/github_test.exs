defmodule Ateliware.External.GithubTests do
  use Ateliware.DataCase, async: true
  import Mox
  alias Ateliware.External.Github
  alias Ateliware.Repo
  alias Ateliware.Schemas.GithubRepo
  import Ateliware.RepoFixtures
  import Ecto.Query

  describe "get_repos/1" do
    setup do
      stub_api_call()
      :ok
    end
    test "external integration module should return a parsed list of repositories" do
      response = Github.get_repos([])
      assert {:ok, %{items: [repo | _]}} = response
      assert %{
        full_name: _,
        forks: _,
        homepage: _,
        name: _,
        stargazers_count: _,
        url: _,
        description: _,
        watchers: _

      } = repo
    end
  end


  describe "update_repos/0" do
    setup do
      stub_api_call()
      :ok
    end

    test "should update the existing repos when the request succeeds" do
      language = language_fixture() 
      repo = repo_fixture(language.id)

      Ateliware.GithubRepo.update_repos()

      assert [new_repo] =  Ateliware.Repo.all(from(gr in GithubRepo, where: gr.language_id == ^language.id))
      assert repo.id != new_repo.id

    end
    test "should not update the existing repos when the request fails" do
      language = language_fixture() 
      repo = repo_fixture(language.id)

      stub(HttpClientMock, :get, fn _url -> {:error, %{status_code: 500, body: "{error: \"internal server error\"}"}} end)
      Ateliware.GithubRepo.update_repos()

      assert [new_repo] =  Ateliware.Repo.all(from(gr in GithubRepo, where: gr.language_id == ^language.id))
      assert repo.id == new_repo.id
    end
  end


  defp stub_api_call, do: stub(HttpClientMock, :get, fn _url -> {:ok, %{status_code: 200, body: Ateliware.RepoFixtures.github_response_mock()}} end)

    
end
