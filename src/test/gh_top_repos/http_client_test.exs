defmodule GhTopRepos.HttpClientTest do

  use ExUnit.Case, async: true
  alias GhTopRepos.HttpClient, as: Http

  @url "api.github.com"


  test "connection has failed: bad url" do
    {:error, mint_transport_error} = Http.connect("bad.domain")
    
    assert mint_transport_error.reason == :nxdomain
  end


  test "connection can be achieved" do
    {:ok, conn} = Http.connect(@url)

    assert conn.state == :open
    assert conn.mode == :active
    Http.close(conn)
  end


  test "request can be completed" do
    {:ok, conn} = Http.connect(@url, :https)
    {:ok, body} = Http.request(conn, "GET", "/zen")

    assert Enum.empty?(body) == false
  end


  test "response body is not empty" do
    {:ok, conn} = Http.connect(@url, :https)
    {:ok, body} = Http.request(conn, "GET", "/zen")

    assert body
  end
end
