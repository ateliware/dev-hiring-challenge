defmodule GithubSearch.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      GithubSearch.Repo,
      # Start the Telemetry supervisor
      GithubSearchWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: GithubSearch.PubSub},
      # Start the Endpoint (http/https)
      GithubSearchWeb.Endpoint
      # Start a worker by calling: GithubSearch.Worker.start_link(arg)
      # {GithubSearch.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: GithubSearch.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    GithubSearchWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
