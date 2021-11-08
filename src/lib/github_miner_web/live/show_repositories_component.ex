defmodule GithubMinerWeb.ShowRepositoriesComponent do
  use Phoenix.LiveComponent

  alias GithubMinerWeb.ShowRepositoriesView

  def render(assigns) do
    ShowRepositoriesView.render("show_repositories_component.html", assigns)
  end

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def update(%{list_repos: list_repos, search: search} = assigns, socket) do
    {:ok, assign(socket, list_repos: list_repos, search: search)}
  end
end
