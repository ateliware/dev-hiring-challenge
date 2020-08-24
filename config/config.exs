# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :minelang,
  ecto_repos: [Minelang.Repo]

# Configures the endpoint
config :minelang, MinelangWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "l8sn9WyR1W1YKjm3aUBBXhFzn++e4J7ACqQDcSIuwIIyZ5asZx4KYDYg464HLy0s",
  render_errors: [view: MinelangWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Minelang.PubSub,
  live_view: [signing_salt: "jUMOnZtA"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
