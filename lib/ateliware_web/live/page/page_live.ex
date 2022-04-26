defmodule AteliwareWeb.PageLive do
  use AteliwareWeb, :live_view

  alias Ateliware.GithubApi
  alias Ateliware.GitRepos
  alias AteliwareWeb.Shared.RepoDetail

  def mount(_params, _session, socket) do
    assigns = [language: "Elixir", page: 1, per_page: 10]
    {:ok, socket |> assign(assigns)}
  end

  def handle_params(params, _, socket) do
    language = params["language"] || "Elixir"
    page = (params["page"] || "1") |> String.to_integer()
    per_page = (params["per_page"] || "8") |> String.to_integer()
    saved_repos = GitRepos.get_saved_repos()
    assigns = [language: language, page: page, per_page: per_page, saved_repos: saved_repos]

    {:noreply, socket |> assign(assigns) |> load_repos}
  end

  def handle_event("select-language", %{"language" => language}, socket) do
    socket = push_redirect(socket, to: Routes.page_path(socket, :index, language: language))
    {:noreply, socket}
  end

  def handle_event("load-repos", _, socket) do
    socket = socket |> update(:page, &(&1 + 1)) |> load_repos
    {:noreply, socket}
  end

  defp load_repos(socket) do
    language = socket.assigns.language
    page = socket.assigns.page
    per_page = socket.assigns.per_page
    language |> GithubApi.get_repos(page, per_page) |> get_response(socket)
  end

  defp get_response({:error, message}, socket) do
    socket
    |> put_flash(:error, message)
    |> assign(repos: [])
  end

  defp get_response(repos, socket) do
    socket
    |> assign(repos: repos)
  end
end
