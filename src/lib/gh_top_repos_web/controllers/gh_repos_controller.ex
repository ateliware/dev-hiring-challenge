defmodule GhTopReposWeb.GHReposController do
  use GhTopReposWeb, :controller

  alias GhTopRepos.GHRepoService, as: Service

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def search(conn, params) do
    repos = Service.search(params)
    conn
    |> assign(:repos, repos.items)
    |> assign(:total_count, repos.total_count)
    |> render("list.html")
  end

  def list(conn, _params) do
    repos = Service.list()
    conn
    |> assign(:repos, repos)
    |> render("list.html")
  end

  def show(conn, %{"id" => id}) do
    if repo = Service.get(id) do
      conn
      |> assign(:repo, repo)
      |> render("show.html")
    else
      conn
      |> put_status(:not_found)
      |> put_view(GhTopReposWeb.ErrorView)
      |> render(:"404")
    end
  end
end
