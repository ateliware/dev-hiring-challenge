defmodule GithubSearchWeb.PageController do
  use GithubSearchWeb, :controller

  def index(conn, _params) do
    redirect(conn, to: Routes.search_path(conn, :index))
  end
end
