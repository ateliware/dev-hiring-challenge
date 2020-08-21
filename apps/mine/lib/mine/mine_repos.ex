defmodule Mine.MineRepos do
  use GenServer

  require Ecto.Query
  alias Mine.{MineServer, Repo, Repositories}

  def start_link(orgs \\ []) do
    GenServer.start_link(__MODULE__, orgs, name: __MODULE__)
  end

  def add_org([]), do: :ok

  def add_org(org_name), do: GenServer.cast(__MODULE__, {:add_org, org_name})

  def pop_org(org_name), do: GenServer.cast(__MODULE__, {:pop_org, org_name})

  def show_orgs, do: GenServer.call(__MODULE__, :orgs)

  @impl true
  def init(orgs) do
    orgs =
      Ecto.Query.from(r in Repositories, select: r.org)
      |> Repo.all()
      |> Enum.concat(orgs)

    {:ok, orgs}
  end

  @impl true
  def handle_call(:orgs, _, orgs) do
    {:reply, orgs, orgs}
  end

  @impl true
  def handle_cast({:add_org, org_name}, state) do
    case Enum.find(state, &(&1 == org_name)) do
      nil ->
        MineServer.start_link(org_name)
        Process.send_after(self(), :start_miner, 1000)
        {:noreply, [org_name | state]}

      _ ->
        {:noreply, state}
    end
  end

  def handle_cast({:pop_org, org_name}, state) do
    {:noreply, List.delete(state, org_name)}
  end

  @impl true
  def handle_info(:start_miner, orgs) do
    for org <- orgs do
      case Repo.get_by(Repositories, org: org) do
        nil ->
          MineServer.mine_repo(org)

        _ ->
          :ok
      end
    end

    {:noreply, orgs}
  end
end
