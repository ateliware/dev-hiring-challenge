defmodule Minelang.MineReposTest do
  use ExUnit.Case

  import Mock

  alias Minelang.{MineRepos, MineServer, Repo}

  describe "MineRepos" do
    setup do
      Application.ensure_all_started(:minelang)
    end

    test "we can add/list and remove a new org" do
      with_mocks([
        {MineServer, [], [start_link: fn _ -> :ok end]},
        {Repo, [], [get_by: fn _, _ -> :ok end]}
      ]) do
        org_name = "fake"
        assert :ok == MineRepos.add_org(org_name)
        assert [org_name] == MineRepos.show_orgs()
        assert :ok == MineRepos.pop_org(org_name)
        assert [] == MineRepos.show_orgs()
      end
    end
  end
end
