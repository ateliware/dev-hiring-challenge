defmodule GithubSearchWeb.SearchController do
  use GithubSearchWeb, :controller

  alias GithubSearch.Repo
  alias GithubSearch.Service
  alias GithubSearch.Service.Search

  def index(conn, params) do
    {searchs, kerosene} =
      Search
      |> Repo.paginate(params)

    render(conn, "index.html", searchs: searchs, kerosene: kerosene)
  end

  def new(conn, _params) do
    changeset = Service.change_search(%Search{})

    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"search" => search_params}) do
    case Service.create_search(search_params) do
      {:ok, search} ->
        Service.search_for_repositories(
          search_params["language"],
          search_params["keyword"] || nil,
          search.id
        )

        conn
        |> put_flash(:info, "Search created successfully.")
        |> redirect(to: Routes.search_path(conn, :show, search))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    search = Service.get_search!(id)
    render(conn, "show.html", search: search)
  end

  def edit(conn, %{"id" => id}) do
    search = Service.get_search!(id)
    changeset = Service.change_search(search)
    render(conn, "edit.html", search: search, changeset: changeset)
  end

  def update(conn, %{"id" => id, "search" => search_params}) do
    search = Service.get_search!(id)

    case Service.update_search(search, search_params) do
      {:ok, search} ->
        conn
        |> put_flash(:info, "Search updated successfully.")
        |> redirect(to: Routes.search_path(conn, :show, search))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", search: search, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    search = Service.get_search!(id)
    {:ok, _search} = Service.delete_search(search)

    conn
    |> put_flash(:info, "Search deleted successfully.")
    |> redirect(to: Routes.search_path(conn, :index))
  end
end
