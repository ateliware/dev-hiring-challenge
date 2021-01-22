defmodule FiveLanguagesWeb.PageController do
  use FiveLanguagesWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
