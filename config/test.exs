use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :web, Web.Endpoint,
  http: [port: 4002],
  server: false

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mine_web, MineWeb.Endpoint,
  http: [port: 4002],
  server: false

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :web, Web.Endpoint,
  http: [port: 4002],
  server: false

config :mine, Mine.Repo,
  database: "mine_lang_test",
  username: "postgres",
  password: System.get_env("PASSWORD"),
  hostname: System.get_env("HOSTNAME"),
  pool: Ecto.Adapters.SQL.Sandbox

config :mine, ecto_repos: [Mine.Repo]
