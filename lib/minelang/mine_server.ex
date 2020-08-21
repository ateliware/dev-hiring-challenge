defmodule Minelang.MineServer do
  use GenServer

  alias Minelang.{MineRepos, Repo, Repository}
  alias Poison

  @github_api "https://api.github.com/orgs/"

  def start_link(org) do
    name = via_tuple(org)
    GenServer.start_link(__MODULE__, %{org: org}, name: name)
  end

  def mine_repo(org) do
    GenServer.call(via_tuple(org), :mine)
  end

  def get_state(org), do: GenServer.call(via_tuple(org), :get_state)

  @impl true
  def init(%{org: org}) do
    {:ok, %{org: org}}
  end

  @impl true
  def handle_call(:get_state, _, state) do
    {:reply, state, state}
  end

  def handle_call(:mine, _, %{org: org} = state) do
    case get_data(org) do
      :error ->
        MineRepos.pop_org(org)
        {:stop, :normal, state}

      body ->
        {:ok, repo} =
          extract_data(body)
          |> Map.put("org", org)
          |> insert_repo()

        {:reply, :ok, repo}
    end
  end

  defp insert_repo(repo) do
    Repo.insert(%Repository{
      name: repo["name"],
      org: repo["org"],
      description: repo["description"],
      stargazers_count: repo["stargazers_count"],
      watchers_count: repo["watchers_count"],
      open_issues: repo["open_issues"],
      forks: repo["forks"],
      license: repo["license"]["name"]
    })
  end

  defp via_tuple(repo) do
    {:via, Registry, {:repo_process_registry, repo}}
  end

  defp extract_data(data) do
    Poison.decode!(data)
    |> Enum.reduce(0, fn item, acc ->
      if Map.get(item, "stargazers_count") > acc, do: item, else: acc
    end)
    |> Map.take([
      "name",
      "description",
      "stargazers_count",
      "watchers_count",
      "open_issues",
      "forks",
      "license"
    ])
  end

  defp get_data(org) do
    case HTTPoison.get("#{@github_api}#{org}/repos") do
      {:ok, %{body: body, status_code: 200}} ->
        body

      _ ->
        :error
    end
  end
end
