defmodule DevHiringChallenge.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      DevHiringChallenge.Repo,
      DevHiringChallengeWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: DevHiringChallenge.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    DevHiringChallengeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
