use Mix.Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
database_url = System.get_env("DATABASE_URL")

config :five_languages, FiveLanguages.Git, adapter: FiveLanguages.Git.Adapters.Mock

config :five_languages, FiveLanguages.Repo,
  pool: Ecto.Adapters.SQL.Sandbox,
  url: database_url,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :five_languages, FiveLanguagesWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
