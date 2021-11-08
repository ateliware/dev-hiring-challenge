# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :github_miner,
  ecto_repos: [GithubMiner.Repo]

# Configures the endpoint
config :github_miner, GithubMinerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+UEH1rVtOxB4YvxSk1FysrJSBLtfl5vbEbHgk9ZiJVh1/j8Fl/bJowsrUSiZTZiG",
  render_errors: [view: GithubMinerWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: GithubMiner.PubSub,
  live_view: [signing_salt: "UPKeT+yB"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason
config :tesla, adapter: Tesla.Adapter.Hackney

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
