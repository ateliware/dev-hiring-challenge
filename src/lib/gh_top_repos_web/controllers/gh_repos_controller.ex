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

  def list(conn, params) do
    result = Service.list(String.to_integer(Map.get(params, "p", "1")))
    conn
    |> assign(:repos, result.items)
    |> assign(:total_count, result.total_count)
    |> render("list.html")
  end

  def save(conn, %{"owner" => owner, "name" => name}) do
    {:ok, repo} = Service.save(owner, name)

    redirect(conn, to: "/repos/" <> Integer.to_string(repo.github_id))
  end

  def save_all(conn, query) do
    Service.save_all(query)
    conn
    |> put_flash(:info, "All repos saved successfully!")
    |> redirect(to: "/repos")
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
