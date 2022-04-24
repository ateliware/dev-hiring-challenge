# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :dev_challenge,
  ecto_repos: [DevChallenge.Repo]

# Configures the endpoint
config :dev_challenge, DevChallengeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "vflfO0WHLjx8tAtBviDMAvE//s+1CslEAiCUmNLLqdHh8uJQBItUqJjax9jI250U",
  render_errors: [view: DevChallengeWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: DevChallenge.PubSub,
  live_view: [signing_salt: "npqaAQwv"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, HTTPoison

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
