defmodule HighlightRepo.Services.RepoService do
  @moduledoc """
  RepoService
  """
  alias HighlightRepo.{GitRepos, Repo, Repos.GitRepo, Services.GithubService}

  @spec repos_info(any) :: list | {:error, <<_::496>> | Jason.DecodeError.t()}
  @doc """
  Get repos info
  """
  def repos_info(language) do
    case GithubService.get_repos_by_language(language) do
      {:ok, response} ->
        {:ok,
         Enum.map(response, fn repo ->
           owner = repo["owner"]

           {:ok, repo} =
             GitRepos.fetch_or_create_git_repo_with_owner(
               repo["name"],
               %{
                 name: repo["name"],
                 description: repo["description"],
                 forks: repo["forks"],
                 stars: repo["stargazers_count"],
                 url: repo["html_url"]
               },
               %{
                 avatar_url: owner["avatar_url"],
                 name: owner["login"],
                 url: owner["html_url"]
               }
             )

           repo
         end)}

      {:error, message} ->
        {:error, message}
    end
  end

  @spec get_repo(any) ::
          {:error, <<_::552>>}
          | {:ok, nil | [%{optional(atom) => any}] | %{optional(atom) => any}}
  @doc """
  Gets single repo
  """
  def get_repo(name) do
    case Repo.get_by(GitRepo, name: name) do
      nil ->
        {:error, "This repo either does no exist or was not stored in our database yet."}

      repo ->
        {:ok, GitRepos.get_git_repo!(repo.id)}
    end
  end
end
