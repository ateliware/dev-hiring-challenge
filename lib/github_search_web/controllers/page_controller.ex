defmodule GithubSearchWeb.PageController do
  use GithubSearchWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
