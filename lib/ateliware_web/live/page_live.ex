defmodule AteliwareWeb.Live.PageLive do
  @moduledoc false

  use AteliwareWeb, :live_view
  alias Ateliware.GithubRepo
  alias Phoenix.View

  @impl true
  def mount(_, _, socket) do
    send(self(), :fetch_repos)
    {:ok, assign(socket, loading: true)}
  end

  @impl true
  def render(assigns) do
    View.render(AteliwareWeb.PageView, "index.html", assigns)
  end

  @impl true
  def handle_info(:fetch_repos, socket) do
    {:noreply, assign(socket, loading: false, languages: GithubRepo.get_languages_top_repos())}
  end
end
