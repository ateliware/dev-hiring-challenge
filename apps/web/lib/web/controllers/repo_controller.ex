defmodule Web.RepoController do
  use Web, :controller

  alias Mine.{Repo, Repositories}

  def show(conn, %{"id" => org}) do
    repo = Repo.get_by(Repositories, org: org)
    render(conn, "index.html", repo: repo)
  end
end
