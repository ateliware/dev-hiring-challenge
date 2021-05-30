# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :ex_hub,
  ecto_repos: [ExHub.Repo]

# Configures the endpoint
config :ex_hub, ExHubWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3Y+iDARlGikMo3fjKmyFRYclyr32os7oN/Uw7bry3Zn8vzo3u3Sm1pDwwZRIUPgX",
  render_errors: [view: ExHubWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ExHub.PubSub,
  live_view: [signing_salt: "qjCdQP90"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
