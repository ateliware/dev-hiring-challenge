defmodule HighlightRepo.GitRepos do
  @moduledoc """
  The Repos context.
  """
  alias HighlightRepo.{Repo, Repos.GitRepo}

  @doc """
  Returns the list of repos.
  """
  def list_repos do
    Repo.all(GitRepo)
  end

  @spec get_git_repo!(any) :: nil | [%{optional(atom) => any}] | %{optional(atom) => any}
  @doc """
  Gets a single git_repos.
  """
  def get_git_repo!(id), do: Repo.get!(GitRepo, id) |> Repo.preload(:owner)

  @doc """
  Creates a git_repos.
  """
  def fetch_or_create_git_repo_with_owner(name, attrs \\ %{}, owner) do
    case Repo.get_by(GitRepo, name: name) do
      nil ->
        new_repo =
          %GitRepo{}
          |> GitRepo.changeset(attrs)
          |> Ecto.Changeset.put_assoc(:owner, owner)
          |> Repo.insert()

        case new_repo do
          {:ok, repo} ->
            {:ok, repo}

          {:error, message} ->
            {:error, message}
        end

      repo ->
        {:ok, get_git_repo!(repo.id)}
    end
  end
end
