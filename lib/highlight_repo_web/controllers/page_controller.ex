defmodule HighlightRepoWeb.PageController do
  use HighlightRepoWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
