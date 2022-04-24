defmodule DevChallengeWeb.RepositoriesLive do
  use DevChallengeWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, fetch(socket)}
  end

  def handle_event("store_data", params, socket) do
    DevChallenge.store_data(params)

    {:noreply, fetch(socket)}
  end

  def handle_event("search_repos", %{"language" => language}, socket) do
    {:noreply, assign(socket, repos: DevChallenge.get_repos(language))}
  end

  def handle_event("delete_repo", %{"id" => id, "language" => language}, socket) do
    DevChallenge.delete_repo(id)
    {:noreply, assign(socket, repos: DevChallenge.get_repos(language))}
  end

  defp fetch(socket) do
    assign(socket, repos: DevChallenge.get_languages())
  end
end
