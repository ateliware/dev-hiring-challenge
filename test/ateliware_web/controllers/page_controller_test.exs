defmodule AteliwareWeb.PageControllerTest do
  use AteliwareWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Ateliware Challenge"
  end
end
