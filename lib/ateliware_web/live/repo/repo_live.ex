defmodule AteliwareWeb.RepoLive do
  use AteliwareWeb, :live_view
  alias Ateliware.GitRepos
  alias AteliwareWeb.Shared.RepoDetail

  def mount(_, _, socket) do
    repos = GitRepos.all()
    socket = assign(socket, repos: repos)
    {:ok, socket}
  end
end
