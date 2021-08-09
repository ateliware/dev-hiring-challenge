defmodule GithubSearchWeb.RepositoryController do
  use GithubSearchWeb, :controller

  alias GithubSearch.Repo
  alias GithubSearch.Service
  alias GithubSearch.Service.Repository

  def index(conn, params) do
    {repositories, kerosene} = Service.list_repositories_with_pagination(params)

    render(conn, "index.html", repositories: repositories, kerosene: kerosene)
  end

  def new(conn, _params) do
    changeset = Service.change_repository(%Repository{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"repository" => repository_params}) do
    case Service.create_repository(repository_params) do
      {:ok, repository} ->
        conn
        |> put_flash(:info, "Repository created successfully.")
        |> redirect(to: Routes.repository_path(conn, :show, repository))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    repository = Service.get_repository!(id)
    render(conn, "show.html", repository: repository)
  end

  def edit(conn, %{"id" => id}) do
    repository = Service.get_repository!(id)
    changeset = Service.change_repository(repository)
    render(conn, "edit.html", repository: repository, changeset: changeset)
  end

  def update(conn, %{"id" => id, "repository" => repository_params}) do
    repository = Service.get_repository!(id)

    case Service.update_repository(repository, repository_params) do
      {:ok, repository} ->
        conn
        |> put_flash(:info, "Repository updated successfully.")
        |> redirect(to: Routes.repository_path(conn, :show, repository))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", repository: repository, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    repository = Service.get_repository!(id)
    {:ok, _repository} = Service.delete_repository(repository)

    conn
    |> put_flash(:info, "Repository deleted successfully.")
    |> redirect(to: Routes.repository_path(conn, :index))
  end
end
