defmodule AteliwareWeb.PageController do
  use AteliwareWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
