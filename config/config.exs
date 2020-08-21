# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of the Config module.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
import Config

config :web,
  generators: [context_app: false]

# Configures the endpoint
config :web, Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "aY8xgMxPy/OYEiCtucc+kWWB5l5b+ywfPCZbHVF3FsBnPNWhA4k7yMSobPKKQGG0",
  render_errors: [view: Web.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Web.PubSub,
  live_view: [signing_salt: "BxAxvN9V"]

config :mine_web,
  generators: [context_app: false]

# Configures the endpoint
config :mine_web, MineWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "vL0lGZYWHrhlNIk+uh+5rGv0oEbDBW2MpoRlUgC2XUNxjgryuWI8olQTg9vsUUFR",
  render_errors: [view: MineWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: MineWeb.PubSub,
  live_view: [signing_salt: "EYdiNpES"]

config :web,
  generators: [context_app: false]

# Configures the endpoint
config :web, Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "iBdbQ3OMBn/BPIj583LSYt4ruVHBGV2KZtLqvHtDJHiB4PbqQ6nI/+7ahqiGt1MF",
  render_errors: [view: Web.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Web.PubSub,
  live_view: [signing_salt: "nkfew1KF"]

# Sample configuration:
#
#     config :logger, :console,
#       level: :info,
#       format: "$date $time [$level] $metadata$message\n",
#       metadata: [:user_id]
#

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
