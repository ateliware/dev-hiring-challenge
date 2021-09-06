defmodule GhTopRepos.GHRepoService do

  alias GhTopRepos.Repo
  alias GhTopRepos.GHRepo

  def save(gh_repo) do
    changeset = GHRepo.changeset(%GHRepo{}, gh_repo)

    if changeset.valid? do
      Repo.insert(changeset)
    else
      changeset.errors
    end
  end

end
