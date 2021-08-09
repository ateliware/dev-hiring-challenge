defmodule GithubSearchWeb.SearchControllerTest do
  use GithubSearchWeb.ConnCase

  alias GithubSearch.Service

  @create_attrs %{language: "some language", keyword: "keyword"}
  @invalid_attrs %{language: nil}

  def fixture(:search) do
    {:ok, search} = Service.create_search(@create_attrs)
    search
  end

  describe "index" do
    test "lists all searchs", %{conn: conn} do
      conn = get(conn, Routes.search_path(conn, :index))
      assert html_response(conn, 200) =~ "Searchs"
    end
  end

  describe "new search" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.search_path(conn, :new))
      assert html_response(conn, 200) =~ "New Search"
    end
  end

  describe "create search" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.search_path(conn, :create), search: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.search_path(conn, :show, id)

      conn = get(conn, Routes.search_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Search"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.search_path(conn, :create), search: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Search"
    end
  end
end
