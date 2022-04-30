import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :ateliware, Ateliware.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "ateliware_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :ateliware, AteliwareWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "8fa7mNyvnPbLe2x9mldM0tml26vOZJuqZhVkj5rQYAMRpWskaUDA+d/a1hu6EABG",
  server: false

# In test we don't send emails.
config :ateliware, Ateliware.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Use mock adapter for all clients
config :tesla, adapter: Tesla.Mock

# or only for one
config :tesla, MyApi, adapter: Tesla.Mock
