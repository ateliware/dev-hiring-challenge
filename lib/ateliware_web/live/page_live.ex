defmodule AteliwareWeb.Live.PageLive do
  @moduledoc false

  use AteliwareWeb, :live_view
  alias Ateliware.GithubRepo
  alias Phoenix.View

  @impl true
  def mount(_, _, socket) do
    if connected?(socket), do: send(self(), :fetch_repos)
    {:ok, assign(socket, loading: true, languages: [])}
  end

  @impl true
  def render(assigns) do
    View.render(AteliwareWeb.PageView, "index.html", assigns)
  end

  @impl true
  def handle_event("trigger_update_repos", _, socket) do
    send(self(), :update_repos)
    {:noreply, assign(socket, loading: true)}
  end

  @impl true
  def handle_info(:update_repos, socket) do
    repos = GithubRepo.update_repos()
    {:noreply, assign(socket, loading: false, languages: repos)}
  end

  @impl true
  def handle_info(:fetch_repos, socket) do
    {:noreply, assign(socket, loading: false, languages: GithubRepo.get_languages())}
  end

  @impl true
  def handle_info({:get_repos, language_id}, socket) do
    languages =
      Enum.map(socket.assigns.languages, fn
        %{id: language_id} = language -> GithubRepo.get_language_top_repos(language)
        language -> language
      end)

    {:noreply, assign(socket, languages: languages)}
  end
end
