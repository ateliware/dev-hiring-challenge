use Mix.Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :minelang, Minelang.Repo,
  database: "mine_lang_test",
  username: "postgres",
  password: "mysecretpassword",
  hostname: "172.18.0.2",
  pool: Ecto.Adapters.SQL.Sandbox

config :minelang, ecto_repos: [Minelang.Repo]
# We don't run a server during test. If one is required,
# you can enable the server option below.
config :minelang, MinelangWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
