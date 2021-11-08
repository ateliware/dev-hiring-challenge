defmodule GithubMinerWeb.RepositoryView do
  use GithubMinerWeb, :view
  alias GithubMinerWeb.RepositoryView

  def render("index.json", %{repositories: repositories}) do
    %{data: render_many(repositories, RepositoryView, "repository.json")}
  end

  def render("show.json", %{repository: repository}) do
    %{data: render_one(repository, RepositoryView, "repository.json")}
  end

  def render("repository.json", %{repository: repository}) do
    %{
      id: repository.id,
      repository_id: repository.repository_id,
      forks: repository.forks,
      full_name: repository.full_name,
      language: repository.language,
      stargazers_count: repository.stargazers_count,
      watchers_count: repository.watchers_count,
      avatar_url: repository.avatar_url,
      login: repository.login,
      type: repository.type
    }
  end
end
