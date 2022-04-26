defmodule Ateliware.GitRepos do
  import Ecto.Query

  alias Ateliware.GitRepos.GitRepo
  alias Ateliware.Repo

  def create(repo) do
    %GitRepo{}
    |> GitRepo.changeset(repo)
    |> Repo.insert()
  end

  def all, do: GitRepo |> Repo.all()

  def get_saved_repos do
    GitRepo
    |> select([g], g.git_id)
    |> Repo.all()
  end

  def get_by_id(git_id) do
    Repo.get_by(GitRepo, git_id: git_id)
  end
end
