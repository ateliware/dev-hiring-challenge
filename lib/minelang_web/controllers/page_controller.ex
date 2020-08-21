defmodule MinelangWeb.PageController do
  use MinelangWeb, :controller

  alias Minelang.{MineRepos, Repo, Repository}

  def index(conn, params) do
    MineRepos.start_link(Repo.all(Repository))
    start_miner(params)
    items = MineRepos.show_orgs()
    render(conn, "index.html", items: items)
  end

  def create(conn, params) do
    start_miner(params)
    items = MineRepos.show_orgs()
    render(conn, "index.html", items: items)
  end

  defp start_miner(params) do
    Map.get(params, "orgs", "")
    |> String.split(",", trim: true)
    |> Enum.map(&(String.trim(&1)))
    |> Enum.each(&MineRepos.add_org(&1))
  end
end
