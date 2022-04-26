defmodule SmartGit.GithubApi.GetReposTest do
  use Ateliware.DataCase
  import Tesla.Mock
  alias Ateliware.GithubApi.GetRepos

  describe "status 200" do
    setup do
      mock(fn
        %{method: :get, url: "https://api.github.com/search/repositories"} ->
          %Tesla.Env{status: 200, body: %{"items" => items()}}
      end)

      :ok
    end

    test "get_repos with sucess" do
      result = GetRepos.get_repos("elixir", 1, 8)

      assert [
               %{
                 description: "description",
                 forks: 123,
                 full_name: "full_name",
                 git_id: 123,
                 language: "elixir",
                 name: "name",
                 open_issues: 123,
                 url: "url",
                 watchers_count: 123,
                 avatar_url: "avatar_url"
               }
             ] == result
    end

    defp items do
      [
        %{
          "id" => 123,
          "owner" => %{"avatar_url" => "avatar_url"},
          "full_name" => "full_name",
          "watchers_count" => 123,
          "forks" => 123,
          "description" => "description",
          "name" => "name",
          "open_issues" => 123,
          "language" => "elixir",
          "html_url" => "url"
        }
      ]
    end
  end

  describe "status 403" do
    setup do
      mock(fn
        %{method: :get, url: "https://api.github.com/search/repositories"} ->
          %Tesla.Env{status: 403, body: %{}}
      end)

      :ok
    end

    test "get_repos with an error" do
      result = GetRepos.get_repos("elixir", 1, 8)

      assert {:error, "Limite excedido, espere mais um pouco"} == result
    end
  end
end
