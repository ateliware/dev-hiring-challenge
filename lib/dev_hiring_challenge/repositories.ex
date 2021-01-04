defmodule DevHiringChallenge.Repositories do
  @moduledoc """
  The Respositories context.
  """

  alias DevHiringChallenge.Repo
  alias DevHiringChallenge.Repositories.Repository

  @doc """
  Creates a new repository.

  ## Examples

    iex> DevHiringChallenge.Repositories.create_repository(%{name: "Repo", description: "repo", html_url: "www.repo.com", language: "Ruby", stargazers_count: 1234})
    {:ok, %Repository{}}
  """
  def create_repository(attrs) do
    %Repository{}
    |> Repository.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Get all repositories.

  ## Examples

    iex> DevHiringChallenge.Repositories.get_repositories()
    [%Repository{}]
  """
  def get_repositories() do
    Repository
    |> Repo.all()
  end

  @doc """
  Deletes a repository.

  ## Examples

    iex> DevHiringChallenge.Repositories.delete_repository(1)
    {:ok, %Repository{}}
  """
  def delete_repository(id) do
    case Repo.get(Repository, id) do
      nil -> {:error, "Repository not found"}
      repo -> Repo.delete(repo)
    end
  end
end
