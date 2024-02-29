defmodule HighlightRepoWeb.RepoControllerTest do
  @moduledoc """
  RepoControllerTest
  """
  use HighlightRepoWeb.ConnCase
  alias HighlightRepo.Services.RepoService

  test "highlighted repos endpoint success", %{conn: conn} do
    assert post(conn, Routes.repo_path(conn, :highlighted_repos), %{language: "elixir"}).status ==
             200
  end

  test "highlighted repos with error", %{conn: conn} do
    assert post(conn, Routes.repo_path(conn, :highlighted_repos), %{language: ""}).status == 400
  end

  test "get repo endpoint success", %{conn: conn} do
    {:ok, _resp} = RepoService.repos_info("elixir")
    assert get(conn, Routes.repo_path(conn, :get_repo), %{name: "elixir"}).status == 200
  end

  test "get repo endpoint with error", %{conn: conn} do
    assert get(conn, Routes.repo_path(conn, :get_repo), %{name: "elixir"}).status == 400
  end
end
