defmodule GhTopRepos.GHRepoService do

  alias GhTopRepos.{Repo, GHRepo, GithubClient}


  def save(gh_repo) do
    changeset = GHRepo.changeset(%GHRepo{}, gh_repo)

    if changeset.valid? do
      Repo.insert(changeset)
    else
      changeset.errors
    end
  end


  def get(id) do
    GHRepo |> Repo.get(id)
  end


  def search(query) do
    GithubClient.fetch_repos([text: query["text"],
                              language: query["language"]])
  end

  
  def list(_page \\ 1) do
    GHRepo |> Repo.all()
  end


end
