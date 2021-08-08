# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :github_search,
  ecto_repos: [GithubSearch.Repo]

# Configures the endpoint
config :github_search, GithubSearchWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "eH6JDyo2ttSf3q4NrIMoErNEmnlVJj+4XVLkA1Coih/A3yltgn+JzQi5jskk78N9",
  render_errors: [view: GithubSearchWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: GithubSearch.PubSub,
  live_view: [signing_salt: "ReVVRY6d"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :kerosene,
  theme: :materialize

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
