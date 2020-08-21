defmodule Minelang.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      #Minelang.Repo,
      {Registry, keys: :unique, name: :repo_process_registry},
      #Minelang.MineRepos,
      # Start the Telemetry supervisor
      MinelangWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Minelang.PubSub},
      # Start the Endpoint (http/https)
      MinelangWeb.Endpoint
      # Start a worker by calling: Minelang.Worker.start_link(arg)
      # {Minelang.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Minelang.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    MinelangWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
