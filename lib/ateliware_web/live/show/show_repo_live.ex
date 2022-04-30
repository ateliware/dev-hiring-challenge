defmodule AteliwareWeb.ShowRepoLive do
  use AteliwareWeb, :live_view
  alias Ateliware.GitRepos

  def mount(%{"id" => git_id}, _, socket) do
    repo = GitRepos.get_by_id(git_id)

    {:ok, socket |> assign(repo: repo)}
  end
end
