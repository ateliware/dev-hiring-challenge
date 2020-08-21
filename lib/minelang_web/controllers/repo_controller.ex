defmodule MinelangWeb.RepoController do
  use MinelangWeb, :controller

  alias Minelang.{Repo, Repository}

  def show(conn, %{"id" => org}) do
    repo = Repo.get_by(Repository, org: org)
    render(conn, "index.html", repo: repo)
  end
end
