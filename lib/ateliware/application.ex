defmodule Ateliware.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Ateliware.Repo,
      # Start the Telemetry supervisor
      AteliwareWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Ateliware.PubSub},
      # Start the Endpoint (http/https)
      AteliwareWeb.Endpoint
      # Start a worker by calling: Ateliware.Worker.start_link(arg)
      # {Ateliware.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Ateliware.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    AteliwareWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
