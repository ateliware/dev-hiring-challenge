defmodule HighlightRepoWeb.RepoController do
  use HighlightRepoWeb, :controller

  alias HighlightRepo.Services.RepoService

  def highlighted_repos(conn, %{"language" => language}) do
    case RepoService.repos_info(language) do
      {:ok, response} ->
        conn
        |> put_status(:ok)
        |> render("repos_info.json", %{data: response})

      {:error, message} ->
        conn
        |> put_status(:bad_request)
        |> render("error_message.json", %{message: message})
    end
  end

  def get_repo(conn, %{"name" => name}) do
    case RepoService.get_repo(name) do
      {:ok, repo} ->
        conn
        |> put_status(:ok)
        |> render("repo.json", %{item: repo})

      {:error, message} ->
        conn
        |> put_status(:bad_request)
        |> render("error_message.json", %{message: message})
    end
  end
end
