defmodule AteliwareWeb.Live.PageLive do
  @moduledoc false

  use AteliwareWeb, :live_view
  alias Ateliware.GithubRepo
  alias Phoenix.View

  @impl true
  def mount(params, _, socket) do
    if connected?(socket), do: send(self(), :fetch_repos)

    socket = build_socket_by_params(params, socket)
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
  def handle_event("close_modal", _, socket), do: {:noreply, push_patch(socket, to: "/")}

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
        %{id: ^language_id} = language -> GithubRepo.get_language_top_repos(language)
        language -> language
      end)

    {:noreply, assign(socket, languages: languages)}
  end

  @impl true
  def handle_params(params, _, socket) do
    {:noreply, build_socket_by_params(params, socket)}
  end

  def build_socket_by_params(%{"repo_id" => repo_id}, socket) do
    case GithubRepo.get_by_id(repo_id) do
      nil -> assign(socket, show_modal: false)
      repo -> assign(socket, repo_details: repo, show_modal: true)
    end
  end

  def build_socket_by_params(_, socket), do: assign(socket, show_modal: false)
end
