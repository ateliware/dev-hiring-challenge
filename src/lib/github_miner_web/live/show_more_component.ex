defmodule GithubMinerWeb.ShowMoreComponent do
  use Phoenix.LiveComponent

  alias GithubMinerWeb.ShowMoreView

  def render(assigns) do
    ShowMoreView.render("show_more_component.html", assigns)
  end

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def update(
        %{show_more: show_more, list_repos_full: list_repos_full, list_repos: list_repos},
        socket
      ) do
    {:ok,
     assign(socket, show_more: show_more, list_repos_full: list_repos_full, list_repos: list_repos)}
  end
end
