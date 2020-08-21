defmodule Mine.MineReposTest do
  use ExUnit.Case

  import Mock

  alias Mine.{MineRepos, MineServer, Repo}

  describe "MineRepos" do
    setup do
      Application.ensure_all_started(:mine)
    end

    test "we can add/list and remove a new org" do
      with_mocks([
        {MineServer, [], [start_link: fn _ -> :ok end]},
        {Repo, [], [get_by: fn _, _ -> :ok end]}
      ]) do
        assert :ok = MineRepos.add_org([])
        assert [] == MineRepos.show_orgs()
        org_name = "fake"
        assert :ok == MineRepos.add_org(org_name)
        assert [org_name] == MineRepos.show_orgs()
        assert :ok == MineRepos.pop_org(org_name)
        assert [] == MineRepos.show_orgs()
      end
    end
  end
end
