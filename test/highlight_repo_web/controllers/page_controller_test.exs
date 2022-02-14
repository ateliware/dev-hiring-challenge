defmodule HighlightRepoWeb.PageControllerTest do
  @moduledoc """
  PageControllerTest
  """
  use HighlightRepoWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Highlighted Git Repos"
  end
end
