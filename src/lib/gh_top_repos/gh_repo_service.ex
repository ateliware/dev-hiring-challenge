defmodule GhTopRepos.GHRepoService do

  alias GhTopRepos.{Repo, GHRepo, GithubClient}

  def save(%{} = gh_repo) do
    changeset = GHRepo.changeset(%GHRepo{}, gh_repo)

    if changeset.valid? do
      Repo.insert(changeset)
    else
      changeset.errors
    end
  end

  def save(owner, name) do
    result = GithubClient.get_repo("#{owner}/#{name}")

    case result do
      repo -> save(repo)
      {:error, github_error} -> github_error
    end
  end

  def get(id) do
    GHRepo |> Repo.get_by(github_id: id)
  end

  def search(query) do
    result = GithubClient.fetch_repos([text: query["text"],
                                       language: query["language"]], query["p"])
    case result do
      {:ok, repos} -> repos
      {:error, github_error} -> github_error
    end
  end

  def save_all(query) do
    result = GithubClient.fetch_repos([text: query["text"],
                                       language: query["language"]], query["p"])
    case result do
      {:ok, repos} -> save_from_search(repos)
      {:error, github_error} -> github_error
    end
  end

  def save_from_search(repos) do
    repos_changesets = Enum.map(repos.items,
      fn r ->
        now = DateTime.utc_now
        timestamps = %{inserted_at: now, updated_at: now}
        repo = Map.merge(r, timestamps)
        GHRepo.changeset(%GHRepo{}, repo).changes
    end)

    Repo.insert_all(GHRepo,
                    repos_changesets,
                    on_conflict: :replace_all,
                    conflict_target: [:github_id])
    repos
  end

  def list(_page \\ 1) do
    GHRepo |> Repo.all()
  end
end
