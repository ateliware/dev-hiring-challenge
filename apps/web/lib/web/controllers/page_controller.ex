defmodule Web.PageController do
  use Web, :controller

  alias Mine.MineRepos

  def index(conn, _params) do
    MineRepos.start_link()
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
    |> Enum.map(&String.trim(&1))
    |> Enum.each(&MineRepos.add_org(&1))
  end
end
