defmodule Mine.MineServerTest do
  use ExUnit.Case

  import Mock

  alias Mine.{MineServer, MineRepos, Repo}

  describe "MineServer" do
    setup do
      Application.ensure_all_started(:mine)
    end

    test "it can adds/get a process per org" do
      org = "fake"
      MineServer.start_link(org)
      assert %{org: org} == MineServer.get_state(org)
    end

    test "it can start to mine an existing repo" do
      org = "fake"
      MineServer.start_link(org)
      %{org: org} = MineServer.get_state(org)
      body = body()

      with_mocks([
        {HTTPoison, [], [get: fn _ -> {:ok, %{body: body, status_code: 200}} end]},
        {Poison, [], [decode!: fn _ -> [body] end]},
        {Repo, [], [insert: fn _ -> {:ok, body} end]}
      ]) do
        assert :ok == MineServer.mine_repo(org)
        assert body == MineServer.get_state(org)
      end
    end
  end

  defp body do
    %{
      "name" => "fake",
      "description" => "fake description",
      "stargazers_count" => "1",
      "watchers_count" => "2",
      "open_issues" => "3",
      "forks" => "4",
      "license" => %{"name" => "All free"}
    }
  end
end
