import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :dev_hiring_challenge, DevHiringChallenge.Repo,
  username: System.get_env("PG_USERNAME", "postgres"),
  password: System.get_env("PG_PASSWORD", "password"),
  database: "dev_hiring_challenge_test",
  hostname: System.get_env("PG_HOST", "postgres"),
  port: String.to_integer(System.get_env("PG_PORT", "5432")),
  adapter: Ecto.Adapters.Postgres,
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :dev_hiring_challenge, DevHiringChallengeWeb.Endpoint,
  secret_key_base: "oa/YB/QBNgzgTXAjlK1IPYS9ve4H76Zf649bWT/HLHmA1tPqGaQoLzNrBd8YI8/p",
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

config :exvcr, vcr_cassette_library_dir: "fixture/vcr_cassettes"
