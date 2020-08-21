defmodule Mine.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      Mine.Repo,
      {Registry, keys: :unique, name: :repo_process_registry},
      Mine.MineRepos
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Mine.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
