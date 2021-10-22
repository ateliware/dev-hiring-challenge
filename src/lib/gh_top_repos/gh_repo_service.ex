defmodule GhTopRepos.GHRepoService do

  import Ecto.Query
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
      {:ok, repo} -> 
        save(repo)
      {:error, github_error} -> github_error
    end
  end

  def get(id) do
    GHRepo |> Repo.get_by(github_id: id)
  end

  def search(query) do
    result = fetch_with_query(query)
    case result do
      {:ok, repos} -> map_saved(repos)
      {:error, github_error} -> github_error
    end
  end

  def save_all(query) do
    result = fetch_with_query(query)
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

  def list(page, page_size \\ 9) do
    offset = if page > 1 do page_size * (page - 1) else 0 end
    total_count = Repo.one(from r in GHRepo, select: count(r.github_id))

    results = GHRepo
              |> offset(^offset)
              |> limit(^page_size)
              |> Repo.all
    %{items: results, total_count: total_count}
  end

  def list_ids_in(ids_list) do
    Repo.all(from r in GHRepo,
      where: r.github_id in ^ids_list,
      select: r.github_id)
  end

  defp fetch_with_query(query) do
    GithubClient.fetch_repos([text: query["text"],
                              stars: query["stars"],
                              forks: query["forks"],
                              language: query["language"]], query["p"])
  end

  # add "saved" property to repos which are already persisted
  defp map_saved(repos) do
    repos_ids = Enum.map(repos.items, fn r -> r.github_id end)
    saved_repos_ids = list_ids_in(repos_ids)

    mapped = Enum.map(repos.items, fn r ->
      if r.github_id in saved_repos_ids do
        Map.put(r, :saved, true)
      else
        r
      end
    end)

    %{items: mapped, total_count: repos.total_count}
  end
end
