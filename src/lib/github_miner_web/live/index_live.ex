defmodule GithubMinerWeb.IndexLive do
  @moduledoc """
    Este modulo exibe trata eventos para a interface do GithubMiner.
  """

  use GithubMinerWeb, :live_view
  require Logger

  alias GithubMiner.Github
  alias GithubMinerWeb.IndexView
  alias GithubMiner.Repositories

  def render(assigns) do
    IndexView.render("index.html", assigns)
  end

  @impl true
  def mount(_params, _session, socket) do
    #  list_repos = []
    list_repos =
      Repositories.list_repositories()
      |> Enum.map(fn x ->
        x
      end)

    {:ok,
     assign(socket, list_repos: list_repos, show_more: false, list_repos_full: [], search: false)}
  end

  def handle_event("search-repo", %{"lang" => ""}, socket) do
    Logger.info("Entrada do campo << lang >> vazia.")

    {:noreply, socket}
  end

  def handle_event("search-repo", params, socket) do
    {:ok, repos} = Github.smart_search_repo(params["lang"])
    body = repos.body |> Jason.decode!()

    list_repos = response_request(repos.status, body)

    {:noreply, assign(socket, list_repos: list_repos, search: true)}
  end

  def handle_event("show_more", %{"repository_id" => repository_id} = _params, socket) do
    repo =
      socket.assigns.list_repos
      |> Enum.map(fn x ->
        x

        if x.repository_id == repository_id |> String.to_integer() do
          x
        end
      end)
      |> Enum.reject(fn x -> x == nil end)

    {:noreply, assign(socket, show_more: true, list_repos_full: repo, list_repos: [])}
  end

  def response_request(status, body) do
    case status do
      200 ->
        body["items"]
        |> Enum.map(fn x ->
          unless x["fork"] do
            trating_data_repository(x)
          end
        end)

      401 ->
        Logger.info("Credenciais inválidas")
        []

      403 ->
        Logger.info("Número máximo de tentativas excedido.")
    end
  end

  def handle_event("save_repository", %{"repository_id" => repository_id}, socket) do
    socket.assigns.list_repos
    |> Enum.map(fn x ->
      x

      %{
        language: x.language,
        repository_id: x.repository_id,
        forks: x.forks,
        stargazers_count: x.stargazers_count,
        full_name: x.full_name,
        watchers_count: x.watchers_count,
        avatar_url: x.avatar_url,
        login: x.login,
        type: x.type
      }
      |> Repositories.create_repository()

      put_flash(socket, :info, "Repositório salvo com sucesso!!!")
    end)

    {:noreply, socket}
  end

  def trating_data_repository(data) do
    %{
      fork: data["fork"],
      language: data["language"],
      repository_id: data["id"],
      forks: data["forks"],
      stargazers_count: data["stargazers_count"],
      full_name: data["full_name"],
      watchers_count: data["watchers_count"],
      avatar_url: data["owner"]["avatar_url"],
      login: data["owner"]["login"],
      type: data["owner"]["type"]
    }
  end
end
