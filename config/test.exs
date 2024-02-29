import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :highlight_repo, HighlightRepo.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "highlight_repo_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :highlight_repo, HighlightRepoWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "zxcQNDk+FAH0kyUc+kmcshWNtlYkwg2nQsdr/uh04eip5wza7mqDmLROwBv7o1W7",
  server: false

# In test we don't send emails.
config :highlight_repo, HighlightRepo.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
