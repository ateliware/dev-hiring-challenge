defmodule FiveLanguagesWeb.PageControllerTest do
  use FiveLanguagesWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Cinco Linguagens"
  end
end
