defmodule Ateliware.External.GithubTests do
  use ExUnit.Case, async: true
  import Mox
  alias Ateliware.External.Github

  test "finally" do
    expect(HttpClientMock, :get, fn _url -> {:ok, %{body: "Some html with weather data"}} end)
    repos = Github.get_repos([])
    IO.inspect(repos)
    assert {:ok, _} = repos
  end
end
