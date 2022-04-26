defmodule AteliwareWeb.Shared.RepoDetail do
  use AteliwareWeb, :live_component
  alias Ateliware.GitRepos

  def update(%{saved_repos: nil} = assigns, socket) do
    {:ok, socket |> assign_defult(assigns) |> assign(icon: "go.html")}
  end

  def update(%{git_id: git_id, saved_repos: saved_repos} = assigns, socket) do
    {:ok, socket |> assign_defult(assigns) |> choose_icon(git_id, saved_repos)}
  end

  def handle_event("add-repo", _, socket) do
    repo = socket.assigns.repo
    icon = socket.assigns.icon

    if icon == "add.html" do
      GitRepos.create(repo)

      message = (socket.assigns.message == nil && "Repo add!") || nil
      {:noreply, socket |> assign(message: message, icon: "go.html")}
    else
      socket = push_redirect(socket, to: Routes.show_repo_path(socket, :index, repo.git_id))
      {:noreply, socket}
    end
  end

  defp assign_defult(socket, %{repo: repo, id: id}) do
    assign(socket, repo: repo, id: id, message: nil)
  end

  defp choose_icon(socket, git_id, saved_repos) do
    if git_id in saved_repos do
      assign(socket, icon: "go.html")
    else
      assign(socket, icon: "add.html")
    end
  end
end
