defmodule ExHub.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use GenServer
  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      ExHub.Repo,
      # Start the Telemetry supervisor
      ExHubWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: ExHub.PubSub},
      # Start the Endpoint (http/https)
      ExHubWeb.Endpoint,
      # Start a worker by calling: ExHub.Worker.start_link(arg)
      # {ExHub.Worker, arg}
      ExHub.Server
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ExHub.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def init(init_arg) do
    {:ok, init_arg}
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ExHubWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
